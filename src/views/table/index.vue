<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      height="750"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      :default-sort="{prop: 'score', order: 'descending'}"
    >
      <el-table-column prop="pic" align="center" label="图片" width="200">
        <template slot-scope="scope">
          <img :src="scope.row.image_url">
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center" sortable>
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column prop="authors" label="作者" width="200" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.authors }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="isbn" label="ISBN" width="200" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.isbn13">{{ scope.row.isbn13 }}</div>
          <div v-else-if="scope.row.isbn">{{ scope.row.isbn }}</div>
          <div v-else>暂无资料</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="score"
        align="center"
        label="平均得分"
        width="200"
        sortable
        :sort-method="sortFloat"
      >
        <template slot-scope="scope">
          {{ scope.row.average_rating }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click.native.prevent="deleteRow(scope.row, list)"
          >不感兴趣</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { getList } from '@/api/table'
import { getRecommendBooks } from '@/api/book'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  mounted() {
    const id = this.$store.getters.id
    this.listLoading = true
    getRecommendBooks(id, 15).then(
      response => {
        console.log(response.data)
        this.list = response.data
        this.listLoading = false
      }
    )
  },
  methods: {
    sortFloat(a, b) {
      return parseFloat(a.average_rating) - parseFloat(b.average_rating)
    },
    deleteRow(item, list) {
      const index = list.indexOf(item)
      list.splice(index, 1)
    }
  }
}
</script>
