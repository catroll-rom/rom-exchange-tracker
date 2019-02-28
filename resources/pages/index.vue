<template>
  <tracker></tracker>
</template>

<script>
import vx from 'vuex'
export default {
  computed: {
    ...vx.mapState(['tracked_items'])
  },
  methods: {
    ...vx.mapActions(['update_tracked_items'])
  },
  async mounted(){
    setTimeout(()=>{
      this.update_tracked_items()
    }, 1)
  }
}
</script>

<style>

</style>
