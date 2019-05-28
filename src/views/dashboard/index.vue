<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text" align="center">Welcome! User {{ id }}</div> -->
    <el-table
      v-loading="listLoading"
      :data="list"
      height="750"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
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
        label="我的评分"
        width="200"
        sortable
        :sort-method="sortFloat"
      >
        <template slot-scope="scope">
          {{ scope.row.my_rating }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { getList } from '@/api/table'
import { getUserBooks } from '@/api/book'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
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
  computed: {
    ...mapGetters([
      'id'
    ])
  },
  mounted() {
    const id = this.$store.getters.id
    this.listLoading = true
    getUserBooks(id).then(
      response => {
        console.log(response.data)
        this.list = response.data
        this.listLoading = false
      }
    )
  },
  methods: {
    sortFloat(a, b) {
      return parseInt(a.my_rating) - parseInt(b.my_rating)
    }
  }
}
</script>
