import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateIcon from "@mui/icons-material/Create";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import "./BlogCardPage.css";
import { postsUrl } from "../../../../shared/projectData";
import { EditPostForm } from "../EditPostForm/EditPostForm";

export const BlogCardPage = ({
  isAdmin,
}) => {

  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [isPanding, setIsPanding] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);
  const navigate = useNavigate();

    //получение с сервера базы
    const getPost = (id) => {

      axios
        .get(postsUrl + id)
        .then((response) => {
          setPost(response.data);
          setIsPanding(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    useEffect(() => {
      getPost(postId);
    }, [postId]);
  
    // лайк поста
    const likePost = () => {
      const temp = { ...post };
      temp.liked = !temp.liked;
      axios
        .put(`${postsUrl}${postId}`, temp)
        .then((response) => {
          getPost(postId);
        })
        .catch((err) => {
          console.log("Не удалось изменить");
        });
    };
  
    // изменение поста
    const editBlogPost = (updatedBlogPost) => {
      setIsPanding(true);
      axios
        .put(`${postsUrl}${postId}`, updatedBlogPost)
        .then((response) => {
          getPost(postId);
        })
        .catch((err) => {
          console.log("Не удалось изменить пост");
        });
    };
  
    // удалиение поста
    const deletePost = () => {
      if (window.confirm(`Удалить ${post.title} ?`)) {
        setIsPanding(true);
        axios
          .delete(`${postsUrl}${postId}`)
          .then((response) => {
            setIsPanding(false)
            navigate('/blog', {repalce: true} )
          })
          .catch((err) => {
            console.log("Не удалось удалить пост");
          });
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
  

  useEffect(() => {  
      axios
        .get(postsUrl + postId)
        .then((response) => {
          setPost(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [postId, setPost]);

  if(!post.title) return <h1>Загружаю данные...</h1>;

  const heartFill = post.liked? "crimson" : "black";
  
  const postsOpacity = isPanding ? 0.5 : 1;

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
          <button onClick={likePost}>
            <FavoriteIcon style={{ fill: heartFill }} />
          </button>
        </div>
      </div>
      {isAdmin && (
        <div className="postControl">
          <button onClick={() => handleEditFormShow(post)} className="editBtn">
            <CreateIcon />
          </button>
          <button onClick={deletePost} className="deleteBtn">
            <DeleteForeverIcon />
          </button>
        </div>
      )}
       {isPanding && <CircularProgress className="preloader" />}
    </div>
  );
};
