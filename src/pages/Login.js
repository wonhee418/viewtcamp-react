import "./../style/Login.scss";
import logoImg from "./../assets/logo.png";
import { KAKAO_AUTH_URL } from "../shared/kakaoApi";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Login() {
  const navigate = useNavigate();

  const kakaoAuth = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <>
      <Header />
      <div className="loginWrap">
        <div className="logo">
          <img src={logoImg} alt="logo" />
        </div>
        <div className="text">
          면접 스터디원 구인부터 화상 스터디까지, 뷰트캠프 시작하기
        </div>
        <button className="kakaoLoginBtn" onClick={kakaoAuth}>
          카카오톡으로 로그인 하기
        </button>
        <button
          className="returnBtn"
          onClick={() => {
            navigate("/");
          }}
        >
          다음에 할래요
        </button>
      </div>
    </>
  );
}

export default Login;
