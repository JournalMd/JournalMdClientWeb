<template>
  <v-timeline dense>
    <v-timeline-item
      v-for="note in notes"
      :key="note.id"
      :icon="noteTypes.find(sel => sel.id === note.noteTypeId).name | typeicon"
      :color="noteTypes.find(sel => sel.id === note.noteTypeId).name | typecolor"
      fill-dot small
    >
      <v-row justify="space-between">
        <v-col cols="6">
          <v-tooltip bottom v-if="note.description">
            <template v-slot:activator="{ on: ttEventActivator }">
              <span v-on="ttEventActivator" v-text="note.title"></span>
            </template>
            <MarkdownText :text="note.description" />
          </v-tooltip>
          <span v-else v-text="note.title"></span>
        </v-col>
        <v-col class="text-right" cols="4" v-text="$d(note.date, 'long')"></v-col>
        <v-col class="text-right flex-nowrap" cols="2">
          <v-icon dark size="18" class="mr-2" :color="note.mood | emoticoncolor">{{ note.mood | emoticonicon }}</v-icon>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn icon x-small dark v-on="on"><v-icon>mdi-dots-vertical</v-icon></v-btn>
            </template>
            <v-list>
              <v-list-item @click="$emit('edit-note', note)">
                <v-list-item-title><v-icon>mdi-pencil</v-icon> {{ $t('general.edit') }}</v-list-item-title>
              </v-list-item>
              <v-list-item @click="$emit('delete-note', note)">
                <v-list-item-title><v-icon>mdi-delete</v-icon> {{ $t('general.delete') }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-timeline-item>
  </v-timeline>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Mixins, Prop } from 'vue-property-decorator';
import NoteTypesMixin from '@/mixins/note-types';
import EmoticonsMixin from '@/mixins/emoticons';
import MarkdownText from '@/components/MarkdownText.vue';

@Component({
  components: { MarkdownText },
})
export default class TimelineSmall extends Mixins(NoteTypesMixin, EmoticonsMixin) {
  @Prop(Array) notes!: any[];

  @Prop(Array) noteTypes!: any[];
}
</script>
