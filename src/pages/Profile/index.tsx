import "./Profile.css";

import { uploads } from "utils/config";

// Components
import Message from "components/Message";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

// Hooks
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store/configureStore";
import { useParams } from "react-router-dom";

// Redux
import { getUserProfile } from "store/ducks/user";
import {
  deletePhoto,
  getPhotos,
  publishPhoto,
  resetMessage,
  updatePhoto,
} from "store/ducks/photo";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const {
    photos,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state: RootState) => state.photo);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | undefined>(undefined);

  const [isEditImage, setIsEditImage] = useState(false);
  const [editImage, setEditImage] = useState<File | undefined>(undefined);
  const [editTitle, setEditTitle] = useState("");
  const [editId, setEditId] = useState("");

  const { user, loading } = useSelector((state: RootState) => state.user);
  const { user: userAuth } = useSelector((state: RootState) => state.auth);

  const newPhotoForm = useRef(null);

  const cleanMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const photoData = {
      title,
      image,
    };

    const formData = new FormData();

    formData.append("title", photoData.title);
    formData.append("image", photoData.image!);

    dispatch(publishPhoto(formData));
    setTitle("");

    cleanMessage();
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files![0];
    setImage(image);
  };

  const handleDelete = (id: number) => {
    dispatch(deletePhoto(id));
    cleanMessage();
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    const photoData = {
      title: editTitle,
      id: editId,
    };

    dispatch(updatePhoto(photoData));

    cleanMessage();
  };

  const handleEdit = (photo: any) => {
    setIsEditImage(true);

    setEditId(photo._id);
    setEditTitle(photo.title);
    setEditImage(photo.image);
  };

  useEffect(() => {
    dispatch(getUserProfile(id!));
    dispatch(getPhotos(id));
  }, [dispatch, id]);

  if (loading) return <p>Carregando...</p>;

  return (
    <div id="profile">
      <div className="profile-header">
        {user?.profileImage && (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
        )}
        <div className="profile-description">
          <h2>{user?.name}</h2>
          <p>{user?.bio}</p>
        </div>
      </div>
      {id === userAuth._id && (
        <>
          {isEditImage ? (
            <div className="edit-photo">
              <p>Editando:</p>
              {editImage && (
                <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
              )}
              <form onSubmit={handleUpdate}>
                <input
                  type="text"
                  placeholder="Insira o novo título"
                  onChange={({ target }) => setEditTitle(target.value)}
                  value={editTitle}
                />
                <input type="submit" value="Atualizar" />
                <button
                  className="cancel-btn"
                  onClick={() => setIsEditImage(false)}
                >
                  Cancelar edição
                </button>
                {errorPhoto && <Message msg={errorPhoto} type="error" />}
                {messagePhoto && <Message msg={messagePhoto} type="success" />}
              </form>
            </div>
          ) : (
            <div className="new-photo" ref={newPhotoForm}>
              <h3>Compartilhe algum momento seu:</h3>
              <form onSubmit={handleSubmit}>
                <label>
                  <span>Título para a foto:</span>
                  <input
                    type="text"
                    placeholder="Insira um título"
                    onChange={({ target }) => setTitle(target.value)}
                    value={title}
                  />
                </label>
                <label>
                  <span>Imagem:</span>
                  <input type="file" onChange={handleFile} accept=".png,.jpg" />
                </label>
                {!loading ? (
                  <input type="submit" value="Postar" />
                ) : (
                  <input type="submit" disabled value="Carregando..." />
                )}
                {errorPhoto && <Message msg={errorPhoto} type="error" />}
                {messagePhoto && <Message msg={messagePhoto} type="success" />}
              </form>
            </div>
          )}
        </>
      )}
      <div className="user-photos">
        <h2>Fotos publicadas:</h2>
        <div className="photos-container">
          {photos?.map((photo: any) => (
            <div className="photo" key={photo._id}>
              {photo.image && (
                <img
                  src={`${uploads}/photos/${photo.image}`}
                  alt={photo.title}
                />
              )}
              {id === userAuth._id ? (
                <div className="actions">
                  <Link to={`/photos/${photo._id}`}>
                    <BsFillEyeFill />
                  </Link>
                  <BsPencilFill onClick={() => handleEdit(photo)} />
                  <BsXLg onClick={() => handleDelete(photo._id)} />
                </div>
              ) : (
                <Link className="btn" to={`/photos/${photo._id}`}>
                  Ver
                </Link>
              )}
            </div>
          ))}
          {photos.length === 0 && <p>Usuário sem fotos publicadas.</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
