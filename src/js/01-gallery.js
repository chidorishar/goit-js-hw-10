import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import galleryItemTmpl from './gallery-item.hbs';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const galleryRootEl = document.querySelector('.gallery');

galleryRootEl.innerHTML = galleryItemTmpl({ galleryItems });
var lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});
