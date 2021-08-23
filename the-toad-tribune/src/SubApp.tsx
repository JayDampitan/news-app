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
