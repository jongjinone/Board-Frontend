import React from "react";
import { useNavigate } from "react-router-dom";
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useCookies } from "react-cookie";

const PostList = (props) => {
  const navigate = useNavigate()
  const [cookie] = useCookies(["sessionKey"]);

  return (
    <div className="ListBox">
      {
      props.searchList.map((post, idx) => {
        return (
          <div key={idx} onClick={()=>{navigate(`/post/${props.list[idx].postNum}`)}}>
              <p className="title">
                  <b>{post.title} </b>
              </p>
              <p>{post.content}</p>
              <p>
                {props.UploadTime(post.createdAt, post.updatedAt)} 
              {
              post.likes.some(v=> v.user_id===cookie.sessionKey) ? 
              <Favorite 
              color="error" 
              style={{marginLeft:"7px", transform: 'translate(0%, 25%)'}}
              /> :
              <FavoriteBorder 
              color="error"
              style={{marginLeft:"7px", transform: 'translate(0%, 25%)'}}
              />
              } {post.likes.length}
              </p>
              <hr />
          </div>
        )
      })
      }
    </div>
  );
};

export default PostList;
