import { DOM } from './base';
import { limitRecipeTitle } from './searchView';

export const toggleIcon = liked => {
  document
    .querySelector('.recipe__love svg use')
    .setAttribute(
      'href',
      `img/icons.svg#icon-heart${liked ? '' : '-outlined'}`,
    );
};

export const toggleLikeMenu = likesNum => {
  DOM.likesField.style.visibility = `${likesNum ? '' : 'hidden'}`;
};

export const renderLike = like => {
  const newLike = document.createElement('li');
  newLike.innerHTML = `<a class="likes__link" href="#${like.id}">
        <figure class="likes__fig">
            <img src="${like.img}" alt="${like.title}">
        </figure>
        <div class="likes__data">
            <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
            <p class="likes__author">${like.author}</p>
        </div>
    </a>`;

  DOM.likesList.append(newLike);
};

export const deleteLike = id => {
  document.querySelector(`.likes__link[href="#${id}"]`).parentElement.remove();
};
