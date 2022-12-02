import "./Photo.css";

import { uploads } from "utils/config";

// Components
import { Link } from "react-router-dom";
import PhotoItem from "components/PhotoItem";

// Hooks
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "store/configureStore";
import { useSelector } from "react-redux";
import {
  commentPhoto,
  getPhoto,
  likePhoto,
  resetMessage,
} from "store/ducks/photo";
import LikeContainer from "components/LikeContainer";

const Photo = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const [commentText, setCommentText] = useState("");

  const { photo, error, loading } = useSelector(
    (state: RootState) => state.photo,
  );

  const cleanMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  const handleLike = () => {
    dispatch(likePhoto(id));
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();

    const commentData = {
      comment: commentText,
      id: photo._id,
    };

    dispatch(commentPhoto(commentData));
    setCommentText("");

    cleanMessage();
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div id="photo">
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
      <div className="comments">
        {photo.comments && (
          <>
            <h3>Comentários: {photo.comments.length}</h3>
            <form onSubmit={handleComment}>
              <input
                type="text"
                placeholder="Comentar..."
                onChange={({ target }) => setCommentText(target.value)}
                value={commentText}
              />
              <input
                type="submit"
                value="Enviar"
                disabled={commentText === ""}
              />
            </form>
            {photo.comments.length === 0 && <p>Sem comentários...</p>}
            {photo.comments.map((comment: any) => (
              <div className="comment" key={comment.comment}>
                <div className="author">
                  {comment.userImage && (
                    <img
                      src={`${uploads}/users/${comment.userImage}`}
                      alt={comment.userName}
                    />
                  )}
                  <Link to={`/users/${comment.userId}`}>
                    {comment.userName}
                  </Link>
                </div>
                <p>{comment.comment}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Photo;
