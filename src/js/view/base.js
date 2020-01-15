export const DOM = {
  searchInput: document.querySelector('.search__field'),
  searchForm: document.querySelector('.search'),
  recipeList: document.querySelector('.results__list'),
  recipeControl: document.querySelector('.results__pages'),
  recipe: document.querySelector('.recipe'),
};

export const renderLoader = () => {
  const loader = document.createElement('div');
  loader.className = 'loader'
  loader.innerHTML =
  `<svg>
    <use href="img/icons.svg#icon-cw"></use>
  </svg>`;
  DOM.recipeList.prepend(loader);
}

export const hideLoader = () => {
  DOM.recipeList.querySelector('.loader').remove();
}
