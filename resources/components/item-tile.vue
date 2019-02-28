<template>
  <div>
    <v-card-text>
      <v-card-title
        class="pa-0"
        style="align-items: flex-start"
      >
        <v-avatar
          color="grey lighten-3"
          tile
          :size="100"
          class="mb-3"
        >
          <img :src="item.image" alt="" v-if="item.image">
          <v-icon v-else>photo</v-icon>
        </v-avatar>
        <v-spacer></v-spacer>
        <v-progress-circular
          indeterminate
          :size="15"
          :width="2"
          v-if="item.name === current_item"
        ></v-progress-circular>
        <div
          v-else
        >
          <v-icon
            v-if="tracked_items.indexOf(item.name) === -1"
            title="You are not tracking this item. Click to track this item."
            @click="track(item.name)"
          >
            favorite_border
          </v-icon>
          <v-icon
            v-else
            title="You are tracking this item"
            color="info"
            @click="track(item.name)"
          >
            favorite
          </v-icon>
        </div>
      </v-card-title>
      <div class="subheading font-weight-bold">{{ item.name }}</div>
      <v-card-title
        class="subheading font-weight-bold pa-0 primary--text"
      >
        <div
          v-if="item.sea.latest > item.sea.all.data[item.sea.all.data.length-2].price"
          class="mr-2"
        >
          <v-icon
            color="green"
          >trending_up</v-icon>
        </div>
        <div
          v-else
          class="mr-2"
        >
          <v-icon
            color="red"
          >trending_down</v-icon>
        </div>
        <div>
          {{ format_currency(item.sea.latest) }}
        </div>
        <img src="/zeny.png" alt="" class="ml-1" width="20px">
        <v-icon
          v-if="item.sea.all.data[item.sea.all.data.length-1].snap"
          color="error"
          title="This item has entered the snapping period."
          class="clickable ml-2"
        >
          error
        </v-icon>
      </v-card-title>
      <div class="caption grey--text">as of {{ format_date(item.sea.latest_time, 'full') }}</div>
    </v-card-text>
    <v-list
      subheader
      dense
      two-line
      class="pb-0"
    >
      <v-divider></v-divider>
      <v-subheader
        class="grey lighten-3"
      >
        Price History
      </v-subheader>
      <v-divider></v-divider>
      <div
        v-for="j in limit"
        :key="`TID${item.name}HD${j}`"
      >
        <div
          v-if="item.sea.all.data.length-(j+1) >= 0"
        >
          <v-list-tile>
            <v-list-tile-action>
              <v-list-tile-action-text>
                <div>
                  {{ format_date(item.sea.all.data[item.sea.all.data.length-(j+1)].time,'mini_date') }}
                </div>
                <div>
                  {{ format_date(item.sea.all.data[item.sea.all.data.length-(j+1)].time,'time') }}
                </div>
              </v-list-tile-action-text>
            </v-list-tile-action>
            <v-list-tile-content
              class="ml-3"
            >
              <v-card-title
                class="subheading font-weight-bold pa-0 primary--text"
              >
                <div
                  v-if="item.sea.all.data[item.sea.all.data.length-(j+2)]"
                >
                  <div
                    v-if="item.sea.all.data[item.sea.all.data.length-(j+1)].price > item.sea.all.data[item.sea.all.data.length-(j+2)].price"
                    class="mr-2"
                  >
                    <v-icon
                      color="green"
                    >trending_up</v-icon>
                  </div>
                  <div
                    v-else
                    class="mr-2"
                  >
                    <v-icon
                      color="red"
                    >trending_down</v-icon>
                  </div>
                </div>
                <div v-else
                  class="mr-2"
                >
                  <v-icon
                    color="grey"
                  >trending_flat</v-icon>
                </div>
                <div>
                  {{ format_currency(item.sea.all.data[item.sea.all.data.length-(j+1)].price) }}
                </div>
                <img src="/zeny.png" alt="" class="ml-1" width="20px">
              </v-card-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon
                v-if="item.sea.all.data[item.sea.all.data.length-(j+1)].snap"
                color="error"
                title="This item has entered the snapping period."
                class="clickable"
              >
                error
              </v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider></v-divider>
        </div>
      </div>
    </v-list>
  </div>
</template>

<script>
import vx from 'vuex'
import moment from 'moment'
export default {
  props: ['item', 'limit'],
  computed: {
    moment(){
      return moment
    },
    ...vx.mapState(['tracked_items','current_item']),
    ...vx.mapGetters(['page_loading'])
  },
  methods: {
    ...vx.mapActions(['track']),
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
  }
}
</script>

<style>
  .clickable{
    cursor: pointer;
  }
</style>
