const searchCategoryForm = document.getElementById('searchCategoryForm')
const searchForm = document.getElementById('searchForm')
const searchCategoryInput= document.getElementById('searchCategoryInput')
const searchInput= document.getElementById('searchInput')
let categorySelected = 'All'
async function getCategories(){
    try {
        const res=await fetch('https://dummyjson.com/products/categories');
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
async function getProducts(){
    try {
        const res= await fetch('https://dummyjson.com/products');
        const productsReturned = await res.json();
        return productsReturned.products;
    } catch (error) {
        console.log(error);
    }
}
async function getProductsFromCategory(category) {
    try {
        const res = await fetch(`https://dummyjson.com/products/category/${category}`);
        const productsReturned = await res.json();
        return productsReturned.products
    } catch (error) {
        console.log(error);
    }
}
async function searchProduct(query) {
    try {
        const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
        const filteredProductsReturned =await res.json();
        return filteredProductsReturned.products;
    } catch(error) {
        console.log(error);
    }
}
function displayProducts(prods) {
    const productsDiv= document.getElementById('products');
    let res =``;
    console.log(prods);
    if(prods.length > 0) {
        for (const product of prods) {
            res += `
            <div class="col-md-3">
                <div class="card p-2">
                    <a class="img-link" href="another-pages/product.html?id=${product.id}"><img src="${product.images[0]}" class="card-img-top img-fluid img-responsive" alt="Image"></a>
                    <div class="card-body">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="p-2">
                                <h5 class="card-title">${(product.title).split(' ').slice(0,2).join(' ')}</h5>
                                <p class="card-text">${product.category}</p>
                                <p class="card-text">${product.description}</p>
                            </div>
                            <div>
                                <p>Price:  $${product.price}</p>
                                <p>Discount Perc:  $${product.discountPercentage}</p>
                                 
                            </div>
                        </div>
                        <div class="">
                            <button id="add-to-cart-btn" class="cart btn bg-warning text-white"><img class="img-fluid" src="assets/images/cartImg.png"/></button>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
    } else {
        res = '<div class="d-flex justify-content-center"><p>No Data Found</p></div>'
    }

    productsDiv.innerHTML = res;
}

function renderCategoriesPlusListeners(categories) {
    const categoriesItemsList = document.getElementById('categories');
    let res = `<button class="list-group-item list-group-item-action active">All</button>`;
    for (const category of categories) {
        res += `<button class="list-group-item list-group-item-action">${category}</button>`;
    }
    categoriesItemsList.innerHTML = res;
    let listItems = document.querySelectorAll('.list-group button');
    addClickListenerToListItemsBtn(listItems);
}

async function generatePageData(callback, display) {
    const data = await callback()
    display(data)
}
function addClickListenerToListItemsBtn(listItems) {
    listItems.forEach((listGroupItem) => {
        listGroupItem.addEventListener('click', async() => {
            const category =listGroupItem.textContent.trim()
            categorySelected = category
            if (category !== "All") {
                const prods = await getProductsFromCategory(category);
                displayProducts(prods)
            } else if(category==="All"){
                categorySelected = "All"
                generatePageData(getProducts, displayProducts)
               
            }
        })
    })
}
function searchProductsByCategory(products) {
    return products.filter((product) => product.category == categorySelected)
}
searchForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    const query = searchForm.elements[0].value;
    // console.log(query);
    const prods= await searchProduct(query);
    displayProducts(prods);
});
searchCategoryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = searchCategoryForm.elements[0].value;
    console.log(query);
    const products = await searchProduct(query);
    const filteredProducts = searchProductsByCategory(products)
    console.log(filteredProducts);
    displayProducts(filteredProducts);
});
generatePageData(getCategories, renderCategoriesPlusListeners)
generatePageData(getProducts, displayProducts)