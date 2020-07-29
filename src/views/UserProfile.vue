<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>{{ $t('views.profile') }}</h1>
      </v-col>
    </v-row>

    <v-row v-if="editUser != null">
      <v-col cols="12">
        <BaseCard>
          <v-container>
            <v-form ref="upform">
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field :label="$t('fields.firstname')" v-model="editUser.firstName" autocomplete="fname" />
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field :label="$t('fields.lastname')" v-model="editUser.lastName" autocomplete="lname" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-menu v-model="datemenu" :close-on-content-click="false" :nudge-right="40"
                          transition="scale-transition" offset-y min-width="290px">
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model="editUser.dateOfBirth" :label="$t('fields.dateofbirth')" readonly v-on="on" />
                    </template>
                    <v-date-picker v-model="editUser.dateOfBirth" @input="datemenu = false"></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-select :items="gender" v-model="editUser.gender" :label="$t('fields.gender')"></v-select>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <template v-slot:actions>
            <v-card-actions>
              <v-spacer />
              <v-btn color="green darken-1" text @click="saveUserProfile()" :loading="loading">{{ $t('general.save') }}</v-btn>
            </v-card-actions>
          </template>
        </BaseCard>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <BaseCard>
          <v-container>
            <v-form ref="pwform">
              <v-row>
                <v-col cols="12">
                  <v-text-field name="username" v-model="editUser.email" v-show="false" v-if="editUser != null" autocomplete="username" />
                  <v-text-field :label="$t('fields.password')" type="password" v-model="oldPassword" required autocomplete="password"
                    :rules="[rules.required]" />
                </v-col>
                <v-col cols="12">
                  <v-text-field :label="$t('fields.newpassword')" type="password" v-model="newPassword"
                    required autocomplete="new-password" :rules="[rules.required]" />
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <template v-slot:actions>
            <v-card-actions>
              <v-spacer />
              <v-btn color="green darken-1" text @click="savePassword()" :loading="loading">{{ $t('general.save') }}</v-btn>
            </v-card-actions>
          </template>
        </BaseCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { State, namespace } from 'vuex-class';
import VueI18n from '@/plugins/i18n';
import BaseCard from '@/components/BaseCard.vue';
import { User } from '@/models/user';

const userModule = namespace('user');
const dialogsModule = namespace('dialogs');

@Component({
  components: { BaseCard },
})
export default class UserProfile extends Vue {
  editUser: User | null = null;

  loading: boolean = false;

  datemenu: boolean = false;

  gender: { value: string, text: string }[] = [
    { value: 'm', text: VueI18n.t('fields.male').toString() },
    { value: 'f', text: VueI18n.t('fields.female').toString() },
  ];

  oldPassword: string = '';

  newPassword: string = '';

  @userModule.State user!: User;

  @userModule.Action('editUser') editUserAction: any;

  @userModule.Action('changePassword') changePasswordAction: any;

  @dialogsModule.Action('addMessage') addMessageAction!: any;

  rules: any = {
    required: (value: any) => !!value || VueI18n.t('validate.required'),
  };

  mounted() {
    this.onUserChange(); // Ensure data on create
  }

  @Watch('user') // Ensure data on reload
  onUserChange() {
    this.editUser = this.user;
  }

  saveUserProfile() {
    const upForm = this.$refs.upform; // super uggly typescript workaround

    if (upForm != null && (upForm as any).validate()) {
      this.loading = true;
      this.editUserAction(this.editUser).then(() => {
        this.loading = false;
      });
    }
  }

  savePassword() {
    const pwForm = this.$refs.pwform; // super uggly typescript workaround

    if (pwForm != null && (pwForm as any).validate()) {
      this.loading = true;
      this.changePasswordAction({ // TODO strongly type
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
      }).then(() => {
        this.loading = false;
      });
    }
  }
}
</script>
