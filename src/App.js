import "./App.css";
import { GlobalStyle } from "./style/GlobalStyle.js";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import StudyList from "./pages/StudyList.js";
import CreateRoom from "./pages/CreateRoom.js";
import Mypage from "./pages/Mypage";
import Login from "./pages/Login.js";
import KakaoAuthHandle from "./pages/KaKaoAuthHandle";
import StudyRoom from "./pages/StudyRoom";
import Review from "./pages/Review";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/oauth/kakao/callback" element={<KakaoAuthHandle />} />
        <Route path="/studyList" element={<StudyList />} />
        <Route path="/createroom" element={<CreateRoom />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/studyroom/*" element={<StudyRoom />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </div>
  );
}

export default App;
