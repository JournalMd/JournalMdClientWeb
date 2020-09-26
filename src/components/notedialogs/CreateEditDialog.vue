<template>
  <v-dialog v-model="dialog" persistent max-width="1400px">
    <v-card>
      <v-card-title>
        <span class="headline">
          <v-icon size="24" style="vertical-align: baseline" :color="type.name | typecolor">{{ type.name | typeicon }}</v-icon>
          {{ $t(`general.${mode}`) }}
        </span>
      </v-card-title>
      <v-card-text>
        <v-form ref="cuform">
          <v-container>
            <v-row dense>
              <v-col cols="12">
                <v-text-field v-model="note.title" :label="$t('fields.title') + '*'" filled
                  :rules="[rules.required, rules.min3]"></v-text-field>
              </v-col>

              <v-col cols="12" v-if="!type.noteDescriptionShort">
                <vue-easymde v-model="note.description" ref="markdownEditor" :configs="configs" />
              </v-col>

              <v-col cols="12" v-if="type.noteDescriptionShort">
                <v-text-field v-model="note.description" :label="$t('fields.description')" filled></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-label dense>Mood</v-label>
                <EmoticonRating :mood="note.mood" @input="note.mood = $event" filled />
              </v-col>

              <v-col cols="12" md="4">
                <v-menu v-model="datemenu" :close-on-content-click="false"
                        :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="note.tmpDate" label="Date" prepend-icon="mdi-calendar" readonly v-on="on" />
                  </template>
                  <v-date-picker v-model="note.tmpDate" @input="datemenu = false" />
                </v-menu>
              </v-col>

              <v-col cols="12" md="4">
                <v-menu v-model="timemenu" :close-on-content-click="false"
                        :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="note.tmpTime" label="Time" prepend-icon="mdi-clock" readonly v-on="on" />
                  </template>
                  <v-time-picker v-model="note.tmpTime" @input="timemenu = false" format="24hr" />
                </v-menu>
              </v-col>

              <v-col cols="12" md="6">
                <v-autocomplete
                  v-model="note.categories"
                  :items="categories"
                  item-text="title"
                  item-value="id"
                  :label="$t('fields.categories')"
                  multiple
                  chips
                  small-chips
                  outlined
                ></v-autocomplete>
              </v-col>

              <v-col cols="12" md="6">
                <v-autocomplete
                  v-model="note.tags"
                  :items="tags"
                  item-text="title"
                  item-value="id"
                  :label="$t('fields.tags')"
                  multiple
                  chips
                  small-chips
                  outlined
                >
                  <v-icon slot="append-outer" color="green" @click="addTag">mdi-plus</v-icon>
                </v-autocomplete>
              </v-col>

              <v-col cols="12" v-for="field in type.noteFields" :key="field.id">
                <v-text-field v-if="field.type === 'number'" v-model="note.fields[field.id].value"
                  :label="`${field.title}${field.required ? '*' : ''}`"
                  :rules="[rules.number, field.required ? rules.required : true]"
                  filled  />
                <v-checkbox v-if="field.type === 'boolean'" v-model="note.fields[field.id].value"
                  :label="field.title" />
                <v-menu v-if="field.type === 'date' || field.type === 'datetime'" v-model="datefieldmenu"
                  :close-on-content-click="false"
                  :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="note.fields[field.id].value" label="Date" prepend-icon="mdi-calendar" readonly v-on="on" />
                  </template>
                  <v-date-picker v-model="note.fields[field.id].value" @input="datefieldmenu = false" />
                </v-menu>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="darken-1" text @click="dialog = false">{{ $t('general.close') }}</v-btn>
        <v-btn color="green darken-1" text @click="submit" :loading="loading">{{ $t(`general.${mode}`) }}</v-btn>
      </v-card-actions>
    </v-card>

    <AddTagDialog :dialog.sync="dialogAddTag" />
  </v-dialog>
</template>

<style>
  @import "~easymde/dist/easymde.min.css";
</style>

<script lang="ts">
import Vue from 'vue';
import {
  Component, Mixins, Prop, Watch,
} from 'vue-property-decorator';
import { State, Getter, namespace } from 'vuex-class';
import _ from 'lodash';
// eslint-disable-next-line import/extensions
import VueEasymde from 'vue-easymde';
import VueI18n from '@/plugins/i18n';
import NoteTypesMixin from '@/mixins/note-types';
import EmoticonRating from '@/components/EmoticonRating.vue';
import AddTagDialog from './AddTagDialog.vue';

const notesModule = namespace('notes');
const dialogsModule = namespace('dialogs');

@Component({
  components: { EmoticonRating, VueEasymde, AddTagDialog },
})
export default class CreateEditDialog extends Mixins(NoteTypesMixin) {
  dialog: boolean = false;

  dialogAddTag: boolean = false;

  note: any = {};

  type: any = {};

