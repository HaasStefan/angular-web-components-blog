import { createApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { createCustomElement } from '@angular/elements';

(async () => {
  const app = await createApplication(appConfig).catch((err) =>
    console.error(err)
  );

  if (!app) {
    console.error('Failed to bootstrap application');
    return;
  }

  const contactForm = createCustomElement(AppComponent, {
    injector: app.injector,
  });

  customElements.define('contact-form', contactForm);
})();
