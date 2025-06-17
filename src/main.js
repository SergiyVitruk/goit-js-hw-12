import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  lmBtn,
} from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
let query = '';
let page = 1;

form.addEventListener('submit', onSearch);
lmBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  query = event.currentTarget.elements['search-text'].value.trim();
  page = 1;

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query.',
    });
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'Error!',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    }

    createGallery(data.hits);

    if (data.totalHits > 15) showLoadMoreButton();
  } catch (error) {
    iziToast.error({
      title: 'Error!',
      message: 'Failed to load images',
    });
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  page += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    if (page * 15 >= data.totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }

    smoothScroll();
  } catch (error) {
    iziToast.error({ message: 'Loading error' });
  } finally {
    hideLoader();
  }
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
