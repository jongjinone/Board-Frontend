import React from "react";
import {TextField, Button} from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="SiteTitle">Community</div>
      <div className="loginBox">
        <div className="loginform">
          <h1 className="welcome">Welcome!</h1>
          <label style={{ display: "block" }}> ID</label>
          <TextField
            name="id"
            value={props.userInfo.id}
            onChange={props.handleChangeInfo}
            style={{ marginBottom: "10px", width: "90%" }}
          />
          {props.userInfo.id.length < 4 ? (
            <div className="div_message fail_message">
              ID를 4자 이상 입력해주세요
            </div>
          ) : (
            <div className="div_message"></div>
          )}
          <label>PASSWORD</label>
          <TextField
            name="password"
            value={props.userInfo.password}
            onChange={props.handleChangeInfo}
            type="password"
            style={{ marginBottom: "10px", width: "90%" }}
          />
          {props.userInfo.password.length < 6 ? (
            <div className="div_message fail_message">
              비밀번호를 6자 이상 입력해주세요
            </div>
          ) : (
            <div className="div_message"></div>
          )}
        </div>
        <div>
          <Button
            variant="outlined"
            onClick={props.handleClickLogin}
            style={{ marginRight: "10px" }}
            disabled={
              props.userInfo.id.length < 4 && props.userInfo.password.length < 6
                ? true
                : false
            }
          >
            로그인
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              navigate("/user/register");
            }}
          >
            회원가입
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
