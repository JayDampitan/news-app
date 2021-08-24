interface Source {
  id: string | null;
  name: string | null;
}

interface Article {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string | null;
}

interface NewsEverythingResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

type SortType = "relevancy" | "popularity" | "publishedAt";

// CREATE A CLASS AFTERWARDS!!!
export interface INewsEverythingRequest {
  apiKey: string;
  q: string;
  qInTitle: string;
  sources: string[];
  domains: string[];
  excludeDomains: string[];
  from: string;
  to: string;
  language: string;
  sortBy: SortType;
  pageSize: number;
  page: number;
}

export class NewsEverythingRequest implements INewsEverythingRequest {
  apiKey = process.env.REACT_APP_NEWS_API_KEY || "";
  q = "";
  qInTitle = "";
  sources = [];
  domains = [];
  excludeDomains = [];
  from = "";
  to = "";
  language = "en";
  sortBy = "relevancy" as SortType;
  pageSize = 20;
  page = 1;

  constructor(configOverride?: Partial<INewsEverythingRequest>) {
    if (configOverride) {
      Object.assign(this, configOverride);
      this.q = encodeURIComponent(this.q);
      this.qInTitle = encodeURIComponent(this.qInTitle);
    }
  }
}

const fetchApi = async (request: string) =>
  await fetch(request)
    .then((response) => response.json())
    .then((data) => data);

export const getNewsEverything = async (
  request: INewsEverythingRequest
): Promise<NewsEverythingResponse> => {
  const endpoint = `${process.env.REACT_APP_NEWS_API}/everything`;

  let queryString = `${endpoint}/?apiKey=${request.apiKey}&q=${request.q}&qInTitle=${request.qInTitle}`;

  let sources = "";

  if (request.sources?.length) {
    request.sources?.forEach((source, sourceIndex) => {
      if (sourceIndex === 0) {
        sources += `${source}`;
      } else {
        sources += `,${source}`;
      }
    });

    console.log(sources)

    queryString += `&sources=${sources}`;
  }

  let domains = "";

  if (request.domains?.length) {
    request.domains?.forEach((domain, domainIndex) => {
      if (domainIndex === 0) {
        domains += `${domain}`;
      } else {
        domains += `,${domain}`;
      }
    });

    queryString += `&domains=${domains}`;
  }

  let excludeDomains = "";

  if (request.excludeDomains?.length) {
    request.excludeDomains?.forEach((excludeDomain, excludeDomainIndex) => {
      if (excludeDomainIndex === 0) {
        excludeDomains += `${excludeDomain}`;
      } else {
        excludeDomains += `,${excludeDomain}`;
      }
    });

    queryString += `&excludeDomains=${excludeDomains}`;
  }

  queryString += `&from=${request.from}&to=${request.to}&language=${request.language}&sortBy=${request.sortBy}&pageSize=${request.pageSize}&page=${request.page}`;

  return await fetchApi(queryString);
};
