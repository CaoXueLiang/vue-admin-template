<template>
  <div class="dashboard-container">
    <div class="dashboard-text">{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      message: "我是dashboard页面"
    };
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
</style>
