import "./../style/studyList.scss";
import refreshIcon from "./../assets/refreshIcon.svg";
import camIcon from "./../assets/camIcon.svg";
import { useUserDataFetch } from "../hooks/useFetch";
import { useFetch } from "../hooks/useFetch";
import StudyItem from "../components/StudyItem";
import LogBar from "../components/LogBar.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import url from "./../shared/url";
import Header from "./../components/Header.js";
import emoji1 from "./../assets/bedEmoji.svg";
import TypeBox from "../components/TypeBox";

function StudyList() {
  const roomdata = useFetch(`${url.BASE_URL}/room/all`);
  const userData = useUserDataFetch(`${url.BASE_URL}/user-myinfo`);
  const [userInfo, setUserInfo] = useState(userData);
  const navigate = useNavigate();
  const [roomList, setRoomList] = useState(roomdata);
  const token = sessionStorage.getItem("Authorization");
  const [keyword, setKeyword] = useState("null");
  const [company, setCompany] = useState("null");
  const [career, setCareer] = useState("null");
  const [interview, setInterview] = useState("null");
  const [recruit, setRecruit] = useState("null");
  const serchInputRef = useRef();

  const serchRoom = () => {
    fetch(
      `${url.BASE_URL}/room-page/1/40/createdAt/${recruit}/${career}/${company}/${interview}/${keyword}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setRoomList(data.content);
      });
  };

  const handleKeyword = (keyword) => {
    if (keyword === "") {
      setKeyword("null");
    } else {
      setKeyword(keyword);
    }
  };

  const handleActiveCompany = (value) => {
    if (value === company) {
      setCompany("null");
    } else {
      setCompany(value);
    }
  };

  const handleActiveCareer = (value) => {
    if (value === career) {
      setCareer("null");
    } else {
      setCareer(value);
    }
  };

  const handleActiveInterview = (value) => {
    if (value === interview) {
      setInterview("null");
    } else {
      setInterview(value);
    }
  };

  const handleRecruitChange = (state) => {
    console.log(state);
    if (state) {
      setRecruit("recruiting");
    } else {
      setRecruit("null");
    }
    console.log(recruit);
  };

  const handleReset = () => {
    setCompany("null");
    setCareer("null");
    setInterview("null");
    setKeyword("null");
    serchInputRef.current.value = "";
    setRoomList(roomdata);
  };

  const handleRefresh = () => {
    serchRoom();
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      return serchRoom();
    }
  };

  const handleLoginCheck = () => {
    if (token === null) {
      if (window.confirm("로그인 후 생성가능합니다.\n로그인 하시겠습니까?")) {
        navigate("/login");
      } else {
        return;
      }
    } else {
      navigate("/createRoom");
    }
  };

  useEffect(() => {
    setUserInfo(userData);
  }, [userData]);

  useEffect(() => {
    setRoomList(roomdata);
  }, [roomdata]);

  useEffect(() => {
    serchRoom();
  }, [recruit]);

  return (
    <>
      <Header />
      <div className="inner studyListPage">
        <LogBar userInfo={userInfo} />
        <h2 className="tit">
          면접 스터디원을 가장 빠르게 구하고, 화상스터디로 함께 성장하세요!
        </h2>

        <div className="contentWrap">
          <div className="serchBox">
            <div className="serchScroll">
              <div className="serchBar">
                <input
                  type="text"
                  ref={serchInputRef}
                  onKeyDown={onEnterPress}
                  placeholder="키워드로 검색하기"
                  onChange={(e) => {
                    handleKeyword(e.target.value);
                  }}
                />
              </div>
              <TypeBox
                company={company}
                career={career}
                interview={interview}
                handleActiveCompany={handleActiveCompany}
                handleActiveCareer={handleActiveCareer}
                handleActiveInterview={handleActiveInterview}
              />
              <div className="btnWrap">
                <div
                  className="resetBtn"
                  onClick={() => {
                    handleReset();
                  }}
                >
                  <img src={refreshIcon} alt="resetIcon" />
                  초기화
                </div>
                <div
                  className="confirmBtn"
                  onClick={() => {
                    serchRoom();
                  }}
                >
                  적용하기
                </div>
              </div>
            </div>
          </div>

          <div className="studyListBox">
            <div className="flexBox">
              <div className="roomCheck">
                <input
                  type="checkbox"
                  id="recruit"
                  onClick={(e) => {
                    handleRecruitChange(e.currentTarget.checked);
                  }}
                />
                <label htmlFor="recruit">모집중인 방만 보기</label>
              </div>
              <div className="btnWrap">
                <span
                  className="refreshBtn"
                  onClick={() => {
                    handleRefresh();
                  }}
                >
                  <img src={refreshIcon} alt="refreshicon" /> 새로고침
                </span>
                <span
                  className="createRoomBtn"
                  onClick={() => {
                    handleLoginCheck();
                  }}
                >
                  <img src={camIcon} alt="camIcon" />
                  스터디룸 개설하기
                </span>
              </div>
            </div>

            {roomList.length <= 0 ? (
              <div className="empty">
                <div className="box">
                  <img src={emoji1} alt="emoji" />
                  <p className="txt">
                    진행중인 스터디가 <span>없습니다.</span>
                  </p>
                  <p>첫번째 방장이 되어주세요.</p>
                </div>
              </div>
            ) : (
              <div className="list">
                {roomList.map((room) => {
                  return <StudyItem data={room} key={room.id} />;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default StudyList;
