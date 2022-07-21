import { useState } from "react";
import { BlogCard } from "./components/BlogCard/BlogCard";
import { AddPostForm } from "./components/AddPostForm/AddPostForm";
import { CircularProgress } from "@mui/material";
import { EditPostForm } from "./components/EditPostForm/EditPostForm";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useGetPosts, useLikePost, useDeletePost, useEditPost, useAddPost } from "../../shared/queries";

import "./BlogPage.css";
import Head from "../../components/Head/Head";

export const BlogPage = ({ isAdmin, searchKey, filteredPosts }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
 

  const {data: posts, isLoading, isError, error, isFetching} =  useGetPosts();

  const likeMutation = useLikePost();
  const deleteMutation = useDeletePost();
  const editMutation = useEditPost();
  const addMutation = useAddPost();

 
  
  if (isLoading) return <h1>Загружаю данные...</h1>;

  if (isError) return <h1>{error.message}</h1> 

  //============методы======


  // лайк поста
  const likePost = (blogPost) => {
    const updatedPost = { ...blogPost };
    updatedPost.liked = !updatedPost.liked;
    likeMutation.mutate(updatedPost)
  };

  //добавление поста
  const addNewBlogPost = (blogPost) => {
    addMutation.mutate(blogPost)
  };

  // изменение поста
  const editBlogPost = (updatedBlogPost) => {
    editMutation.mutate(updatedBlogPost)   
  };

  // удалиение поста
  const deletePost = (blogPost) => {
    if (window.confirm(`Удалить ${blogPost.title} ?`)) {
     deleteMutation.mutate(blogPost)
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
  };

  //=======пробегаем по массиву с данными
  const blogPosts =filteredPosts.length>0?filteredPosts.map((item) => {
    return (
      <div className="blogPost" key={item.id}>
        <BlogCard         
          title={item.title}
          descr={item.description}
          liked={item.liked}
          likePost={() => likePost(item)}
          deletePost={() => deletePost(item)}
          handleEditFormShow={handleEditFormShow}
          handleSelectPost={() => handleSelectPost(item)}
          isAdmin={isAdmin}
        />
        <Link to={`/blog/${item.id}`} className="blogPostMore"><p>Подробнее</p> <ArrowForwardIosIcon /> </Link>
      </div>
    );
  }):
  posts.map((item) => {
    return (
      <div className="blogPost" key={item.id}>
        <BlogCard         
          title={item.title}
          descr={item.description}
          liked={item.liked}
          likePost={() => likePost(item)}
          deletePost={() => deletePost(item)}
          handleEditFormShow={handleEditFormShow}
          handleSelectPost={() => handleSelectPost(item)}
          isAdmin={isAdmin}
        />
        <Link to={`/blog/${item.id}`} className="blogPostMore"><p>Подробнее</p> <ArrowForwardIosIcon /> </Link>
      </div>
    );
  });

 

  const postsOpacity = isFetching ? 0.5 : 1;

  return (

    <div className="count">
      {showAddForm && (
        <AddPostForm       
          addNewBlogPost={addNewBlogPost}
          handleAddFormHide={handleAddFormHide}
        />
      )}

      {showEditForm && (
        <EditPostForm       
          editBlogPost={editBlogPost}
          handleEditFormHide={handleEditFormHide}
          selectedPost={selectedPost}
        />
      )}

      <>
      <Head />

        {isAdmin && (
          <button className="blackBtn newPostBtn" onClick={handleAddFormShow}>
            Создать новый пост
          </button>
        )}

       {searchKey && (filteredPosts.length>0?(<div className="blogPageSearchResult">Найдены по запросу: {searchKey}</div>):
       (<div className="blogPageSearchResult">Ничего не найдено</div>))} 

        <div className="posts" style={{ opacity: postsOpacity }}>
          {blogPosts}
        </div>
      </>

      {isFetching && <CircularProgress className="preloader" />}
    </div>
  );
};
