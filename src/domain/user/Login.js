import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

import { LoginForm } from "components/user";

const Login = () => { 
  const [userInfo, setUserInfo] = useState({
    id: "",              //로그인하는 유저에 대한 정보 항목을 만듦.
    password: "",
  });

  const [, setCookie] = useCookies(["sessionKey", "username"]); 
  //세션과 유저의 이름을 사용하기 위한 세션 설정

  const handleChangeInfo = (e) => { //로그인 입력 정보가 들어올 때
    let changeUserInfo = { ...userInfo }; //임시공간에 기존 로그인 정보를 넣고
    changeUserInfo[e.target.name] = e.target.value; //들어오는 값들을 항목에 따라 계속 업데이트해 줌
    setUserInfo(changeUserInfo); // 업데이트되는 임시공간의 로그인 입력 정보에 설정해 줌 
  };

  const handleClickLogin = (e) => { //로그인 버튼이 클릭되는 경우
    let formData = new FormData(); //새로운 폼데이터를 생성
    formData.append("id", userInfo.id); //id key를 만들고 입력된 id를 저장 
    formData.append("password", userInfo.password); //password key를 만들고 입력된 비밀번호를 저장
    const config = { //폼데이터를 전송하기 위한 header 생성
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios //axios 통신을 통해 폼데이터를 해당 경로로 보내줌
      .post("/api/users/login", formData, config)
      .then((res) => { //입력받은 id와 유저 이름을 세션쿠키로 저장함.
        setCookie("sessionKey", res.data.user._id, { path: "/" });
        setCookie("username", res.data.user.name, { path: "/" });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <LoginForm
        userInfo={userInfo}
        handleChangeInfo={handleChangeInfo}
        handleClickLogin={handleClickLogin}
      />
    </>
  );
};

export default Login;
