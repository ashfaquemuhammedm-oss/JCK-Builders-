import '../styles.css';
import { mountSite } from './site.js';
import { mountProjects } from './projects.js';
import { mountForm } from './forms.js';
mountProjects(document.querySelector('[data-projects]'));
mountSite();
mountForm(document.querySelector('[data-contact-form]'));
