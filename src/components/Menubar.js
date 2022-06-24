import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Menubar = (props) => {
  const navigate = useNavigate();
  const [cookie, ,removeCookie] = useCookies(["sessionKey", "username"])

  const logout = () => { //로그아웃 시 쿠키를 모두 제거해 줌.
    removeCookie("sessionKey", { path: '/' });
    removeCookie("username", { path: '/' });
  };

  return (
    <>
      <div className="menubar">
        <h1 onClick={()=>{navigate('/post')}} style={{ display: "inline"}}>Community</h1>
        <div style={{float:"right", margin:"12.5px 0px"}}>
        <span> | <span style={{color:"blue"}}>{cookie.username}</span>님 환영합니다. | </span>
        <span 
          className="logoutClick"
          onClick={logout}
        >
           로그아웃
        </span>
        </div>
      </div>
      <div>
        {props.children}
      </div>
    </>
  );
};

export default Menubar;
