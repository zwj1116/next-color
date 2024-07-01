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
            <DeleteOutlined class="cursor-pointer" @click="treeFn.del(item, true)" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-3 h-full overflow-hidden">
      <div class="flex gap-2 justify-end">
        <a-button type="primary" @click="btnFn.refresh">搜索</a-button>
        <a-button @click="treeFn.pidAdd">添加</a-button>
      </div>
      <ResponsiveTable ref="tableRef" :columns="columns" :api="DictApi.page" :needGet="false">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'action'">
            <div class="flex gap-2 items-center whitespace-nowrap">
              <a @click="treeFn.editOpen(record)">编辑</a>
              <a-divider type="vertical" />
              <a @click="treeFn.del(record, false)">删除</a>
            </div>
          </template>
        </template>
      </ResponsiveTable>
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
  import { defineComponent, shallowReactive, toRefs, reactive, onMounted } from 'vue';
  import ResponsiveTable from '@/components/ResponsiveTable/index.vue';
  import DictApi from '@/api/dict';
  import { columns } from './config';
  import { Modal, notification } from 'ant-design-vue';
  import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';

  export default defineComponent({
    name: 'Color',
    components: { ResponsiveTable, EditOutlined, DeleteOutlined },
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
          if (!state.selectedKey) return;
          shallow.tableRef.tableFn.get({ pid: state.selectedKey });
        },
      };
      const treeFn = {
        getTree: () => {
          state.treeData.length = 0;
          DictApi.tree()
            .then((res: any) => {
              state.treeData.push(...res);
              if (state.treeData.length && !state.selectedKey) {
                state.selectedKey = state.treeData[0].id;
              }
              btnFn.refresh();
            })
            .catch(() => {});
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
                notification.success({ message: '新增成功！' });
                treeFn.cancel();
                treeFn.getTree();
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
        del: (record: any, isTree: boolean) => {
          Modal.confirm({
            title: '提示',
            content: `确定删除【${record.label}吗？】`,
            async onOk() {
              return await new Promise<void>((resolve, reject) => {
                DictApi.del({ id: record.id, isTree })
                  .then(() => {
                    if (isTree) {
                      state.selectedKey = null;
                      treeFn.getTree();
                    } else {
                      btnFn.refresh();
                    }
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
          btnFn.refresh();
        },
      };

      onMounted(() => treeFn.getTree());

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
