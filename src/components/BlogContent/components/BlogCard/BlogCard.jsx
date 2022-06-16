import React, { Component } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import "./BlogCard.css";

export const BlogCard = ({ title, descr, liked, likePost, deletePost }) => {
  const heartFill = liked ? "crimson" : "black";

  return (
    <div className="post">
      <div className="postContent">
        <h2>{title}</h2>
        <p>{descr}</p>
        <div>
          <button onClick={likePost}>
            <FavoriteIcon style={{ fill: heartFill }} />
          </button>
        </div>
      </div>
      <button onClick={()=>deletePost()}>
        <DeleteForeverIcon />
      </button>
    </div>
  );
};
