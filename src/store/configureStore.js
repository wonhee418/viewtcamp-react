// import { configureStore, createSlice } from "@reduxjs/toolkit";
// import url from "./../shared/url";
// import { useState, useEffect } from "react";
// import { resolvePath, useNavigate } from 'react-router-dom';
// import axios from "axios"
// import api from '../shared/api';

// // // const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
// // // const NEWEST_URL = "https://api.hnpwa.com/v0/newest/1.json";
// // // const ASK_URL = "https://api.hnpwa.com/v0/ask/1.json";
// // // const SHOW_URL = "https://api.hnpwa.com/v0/show/1.json";
// // // const JOB_URL = "https://api.hnpwa.com/v0/jobs/1.json";

// // // const ajax = new XMLHttpRequest();



// // function jobData() {
// //   ajax.open("GET", JOB_URL, false);
// //   ajax.send();
// //   return JSON.parse(ajax.response);
// // }

// async function reviewData() {
//   const token = sessionStorage.getItem("Authorization");
//   try {
//     await api
//       .get("/user-reviews", {
//         headers: {
//           "Authorization": token
//         }
//       })
//       .then((res) => {
//         console.log()
//       })
//   }
//   catch (e) {
//     console.log(e)
//   }
// };

// console.log(reviewData())



// // function useUserDataFetch() {
// //   const [data, setData] = useState([])
// //   const token = sessionStorage.getItem("Authorization");
// //   fetch(`${url.BASE_URL}/user-myinfo`, {
// //     method: 'GET',
// //     headers: {
// //       "Authorization": token
// //     }
// //   })
// //     .then(res => res.json())
// //     .then(data => {
// //       setData(data)
// //     })
// //   return data
// // }



// let myInfo = createSlice({
//   name: "myInfo",
//   initialState: reviewData(),
// });



// export default configureStore({
//   reducer: {
//     myInfo: myInfo.reducer,
//   },
// });

// // // export default news;
