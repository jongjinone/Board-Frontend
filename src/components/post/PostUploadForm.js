import React from "react";
import {Button, Snackbar, TextField} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PostUploadForm = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="uploadBox">
        <label
          style={{
            display: "block",
            fontSize: "30px",
            marginBottom: "10px",
            width: "100%",
          }}
        >
          제목
        </label>
        <TextField
          name="title"
          value={props.postInfo.title}
          onChange={props.handleChange}
          fullWidth
          style={{ marginBottom: "30px" }}
        />
        <label
          style={{
            display: "block",
            fontSize: "30px",
            marginBottom: "10px",
            width: "100%",
          }}
        >
          내용
        </label>
        <TextField
          name="content"
          value={props.postInfo.content}
          onChange={props.handleChange}
          fullWidth
          multiline
          style={{ marginBottom: "30px", height: "200" }}
        />
        <div>
          <Button
            variant="contained"
            style={{ marginRight: "20px" }}
            onClick={() => {
              props.postSubmit();
            }}
          >
            업로드
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              navigate("/post");
            }}
          >
            취소
          </Button>
        </div>
      </div>
      <Snackbar 
        open={props.openAlert} 
        autoHideDuration={2000} 
        onClose={props.handleAlertClose}>
        <Alert 
          onClose={props.handleAlertClose} 
          severity="success" 
          sx={{ width: '100%' }}
          >
          게시물 업로드 성공!
        </Alert>
      </Snackbar>
    </>
  );
};

export default PostUploadForm;
