import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');

// form.addEventListener('submit', event => {
//     event.preventDefault();
//     const query = input.value.trim();

//     if (!query) {
//       iziToast.warning({
//         message: 'Please enter a search query.',
//       });
//       return;
//     }

//     clearGallery();
//     showLoader();

//     getImagesByQuery(query)
//     try (data => {
//       if (data.hits.length > 0) {
//           createGallery(data.hits);
//           hideLoader();
//       } else {
//         iziToast.error({
//           title: 'Error!',
//           message:
//             'Sorry, there are no images matching your search query. Please try again!',
//         });
//       }
//     })
//     catch(() => {
//       iziToast.error({
//         title: 'Error!',
//         message: 'Failed to load images',
//       });
//     })
// });
