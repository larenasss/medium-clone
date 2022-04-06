import commentsApi from '@/api/comments';

const MODULE_NAME = 'comments';

export const mytationTypes = {
  getCommentsStart: `[${MODULE_NAME}] getCommentsStart`,
  getCommentsSuccess: `[${MODULE_NAME}] getCommentsSuccess`,
  getCommentsFailure: `[${MODULE_NAME}] getCommentsFailure`,

  deleteCommentStart: `[${MODULE_NAME}] deleteCommentStart`,
  deleteCommentSuccess: `[${MODULE_NAME}] deleteCommentSuccess`,
  deleteCommentFailure: `[${MODULE_NAME}] deleteCommentFailure`,

  addCommentStart: `[${MODULE_NAME}] addCommentStart`,
  addCommentSuccess: `[${MODULE_NAME}] addCommentSuccess`,
  addCommentFailure: `[${MODULE_NAME}] addCommentFailure`,
};

export const actionsTypes = {
  getComments: `[${MODULE_NAME}] getComments`,
  deleteComment: `[${MODULE_NAME}] deleteComment`,
  addComment: `[${MODULE_NAME}] addComment`,
};

export default {
  state() {
    return {
      data: null,
      isLoading: false,
      validationErrors: null
    };
  },
  mutations: {
    [mytationTypes.getCommentsStart](state) {
      state.isLoading = true;
      state.data = null;
    },
    [mytationTypes.getCommentsSuccess](state, payload) {
      state.isLoading = false;
      state.data = payload.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    },
    [mytationTypes.getCommentsFailure](state) {
      state.isLoading = false;
    },
    [mytationTypes.deleteCommentStart]() {},
    [mytationTypes.deleteCommentSuccess](state, { slugComment }) {
      state.data = state.data.filter(x => x.id != slugComment);
    },
    [mytationTypes.deleteCommentFailure]() {},
    [mytationTypes.addCommentStart]() {},
    [mytationTypes.addCommentSuccess](state, payload) {
      state.data.unshift(payload);
    },
    [mytationTypes.addCommentFailure](state, payload) {
      state.validationErrors = payload;
    },
  },
  actions: {
    [actionsTypes.getComments]: async ({ commit }, { slug }) => {
      try {
        commit(mytationTypes.getCommentsStart);
        const comments = await commentsApi.getComments(slug);
        commit(mytationTypes.getCommentsSuccess, comments);
      } catch (e) {
        commit(mytationTypes.getCommentsFailure);
        throw e;
      }
    },
    [actionsTypes.addComment]: async ({ commit }, data) => {
      try {
        commit(mytationTypes.addCommentStart);
        const comment = await commentsApi.addComment(data);
        commit(mytationTypes.addCommentSuccess, comment);
      } catch (e) {
        commit(mytationTypes.addCommentFailure, e.response.data.errors);
        throw e;
      }
    },
    [actionsTypes.deleteComment]: async ({ commit }, data) => {
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