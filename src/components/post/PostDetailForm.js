import React from "react";
import { useNavigate } from "react-router-dom";
import {Button, Snackbar} from "@mui/material";
import { useCookies } from "react-cookie";
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PostDetailForm = (props) => {
  const navigate = useNavigate();
  const [cookie] = useCookies(["sessionKey"]);

  return (
    <>
      <div className="postDetailBox">
        <div>
          <h2>{props.postInfo.title}</h2>
        </div>
        <div>
          <h3>{props.postInfo.content}</h3>
        </div>
        <div>
          {props.UploadTime(props.postInfo.createdAt, props.postInfo.updatedAt)}
          {props.postInfo.likes.some(v=> v.user_id===cookie.sessionKey) ? 
              <Favorite 
              color="error" 
              style={{
                marginLeft:"7px", 
                transform: 'translate(0%, 25%)',
                cursor: "pointer"
              }}
              onClick={props.unlike}
              /> :
              <FavoriteBorder 
              color="error" 
              style={{
                marginLeft:"7px", 
                transform: 'translate(0%, 25%)',
                cursor: "pointer"
              }}
              onClick={()=>{props.like()}}
              />
              } {props.postInfo.likes.length}
        </div>
        {props.postInfo.user_id === cookie.sessionKey && (
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <Button
              onClick={() => navigate(`/post/${props.postInfo.postNum}/modify`)}
              style={{ marginRight: "10px" }}
              variant="contained"
            >
              수정
            </Button>
            <Button
              onClick={() => {
                props.postDelete();
              }}
              variant="outlined"
            >
              삭제
            </Button>
          </div>
        )}
      </div>
      <Snackbar 
        open={props.openAlertPostDelete} 
        autoHideDuration={2000} 
        onClose={props.handleAlertPostDeleteClose}>
        <Alert 
          onClose={props.handleAlertPostDeleteClose} 
          severity="success" 
          sx={{ width: '100%' }}
          >
          게시물이 삭제되었습니다.
        </Alert>
      </Snackbar>
    </>
  );
};

export default PostDetailForm;
