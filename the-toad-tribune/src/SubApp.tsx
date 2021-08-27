import { useState, useEffect } from "react";
import { INewsResponse, NewsResponse } from "./api/newsApi";
import { IAdsResponse } from "./api/adsApi";
import AdsResponse from "./api/adsApi";
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
import { getAds } from "./api/adsApi";

const SubApp = () => {
  const defaultNewsResponse = new NewsResponse();
  const defaultAdsResponse = new AdsResponse();

  const [mainArticle, setMainArticle] =
    useState<INewsResponse>(defaultNewsResponse);
  const [moviesArticle, setMoviesArticle] =
    useState<INewsResponse>(defaultNewsResponse);
  const [animalArticle, setAnimalArticle] =
    useState<INewsResponse>(defaultNewsResponse);
  const [sportsArticle, setSportsArticle] =
    useState<INewsResponse>(defaultNewsResponse);
  const [politicsArticle, setPoliticsArticle] =
    useState<INewsResponse>(defaultNewsResponse);

  const [stonksArticle, setStonksArticle] =
    useState<INewsResponse>(defaultNewsResponse);
  const [ads, setAds] = useState<IAdsResponse>(defaultAdsResponse);

  const [isMoreInfo, setIsMoreInfo] = useState(false);
  const [isMainLayout, setIsMainLayout] = useState(true);
  const [isSearchPage, setIsSearchPage] = useState(false);

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
    getNewsEverything(moviesEverythingRequest).then((res) =>
      setMoviesArticle(res)
    );

    const stonksHeadlinesRequest = new NewsEverythingRequest({ q: "stocks" });
    getNewsEverything(stonksHeadlinesRequest).then((res) =>
      setStonksArticle(res)
    );
  };

  const adsDataGrabber = () => {
    getAds().then((res) => setAds(res));
  };

  const renderMoreInfoPage = () => {
    setIsMainLayout(false);
    setIsSearchPage(false);
    setIsMoreInfo(true);
  };

  const renderSearchPage = () => {
    setIsMainLayout(false);
    setIsSearchPage(true);
    setIsMoreInfo(false);
  };

  const renderMainLayoutPage = () => {
    setIsMainLayout(true);
    setIsSearchPage(false);
    setIsMoreInfo(false);
  };

  useEffect(() => {
    newsDataGrabber();
    adsDataGrabber();
  }, []);

  return (
    <div>
      <Layout
        Ads={<Ads adsDataGrabber={adsDataGrabber} adsResponse={ads} />}
        Animals={
          <Animals
            articleResponse={animalArticle}
            renderMoreInfoPage={renderMoreInfoPage}
          />
        }
        isMainLayout={isMainLayout}
        isMoreInfo={isMoreInfo}
        isSearchPage={isSearchPage}
        MainArticle={
          <MainArticle
            articleResponse={mainArticle}
            renderMoreInfoPage={renderMoreInfoPage}
          />
        }
        Movies={
          <Movies
            articleResponse={moviesArticle}
            renderMoreInfoPage={renderMoreInfoPage}
          />
        }
        Navigation={<Navigation />}
        Politics={
          <Politics
            articleResponse={politicsArticle}
            renderMoreInfoPage={renderMoreInfoPage}
          />
        }
        Sports={
          <Sports
            articleResponse={sportsArticle}
            renderMoreInfoPage={renderMoreInfoPage}
          />
        }
        Stonks={
          <Stonks
            articleResponse={stonksArticle}
            renderMoreInfoPage={renderMoreInfoPage}
          />
        }
        Weather={<Weather />}
      />
    </div>
  );
};

export default SubApp;
