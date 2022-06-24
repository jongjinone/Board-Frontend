import React from "react";
import { Button, TextField, Snackbar } from "@mui/material";
import { useCookies } from "react-cookie";

import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Reple = (props) => {
  const [cookie] = useCookies(["sessionKey"]);

  return (
    <>
      <div className="repleArea">
        <div className="repleInputContainer" style={{ marginBottom: "30px" }}>
          <TextField
            label="댓글을 입력해주세요."
            value={props.content}
            onChange={(e) => props.setContent(e.target.value)}
            variant="outlined"
            multiline
            style={{ width: "85%", margin: "0" }}
          />
          <Button
            className="barButton"
            variant="outlined"
            style={{ marginLeft: "5%" }}
            onClick={props.repleSub}
          >
            등록
          </Button>
        </div>
        <div className="repleContainer" style={{ display: "block" }}>
          {props.reple.map((reple, idx) => {
            return (
              <div className="reples" key={idx}>
                {reple.content.split('\r\n').map((text, i)=> {
                  return(
                    <span>{text}<br/></span>
                  )
                })}
                {props.reple[idx].user_id === cookie.sessionKey && (
                  <div className="buttons">
                    <Button onClick={() => props.handleOpen(idx)}>수정</Button>
                    <Button
                      onClick={() => {
                        props.repleDelete(idx);
                      }}
                      color="error"
                      style={{ marginLeft: "5px" }}
                    >
                      삭제
                    </Button>
                  </div>
                )}
                <hr />
              </div>
            );
          })}
        </div>
      </div>
      <Snackbar
        open={props.openAlertRepleUpload}
        autoHideDuration={2000}
        onClose={props.handleAlertRepleUploadClose}
      >
        <Alert
          onClose={props.handleAlertRepleUploadClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          댓글이 작성되었습니다.
        </Alert>
      </Snackbar>
      <Snackbar
        open={props.openAlertRepleDelete}
        autoHideDuration={2000}
        onClose={props.handleAlertRepleDeleteClose}
      >
        <Alert
          onClose={props.handleAlertRepleDeleteClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          댓글이 삭제되었습니다.
        </Alert>
      </Snackbar>
    </>
  );
};

export default Reple;
