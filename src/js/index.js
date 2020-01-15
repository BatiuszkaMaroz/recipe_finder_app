import { DOM } from './view/base';
import Search from './model/Search';
import Recipe from './model/Recipe';

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
  const recipeView = await import('./view/recipeView');
  recipeView.clearRecipe();

  const id = location.hash.replace('#', '');

  //Handle no id
  if(!id) return;

  state.recipe = new Recipe(id);

  try {
    const result = await state.recipe.getRecipe();

    state.recipe.calcTime();
    state.recipe.calcServings();
    state.recipe.parseIngredients();

    recipeView.renderRecipe(state.recipe);
  }
  catch (error) {
    console.log(error);
  }
}

['load', 'hashchange'].forEach(event => window.addEventListener(event, controlRecipe));


