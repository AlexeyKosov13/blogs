import { useState, useEffect } from "react";
import { postsUrl } from "../../shared/projectData";
import { BlogCard } from "./components/BlogCard/BlogCard";
import { AddPostForm } from "./components/AddPostForm/AddPostForm";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { EditPostForm } from "./components/EditPostForm/EditPostForm";

import "./BlogPage.css";

let source; 

export const BlogPage = ({isAdmin}) => {
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [blogArr, setBlogArr] = useState([]);
  const [isPanding, setIsPanding] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});

  //============методы======

  //получение с сервера базы
  const getPosts = () => {
    source = axios.CancelToken.source();
    
    axios
      .get(postsUrl, source.token)
      .then((response) => {
        setBlogArr(response.data);
        setIsPanding(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPosts();
  },[])


  // лайк поста
  const likePost = (blogPost) => {
    const temp = {...blogPost};
    temp.liked = !temp.liked;
    axios.put(`${postsUrl}${blogPost.id}`, temp)
    .then((response) => {
      getPosts();
    })
    .catch ((err) => {
      console.log('Не удалось изменить')
    })
  };

  //добавление поста
  const addNewBlogPost = (blogPost) => {
    setIsPanding(true);
    axios
      .post(`${postsUrl}`, blogPost)
      .then((response) => {
        getPosts();
      })
      .catch((err) => {
        console.log('Не удалось добавить пост');
      });
  };

  // изменение поста 
  const editBlogPost = (updatedBlogPost) => {
    setIsPanding(true);
    axios.put(`${postsUrl}${updatedBlogPost.id}`, updatedBlogPost)
    .then((response) => {
      getPosts();
    })
    .catch((err) => {
      console.log("Не удалось изменить пост");
    });
  }

  // удалиение поста
  const deletePost = (blogPost) => {
    if (window.confirm(`Удалить ${blogPost.title} ?`)) {
      setIsPanding(true);
      axios
        .delete(`${postsUrl}${blogPost.id}`)
        .then((response) => {
          getPosts();
        })
        .catch((err) => {
          console.log("Не удалось удалить пост");
        });
    }
  };

  //показ модального окна
  const handleAddFormShow = () => {
    setShowAddForm(true);
  };

  //скрытие модального окна
  const handleAddFormHide = () => {
    setShowAddForm(false);
  };

  //показ модального окна
  const handleEditFormShow = () => {
    setShowEditForm(true);
  };

  //скрытие модального окна
  const handleEditFormHide = () => {
    setShowEditForm(false);
  };

  //редактирование поста
  const handleSelectPost = (blogPost) => {
    setSelectedPost(blogPost);
  }
 
    //=======пробегаем по массиву с данными
    const blogPosts = blogArr.map((item) => {
      return (
        <BlogCard
          key={item.id}
          title={item.title}
          descr={item.description}
          liked={item.liked}
          likePost={() => likePost(item)}
          deletePost={() => deletePost(item)}
          handleEditFormShow={handleEditFormShow}
          handleSelectPost={()=> handleSelectPost(item)}
          isAdmin={isAdmin}
        />
      );
    });

    if (blogArr.length === 0) return <h1>Загружаю данные...</h1>;

    const postsOpacity  = isPanding ? 0.5: 1;

    return (
      <div className="count">
        {showAddForm && (
          <AddPostForm
            blogArr={blogArr}
            addNewBlogPost={addNewBlogPost}
            handleAddFormHide={handleAddFormHide}
          />
        )}

          {showEditForm && (
            <EditPostForm 
            blogArr={blogArr}   
            editBlogPost={editBlogPost}
            handleEditFormHide={handleEditFormHide}
            selectedPost ={selectedPost}
            />
          )}

        <>
          <h1>Simple Blog</h1>

          {isAdmin && <button className="blackBtn" onClick={handleAddFormShow}>
            Создать новый пост
          </button> }
                 
          <div className="posts" style={{opacity: postsOpacity}} >
            {blogPosts}</div>
        </>

        {isPanding && <CircularProgress  className="preloader"/>}

      </div>
    );
}
