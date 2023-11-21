import React, { useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./communityPost.module.css";

const CommunityPost = ({ onPost }) => {
  const [showModal, setShowModal] = useState(false);
  const [post, setPost] = useState({ nickname: "", rating: 0, content: "" });

  // 각 입력 필드에 대한 ref를 생성합니다.
  const authorInput = useRef(null);
  const contentInput = useRef(null);

  const handleShow = () => {
    setShowModal(true);

    // 모달이 열릴 때 닉네임 입력 필드로 focus를 이동합니다.
    if (authorInput.current) {
      authorInput.current.focus();
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = () => {
    if (post.nickname.length < 1) {
      // focus
      authorInput.current.focus();
      return;
    }
    if (post.content.length < 5) {
      // focus
      contentInput.current.focus();
      return;
    }

    // 부모 컴포넌트의 onPost 함수를 호출하여 게시글을 전달
    onPost(post);

    // 폼을 초기화하고 모달 닫기
    setPost({ nickname: "", rating: 0, content: "" });
    handleClose();
  };

  return (
    <div className="button-container">
      <button className="posting_btn" onClick={handleShow}>
        게시글 작성하기
      </button>
      <Modal
        show={showModal}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>게시글 작성</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>
            닉네임
            <input
              type="text"
              name="nickname"
              value={post.nickname}
              onChange={handleInputChange}
              ref={authorInput} // ref를 연결
            />
          </label>
          <label>
            여행지 추천지수
            <select
              name="rating"
              value={post.rating}
              onChange={handleInputChange}
            >
              <option value={1}>★</option>
              <option value={2}>★★</option>
              <option value={3}>★★★</option>
              <option value={4}>★★★★</option>
              <option value={5}>★★★★★</option>
            </select>
          </label>
          <label>
            게시글 내용
            <textarea
              name="content"
              value={post.content}
              onChange={handleInputChange}
              ref={contentInput} // ref를 연결
            />
          </label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            등록
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CommunityPost;
