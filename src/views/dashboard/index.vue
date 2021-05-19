<template>
  <div class="dashboard-container">
    <div class="dashboard-text">{{ message }}</div>
    <div class="normalTitle">1、getWithJson请求</div>
    <div>{{ requestData }}</div>
    <div class="normalTitle">2、postWithJson请求</div>
    <div>{{ postData }}</div>
    <div class="normalTitle">3、form请求</div>
    <div>{{ monitorData }}</div>
    <div class="normalTitle">4、formData上传图片</div>
    <el-upload
      action
      class="avatar-uploader"
      :show-file-list="false"
      :http-request="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <img :src="imageUrl" />
  </div>
</template>

<script>
import {
  getFileList,
  getCameraPhotos,
  getMonitorsData,
  uploadImage
} from '../../api/dashboard';
export default {
  name: 'Dashboard',
  data() {
    return {
      message: '我是dashboard页面',
      requestData: '',
      postData: '',
      monitorData: '',
      imageUrl: ''
    };
  },
  created() {
    this.getTotalfile();
    this.getTotalPhotos();
    this.getTotalMonitor();
  },
  methods: {
    async getTotalfile() {
      let paragram = {
        projectId: 1,
        catchDate: ''
      };
      let result = await getFileList(paragram);
      this.requestData = JSON.stringify(result.data.result);
    },

    async getTotalPhotos() {
      let tmpData = {
        pageSize: '1000',
        pageNo: '1',
        sysFlag: '5G',
        projectId: 1
      };
      let result = await getCameraPhotos(tmpData);
      this.postData = JSON.stringify(result.data.result);
    },

    async getTotalMonitor() {
      let paragram = {
        roleId: '4cd32551a5bc4f978d65347c89f1862e',
        projectId: 7
      };
      let result = await getMonitorsData(paragram);
      this.monitorData = JSON.stringify(result.data.result);
    },

    async uploadAvator(file) {
      let formData = new FormData();
      formData.append('batchFile', file);
      formData.append('postfix', '.png');
      formData.append('mainId', 'ceshi');
      formData.append('projectId', 7);
      let result = await uploadImage(formData);
      this.imageUrl = result.data.result;
    },

    beforeAvatarUpload(file) {
      this.uploadAvator(file.file);
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.normalTitle {
  color: #000;
  font-size: 20px;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 20px;
}

::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
