const productsDiv = document.getElementById("products");
const searchInput = document.getElementById("searchInput");
const favoriteCount = document.getElementById("favoriteCount");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

let products = [];
let favorites = [];


async function getProducts() {
    try {
        const response = await fetch("https://dummyjson.com/products");

        if (!response.ok) {
            throw new Error("Something went wrong");
        }

        const data = await response.json();

        products = data.products;

        showProducts(products);

    } catch (err) {
        error.textContent = "Unable to load products.";
    }

    loading.style.display = "none";
}


function showProducts(list) {
    productsDiv.innerHTML = "";

    if (list.length === 0) {
        productsDiv.innerHTML = "<p>No products found.</p>";
        return;
    }

    list.forEach(product => {
        const card = document.createElement("div");

        card.className = "card";

        const isFavorite = favorites.includes(product.id);

        card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p class="price">$${product.price}</p>
            <button class="favorite-btn ${isFavorite ? "active" : ""}"
                onclick="toggleFavorite(${product.id})">
                ${isFavorite ? "Remove Favourite" : "Add Favourite"}
            </button>
        `;

        productsDiv.appendChild(card);
    });
}


function toggleFavorite(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(item => item !== id);
    } else {
        favorites.push(id);
    }

    favoriteCount.textContent = favorites.length;

    searchProducts();
}


function searchProducts() {
    const search = searchInput.value.toLowerCase();

    const result = products.filter(product =>
        product.title.toLowerCase().includes(search)
    );

    showProducts(result);
}


searchInput.addEventListener("input", searchProducts);

getProducts();