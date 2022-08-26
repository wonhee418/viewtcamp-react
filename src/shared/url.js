

// const BASE_URL = process.env.REACT_APP_BASE_URL;
// const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
// const LOGOUT_REDIRECT_URI = process.env.REACT_APP_LOGOUT_REDIRECT_URI;
// const OPEN_VIDU = process.env.REACT_APP_OPENVIDU_SERVER_URL;
// const OPEN_VIDU_SECRET = process.env.REACT_APP_OPENVIDU_SERVER_SECRET;
// const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

const BASE_URL = "//viewcampserver.shop";
const REDIRECT_URI = "https://viewtcamp-react.web.app/oauth/kakao/callback";
const LOGOUT_REDIRECT_URI = process.env.REACT_APP_LOGOUT_REDIRECT_URI;
const OPEN_VIDU = "https://wonheekim.shop";
const OPEN_VIDU_SECRET = process.env.REACT_APP_OPENVIDU_SERVER_SECRET;
const CLIENT_ID = "d36456d44e5ce2e100d58247bad28faf";

const url = {
  BASE_URL,
  REDIRECT_URI,
  OPEN_VIDU,
  OPEN_VIDU_SECRET,
  CLIENT_ID,
  LOGOUT_REDIRECT_URI,
};

export default url;