import commentsApi from '@/api/comments';

const MODULE_NAME = 'comments';

export const mytationTypes = {
  getCommentsStart: `[${MODULE_NAME}] getCommentsStart`,
  getCommentsSuccess: `[${MODULE_NAME}] getCommentsSuccess`,
  getCommentsFailure: `[${MODULE_NAME}] getCommentsFailure`,

  deleteCommentStart: `[${MODULE_NAME}] deleteCommentStart`,
  deleteCommentSuccess: `[${MODULE_NAME}] deleteCommentSuccess`,
  deleteCommentFailure: `[${MODULE_NAME}] deleteCommentFailure`,
};

export const actionsTypes = {
  getComments: `[${MODULE_NAME}] getComments`,
  deleteComments: `[${MODULE_NAME}] deleteComments`,
};

export default {
  state() {
    return {
      data: null,
      isLoading: false,
      error: null
    };
  },
  mutations: {
    [mytationTypes.getCommentsStart](state) {
      state.isLoading = true;
      state.data = null;
    },
    [mytationTypes.getCommentsSuccess](state, payload) {
      state.isLoading = false;
      state.data = payload;
    },
    [mytationTypes.getCommentsFailure](state) {
      state.isLoading = false;
    },
    [mytationTypes.deleteCommentStart]() {},
    [mytationTypes.deleteCommentSuccess](state, { slugComment }) {
      state.data = state.data.filter(x => x.id != slugComment);
    },
    [mytationTypes.deleteCommentFailure]() {},
  },
  actions: {
    [actionsTypes.getComments]: async ({ commit }, { slug }) => {
      try {
        commit(mytationTypes.getCommentsStart);
        console.log(slug);
        const comments = await commentsApi.getComments(slug);
        commit(mytationTypes.getCommentsSuccess, comments);
      } catch (e) {
        commit(mytationTypes.getCommentsFailure);
        throw e;
      }
    },
    [actionsTypes.deleteComments]: async ({ commit }, data) => {
      try {
        commit(mytationTypes.deleteCommentStart);
        await commentsApi.deleteComment(data);
        commit(mytationTypes.deleteCommentSuccess, data);
      } catch (e) {
        commit(mytationTypes.deleteCommentFailure);
        throw e;
      }
    }
  }
};