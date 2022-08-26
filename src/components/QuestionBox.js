import "./../style/questionBox.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Autoplay, Navigation } from "swiper";

function Question({ data }) {

  return (
    <div className="questionBox">
      {data.user !== "" ? (
        <>
          <h2>{data.user}님의 예상질문</h2>
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            navigation={true}
            loop={true}
            centeredSlides={true}
            pagination={{
              type: "fraction",
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
          >
            {data.data.length <= 0
              ? <SwiperSlide>{data.user}님은 예상질문이 없습니다.</SwiperSlide>
              :
              <>
                {data.data.map((a) => {
                  return (<SwiperSlide>{a.question}</SwiperSlide>)
                })}
              </>
            }
          </Swiper>
        </>
      ) : (
        <>
          <h2>예상질문</h2>
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            navigation={true}
            loop={true}
            centeredSlides={true}
            pagination={{
              type: "fraction",
            }}
          >
            <SwiperSlide>예상질문이 없습니다.</SwiperSlide>;
          </Swiper>
        </>
      )}
    </div>
  );
}
export default Question;
