import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getImages } from "./JS/axios";

const refs = {
    formEl: document.querySelector('.search-form'),
    divEl: document.querySelector('.gallery'),
    btnEl: document.querySelector('.load-more'),

}

let page = 1;
let query = '';
const perPage = 40;
const totalImages = 500;
const maxPage = Math.ceil(totalImages / perPage);

refs.formEl.addEventListener('submit', onFormSubmit)
refs.btnEl.addEventListener('click', onBtnClick)

async function onFormSubmit(e) {
    e.preventDefault();
    query = e.target.elements.searchQuery.value;

    getImages(query, page)
        .then(data => {
            renderPage(data)
        })
        .catch(error => alert(`Sorry`))

};

function onBtnClick(e) {
    page += 1;

    getImages(query, page)
        .then(data => {
            if (maxPage === page) {
                alert ('It is all')
            } else {
               renderPage(data) 
            }; 
        })
        .catch(error => alert(`Sorry`))
}

// function createMarkup() {
    
// }

function imageTemplate(images) {
    return images
        .map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
            return `
            <div class="photo-card">
              <a href = "${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
              </a>
              <div class="info">
                <p class="info-item">
                   <b>Likes</b>
                   ${likes}
                </p>
                <p class="info-item">
                   <b>Views</b>
                   ${views}
                </p>
                <p class="info-item">
                   <b>Comments</b>
                   ${comments}
                </p>
                <p class="info-item">
                   <b>Downloads</b>
                   ${downloads}
                </p>
               </div>
            </div>
            `
        }).join('')
    
}

function renderPage(images) {
    const markup = imageTemplate(images)
    refs.divEl.insertAdjacentHTML ('beforeend', markup);
}




// getImages("cat", 1).then(console.log).catch(error => alert(`Sorry`))










{/* <div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div> */}