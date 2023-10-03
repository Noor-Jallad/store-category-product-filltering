function getIdFromUrl() {
    const queryUrlStr = window.location.search;
    const searchParams = new URLSearchParams(queryUrlStr)
    return searchParams.get('id');
}
async function getProductById(id) {
    try {
        const res= await fetch(`https://dummyjson.com/products/${id}`);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
async function generateProduct() {
    const id = getIdFromUrl();
    const product = await getProductById(id);
    displayProductInfo(product);
}
generateProduct()
function displayProductInfo(product) {
    console.log(product);
    const productDiv = document.getElementById('product');
    res = `
    <div class="card p-3">
    <div class="row no-gutters">
        <div class="col-md-5">
            <img src="${product.thumbnail}" class="card-img" alt="Product Thumbnail">
        </div>
        <div class="col-md-7">
            <div class="card-body">
                <h5 class="d-block card-title fs-1 text-secondary">${product.title}</h5>
                <span class="d-block card-text fs-1 text-secondary">${product.description}</span>
                <span class="d-block card-text fs-1 text-secondary">Price: $${product.price}</span>
                <span class="d-block card-text fs-1 text-secondary">Discount: ${product.discountPercentage}%</span>
                <span class="d-blockcard-text fs-1 text-secondary">Brand: ${product.brand}</span>
                <span class="d-block card-text fs-1 text-secondary">Category: ${product.category}</span>
                <span class="d-block card-text fs-1 text-secondary">Rating: ${product.rating}</span>
                <span class="d-block card-text fs-1 text-secondary">Stock: ${product.stock}</span>
      <div class="col-md-12">
            <div class="row">
            ${product.images?.map((img) => {
        return `<div class="col-md-2">
                    <img class="w-100" src="${img}"/>
                </div>`
            })
        }
        </div>
        </div>
    </div>
    </div>
    </div>
</div>`;
    productDiv.innerHTML = res;
}