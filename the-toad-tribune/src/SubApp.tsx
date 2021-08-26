import React, { useState, useEffect } from "react";
import { NewsResponse } from "./api/newsApi";
import {
  getNewsEverything,
  getNewsTopHeadlines,
  NewsEverythingRequest,
  NewsTopHeadlinesRequest,
} from "./api";
import {
  Ads,
  Animals,
  Layout,
  MainArticle,
  Movies,
  Navigation,
  Politics,
  Sports,
  Stonks,
  Weather,
} from "./layout";

const SubApp = () => {
  const [mainArticle, setMainArticle] = useState<NewsResponse>({
    status: "",
    totalResults: 0,
    articles: [],
  });

  const [moviesArticle, setMoviesArticle] = useState<NewsResponse>({
    status: "",
    totalResults: 0,
    articles: [],
  });

  const [animalArticle, setAnimalArticle] = useState<NewsResponse>({
    status: "",
    totalResults: 0,
    articles: [],
  });

  const [sportsArticle, setSportsArticle] = useState<NewsResponse>({
    status: "",
    totalResults: 0,
    articles: [],
  });

  const dataGrabber = () => {
    const topHeadlinesRequest = new NewsTopHeadlinesRequest();
    getNewsTopHeadlines(topHeadlinesRequest).then((res) => setMainArticle(res));

    const moviesEverythingRequest = new NewsEverythingRequest({ q: "movies" });
    getNewsEverything(moviesEverythingRequest).then((res) =>
      setMoviesArticle(res)
    );

    const animalsArticleRequest = new NewsEverythingRequest({ q: "animal" });
    getNewsEverything(animalsArticleRequest).then((res) =>
      setAnimalArticle(res)
    );

    const sportsArticleRequest = new NewsEverythingRequest({ q: "sports" });
    getNewsEverything(sportsArticleRequest).then((res) =>
      setSportsArticle(res)
    );
  };

  useEffect(() => {
    dataGrabber();
  }, []);

  return (
    <div>
      <Layout
        Ads={<Ads />}
        Animals={<Animals animalArticle={animalArticle} />}
        MainArticle={<MainArticle mainArticle={mainArticle} />}
        Movies={<Movies moviesArticle={moviesArticle} />}
        Navigation={<Navigation />}
        Politics={<Politics />}
        Sports={<Sports sportsArticle={sportsArticle} />}
        Stonks={<Stonks />}
        Weather={<Weather />}
      />
    </div>
  );
};

export default SubApp;
