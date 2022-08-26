import "./../style/footer.scss"
import footLogo from './../assets/footLogo.svg'


function Footer(){
  return(
    <div className='footer'>
      <div className='company'>
      <div className='footerLogo'><img src={footLogo} alt="footerLogo"/></div>
      <p className='copy'>Copyright @2022 VIEWTCAMP.All rights reserved.</p>
      <div>
        <span>개인정보보호</span>
        <span>오류제보</span>
        <span>만족도평가</span>
      </div>
      </div>
      <div className='info'>
        <div className='team'>Teammate</div>

        <div className='CEO'>
        <div>대표자 : 김원희</div>
        <div>E-mail : cheeky4@naver.com</div>
          <div className='SNS'>
            <i className='instar'></i>
            <i className='github'></i>
            <i className='youtube'></i>
          </div>
        </div>
        <div className='members'>
          <div className=''>
            <p>Developer</p>
            <span>김원희</span>
            <span>김태현</span>
            <span>김현진</span>
            <span>조병윤</span>
          </div>
          <div className=''>
            <p>Designer</p>
            <span>박유림</span>
            <span>홍지윤</span>
          </div>
        </div>

      </div>
    </div>

  )
}

export default Footer