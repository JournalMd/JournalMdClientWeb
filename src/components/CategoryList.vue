<template>
  <span v-if="stateCategories.length > 0">
    <v-chip v-for="categoryId in categories" :key="categoryId" class="ma-1" x-small v-text="getName(categoryId)" color="primary"></v-chip>
  </span>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Mixins, Prop } from 'vue-property-decorator';
import { State, namespace } from 'vuex-class';

const notesModule = namespace('notes');

@Component
export default class CategoryList extends Vue {
  @Prop(Array) categories!: [];

  @notesModule.State('categories') stateCategories: any;

  getName(id: number) {
    return this.stateCategories.find((sel: any) => +sel.id === +id).title;
  }
}
</script>
