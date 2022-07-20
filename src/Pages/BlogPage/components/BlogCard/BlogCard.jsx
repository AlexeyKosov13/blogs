import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateIcon from "@mui/icons-material/Create";

import "./BlogCard.css";

export const BlogCard = ({
  title,
  descr,
  liked,
  likePost,
  deletePost,
  handleEditFormShow,
  handleSelectPost,
  isAdmin,
}) => {
  const showEditForm = () => {
    handleSelectPost();
    handleEditFormShow();
  };

  const heartFill = liked ? "crimson" : "black";

  return (
    <div className="post">
      <div className="postContent">
        <div className="postTitle">
          <h2>{title}</h2>
          <button onClick={likePost}>
            <FavoriteIcon style={{ fill: heartFill }} />
          </button>
        </div>

        <p>{descr}</p>
      </div>
      {isAdmin && (
        <div className="postControl">
          <button onClick={showEditForm} className="editBtn">
            <CreateIcon />
          </button>
          <button onClick={deletePost} className="deleteBtn">
            <DeleteForeverIcon />
          </button>
        </div>
      )}
    </div>
  );
};
