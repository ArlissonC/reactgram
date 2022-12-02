import "./Home.css";

// Components
import LikeContainer from "components/LikeContainer";
import PhotoItem from "components/PhotoItem";
import { Link } from "react-router-dom";

// Hooks
import { useEffect } from "react";
import { useSelector } from "react-redux";

// Redux
import { getAllPhotos, likePhoto } from "store/ducks/photo";
import { RootState, useAppDispatch } from "store/configureStore";

const Home = () => {
  const dispatch = useAppDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const { photos, loading } = useSelector((state: RootState) => state.photo);

  useEffect(() => {
    dispatch(getAllPhotos());
  }, [dispatch]);

  const handleLike = (photo: any) => {
    dispatch(likePhoto(photo._id));
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div id="home">
      {photos?.map((photo: any) => (
        <div key={photo._id}>
          <PhotoItem photo={photo} />
          <LikeContainer photo={photo} user={user} handleLike={handleLike} />
          <Link to={`/photos/${photo._id}`} className="btn">
            Ver mais
          </Link>
        </div>
      ))}
      {photos && photos.length === 0 && (
        <h2 className="no-photos">
          Ainda não há fotos publicadas,{" "}
          <Link to={`/users/${user._id}`}>Clique aqui</Link>
        </h2>
      )}
    </div>
  );
};

export default Home;
