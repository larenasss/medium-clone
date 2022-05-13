import { Tag } from "./tag";
import { UserAuthor } from "./user";

export class Article {
  title: string;
  description: string;
  body: string;
  tagList: Array<Tag>;
  createdAt?: string;
  favorited?: boolean;
  favoritesCount?: number;
  slug?: string;
  updatedAt?: string;
  author?: UserAuthor

  constructor(params: Article = {
    title: '',
    description: '',
    body: '',
    tagList: [],
    createdAt: '',
    favorited: false,
    favoritesCount: 0,
    slug: '',
    updatedAt: ''
  })
  {
    this.title = params.title;
    this.description = params.description;
    this.body = params.body;
    this.tagList = params.tagList;
  }
}