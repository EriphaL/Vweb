<template>
  <div>
    <h3>{{ isNew ? '创建' : '编辑' }}课程</h3>
    <ele-form :form-data="data" :form-desc="fields" :request-fn="submit">
    </ele-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class CourseEdit extends Vue {
  // 不加！能运行但是有报错
  @Prop(String) id!: string
  data = {}
  fields = {
    // _id: { label: "ID" },
    name: { label: '课程名称', type: 'input' },
    cover: { label: '课程封面', type: 'input' }
  }
  // get表示把isNew这个方法当成属性来用
  get isNew() {
    return !this.id
  }

  async submit(data) {
    // global.console.log(data);
    const url = this.isNew ? `courses` : `courses/${this.id}`
    const method = this.isNew ? 'post' : 'put'
    // await this.$http.post(url,data) 本来是这样，现在要获取变量是用中括号
    await this.$http[method](url, data)
    this.$message.success('保存成功')
    this.data = {}
    // -1返回上一个页面
    this.$router.go(-1)
  }

  // 在d.ts文件中declare http相关之后这边不报错，并且有详细提示
  async fetch() {
    // GET /courses​/{id} (Find a record)接口中获得课程的详情内容，填在input中
    const res = await this.$http.get(`courses/${this.id}`)
    this.data = res.data
  }
  created() {
    !this.isNew && this.fetch()
  }
}
</script>

<style lang="scss"></style>
