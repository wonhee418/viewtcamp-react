import url from "../shared/url";
import { useNavigate } from "react-router-dom";

function FollowingItem({ followingData, setFollowingData, data }) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("Authorization");

  function unFollow() {
    fetch(`${url.BASE_URL}/user-unfollowing/${data.id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    const newFollowList = followingData.filter((it) => it.id !== data.id);
    setFollowingData(newFollowList);
  }

  const handleEnterRoom = (roomData) => {
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
            title: roomData.title,
            host: roomData.roomId,
          },
        });
      });
  };

  return (
    <div className="followList">
      <div>
        <img src={data.followingUser.profileImg} alt="profileImg" />
        <div className="cotentBox">
          <p className="username">{data.followingUser.nickname}</p>
          <p className="userPr">{data.followingUser.userPr}</p>
        </div>
        <button className="followingBtn" onClick={unFollow}>
          팔로잉
        </button>
      </div>
      {data.studying === true ? (
        <div className="fastStudy">
          <h3 className="username">
            {data.followingUser.nickname}님이 입장한 방
          </h3>
          <h3 className="title">{data.title}</h3>
          <button
            className="studyBtn"
            onClick={() => {
              handleEnterRoom(data);
            }}
          >
            같이 스터디하기
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default FollowingItem;
