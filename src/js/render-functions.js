import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryListEl = document.querySelector(`.gallery`);
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captions: true,
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
            <div class="card">
          <ul class="card-list">
            <li class="card-item">Likes<p class="text">${likes}</p></li>
            <li class="card-item">Views <p class="text">${views}</p></li>
            <li class="card-item">Comments <p class="text">${comments}</p> </li>
            <li class="card-item">Downloads <p class="text">${downloads}</p></li>
          </ul>
        </div>
          </a>
        </li>`;
      }
    )
    .join('');

  galleryListEl.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
}

export function clearGallery() {
  galleryListEl.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
}
