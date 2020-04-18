import Vue from 'vue';
import Component from 'vue-class-component';
import { typecolor, typeicon } from '@/helper/typeConverter';

@Component({
  filters: {
    typeicon: (value: string | null) => typeicon(value),
    typecolor: (value: string | null) => typecolor(value),
  },
})
export default class NoteTypesMixin extends Vue {
}
