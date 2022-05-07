import { Article } from "./article";

export class Feed {
  articles: Array<Article>;
  articlesCount: number;

  constructor(params: Feed = { articles: [], articlesCount: 0}) {
    this.articles = params.articles;
    this.articlesCount = params.articlesCount;
  }
}