import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchArtists } from "../store/artists/reducer";
import { Card } from "../components/Card";

const Home = () => {
  const dispatch = useAppDispatch();
  const { artists, status } = useAppSelector((state) => state.artists);
  useEffect(() => {
    dispatch(fetchArtists());
  }, []);
  return (
    <div className="gallery container">
      {status === "success" &&
        artists
          .slice(0, 6)
          .map((artist) => (
            <Card
              id={artist._id}
              name={artist.name}
              yearsOfLife={artist.yearsOfLife}
              mainPainting={artist.mainPainting}
              key={artist._id}
            ></Card>
          ))}
    </div>
  );
};

export default Home;
