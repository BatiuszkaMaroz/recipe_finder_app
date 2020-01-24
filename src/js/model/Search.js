export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResult() {
    try {
      const request = await fetch(
        `https://forkify-api.herokuapp.com/api/search?q=${this.query}`,
        {
          method: 'GET',
        },
      )
      .then(response => {
        if (response.status >= 200 && response.status < 300)
          return response.json();
        else throw new Error('Result not found.');
      })
      .then(result => {
        this.result = result.recipes;
      })
      .catch(error => {
        //Response Error
        console.log(error);
      });
    } catch (error) {
      //Network Error
      console.log(error);
    }
  }
}
