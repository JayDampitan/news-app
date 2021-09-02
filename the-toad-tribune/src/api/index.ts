import { AdsResponse, getAds, IAdsProp, IAdsResponse } from "./adsApi";

import {
  ArticleResponse,
  getNewsEverything,
  getNewsTopHeadlines,
  IArticle,
  IMoreInfoPageProps,
  INewsEverythingRequest,
  INewsResponse,
  INewsProps,
  INewsTopHeadlinesRequest,
  NewsEverythingRequest,
  NewsResponse,
  NewsTopHeadlinesRequest,
} from "./newsApi";

import {
  getWeather,
  IGeoCoords,
  IGeolocationPositionError,
  IGeolocationPositionSuccess,
  IWCurrent,
  IWeatherRequest,
  IWeatherResponse,
  IWeatherProp,
  IWLocation,
  IWRequest,
  WeatherRequest,
  WeatherResponse,
} from "./weatherApi";

export {
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
};

export type {
  IAdsProp,
  IAdsResponse,
  IArticle,
  IGeoCoords,
  IGeolocationPositionError,
  IGeolocationPositionSuccess,
  IMoreInfoPageProps,
  INewsEverythingRequest,
  INewsProps,
  INewsResponse,
  INewsTopHeadlinesRequest,
  IWCurrent,
  IWLocation,
  IWRequest,
  IWeatherProp,
  IWeatherRequest,
  IWeatherResponse,
}
