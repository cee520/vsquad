<template>
  <Card
    :tab-list="tabListTitle"
    v-bind="$attrs"
    :active-tab-key="activeKey"
    @tabChange="onTabChange"
  >
    <p v-if="activeKey === 'tab1'">
      <VisitAnalysis />
    </p>

  </Card>

</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';

  import { Card } from 'ant-design-vue';

  import VisitAnalysis from './VisitAnalysis.vue';

  // import VisitAnalysisBar from './VisitAnalysisBar.vue';

  export default defineComponent({
    components: { Card, VisitAnalysis },
    setup() {
      const activeKey = ref('tab1');

      const tabListTitle = [
        {
          key: 'tab1',
          tab: '趋势',
        },


      ];

      function onTabChange(key) {
        activeKey.value = key;
      }
      
      return { tabListTitle, activeKey, onTabChange };
    },
  });
</script>
