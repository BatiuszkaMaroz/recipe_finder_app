export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const request = await fetch(
        `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`,
        {
          method: 'GET',
        },
      )
      .then (response => {
        if(response.status >= 200 && response.status < 300) {
          return response.json();
        }
        else throw new Error('Result not found.');
      })
      .then (result => {
        this.title = result.recipe.title;
        this.author = result.recipe.publisher;
        this.image = result.recipe.image_url;
        this.source = result.recipe.source_url;
        this.ingredients = result.recipe.ingredients;
      })
      .catch (error => {
        //Response Error
        console.log(error);
      })
    } catch (error) {
      //Network Error
      console.log(error);
    }
  }

  calcTime () {
    const numIng = this.ingredients.length;
    const periods = numIng/3;
    this.time = periods * 15;
  }

  calcServings () {
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds', 'package'];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound', 'pckg'];

    //String formating
    const formatedIngredients = this.ingredients.map(string => {
      let ingredient = string;

      unitsLong.forEach((unit, idx) => {
        const regEx = new RegExp(`(${unit}(?![A-z]))`);
        ingredient = ingredient.replace(regEx, unitsShort[idx]);
      });

      const regEx2 = new RegExp('[()]');
      while(regEx2.test(ingredient)) {
        ingredient = ingredient.replace(regEx2, '');
      }

      const ingArr = ingredient.split(' ');
      const unitIndex = ingArr.findIndex(elm => unitsShort.includes(elm));
      // const unitIndex = [];
      // ingArr.forEach(elm => {
      //   if(unitsShort.includes(elm)) unitIndex.push(elm);
      // });

      let objIng;
      if(unitIndex > -1) {
        const countArr = ingArr.slice(0, unitIndex);

        let counter;
        if (countArr.length === 1) {
          counter= eval(countArr[0].replace('-', '+'));
        }
        else {
          counter = eval(countArr.join('+'));
        }

        if(!counter) counter = 1;

        objIng = {
          count: `${counter % 1 == 0 ? counter : counter.toFixed(1)}`,
          unit: ingArr[unitIndex],
          ingredient: ingArr.slice(unitIndex + 1).join(' '),
        }
      }
      else if (!!parseInt(ingArr[0], 10)) {
        objIng = {
          count: parseInt(ingArr[0], 10),
          unit: '',
          ingredient: ingArr.slice(1).join(' '),
        }
      }
      else if (unitIndex === -1) {
        objIng = {
          count: 1,
          unit: '',
          ingredient,
        }
      }

      objIng.ingredient = objIng.ingredient.toLowerCase();
      return objIng;
    })

    this.ingredients = formatedIngredients;
  }
}
