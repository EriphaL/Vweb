import Vue from "vue"
import { AxiosInstance } from "axios";

// 关于http的提示，防止报错
declare module 'vue/types/vue' {
  interface Vue {
    $http: AxiosInstance
  }
}