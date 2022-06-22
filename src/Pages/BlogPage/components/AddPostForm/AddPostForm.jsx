import React, { Component } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

import "./AddPostForm.css";

export class AddPostForm extends Component {
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


  
  //скрытие модального окна
  // handleAddFormHide = () => {
  //   console.log(1)
  //   this.setState({
  //     showAddForm: false,
  //   });
  // };
  
  handleEscape = (e) => {
    if (e.key === "Escape" ) {
      console.log(1)
      this.props.handleAddFormHide();
    }
  };

  componentDidMount() {
     window.addEventListener("keyup",  this.handleEscape);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleEscape);
  }

  createPost = (e) => {
    e.preventDefault();
    const post = {
      title: this.state.postTitle,
      description: this.state.postDescr,
      liked: false,
    };
    this.props.addNewBlogPost(post);
    this.props.handleAddFormHide();
  };

  //отправка формы при нажатии enter
  handleEnter = (e) => {
    e.preventDefault();
    if (e.key === "Enter" && this.state.showAddForm) {
      this.createPost();
    }
  };

 

  render() {
    const handleAddFormHide = this.props.handleAddFormHide;

    return (
      <>
        <form action="" className="addPostForm" onSubmit={this.createPost}>
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
              value={this.state.postTitle}
              onChange={this.handlePostTitleChange}
              required
            />
          </div>
          <div>
            <textarea
              name="postDescr"
              placeholder="Описание поста..."
              className="addFormInput"
              value={this.state.postDescr}
              onChange={this.handlePostDescrChange}
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
}
