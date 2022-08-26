// const kakaoLogin = (code) => {
//   return async function (dispatch, getState, { history }) {
//     const token = sessionStorage.getItem("Authorization");
//     try {
//       await api
//         .get(`/user/kakao/callback?code=${code}`, {
//           headers: {
//             "content-type": "application/json;charset=UTF-8",
//             accept: "application/json",
//             Authorization: token,
//           }
//         })
//         .then(function (res) {
//           const jwtToken = res.data.jwtToken;
//           const nickname = res.data.nickname;
//           sessionStorage.setItem("Authorization", jwtToken);
//           sessionStorage.setItem("nickname", nickname);
//           dispatch(setUser(nickname));
//           history.replace("/"); //토큰받아서 로그인 후 화면 전환(메인)
//         });
//     } catch (err) {
//       window.alert("로그인에 실패하였습니다.");
//       history.replace("/login");
//     }
//   };
// }
// const actionCreators = {
//   // logout,
//   kakaoLogin,
//   // getUserList,
//   // getUserListDB,
//   // getFollowerDB,
//   // addFollowingDB,
//   // getFollowingDB,
//   // unFollowingDB,
// };
// export { actionCreators };