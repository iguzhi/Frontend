import Vue from 'vue';
import { getData } from './util';
import './style/common.less';

const app = new Vue({
  el: '#app',
  data: {
    message: 'hello vue!'
  },
  methods: {
    async fetchData() {
      const data = await getData();
      this.message = data;
    }
  },
  created() {
    this.fetchData();
  }
});