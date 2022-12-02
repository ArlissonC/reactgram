import "./Search.css";

// Hooks
import { useEffect } from "react";
import useQuery from "hooks/useQuery";

// Components
import LikeContainer from "components/LikeContainer";
import PhotoItem from "components/PhotoItem";
import { Link } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store/configureStore";
import { searchPhotos, likePhoto } from "store/ducks/photo";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const dispatch = useAppDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const { photos, loading } = useSelector((state: RootState) => state.photo);

  useEffect(() => {
    dispatch(searchPhotos(search!));
  }, [dispatch, search]);

  const handleLike = (photo: any) => {
    dispatch(likePhoto(photo._id));
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div id="search">
      <h2>Você está buscando por: {search}</h2>
      {photos?.map((photo: any) => (
        <div key={photo._id}>
          <PhotoItem photo={photo} />
          <LikeContainer photo={photo} user={user} handleLike={handleLike} />
          <Link to={`/photos/${photo._id}`} className="btn">
            Ver mais
          </Link>
        </div>
      ))}
      {photos?.length === 0 && (
        <h2 className="no-photos">
          Não foram encontrados resultados para sua busca...
        </h2>
      )}
    </div>
  );
};

export default Search;
