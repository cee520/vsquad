<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, Ref } from 'vue';

  import { useECharts } from '/@/hooks/web/useECharts';

  import { basicProps } from './props';
  import { honeyListApi } from '/@/api/honey';  
  import { HoneyParams} from '/@/api/model/honeyModel';
  
  export default defineComponent({
    props: basicProps,
    setup() {
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

      // function getData(){
      //   now = new Date(+now+oneDay);
      //   value = value + Math.random()*21-10;
      
      //   return t;
      //   // .finally(()=>{return t});
      // }

      var data =[];
      var time =[];
      var now = +new Date(2021,9,5);
      var oneDay = 24* 3600;
      var value =Math.random()*1000;
      var last_id = 0;
      // console.log(honey);

      // for (var i =0;i<40; i++){
      //   var m = Math.ceil(i*5/60);
      //   var s = (i*5) % 60;
      //   time.push(`${m}:${s}`);
      // }
      var option={
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                width: 1,
                color: '#019680',
              },
            },
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: time,
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                type: 'solid',
                color: 'rgba(226,226,226,0.5)',
              },
            splitNumber:180,
            },
            axisTick: {
              show: false,
            },
          },
          yAxis: [
            {
              type: 'value',
              max: 'dataMax',
              min: 'dataMin',
              splitNumber: 6,
              axisTick: {
                show: false,
              },
              splitArea: {
                show: true,
                areaStyle: {
                  color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
                },
              },
            },
          ],
          grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
          series: [
            {
              data: data,
              type: 'candlestick',
              areaStyle: {},
              itemStyle: {
                color: '#ff0000',
                borderColor: null,
              },
            },
           
          ],
        }

      setInterval( function(){

        // while (data.length>100) { data.shift()};
        var params:HoneyParams = {
          limit: 90,
        }
        if (last_id!=0) {params.currentId=last_id};
        var honey;
        honey=honeyListApi(params);
        honey.then(res=>{
          console.log(res);
          for(var i of res.data){
            var k=[i.o, i.c, i.h, i.l];
            var d=Math.ceil(i.t/(24*3600));
            var t=i.t % (24*3600)+7*3600;
            var h=Math.ceil(t/3600);
            var t=t % 3600;
            var m=Math.ceil(t/60);
            var s=t % 60;
            if (i.id!=last_id){
              time.push(`${h}:${m}:${s}`);
              data.push(k);}
            if (data.length>180) {data.shift();time.shift()}
          };
          last_id = res.data[res.data.length-1].id;
        });
        option.series=[{
              data: data,
              type: 'candlestick',
              areaStyle: {},
              itemStyle: {
                color: '#ff0000',
                borderColor: null,
              },
            },];
        setOptions(option);
       
      },5000);
      onMounted(() => {
        setOptions(option);
      });
      return { chartRef };
    },
  });

</script>
