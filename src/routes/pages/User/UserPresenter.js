import React from "react";
import { Routes, Route } from "react-router-dom";

import { Login, Register } from "domain/user";
import NotFound from "routes/NotFound";

const UserPresenter = () => {
  return (
    <>
      <Routes> {/* user의 경로를 로그인과 회원가입 경로로 나눔*/} 
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} /> {/* 나머지는 모두 NotFound */} 
      </Routes>
    </>
  );
};

export default UserPresenter;
