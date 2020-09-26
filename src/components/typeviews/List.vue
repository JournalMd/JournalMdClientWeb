<template>
  <v-list two-line>
    <v-list-item-group>
      <template v-for="(note, index) in notes">
        <v-list-item :key="'li' + note.id">
          <v-list-item-avatar>
            <v-icon :color="noteTypes.find(sel => sel.id === note.noteTypeId).name | typecolor">
              {{ noteTypes.find(sel => sel.id === note.noteTypeId).name | typeicon }}
            </v-icon>
          </v-list-item-avatar>
            <template>
              <v-list-item-content>
                <v-list-item-title>
                  {{ note.title }}
                  <v-icon :color="note.mood | emoticoncolor">{{ note.mood | emoticonicon }}</v-icon>
                </v-list-item-title>
                <v-list-item-subtitle v-if="!compact" class="ml-4 mt-2">
                  <MarkdownText :text="note.description" />
                  <CategoryList :categories="note.categories" />
                  <TagList :tags="note.tags" />
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-list-item-action-text v-on="on"><v-icon>mdi-dots-vertical</v-icon></v-list-item-action-text>
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
              </v-list-item-action>
            </template>
        </v-list-item>

        <v-divider v-if="index + 1 < notes.length" :key="index"></v-divider>
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Mixins, Prop } from 'vue-property-decorator';
import NoteTypesMixin from '@/mixins/note-types';
import EmoticonsMixin from '@/mixins/emoticons';
import MarkdownText from '@/components/MarkdownText.vue';
import CategoryList from '@/components/CategoryList.vue';
import TagList from '@/components/TagList.vue';

@Component({
  components: { MarkdownText, CategoryList, TagList },
})
export default class List extends Mixins(NoteTypesMixin, EmoticonsMixin) {
  @Prop(Array) notes!: any[];

  @Prop(Array) noteTypes!: any[];

  @Prop(Boolean) compact!: boolean;
}
</script>
