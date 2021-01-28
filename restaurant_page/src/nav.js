export function renderNav(){
    let contentDiv = document.getElementById("content");
    
    contentDiv.insertAdjacentHTML("afterbegin",
    `
    <nav>
        <div class="logo">
            <h1><a href="index.html">Another Burger Place</a></h1>
        </div>
        <ul>
            <li class="links pink">Home</li>
            <li class="links">Menu</li>
            <li class="links">Contact Us</li>
        </ul>
    </nav>
    `);
}