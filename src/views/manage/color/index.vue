<template>
  <div class="flex flex-col gap-3 h-full">
    <Return :isTitle="true" message="文章列表"></Return>
    <div class="flex gap-2 justify-end">
      <a-button type="primary" @click="btnFn.refresh">搜索</a-button>
      <router-link :to="{ name: 'opColor' }">
        <a-button>添加</a-button>
      </router-link>
    </div>
    <ResonsiveTable ref="tableRef" :columns="columns" :api="ColorApi.page">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <div class="flex gap-2 items-center">
            <router-link :to="{ name: 'detailColor' }">
              <a>详情</a>
            </router-link>
            <a-divider type="vertical" />
            <router-link :to="{ name: 'opColor' }">
              <a>编辑</a>
            </router-link>
            <a-divider type="vertical" />
            <a @click="btnFn.del(record)">删除</a>
          </div>
        </template>
      </template>
    </ResonsiveTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent, shallowReactive, toRefs } from 'vue';
  import ResonsiveTable from '@/components/ResponsiveTable/index.vue';
  import ColorApi from '@/api/color';
  import { columns } from './config';
  import { Modal, notification } from 'ant-design-vue';

  export default defineComponent({
    components: { ResonsiveTable },
    setup() {
      const shallow = shallowReactive({
        tableRef: null as any,
      });
      const btnFn = {
        refresh: () => {
          shallow.tableRef.tableFn.get();
        },
        del: (record: any) => {
          Modal.confirm({
            title: '提示',
            content: `确定删除【${record.title}吗？】`,
            async onOk() {
              return await new Promise<void>((resolve, reject) => {
                ColorApi.del(record.id)
                  .then(() => {
                    notification.success({ message: '删除成功！' });
                    btnFn.refresh();
                    resolve();
                  })
                  .catch(() => {
                    reject();
                  });
              });
            },
            onCancel() {},
          });
        },
      };
      return {
        ColorApi,
        columns,
        btnFn,
        ...toRefs(shallow),
      };
    },
  });
</script>
<style lang="less" scoped></style>
