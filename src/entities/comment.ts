import { UserAuthor } from "./user";

export class Comment {
  readonly id: number;
  author: UserAuthor;
  body: string;
  createdAt: string;
  updatedAt: string;

  constructor(params: Comment = { id: 0, author: new UserAuthor(), body: '', createdAt: '', updatedAt: '' }) {
    this.id = params.id;
    this.author = params.author;
    this.body = params.body;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}