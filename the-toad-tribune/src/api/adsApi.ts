import fetchApi from "./fetchApi"

export interface AdsProp {
  adsResponse: IAdsResponse;
  adsDataGrabber: Function;
}

interface IAuthor {
  name: string;
  id: string | null;
}

interface IBody {
  _id: string;
  setup: string;
  punchline: string;
  type: string;
  likes: Array<string>;
  author: IAuthor;
  approved: boolean;
  date: number;
  image: string;
}

export interface IAdsResponse {
  success: boolean;
  body: IBody;
}

export const getAds = async (): Promise<IAdsResponse> => {
  return await fetchApi(process.env.REACT_APP_ADS_API || "", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "dad-jokes.p.rapidapi.com",
      "x-rapidapi-key": process.env.REACT_APP_ADS_API_KEY,
    }
  })}

  class AdsResponse implements IAdsResponse {
    success= false;
    body= {
      _id: "",
      setup: "",
      punchline: "",
      type: "",
      likes: [],
      author: {
        name: "",
        id: "",
      },
      approved: false,
      date: 0,
      image: "",
    };
  }

  export default AdsResponse;
 
