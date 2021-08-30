import { useState, useEffect } from "react";
import { IArticle, IMoreInfoPageProps, INewsResponse, NewsResponse } from "./api/newsApi";
import { IAdsResponse } from "./api/adsApi";
import AdsResponse from "./api/adsApi";
import { Coords, GeolocationPositionError, GeolocationPositionSuccess, IWeatherResponse } from "./api/weatherApi";
import {
  ArticleResponse,
  getNewsEverything,
  getNewsTopHeadlines,
  getWeather,
  NewsEverythingRequest,
  NewsTopHeadlinesRequest,
  WeatherRequest,
  WeatherResponse,
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
import MoreInfo from "./layout/MoreInfo";

const SubApp = () => {
  const defaultArticleResponse = new ArticleResponse();
  const defaultNewsResponse = new NewsResponse();
  const defaultAdsResponse = new AdsResponse();
  const defaultWeatherResponse = new WeatherResponse();


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
  const [weather, setWeather] = useState<IWeatherResponse>(defaultWeatherResponse);

  const [isMoreInfo, setIsMoreInfo] = useState<Boolean>(false);
  const [isMainLayout, setIsMainLayout] = useState<Boolean>(true);
  const [isSearchPage, setIsSearchPage] = useState<Boolean>(false);

  const [selectedArticle, setSelectedArticle] = useState<IArticle>(defaultArticleResponse);

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

  const weatherDataGrabber = () => {
    const successGeo = async (
      position: GeolocationPositionSuccess
    ) => {
      const { latitude, longitude } = position.coords;
      const weatherRequest = new WeatherRequest({ query: `${latitude},${longitude}` })
      const weatherData = await getWeather(weatherRequest);
      setWeather(weatherData);
    }
    
    const errorGeo = async (
      error: GeolocationPositionError
    ) => {
      console.error(error);
      const weatherRequest = new WeatherRequest();
      const weatherData = await getWeather(weatherRequest);
      setWeather(weatherData)
    }

    navigator.geolocation.getCurrentPosition(successGeo, errorGeo);
  }

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
    weatherDataGrabber();
  }, []);

  return (
    <div>
      <Layout
        Ads={<Ads adsDataGrabber={adsDataGrabber} adsResponse={ads} />}
        Animals={
          <Animals
            articleResponse={animalArticle}
            renderMoreInfoPage={renderMoreInfoPage}
            setSelectedArticle = {setSelectedArticle}
          />
        }
        isMainLayout={isMainLayout}
        isMoreInfo={isMoreInfo}
        isSearchPage={isSearchPage}
        MainArticle={
          <MainArticle
            articleResponse={mainArticle}
            renderMoreInfoPage={renderMoreInfoPage}
            setSelectedArticle = {setSelectedArticle}
          />
        }
        MoreInfo={<MoreInfo selectedArticle={selectedArticle}/>}
        Movies={
          <Movies
            articleResponse={moviesArticle}
            renderMoreInfoPage={renderMoreInfoPage}
            setSelectedArticle = {setSelectedArticle}
          />
        }
        Navigation={<Navigation />}
        Politics={
          <Politics
            articleResponse={politicsArticle}
            renderMoreInfoPage={renderMoreInfoPage}
            setSelectedArticle = {setSelectedArticle}
          />
        }
        Sports={
          <Sports
            articleResponse={sportsArticle}
            renderMoreInfoPage={renderMoreInfoPage}
            setSelectedArticle = {setSelectedArticle}
          />
        }
        Stonks={
          <Stonks
            articleResponse={stonksArticle}
            renderMoreInfoPage={renderMoreInfoPage}
            setSelectedArticle = {setSelectedArticle}
          />
        }
        Weather={<Weather weatherResponse={weather} />}
      />
    </div>
  );
};

export default SubApp;
