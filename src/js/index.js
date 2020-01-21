import { DOM } from './view/base';
import Search from './model/Search';
import Recipe from './model/Recipe';
import List from './model/List';
import Likes from './model/Likes';
import * as recipeView from './view/recipeView';
import * as listView from './view/listView';
import * as likesView from './view/likesView';

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
    } catch (error) {
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
  if (!id) return;

  recipeView.highlight(id);

  recipeView.renderLoader();

  state.recipe = new Recipe(id);

  try {
    const result = await state.recipe.getRecipe();

    state.recipe.calcTime();
    state.recipe.calcServings();
    state.recipe.parseIngredients();

    recipeView.hideLoader();
    recipeView.renderRecipe(
      state.recipe,
      (state.likes ? state.likes.isLiked(id) : false)
    );
  } catch (error) {
    // console.log(error);
  }
};

/***
 LIST CONTROLLER
 ***/
const controlList = () => {
  state.recipe.ingredients.forEach(ing => {
    const newItem = state.list.addItem(ing.id, ing.count, ing.unit, ing.ingredient);
    listView.renderItem(newItem);
  });
};

/***
 LIKES CONTROLLER
 ***/
const controlLike = async () => {
  const curID = state.recipe.id;

  //user has NOT liked
  if (!state.likes.isLiked(curID)) {
    const newLike = state.likes.addLike(
      curID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.image,
    );

    likesView.renderLike(newLike);

    likesView.toggleLikeMenu(state.likes.getNumOfLikes());
    likesView.toggleIcon(true);
  }
  //user has liked
  else {
    state.likes.deleteLike(curID);

    likesView.deleteLike(curID);

    likesView.toggleLikeMenu(state.likes.getNumOfLikes());
    likesView.toggleIcon(false);
  }
};

['load', 'hashchange'].forEach(event =>
  window.addEventListener(event, controlRecipe),
);


/***
 ON LOAD
 ***/
window.addEventListener('load', () => {
  state.likes = new Likes();
  state.likes.readStorage();

  state.likes.likes.forEach(like => {
    likesView.renderLike(like);
  });

  likesView.toggleLikeMenu(state.likes.getNumOfLikes());

  //------------------------

  state.list = new List();
  state.list.readStorage();

  state.list.items.forEach(item => {
    listView.renderItem(item);
  })
});

DOM.recipe.addEventListener('click', event => {
  try {
    if (event.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
      controlList();
    } else if (event.target.matches('.btn-tiny, .btn-tiny *')) {
      state.recipe.updateServings(
        `${
          event.target.closest('.btn-tiny').dataset.sign === 'plus'
            ? 'inc'
            : 'dec'
        }`,
      );
      recipeView.updateServings(state.recipe);
      recipeView.recipeListUpdate(state.recipe);
    } else if (event.target.matches('.recipe__love, .recipe__love *')) {

      //ADD TO FAV

      controlLike();
    } else if (event.target.matches('.recipe__item, .recipe__item *')) {

      //SINGLE INGREDIENT

      const ingredient = state.recipe.getIngredient(event.target.closest('li').dataset.itemid);
      state.list.addItem(ingredient.id, ingredient.count, ingredient.unit, ingredient.ingredient);
      listView.renderItem(ingredient);

      state.list.readStorage();
    }
  } catch (e) {
    console.log(e);
  }
});

DOM.shoppingList.addEventListener('click', event => {
  const id = event.target.closest('li').dataset.itemid;

  if (event.target.matches('.shopping__delete, .shopping__delete *')) {
    state.list.deleteItem(id);
    listView.deleteItem(id);
  } else if (event.target.matches('.shopping__count-value')) {
    const val = parseFloat(event.target.value);
    state.list.updateCount(id, val);
  }
});

DOM.executor.addEventListener('click', () => {
  state.list.clearList();
  listView.deleteAll();
})