export function fetchAllProducts() {
  return new Promise(async(resolve) =>{
    //TODO : we will not hard code server here 
    const response = await fetch('http://localhost:8080/products');
    const data = await response.json();
    resolve({data});
  }
  )
}

export function fetchProductsByFilters(filter) {
    //filter = {category:'electronics'}
    let quereyString = '';
    for (let key in filter) {
        quereyString += `${key}=${filter[key]}&`
    }
  return new Promise(async(resolve) =>{
    //TODO : we will not hard code server here 
    const response = await fetch('http://localhost:8080/products?'+quereyString);
    const data = await response.json();
    resolve({data});
  }
  )
}
