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
  const [sort, setSort] = useState("최신순");

  useEffect(() => {
    getList();
  }, [sort]);

  const getList = () => {
    if (sort === "최신순") {
      axios.get("/api/posts").then((res) => {
        let temp = res.data.response;
        setList(temp);
      });
    } else {
      axios.get("/api/posts").then((res) => {
        let arr = res.data.response;
        let temp = arr.sort((a, b) => {
          return b.likes.length - a.likes.length;
        });
        setList(temp);
      });
    }
  };

  const handleSortChange = (e, newAlignment) => {
    setSort(newAlignment);
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

  const search = (datas) => {
    return datas.filter(
      (data) =>
        data.title
          .toString()
          .toLowerCase()
          .indexOf(searchTerm.toString().toLowerCase()) > -1 ||
        data.content
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
