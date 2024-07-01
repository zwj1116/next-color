<template>
  <div class="flex flex-col gap-3 h-full overflow-hidden">
    <div class="flex gap-2 justify-end">
      <a-button type="primary" @click="btnFn.refresh">搜索</a-button>
      <router-link :to="{ name: 'opColor' }">
        <a-button>添加</a-button>
      </router-link>
    </div>
    <ResponsiveTable ref="tableRef" :columns="columns" :api="ColorApi.page">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'rgb'">
          <div class="flex gap-2 items-center">
            <div class="w-5 h-5 rounded" :style="{ background: record.rgb }"></div>
            <span>{{ record.rgb }}</span>
          </div>
        </template>
        <template v-if="column.dataIndex === 'action'">
          <div class="flex gap-2 items-center whitespace-nowrap">
            <router-link :to="{ name: 'detailColor', query: { id: record.id } }">
              <a>详情</a>
            </router-link>
            <a-divider type="vertical" />
            <router-link :to="{ name: 'opColor', query: { id: record.id } }">
              <a>编辑</a>
            </router-link>
            <a-divider type="vertical" />
            <a @click="btnFn.del(record)">删除</a>
          </div>
        </template>
      </template>
    </ResponsiveTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent, shallowReactive, toRefs } from 'vue';
  import ResponsiveTable from '@/components/ResponsiveTable/index.vue';
  import ColorApi from '@/api/color';
  import { columns } from './config';
  import { Modal, notification } from 'ant-design-vue';

  export default defineComponent({
    name: 'Color',
    components: { ResponsiveTable },
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
            content: `确定删除【${record.name}吗？】`,
            async onOk() {
              return await new Promise<void>((resolve, reject) => {
                ColorApi.del({ id: record.id })
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
