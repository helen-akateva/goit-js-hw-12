import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const formEl = document.querySelector('form');

formEl.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  const inputQuery = event.currentTarget.elements['search-text'].value.trim();

  if (!inputQuery) {
    iziToast.warning({
      message: 'Please enter a search term!',
    });
    return;
  }
  clearGallery();
  showLoader();

  getImagesByQuery(inputQuery)
    .then(response => {
      const photosArray = response.hits;

      if (photosArray.length === 0) {
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

      createGallery(photosArray);
    })
    .catch(error => {
      console.log(error);
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again!',
      });
    })
    .finally(() => {
      hideLoader();
      formEl.reset();
    });
}
