<template>
  <v-app>
    <Navbar v-if="!bootstrapping" />
    <v-content v-if="!bootstrapping">
      <GlobalDialogs ref="globalDialogs" />
      <router-view/>
    </v-content>
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
    this.$vuetify.theme.dark = false;

    EventBus.$on(NAVIGATE, (route: string) => { this.$router.push(route); });
    EventBus.$on(AUTHENTICATED, (authenticated: boolean) => {
      console.log('EventBus.$on(AUTHENTICATED');
      if (authenticated) {
        console.log('EventBus.$on(getUser');
        this.$store.dispatch('user/getUser'); // TODO: handle elsewhere
        this.$store.dispatch('notes/getNoteTypes'); // TODO: handle elsewhere
        this.$store.dispatch('notes/getLabels'); // TODO: handle elsewhere
        this.$store.dispatch('notes/getInspirations'); // TODO: handle elsewhere
        this.$store.dispatch('notes/getNotes'); // TODO: handle elsewhere
      }
    });

    this.$store.dispatch('auth/check').then(() => {
      this.bootstrapping = false;
    });
  }
}
</script>
