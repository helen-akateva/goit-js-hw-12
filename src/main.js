import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const formEl = document.querySelector('form');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
const perPage = 15;
let inputQuery = null;

formEl.addEventListener('submit', handleFormSubmit);
loadMoreBtn.addEventListener('click', handleClick);

async function handleFormSubmit(event) {
  event.preventDefault();
  page = 1;
  hideLoadMoreButton();
  clearGallery();
  showLoader();

  inputQuery = event.currentTarget.elements['search-text'].value.trim();

  if (!inputQuery) {
    iziToast.warning({
      message: 'Please enter a search term!',
      position: 'topRight',
      messageColor: '#fff',
      backgroundColor: '#ef4040',
      icon: '',
    });
    return;
  }

  try {
    const res = await getImagesByQuery(inputQuery, page);

    if (res.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        icon: '',
      });
      return;
    }

    createGallery(res.hits);
    scrollPage();

    if (res.totalHits > perPage) {
      showLoadMoreButton();
    }
  } catch (error) {
    console.log(error);
    iziToast.error({
      position: 'topRight',
      message: 'Something went wrong. Please try again!',
      messageColor: '#fff',
      backgroundColor: '#ef4040',
      icon: '',
    });
  } finally {
    hideLoader();
    formEl.reset();
  }
}

async function handleClick() {
  showLoader();
  page += 1;

  try {
    const res = await getImagesByQuery(inputQuery, page);
    createGallery(res.hits);
    scrollPage();

    const lastPage = Math.ceil(res.totalHits / perPage);

    if (page === lastPage) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: '#fff',
        backgroundColor: ' #59a10d',
        position: 'bottomRight',
        icon: '',
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
}

function scrollPage() {
  const galleryItem = document.querySelector('.gallery-item');
  if (galleryItem) {
    const itemHeight = galleryItem.getBoundingClientRect().height;
    window.scrollBy({
      top: itemHeight * 2,
      behavior: 'smooth',
    });
  }
}
