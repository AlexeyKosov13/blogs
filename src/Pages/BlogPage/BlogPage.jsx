import React, { Component } from "react";
import { postsUrl } from "../../shared/projectData";
import { BlogCard } from "./components/BlogCard/BlogCard";
import { AddPostForm } from "./components/AddPostForm/AddPostForm";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { EditPostForm } from "./components/EditPostForm/EditPostForm";

import "./BlogPage.css";

let source; 

export class BlogPage extends Component {
  state = {
    showAddForm: false,
    showEditForm: false,
    blogArr: [],
    isPanding: false,
    selectedPost:{},
  };

  //============методы======

  //получение с сервера базы
  getPosts = () => {
    source = axios.CancelToken.source();
    
    axios
      .get(postsUrl, source.token)
      .then((response) => {
        this.setState({
          blogArr: response.data,
          isPanding: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getPosts(); 
  }

  componentWillUnmount() {
    if (source) {
      source.cancel();
    }
  }

  // лайк поста
  likePost = (blogPost) => {
    const temp = {...blogPost};
    temp.liked = !temp.liked;
    axios.put(`${postsUrl}${blogPost.id}`, temp)
    .then((response) => {
      this.getPosts();
    })
    .catch ((err) => {
      console.log('Не удалось изменить')
    })
  };

  //добавление поста
  addNewBlogPost = (blogPost) => {
    this.setState({
      isPanding: true,
    });
    axios
      .post(`${postsUrl}`, blogPost)
      .then((response) => {
        this.getPosts();
      })
      .catch((err) => {
        console.log('Не удалось добавить пост');
      });
  };

  // изменение поста 
  editBlogPost = (updatedBlogPost) => {
    this.setState({
      isPanding: true,
    });
    axios.put(`${postsUrl}${updatedBlogPost.id}`, updatedBlogPost)
    .then((response) => {
      this.getPosts();
    })
    .catch((err) => {
      console.log("Не удалось изменить пост");
    });
  }

  // удалиение поста
  deletePost = (blogPost) => {
    if (window.confirm(`Удалить ${blogPost.title} ?`)) {
      this.setState({
        isPanding: true,
      });
      axios
        .delete(`${postsUrl}${blogPost.id}`)
        .then((response) => {
          this.getPosts();
        })
        .catch((err) => {
          console.log("Не удалось удалить пост");
        });
    }
  };

  


  //показ модального окна
  handleAddFormShow = () => {
    this.setState({
      showAddForm: true,
    });
  };

  //скрытие модального окна
  handleAddFormHide = () => {
    console.log(1)
    this.setState({
      showAddForm: false,
    });
  };

  //показ модального окна
  handleEditFormShow = () => {
    this.setState({
      showEditForm: true,
    });
  };

  //скрытие модального окна
  handleEditFormHide = () => {
    this.setState({
      showEditForm: false,
    });
  };

  //редактирование поста
  handleSelectPost = (blogPost) => {
    this.setState({
      selectedPost: blogPost,
    })
  }
 
 

  render() {
    //=======пробегаем по массиву с данными
    const blogPosts = this.state.blogArr.map((item) => {
      return (
        <BlogCard
          key={item.id}
          title={item.title}
          descr={item.description}
          liked={item.liked}
          likePost={() => this.likePost(item)}
          deletePost={() => this.deletePost(item)}
          handleEditFormShow={this.handleEditFormShow}
          handleSelectPost={()=> this.handleSelectPost(item)}
        />
      );
    });

    if (this.state.blogArr.length === 0) return <h1>Загружаю данные...</h1>;


    const postsOpacity  = this.state.isPanding ? 0.5: 1;

    return (
      <div className="count">
        {this.state.showAddForm && (
          <AddPostForm
            blogArr={this.state.blogArr}
            addNewBlogPost={this.addNewBlogPost}
            handleAddFormHide={this.handleAddFormHide}
          />
        )}

          {this.state.showEditForm && (
            <EditPostForm 
            blogArr={this.state.blogArr}   
            editBlogPost={this.editBlogPost}
            handleEditFormHide={this.handleEditFormHide}
            selectedPost ={this.state.selectedPost}
            />
          )}

        <>
          <h1>Simple Blog</h1>
          <button className="blackBtn" onClick={this.handleAddFormShow}>
            Создать новый пост
          </button>        
          <div className="posts" style={{opacity: postsOpacity}} >
            {blogPosts}</div>
        </>

        {this.state.isPanding && <CircularProgress  className="preloader"/>}

      </div>
    );
  }
}
