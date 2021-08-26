import { useState, useEffect } from "react";
import { INewsResponse, NewsResponse } from "./api/newsApi";
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

  const defaultNewsResponse = new NewsResponse();

  const [mainArticle, setMainArticle] = useState<INewsResponse>(defaultNewsResponse);

  const [moviesArticle, setMoviesArticle] = useState<INewsResponse>(defaultNewsResponse);

  const [animalArticle, setAnimalArticle] = useState<INewsResponse>(defaultNewsResponse);

  const [sportsArticle, setSportsArticle] = useState<INewsResponse>(defaultNewsResponse);

  const [politicsArticle, setPoliticsArticle] = useState<INewsResponse>(defaultNewsResponse);

  const [stonksArticle, setStonksArticle] = useState<INewsResponse>(defaultNewsResponse);

  const dataGrabber = () => {
    const topHeadlinesRequest = new NewsTopHeadlinesRequest();
    getNewsTopHeadlines(topHeadlinesRequest).then((res) => setMainArticle(res));

    const animalsArticleRequest = new NewsEverythingRequest({ q: "animal" });
    getNewsEverything(animalsArticleRequest).then((res) =>
      setAnimalArticle(res)
    );

    const sportsArticleRequest = new NewsEverythingRequest({ q: "sports" });
    getNewsEverything(sportsArticleRequest).then((res) =>
      setSportsArticle(res)
    );
    const politicsArticleRequest = new NewsEverythingRequest({ q: "politics" });
    getNewsEverything(politicsArticleRequest).then((res) =>
      setPoliticsArticle(res)
    );

    const moviesEverythingRequest = new NewsEverythingRequest({ q: "movies" });
    getNewsEverything(moviesEverythingRequest).then((res) => setMoviesArticle(res));

    const stonksHeadlinesRequest = new NewsEverythingRequest({q: "stocks"});
    getNewsEverything(stonksHeadlinesRequest).then((res) => 
      setStonksArticle(res));
  };

  useEffect(() => {
    dataGrabber();
  }, []);

  return (
    <div>
      <Layout
        Ads={<Ads />}
        Animals={<Animals articleResponse={animalArticle} />}
        MainArticle={<MainArticle articleResponse={mainArticle} />}
        Movies={<Movies articleResponse={moviesArticle} />}
        Navigation={<Navigation />}
        Politics={<Politics articleResponse={politicsArticle} />}
        Sports={<Sports articleResponse={sportsArticle} />}
        Stonks={<Stonks articleResponse={stonksArticle} />}
        Weather={<Weather />}
      />
    </div>
  );
};

export default SubApp;
