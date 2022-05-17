export class User {
  username: string;
  bio: string;
  image: string;

  constructor(user: User = {username: '', bio: '', image: ''}) {
    this.username = user.username;
    this.bio = user.bio;
    this.image = user.image;
  }
}

export class UserProfile extends User {
  email: string;
  token?: string = '';
  password?: string;

  constructor(userProfile: UserProfile = {username: '', bio: '', image: '', email: '', token: '', password: ''}) {
    super(userProfile);
    this.email = userProfile.email;
    this.token = userProfile.token;
    this.password = userProfile.password;
  }
}

export class UserAuthor extends User {
  following: boolean;

  constructor(userAuthor: UserAuthor = {username: '', bio: '', image: '', following: false}) {
    super(userAuthor);
    this.following = userAuthor.following;
  }
}