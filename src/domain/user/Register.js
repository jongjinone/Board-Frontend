import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "components/user";
import axios from "axios";
import { useCookies } from "react-cookie";

const Register = () => {
  const [, setCookie] = useCookies(["sessionKey", "username"]);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    id: "",
    password: "",
    passwordcheck: "",
  });

  const [check, setCheck] = useState({
    IDcheck: false,
    IDdisplay: false,
  });

  const [registerPermit, setRegisterPermit] = useState(false);
  useEffect(() => {
    if (
      userInfo.name.length > 1 &&
      check.IDcheck &&
      userInfo.password.length > 5 &&
      userInfo.password === userInfo.passwordcheck
    ) {
      setRegisterPermit(true);
    } else {
      setRegisterPermit(false);
    }
  }, [userInfo, check.IDcheck]);

  const handleChangeName = (e) => {
    setUserInfo({ ...userInfo, name: e.target.value });
  };

  const handleChangeID = (e) => {
    setCheck({ ...check, IDcheck: false, IDdisplay: false });
    setUserInfo({ ...userInfo, id: e.target.value });
  };

  const handleChangePW = (e) => {
    setUserInfo({ ...userInfo, password: e.target.value });
  };

  const handleChangePwCheck = (e) => {
    setUserInfo({ ...userInfo, passwordcheck: e.target.value });
  };

  const handleClickRegister = (e) => {
    let formData = new FormData();
    formData.append("name", userInfo.name);
    formData.append("id", userInfo.id);
    formData.append("password", userInfo.password);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post("/api/users/register", formData, config)
      .then((res) => {
        console.log(res.data)
        setCookie("sessionKey", res.data._id, { path: "/" });
        setCookie("username", res.data.name, { path: "/" });
        navigate("/post");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleIdCheck = (e) => {
    let formData = new FormData();
    formData.append("id", userInfo.id);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post("/api/users/register/idcheck", formData, config)
      .then((res) => {
        let temp = { ...check };
        temp.IDcheck = res.data.check;

        if (!res.data.check) {
          temp.IDcheck = false;
          temp.IDdisplay = true;
        } else {
          temp.IDcheck = true;
          temp.IDdisplay = true;
        }
        setCheck(temp);
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
