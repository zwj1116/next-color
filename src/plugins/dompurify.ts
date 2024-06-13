import VueDOMPurifyHTML from 'vue-dompurify-html';
import { App } from 'vue';

export default function setupDompurify(app: App<Element>) {
  app.use(VueDOMPurifyHTML);
}
