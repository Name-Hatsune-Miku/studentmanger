<template>
  <div class="dashboard-container">
    <div class="box">
      <div class="gongju">
        <el-button type="primary" @click="showDialog">添加</el-button>
        <el-input placeholder="请输入内容" v-model="searchinp" clearable style="width: 450px;">
        </el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchbut">搜索</el-button>

        <el-dropdown @command="handleSelectTeacher">
          <el-button type="primary">
            选择老师<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in dynamicArray" :key="item.webid" :command="item">{{ item.webname
              }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>


    <el-table :data="tableData" height="700" style="width: 100%;border-top:1px solid gray;">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="sex" :formatter="formatGender" label="性别"></el-table-column>
      <el-table-column prop="idcards" label="身份证" width="360"></el-table-column>
      <el-table-column prop="xueli" label="学历"></el-table-column>
      <el-table-column prop="iphone" label="手机号"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="mark" label="备注"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleView(scope.row)">详情</el-button>
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <!-- <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button> -->
          <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="totalItems" :page-size="pageSize"
      :current-page="currentPage" @current-change="handleCurrentChange">
    </el-pagination>
    <!-- 添加 -->
    <el-dialog :visible.sync="dialogVisible" title="添加学生" width="60%">
      <el-form ref="form" label-width="80px">
        <el-form-item label="姓名：">
          <el-input v-model="names"></el-input>
        </el-form-item>
        <el-form-item label="年龄：">
          <el-input v-model="ages"></el-input>
        </el-form-item>
        <el-form-item label="身份证：">
          <el-input v-model="idcardss"></el-input>
        </el-form-item>
        <el-form-item label="学历：">
          <el-input v-model="xuelis"></el-input>
        </el-form-item>
        <el-form-item label="地址：">
          <el-input v-model="addresss"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="iphones"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="marks"></el-input>
        </el-form-item>
        <el-form-item label="老师：">
          <select v-model="selectedItem" @change="printSelectedValue">
            <option v-for="item in dynamicArray" :value="item">{{ item.webname }}</option>
          </select>
        </el-form-item>


        <div class="form-row">
          <label>性别：</label>
          <input type="radio" name="sex" value="0" v-model="sexs"> 男
          <input type="radio" name="sex" value="1" v-model="sexs"> 女
        </div>



        <el-form-item>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 详情 -->
    <el-dialog :visible.sync="details" title="学生详情" width="90%">
      <el-table :data="[detailData]" style="width: 100%;">
        <el-table-column label="姓名">
          <template slot-scope="scope">
            <span>{{ detailData.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="年龄">
          <template slot-scope="scope">
            <span>{{ detailData.age }}</span>
          </template>
        </el-table-column>

        <el-table-column label="性别">
          <template slot-scope="scope">
            <span>{{ detailData.sex === 0 ? '男' : '女' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="身份证">
          <template slot-scope="scope">
            <span>{{ detailData.idcards }}</span>
          </template>
        </el-table-column>

        <el-table-column label="学历">
          <template slot-scope="scope">
            <span>{{ detailData.xueli }}</span>
          </template>
        </el-table-column>

        <el-table-column label="手机号">
          <template slot-scope="scope">
            <span>{{ detailData.iphone }}</span>
          </template>
        </el-table-column>

        <el-table-column label="地址">
          <template slot-scope="scope">
            <span>{{ detailData.address }}</span>
          </template>
        </el-table-column>

        <el-table-column label="备注">
          <template slot-scope="scope">
            <span>{{ detailData.mark }}</span>
          </template>
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handledetails">确定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog :visible.sync="dialogedit" title="编辑学生" width="60%">
      <el-form ref="form" label-width="80px">
        <el-form-item label="姓名：">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="年龄：">
          <el-input v-model="age"></el-input>
        </el-form-item>
        <el-form-item label="身份证：">
          <el-input v-model="idcards"></el-input>
        </el-form-item>
        <el-form-item label="学历：">
          <el-input v-model="xueli"></el-input>
        </el-form-item>
        <el-form-item label="地址：">
          <el-input v-model="address"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="iphone"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="mark"></el-input>
        </el-form-item>
        <div class="form-row">
          <label>性别：</label>
          <input type="radio" name="sex" value="0" v-model="sex"> 男
          <input type="radio" name="sex" value="1" v-model="sex"> 女
        </div>
        <el-form-item>
          <el-button @click="dialogedit = false">取 消</el-button>
          <el-button type="primary" @click="handledetaedit">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import apisweith from '../api'
export default {
  name: 'index',
  data() {
    return {
      form: {},
      totalItems: 100, // 总条数
      pageSize: 10, // 每页显示条数
      currentPage: 1, // 当前页码

      dynamicArray: [],
      selectedItem: '',

      tableData: [],
      dialogVisible: false,
      details: false,
      dialogedit: false,
      detailData: [],
      name: '',
      age: '',
      sex: '',
      idcards: '',
      xueli: '',
      iphone: '',
      address: '',
      mark: '',
      webname: '',
      names: '',
      ages: '',
      sexs: '',
      idcardss: '',
      xuelis: '',
      iphones: '',
      addresss: '',
      marks: '',
      id: '',
      webidzu: '',
      webnamezu: '',
      searchinp: ''
    };
  },
  mounted() {
    this.getAll()
    this.teacher()
  },
  methods: {
    // 分页
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
      const currentPage = this.currentPage
      console.log(currentPage);
      this.getAll()
    },
    // 搜索
    searchbut() {
      let searchlist = this.searchinp
      console.log(searchlist);
      const storedToken = localStorage.getItem('webid');
      apisweith.search(storedToken, searchlist)
        .then(res => {
          console.log(res.data.data.data);
          this.tableData = res.data.data.data
        })
    },
    // 老师
    teacher() {
      const storedToken = localStorage.getItem('webid');
      apisweith.teacher(storedToken)
        .then(res => {
          console.log(res.data.data.data);
          this.dynamicArray = res.data.data.data
        })
    },
    // 获取老师
    printSelectedValue() {
      this.selectedValue = this.selectedItem;
      this.webidzu = this.selectedValue.webid
      this.webnamezu = this.selectedValue.webname
      console.log(this.webidzu);
      console.log(this.webnamezu);
    },
    // 数据获取
    getAll() {
      const storedToken = localStorage.getItem('webid');
      console.log(storedToken);
      const currentPage = this.currentPage
      apisweith.getAllStudentList(storedToken, currentPage)
        .then(res => {
          console.log(res.data.data.data);
          this.tableData = res.data.data.data
        })
    },
    // 判断男女
    formatGender(row, column, cellValue) {
      return cellValue === 0 ? '男' : '女';
    },
    // 详情
    handleView(row) {
      // 处理查看操作
      console.log(row.name);
      this.details = true
      this.detailData = row
      console.log(this.detailData);
    },
    // 编辑回显
    handleEdit(row) {
      console.log(row);
      this.dialogedit = true
      console.log(row);
      this.name = row.name
      this.age = row.age
      this.sex = row.sex
      this.idcards = row.idcards
      this.xueli = row.xueli
      this.iphone = row.iphone
      this.address = row.address
      this.mark = row.mark
      this.id = row.id
    },
    // 删除
    handleDelete(row) {
      this.$alert('请问您确定要删除该条学生吗？', '删除学生', {
        confirmButtonText: '确定',
        lockScroll: true,
        closeOnClickModal: false,
        callback: action => {
          if (action === 'confirm') {
            apisweith.deleteWxUser(row.id)
              .then(res => {
                console.log(res);
                this.getAll();
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
              })
              .catch(err => {
                console.error(err);
                this.$message({
                  message: '删除过程中出现问题，请重试',
                  type: 'error'
                });
              });
          } else {
            this.$message({
              message: '已取消删除操作',
              type: 'info'
            });
          }
        }
      });
    },
    // 添加弹窗
    showDialog() {
      this.dialogVisible = true;
    },
    // 确认添加
    handleAdd() {
      this.dialogVisible = false;
      if (this.names === '' && this.ages === '' && this.sexs === '' && this.idcardss === '' && this.xuelis === '' && this.iphones === '' && this.address === '') {
        this.$message({
          message: '请填写完整信息',
          type: 'error'
        });
      } else {
        apisweith.addevent({
          name: this.names,
          age: this.ages,
          sex: this.sexs,
          idcards: this.idcardss,
          xueli: this.xuelis,
          iphone: this.iphones,
          address: this.addresss,
          mark: this.marks,
          webid: this.webidzu,
          webname: this.webnamezu
        })
          .then(res => {
            console.log(res);
            this.getAll();
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.names = '';
            this.ages = '';
            this.sexs = '';
            this.idcardss = '';
            this.xuelis = '';
            this.iphones = '';
            this.addresss = '';
            this.marks = '';
          })
      }
    },
    // 详情确认
    handledetails() {
      this.details = false
    },
    // 编辑确定
    handledetaedit() {
      this.dialogedit = false
      console.log(this.id);
      apisweith.editor({
        id: this.id,
        name: this.name,
        age: this.age,
        sex: this.sex,
        idcards: this.idcards,
        xueli: this.xueli,
        iphone: this.iphone,
        address: this.address,
        mark: this.mark,
      })
        .then(res => {
          console.log(res);
          this.getAll();
          this.$message({
            message: '编辑成功',
            type: 'success'
          });
        })
    },
    //筛选老师下的学生
    handleSelectTeacher(selectedItem) {
      this.webidzu = selectedItem.webid;
      console.log(this.webidzu);
      let id = this.webidzu
      this.fetchTeacherList(id);
    },
    fetchTeacherList(id) {
      apisweith.teacherlist(id)
        .then(res => {
          console.log(res.data.data.data, 222);
          this.tableData = res.data.data.data;
        })
    },
  }
};
</script>


<style lang="scss" scoped>
.gongju {
  width: 750px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-row {
  margin-left: 25px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
}

.form-row label {
  margin-right: 5px;
  width: 80px;
}

.form-row input {
  width: 50px;
}


.box {
  width: 100%;
}
</style>
