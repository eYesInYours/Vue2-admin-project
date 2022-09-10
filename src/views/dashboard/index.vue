<template>
  <div class="dashboard-container">
    <card></card>
    <sale></sale>
    <Observe></Observe>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import card from './card'
import sale from './sale'
import Observe from './Observe'
export default {
  name: 'Dashboard',
  components:{card, sale, Observe},
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
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
