<template>
  <div>
    <div class="c-box">
      <div><h3>课程列表</h3></div>
      <div style="flex-grow:1;"></div>
      <div>
        <el-button size="small" type="primary" @click="$router.push('create')"
          >创建课程</el-button
        >
      </div>
    </div>
    <el-table :data="data.data" border stripe>
      <el-table-column
        v-for="(field, name) in fields"
        :prop="name"
        :key="name"
        :label="field.label"
        :width="field.width"
      >
      </el-table-column>
      <el-table-column label="操作" width="200">
        <!-- 获取当前行id ：在template中加一个插槽取出当前id,scope是element规定的表示当前作用域，它里面有个row表示当前行，取id ${scope.row._id}-->
        <!-- 或者直接解构，在插槽里面取{row} -->
        <template v-slot="{ row }">
          <div class="c-box">
            <el-button
              icon="el-icon-edit"
              size="small"
              type="success"
              @click="$router.push(`edit/${row._id}`)"
              >编辑</el-button
            >
            <el-button
              icon="el-icon-delete"
              size="small"
              type="warning"
              @click="remove(row)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class CourseList extends Vue {
  data = {}
  fields = {
    _id: { label: 'ID' },
    name: { label: '课程名称' },
    cover: { label: '课程封面' }
  }
  // 在d.ts文件中declare http相关之后这边不报错，并且有详细提示
  async fetch() {
    const res = await this.$http.get('courses')
    this.data = res.data
  }

  async remove(row) {
    try {
      await this.$confirm('是否要删除？')
    } catch (error) {
      return
    }
    await this.$http.delete(`courses/${row._id}`)
    this.$message.success('删除成功')
    this.fetch()
  }

  created() {
    this.fetch()
  }
}
</script>

<style>
.c-box {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
}
</style>
