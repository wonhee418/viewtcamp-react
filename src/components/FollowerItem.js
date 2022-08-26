import url from "../shared/url";

function FollowerItem({
  followerData,
  setFollowerData,
  followingData,
  setFollowingData,
  data,
}) {
  const PK = data.id;

  const follow = (PK) => {
    const token = sessionStorage.getItem("Authorization");

    fetch(`${url.BASE_URL}/user-following`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        kakaoId: data.user.kakaoId,
      }),
    });
    setFollowerData(
      followerData.map((it) => (it.id === PK ? { ...it, followUp: true } : it))
    );
  };

  const unFollow = (PK) => {
    const token = sessionStorage.getItem("Authorization");
    fetch(`${url.BASE_URL}/user-unfollowing/${PK}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    setFollowerData(
      followerData.map((it) => (it.id === PK ? { ...it, followUp: false } : it))
    );
    setFollowingData(followingData);
  };

  return (
    <div className="followList">
      <img src={data.user.profileImg} alt="profileImg" />
      <div className="cotentBox">
        <p className="username">{data.user.nickname}</p>
        <p className="userPr">{data.user.userPr}</p>
      </div>
      {data.followUp ? (
        <button
          className="followingBtn"
          onClick={() => {
            unFollow(PK);
          }}
        >
          팔로잉
        </button>
      ) : (
        <button
          className="followerBtn"
          onClick={() => {
            follow(PK);
          }}
        >
          팔로우
        </button>
      )}
    </div>
  );
}

export default FollowerItem;
