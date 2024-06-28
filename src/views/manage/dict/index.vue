<template>
  <div class="flex gap-3 h-full overflow-hidden">
    <div class="flex flex-col gap-3 h-full w-48 shrink-0">
      <a-button type="primary" class="w-max" @click="treeFn.open">添加</a-button>
      <div class="flex flex-col gap-3 w-full grow">
        <div
          v-for="item in treeData"
          :key="item.id"
          :class="[
            'flex justify-between items-center w-full hover:bg-sky-100 px-4 py-2 rounded-lg',
            item.id === selectedKey ? 'bg-sky-100' : 'bg-transparent',
          ]"
          @click="treeFn.select(item)"
        >
          <span>{{ item.label }}</span>
          <div class="flex gap-3 items-center">
            <EditOutlined class="cursor-pointer" @click="treeFn.editOpen(item)" />
            <DeleteOutlined class="cursor-pointer" @click="treeFn.del(item)" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-3 h-full overflow-hidden">
      <div class="flex gap-2 justify-end">
        <a-button type="primary" @click="btnFn.refresh">搜索</a-button>
        <a-button @click="treeFn.pidAdd">添加</a-button>
      </div>
      <ResonsiveTable ref="tableRef" :columns="columns" :api="DictApi.page" :apiCb="treeFn.get">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'rgb'">
            <div class="flex gap-2 items-center">
              <div class="w-5 h-5 rounded" :style="{ background: record.rgb }"></div>
              <span>{{ record.rgb }}</span>
            </div>
          </template>
          <template v-if="column.dataIndex === 'action'">
            <div class="flex gap-2 items-center whitespace-nowrap">
              <a @click="treeFn.editOpen(record)">编辑</a>
              <a-divider type="vertical" />
              <a @click="treeFn.del(record)">删除</a>
            </div>
          </template>
        </template>
      </ResonsiveTable>
    </div>
    <a-modal v-model:open="treeOpen" title="字典操作" @ok="treeFn.ok" @cancel="treeFn.cancel">
      <a-form ref="treeRef" :model="formState">
        <a-form-item label="名称" name="label" :rules="[{ required: true, message: '请输入名称' }]">
          <a-input v-model:value="formState.label" placeholder="请输入名称" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, shallowReactive, toRefs, reactive } from 'vue';
  import ResonsiveTable from '@/components/ResponsiveTable/index.vue';
  import DictApi from '@/api/dict';
  import { columns } from './config';
  import { Modal, notification } from 'ant-design-vue';
  import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';

  export default defineComponent({
    name: 'Color',
    components: { ResonsiveTable, EditOutlined, DeleteOutlined },
    setup() {
      const shallow = shallowReactive({
        tableRef: null as any,
        treeRef: null as any,
      });
      const noState = {
        pid: null as any,
        isAdd: false as boolean,
      };
      const state = reactive({
        treeOpen: false,
        formState: {
          label: null as any,
        } as any,
        treeData: [] as any,
        selectedKey: null as any,
      });
      const btnFn = {
        refresh: () => {
          shallow.tableRef.tableFn.get();
        },
      };
      const treeFn = {
        get: (data: any) => {
          state.treeData.length = 0;
          return new Promise((resolve: any) => {
            const { tree, table } = data.reduce(
              (t: any, v: any) => {
                t[Number(v.pid) === -1 ? 'tree' : 'table'].push(v);
                return t;
              },
              { tree: [], table: [] }
            );
            state.treeData.push(...tree);
            if (state.treeData.length) {
              state.selectedKey = state.treeData[0].id;
            }
            resolve(table);
          });
        },
        open: () => {
          noState.pid = -1;
          noState.isAdd = true;
          state.treeOpen = true;
        },
        ok: () => {
          shallow.treeRef.validate().then(() => {
            DictApi[noState.isAdd ? 'add' : 'update']({ ...state.formState, pid: noState.pid })
              .then(() => {
                btnFn.refresh();
                notification.success({ message: '新增成功！' });
                treeFn.cancel();
              })
              .catch(() => {});
          });
        },
        cancel: () => {
          state.formState = { label: null };
          noState.pid = null;
          noState.isAdd = false;
          state.treeOpen = false;
        },
        pidAdd: () => {
          noState.isAdd = true;
          noState.pid = state.selectedKey;
          state.treeOpen = true;
        },
        del: (record: any) => {
          Modal.confirm({
            title: '提示',
            content: `确定删除【${record.label}吗？】`,
            async onOk() {
              return await new Promise<void>((resolve, reject) => {
                DictApi.del({ id: record.id })
                  .then(() => {
                    btnFn.refresh();
                    notification.success({ message: '删除成功！' });
                    resolve();
                  })
                  .catch(() => reject());
              });
            },
            onCancel() {},
          });
        },
        editOpen: (record: any) => {
          state.formState = { label: record.label, id: record.id };
          noState.pid = record.pid;
          noState.isAdd = false;
          state.treeOpen = true;
        },
        select: (record: any) => {
          state.selectedKey = record.id;
        },
      };
      return {
        DictApi,
        columns,
        btnFn,
        ...toRefs(shallow),
        ...toRefs(state),
        treeFn,
      };
    },
  });
</script>
<style lang="less" scoped></style>
