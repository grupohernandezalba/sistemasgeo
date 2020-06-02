function addPrices(items: number[]) {
      let sum = 0;
      for (const item of items) {
        sum += item;
      }
      return sum;
    }
    
console.log(addPrices([3,4,5]));