<template>
  <div class="vue-multi-drag-demo">
    <div class="col col-3">
      <ul v-mz-dropzone>
        <li v-mz-drag @dragend="test">ABC 123</li>
        <li v-mz-drag @dragend="test">ABC 345</li>
        <li v-mz-drag @dragend="test">ABC 678</li>
        <li v-mz-drag @dragend="test">ABC 999</li>
        <li v-mz-drag @dragend="test">XYZ 195</li>
      </ul>
    </div>
    <div class="col col-3">
      <ul v-mz-dropzone></ul>
    </div>
    <div class="col col-3">
      <ul v-mz-dropzone></ul>
    </div>
    <div class="col col-3">
      <ul v-mz-dropzone></ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'generator-vue-plugin'
    }
  },
  methods: {
    test(ev) {
      console.log(ev)
    }
  }
}
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
}
.col {
  display: block;
  float: left;
  padding: 5px;
  box-sizing: border-box;
}

.col-4 {
  width: 33.333333%;
}

.col-3 {
  width: 25%;
}

ul {
  list-style: none;
  padding: 10px;
  border: 1px solid #000;
  border-radius: 5px;
  height: 300px;
}

ul li {
  border: 1px solid #22ab78;
  cursor: move;
  transition: all ease-in-out 0.3s;
  padding: 5px;

  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none; /* Firefox all */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* Likely future */
}

ul li + li {
  margin-top: 5px;
}

ul li:hover {
  background-color: #468847;
  color: #fff;
}

[aria-dropeffect="move"] {
  border-width: 3px;
  border-color: #68b;
  background: #fff;
}

[aria-grabbed="true"] {
  border-width: 3px;
  border-color: #f00;
}
</style>
