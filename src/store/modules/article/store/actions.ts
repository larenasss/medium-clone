import { RootState } from "@/store/types";
import { ActionTree } from "vuex";
import { ArticleState } from '@/store/modules/article/types';
import articleApi from '@/api/article';
import { mytationTypes, actionsTypes } from '@/store/modules/article/types';
import { Article } from "@/entities/article";

export const actions: ActionTree<ArticleState, RootState> = {
  [actionsTypes.getArticle]: async ({ commit }, { slug }: {slug: string}) => {
    try {
      commit(mytationTypes.getArticleStart);
      const article: Article = await articleApi.getArticle(slug);
      commit(mytationTypes.getArticleSuccess, article);
    } catch (e) {
      commit(mytationTypes.getArticleFailure);
      throw e;
    }
  },
  [actionsTypes.deleteArticle]: async ({ commit }, { slug }: {slug: string}) => {
    try {
      commit(mytationTypes.deleteArticleStart);
      await articleApi.deleteArticle(slug);
      commit(mytationTypes.deleteArticleSuccess);
    } catch (e) {
      commit(mytationTypes.deleteArticleFailure);
      throw e;
    }
  }
};