<template>
  <div class="flex flex-col gap-3">
    <a-table
      class="sm max-sm:hidden"
      v-bind="$attrs"
      :dataSource="dataSource"
      :pagination="false"
      :loading="loading"
    >
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps || {}"></slot>
      </template>
    </a-table>
    <div class="max-sm sm:hidden flex flex-col gap-3">
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
      v-model:current="paginaiton.current"
      v-model:page-size="paginaiton.pageSize"
      class="text-right"
      show-quick-jumper
      :total="paginaiton.total"
      :show-total="(total) => `总共 ${total} 条`"
      @change="tableFn.onChange"
      @show-size-change="tableFn.showSizeChange"
    />
  </div>
</template>
<script lang="ts">
  import { formatToDateTime } from '@/utils/dateUtil';
  import { defineComponent } from 'vue';

  export default defineComponent({
    props: {
      api: {
        type: Function,
        default: () => {},
      },
    },
    setup(props) {
      const state = reactive({
        dataSource: [] as any,
        paginaiton: {
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
              .api({}, state.paginaiton.current, state.paginaiton.pageSize)
              .then((res: any) => {
                res.list.forEach((e: any) => {
                  e.createTimeStr = formatToDateTime(e.createTime);
                  e.updateTimeStr = formatToDateTime(e.updateTime);
                });
                state.dataSource.push(...res.list);
                state.paginaiton.current = res.pageNum;
                state.paginaiton.total = res.total;
                state.loading = false;
              })
              .catch(() => {});
        },
        onChange: () => {},
        showSizeChange: () => {},
      };
      onMounted(() => tableFn.get());
      return {
        tableFn,
        ...toRefs(state),
      };
    },
  });
</script>
