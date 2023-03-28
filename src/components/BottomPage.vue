<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error.sync="error"
    :error-text="errorText"
    @load="onLoad"
  >
    <van-cell v-for="(item,index) in list" :key="item.id">
      <div class="list">
        <div class="first">
          <span>{{index + 1}}</span>
          <van-image
            width="4rem"
            height="4rem"
            lazy-load
            :radius="index % 2 ? 50 : 20"
            :src="item.image"
          />
        </div>
        <div class="last">
          <p>{{item.title}}</p>
          <p>{{item.category}}</p>
          <p>
            <van-rate
              v-model="value"
              :size="15"
              allow-half
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
          </p>
        </div>
      </div>
    </van-cell>
  </van-list>
</template>

<script>
import axios from 'axios'
export default {
  name: 'BottomPage',
  data() {
    return {
      value: 4.5,
      list: [],
      loading: false,
      finished: false,
      error: false,
      errorText: '请求失败，点击重新加载',
      pages: 10
    }
  },
  methods:{
    onLoad() {
      this.pages += 10
      axios.post(`https://itunes.apple.com/hk/rss/topfreeapplications/limit=${this.pages}/json`)
      .then(res => {
        this.loading = false
        this.error = false
        this.errorText = ''
        if(res.data.feed.entry.length > 0) {
          this.list = res.data.feed.entry.map(item => {
            return {
              id: item.id.label,
              title: item['im:name']['label'],
              image: item['im:image'][0]['label'],
              category: item.category.attributes.label,
            }
          })
        }
        if (this.list.length === 100) {
          this.finished = true
          return
        }
      })
      .catch(()=>{
        this.error = true
        this.errorText = '请求失败，点击重新加载'
      })
    },
  },
  updated() {
    if (!(this.list.length && this.pages)) {
      this.error = true
      this.errorText = '无数据'
    }
  }
}
</script>

<style scoped>
  .list {
    display: flex;
  }
  .first {
    display: flex;
    align-items: center;
    margin-right: 1rem;
  }
  .first span {
    margin-right: 5px;
  }
  .last p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 15rem;
  }
</style>
