<template>
  <div class="flex flex-col gap-3 overflow-auto">
    <div class="flex gap-2 justify-end">
      <a-button type="primary" @click="btnFn.refresh">搜索</a-button>
      <router-link :to="{ name: 'opArticle' }">
        <a-button>添加</a-button>
      </router-link>
    </div>
    <ResponsiveTable
      ref="tableRef"
      :columns="columns"
      :api="ArticleApi.pfPage"
      :apiCb="btnFn.tableCb"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <div class="flex items-center">
            <router-link :to="{ name: 'detailarticle', query: { id: record.id } }">
              <a>详情</a>
            </router-link>
            <a-divider type="vertical" />
            <router-link :to="{ name: 'opArticle', query: { id: record.id } }">
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
  import { computed, defineComponent, shallowReactive, toRefs } from 'vue';
  import ResponsiveTable from '@/components/ResponsiveTable/index.vue';
  import ArticleApi from '@/api/article';
  import { columns } from './config';
  import { Modal, notification } from 'ant-design-vue';
  import { useBasicStore } from '@/store/modules/basic';

  export default defineComponent({
    components: { ResponsiveTable },
    setup() {
      const shallow = shallowReactive({
        tableRef: null as any,
      });
      const categoryTree = computed(() => useBasicStore().dict);
      const btnFn = {
        refresh: () => {
          shallow.tableRef.tableFn.get();
        },
        tableCb: (data: any) => {
          return new Promise((resolve: any) => {
            data.forEach(
              (e: any) => (e.labelStr = categoryTree.value.toLabel[`${e.dictP}-${e.dictC}`])
            );
            resolve();
          });
        },
        del: (record: any) => {
          Modal.confirm({
            title: '提示',
            content: `确定删除【${record.title}吗？】`,
            async onOk() {
              return await new Promise<void>((resolve, reject) => {
                ArticleApi.del({ id: record.id })
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
        ArticleApi,
        columns,
        btnFn,
        ...toRefs(shallow),
      };
    },
  });
</script>
<style lang="less" scoped></style>
