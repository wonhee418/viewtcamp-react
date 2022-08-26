import "./../style/videoCheck.scss"
import url from "../shared/url";
// import { OpenVidu } from "openvidu-browser";
import axios from "axios";
// import DividewebRTC from "./DividewebRTC"
// import MyWebRTC from "./MyWebRTC";

function VideoCheck() {

  const OPENVIDU_SERVER_URL = url.OPEN_VIDU;
  const OPENVIDU_SERVER_SECRET = url.OPEN_VIDU_SECRET;


  return (
    <div className='videoCheckPage'>
      <div className='video'>
        <div className='mycam'>내화면</div>
      </div>
      <div className='txt'>
        <h2>입장전 확인해주세요!</h2>
        <p>입장전 카메라가 정상적으로 작동하는지 확인해주세요.</p>
        <p>* 화상스터디를 위해 카메라는 필수입니다.</p>

        <div className='enterBtn'>
          입장하기
        </div>
      </div>
    </div>
  )
}

export default VideoCheck