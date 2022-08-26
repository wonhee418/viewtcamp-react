import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LogBar({ userInfo }) {
  const token = sessionStorage.getItem("Authorization");
  const navigate = useNavigate();
  const [loginCheck, setLoginCheck] = useState(false);

  const logOut = () => {
    setLoginCheck(false);
    sessionStorage.removeItem("Authorization");
    sessionStorage.removeItem("nickname");
  };

  useEffect(() => {
    if (token === null) {
      setLoginCheck(false);
    } else {
      setLoginCheck(true);
    }
  }, []);

  return (
    <>
      {loginCheck === false ? (
        <div className="btnCont">
          <button
            className="kakaoLoginBtn"
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인
          </button>
        </div>
      ) : (
        <div className="btnCont">
          <div className="profile">
            <img src={userInfo.profileImg} alt="profileImg" />
            <span>{userInfo.username}</span>
          </div>
          <button
            className="kakaoLogoutBtn"
            onClick={() => {
              logOut();
            }}
          >
            로그아웃
          </button>
        </div>
      )}
    </>
  );
}

export default LogBar;
