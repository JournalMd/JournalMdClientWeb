<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>
          <v-icon size="32" style="vertical-align: baseline">{{ route.params.type | typeicon }}</v-icon> {{ $t('views.overview') }}
        </h1>
      </v-col>
      <v-col cols="12">
        <BaseCard :title="$t('views.filter')">
          <v-row>
            <v-col cols="6">
              <v-select :items="viewTypes" v-model="selectedViewType" dense :label="$t('fields.viewtype')"></v-select>
            </v-col>
            <v-col cols="6">
              <v-select :items="noteTypes" item-value="name" item-text="title" v-model="currentNodeType" dense
                :label="$t('fields.nodetype')" clearable></v-select>
            </v-col>
          </v-row>
          <v-row>
              <v-col cols="6">
                <v-autocomplete
                  v-model="filterCategories"
                  :items="categories"
                  item-text="title"
                  item-value="id"
                  :label="$t('fields.categories')"
                  multiple
                  chips
                  small-chips
                  dense
                ></v-autocomplete>
              </v-col>
              <v-col cols="6">
                <v-autocomplete
                  v-model="filterTags"
                  :items="tags"
                  item-text="title"
                  item-value="id"
                  :label="$t('fields.tags')"
                  multiple
                  chips
                  small-chips
                  dense
                ></v-autocomplete>
              </v-col>
          </v-row>
          <v-row v-if="selectedViewType === 'graph'">
            <v-col cols="6">
              <v-select :items="graphType" v-model="viewSettings.type" dense :label="$t('fields.graph')"></v-select>
            </v-col>
            <v-col cols="6">
              <v-select :items="fields" v-model="viewSettings.field" dense :label="$t('fields.field')"></v-select>
            </v-col>
          </v-row>
        </BaseCard>
      </v-col>

      <v-col cols="12">
        <TypeViewWrapper
          :viewType="selectedViewType"
          :notes="getNotesByType(currentNodeType)"
          :filterCategories="filterCategories"
          :filterTags="filterTags"
          :viewSettings="viewSettings"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Component, Mixins, Prop, Watch,
} from 'vue-property-decorator';
import { State, Getter, namespace } from 'vuex-class';
import NoteTypesMixin from '@/mixins/note-types';
import TypeViewWrapper from '@/components/typeviews/TypeViewWrapper.vue';
import BaseCard from '@/components/BaseCard.vue';
import VueI18n from '@/plugins/i18n';

const notesModule = namespace('notes');

@Component({
  components: { BaseCard, TypeViewWrapper },
})
export default class Overview extends Mixins(NoteTypesMixin) {
  @Prop(String) type!: string;

  @State route: any; // vuex-router-sync

  currentNodeType: string = '';

  selectedViewType: string = '';

  viewSettings: any = {};

  filterCategories: number[] = [];

  filterTags: number[] = [];

  viewTypes: { value: string, text: string }[] = [
    { value: 'table', text: VueI18n.t('fields.table').toString() },
    { value: 'timeline', text: VueI18n.t('fields.timeline').toString() },
    { value: 'timeline-small', text: VueI18n.t('fields.timelinesmall').toString() },
    { value: 'list', text: VueI18n.t('fields.list').toString() },
    { value: 'card-list', text: VueI18n.t('fields.cardlist').toString() },
    { value: 'graph', text: VueI18n.t('fields.graph').toString() },
  ];

  graphType: { value: string, text: string }[] = [
    { value: 'Bar', text: VueI18n.t('fields.bar').toString() },
    { value: 'Line', text: VueI18n.t('fields.line').toString() },
    { value: 'Pie', text: VueI18n.t('fields.pie').toString() },
  ];

  fields: any = [];

  @notesModule.State noteTypes: any;

  @notesModule.Getter getNotesByType: any;

  @notesModule.State categories: any;

  @notesModule.State tags: any;

  mounted() {
    this.extractData(this.route.query, this.route);
  }

  @Watch('$route')
  onRouteChanged(to: any, from: any) {
    this.extractData(to.query, to);
  }

  @Watch('noteTypes')
  @Watch('currentNodeType')
  onNoteTypesChanged(to: any, from: any) {
    const tmpFields = [];
    tmpFields.push({ value: 'mood', text: VueI18n.t('views.mood') });
    for (let i = 0; i < this.noteTypes.length; i += 1) {
      if ((this.currentNodeType !== 'all' && this.currentNodeType !== undefined) && this.currentNodeType !== this.noteTypes[i].name) {
        // eslint-disable-next-line no-continue
        continue;
      }

      for (let j = 0; j < this.noteTypes[i].noteFields.length; j += 1) {
        tmpFields.push({
          value: this.noteTypes[i].noteFields[j].id,
          text: `${this.noteTypes[i].title} - ${this.noteTypes[i].noteFields[j].title}`,
        });
      }
    }
    this.fields = tmpFields;
  }

  // Extract route like '/types/all?view=graph&viewsettings=%7B%22type%22%3A%22Pie%22%2C%22field%22%3A%22mood%22%7D'
  extractData(query: any, route: any) {
    this.currentNodeType = route.params.type;

    this.selectedViewType = query.view ? query.view : 'table';

    this.viewSettings = query.viewsettings ? JSON.parse(query.viewsettings) : {};

    this.filterCategories = query.categories ? query.categories.split(',').map((sel: string) => +sel) : [];

    this.filterTags = query.tags ? query.tags.split(',').map((sel: string) => +sel) : [];
  }
}
</script>
