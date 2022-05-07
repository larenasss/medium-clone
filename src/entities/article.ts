export class Article {
  title: string;
  description: string;
  body: string;
  tagList: Array<string> | string;
  createdAt?: string;
  favorited?: boolean;
  favoritesCount?: number;
  slug?: string;
  updatedAt?: string;

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