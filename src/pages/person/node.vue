<template>
  <div class="boxConntent1 flex-c">
    <div class="n-box">
      <set-node></set-node>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.n-box {
  width: 100%;padding: 0 10%;
}
</style>

<script>
import setNode from '@c/setNode/index'
export default {
  name: 'node',
  data () {
    return {

    }
  },
  components: {setNode},
  mounted () {

  },
  methods: {
    
  }
}
</script>