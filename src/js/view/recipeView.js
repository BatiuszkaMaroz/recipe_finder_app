import {
  DOM,
  renderLoader as _renderLoader,
  hideLoader as _hideLoader,
} from './base';

import { Fraction } from 'fractional';

//--------------------\/--------------------

export const renderLoader = _renderLoader.bind(this, DOM.recipe);
export const hideLoader = _hideLoader.bind(this, DOM.recipe);

export const clearRecipe = () => {
  DOM.recipe.innerHTML = '';
}

export const highlight = id => {
  const element = document.querySelector(`a[href="#${id}"]`);
  if(!element) return;

  document.querySelectorAll('.results__link').forEach(elm => {
    elm.classList.remove('results__link--active');
  })

  element.classList.add('results__link--active');
}

export const renderRecipe = (recipe, isLiked) => {
  const markup = `
    <figure class="recipe__fig">
      <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${recipe.title}</span>
      </h1>
    </figure>
    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="img/icons.svg#icon-stopwatch"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
        <span class="recipe__info-text"> minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="img/icons.svg#icon-man"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn-tiny" data-sign="minus">
            <svg>
              <use href="img/icons.svg#icon-circle-with-minus"></use>
            </svg>
          </button>
          <button class="btn-tiny" data-sign="plus">
            <svg>
              <use href="img/icons.svg#icon-circle-with-plus"></use>
            </svg>
          </button>
        </div>
      </div>
      <button class="recipe__love">
        <svg class="header__likes">
          <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <ul class="recipe__ingredient-list">

      </ul>

      <button class="btn-small recipe__btn recipe__btn--add">
        <svg class="search__icon">
          <use href="img/icons.svg#icon-shopping-cart"></use>
        </svg>
        <span>Add to shopping list</span>
      </button>
    </div>

    <div class="recipe__directions">
      <h2 class="heading-2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__by">${recipe.author}</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn-small recipe__btn"
        href="${recipe.source}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-right"></use>
        </svg>
      </a>
    </div>
  `;

  DOM.recipe.insertAdjacentHTML('afterbegin', markup);

  recipeListUpdate(recipe);
};

export const updateServings = recipe => {
  document.querySelector('.recipe__info-data--people').textContent = recipe.servings;
}

export const recipeListUpdate = recipe => {
  document.querySelector('.recipe__ingredient-list').innerHTML = '';

  recipe.ingredients.forEach(elm => {
    const recipeItem = `
          <li class="recipe__item" data-itemid="${elm.id}">
            <svg class="recipe__icon">
              <use href="img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__count">${formatCount(elm.count)}</div>
            <div class="recipe__ingredient">
              <span class="recipe__unit">${elm.unit}</span>
              ${elm.ingredient}
            </div>
          </li>
          `;

    document
      .querySelector('.recipe__ingredient-list')
      .insertAdjacentHTML('beforeend', recipeItem);
  });

}

function formatCount (count) {
  if(count) {
    count = Math.round(count * 10) /10;
    const[int, dec] = count.toString().split('.').map(el => parseInt(el));

    if(!dec) return count;

    if(int === 0) {
      const fr = new Fraction(count);
      return `${fr.numerator}/${fr.denominator}`;
    }
    else {
      const fr = new Fraction(count - int);
      return `${int} ${fr.numerator}/${fr.denominator}`;
    }
  }

  return '?';
}