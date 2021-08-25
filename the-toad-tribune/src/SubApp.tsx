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

  const dataGrabber = () => {
    const topHeadlinesRequest = new NewsTopHeadlinesRequest();
    getNewsTopHeadlines(topHeadlinesRequest).then((res) => setMainArticle(res));
  };

  useEffect(() => {
    dataGrabber();
  }, []);

  return (
    <div>
      <Layout
        Ads={<Ads />}
        Animals={<Animals />}
        MainArticle={<MainArticle mainArticle={mainArticle} />}
        Movies={<Movies />}
        Navigation={<Navigation />}
        Politics={<Politics />}
        Sports={<Sports />}
        Stonks={<Stonks />}
        Weather={<Weather />}
      />
    </div>
  );
};

export default SubApp;