  loading: boolean = false;

  datemenu: boolean = false;

  timemenu: boolean = false;

  datefieldmenu: boolean = false;

  @notesModule.State categories: any;

  @notesModule.State tags: any;

  configs: {} = {
    spellChecker: false, // disable spell check
    uploadImage: false,
    toolbar: ['bold', 'italic', 'strikethrough', 'heading', '|', 'quote', 'unordered-list', 'ordered-list', '|',
      'link', /* 'image', */ '|', 'preview', 'side-by-side', 'fullscreen', '|', 'guide'],
  }

  rules: any = {
    required: (value: any) => !!value || VueI18n.t('validate.required'),
    min3: (value: any) => value.length >= 3 || VueI18n.t('validate.minchars', [3]),
    number: (value: any) => (_.isFinite(_.toNumber(value.replace(',', '.'))) || value === '') || VueI18n.t('validate.num'),
  };

  @notesModule.Getter getTypeById: any;

  get mode() {
    if (this.$store.state.dialogs.editNote !== null) {
      this.note = JSON.parse(JSON.stringify(this.$store.state.dialogs.editNote)); // clone - don't work on store object!
      this.type = this.getTypeById(this.note.noteTypeId);

      [this.note.tmpDate] = (this.note.date).split('T');
      this.note.tmpTime = `${new Date(this.note.date).getHours().toString().padStart(2, '0')}:`
        + `${new Date(this.note.date).getMinutes().toString().padStart(2, '0')}`; // HH:MM
    } else if (this.$store.state.dialogs.createNote !== null) {
      this.type = this.$store.state.dialogs.createNote;

      // create empty fields
      const noteFields = this.type.noteFields.reduce((map: any, field: any) => {
        const newMap = map;
        newMap[field.id] = {
          id: -1,
          fieldId: field.id,
          value: '',
        };
        return newMap;
      }, {});

      this.note = {
        title: '',
        description: '',
        mood: 3,
        noteTypeId: this.$store.state.dialogs.createNote.id,
        fields: noteFields,
        date: new Date(),
        tmpDate: `${new Date().getFullYear().toString()}-`
          + `${new Date().getMonth().toString().padStart(2, '0')}-`
          + `${new Date().getDate().toString().padStart(2, '0')}`, // ISO 8601 date string (YYYY-MM-DD)
        tmpTime: `${new Date().getHours().toString().padStart(2, '0')}:`
          + `${new Date().getMinutes().toString().padStart(2, '0')}`, // HH:MM
      };
    } // else - won't show anyway

    if (this.$refs.cuform != null) {
      const cuForm = this.$refs.cuform; // reset validation in case you came from edit and required fields are now empty
      (cuForm as any).resetValidation(); // super uggly typescript workaround
    }

    this.loading = false;
    this.dialog = this.$store.state.dialogs.editNote !== null || this.$store.state.dialogs.createNote !== null;
    return this.$store.state.dialogs.editNote != null ? 'edit' : 'create';
  }

  @notesModule.Action('createNote') createNoteAction: any;

  @notesModule.Action('editNote') editNoteAction: any;

  @dialogsModule.Action('addMessage') addMessageAction!: any;

  submit() {
    const cuForm = this.$refs.cuform; // super uggly typescript workaround

    // tmp => real value
    this.note.date = new Date(this.note.tmpDate.substr(0, 4), this.note.tmpDate.substr(5, 2), this.note.tmpDate.substr(8, 2),
      this.note.tmpTime.substr(0, 2), this.note.tmpTime.substr(3, 2));

    if (cuForm != null && (cuForm as any).validate()) {
      this.loading = true;
      if (this.$store.state.dialogs.createNote != null) {
        this.createNoteAction(this.note).then(() => {
          this.loading = false;
        });
      } else {
        this.editNoteAction(this.note).then(() => {
          this.loading = false;
        });
      }
    }
  }

  addTag() {
    this.dialogAddTag = true;
  }

  @dialogsModule.Action('createNote') dialogsCreateNoteAction: any;

  @dialogsModule.Action('editNote') dialogsEditNoteAction: any;

  @Watch('dialog')
  onDialogChange(newValue: boolean, oldValue: boolean) {
    if (this.$store.state.dialogs.createNote != null && newValue === false) {
      this.dialogsCreateNoteAction(null); // reset "current" selection to null to allow reopening the dialog
    }
    if (this.$store.state.dialogs.editNote != null && newValue === false) {
      this.dialogsEditNoteAction(null); // reset "current" selection to null to allow reopening the dialog
    }

    // Scroll to dialog top on close. Scroll on open does not work here as the dialog is not "active" yet
    if (newValue === false) {
      const activeDialog = document.getElementsByClassName('v-dialog--active')[0];
      if (activeDialog !== undefined) {
        activeDialog.scrollTop = 0;
      }
    }
  }
}
</script>
