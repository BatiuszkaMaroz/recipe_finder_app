import { DOM } from './base';

export const renderItem = item => {
  const newItem = document.createElement('li');
  newItem.className = 'shopping__item';
  newItem.dataset.itemid = item.id;
  newItem.innerHTML = `
    <div class="shopping__count">
        <input type="number" class="shopping__count-value" value="${item.count}" step="${item.count}">
        <p>${item.unit}</p>
    </div>
    <p class="shopping__description">${item.ingredient}</p>
    <button class="shopping__delete btn-tiny">
        <svg>
            <use href="img/icons.svg#icon-circle-with-cross"></use>
        </svg>
    </button>
    `;

  DOM.shoppingList.append(newItem);
};

export const deleteItem = id => {
  const elements = [...document.querySelectorAll('.shopping__item')];

  const item = elements.find(elm => {
    if (elm.dataset.itemid === id) return true;
  });

  item.remove();
};
