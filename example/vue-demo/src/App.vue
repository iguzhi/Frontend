<template>
  <div id="app">
    <h1>{{msg}}</h1>
    <img src="./img/WechatIMG176.png" />
    <input type="text" v-model="msg" />
  </div>
</template>

<script>
import getData from './util';

export default {
  name: 'app',
  data() {
    return {
      msg: 'Welcome to Your Vue.js'
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const data = await getData();
      this.msg = data;
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: "Avenir", Arial, Helvetica, sans-serif;

  h1 {
    color: green;
  }
}
</style>