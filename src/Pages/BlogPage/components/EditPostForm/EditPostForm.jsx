import React, { useState, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

import "./EditPostForm.css";

export const EditPostForm = (props) => {
  const [postTitle, setPostTitle] = useState(props.selectedPost.title);
  const [postDescr, setPostDescr] = useState(props.selectedPost.description);

  const handlePostTitleChange = (e) => {
    setPostTitle(e.target.value);
  };

  const handlePostDescrChange = (e) => {
    setPostDescr(e.target.value);
  };

  const savePost = (e) => {
    e.preventDefault();
    const post = {
      id: props.selectedPost.id,
      title: postTitle,
      description: postDescr,
      liked: props.selectedPost.liked,
    };
    props.editBlogPost(post);
    props.handleEditFormHide();
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
  
 
    const handleEditFormHide = props.handleEditFormHide;

    return (
      <>
        <form action="" className="editPostForm" onSubmit={savePost}>
          <button className="hideBtn" onClick={handleEditFormHide}>
            <CancelIcon />
          </button>

          <h2>Редактирование поста</h2>
          <div>
            <input
              type="text"
              name="postTitle"
              placeholder="Заголовок поста..."
              className="editFormInput"
              value={postTitle}
              onChange={handlePostTitleChange}
            />
          </div>
          <div>
            <textarea
              name="postDescr"
              placeholder="Описание поста..."
              className="editFormInput"
              value={postDescr}
              onChange={handlePostDescrChange}
            />
          </div>
          <div>
            <button type="submit" className="blackBtn">
              Сохранить
            </button>
          </div>
        </form>
        <div className="overlay" onClick={handleEditFormHide}></div>
      </>
    );
  }
