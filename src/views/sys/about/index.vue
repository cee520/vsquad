<template>
  <PageWrapper title="关于">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <span class="flex-1">
          <a :href="GITHUB_URL" target="_blank">{{ name }}</a>
          是一个数字货币及时交易平台，通过对接大型数字货币交易所进行量化交易，目标是为用户创造价值。
        </span>
      </div>
    </template>
    <Description @register="infoRegister" class="enter-y" />
    <Description @register="register" class="my-4 enter-y" />
    <Description @register="registerDev" class="enter-y" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, h } from 'vue';

  import { Tag } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { Description, DescItem, useDescription } from '/@/components/Description/index';

  import { GITHUB_URL, SITE_URL, DOC_URL } from '/@/settings/siteSetting';
  export default defineComponent({
    name: 'AboutPage',
    components: { Description, PageWrapper },
    setup() {
      const { pkg, lastBuildTime } = __APP_INFO__;

      const { dependencies, devDependencies, name, version } = pkg;

      const schema: DescItem[] = [];
      const devSchema: DescItem[] = [];

      const commonTagRender = (color: string) => (curVal) => h(Tag, { color }, () => curVal);
      const commonLinkRender = (text: string) => (href) => h('a', { href, target: '_blank' }, text);

      const infoSchema: DescItem[] = [
        {
          label: '版本',
          field: 'version',
          render: commonTagRender('blue'),
        },
        {
          label: '最后编译时间',
          field: 'lastBuildTime',
          render: commonTagRender('blue'),
        },
      ];

      const infoData = {
        version,
        lastBuildTime,
        doc: DOC_URL,
        preview: SITE_URL,
        github: GITHUB_URL,
      };

      Object.keys(dependencies).forEach((key) => {
        schema.push({ field: key, label: key });
      });

      Object.keys(devDependencies).forEach((key) => {
        devSchema.push({ field: key, label: key });
      });

      const [register] = useDescription({
        title: '生产环境依赖',
        data: dependencies,
        schema: schema,
        column: 3,
      });

      const [registerDev] = useDescription({
        title: '开发环境依赖',
        data: devDependencies,
        schema: devSchema,
        column: 3,
      });

      const [infoRegister] = useDescription({
        title: '项目信息',
        data: infoData,
        schema: infoSchema,
        column: 2,
      });

      return { register, registerDev, infoRegister, name, GITHUB_URL };
    },
  });
</script>
