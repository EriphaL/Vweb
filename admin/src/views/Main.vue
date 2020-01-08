<template>
  <el-container>
    <el-aside width="13rem" >
      <!-- default-active高亮当前路径 -->
      <el-menu mode="vertical" style="height:100vh;" :default-active="$route.path" router>
        <el-submenu
          v-for="(item, index) in menu.items"
          :index="`menu-item-${index}`"
          :key="`menu-item-${index}`"
        >
          <template slot="title">{{ item.title }}</template>
          <el-menu-item
            v-for="(subItem, subIndex) in item.items"
            :index="subItem.path"
            :key="`menu-item-${index}-${subIndex}`"
          >
            {{ subItem.title }}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        VWEB后台管理页面
      </el-header>
      <el-main>
        <!-- Main content 子路由容器-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Main extends Vue {
  menu = {
    items: [
      {
        title: "内容管理",
        items: [
          { title: "首页", path: "/" },
          { title: "课程管理", path: "/courses/list" },
          { title: "课时管理", path: "/episodes/list" }
        ]
      },
      {
        title: "运营管理",
        items: [
          { title: "用户管理", path: "/users/list" },
        ]
      }
    ]
  };
}
</script>

<style>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    font-weight: bold;
    font-size: 1.2rem;
  }
</style>
