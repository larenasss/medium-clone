import { RootState } from "@/store/types";
import { ActionTree } from "vuex";
import { EditArticleState } from '@/store/modules/editArticle/types';
import articleApi from '@/api/article';
import { mytationTypes, actionsTypes } from '@/store/modules/editArticle/types';

export const actions: ActionTree<EditArticleState, RootState> = {
  [actionsTypes.updateArticle]: async ({ commit }, { slug, articleInput }: {slug: string, articleInput: any}) => {
      try {
        commit(mytationTypes.updateArticleStart);
        const article = await articleApi.updateArticle(slug, articleInput);
        commit(mytationTypes.updateArticleSuccess, article);
        return article;
      } catch (e: any) {
        commit(mytationTypes.updateArticleFailure, e.response.data.errors);
        throw e;
      }
    },
    [actionsTypes.getArticle]: async ({ commit }, { slug }: { slug: string }) => {
      try {
        commit(mytationTypes.getArticleStart);
        const article = await articleApi.getArticle(slug);
        commit(mytationTypes.getArticleSuccess, article);
        return article;
      } catch (e) {
        commit(mytationTypes.getArticleFailure);
        throw e;
      }
    }
};