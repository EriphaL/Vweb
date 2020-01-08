<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'

@Component({
  components:{
    
  },
})
export default class YourComponent extends Vue {}
</script>

<style>
body{
  margin:0;
}
.avue-upload__avatar{
  height: auto !important;
}
</style>
