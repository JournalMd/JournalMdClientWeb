<template>
  <span v-if="stateTags.length > 0">
    <v-chip v-for="tagId in tags" :key="tagId" class="ma-1" x-small v-text="getName(tagId)" color="secondary"></v-chip>
  </span>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Mixins, Prop } from 'vue-property-decorator';
import { State, namespace } from 'vuex-class';

const notesModule = namespace('notes');

@Component
export default class TagList extends Vue {
  @Prop(Array) tags!: [];

  @notesModule.State('tags') stateTags: any;

  getName(id: number) {
    return this.stateTags.find((sel: any) => +sel.id === +id).title;
  }
}
</script>
