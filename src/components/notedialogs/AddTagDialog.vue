 <template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-card-title>{{ $t(`general.create`) }} Tag</v-card-title>
      <v-card-text>
        <v-form ref="atform">
          <v-text-field v-model="tag" filled :rules="[rules.min3, rules.required]"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="darken-1" text @click="$emit('update:dialog', false)">{{ $t('general.close') }}</v-btn>
        <v-btn color="green darken-1" text @click="submit" :loading="loading">{{ $t(`general.create`) }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Component, Mixins, Prop, Watch,
} from 'vue-property-decorator';
import { State, Getter, namespace } from 'vuex-class';

const notesModule = namespace('notes');

@Component
export default class AddTagDialog extends Vue {
  @Prop(Boolean) dialog!: boolean;

  loading: boolean = false;

  tag: string = '';

  @notesModule.State tags: any;

  rules: any = {
    required: (value: any) => !!value || 'Required.',
    min3: (value: any) => value.length >= 3 || 'Min 3 characters.',
  };

  @notesModule.Action('createTag') createTagAction: any;

  submit() {
    const atForm = this.$refs.atform; // super uggly typescript workaround
    if (atForm != null && (atForm as any).validate()) {
      console.log('createTag1 ', this.tag);
      this.loading = true;
      this.createTagAction(this.tag).then(() => {
        this.loading = false;
      });
    }
  }
}
</script>
