import { useState, useEffect } from "react";
import { INewsResponse, NewsResponse } from "./api/newsApi";
import { IAdsResponse } from "./api/adsApi";
import AdsResponse from "./api/adsApi"
import {
  getNewsEverything,
  getNewsTopHeadlines,
  getWeather,
  NewsEverythingRequest,
  NewsTopHeadlinesRequest,
  WeatherRequest,
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
import { getAds } from "./api/adsApi";

const SubApp = () => {

  const defaultNewsResponse = new NewsResponse();
  const defaultAdsResponse = new AdsResponse();

  const [mainArticle, setMainArticle] = useState<INewsResponse>(defaultNewsResponse);

  const [moviesArticle, setMoviesArticle] = useState<INewsResponse>(defaultNewsResponse);

  const [animalArticle, setAnimalArticle] = useState<INewsResponse>(defaultNewsResponse);

  const [sportsArticle, setSportsArticle] = useState<INewsResponse>(defaultNewsResponse);

  const [politicsArticle, setPoliticsArticle] = useState<INewsResponse>(defaultNewsResponse);

  const [stonksArticle, setStonksArticle] = useState<INewsResponse>(defaultNewsResponse);

  const [ads, setAds] = useState<IAdsResponse>(defaultAdsResponse)

  const newsDataGrabber = () => {
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

  const adsDataGrabber = () => {
    getAds().then(res => setAds(res));
  };

  useEffect(() => {
    // newsDataGrabber();
    // adsDataGrabber();
    const weatherRequest = new WeatherRequest();
    getWeather(weatherRequest).then((res) => console.log(res));
  }, []);

  return (
    <div>
      <Layout
        Ads={<Ads adsResponse={ads} adsDataGrabber={adsDataGrabber} />}
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
