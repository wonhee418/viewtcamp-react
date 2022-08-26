import "./../style/userItem.scss";
import hostIcon from "./../assets/Host.svg";
import jwtDecode from "jwt-decode";
import url from "../shared/url";
import { useUserDataFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";

function UserItem({ data, host, getQuestion, roomId }) {
  const token = sessionStorage.getItem("Authorization");
  const myName = jwtDecode(token).USER_NAME;
  const getroomData = useUserDataFetch(`${url.BASE_URL}/user-enter/${roomId}`);
  const following = useUserDataFetch(`${url.BASE_URL}/user-following`);
  const follower = useUserDataFetch(`${url.BASE_URL}/user-follower`);
  const [roomData, setRoomData] = useState(getroomData);
  const [followingData, setFollowingData] = useState(following);
  const [followerData, setFollowerData] = useState(follower);
  const [followPK, setFollowPK] = useState();


  const userKakaoID = data.user.kakaoId;
  const followingId = followingData.find(
    (r) => r.followingUser.kakaoId === userKakaoID
  );
  const followingPK = followingId?.id;

  const unFollow = (PK) => {
    fetch(`${url.BASE_URL}/user-unfollowing/${PK}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    const newFollowList = followingData.filter((it) => it.id !== PK);
    setFollowingData(newFollowList);
  };

  const follow = (kakaoID) => {
    fetch(`${url.BASE_URL}/user-following`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        kakaoId: kakaoID,
      }),
    })

    fetch(`${url.BASE_URL}/user-following`, {
      method: 'GET',
      headers: {
        "Authorization": token
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setFollowingData(data)
      })
  };

  useEffect(() => {
    setFollowPK(followingId?.id);
  }, [followPK]);

  useEffect(() => {
    setRoomData(getroomData);
  }, [getroomData]);

  useEffect(() => {
    setFollowingData(following);
  }, [following]);

  useEffect(() => {
    setFollowerData(follower);
  }, [follower]);


  useEffect(() => {

  }, [followingData])


  return (
    <div className="userItem">
      {myName === data.user.nickname ? (
        <>
          <div className="profileBox">
            <img src={data.user.profileImg} alt="프로필사진" />
            {data.user.nickname === host ? <img src={hostIcon} alt="hostIcon" className="host" /> : null}
          </div>
          <span className="username">{data.user.nickname}</span>
        </>
      ) : (
        <>
          <div className="profileBox">
            <img src={data.user.profileImg} alt="프로필사진" />
            {data.user.nickname === host ? <img src={hostIcon} alt="hostIcon" className="host" /> : null}
          </div>
          <span className="username">{data.user.nickname}</span>
          {followingId === undefined ? (
            <div
              className="followBtn"
              onClick={() => {
                follow(userKakaoID);
              }}
            >
              팔로우
            </div>
          ) : (
            <div
              className="unfollowBtn"
              onClick={() => {
                unFollow(followingPK);
              }}
            >
              팔로잉
            </div>
          )}
        </>
      )}

      <div
        className="banBtn userQuestion"
        onClick={() => {
          getQuestion(data.user.nickname);
        }}
      >
        예상 질문보기
      </div>
    </div>
  );
}
export default UserItem;
