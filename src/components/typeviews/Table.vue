<template>
  <v-card>
    <v-card-title v-if="!compact">
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details />
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="notes"
      :items-per-page="10"
      :search="search"
      class="elevation-1"
      :hide-default-header="compact"
      :hide-default-footer="compact"
    >
      <template v-slot:item.noteTypeId="{ item }">
        <v-chip :color="noteTypes.find(sel => sel.id === item.noteTypeId).name | typecolor">
          <v-icon color="white">{{ noteTypes.find(sel => sel.id === item.noteTypeId).name | typeicon }}</v-icon>
        </v-chip>
      </template>
      <template v-slot:item.mood="{ item }">
        <v-icon :color="item.mood | emoticoncolor">{{ item.mood | emoticonicon }}</v-icon>
      </template>
      <template v-slot:item.date="{ item }">
        {{ $d(item.date, 'long') }}
      </template>
      <template v-slot:item.categories="{ item }">
        <CategoryList :categories="item.categories" />
      </template>
      <template v-slot:item.tags="{ item }">
        <TagList :tags="item.tags" />
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="$emit('edit-note', item)">mdi-pencil</v-icon>
        <v-icon small @click="$emit('delete-note', item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Mixins, Prop } from 'vue-property-decorator';
import _ from 'lodash';
import NoteTypesMixin from '@/mixins/note-types';
import EmoticonsMixin from '@/mixins/emoticons';
import CategoryList from '@/components/CategoryList.vue';
import TagList from '@/components/TagList.vue';

@Component({
  components: { CategoryList, TagList },
})
export default class Table extends Mixins(NoteTypesMixin, EmoticonsMixin) {
  @Prop(Array) notes!: any[];

  @Prop(Boolean) compact!: boolean;

  @Prop(Array) noteTypes!: any;

  @Prop(Array) categories!: [];

  @Prop(Array) tags!: [];

  search: string = '';

  // TODO: Translate
  get headers() {
    const typeHeader = [
      { text: 'Type', value: 'noteTypeId' },
      { text: 'Title', value: 'title' },
      { text: 'Description', value: 'description' },
      { text: 'Mood', value: 'mood' },
    ];

    const baseHeader = [
      { text: 'Created', value: 'date' },
      { text: 'Categories', value: 'categories', sortable: false },
      { text: 'Tags', value: 'tags', sortable: false },
    ];

    const actionsHeader = [
      { text: this.$t('general.actions'), value: 'action', sortable: false },
    ];

    // If multiple node types are shown then only return the base header without fields
    const noteTypes = this.notes.map(sel => sel.noteTypeId);
    if (noteTypes == null || noteTypes[0] === undefined /* filter tags/cat empty result */ || _.uniq(noteTypes).length > 1) {
      return [...typeHeader, ...baseHeader, ...actionsHeader];
    }

    // Create headers for fields of single note type
    const fieldsHeader = this.noteTypes
      .find((sel: any) => sel.id === noteTypes[0]) // Find the type which maps to the above selected notes[0].noteTypeId
      .noteFields/* .filter((sel: any) => sel.showInViews) */
      .map((sel: any) => ({
        text: sel.title,
        value: `fields.${sel.id}.value`,
      }));

    return [...typeHeader, ...fieldsHeader, ...baseHeader, ...actionsHeader];
  }
}
</script>
