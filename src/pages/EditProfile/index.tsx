import Message from "components/Message";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store/configureStore";
import { getUser, resetMessage, updateUserProfile } from "store/ducks/user";
import { uploads } from "utils/config";
import "./EditProfile.css";

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const { user, message, error, loading } = useSelector(
    (state: RootState) => state.user,
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File | undefined>(undefined);
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState<File | undefined>(undefined);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio || "");
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      name,
      profileImage,
      bio,
      password,
    };

    const formData = new FormData();

    formData.append("name", userData.name);
    formData.append("profileImage", userData.profileImage!);
    formData.append("bio", userData.bio);
    formData.append("password", userData.password);

    dispatch(updateUserProfile(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files![0];
    setPreviewImage(image);
    setProfileImage(image);
  };

  return (
    <div id="edit-profile">
      <h2>Edite seus dados</h2>
      <p className="subtitle">
        Adicione uma imagem de perfil e conte mais sobre você...
      </p>
      {(user?.profileImage || previewImage) && (
        <img
          className="profile-image"
          src={
            previewImage
              ? URL.createObjectURL(previewImage)
              : `${uploads}/users/${user.profileImage}`
          }
          alt={name}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={({ target }) => setName(target.value)}
          value={name}
        />
        <input type="email" placeholder="E-mail" readOnly value={email} />
        <label>
          <span>Imagem do Perfil:</span>
          <input type="file" onChange={handleFile} />
        </label>
        <label>
          <span>Bio:</span>
          <input
            type="text"
            placeholder="Descrição do perfil"
            onChange={({ target }) => setBio(target.value)}
            value={bio}
          />
        </label>
        <label>
          <span>Alterar senha:</span>
          <input
            type="password"
            placeholder="Digite sua nova senha"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />
        </label>
        {!loading ? (
          <input type="submit" value="Atualizar" />
        ) : (
          <input type="submit" disabled value="Carregando..." />
        )}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  );
};

export default EditProfile;
