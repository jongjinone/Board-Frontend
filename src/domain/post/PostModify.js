import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { PostModifyForm  } from "components/post";

const PostModify = () => {
  const navigate= useNavigate()
  const {postNum} = useParams()
  const [openAlert, setOpenAlert] = useState(false);
  const [postInfo, setPostInfo] = useState({
    title: "",
    content: ""
  })

  useEffect(() => {
    axios
      .get(`/api/posts/${postNum}`)
      .then((res) => {
        setPostInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [postNum]);

  const handleAlertClose = (event, reason) => {
    setOpenAlert(false);
    navigate(-1)
  };

  const handleChange = (e)=>{
    let changePostInfo = { ...postInfo };
    changePostInfo[e.target.name] = e.target.value;
    setPostInfo(changePostInfo);
  }

  const modify = () => {
    if(postInfo.content==="") return
    let formData = new FormData();
    if(postInfo.title===""){
      formData.append("title", "제목없음");
    }else{
      formData.append("title", postInfo.title);
    }
    formData.append("content", postInfo.content);
    const config = { 
      headers: { 
        "Content-Type": "multipart/form-data"
      } 
    };
    axios.put(`/api/posts/${postNum}/modify`, formData, config)
    .then((res) => {
      setOpenAlert(true);
    })
    .catch( (err) => {
      alert("수정에 실패하였습니다.")
      console.log(err)
    });
  }


  return (
    <>
      <PostModifyForm 
      postInfo={postInfo}
      handleChange={handleChange}
      modify={modify}
      openAlert={openAlert}
      handleAlertClose={handleAlertClose}
      />
    </>
  );
};

export default PostModify;
