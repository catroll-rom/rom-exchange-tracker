<template>
  <v-layout>
    <v-layout
      v-if="page_loading"
      align-center
      justify-center
    >
      <v-progress-circular
        indeterminate
        :size="75"
        :width="10"
        color="grey"
      ></v-progress-circular>
    </v-layout>
    <v-layout
      align-center
      justify-center
      class="results_placeholder text-xs-center"
      v-else-if="!has_tracked_items"
    >
      <div
        class="my-5"
      >
        <h3 class="title mb-2">You don't have any tracked items</h3>
        <div>
          Add an item to track by clicking the <v-icon>add</v-icon> icon on the upper right corner.
        </div>
        <div>Well, what are you waiting for? Start adding items to track now.</div>
        <img src="no_tracked_items.gif" alt="" width="300px" class="mt-3">
      </div>
    </v-layout>
    <v-layout
      row wrap
      v-else
    >
      <v-flex
        xs12 sm4
        v-for="(item, i) in data"
        :key="`TID${i}`"
      >
        <v-card>
          <item-tile
            :item="item"
            :limit="3"
          ></item-tile>
          <v-btn
            color="info"
            block
            class="mt-0"
            @click="view_full_history(item)"
          >
            View full history
          </v-btn>
        </v-card>
      </v-flex>
      <v-navigation-drawer
        v-model="drawer"
        fixed
        temporary
        right
        :width="350"
      >
        <v-toolbar
          dense
          flat
          color="primary"
          dark
        >
          <v-spacer></v-spacer>
          <v-btn
            @click="drawer = false"
            icon
            flat
            style="margin-right: -15px"
          >
            <v-icon
            >close</v-icon>
          </v-btn>
        </v-toolbar>
        <div
          v-if="current_item "
        >
          <item-tile
            :item="current_item"
            :limit="current_item.sea.all.data.length"
          ></item-tile>
        </div>
      </v-navigation-drawer>
    </v-layout>
  </v-layout>
</template>

<script>
import vx from 'vuex'
import moment from 'moment'
export default {
  data: ()=>({
    drawer: false,
    current_item: null,
  }),
  computed: {
    moment(){
      return moment
    },
    ...vx.mapState(['data']),
    ...vx.mapGetters(['page_loading','has_tracked_items'])
  },
  methods: {
    ...vx.mapMutations(['SET']),
    ...vx.mapActions(['search_init','search','update_tracked_items','track']),
    format_date(date, format){
      if(format === 'fromNow'){
        return this.moment(date).fromNow()
      }
      else if(format === 'full'){
        return this.moment(date).format('MMMM DD, YYYY (h:MM A)')
      }
      else if(format === 'mini_date'){
        return this.moment(date).format('MMM DD')
      }
      else if(format === 'time'){
        return this.moment(date).format('h:MM A')
      }
    },
    format_currency(value){
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    view_full_history(item){
      this.current_item = item
      this.drawer = true
    }
  },
}
</script>

<style>

</style>
