import React, { Component } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import "./AddPostForm.css";

export class AddPostForm extends Component {
  state = {
    postTitle: '',
    postDescr: ''
    
  }

  handlePostTitleChange = (e) => {
    this.setState({
      postTitle: e.target.value
    })
  }

  handlePostDescrChange = (e) => {
    this.setState({
      postDescr: e.target.value
    })
  }

  componentDidMount() {
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') this.handlePostDescrChange()
    })
  }

  render() {
    const handleAddFormHide = this.handleAddFormHide;

   
    return (
      <>
            <form action="" className="editPostForm">
                <button className="hideBtn" onClick={handleAddFormHide}>
                <CancelIcon />
                </button>
          
          <h2>Создание поста</h2> 
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
            <button
              type="button"
              className="blackBtn"
              onClick={handleAddFormHide}
            >
              Добавить пост
            </button>
          </div>
        </form>
        <div className="overlay"></div>
      </>
    )
  
  }
  
};
