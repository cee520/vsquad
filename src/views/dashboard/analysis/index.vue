<template>
  <div class="p-4">
    <SiteAnalysis class="!my-4 enter-y" :loading="loading" />
  </div>
  <div class="p-4">
    <VisitRoadmap class="!my-4 enter-y"  />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import SiteAnalysis from './components/SiteAnalysis.vue';
  import VisitRoadmap from './components/VisitRoadmap.vue';
  export default defineComponent({
    components: {
      SiteAnalysis,
      VisitRoadmap,
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

