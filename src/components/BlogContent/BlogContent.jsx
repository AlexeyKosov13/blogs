import React, { Component } from "react";
import { POSTS } from "../../shared/projectData";
import { BlogCard } from "./components/BlogCard/BlogCard";

import "./BlogContent.css";
import { AddPostForm } from "./components/AddPostForm/AddPostForm";

export class BlogContent extends Component {
  state = {
    showAddForm: false,
    blogArr: JSON.parse(localStorage.getItem("blogPosts")) || POSTS,
  };

  //============методы======

  likePost = (pos) => {
    const temp = [...this.state.blogArr];
    temp[pos].liked = !temp[pos].liked;
    this.setState({
      blogArr: temp,
    });

    localStorage.setItem("blogPosts", JSON.stringify(temp));
  };



  deletePost = (pos) => {
    if (window.confirm(`Удалить ${this.state.blogArr[pos].title} ?`)) {
      // делаем копию массива
      const temp = [...this.state.blogArr];
      //удаляем пост
      temp.splice(pos, 1);
      //записываем в state
      this.setState({
        blogArr: temp,
      });

      localStorage.setItem("blogPosts", JSON.stringify(temp));
    }
  };

  handleAddFormShow = () => {
    this.setState({
      showAddForm: true
    })
  }

  handleAddFormHide = () => {
    this.setState({
      showAddForm: false
    })
  }

  render() {
    //=======пробегаем по массиву с данными
    const blogPosts = this.state.blogArr.map((item, pos) => {
      return (
        <BlogCard
          key={item.id}
          title={item.title}
          descr={item.description}
          liked={item.liked}
          likePost={() => this.likePost(pos)}
          deletePost={() => this.deletePost(pos)}
        />
      );
    });

    return (
      <div className="count">
        {
          this.state.showAddForm ? <AddPostForm handleAddFormHide={this.handleAddFormHide} />  :null
        }       
          <>
            <h1>Simple Blog</h1>
            <button className="blackBtn" onClick={ this.handleAddFormShow}>Создать новый пост</button>
            <div className="posts">{blogPosts}</div>
          </>     
      </div>
    );
  }
}
