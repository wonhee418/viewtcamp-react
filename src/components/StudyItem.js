import "./../style/studyItem.scss";
import userIcon from "./../assets/userIcon.svg";
import { useNavigate } from "react-router-dom";
import url from "./../shared/url";

function StudyItem({ data }) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("Authorization");
  const ROOM_TITLE = data.title;
  const HOSTUSER = data.user.username;

  const handleEnterRoom = (roomData) => {
    if (token === null) {
      alert("로그인후 입장 가능합니다.");
      return;
    }
    if (roomData.maxUser < roomData.userCount) {
      alert("정원초과로 입장이 불가능합니다.");
      return;
    }

    if (roomData.studying === true) {
      alert("모집 완료된 스터디입니다.");
      return;
    }

    fetch(`${url.BASE_URL}/user-enter`, {
      method: "POST",
      headers: {
        Authorization: token,
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId: roomData.roomId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate(`/studyroom/?roomid=${roomData.roomId}`, {
          state: {
            title: ROOM_TITLE,
            host: HOSTUSER,
          },
        });
      });
  };

  return (
    <div
      className="item"
      onClick={() => {
        handleEnterRoom(data);
      }}
    >
      <div className="profileImg">
        <img src={data.user.profileImg} alt="profile" />
      </div>
      <div className="studyInfo">
        <p className="studyTit bold">
          <span>{data.title}</span>
          {data.studying === true ? (
            <span className="state clearfix">
              <span className="full"></span>모집완료
            </span>
          ) : (
            <span className="state clearfix">
              <span className="waiting"></span>모집중
            </span>
          )}
        </p>
        <p className="studyTag">
          <span>{data.tag2}</span>
          <span>{data.tag3}</span>
          <span>{data.tag1}</span>
          <span className="user clearfix">
            <img src={userIcon} alt="user" />
            <span>{data.userCount}</span> / <span>{data.maxUser}</span>
          </span>
        </p>
      </div>
    </div>
  );
}

export default StudyItem;
