class DataStore {
  cache = [];
  createdAt = 0;
  //expirationTime in seconds
  expirationTime = 120;
  getDrinks = async () => {
    if (!this.shuouldFetch()) {
      return this.cache;
    }
    let data = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`
    );
    data = await data.json();
    this.cache = data.drinks;
    this.createdAt = Date.now();
    return this.cache;
  };

  findById = async (id) => {
    if (this.cache.length === 0) {
      await this.getDrinks();
    }
    const drink = this.cache.find((item) => item.idDrink === id);
    return drink;
  };

  updateCacheItem = (newItem) => {
    for (let i = 0; i < this.cache.length; i++) {
      if (this.cache[i].idDrink === newItem.idDrink) {
        this.cache[i] = newItem;
        return;
      }
    }
  };

  shuouldFetch = () => {
    if (!this.cache.length === 0 || this.createdAt === 0) return true;
    let timeDiff = (Date.now() - this.createdAt) / 1000;
    return timeDiff > this.expirationTime;
  };
}

export const dataStore = new DataStore();
