import { useUserDataFetch } from "../hooks/useFetch";
import "./../style/mypage.scss";
import Login from "./Login.js";
import url from "./../shared/url";
import { useEffect, useState, useRef } from "react";
import ReviewItem from "./../components/ReviewItem.js";
import QuestionItem from "./../components/QuestionItem.js";
import FollowerItem from "./../components/FollowerItem.js";
import FollowingItem from "./../components/FollowingItem.js";
import LogBar from "../components/LogBar.js";
import Header from "./../components/Header.js";
import emoji1 from "./../assets/bedEmoji.svg";

function Mypage() {
  const userData = useUserDataFetch(`${url.BASE_URL}/user-myinfo`);
  const userQuestion = useUserDataFetch(`${url.BASE_URL}/user-questions`);
  const userReview = useUserDataFetch(`${url.BASE_URL}/user-reviews`);
  const follower = useUserDataFetch(`${url.BASE_URL}/user-follower`);
  const following = useUserDataFetch(`${url.BASE_URL}/user-following`);
  const token = sessionStorage.getItem("Authorization");
  const [userInfo, setUserInfo] = useState(userData);
  const [review, setReview] = useState(userReview);
  const [question, setQuestion] = useState(userQuestion);
  const [followerData, setFollowerData] = useState(follower);
  const [followingData, setFollowingData] = useState(following);
  const questionRef = useRef();
  const [tab, setTab] = useState(0);
  const [profileEdit, setProfileEdit] = useState(false);
  const [localContent, setLocalContent] = useState(userData.userPr);
  const fileInput = useRef();
  const [originalImg, setOriginalImg] = useState(userInfo.profileImg);

  useEffect(() => {
    if (token === null) {
      alert("로그인이 필요합니다");
    }
  }, []);



  useEffect(() => {
    setReview(userReview);
  }, [userReview]);


  useEffect(() => {
    setQuestion(userQuestion);
  }, [userQuestion]);

  useEffect(() => {
    setFollowerData(follower);
  }, [follower]);

  useEffect(() => {
    setFollowingData(following);
  }, [following]);

  useEffect(() => {
    setUserInfo(userData);
  }, [userData]);


  function createQuestion() {
    if (question.length >= 10) {
      alert("예상질문은 최대 10개까지만 작성 가능합니다.");
      return;
    }

    if (questionRef.current.value.length > 25) {
      alert("예상질문은 최대 25자까지만 작성 가능합니다.");
      return;
    }
    if (questionRef.current.value.length <= 0) {
      alert("예상질문을 작성해주세요");
      return;
    }

    const token = sessionStorage.getItem("Authorization");
    fetch(`${url.BASE_URL}/user-question`, {
      method: "POST",
      headers: {
        Authorization: token,
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        question: questionRef.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestion([...question, data]);
        questionRef.current.value = "";
      });
  }

  function handleChangePr() {
    const token = sessionStorage.getItem("Authorization");

    fetch(`${url.BASE_URL}/user-introduce/change`, {
      method: "PUT",
      headers: {
        Authorization: token,
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        userPr: localContent,
      }),
    });
    setProfileEdit(false);
    userData.userPr = localContent;
  }

  const handleChangeImg = (fileInput) => {
    const token = sessionStorage.getItem("Authorization");
    const formData = new FormData();
    formData.append("file", fileInput);

    fetch(`${url.BASE_URL}/user-image/change`, {
      method: "PUT",
      headers: {
        Authorization: token,
      },
      body: formData,
    });
    fetch(`${url.BASE_URL}/user-myinfo`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserInfo({
          ...userInfo,
          data,
        });
      });
  };

  const handleQuitEdit = () => {
    setProfileEdit(false);
    setLocalContent(userInfo.userPr);
    setUserInfo({
      ...userInfo,
      profileImg: originalImg,
    });
  };

  const handleOpenEdit = () => {
    setProfileEdit(true);
    setLocalContent(userInfo.userPr);
    setOriginalImg(userInfo.profileImg);
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      return createQuestion();
    }
  };

  const selectFile = () => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUserInfo({
        ...userInfo,
        profileImg: reader.result,
      });
    };
  };

  const handleGetFollowingList = () => {
    fetch(`${url.BASE_URL}/user-following`, {
      method: 'GET',
      headers: {
        "Authorization": token
      }
    })
      .then(res => res.json())
      .then(data => {
        setFollowingData(data)
      })
  }

  const handleGetFollowerList = () => {
    fetch(`${url.BASE_URL}/user-follower`, {
      method: 'GET',
      headers: {
        "Authorization": token
      }
    })
      .then(res => res.json())
      .then(data => {
        setFollowerData(data)
      })
  }

  return (
    <>
      <Header />
      {token === null ? (
        <Login />
      ) : (
        <div className="inner mypage">
          <LogBar userInfo={userInfo} />
          <h2 className="tit">{userInfo.nickname}님의 마이페이지</h2>

          <div className="container">
            <div className="myContent">
              <div className="tab">
                {tab === 0 ? (
                  <>
                    <span
                      className="active"
                      onClick={() => {
                        setTab(0);
                      }}
                    >
                      나의 소감
                    </span>
                    <span
                      onClick={() => {
                        setTab(1);
                        handleGetFollowerList()
                      }}
                    >
                      팔로워
                    </span>
                    <span
                      onClick={() => {
                        setTab(2);
                        handleGetFollowingList()
                      }}
                    >
                      팔로잉
                    </span>
                  </>
                ) : tab === 1 ? (
                  <>
                    <span
                      onClick={() => {
                        setTab(0);
                      }}
                    >
                      나의 소감
                    </span>
                    <span
                      className="active"
                      onClick={() => {
                        setTab(1);
                        handleGetFollowerList()
                      }}
                    >
                      팔로워
                    </span>
                    <span
                      onClick={() => {
                        setTab(2);
                        handleGetFollowingList()
                      }}
                    >
                      팔로잉
                    </span>
                  </>
                ) : tab === 2 ? (
                  <>
                    <span
                      onClick={() => {
                        setTab(0);
                      }}
                    >
                      나의 소감
                    </span>
                    <span
                      onClick={() => {
                        setTab(1);
                        handleGetFollowerList()
                      }}
                    >
                      팔로워
                    </span>
                    <span
                      className="active"
                      onClick={() => {
                        setTab(2);
                        handleGetFollowingList()
                      }}
                    >
                      팔로잉
                    </span>
                  </>
                ) : null}
              </div>
              {tab === 0 ? (
                <div className="desc">
                  {review.length <= 0 ? (
                    <div className="empty">
                      <div className="box">
                        <img src={emoji1} alt="emoji" />
                        <p className="txt">
                          나의 소감이 <span>비었습니다.</span>
                        </p>
                        <p>스터디를 진행하고 후기를 남겨보세요.</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {review.map((data) => {
                        return (
                          <ReviewItem
                            review={review}
                            setReview={setReview}
                            data={data}
                            key={data.id}
                          />
                        );
                      })}
                    </>
                  )}
                </div>
              ) : tab === 1 ? (
                <div className="desc">
                  {followerData.length <= 0 ? (
                    <div className="empty">
                      <div className="box">
                        <img src={emoji1} alt="emoji" />
                        <p className="txt">
                          팔로워 리스트가 <span>비었습니다.</span>
                        </p>
                        <p>
                          스터디를 진행하고 함께 스터디하고 싶은 친구를 팔로우
                          해보세요.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {followerData.map((data) => {
                        return (
                          <FollowerItem
                            followerData={followerData}
                            setFollowerData={setFollowerData}
                            followingData={followingData}
                            setFollowingData={setFollowingData}
                            data={data}
                            key={data.id}
                          />
                        );
                      })}
                    </>
                  )}
                </div>
              ) : tab === 2 ? (
                <div className="desc">
                  {followingData.length <= 0 ? (
                    <div className="empty">
                      <div className="box">
                        <img src={emoji1} alt="emoji" />
                        <p className="txt">
                          팔로잉 리스트가 <span>비었습니다.</span>
                        </p>
                        <p>
                          스터디를 진행하고 함께 스터디하고 싶은 친구를 팔로우
                          해보세요.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {followingData.map((data) => {
                        return (
                          <FollowingItem
                            followingData={followingData}
                            setFollowingData={setFollowingData}
                            followerData={followerData}
                            setFollowerData={setFollowerData}
                            data={data}
                            key={data.id}
                          />
                        );
                      })}
                    </>
                  )}
                </div>
              ) : null}
            </div>
            <div className="myInfoCont">
              <div className="profile">
                <div className="info">
                  <div className="profileImg">
                    {profileEdit === false ? (
                      <img src={userInfo.profileImg} alt="profileImg" />
                    ) : (
                      <>
                        <img src={userInfo.profileImg} alt="profileImg" />
                        <input
                          type="file"
                          id="file"
                          ref={fileInput}
                          onChange={() => {
                            selectFile();
                          }}
                        />
                        <label htmlFor="file"></label>
                      </>
                    )}
                  </div>
                  <div className="userInfo">
                    <div className="name">
                      <span>{userData.nickname}</span>
                    </div>
                    <div className="aboutMe">
                      {profileEdit === false ? (
                        <span>{userData.userPr}</span>
                      ) : (
                        <input
                          value={localContent}
                          onChange={(e) => {
                            setLocalContent(e.target.value);
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                {profileEdit === false ? (
                  <>
                    <div
                      className="editBtn"
                      onClick={() => {
                        handleOpenEdit();
                      }}
                    >
                      프로필수정
                    </div>
                    <div className="follow">
                      <span>
                        팔로워 {follower.length} · 팔로잉 {following.length}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="btnBar">
                    <div
                      className="cancelBtn"
                      onClick={() => {
                        handleQuitEdit();
                      }}
                    >
                      취소
                    </div>
                    <div
                      className="saveBtn"
                      onClick={() => {
                        handleChangePr();
                        handleChangeImg(fileInput.current.files[0]);
                      }}
                    >
                      저장
                    </div>
                  </div>
                )}
              </div>
              <div className="question">
                <h3>연습하고 싶은 예상질문</h3>
                <div className="setQuestion">
                  {question.length >= 10 ? (
                    <>
                      <input
                        disabled
                        type="text"
                        placeholder="예상질문을 모두 작성하였습니다."
                        ref={questionRef}
                      />
                      <button disabled className="put disabled">
                        추가
                      </button>
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        placeholder="예상질문 작성하기"
                        ref={questionRef}
                        onKeyDown={onEnterPress}
                      />
                      <button className="put" onClick={createQuestion}>
                        추가
                      </button>
                    </>
                  )}
                </div>
                <div className="questions">
                  {question.length <= 0 ? (
                    <div className="empty">
                      <div className="box">
                        <img src={emoji1} alt="emoji" />
                        <p className="txt">
                          예상질문이 <span>비었습니다.</span>
                        </p>
                        <p>스터디에서 물어볼 질문을 미리 준비해보세요.</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {question.map((data, i) => {
                        return (
                          <QuestionItem
                            question={question}
                            setQuestion={setQuestion}
                            data={data}
                            i={i}
                            key={data.id}
                          />
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Mypage;
