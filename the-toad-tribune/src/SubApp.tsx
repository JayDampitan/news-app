import { useState, useEffect } from "react";
import {
  AdsResponse,
  ArticleResponse,
  getAds,
  getNewsEverything,
  getNewsTopHeadlines,
  getWeather,
  NewsEverythingRequest,
  NewsResponse,
  NewsTopHeadlinesRequest,
  WeatherRequest,
  WeatherResponse,
} from "./api";
import type {
  IAdsResponse,
  IArticle,
  IGeolocationPositionError,
  IGeolocationPositionSuccess,
  IMoreInfoPageProps,
  INewsResponse,
  IWeatherResponse,
} from './api';

import {
  Ads,
  Animals,
  Layout,
  MainArticle,
  Movies,
  Navigation,
  Politics,
  SearchResults,
  Sports,
  Stonks,
  Weather,
} from "./layout";
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
  const [weather, setWeather] = useState<IWeatherResponse>(
    defaultWeatherResponse
  );

  const [isMoreInfo, setIsMoreInfo] = useState<Boolean>(false);
  const [isMainLayout, setIsMainLayout] = useState<Boolean>(true);
  const [isSearchPage, setIsSearchPage] = useState<Boolean>(false);

  const [selectedArticle, setSelectedArticle] = useState<IArticle>(
    defaultArticleResponse
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] =
    useState<INewsResponse>(defaultNewsResponse);

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
    const successGeo = async (position: IGeolocationPositionSuccess) => {
      const { latitude, longitude } = position.coords;
      const weatherRequest = new WeatherRequest({
        query: `${latitude},${longitude}`,
      });
      const weatherData = await getWeather(weatherRequest);
      setWeather(weatherData);
    };

    const errorGeo = async (error: GeolocationPositionError) => {
      console.error(error);
      const weatherRequest = new WeatherRequest();
      const weatherData = await getWeather(weatherRequest);
      setWeather(weatherData);
    };

    navigator.geolocation.getCurrentPosition(successGeo, errorGeo);
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
    // Commented out for a reason
    newsDataGrabber();
    // adsDataGrabber();
    // weatherDataGrabber();
  }, []);

  return (
    <div>
      <Layout
        Ads={<Ads adsDataGrabber={adsDataGrabber} adsResponse={ads} />}
        Animals={
          <Animals
            articleResponse={animalArticle}
            renderMoreInfoPage={renderMoreInfoPage}
            setSelectedArticle={setSelectedArticle}
          />
        }
        isMainLayout={isMainLayout}
        isMoreInfo={isMoreInfo}
        isSearchPage={isSearchPage}
        MainArticle={
          <MainArticle
            articleResponse={mainArticle}
            renderMoreInfoPage={renderMoreInfoPage}
            setSelectedArticle={setSelectedArticle}
          />
        }
        MoreInfo={<MoreInfo selectedArticle={selectedArticle} />}
        Movies={
          <Movies
            articleResponse={moviesArticle}
            renderMoreInfoPage={renderMoreInfoPage}
            setSelectedArticle={setSelectedArticle}
          />
        }
        Navigation={
          <Navigation
            renderMainLayoutPage={renderMainLayoutPage}
            renderSearchPage={renderSearchPage}
            setSearchValue={setSearchValue}
            setSearchResults={setSearchResults}
          />
        }
        Politics={
          <Politics
            articleResponse={politicsArticle}
            renderMoreInfoPage={renderMoreInfoPage}
            setSelectedArticle={setSelectedArticle}
          />
        }
        SearchResults={
          <SearchResults
            renderMoreInfoPage={renderMoreInfoPage}
            searchResults={searchResults}
            searchValue={searchValue}
            setSearchResults={setSearchResults}
            setSelectedArticle={setSelectedArticle}
          />
        }
        Sports={
          <Sports
            articleResponse={sportsArticle}
            renderMoreInfoPage={renderMoreInfoPage}
            setSelectedArticle={setSelectedArticle}
          />
        }
        Stonks={
          <Stonks
            articleResponse={stonksArticle}
            renderMoreInfoPage={renderMoreInfoPage}
            setSelectedArticle={setSelectedArticle}
          />
        }
        Weather={<Weather weatherResponse={weather} />}
      />
    </div>
  );
};

export default SubApp;
