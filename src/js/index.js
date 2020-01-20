import { DOM } from './view/base';
import Search from './model/Search';
import Recipe from './model/Recipe';
import List from './model/List';
import * as recipeView from './view/recipeView';
import * as listView from './view/listView';

/***
 APP STATE
 ***/
const state = {};

/***
 SEARCH CONTROLLER
 ***/
const controlSearch = async () => {
  const searchView = await import('./view/searchView');
  const query = searchView.getInput();

  if (query) {
    searchView.renderLoader();

    state.search = new Search(query);

    try {
      await state.search.getResult();
      const recipes = state.search.result;

      searchView.hideLoader();

      searchView.renderResults(recipes);

      searchView.clearInput();
    }
    catch (error) {
      console.log(error);
      searchView.clearList();
    }
  }
};

const form = DOM.searchForm;
form.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

/***
 RECIPE CONTROLLER
 ***/
const controlRecipe = async () => {
  recipeView.clearRecipe();

  const id = location.hash.replace('#', '');

  //Handle no id
  if(!id) return;

  recipeView.highlight(id);

  recipeView.renderLoader();

  state.recipe = new Recipe(id);

  try {
    const result = await state.recipe.getRecipe();

    state.recipe.calcTime();
    state.recipe.calcServings();
    state.recipe.parseIngredients();

    recipeView.hideLoader();
    recipeView.renderRecipe(state.recipe);
  }
  catch (error) {
    // console.log(error);
    ;
  }
}

/***
 LIST CONTROLLER
 ***/
const controlList = () => {
  if(!state.list) state.list = new List();

  state.recipe.ingredients.forEach(ing => {
    const newItem = state.list.addItem(ing.count, ing.unit, ing.ingredient);
    listView.renderItem(newItem);
  })
}

/***
 LIKES CONTROLLER
 ***/


['load', 'hashchange'].forEach(event => window.addEventListener(event, controlRecipe));

DOM.recipe.addEventListener('click', event => {
  try {
    if (event.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
      controlList();
    }
    else if(event.target.matches('.btn-tiny, btn-tiny *') && event.target.closest('.btn-tiny').dataset.sign === 'plus') {
      state.recipe.updateServings('inc');
      recipeView.updateServings(state.recipe);
      recipeView.recipeListUpdate(state.recipe);
    }
    else if (event.target.matches('.btn-tiny, btn-tiny *') &&  event.target.closest('.btn-tiny').dataset.sign === 'minus') {
      state.recipe.updateServings('dec');
      recipeView.updateServings(state.recipe);
      recipeView.recipeListUpdate(state.recipe);
    }
    else if (event.target.matches('.recipe__love, .recipe__love *')) {
      console.log('a')
    }
  }
  catch (e) {
    console.log(e);
  }
});

DOM.shoppingList.addEventListener('click', event => {
  const id = event.target.closest('li').dataset.itemid;

  if(event.target.matches('.shopping__delete, .shopping__delete *')) {
    state.list.deleteItem(id);
    listView.deleteItem(id);
  }
  else if (event.target.matches('.shopping__count-value')) {
    const val = parseFloat(event.target.value);
    state.list.updateCount(id, val);
  }
})
