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

  const handleAlertClose = (event, reason) => {
    setOpenAlert(false);
    navigate('/post')
  };

  const handleChange = (e)=>{
    let changePostInfo = { ...postInfo };
    changePostInfo[e.target.name] = e.target.value;
    setPostInfo(changePostInfo);
  }

  const postSubmit = () => {
    if(postInfo.content==="") return
    let formData = new FormData();
    if(postInfo.title===""){
      formData.append("title", "제목없음");
    }else{
      formData.append("title", postInfo.title);
    }
    formData.append("content", postInfo.content);
    formData.append("user_id", cookie.sessionKey)
    const config = { 
      headers: { 
        "Content-Type": "multipart/form-data"
      } 
    };
    axios.post("/api/posts/upload", formData, config)
    .then((res) => {
      setOpenAlert(true);
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
