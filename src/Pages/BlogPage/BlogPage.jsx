import { useState } from "react";
import { BlogCard } from "./components/BlogCard/BlogCard";
import { AddPostForm } from "./components/AddPostForm/AddPostForm";
import { CircularProgress } from "@mui/material";
import { EditPostForm } from "./components/EditPostForm/EditPostForm";
import { Link } from "react-router-dom";
import { useGetPosts, useLikePost, useDeletePost, useEditPost, useAddPost } from "../../shared/queries";

import "./BlogPage.css";

export const BlogPage = ({ isAdmin }) => {
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
  const blogPosts = posts.map((item) => {
    return (
      <div key={item.id}>
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
        <Link to={`/blog/${item.id}`}>Подробнее</Link>
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
        <h1>Simple Blog</h1>

        {isAdmin && (
          <button className="blackBtn" onClick={handleAddFormShow}>
            Создать новый пост
          </button>
        )}

        <div className="posts" style={{ opacity: postsOpacity }}>
          {blogPosts}
        </div>
      </>

      {isFetching && <CircularProgress className="preloader" />}
    </div>
  );
};
