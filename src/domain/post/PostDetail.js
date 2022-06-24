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
  const [open, setOpen] = useState(false);
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
    navigate(-1)
  };

  const handleAlertRepleUploadClose = (event, reason) => {
    setOpenAlertRepleUpload(false);
  };

  const handleAlertRepleModifyClose = (event, reason) => {
    setOpenAlertRepleModify(false);
  };

  const handleAlertRepleDeleteClose = (event, reason) => {
    setOpenAlertRepleDelete(false);
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
    axios
      .post(`/api/posts/${postNum}/like`, formData, config)
      .then((res) => {
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
    axios
      .post(`/api/posts/${postNum}/unlike`, formData, config)
      .then((res) => {
        setPostInfo({ ...postInfo, likes: res.data.result.likes });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //모달창 열기
  const handleOpen = (idx) => {
    setOpen(true);
    setReple(postInfo.reple[idx]); //선택된  reple의 내용과 id를 reple에 저장
  };

  //모달창 닫기
  const handleClose = () => {
    setOpen(false);
  };

  //모달창에서 내용 수정
  const handleChange = (e) => {
    setReple({ ...reple, content: e.target.value }); //댓글내용 수정
  };

  //상세 게시물 불러오기
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

  //게시물 삭제
  const postDelete = () => {
    axios
      .delete(`/api/posts/${postNum}/delete`)
      .then((res) => {
        setOpenAlertPostDelete(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //댓글 작성
  const repleSub = () => {
    if (!content) return;
    let formData = new FormData();
    formData.append("content", content);
    formData.append("user_id", cookie.sessionKey);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post(`/api/posts/${postNum}/reple/submit`, formData, config)
      .then((res) => {
        if (res.data.status === 1) {
          setPostInfo({ ...postInfo, reple: res.data.reple }); // postInfo.reple에는 댓글 배열이 들어감.
          setContent("");
          setOpenAlertRepleUpload(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //댓글 수정
  const repleModify = () => {
    if (!reple.content) return;

    let formData = new FormData();
    formData.append("content", reple.content);
    formData.append("_id", reple._id);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post(`/api/posts/${postNum}/reple/modify`, formData, config)
      .then((res) => {
        if (res.data.status === 1) {
          setPostInfo({ ...postInfo, reple: res.data.reple });
          setContent("");
          setOpen(false);
          setOpenAlertRepleModify(true);
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
    axios
      .post(`/api/posts/${postNum}/reple/delete`, formData, config)
      .then((res) => {
        if (res.data.success === true) {
          setPostInfo({ ...postInfo, reple: res.data.reples });
          setOpenAlertRepleDelete(true)
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
