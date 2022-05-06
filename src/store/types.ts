import { AddToFavoritesState } from "./modules/addToFavorites/types";
import { ArticleState } from "./modules/article/types";
import { AuthState } from "./modules/auth/types";
import { CommentsState } from "./modules/comments/types";
import { CreateArticleState } from "./modules/createArticle/types";
import { EditArticleState } from "./modules/editArticle/types";
import { FeedState } from "./modules/feed/types";
import { PopularTagsState } from "./modules/popularTags/types";
import { SettingsState } from "./modules/settings/types";
import { UserState } from "./modules/userProfile/types";

// Base
export interface RootState {
  addToFavorites: AddToFavoritesState;
  article: ArticleState;
  auth: AuthState;
  comments: CommentsState;
  createArticle: CreateArticleState;
  editArticle: EditArticleState;
  feed: FeedState;
  popularTags: PopularTagsState;
  userProfile: UserState;
  settings: SettingsState;
}

export interface LoadingState {
  data: null,
  isLoading: boolean,
  error: null
}