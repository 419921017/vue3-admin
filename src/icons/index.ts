import { App } from 'vue';
import SvgIcon from '@/components/SvgIcon_backup/index.vue';

export const modules = import.meta.globEager('./svg/*.svg');
 
export default (app: App) => {
  app.component('svg-icon', SvgIcon);
};
