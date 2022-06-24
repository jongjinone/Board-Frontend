import React, {useEffect} from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"; 

import NotFound from "./NotFound"; 
import { Main, User, Post } from "./pages";

const MainRoutes = () => {
  const [cookies] = useCookies(["sessionKey"]); //sessionKey라는 이름으로 쿠키를 사용하기 위한 설정

  const location = useLocation() //현재경로에 대한 정보를 파악할 수 있음
  const navigate = useNavigate() // 새로고침 없이 경로 이동을 할 수 있음.

  useEffect(() => {
    if (cookies.sessionKey===undefined&&(location.pathname!=="/"||location.pathname!=="/user/login")) {//세션이 없는데 로그인페이지가 아닌 경우
      if(location.pathname==="/user/register"){ // 세션키는 없지만 경로가 회원가입페이지인 경우에는
        return navigate('/user/register') // 회원가입으로 이동가능
      } 
      navigate('/') //나머지는 무조건 로그인 페이지에서 시작해야 함.
    } else if(cookies.sessionKey && cookies.sessionKey!==undefined&& (location.pathname==="/" || location.pathname==="/user/login" || location.pathname==="/user/register") ){
      navigate('/post') // 세션키가 있는데 로그인페이지거나 회원가입 페이지인경우 무조건 홈으로 이동
    }
    
  }, [cookies.sessionKey, location.pathname]); //쿠키의 세션과 경로 이름을 통해 항상 확인

  return (
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/user/*" element={<User />} /> {/* user 이후의 경로를 모아놓음 */} 
        <Route path="/post/*" element={<Post />} /> {/* post 이후의 경로를 모아놓음*/} 
        <Route path="/*" element={<NotFound />} /> {/*이외의 모든 경로는 찾을 수 없음 */} 
      </Routes>
  );
};

export default MainRoutes;
