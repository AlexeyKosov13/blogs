import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateIcon from "@mui/icons-material/Create";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { postsUrl } from "../../../../shared/projectData";
import { EditPostForm } from "../EditPostForm/EditPostForm";
import { useGetPost, useLikePost, useDeletePost, useEditPost } from "../../../../shared/queries";

import "./BlogCardPage.css";

export const BlogCardPage = ({
  isAdmin,
}) => {

  const { postId } = useParams();
 
  const [selectedPost, setSelectedPost] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);
  const navigate = useNavigate();

  
  const {data: post, isLoading, isError, error, isFetching, refetch} =  useGetPost(postId);

  const likeMutation = useLikePost();
  const deleteMutation = useDeletePost();
  const editMutation = useEditPost();

   
  if (isLoading) return <h1>Загружаю данные...</h1>;

  if (isError) return <h1>{error.message}</h1> 

    // лайк поста
    const likePost = (blogPost) => {
      const updatedPost = { ...blogPost };
      updatedPost.liked = !updatedPost.liked;
      likeMutation.mutateAsync(updatedPost)
      .then( refetch)
      .catch((err)=> console.log(err))
    };

     // изменение поста
  const editBlogPost = (updatedBlogPost) => {
    editMutation.mutateAsync(updatedBlogPost)
    .then(refetch)
    .catch((err)=> console.log(err))
  };

  // удалиение поста
  const deletePost = (blogPost) => {
    if (window.confirm(`Удалить ${blogPost.title} ?`)) {
     deleteMutation.mutateAsync(blogPost)
     .then(navigate('/blog', {repalce: true}))
     .catch((err)=> console.log(err))
     
    }
  };

  
    //показ модального окна
    const handleEditFormShow = (blogPost) => {
      setShowEditForm(true);
      setSelectedPost(blogPost)
    };
  
    //скрытие модального окна
    const handleEditFormHide = () => {
      setShowEditForm(false);
    };
  

  if(!post.title) return <h1>Загружаю данные...</h1>;

  const heartFill = post.liked? "crimson" : "black";
  
  const postsOpacity = isFetching ? 0.5 : 1;

  return (
    <div className="post">
       {showEditForm && (
        <EditPostForm        
          editBlogPost={editBlogPost}
          handleEditFormHide={handleEditFormHide}
          selectedPost={selectedPost}
        />
      )}
      <div className="postContent" style={{ opacity: postsOpacity }}>
        <h2>{post.title}</h2>
        <p> {post.description}</p>
        <div>
          <button onClick={() => likePost(post)}>
            <FavoriteIcon style={{ fill: heartFill }} />
          </button>
        </div>
      </div>
      {isAdmin && (
        <div className="postControl">
          <button onClick={() => handleEditFormShow(post)} className="editBtn">
            <CreateIcon />
          </button>
          <button onClick={() => deletePost(post)} className="deleteBtn">
            <DeleteForeverIcon />
          </button>
        </div>
      )}
       {isFetching && <CircularProgress className="preloader" />}
    </div>
  );
};
