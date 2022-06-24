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
          {props.postInfo.likes.some(v=> v.user_id===cookie.sessionKey) ? //해당 유저가 게시물 안의 유저들 안에 포함되어 있는지 확인
              <Favorite  //포함되어 있으면(좋아요 클릭) 꽉 찬하트 
              color="error" 
              style={{
                marginLeft:"7px", 
                transform: 'translate(0%, 25%)',
                cursor: "pointer"
              }}
              onClick={props.unlike} //좋아요가 눌려있는 상태에서 누르면 unlike 
              /> :
              <FavoriteBorder //포함되어 있지 않으면(좋아요 클릭x) 빈하트 
              color="error" 
              style={{
                marginLeft:"7px", 
                transform: 'translate(0%, 25%)',
                cursor: "pointer"
              }}
              onClick={()=>{props.like()}} //좋아요가 안눌려있는 상태에서 누르면 like
              />
              } {props.postInfo.likes.length } {/*좋아요안의 유저수를 통해 좋아요 수 표시 */}
        </div>
        {props.postInfo.user_id === cookie.sessionKey && ( //게시글 작성자와 현재 유저가 같다면 수정 삭제가 가능함.
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
