import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.amber, // a color that is not in the material colors palette
    accent: colors.grey.lighten5,
    secondary: colors.grey.darken4,
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3
  },
  options: {
    customProperties: true
  }
})
