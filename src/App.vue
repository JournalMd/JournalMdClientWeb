<template>
  <v-app>
    <Navbar v-if="!bootstrapping" />
    <v-main v-if="!bootstrapping">
      <GlobalDialogs ref="globalDialogs" />
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Navbar from '@/components/Navbar.vue';
import GlobalDialogs from '@/components/GlobalDialogs.vue';
import EventBus from '@/helper/eventBus';
import { NAVIGATE, AUTHENTICATED } from '@/helper/event-bus-types';

@Component({
  components: { Navbar, GlobalDialogs },
})
export default class App extends Vue {
  bootstrapping: boolean = true;

  created() {
    // Parse params in order:
    // 1. Use localStorage as the user decided for language and theme already
    // TODO 2. Use user profile from DB
    // 3. Try to find a good value
    // 4. Rely on default
    if (localStorage.getItem('darkTheme')) {
      this.$vuetify.theme.dark = localStorage.getItem('darkTheme') === 'true';
    } else {
      this.$vuetify.theme.dark = false;
    }

    if (localStorage.getItem('locale')) {
      const locale = localStorage.getItem('locale');
      this.$root.$i18n.locale = locale != null ? locale : 'en'; // Typescript wants to have the long version...
    } else if (window.navigator.language.slice(0, 2) === 'de') {
      this.$root.$i18n.locale = 'de';
    }

    EventBus.$on(NAVIGATE, (route: string) => { this.$router.push(route); });
    EventBus.$on(AUTHENTICATED, (authenticated: boolean) => {
      if (authenticated) {
        this.$store.dispatch('user/getUser'); // TODO: handle elsewhere
        this.$store.dispatch('notes/getNoteTypes'); // TODO: handle elsewhere
        this.$store.dispatch('notes/getCategories'); // TODO: handle elsewhere
        this.$store.dispatch('notes/getTags'); // TODO: handle elsewhere
        this.$store.dispatch('notes/getInspirations'); // TODO: handle elsewhere
        this.$store.dispatch('notes/getNotes'); // TODO: handle elsewhere
      }
    });

    // Auth check will call AUTHENTICATED or NAVIGATE to login
    this.$store.dispatch('auth/check').then(() => {
      this.bootstrapping = false;
    });
  }
}
</script>
