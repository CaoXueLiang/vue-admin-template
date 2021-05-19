<template>
  <div class="dashboard-container">
    dashboard详情页面
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
  created() {},
  methods: {}
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
