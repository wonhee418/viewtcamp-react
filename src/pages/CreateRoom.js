import "./../style/createRoom.scss";
import LogBar from "../components/LogBar.js";
import { useNavigate } from "react-router-dom";
import Header from "./../components/Header.js";
import { useState, useEffect, useRef } from "react";
import { useUserDataFetch } from "../hooks/useFetch";
import url from "./../shared/url";

function CreateRoom() {
  const userData = useUserDataFetch(`${url.BASE_URL}/user-myinfo`);
  const token = sessionStorage.getItem("Authorization");
  const [userInfo, setUserInfo] = useState(userData);
  const titleRef = useRef();
  const userRef = useRef();
  const navigate = useNavigate();
  const [room, setRoom] = useState({
    title: "",
    maxUser: "",
    tag1: "",
    tag2: "",
    tag3: "",
  });

  const companyArry = [
    "공기업",
    "사기업",
    "공무원",
    "외국계",
    "금융권",
    "기타",
  ];

  const careerArry = ["신입", "경력"];

  const interviewArry = [
    "일대일 면접",
    "일대다 면접",
    "그룹 면접",
    "PT",
    "1분 자기소개",
  ];

  useEffect(() => {
    setUserInfo(userData);
  }, [userData]);

  const handleEnterRoom = (getData) => {
    console.log(getData);
    fetch(`${url.BASE_URL}/user-enter`, {
      method: "POST",
      headers: {
        Authorization: token,
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId: getData.roomId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate(`/studyroom/?roomid=${getData.roomId}`, {
          state: {
            title: getData.title,
            host: getData.user.nickname,
          },
        });
      });
  };

  const handleCreateRoom = () => {
    const token = sessionStorage.getItem("Authorization");
    if (room.title.length <= 0) {
      alert("제목을 입력해주세요.");
      titleRef.current.focus();
      return;
    }

    if (room.title.length > 30) {
      alert("제목은 30자 이내로 작성가능합니다.");
      titleRef.current.focus();
      return;
    }

    if (room.maxUser.length <= 0) {
      alert("인원수를 선택해주세요.");
      userRef.current.focus();
      return;
    }

    if (room.tag2.length <= 0) {
      alert("기업분류를 선택해주세요.");
      return;
    }
    if (room.tag1.length <= 0) {
      alert("신입/경력을 선택해주세요.");
      return;
    }

    if (room.tag3.length <= 0) {
      alert("면접 유형을 선택해주세요.");
      return;
    }
    console.log(room);

    fetch(`${url.BASE_URL}/room`, {
      method: "POST",
      headers: {
        Authorization: token,
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        title: room.title,
        maxUser: room.maxUser,
        tag1: room.tag1,
        tag2: room.tag2,
        tag3: room.tag3,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          handleEnterRoom(data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Header />
      <div className="inner createRoom">
        <LogBar userInfo={userInfo} />
        <h2 className="tit">
          면접 스터디원을 가장 빠르게 구하고, 화상스터디로 함께 성장하세요!
        </h2>

        <div className="contentWrap">
          <div className="prevBox">
            <span
              onClick={() => {
                navigate("/studyList");
              }}
            >
              ←
            </span>
            <p>
              스터디룸 개설하고 면접 스터디
              <br />
              지금 바로 시작해볼까요?
            </p>
          </div>
          <div className="createBox">
            <div className="setTitle">
              <p>스터디룸제목</p>
              <input
                type="text"
                ref={titleRef}
                placeholder="제목을 입력하세요"
                onChange={(e) => {
                  setRoom({
                    ...room,
                    title: e.target.value,
                  });
                }}
              />
            </div>

            <div className="setUser">
              <p>인원</p>
              <select
                name="user"
                ref={userRef}
                onChange={(e) => {
                  setRoom({
                    ...room,
                    maxUser: e.target.value.split("명")[0],
                  });
                }}
              >
                <option value="인원수를 선택해주세요">
                  인원수를 선택해주세요.
                </option>
                <option value="2명">2명</option>
                <option value="3명">3명</option>
                <option value="4명">4명</option>
                <option value="5명">5명</option>
              </select>
            </div>

            <div className="setCompany">
              <p className="tag">기업분류</p>
              {companyArry.map((a, i) => {
                return (
                  <>
                    <input
                      type="radio"
                      id={a}
                      name="company"
                      value={a}
                      onClick={(e) => {
                        setRoom({
                          ...room,
                          tag2: e.target.value,
                        });
                      }}
                    />
                    <label htmlFor={a}>{a}</label>
                  </>
                );
              })}
            </div>

            <div className="setCareer">
              <p className="tag">신입/경력</p>
              {careerArry.map((a, i) => {
                return (
                  <>
                    <input
                      type="radio"
                      id={a}
                      name="career"
                      value={a}
                      onClick={(e) => {
                        setRoom({
                          ...room,
                          tag1: e.target.value,
                        });
                      }}
                    />
                    <label htmlFor={a}>{a}</label>
                  </>
                );
              })}
            </div>

            <div className="setInterviewType">
              <p className="tag">면접 유형</p>
              {interviewArry.map((a, i) => {
                return (
                  <>
                    <input
                      type="radio"
                      id={a}
                      name="interview"
                      value={a}
                      onClick={(e) => {
                        setRoom({
                          ...room,
                          tag3: e.target.value,
                        });
                      }}
                    />
                    <label htmlFor={a}>{a}</label>
                  </>
                );
              })}
            </div>

            <div className="createBtn" onClick={handleCreateRoom}>
              개설하기
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateRoom;
