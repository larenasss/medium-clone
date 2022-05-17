import { AddToFavoritesState } from "@/store/modules/addToFavorites/types";
import { ArticleState } from "@/store/modules/article/types";
import { CommentsState } from "@/store/modules/comments/types";
import { CreateArticleState } from "@/store/modules/createArticle/types";
import { EditArticleState } from "@/store/modules/editArticle/types";
import { FeedState } from "@/store/modules/feed/types";
import { PopularTagsState } from "@/store/modules/popularTags/types";
import { SettingsState } from "@/store/modules/settings/types";
import { UserState } from "@/store/modules/userProfile/types";

// Base
export interface RootState {
  addToFavorites: AddToFavoritesState;
  article: ArticleState;
  comments: CommentsState;
  createArticle: CreateArticleState;
  editArticle: EditArticleState;
  feed: FeedState;
  popularTags: PopularTagsState;
  userProfile: UserState;
  settings: SettingsState;
}

export interface LoadingState<T> {
  data: T | null,
  isLoading: boolean,
  error: null
}