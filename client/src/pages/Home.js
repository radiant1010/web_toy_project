import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from "react";

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isUserName, setIsUserName] = useState("");
  const [isUserId, setIsUserId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      axios.get("http://localhost:3030/birds/logincheck", {
        withCredentials: true,
      }).then((res) => {
        console.log(res);
        console.log(res.data.user);
        if (res.data.user) {
          setIsLogin(true);
          setIsUserName(res.data.user.user_name);
          setIsUserId(res.data.user.user_id);
        }
      }).catch((ex) => {
        console.log("app silent requset fail : " + ex);
      }).finally(() => {
        setLoading(true);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  console.log("App", isLogin);
  if (loading) {
    return (
      <div>
        <h1>안녕하세요?</h1>
        <p>환영합니다!</p>
        {!isLogin ? <>
          <Link to="/auth/sign-up">회원가입</Link><br />
          <Link to="/auth/sign-in">로그인</Link> 
        </> : 
        <Link to={`/auth/mypage/${isUserId}`}>{isUserName}</Link>}
      </div>
    );
  } else {
    return (
      <div>
        Loading ....
      </div>
    )
  }
};

export default Home;