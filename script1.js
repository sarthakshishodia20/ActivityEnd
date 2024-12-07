let url = "https://fakestoreapi.com/products";
let display = document.getElementById("display");
let cart = document.getElementById("cart");

async function getData() {
    try {
        let data = await fetch(url);
        let response = await data.json();
        
        for (let item of response) {
            let image = document.createElement('img');
            image.src = item.image;

            let h3 = document.createElement('h3');
            h3.innerText = item.title;

            let price = document.createElement('p');
            price.innerText = `$${item.price.toFixed(2)}`;

            let div = document.createElement('div');
            div.appendChild(image);
            div.appendChild(h3);
            div.appendChild(price);
            div.classList.add('card');

            let button = document.createElement('button');
            button.innerText = "Add To Cart";
            button.classList.add('Add');
            button.id = `add-to-cart-button-${item.id}`;
            button.onclick = () => addToCart(item);

            div.appendChild(button);
            display.appendChild(div);
        }
    } catch (err) {
        console.error("Error fetching data:", err);
    }
}

function addToCart(item) {
    let cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.id = `cart-item-${item.id}`;
    cartItem.innerHTML = `
        <span>${item.title}</span>
        <button class="Remove" onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cart.appendChild(cartItem);
}

function removeFromCart(itemId) {
    let cartItem = document.getElementById(`cart-item-${itemId}`);
    if (cartItem) {
        cart.removeChild(cartItem);
    }
}

function clearCart() {
    cart.innerHTML = '';
}

getData();
