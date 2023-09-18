import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchArtistById } from "../store/artists/reducer";
import { Card } from "../components/Card";
import { Accordeon } from "../components/Accordeon";
import { useResize } from "../hooks/useResize";

const Artist = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { data, status } = useAppSelector((state) => state.artists);
  const width = useResize();

  useEffect(() => {
    dispatch(fetchArtistById(id));
  }, []);
  return (
    <>
      <div className="container">
        <Link className="artist_back" to="/">
          <img src="../assets/img/arrow_back.svg" alt="arrow" />
          BACK
        </Link>
      </div>
      {status === "success" && (
        <>
          <div className="artist_container">
            <div className="artist_container_avatar">
              <img
                className="artist_container_avatar_img"
                src={`https://internship-front.framework.team/${data?.avatar.original}`}
                alt="avatar"
              />
              {width > 1440 ? (
                <div className="artist_container_description">
                  <p className="artist_container_description_years">
                    {data?.yearsOfLife}
                  </p>
                  <span>{data?.name}</span>
                  <Accordeon description={data!.description} />
                  <div className="artist_container_description_genre_wrapper">
                    {data?.genres.map((genre) => (
                      <p
                        className="artist_container_description_genre"
                        key={genre._id}
                      >
                        {genre.name}
                      </p>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="artist_container_description">
                  <p className="artist_container_description_years">
                    {data?.yearsOfLife}
                  </p>
                  <span>{data?.name}</span>
                </div>
              )}
            </div>
          </div>
          <div className="container">
            {width < 1440 && (
              <>
                <Accordeon
                  description={data !== null ? data.description : ""}
                />
                <div className="artist_container_description_genre_wrapper">
                  {data?.genres.map((genre) => (
                    <p
                      className="artist_container_description_genre"
                      key={genre._id}
                    >
                      {genre.name}
                    </p>
                  ))}
                </div>
              </>
            )}
            <span className="artist_gallery_title">Artworks</span>
            <div className="artist_gallery">
              {data?.paintings.map((painting) => (
                <Card
                  id={painting._id}
                  name={painting.name}
                  mainPainting={painting}
                  key={painting._id}
                  yearsOfLife={painting.yearOfCreation}
                ></Card>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Artist;
