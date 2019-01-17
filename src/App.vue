<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    background: url("../static/images/bg.jpg") no-repeat;
    background-size: 100% 100%;
  }
  #app {
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  /*img {*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*opacity: 0.5;*/
  /*}*/
</style>
