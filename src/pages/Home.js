import { useState, useEffect } from "react";
import refreshIcon from "./../assets/refreshIcon.svg";
import guideImg from "./../assets/guide.png";
import event01 from "./../assets/event01.png";
import event02 from "./../assets/event02.png";
import "./../style/home.scss";
import StudyItem from "../components/StudyItem.js";
import LogBar from "../components/LogBar.js";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper";
import { useFetch } from "../hooks/useFetch";
import { useUserDataFetch } from "../hooks/useFetch";
import url from "./../shared/url";
import Header from "./../components/Header.js";
import emoji1 from "./../assets/bedEmoji.svg";

function Home() {
  const roomTop8 = useFetch(`${url.BASE_URL}/room`);
  const refreshData = () => {
    fetch(`${url.BASE_URL}/room`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRoomData(data);
      });
  };

  const userData = useUserDataFetch(`${url.BASE_URL}/user-myinfo`);
  const [userInfo, setUserInfo] = useState(userData);
  const [roomData, setRoomData] = useState(roomTop8);

  useEffect(() => {
    setUserInfo(userData);
  }, [userData]);

  useEffect(() => {
    setRoomData(roomTop8);
  }, [roomTop8]);

  return (
    <>
      <Header />
      <div className="home inner">
        <LogBar userInfo={userInfo} />
        <h2 className="tit">당신의 면접을 응원합니다.</h2>
        <div className="contentWrap">
          <div className="studyListCont">
            <div className="listTit">
              <span className="bold subTit">
                면접 스터디원을 기다리고 있어요!
              </span>
              <span
                className="refresh"
                onClick={() => {
                  refreshData();
                }}
              >
                <img src={refreshIcon} alt="refreshicon" /> 새로고침
              </span>
            </div>
            {roomData.length <= 0 ? (
              <div className="empty">
                <div className="box">
                  <img src={emoji1} alt="emoji" />
                  <p className="txt">
                    진행중인 스터디가 <span>없습니다.</span>
                  </p>
                  <p>첫번째 방장이 되어주세요.</p>
                </div>
              </div>
            ) : (
              <div className="list">
                {roomData.map((room) => {
                  return <StudyItem data={room} key={room.id} />;
                })}
              </div>
            )}
          </div>
          <div className="bannerWrap">
            <div className="videoCont">
              <Swiper
                modules={[Pagination, Autoplay, Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={true}
                loop={true}
                centeredSlides={true}
                slideToClickedSlide={true}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
              >
                <SwiperSlide>
                  <iframe
                    src="https://www.youtube.com/embed/DSBJXuDyDOY"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </SwiperSlide>
                <SwiperSlide>
                  <iframe
                    src="https://www.youtube.com/embed/N_sSVyOCdXA"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </SwiperSlide>
                <SwiperSlide>
                  <iframe
                    src="https://www.youtube.com/embed/SpITJ2YlLKY"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </SwiperSlide>
                <SwiperSlide>
                  <iframe
                    src="https://www.youtube.com/embed/OYihc7_4j5A"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </SwiperSlide>
              </Swiper>
            </div>
            {/* <div className="eventBanner_01">
              <img src={guideImg} alt="auidebanner" />
            </div> */}
            <div className="eventBanner_02">
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                centeredSlides={true}
                slideToClickedSlide={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
              >
                <SwiperSlide>
                  <img src={event01} alt="event01" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={event02} alt="event02" />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
