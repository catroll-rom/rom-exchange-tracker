<template>
  <div>
    <v-navigation-drawer
      app
      permanent
      :width="250"
      class="secondary white--text"
    >
      <v-layout
        column
        wrap
        fill-height
      >
        <div
          class="py-5 px-3"
        >
          <v-avatar
            :size="100"
            class="my-3"
            tile
          >
            <img src="/logo.jpg" alt="">
          </v-avatar>
          <h3 class="title">〄ᑕᗩTᖇOᒪᒪ</h3>
          <h3>ROM Exchange Tracker</h3>
        </div>
        <v-spacer></v-spacer>
        <div class="pa-3">
          <v-avatar
            :size="75"
          >
            <img src="/dokuns.jpg" alt="">
          </v-avatar>
          <div class="mb-3 mt-1 caption">Created by ✦Darkness</div>
          <div class="caption">
            Props to 
            <a href="https://romexchange.com" target="_blank">ROM Exchange</a> <br>for their awesome API 👌
          </div>
        </div>
      </v-layout>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .sidebar-active{
    background: var(--v-primary-base);
    border-right: 5px solid var(--v-primary-darken4);
  }
  .sidebar-active:hover{
    background: var(--v-primary-base)!important
  }
</style>
