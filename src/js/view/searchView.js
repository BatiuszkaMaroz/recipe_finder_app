import {
  DOM,
  renderLoader as _renderLoader,
  hideLoader as _hideLoader,
} from './base';

export const getInput = () => DOM.searchInput.value;

export const clearInput = () => (DOM.searchInput.value = '');

export const renderLoader = _renderLoader.bind(this, DOM.recipeList);
export const hideLoader = _hideLoader.bind(this, DOM.recipeList);

//--------------------\/--------------------

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  clearList();

  if (!recipes) return;

  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;
  recipes.slice(start, end).forEach(renderRecipe);

  if (recipes.length > resPerPage) renderButtons(page, recipes, resPerPage);
};

export const clearList = () => {
  DOM.recipeList.innerHTML = '';
  DOM.recipeControl.innerHTML = '';
};

const renderButtons = (page, recipes, resPerPage) => {
  const pages = Math.ceil(recipes.length / resPerPage);
  const buttons = [];

  if (page === 1) {
    buttons.push(createButton(page + 1, 'next'));
    buttons[0].addEventListener(
      'click',
      renderResults.bind(this, recipes, page + 1, resPerPage),
    );
  } else if (page === pages) {
    buttons.push(createButton(page - 1, 'prev'));
    buttons[0].addEventListener(
      'click',
      renderResults.bind(this, recipes, page - 1, resPerPage),
    );
  } else {
    buttons.push(createButton(page + 1, 'next'));
    buttons[0].addEventListener(
      'click',
      renderResults.bind(this, recipes, page + 1, resPerPage),
    );
    buttons.push(createButton(page - 1, 'prev'));
    buttons[1].addEventListener(
      'click',
      renderResults.bind(this, recipes, page - 1, resPerPage),
    );
  }

  buttons.forEach(elm => {
    DOM.recipeControl.insertAdjacentElement('beforeend', elm);
  });
};

const createButton = (page, type) => {
  const button = document.createElement('button');
  button.className = `btn-inline results__btn--${type}`;
  button.innerHTML = `
  <svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${
      type === 'next' ? 'right' : 'left'
    }"></use>
  </svg>
  <span>Page ${page}</span>
  `;
  return button;
};

const renderRecipe = recipe => {
  const newElement = document.createElement('li');
  newElement.innerHTML = `
  <a class="results__link" href="#${recipe.recipe_id}">
    <figure class="results__fig">
      <img src="${recipe.image_url}" alt="Recipe image">
    </figure>
    <div class="results__data">
      <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
      <p class="results__author">${recipe.publisher}</p>
    </div>
  </a>`;
  DOM.recipeList.append(newElement);
};

const limitRecipeTitle = (title, limit = 17) => {
  let shortTitle = [];
  if (title.length <= limit) return title;
  title.split(' ').reduce((pre, cur) => {
    if (pre.length + cur.length < 17) {
      shortTitle.push(cur);
      return pre + cur;
    }
    return pre;
  }, '');
  return shortTitle.join(' ').concat('...');
};

//--------------------/\--------------------
