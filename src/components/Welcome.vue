<template>
  <BaseCard
    :title="$t('welcome.title')"
    :subtitle="$t('welcome.subtitle')"
  >
    <MarkdownText :text="$t('welcome.text')" />
  </BaseCard>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Mixins, Prop } from 'vue-property-decorator';
import { State, Getter, namespace } from 'vuex-class';
import BaseCard from '@/components/BaseCard.vue';
import MarkdownText from '@/components/MarkdownText.vue';

@Component({
  components: { BaseCard, MarkdownText },
})
export default class Welcome extends Vue {
}
</script>
