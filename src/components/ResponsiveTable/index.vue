<template>
  <div class="flex flex-col gap-3 overflow-hidden">
    <a-table
      class="sm max-sm:hidden overflow-auto"
      v-bind="$attrs"
      :dataSource="dataSource"
      :pagination="false"
      :loading="loading"
    >
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps || {}"></slot>
      </template>
    </a-table>
    <div class="max-sm sm:hidden flex flex-col gap-3 overflow-auto">
      <div v-for="(item, index) in dataSource" :key="index" class="bg-white border rounded-lg">
        <div v-for="(column, _index) in $attrs.columns" :key="_index" class="p-2 flex">
          <span class="shrink-0 w-20" :title="column.tilte">{{ `${column.title}: ` }}</span>
          <slot name="bodyCell" :record="item" :column="column">
            <span>{{ item[column.dataIndex] }}</span>
          </slot>
        </div>
      </div>
    </div>
    <a-pagination
      v-model:current="pagination.current"
      v-model:page-size="pagination.pageSize"
      class="text-right"
      show-quick-jumper
      showSizeChanger
      :total="pagination.total"
      :show-total="(total) => `总共 ${total} 条`"
      @change="tableFn.onChange"
      @show-size-change="tableFn.showSizeChange"
    />
  </div>
</template>
<script lang="ts">
  import { formatToDateTime } from '@/utils/dateUtil';
  import { defineComponent, onMounted, reactive, toRefs } from 'vue';

  export default defineComponent({
    props: {
      api: {
        type: Function,
        default: () => {},
      },
      apiCb: {
        type: Function,
        default: () => {},
      },
    },
    setup(props) {
      const state = reactive({
        dataSource: [] as any,
        pagination: {
          current: 1,
          pageSize: 10,
          total: 0,
        },
        loading: false,
      });
      const tableFn = {
        get: () => {
          state.loading = true;
          state.dataSource.length = 0;
          props.api &&
            props
              .api({}, state.pagination.current, state.pagination.pageSize)
              .then((res: any) => {
                res.list.forEach((e: any) => {
                  e.createTimeStr = formatToDateTime(e.createTime);
                  e.updateTimeStr = formatToDateTime(e.updateTime);
                });
                state.pagination.current = res.pageNum;
                state.pagination.total = res.total;
                props.apiCb &&
                  props.apiCb(res.list).then((data: any) => {
                    state.dataSource.push(...data);
                    state.loading = false;
                  });
              })
              .catch(() => {});
        },
        onChange: () => {
          tableFn.get();
        },
        showSizeChange: () => {
          tableFn.get();
        },
      };
      onMounted(() => tableFn.get());
      return {
        tableFn,
        ...toRefs(state),
      };
    },
  });
</script>
