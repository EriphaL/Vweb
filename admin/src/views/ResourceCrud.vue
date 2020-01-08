<template>
  <div>
    <avue-crud
      v-if="option.column"
      :data="data.data"
      :option="option"
      :page="page"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
      @on-load="changePage"
      @sort-change="chageSort"
      @search-change="search"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class ResourceList extends Vue {
  @Prop(String) resource!: string
  data: any = {}
  // 把option中的数据挪到服务端去，增强扩展性
  option: any = {}
  // 做分页，需要page里面写total，不写的话显示不了分页条
  page: any = {
    total: 0,
    pageSize: 5,
    pageSizes: [5, 10]
  }
  query: any = {
    limit: 5
  }

  async fetchOption() {
    const res = await this.$http.get(`${this.resource}/option`)
    this.option = res.data
  }

  // 在d.ts文件中declare http相关之后这边不报错，并且有详细提示
  async fetch() {
    const res = await this.$http.get(`${this.resource}`, {
      params: {
        query: this.query
      }
    })
    this.page.total = res.data.total
    this.data = res.data
  }

  // 分页换页
  async changePage({ pageSize, currentPage }) {
    // global.console.log(page)
    this.query.page = currentPage
    this.query.limit = pageSize
    this.fetch()
  }

  // 排序,直接解构取里面的prop和order
  async chageSort({ prop, order }) {
    // global.console.log(order)
    // 问题：点击没有null
    if (!order) {
      this.query.sort = null
    } else {
      this.query.sort = {
        // 在对象里面如果需要动态的写它的键，它是个变量的话，要加中括号，然后取到prop真实的值作为键（ex.这边的prop是name）
        [prop]: order === 'ascending' ? 1 : -1
      }
    }
    this.fetch()
  }

  // 搜索,regex使用正则表达式，服务端也要加上字段regex,才可以模糊搜索
  async search(where,done) {
    for(let k in where){
      // 动态搜索，遍历后在列中寻找同名的列，再看看这个列上有没有regex的属性
      const field = this.option.column.find(v=>v.prop === k)
      if(field.regex){
        where[k]= {$regex: where[k]}
      }
    }
    this.query.where = where
    this.fetch()
    done()
  }

  async create(row, done, loading) {
    await this.$http.post(`${this.resource}`, row)
    this.$message.success('创建成功')
    this.fetch()
    // 必须要调用done才能加载完成并且关闭这个框
    done()
  }

  async update(row, index, done, loading) {
    // 在更新中，会增加一个$index: 1的字段，而$开头的字段对于mongodb有特殊意义，所以传不过去报500错误，无法执行下面的done
    // 拿当前行数据，先把他stringify成字符串格式，再parse成对象格式，然后删除它的$index字段
    const data = JSON.parse(JSON.stringify(row))
    delete data.$index
    await this.$http.put(`${this.resource}/${row._id}`, data)
    this.$message.success('更新成功')
    this.fetch()
    done()
  }

  async remove(row, index) {
    try {
      await this.$confirm('是否要删除？')
    } catch (error) {
      return
    }
    await this.$http.delete(`${this.resource}/${row._id}`)
    this.$message.success('删除成功')
    this.fetch()
  }

  created() {
    this.fetchOption()
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
