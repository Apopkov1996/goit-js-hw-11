import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getImages} from "./JS/Images-API";


const refs = {
    formEl: document.querySelector('.search-form'),
    divEl: document.querySelector('.gallery'),
    btnEl: document.querySelector('.load-more'),

}

let lightbox = new SimpleLightbox('.link-photo', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

let page = 1;
let query = '';
let maxPage = null;
const perPage = 40;

refs.formEl.addEventListener('submit', onFormSubmit)
refs.btnEl.addEventListener('click', onBtnClick)

async function onFormSubmit(e) {
  e.preventDefault();
  page = 1;
  refs.divEl.innerHTML = ''
  refs.btnEl.classList.add('is-hidden');
  query = e.target.elements.searchQuery.value.trim();

  if (query === '') {
    refs.formEl.reset()
    return Notiflix.Notify.failure('Please, fill the search field!');
  }

  try {
    const data = await getImages(query, page);
    renderPage(data.hits);
    lightbox.refresh();

    maxPage = Math.ceil(data.totalHits / perPage)

    if (data.hits.length === 0) {
      refs.formEl.reset()
      Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.')
      return
    };

    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
    
    if (maxPage === page) {
      Notiflix.Notify.info('We are sorry, but you have reached the end of search results.')
      refs.btnEl.classList.add('is-hidden');
      return;
    }

    refs.btnEl.classList.remove('is-hidden');
    refs.formEl.reset()
     
  } catch (error) {
  console.log(error); 
  }
    // getImages(query, page)
    //     .then(data => {
    //         renderPage(data)
    //     })
    //     .catch(error => alert(`Sorry`))

};

async function onBtnClick(e) {
  page += 1;

  try {
    const data = await getImages(query, page);
    maxPage = Math.ceil(data.totalHits / perPage);
    
    if (maxPage === page) {
      refs.btnEl.classList.add('is-hidden');
      Notiflix.Notify.info('We are sorry, but you have reached the end of search results.')
    }
    renderPage(data.hits);
    lightbox.refresh();
     
  } catch (error) {
    console.log(error); 
  }
    // getImages(query, page)
    //     .then(data => {
    //         if (maxPage === page) {
    //             alert ('It is all')
    //         } else {
    //            renderPage(data) 
    //         };  
    //     })
    //     .catch(error => alert(`Sorry`))
}


function imageTemplate(images) {
    return images
        .map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
            return `
            <div class="photo-card">
              <a class = "link-photo" href = "${largeImageURL}">
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














