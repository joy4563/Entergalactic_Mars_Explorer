
 export class DataFetcher {
    constructor(callback) {
      this.callback = callback;
    }
    fetchData(api_url) {
      fetch(api_url)
        .then((response) => response.json())
        .then((data) => this.callback(data))
        .catch((error) => console.error(error));
    }
  }
  

  