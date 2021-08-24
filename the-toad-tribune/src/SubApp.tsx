import { useEffect } from "react";
import { getNewsEverything, NewsEverythingRequest } from "./api";
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
  useEffect(() => {
    const request = new NewsEverythingRequest({
      q: "new york",
      sources: ["abc-news", "engadget"],
    });
    getNewsEverything(request).then((res) => console.log("In Subapp", res));
  }, []);

  return (
    <div>
      <Layout
        Ads={<Ads />}
        Animals={<Animals />}
        MainArticle={<MainArticle />}
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
