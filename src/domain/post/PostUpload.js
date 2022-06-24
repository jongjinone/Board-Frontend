import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

import { PostUploadForm } from "components/post/";

const PostUpload = () => {
  const navigate = useNavigate()
  const [cookie] = useCookies(["sessionKey"]);
  const [openAlert, setOpenAlert] = useState(false);
  const [postInfo, setPostInfo] = useState({
    title: "",
    content: "",
  })

  const handleAlertClose = (event, reason) => { //게시물 작성 Alert
    setOpenAlert(false); //게시물 Alert 닫기
    navigate('/post') //홈으로 이동
  };

  const handleChange = (e)=>{
    let changePostInfo = { ...postInfo };
    changePostInfo[e.target.name] = e.target.value;
    setPostInfo(changePostInfo);
  }

  //게시물 작성 
  const postSubmit = () => {
    if(postInfo.content==="") return
    let formData = new FormData();
    if(postInfo.title===""){ //제목이 없는 경우 제목없음으로 설정
      formData.append("title", "제목없음");
    }else{ //이외에는 게시물 제목을 설정
      formData.append("title", postInfo.title);
    } 
    formData.append("content", postInfo.content);
    formData.append("user_id", cookie.sessionKey)//유저의 id와 내용을 설정
    const config = { 
      headers: { 
        "Content-Type": "multipart/form-data"
      } 
    };
    axios.post("/api/posts/upload", formData, config)
    .then((res) => {
      setOpenAlert(true); //Alert 열기
    })
    .catch( (err) => {
      console.log(err)
    });
  }

  return (
    <>
      <PostUploadForm 
      postInfo={postInfo}
      handleChange={handleChange}
      postSubmit={postSubmit}
      openAlert={openAlert}
      handleAlertClose={handleAlertClose}
      />
    </>
  );
};

export default PostUpload;
