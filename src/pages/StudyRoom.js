import url from "../shared/url";
import "./../style/studyroom.scss";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useEffect, useRef, useState } from "react";
import ChatiingBox from "./../components/ChatiingBox";
import { useFetch, useUserDataFetch } from "../hooks/useFetch";
import exitIcon from "./../assets/exitIcon.svg";
import lockOpenIcon from "./../assets/lockopen2.svg";
import lockIcon from "./../assets/lock.svg";
import sendIcon from "./../assets/sendIcon.svg";
import jwtDecode from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import UserItem from "./../components/UserItem";
import Stopwatch from "./../components/StopWatch";
import QuestionBox from "./../components/QuestionBox";

function StudyRoom() {
  const token = sessionStorage.getItem("Authorization");
  const userName = jwtDecode(token).USER_NAME;
  const [chatList, setChatList] = useState([]);
  const msgInput = useRef();
  let params = new URL(document.location).searchParams;
  const ROOM_ID = params.get("roomid");
  const getroomData = useUserDataFetch(`${url.BASE_URL}/user-enter/${ROOM_ID}`);
  const following = useUserDataFetch(`${url.BASE_URL}/user-following`);
  const chatRef = useRef()
  const [roomData, setRoomData] = useState(getroomData);
  const [followingData, setFollowingData] = useState(following);
  const [studying, setStudying] = useState(false);
  const [question, setQuestion] = useState({
    data: {},
    user: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const ROOM_TITLE = location.state.title;
  const HOST = location.state.host;

  // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFWFBJUkVEX0RBVEUiOjE2NjEyNzE3ODAsIlBST0ZJTEVfSU1HIjoiaHR0cDovL2sua2FrYW9jZG4ubmV0L2RuL2N5WkphMC9idHJDSUh3aXRKby9qUkhXOFRzY0tMdlRrYmJoazltMjhrL2ltZ182NDB4NjQwLmpwZyIsImlzcyI6InNwYXJ0YSIsIlVTRVJfTkFNRSI6IuydtOyngO2YnCJ9.pLFZnqjHyThp6XLBGv1pw8fk_TU5fWQnC8EqzYOHQCY"
  const [sendMessage, setSendMessage] = useState({
    type: "TALK",
    roomId: ROOM_ID,
    sender: userName,
    message: "",
  });

  // SockJS 설정
  let options = {
    debug: true,
    header: { Authorization: token },
    protocols: Stomp.VERSIONS.supportedVersions(),
  };

  //스크롤 핸들러
  // const chattingRef = useRef();
  const server = `${url.BASE_URL}`;
  const sock = new SockJS(server + "/ws-stomp");
  const ws = Stomp.over(sock, options);

  const created = () => {
    try {
      ws.connect(
        { Authorization: token },
        (frame) => {
          ws.subscribe(
            `/sub/chat/room/${ROOM_ID}`,
            (message) => {
              let res = JSON.parse(message.body);

              if (res.type === "TALK") {
                setChatList([res]);
                setTimeout(() => {
                  chatRef.current?.scrollIntoView({behavior: "smooth"})                  
                }, 10);
              } else if (res.type === "ENTER") {
                setChatList([res]);
                fetch(`${url.BASE_URL}/user-enter/${ROOM_ID}`, {
                  method: 'GET',
                  headers: {
                    "Authorization": token
                  }
                })
                  .then(res => res.json())
                  .then(data => {
                    setRoomData(data)
                  })
              setTimeout(() => {
                  chatRef.current?.scrollIntoView({behavior: "smooth"})                  
                }, 10);

              } else if (res.type === "CLOSE") {
                //스터디시작
                setChatList([res]);
                setStudying(true);
              setTimeout(() => {
                  chatRef.current?.scrollIntoView({behavior: "smooth"})                  
                }, 10);

              } else if (res.type === "OPEN") {
                //스터디종료
                setChatList([res]);
                setStudying(false);
              setTimeout(() => {
                  chatRef.current?.scrollIntoView({behavior: "smooth"})                  
                }, 10);

              } else if (res.type === "BAN") {
                //강퇴
              } else if (res.type === "QUIT") {
                setChatList([res]);
                fetch(`${url.BASE_URL}/user-enter/${ROOM_ID}`, {
                  method: 'GET',
                  headers: {
                    "Authorization": token
                  }
                })
                  .then(res => res.json())
                  .then(data => {
                    setRoomData(data)
                  })
              setTimeout(() => {
                  chatRef.current?.scrollIntoView({behavior: "smooth"})                  
                }, 10);

              }
            },
            { Authorization: token }
          );
        },
        (error) => {
          console.log("서버연결 실패", error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getQuestion = (user) => {
    fetch(`${url.BASE_URL}/room/question/${user}`, {
      method: "GET",
      headers: {
        Authorization: token,
        "content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestion({ user, data });
      });
  };

  const sendingMessageHandler = (event) => {
    setSendMessage({
      ...sendMessage,
      message: event.target.value,
    });
  };

  const sendingMessage = (ws, setSendMessage, sendMessage) => {
    if (sendMessage.message === "" || sendMessage.message === undefined) {
      return alert("메세지를 작성해주세요");
    }
    ws.send(
      `/pub/chat/message`,
      {
        Authorization: token,
      },
      JSON.stringify({
        ...sendMessage,
      })
    );
    setSendMessage({
      ...sendMessage,
      message: "",
    });
    msgInput.current.value = "";
  };

  const studyStart = (ws) => {
    ws.send(
      `/pub/chat/message`,
      {
        Authorization: token,
      },
      JSON.stringify({
        type: "CLOSE",
        roomId: ROOM_ID,
        sender: userName,
        message: "",
      })
    );
  };

  const studyEnd = (ws) => {
    ws.send(
      `/pub/chat/message`,
      {
        Authorization: token,
      },
      JSON.stringify({
        type: "OPEN",
        roomId: ROOM_ID,
        sender: userName,
        message: "",
      })
    );
  };

  const stompDisConnect = () => {
    try {
      ws.debug = null;
      ws.disconnect(() => {
        ws.unsubscribe("sub-0");
      }, token);
    } catch (err) { }
  };
  //웹소켓 disconnect-unsubscribe 부분
  // 웹소켓을 disconnect을 따로 해주지 않으면 계속 연결되어 있어서 사용하지 않을때는 꼭 연결을 끊어주어야한다.

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      return sendingMessage(
        ws,
        setSendMessage,
        sendMessage,
        chatList,
        setChatList
      );
    }
  };

  const handleExitStudyRoom = (ws) => {
    fetch(`${url.BASE_URL}/user-quit/${ROOM_ID}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
        "content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

    ws.send(
      `/pub/chat/message`,
      {
        Authorization: token,
      },
      JSON.stringify({
        type: "QUIT",
        roomId: ROOM_ID,
        sender: userName,
        message: "",
      })
    );
    stompDisConnect();
    navigate("/review", { state: ROOM_TITLE });
  };

  useEffect(() => {
    created();
  }, []);

  useEffect(() => {
    setRoomData(getroomData);
  }, [getroomData]);

  useEffect(() => {
    setFollowingData(following);
  }, [following]);

  return (
    <div className="studyroom">
      <div className="leftBox">
        <div className="topBox">
          <div
            className="exitBtn"
            onClick={() => {
              handleExitStudyRoom(ws);
            }}
          >
            <img src={exitIcon} alt="나가기아이콘" />
            <span>스터디 마치기</span>
          </div>
          <h2 className="title">{ROOM_TITLE}</h2>
          {HOST === userName && studying === false ? (
            <div
              className="studyState"
              onClick={() => {
                studyStart(ws);
              }}
            >
              <img src={lockOpenIcon} alt="모집중아이콘" />
              <span>모집중</span>
            </div>
          ) : HOST === userName && studying === true ? (
            <div
              className="studyState end"
              onClick={() => {
                studyEnd(ws);
              }}
            >
              <img src={lockIcon} alt="모집완료아이콘" />
              <span>모집완료</span>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        <div className="chatWrap">
          <div className='chatArea'>
            <ChatiingBox chatData={chatList} chatRef={chatRef} />
          </div>
          <div className="send">
            <input
              type="text"
              ref={msgInput}
              placeholder="여기에 메세지를 입력하세요."
              onKeyDown={onEnterPress}
              onChange={sendingMessageHandler}
            />
            <span
              className="sending"
              onClick={(e) => {
                sendingMessage(ws, setSendMessage, sendMessage);
              }}
            >
              <img src={sendIcon} alt="sendIcon" />
            </span>
          </div>
        </div>
        <div className="userList">
          {roomData.map((a, i) => {
            return (
              <UserItem
                data={a}
                host={HOST}
                getQuestion={getQuestion}
                roomId={ROOM_ID}
                key={i}
              />
            );
          })}
        </div>
      </div>

      <div className="rightBox">
        <Stopwatch />
        <QuestionBox data={question} />
      </div>
    </div>
  );
}
export default StudyRoom;
