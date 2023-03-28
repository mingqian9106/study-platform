<template>
    <div>
      <h4>Recommend</h4>
      <div class="top">
        <div class="top-list">
          <div class="top-item" v-for="item in topList" :key="item.id">
            <van-image
              width="5rem"
              height="5rem"
              lazy-load
              radius="20"
              :src="item.image"
            />
            <p>{{item.title}}</p>
            <p>{{item.category}}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TopPage',
    props:['topList'],
  }
  </script>
  
  <style scoped>
    .top {
      width: 100%;
      overflow-x: auto;
      padding: 10px 0;
    }
    .top-list {
      width: 60rem;
    }
    .top-item {
      width: 5rem;
      display: inline-block;
      text-align: center;
      margin-right: 1rem;
    }
    .top-item p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  </style>
  