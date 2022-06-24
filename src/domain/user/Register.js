import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "components/user";
import axios from "axios";
import { useCookies } from "react-cookie";

const Register = () => {
  const [, setCookie] = useCookies(["sessionKey", "username"]);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ //유저 정보를 입력받음
    name: "",
    id: "",
    password: "",
    passwordcheck: "",
  });

  const [check, setCheck] = useState({ //id중복체크와 id메시지 표시여부
    IDcheck: false,
    IDcheckDisplay: false,
  });

  const [registerPermit, setRegisterPermit] = useState(false);
  //회원가입 허용상태 변수

  useEffect(() => {
    if (
      userInfo.name.length > 1 && // 이름길이, id중복체크, 비밀번호 길이 및 일치여부 통과 시, 
      check.IDcheck &&
      userInfo.password.length > 5 &&
      userInfo.password === userInfo.passwordcheck
    ) {
      setRegisterPermit(true); // 회원가입 허용
    } else {
      setRegisterPermit(false); //회원가입 불허
    }
  }, [userInfo, check.IDcheck]); //유저 정보, ID 중복 체크 여부를 검사

  const handleChangeName = (e) => { 
    setUserInfo({ ...userInfo, name: e.target.value });
  };

  const handleChangeID = (e) => {
    setCheck({ ...check, IDcheck: false, IDcheckDisplay: false });
    setUserInfo({ ...userInfo, id: e.target.value });
  };

  const handleChangePW = (e) => {
    setUserInfo({ ...userInfo, password: e.target.value });
  };

  const handleChangePwCheck = (e) => {
    setUserInfo({ ...userInfo, passwordcheck: e.target.value });
  };

  const handleClickRegister = (e) => {
    let formData = new FormData(); //새로운 폼 데이터 형성
    formData.append("name", userInfo.name);
    formData.append("id", userInfo.id);
    formData.append("password", userInfo.password);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post("/api/users/register", formData, config) // 회원가입 통신
      .then((res) => { // 서버에서 받은 유저 정보를 세션으로 저장후 이동
        setCookie("sessionKey", res.data._id, { path: "/" });
        setCookie("username", res.data.name, { path: "/" });
        navigate("/post");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleIdCheck = (e) => { //id중복체크 여부를 확인하는 함수
    let formData = new FormData();
    formData.append("id", userInfo.id); //입력된 유저id를 서버에 전송
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post("/api/users/register/idcheck", formData, config)
      .then((res) => {
        let temp = { ...check };
        temp.IDcheck = res.data.check; // 서버에서 전송된 체크 상태를 저장

        if (!res.data.check) { //아이디가 중복된 상태라면
          temp.IDcheck = false; // id체크는 false
          temp.IDcheckDisplay = true; //중복여부 표시 true
        } else {
          temp.IDcheck = true; //아이디가 중복되지 않은 상태
          temp.IDcheckDisplay = true; // 중복여부 표시 true
        }
        setCheck(temp); //체크상태를 저장
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <RegisterForm
        handleIdCheck={handleIdCheck}
        check={check}
        userInfo={userInfo}
        handleChangeID={handleChangeID}
        handleChangeName={handleChangeName}
        handleChangePW={handleChangePW}
        handleChangePwCheck={handleChangePwCheck}
        handleClickRegister={handleClickRegister}
        registerPermit={registerPermit}
      />
    </>
  );
};

export default Register;
