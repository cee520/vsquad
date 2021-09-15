<template>
   <Card title="路书" >
    <div ref="roadmapRef" :style="{ width, height }"></div>
  </Card>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, Ref } from 'vue';

  import { useECharts } from '/@/hooks/web/useECharts';
  import { Card } from 'ant-design-vue';
  import { basicProps } from './props';
  import { honeyListApi, honeyPetListApi } from '/@/api/honey';  
  
  export default defineComponent({
    components: {Card},
    props: basicProps,
    setup() {
      const roadmapRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useECharts(roadmapRef as Ref<HTMLDivElement>);
      var data = [];
      var time = [];
      var oneDay = 24 * 3600;
      var last_id = 0;
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              width: 1,
              color: "#019680"
            }
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: time,
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              type: "solid",
              color: "rgba(226,226,226,0.5)"
            },
            splitNumber: 180
          },
          axisTick: {
            show: false
          }
        },
        yAxis: [
          {
            type: "value",
            max: "dataMax",
            min: "dataMin",
            splitNumber: 6,
            axisTick: {
              show: false
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ["rgba(255,255,255,0.2)", "rgba(226,226,226,0.2)"]
              }
            }
          }
        ],
        grid: { left: "1%", right: "1%", top: "2  %", bottom: 0, containLabel: true },
        series: [
          {
            data,
            type: "candlestick",
            areaStyle: {},
            itemStyle: {
              color: "#ff0000",
              borderColor: null
            }
          }
        ]
      };
      // setOptions(option);
      setInterval(function() {
        var params:HoneyParams = {
          limit: 180,
        };
        console.log("============== on setInterval Visit Roadmap =================");
        var honey;
        if (last_id != 0) {
          params.currentId=last_id;
        } 
        honey = honeyPetListApi(params);
        honey.then((res) => {
          console.log(res);
          for (var i of res.data) {
            var k = [i.o, i.c, i.h, i.l, i.i];
            var d = Math.ceil(i.t / (24 * 3600)+7);
            var t = i.t % (24 * 3600)+7*3600;
            var h = Math.ceil(t / 3600);
            var t = t % 3600;
            var m = Math.ceil(t / 60);
            var s = t % 60;
            if (i.id != last_id) {
              time.push(`${h}:${m}:${s}`);
              data.push(k);
            }
            if (data.length > 90) {
              data.shift();
              time.shift();
            }
          }
          ;
          last_id = res.data[res.data.length - 1].id;
        });
        option.series = [{
          data,
          type: "candlestick",
          areaStyle: {},
          itemStyle: {
            color: "#ff0000",
            borderColor: null
          }
        }];
        setOptions(option);
      }, 60*1000);
      onMounted(() => {
        setOptions(option);
      });
      return { roadmapRef };
    },
  });

</script>




