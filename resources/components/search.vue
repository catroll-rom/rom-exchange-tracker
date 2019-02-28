<template>
  <div>
    <v-btn
      icon
      @click="dialog = !dialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog
      :width="600"
      v-model="dialog"
      :persistent="page_loading || searching"
    >
      <v-card disabled>
        <v-toolbar
          dense
          color="primary"
          dark
          flat
        >
          <h3 class="subheading">
            Add item to tracker
          </h3>
          <v-spacer></v-spacer>
          <v-icon
            @click="dialog = false"
          >
            close
          </v-icon>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            v-model="keyword"
            @keyup.enter="search(keyword)"
            solo
            hide-details
            placeholder="Search item"
            append-icon="search"
            :loading="searching"
            :disabled="searching || page_loading"
          ></v-text-field>
        </v-card-text>
        <v-layout
          align-center
          justify-center
          class="results_placeholder text-xs-center"
          v-if="search_initialized"
        >
          <div
            class="my-5"
          >
            <img src="start_searching.gif" alt="" width="300px">
            <h3 class="title my-3">Start Searching!</h3>
            <div>
              Enter a keyword then press <kbd>Enter</kbd>
            </div>
            <div>The search results will be displayed here.</div>
          </div>
        </v-layout>
        <v-layout
          v-else-if="searching"
          class="text-xs-center results_placeholder"
          align-center
          justify-center
        >
          <div
            class="my-5"
          >
            <img src="searching.gif" alt="" width="300px">
            <h3 class="title my-3">Searching. Please wait...</h3>
            <div>
              Here's a video of 
              <a href="https://www.youtube.com/watch?v=PpccpglnNf0" target="_blank">goats yelling like humans</a>
              for you to watch while you wait.
            </div>
            <div>
              I don't know how long this will take.
            </div>
          </div>
        </v-layout>
        <v-layout
          align-center
          justify-center
          class="results_placeholder text-xs-center"
          v-else-if="!has_search_results"
        >
          <div
            class="my-5"
          >
            <img src="no_search_results.gif" alt="" width="300px">
            <h3 class="title my-3">No item found</h3>
            <div>No, "{{ keyword }}" is not an item in ROM.</div>
            <div>
              Or maybe the database is not updated yet 😅
            </div>
          </div>
        </v-layout>
        <div
          v-else
        >
          <v-list
            v-if="has_search_results"
            dense
            subheader
            two-line
          >
            <v-subheader
              class="grey lighten-3"
            >
              {{ search_results.length }} {{ search_results.length === 1 ? 'item' : 'items'}} found
            </v-subheader>
            <div
              v-for="item in search_results"
              :key="item.name"
            >
              <v-divider></v-divider>
              <v-list-tile
                @click="track(item.name)"
                :disabled="page_loading"
              >
                <v-list-tile-avatar
                  tile
                  size="50"
                  color="grey lighten-3"
                >
                  <img :src="item.image" alt="" v-if="item.image">
                  <v-icon
                    v-else
                  >
                    photo
                  </v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content
                  class="pl-2"
                >
                  <v-list-tile-title
                    class="font-weight-bold"
                  >
                    {{ item.name }}
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    <v-card-title
                      class="pa-0"
                    >
                      <img src="/zeny.png" alt="" width="14px" class="mr-1">
                      <div
                        class="primary--text font-weight-bold"
                      >
                        {{ format_currency(item.sea.latest) }}
                      </div>
                    </v-card-title>
                  </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text
                    :title="`Last updated at ${format_date(item.sea.latest_time, 'full')}`"
                  >
                    {{ format_date(item.sea.latest_time, 'fromNow') }}
                  </v-list-tile-action-text>
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
                    >
                      favorite_border
                    </v-icon>
                    <v-icon
                      v-else
                      title="You are tracking this item"
                      color="info"
                    >
                      favorite
                    </v-icon>
                  </div>
                </v-list-tile-action>
              </v-list-tile>
            </div>
            <v-divider></v-divider>
            <div class="caption text-xs-center grey--text">END OF SEARCH RESULTS</div>
          </v-list>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import vx from 'vuex'
import moment from 'moment'
export default {
  data: ()=>({
    dialog: false,
    keyword: '',
  }),
  computed: {
    moment(){
      return moment
    },
    ...vx.mapState(['search_results','tracked_items','current_item']),
    ...vx.mapGetters(['search_initialized','searching','has_search_results','page_loading'])
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
    },
    format_currency(value){
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  watch: {
    dialog(value){
      if(value === true){
        this.keyword = ''
        this.search_init()
      }
    }
  }
}
</script>

<style>
  .results_placeholder{
    min-height: 300px;
  }
</style>
