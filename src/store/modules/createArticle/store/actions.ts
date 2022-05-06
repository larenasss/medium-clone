import { RootState } from "@/store/types";
import { ActionTree } from "vuex";
import { CreateArticleState } from '@/store/modules/createArticle/types';
import articleApi from '@/api/article';
import { mytationTypes, actionsTypes } from '@/store/modules/createArticle/types';
import { Article } from "@/entities/article";

export const actions: ActionTree<CreateArticleState, RootState> = {
  [actionsTypes.createArticle]: async ({ commit }, articleInput: Article) => {
      try {
        commit(mytationTypes.createArticleStart);
        const article = await articleApi.createArticle(articleInput);
        commit(mytationTypes.createArticleSuccess);
        return article;
      } catch (e: any) {
        commit(mytationTypes.createArticleFailure, e.response.data.errors);
        throw e;
      }
    }
};