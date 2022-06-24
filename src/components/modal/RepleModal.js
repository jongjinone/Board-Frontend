import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';


const RepleModal = (props) => {
    return(
        <Dialog open={props.open} onClose={props.handleClose} fullWidth>
            <DialogTitle>댓글 수정</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="reple"
                label="수정할 내용"
                type="text"
                fullWidth
                variant="standard"
                value={props.reple.content}
                onChange={props.handleChange}
            />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color='inherit'>취소</Button>
                <Button onClick={props.repleModify}>수정</Button>
            </DialogActions>
        </Dialog>
    );
};

export default RepleModal;