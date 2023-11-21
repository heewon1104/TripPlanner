import React, { useState } from "react";
import CommunityPost from "./communityPost";
import styles from "./community.module.css";
import Header from "./header";

const Community = () => {
  const [posts, setPosts] = useState([]);

  const handlePost = (post) => {
    setPosts([...posts, post]);
  };

  return (
    <div className={styles.communitybox}>
      <Header />
      <div className={styles.Community}>
        <CommunityPost className={styles.posting_btn} onPost={handlePost} />
        <h2>게시글 목록</h2>
        <div>
          {posts.map((post, index) => (
            <div className={styles.posting} key={index}>
              <p>닉네임 {post.nickname}</p>
              <p>별점 {post.rating} </p>
              <p>게시글 내용 {post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
