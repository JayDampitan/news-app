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

import { Snackbar } from "./components";

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
  
  const [serverErrorMessage, setServerErrorMessage] = useState<string>("");


  const [pageNumber, setPageNumber] = useState<number>(1);

  const [darkMode, setdarkMode] = useState<Boolean>(true);

  const newsDataGrabber = () => {
    const topHeadlinesRequest = new NewsTopHeadlinesRequest();
    getNewsTopHeadlines(topHeadlinesRequest).then((res) => {
      if (res.status === 'ok') {
        setMainArticle(res)
      }

      if (res.status === 'error') {
        setServerErrorMessage(res.message);
      }
    });

    const animalsArticleRequest = new NewsEverythingRequest({ q: "animal" });
    getNewsEverything(animalsArticleRequest).then((res) => {
      if (res.status === 'ok') {
        setAnimalArticle(res)
      }

      if (res.status === 'error') {
        setServerErrorMessage(res.message);
      }
    });

    const sportsArticleRequest = new NewsEverythingRequest({ q: "sports" });
    getNewsEverything(sportsArticleRequest).then((res) => {
      if (res.status === 'ok') {
        setSportsArticle(res)
      }

      if (res.status === 'error') {
        setServerErrorMessage(res.message);
      }
    });
    const politicsArticleRequest = new NewsEverythingRequest({ q: "politics" });
    getNewsEverything(politicsArticleRequest).then((res) => {
      if (res.status === 'ok') {
        setPoliticsArticle(res)
      }

      if (res.status === 'error') {
        setServerErrorMessage(res.message);
      }
  });

    const moviesEverythingRequest = new NewsEverythingRequest({ q: "movies" });
    getNewsEverything(moviesEverythingRequest).then((res) => {
      if (res.status === 'ok') {
        setMoviesArticle(res)
      }

      if (res.status === 'error') {
        setServerErrorMessage(res.message);
      }
    });

    const stonksHeadlinesRequest = new NewsEverythingRequest({ q: "stocks" });
    getNewsEverything(stonksHeadlinesRequest).then((res) => {
      if (res.status === 'ok') {
        setStonksArticle(res)
      }

      if (res.status === 'error') {
        setServerErrorMessage(res.message);
      }
    });
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
    // newsDataGrabber();
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
            darkMode={darkMode}
            renderMoreInfoPage={renderMoreInfoPage}
            setSelectedArticle={setSelectedArticle}
          />
        }
        darkMode={darkMode}
        isMainLayout={isMainLayout}
        isMoreInfo={isMoreInfo}
        isSearchPage={isSearchPage}
        MainArticle={
          <MainArticle
            articleResponse={mainArticle}
            darkMode={darkMode}
            renderMoreInfoPage={renderMoreInfoPage}
            setSelectedArticle={setSelectedArticle}
          />
        }
        MoreInfo={<MoreInfo darkMode={darkMode} selectedArticle={selectedArticle} />}
        Movies={
          <Movies
            articleResponse={moviesArticle}
            darkMode={darkMode}
            renderMoreInfoPage={renderMoreInfoPage}
            setSelectedArticle={setSelectedArticle}
          />
        }
        Navigation={
          <Navigation
            darkMode={darkMode}
            renderMainLayoutPage={renderMainLayoutPage}
            renderSearchPage={renderSearchPage}
            setdarkMode={setdarkMode}
            setPageNumber={setPageNumber}
            setSearchValue={setSearchValue}
            setSearchResults={setSearchResults}
          />
        }
        Politics={
          <Politics
            articleResponse={politicsArticle}
            darkMode={darkMode}
            renderMoreInfoPage={renderMoreInfoPage}
            setSelectedArticle={setSelectedArticle}
          />
        }
        SearchResults={
          <SearchResults
            darkMode={darkMode}
            pageNumber={pageNumber}
            renderMoreInfoPage={renderMoreInfoPage}
            searchResults={searchResults}
            searchValue={searchValue}
            setPageNumber={setPageNumber}
            setSnackbarMessage={setServerErrorMessage}
            setSearchResults={setSearchResults}
            setSelectedArticle={setSelectedArticle}
          />
        }
        Sports={
          <Sports
            articleResponse={sportsArticle}
            darkMode={darkMode}
            renderMoreInfoPage={renderMoreInfoPage}
            setSelectedArticle={setSelectedArticle}
          />
        }
        Stonks={
          <Stonks
            articleResponse={stonksArticle}

            darkMode={darkMode}
            renderMoreInfoPage={renderMoreInfoPage}
            setSelectedArticle={setSelectedArticle}
          />
        }
        Weather={<Weather darkMode={darkMode} weatherResponse={weather} />}
      />

      {serverErrorMessage.length > 0 && <Snackbar bgColor="red" setMessage={setServerErrorMessage}>{serverErrorMessage}</Snackbar>}
    </div>
  );
};

export default SubApp;
