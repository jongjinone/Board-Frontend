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
      .get(`/api/posts/${postNum}`) //해당 게시물 번호로 전송
      .then((res) => {
        setPostInfo(res.data); //해당 게시물 정보 저장
      })
      .catch((err) => {
        console.log(err);
      });
  }, [postNum]); //게시물 번호가 바뀔 때마다 업데이트

  const handleAlertClose = (event, reason) => {
    setOpenAlert(false); //Alert 닫기
    navigate(-1) //이전화면으로 이동
  };

  const handleChange = (e)=>{ //입력 내용 저장
    let changePostInfo = { ...postInfo };
    changePostInfo[e.target.name] = e.target.value;
    setPostInfo(changePostInfo);
  }

  const modify = () => {
    if(postInfo.content==="") return //내용이 없으면 돌려보냄
    let formData = new FormData();
    if(postInfo.title===""){ //제목이 없는 경우
      formData.append("title", "제목없음"); //제목없음으로 저장
    }else{
      formData.append("title", postInfo.title); //이외는 제목을 저장
    }
    formData.append("content", postInfo.content); //내용을 저장
    const config = { 
      headers: { 
        "Content-Type": "multipart/form-data"
      } 
    }; // 수정할 게시물을 전송
    axios.put(`/api/posts/${postNum}/modify`, formData, config)
    .then((res) => {
      setOpenAlert(true); //게시물 수정 Alert
    })
    .catch( (err) => {
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
