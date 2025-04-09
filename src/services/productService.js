export async function getProductList(searchTerm){
    // Old Code: const response = await fetch(`${process.env.REACT_APP_HOST}/444/products?name_like=${searchTerm ? searchTerm : ""}`);
    const host = process.env.REACT_APP_HOST; // Will be "" in production build
    const url = `${host}/444/products?name_like=${searchTerm ? searchTerm : ""}`; // Becomes "/444/products?..." for relative path fetch
    const response = await fetch(url);

    if(!response.ok){
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json()
    return data;
}

export async function getProduct(id){
    // Old Code: const response = await fetch(`${process.env.REACT_APP_HOST}/444/products/${id}`);
    const host = process.env.REACT_APP_HOST; // Will be "" in production build
    const url = `${host}/444/products/${id}`; // Becomes "/444/products/..." for relative path fetch
    const response = await fetch(url);

    if(!response.ok){
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json()
    return data;
}

export async function getFeaturedList(){
    // Old Code: const response = await fetch(`${process.env.REACT_APP_HOST}/444/featured_products`);
    const host = process.env.REACT_APP_HOST; // Will be "" in production build
    const url = `${host}/444/featured_products`; // Becomes "/444/featured_products" for relative path fetch
    const response = await fetch(url);

    if(!response.ok){
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json()
    return data;
}