import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


function useFetch(url) {

  const [data, setData] = useState([])

  useEffect(() => {
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setData(data)
      })
  }, [url])

  return data;

}

function useLoginFetch(url) {

  const [data, setData] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    fetch(url, {
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
}

function useUserDataFetch(url) {

  const [data, setData] = useState([])

  useEffect(() => {
    const token = sessionStorage.getItem("Authorization");
    fetch(url, {
      method: 'GET',
      headers: {
        "Authorization": token
      }
    })
      .then(res => res.json())
      .then(data => {
        setData(data)
      })
  }, []);

  return data
}


export { useFetch, useLoginFetch, useUserDataFetch }