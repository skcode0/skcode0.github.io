let menuList = [
    {
        name: "Double Cheese Burger",
        price: 6.99,
        desc: "Tastes just like a regular burger, but for some reason, you want more calories.",
        img: "img/burger.jpg"
    },
    {
        name: "Fries",
        price: 3.99,
        desc: "Most popular dish on this menu.",
        img: "img/fries.jpg"
    },
    {
        name: "Pizza",
        price: 12.99,
        desc: "Made with onions, corns, peppers, mushroom, and extra cheese. Seems healthy, but not really.",
        img: "img/pizza.jpg"
    },
    {
        name: "Steak",
        price: 20.99,
        desc: "Burger without bread, cheese, and vegetable.",
        img: "img/steak.jpg"
    },
    {
        name: "Pasta",
        price: 9.99,
        desc: "Contains shrimps, tomatos, various spices, scallion, and other bunch of stuff your tastebuds wouldn't notice.",
        img: "img/pasta.jpg"
    },
    {
        name: "Salad",
        price: 7.99,
        desc: "We just put it as an healthy option, but why would you even order such a thing at a burger place?",
        img: "img/salad.jpg"
    },
    {
        name: "Coke",
        price: 1.99,
        desc: "Coke, but in a fancy bottle.",
        img: "img/coke.jpg"
    },
    {
        name: "Water",
        price: 0.00,
        desc: "Unlike Nestlé, we offer free filtered water.",
        img: "img/water.jpg"
    },
];

export function renderMenu(){
    let contentDiv = document.getElementById("content");

    // menu container
    let menuContainer = document.createElement("div");
    menuContainer.setAttribute("id", "menu-container");
    menuContainer.style.backgroundColor = "var(--green)";
    // menu title
    let menuTitle = document.createElement("h1");
    menuTitle.classList.add("menu-title");
    menuTitle.textContent = "Menu";
    menuContainer.appendChild(menuTitle);
    // menu items
    let menu = document.createElement("div");
    menu.setAttribute("id", "menu");
    menuList.forEach(item =>{
        menu.insertAdjacentHTML("beforeend", 
        `
        <div class="item">
            <img src=${item.img} alt="${item.name}" class="item-img">
            <div class="text">
                <div class="name-price">
                    <h2 class="food-name">${item.name}</h2>
                    <h2 class="price">${item.price}</h2>
                </div>
                <p>${item.desc}</p>
            </div>
        </div>
        `);
    });
    menuContainer.appendChild(menu);

    let toggleMenu = document.createElement("div");
    toggleMenu.setAttribute("class", "toggle-menu");
    toggleMenu.style.display = "none";
    toggleMenu.appendChild(menuContainer);

    contentDiv.appendChild(toggleMenu);
}