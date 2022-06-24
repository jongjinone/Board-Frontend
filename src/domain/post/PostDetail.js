import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import moment from "moment";
import "moment/locale/ko";
import MuiAlert from '@mui/material/Alert';
import Snackbar from "@mui/material/Snackbar";

import { PostDetailForm } from "components/post";
import NotFound from "routes/NotFound";
import { Reple } from "components/reple";
import { RepleModal } from "components/modal";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PostDetail = () => {
  const navigate = useNavigate();
  const { postNum } = useParams();
  const [cookie] = useCookies(["sessionKey"]);
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false); //모달창을 열기 위한 상태 함수
  const [openAlertPostDelete, setOpenAlertPostDelete] = useState(false);
  const [openAlertRepleUpload, setOpenAlertRepleUpload] = useState(false);
  const [openAlertRepleModify, setOpenAlertRepleModify] = useState(false);
  const [openAlertRepleDelete, setOpenAlertRepleDelete] = useState(false);

  const [reple, setReple] = useState({
    content: "",
    _id: "",
  });

  const [postInfo, setPostInfo] = useState({
    title: "",
    content: "",
    user_id: "",
    postNum: Number(postNum),
    likes: [
      {
        user_id: "",
      },
    ],
    reple: [
      {
        content: "",
        user_id: "",
      },
    ],
  });

  const handleAlertPostDeleteClose = (event, reason) => {
    setOpenAlertPostDelete(false);
    navigate(-1) //게시글 삭제 Alert이후 이동
  };

  const handleAlertRepleUploadClose = (event, reason) => {
    setOpenAlertRepleUpload(false); //댓글 작성 Alert
  };

  const handleAlertRepleModifyClose = (event, reason) => {
    setOpenAlertRepleModify(false); //댓글 수정 Alert
  };

  const handleAlertRepleDeleteClose = (event, reason) => {
    setOpenAlertRepleDelete(false); //댓글 삭제 Alert
  };

  const UploadTime = (createTime, updateTime) => {
    if (createTime !== updateTime) {
      return (
        moment(updateTime).format("YYYY년 MMMM Do, a hh시 mm분 ss초") +
        "(수정됨)"
      );
    } else {
      return moment(createTime).format("YYYY년 MMMM Do, a hh시 mm분 ss초");
    }
  };

  //like
  const like = () => {
    let formData = new FormData();
    formData.append("user_id", cookie.sessionKey); 
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios //로그인된 유저 id세션 전송
      .post(`/api/posts/${postNum}/like`, formData, config)
      .then((res) => {  //해당 게시물에 대한 정보를 업데이트 해줌.
        setPostInfo({ ...postInfo, likes: res.data.result.likes });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //unlike
  const unlike = () => {
    let formData = new FormData();
    formData.append("user_id", cookie.sessionKey);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios //로그인된 유저 id세션 전송
      .post(`/api/posts/${postNum}/unlike`, formData, config)
      .then((res) => {
        setPostInfo({ ...postInfo, likes: res.data.result.likes });
      }) //입력받은 정보를 다시 게시물 정보로 업데이트.
      .catch((err) => {
        console.log(err);
      });
  };

  //모달창 열기
  const handleOpen = (idx) => { //idx를 전달받아서 
    setOpen(true); //모달창을 열어줌
    setReple(postInfo.reple[idx]); //선택된  reple의 내용과 id를 reple에 저장
  };

  //모달창 닫기
  const handleClose = () => {
    setOpen(false); //모달창을 닫아줌
  };

  //모달창에서 내용 수정
  const handleChange = (e) => {
    setReple({ ...reple, content: e.target.value }); //댓글내용 수정
  };

  //상세 게시물 불러오기
  useEffect(() => {
    axios
      .get(`/api/posts/${postNum}`) //해당 번호의 게시물에 요청
      .then((res) => {
        setPostInfo(res.data); //전달받은 게시물 데이터를 저장함.
      })
      .catch((err) => {
        console.log(err);
      });
  }, [postNum]); //게시물 번호가 변할 때마다 실행.

  //게시물 삭제
  const postDelete = () => {
    axios
      .delete(`/api/posts/${postNum}/delete`) //삭제 요청
      .then((res) => {
        setOpenAlertPostDelete(true); // 게시물 삭제 Alert
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //댓글 작성
  const repleSub = () => {
    if (!content) return; // 댓글이 없는 경우 돌아감
    let formData = new FormData();
    formData.append("content", content);
    formData.append("user_id", cookie.sessionKey);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios //댓글의 내용과 작성자의 id를 전송함.
      .post(`/api/posts/${postNum}/reple/submit`, formData, config)
      .then((res) => {
        if (res.data.status === 1) {
          setPostInfo({ ...postInfo, reple: res.data.reple }); // postInfo.reple에는 댓글 배열이 들어감.
          setContent(""); //전송받은 댓글정보를 해당 게시물 정보에 저장
          setOpenAlertRepleUpload(true); //댓글작성 Alert
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //댓글 수정
  const repleModify = () => {
    if (!reple.content) return; //댓글의 내용이 없는 경우 돌려보냄

    let formData = new FormData();
    formData.append("content", reple.content);
    formData.append("_id", reple._id);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios // 댓글의 내용과 댓글의 id를 전송
      .post(`/api/posts/${postNum}/reple/modify`, formData, config)
      .then((res) => {
        if (res.data.status === 1) {
          setPostInfo({ ...postInfo, reple: res.data.reple });
          setContent(""); //전달받은 게시물에 대한 정보를 업데이트함.
          setOpen(false); //댓글 수정 모달창을 닫음
          setOpenAlertRepleModify(true); //댓글수정 Alert
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //댓글 삭제
  const repleDelete = (idx) => {
    let formData = new FormData();
    formData.append("_id", postInfo.reple[idx]._id);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios //index를 통해 게시물의 특정 댓글 id를 담아서 전송
      .post(`/api/posts/${postNum}/reple/delete`, formData, config)
      .then((res) => {
        if (res.data.success === true) { //전달받은 댓글을 게시물 정보에 업데이트 
          setPostInfo({ ...postInfo, reple: res.data.reples });
          setOpenAlertRepleDelete(true) //댓글 삭제 Alert
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {postInfo.title ? (
        <div>
          <PostDetailForm
            postInfo={postInfo}
            postDelete={postDelete}
            UploadTime={UploadTime}
            like={like}
            unlike={unlike}
            openAlertPostDelete={openAlertPostDelete}
            handleAlertPostDeleteClose={handleAlertPostDeleteClose}
          />
          <Reple
            style={{ marginTop: "20px" }}
            reple={postInfo.reple}
            repleSub={repleSub}
            content={content}
            setContent={setContent}
            handleOpen={handleOpen}
            repleDelete={repleDelete}
            openAlertRepleUpload={openAlertRepleUpload}
            openAlertRepleDelete={openAlertRepleDelete}
            handleAlertRepleUploadClose={handleAlertRepleUploadClose}
            handleAlertRepleDeleteClose={handleAlertRepleDeleteClose}
          />
          <RepleModal
            open={open}
            reple={reple}
            repleModify={repleModify}
            handleChange={handleChange}
            handleClose={handleClose}
          />
        </div>
      ) : (
        <NotFound />
      )}
      <Snackbar
        open={openAlertRepleModify}
        autoHideDuration={2000}
        onClose={handleAlertRepleModifyClose}
      >
        <Alert
          onClose={handleAlertRepleModifyClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          댓글이 수정되었습니다.
        </Alert>
      </Snackbar>
    </>
  );
};

export default PostDetail;
