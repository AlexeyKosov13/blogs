import React, { Component } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

import "./EditPostForm.css";

export class EditPostForm extends Component {
  state = {
    postTitle: this.props.selectedPost.title,
    postDescr: this.props.selectedPost.description,
  };

  handlePostTitleChange = (e) => {
    this.setState({
      postTitle: e.target.value,
    });
  };

  handlePostDescrChange = (e) => {
    this.setState({
      postDescr: e.target.value,
    });
  };

  savePost = (e) => {
    e.preventDefault();
    const post = {
      id: this.props.selectedPost.id,
      title: this.state.postTitle,
      description: this.state.postDescr,
      liked: this.props.selectedPost.liked,
    };
    this.props.editBlogPost(post);
    this.props.handleEditFormHide();
  };

  handleEscape = (e) => {
    if (e.key === "Escape" ) {
      console.log(1)
      this.props.handleEditFormHide();
    }
  };

  componentDidMount() {
     window.addEventListener("keyup",  this.handleEscape);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleEscape);
  }

  render() {
    const handleEditFormHide = this.props.handleEditFormHide;

    return (
      <>
        <form action="" className="editPostForm" onSubmit={this.savePost}>
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
              value={this.state.postTitle}
              onChange={this.handlePostTitleChange}
            />
          </div>
          <div>
            <textarea
              name="postDescr"
              placeholder="Описание поста..."
              className="editFormInput"
              value={this.state.postDescr}
              onChange={this.handlePostDescrChange}
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
}
