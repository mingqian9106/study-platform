<template>
  <div class="home">
    <van-search
      v-model="value"
      shape="round"
      placeholder="Search..."
    />
    <van-divider />
    <TopPage :topList="topList" />
    <van-divider />
    <BottomPage ref="bottomRef"/>
  </div>
</template>

<script>
import TopPage from './TopPage.vue'
import BottomPage from './BottomPage.vue'
import debounce from '../utils/debounce'
import axios from 'axios'
export default {
  name: 'HomePage',
  components: {
    TopPage,
    BottomPage
  },
  data() {
    return {
      value:'',
      topList: [],
    }
  },
  mounted() {
    this.getTopInfo()
  },
  methods:{
    changeSearch: debounce(function() {
      if(this.value) {
        axios.get(`https://itunes.apple.com/hk/lookup?id=${this.value}`)
        .then(res => {
          this.$refs.bottomRef.list = res.data
        })
        .catch(()=>{
          this.$refs.bottomRef.list = []
          this.$refs.bottomRef.pages = 0
        })
      } else {
        this.$refs.bottomRef.onLoad()
      }
    }, 1000),
    getTopInfo() {
      axios.get(`https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json`)
      .then(res => {
        this.topList = res.data.feed.entry.map(item => {
          return {
            id: item.id.label,
            title: item['im:name']['label'],
            image: item['im:image'][0]['label'],
            category: item.category.attributes.label,
          }
        })
      })
      .catch(err=>console.log('请求失败',err))
    },
  },
  watch: {
    value() {
      this.changeSearch()
    }
  }
}
</script>

<style scoped>
  .home {
    padding: 0 10px;
  }
</style>
