import "./../style/review.scss";
import url from "../shared/url";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import jwtDecode from "jwt-decode";

function Review() {
  const token = sessionStorage.getItem("Authorization");
  const navigate = useNavigate();
  const [localContent, setLocalContent] = useState("");
  const location = useLocation();
  const ROOM_TITLE = location.state;
  const userName = jwtDecode(token).USER_NAME;
  const handleSaveReview = () => {
    fetch(`${url.BASE_URL}/user-reviews`, {
      method: "POST",
      headers: {
        Authorization: token,
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        title: ROOM_TITLE,
        review: localContent,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/mypage");
      });
  };

  return (
    <div className="reviewBox">
      <div className="review">
        <h2 className="txt">
          <p>{userName}님,</p>
          오늘 스터디에서 배운 점이 있으신가요?
        </h2>
        <textarea
          placeholder="내용을 적어주세요"
          autoFocus
          maxLength="2000"
          resize="none"
          value={localContent}
          onChange={(e) => {
            setLocalContent(e.target.value);
          }}
        ></textarea>
        <span className='maxLength'>{localContent?.length.toLocaleString()} / 2,000</span>
        <div className="btnWrap">
          <div
            className="skipBtn"
            onClick={() => {
              navigate("/");
            }}
          >
            다음에 작성할래요
          </div>
          <div
            className="saveBtn"
            onClick={() => {
              handleSaveReview();
            }}
          >
            저장하기
          </div>
        </div>
      </div>
    </div>
  );
}
export default Review;
