<template>
  <div class="p-4">

    <SiteAnalysis class="!my-4 enter-y" :loading="loading" />


  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import SiteAnalysis from './components/SiteAnalysis.vue';
  export default defineComponent({
    components: {
      SiteAnalysis,
    },
    setup() {
      const loading = ref(true);

      setTimeout(() => {
        loading.value = false;
      }, 1500);
      return { loading };
    },
  });
</script>
