export class Article {
  title: string;
  description: string;
  body: string;
  tagList: Array<string> | string;

  constructor(params: Article = {title: '', description: '', body: '', tagList: []}) {
    this.title = params.title;
    this.description = params.description;
    this.body = params.body;
    this.tagList = params.tagList;
  }
}