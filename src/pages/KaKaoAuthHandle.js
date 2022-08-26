import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import url from "./../shared/url";
const KakaoAuthHandle = () => {

  const navigate = useNavigate();
  const PARAMS = new URL(document.location).searchParams;
  const KAKAO_CODE = PARAMS.get('code')

  useEffect(() => {
    fetch(`${url.BASE_URL}/user/kakao/callback?code=${KAKAO_CODE}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        sessionStorage.setItem("Authorization", data.jwtToken);
        sessionStorage.setItem("nickname", data.nickname);
        navigate('/');
      })
  }, []);


  return (
    <div className='Loding'></div>
  );
};

export default KakaoAuthHandle;