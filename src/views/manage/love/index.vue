<template>
  <div class="flex flex-col gap-3 h-full overflow-hidden">
    <div class="flex gap-2 space-between">
      <div class="flex gap-2 grow">
        <a-select v-model:value="dictP" class="w-40" placeholder="大类">
          <a-select-option v-for="item in categoryTree.tree" :key="item.id" :value="item.id">
            {{ item.label }}
          </a-select-option>
        </a-select>
        <a-select v-model:value="dictC" class="w-40" placeholder="小类">
          <a-select-option v-for="item in childTree.children" :key="item.id" :value="item.id">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </div>
      <div class="flex gap-2">
        <a-button type="primary" @click="btnFn.refresh">搜索</a-button>
        <router-link :to="{ name: 'opLove' }">
          <a-button>添加</a-button>
        </router-link>
      </div>
    </div>
    <ResponsiveTable ref="tableRef" :columns="columns" :api="LoveApi.page" :apiCb="btnFn.tableCb">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'rgb'">
          <div class="flex gap-2 items-center">
            <div class="w-5 h-5 rounded" :style="{ background: record.rgb }"></div>
            <span>{{ record.rgb }}</span>
          </div>
        </template>
        <template v-if="column.dataIndex === 'action'">
          <div class="flex gap-2 items-center whitespace-nowrap">
            <router-link :to="{ name: 'detailLove', query: { id: record.id } }">
              <a>详情</a>
            </router-link>
            <a-divider type="vertical" />
            <router-link :to="{ name: 'opLove', query: { id: record.id } }">
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
  import { computed, defineComponent, reactive, shallowRef, toRefs } from 'vue';
  import ResponsiveTable from '@/components/ResponsiveTable/index.vue';
  import LoveApi from '@/api/love';
  import { columns } from './config';
  import { Modal, notification } from 'ant-design-vue';
  import { useBasicStore } from '@/store/modules/basic';

  export default defineComponent({
    name: 'Color',
    components: { ResponsiveTable },
    setup() {
      const tableRef = shallowRef();
      const state = reactive({
        dictP: null as any,
        dictC: null as any,
      });
      const categoryTree = computed(() => useBasicStore().dict);
      const childTree = computed(
        () =>
          categoryTree.value[
            categoryTree.value.tree.findIndex((e: any) => e.id === state.dictP)
          ] || {
            children: [],
          }
      );

      const btnFn = {
        tableCb: (data: any) => {
          return new Promise((resolve: any) => {
            data.forEach(
              (e: any) => (e.labelStr = categoryTree.value.toLabel[`${e.dictP}-${e.dictC}`])
            );
            resolve();
          });
        },
        refresh: () => {
          tableRef.value.tableFn.get({ ...state });
        },
        del: (record: any) => {
          Modal.confirm({
            title: '提示',
            content: `确定删除【${record.label}吗？】`,
            async onOk() {
              return await new Promise<void>((resolve, reject) => {
                LoveApi.del({ id: record.id })
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
        filter: (inputValue: any, path: any) => {
          return path.some(
            (option: any) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
          );
        },
      };
      return {
        LoveApi,
        columns,
        btnFn,
        tableRef,
        ...toRefs(state),
        categoryTree,
        state,
        childTree,
      };
    },
  });
</script>
<style lang="less" scoped></style>
