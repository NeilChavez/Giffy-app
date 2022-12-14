import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useGifs } from "../../hooks/useGifs";
import ListOfGifs from "../../components/ListOfGifs";
import Spinner from "../../components/Spinner";
import { useIsNearToScreen } from "../../hooks/useIsNearToScreen";
import SearchForm from "../../components/SearchForm";
import "./SearchPage.css";
import { Helmet } from "react-helmet";

export default function SearchPage() {
  const { keyword, rating, language } = useParams();
  const { gifs, loading, setPage } = useGifs({ keyword, rating, language });

  const externalRef = useRef();
  const { isNearToScreen } = useIsNearToScreen({
    once: false,
    externalRef: loading ? null : externalRef,
  });

  useEffect(() => {
    if (isNearToScreen) setPage((prevPage) => prevPage + 1);

  }, [isNearToScreen, setPage]);

  return (
    <>
      <Helmet>
        <title>{keyword} | Giffy</title>
      </Helmet>
      <SearchForm initialKeyword={keyword} initialRating={rating} />
      <h2>{keyword}</h2>
      <section className="ListOfGifs container">
        <ListOfGifs gifs={gifs} />
      </section>
      {loading ? <Spinner /> : null}
      <div
        ref={externalRef}
        style={ {height: "1rem" }}
      ></div>
    </>
  );
}
