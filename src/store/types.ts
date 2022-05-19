import { CreateArticleState } from "@/store/modules/createArticle/types";
import { EditArticleState } from "@/store/modules/editArticle/types";
import { FeedState } from "@/store/modules/feed/types";
import { PopularTagsState } from "@/store/modules/popularTags/types";

// Base
export interface RootState {
  createArticle: CreateArticleState;
  editArticle: EditArticleState;
  feed: FeedState;
  popularTags: PopularTagsState;
}

export interface LoadingState<T> {
  data: T | null,
  isLoading: boolean,
  error: null
}