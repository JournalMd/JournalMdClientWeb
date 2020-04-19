<template>
  <BaseCard v-if="noteTypes.length > 0 && notes.length > 0">
    <Table v-if="viewType === 'table'" v-bind="$props" :notes="filteredNotes" :noteTypes="noteTypes"
      :categories="categories" :tags="tags" @edit-note="onEdit" @delete-note="onDelete" />
    <Timeline v-else-if="viewType === 'timeline'" v-bind="$props" :notes="filteredNotes" :noteTypes="noteTypes"
      :categories="categories" :tags="tags" @edit-note="onEdit" @delete-note="onDelete" />
    <TimelineSmall v-else-if="viewType === 'timeline-small'" v-bind="$props" :notes="filteredNotes" :noteTypes="noteTypes"
      :categories="categories" :tags="tags" @edit="onEdit" @delete-note="onDelete" />
    <List v-else-if="viewType === 'list'" v-bind="$props" :notes="filteredNotes" :noteTypes="noteTypes"
      :categories="categories" :tags="tags" @edit-note="onEdit" @delete-note="onDelete" />
    <CardList v-else-if="viewType === 'card-list'" v-bind="$props" :notes="filteredNotes" :noteTypes="noteTypes"
      :categories="categories" :tags="tags" @edit-note="onEdit" @delete-note="onDelete" />
    <Graph v-else-if="viewType === 'graph'" v-bind="$props" :notes="filteredNotes" :noteTypes="noteTypes"
      :categories="categories" :tags="tags" @edit-note="onEdit" @delete-note="onDelete" />
    <div v-else>-</div>
  </BaseCard>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Mixins, Prop } from 'vue-property-decorator';
import { State, Getter, namespace } from 'vuex-class';
// import orderBy from 'lodash/orderBy';
import _ from 'lodash';
import NoteTypesMixin from '@/mixins/note-types';
import BaseCard from '@/components/BaseCard.vue';
import Table from './Table.vue';
import Timeline from './Timeline.vue';
import TimelineSmall from './TimelineSmall.vue';
import List from './List.vue';
import CardList from './CardList.vue';
import Graph from './Graph.vue';

const notesModule = namespace('notes');
const dialogsModule = namespace('dialogs');

// Template options:
// notes, compact

@Component({
  components: {
    BaseCard,
    Table,
    Timeline,
    TimelineSmall,
    List,
    CardList,
    Graph,
  },
})
export default class TypeViewWrapper extends Mixins(NoteTypesMixin) {
  @Prop(String) title!: string;

  @Prop(String) viewType!: string;

  @Prop(Object) viewSettings!: {};

  @Prop(Array) notes!: any[];

  @Prop(Boolean) compact!: boolean;

  @Prop(Number) maxItems!: number;

  @Prop(Array) filterTypes!: number[];

  @Prop(Array) filterCategories!: number[];

  @Prop(Array) filterTags!: number[];

  @notesModule.State noteTypes: any;

  @notesModule.State categories: any;

  @notesModule.State tags: any;

  @notesModule.Getter getNotesByType: any;

  get filteredNotes() {
    // return orderBy(this.notes, 'date', 'desc');
    let filter = _(this.notes);

    if (this.filterTypes != null && this.filterTypes.length > 0) {
      // find noteTypeId in filterTypes array
      filter = filter.filter(sel => this.filterTypes.indexOf(sel.noteTypeId) !== -1);
    }

    if (this.filterCategories != null && this.filterCategories.length > 0) {
      // find one matching category id from categories array in filterCategories array
      filter = filter.filter(sel => sel.categories
        .some((categoryId: number) => this.filterCategories
          .find(subSel => subSel === categoryId) !== undefined));
    }

    if (this.filterTags != null && this.filterTags.length > 0) {
      // find one matching tag id from tags array in filterTags array
      filter = filter.filter(sel => sel.tags
        .some((tagId: number) => this.filterTags
          .find(subSel => subSel === tagId) !== undefined));
    }

    filter = filter.orderBy(['noteTypeId', 'date'], ['asc', 'desc']); // order before take!

    if (this.maxItems != null) {
      filter = filter.take(this.maxItems);
    }

    return filter.value();
  }

  @dialogsModule.Action('editNote') editNoteAction!: any;

  onEdit(note: any) {
    this.editNoteAction(note);
  }

  @dialogsModule.Action('deleteNote') deleteNoteAction!: any;

  onDelete(note: any) {
    this.deleteNoteAction(note);
  }
}
</script>
