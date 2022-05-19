export class User {
  constructor(
    public username: string = '',
    public bio: string = '',
    public image: string = ''
  ) {}
}

export class UserProfile extends User {
  constructor(
    public email: string = '',
    public password: string = '',
    public username: string = '',
    public bio: string = '',
    public image: string = '',
    public token: string = '',
  ) {
    super(username, bio, image);
  }
}

export class UserAuthor extends User {
  constructor(
    public username: string = '',
    public bio: string = '',
    public image: string = '',
    public following: boolean = false) {
    super(username, bio, image);
  }
}