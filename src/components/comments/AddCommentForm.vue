<template>
  <div>
    <form class="card comment-form" @submit.prevent="onSubmit">
      <div class="card-block">
        <textarea class="form-control"></textarea>
      </div>
      <div class="card-footer">
        <span class="comment-author-img">Тут картинка</span>
        <button type="submit" class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AppAddCommentForm',
  emits: ['addComment'],
  setup(_, { emit }) {
    const onSubmit = () => {
      const textarea = document.querySelector('textarea');
      const commentInput = { body: textarea.value };
      emit('addComment', commentInput);
    };

    return {
      onSubmit
    };
  }
};
</script>