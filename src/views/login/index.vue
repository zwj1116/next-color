<template>
  <div class="font-sans">
    <div class="relative min-h-screen flex flex-col justify-center items-center bg-gray-100 p-10">
      <div class="relative sm:max-w-sm w-full">
        <div
          class="card bg-blue-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"
        ></div>
        <div
          class="card bg-red-400 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"
        ></div>
        <div class="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
          <label for="" class="block mt-3 text-sm text-gray-700 text-center font-semibold">
            Login
          </label>
          <a-form ref="formRef" :model="formState" class="mt-10">
            <a-form-item name="name" :rules="[{ required: true, message: '请输入名称' }]">
              <a-input v-model:value="formState.name" />
            </a-form-item>
            <a-form-item name="pwd" :rules="[{ required: true, message: '请输入密码!' }]">
              <a-input-password v-model:value="formState.pwd" />
            </a-form-item>
            <a-form-item name="captcha" :rules="[{ required: true, message: '请输入验证码!' }]">
              <div class="flex gap-6">
                <a-input v-model:value="formState.captcha" />
                <div v-dompurify-html="svg" class="cursor-pointer" @click="dataFn.captcha"></div>
              </div>
            </a-form-item>
            <button
              class="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
              @click="dataFn.login"
            >
              Login
            </button>
            <div class="flex mt-7 items-center text-center">
              <hr class="border-gray-300 border-1 w-full rounded-md" />
              <label class="block font-medium text-sm text-gray-600 w-full"> Accede con </label>
              <hr class="border-gray-300 border-1 w-full rounded-md" />
            </div>
            <div class="mt-7">
              <div class="flex justify-center items-center">
                <label class="mr-2">没有?</label>
                <router-link :to="{ name: 'register' }">
                  <a
                    class="text-blue-500 transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                  >
                    注册
                  </a>
                </router-link>
              </div>
            </div>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, reactive, shallowReactive, toRefs } from 'vue';
  import { SystemApi } from '@/api/system';

  export default defineComponent({
    setup() {
      const shallow = shallowReactive({
        formRef: null as any,
      });
      const state = reactive({
        svg: null as any,
        formState: {
          name: '',
          pwd: '',
          captcha: '',
          uuid: '',
        },
      });
      const dataFn = {
        captcha: () => {
          SystemApi.captcha().then((res) => {
            state.svg = res.data;
            state.formState.uuid = res.uuid;
          });
        },
        login: () => {
          shallow.formRef.validate().then(() => {
            SystemApi.login(state)
              .then((res) => {
                SystemApi.userInfo()
                  .then((info) => {
                    console.log(res);
                    console.log(info);
                  })
                  .catch(() => {});
              })
              .catch(() => {});
          });
        },
      };
      onMounted(() => dataFn.captcha());

      return {
        dataFn,
        ...toRefs(state),
        ...toRefs(shallow),
      };
    },
  });
</script>
<style lang="less" scoped></style>
