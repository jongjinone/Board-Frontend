import React from "react";
import { Home } from "domain/post";
import { PostUpload, PostDetail, PostModify } from "domain/post";
import { Routes, Route } from "react-router-dom";
import NotFound from "routes/NotFound";
import Menubar from "components/Menubar";
import { useCookies  } from "react-cookie";

const PostPresenter = () => {
  const [cookie, ,] = useCookies(['sessionKey']);

  return (
    <> {/*메뉴바에서 쿠키를 사용하여 메뉴바 안의 모든 페이지에서 쿠키가 적용됨 */} 
      <Menubar userName={cookie.userName}>
        <Routes> {/* post에 관한 경로를 나누어 놓음 */} 
          <Route path="" element={<Home />} />
          <Route path=":postNum/" element={<PostDetail />} />
          <Route path=":postNum/modify" element={<PostModify />} />
          <Route path="upload" element={<PostUpload />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Menubar>
    </>
  );
};

export default PostPresenter;
