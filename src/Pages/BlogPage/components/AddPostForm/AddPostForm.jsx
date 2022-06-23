import React, { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

import "./AddPostForm.css";

export const AddPostForm = (props) => {
 
  const [postTitle, setPostTitle] = useState('');
  const [postDescr, setPostDescr] = useState('');

  const handlePostTitleChange = (e) => {
    setPostTitle(e.target.value);
  };

  const handlePostDescrChange = (e) => {
    setPostDescr(e.target.value);
  };
 
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" ) {
        props.handleEditFormHide();
      }
    };
    window.addEventListener("keyup", handleEscape);

    return () => window.removeEventListener('keyup', handleEscape)
  }, [props])


  const createPost = (e) => {
    e.preventDefault();
    const post = {
      title: postTitle,
      description: postDescr,
      liked: false,
    };
    props.addNewBlogPost(post);
    props.handleAddFormHide();
  };

    const handleAddFormHide = props.handleAddFormHide;

  return (
      <>
        <form action="" className="addPostForm" onSubmit={createPost}>
          <button className="hideBtn" onClick={handleAddFormHide}>
            <CancelIcon />
          </button>

          <h2>Создание поста</h2>
          <div>
            <input
              type="text"
              name="postTitle"
              placeholder="Заголовок поста..."
              className="addFormInput"
              value={postTitle}
              onChange={handlePostTitleChange}
              required
            />
          </div>
          <div>
            <textarea
              name="postDescr"
              placeholder="Описание поста..."
              className="addFormInput"
              value={postDescr}
              onChange={handlePostDescrChange}
              required
            />
          </div>
          <div>
            <button type="submit" className="blackBtn">
              Добавить пост
            </button>
          </div>
        </form>
        <div className="overlay" onClick={handleAddFormHide}></div>
      </>
    );
  }
