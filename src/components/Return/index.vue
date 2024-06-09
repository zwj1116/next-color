<template>
  <router-link v-if="!isTitle" :to="{ name, query }" class="flex gap-2 items-center text-lg">
    <svg-icon icon-class="arrow-loeft"></svg-icon>
    <span>{{ message }}</span>
  </router-link>
  <div v-else class="flex gap-2 items-center text-lg">
    {{ message }}
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    props: {
      isTitle: {
        type: Boolean,
        default: false,
      },
      name: {
        type: String,
        default: '',
      },
      query: {
        type: String,
        default: '',
      },
      message: {
        type: String,
        default: '',
      },
    },
    setup() {},
  });
</script>
