import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import moment from "moment";
import "moment/locale/ko";

import { PostList } from "components/post";

const Home = () => {
  const navigate = useNavigate();

  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("최신순"); //정렬방법

  useEffect(() => {
    getList(); // 정렬방법이 바뀔때마다 게시글 목록을 불러옴.
  }, [sort]);

  const getList = () => {
    if (sort === "최신순") {
      axios.get("/api/posts").then((res) => { //서버와 통신
        setList(res.data.response); //전달받은 게시글 목록을 저장
      });
    } else { // 정렬방법이 인기순인 경우
      axios.get("/api/posts").then((res) => {
        let arr = res.data.response;
        let temp = arr.sort((a, b) => {    //전달받은 게시물들을 좋아요 순으로 내림차순
          return b.likes.length - a.likes.length;
        });
        setList(temp);
      });
    }
  };

  const handleSortChange = (e, newAlignment) => {
    setSort(newAlignment); //정렬방법 토글 함수
  };

  const UploadTime = (createTime, updateTime) => { //생성 및 수정시간 함수
    if (createTime !== updateTime) {
      return (
        moment(updateTime).format("YYYY년 MMMM Do, a hh시 mm분 ss초") +
        "(수정됨)"
      );
    } else {
      return moment(createTime).format("YYYY년 MMMM Do, a hh시 mm분 ss초");
    }
  };

  //게시물 검색
  const search = (datas) => {
    return datas.filter( // 게시물 검색을 위한 필터 함수
      (data) =>
        data.title        //게시물의 제목을 모두 소문자로 바꾸어 검색어와 비교
          .toString()
          .toLowerCase()
          .indexOf(searchTerm.toString().toLowerCase()) > -1 ||
        data.content      //게시물의 내용을 모두 소문자로 바꾸어 검색어와 비교
          .toString()
          .toLowerCase()
          .indexOf(searchTerm.toString().toLowerCase()) > -1
    );
  };

  return (
    <>
      <div className="Bar">
        <ToggleButtonGroup
          color="primary"
          value={sort}
          exclusive
          onChange={handleSortChange}
        >
          <ToggleButton value="최신순">최신순</ToggleButton>
          <ToggleButton value="인기순">인기순</ToggleButton>
        </ToggleButtonGroup>
        <TextField
          className="searchField"
          label="검색어를 입력해주세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          style={{ marginLeft: "20px", width: "400px" }}
        />
        <Button
          className="barButton"
          onClick={() => {
            navigate("/post/upload");
          }}
          variant="contained"
          style={{ marginLeft: "130px" }}
        >
          게시글 작성
        </Button>
      </div>
      <PostList 
        searchList={search(list)} 
        list={list} 
        UploadTime={UploadTime} 
        />
    </>
  );
};

export default Home;
