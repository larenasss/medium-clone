import { defineStore } from 'pinia';
import { Comment } from '@/entities/comment';
import commentsApi from '@/api/comments';
import { LoadingState } from '@/store/types';

export const useCommentsStore = defineStore('comments', {
  state: (): LoadingState<Array<Comment>> => ({
    data: null,
    isLoading: false,
    error: null
  }),
  actions: {
    async getComments({ slug }: {slug: string}) {
      try {
        this.$patch({
          isLoading: true,
          data: null
        });
        const comments: Array<Comment> = await commentsApi.getComments(slug);
        this.$patch({
          isLoading: true,
          data: comments.sort((a: any, b: any): any => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          })
        });
      } catch (e) {
        this.$reset();
        throw e;
      }
    },
    async addComment(data: any) {
      try {
        const comment: Comment = await commentsApi.addComment(data);
        this.$patch((state) => {
          state.data?.unshift(comment);
        });
      } catch (e: any) {
        this.$patch({
          error: e
        });
        throw e;
      }
    },
    async deleteComment(data: any) {
      try {
        await commentsApi.deleteComment(data);
        this.$patch((state) => {
          if (state.data != null) {
            state.data = state.data.filter((x: any) => x.id != data.slugComment);
          }
        });
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
  }
});