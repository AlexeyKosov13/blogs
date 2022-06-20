import React, { Component } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

import "./EditPostForm.css";

export class EditPostForm extends Component {
  state = {
    postTitle: "",
    postDescr: "",
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

  componentDidMount() {
    window.addEventListener("keyup", (e) => {
      if (e.key === "Escape") this.handlePostDescrChange();
    });
  }

  createPost = (e) => {
    e.preventDefault();
    const post = {
      title: this.state.postTitle,
      description: this.state.postDescr,
      liked: false,
    };
    this.props.addNewBlogPost(post);
    this.props.handleEditFormHide();
  };

  // //отправка формы при нажатии enter
  // handleEnter = (e) => {
  //   e.preventDefault();
  //   if (e.key === "Enter" && this.state.showAddForm) {
  //     this.createPost();
  //   }
  // };

  // componentDidMount() {
  //   this.getPosts();
  //   window.addEventListener("keyup", this.handleEnter);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("keyup", this.handleEnter);
  // }

  render() {
    const handleEditFormHide = this.handleEditFormHide;

    return (
      <>
        <form action="" className="editPostForm" onSubmit={this.createPost}>
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
