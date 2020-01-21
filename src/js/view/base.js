export const DOM = {
  searchInput: document.querySelector('.search__field'),
  searchForm: document.querySelector('.search'),
  recipeList: document.querySelector('.results__list'),
  recipeControl: document.querySelector('.results__pages'),
  recipe: document.querySelector('.recipe'),
  shoppingList: document.querySelector('.shopping__list'),
  likesList: document.querySelector('.likes__list'),
  likesField: document.querySelector('.likes__field'),
};

export const renderLoader = hook => {
  const loader = document.createElement('div');
  loader.className = 'loader'
  loader.innerHTML =
  `<svg>
    <use href="img/icons.svg#icon-cw"></use>
  </svg>`;
  hook.prepend(loader);
}

export const hideLoader = hook => {
  hook.querySelector('.loader').remove();
}
