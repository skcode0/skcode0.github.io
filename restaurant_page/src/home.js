// when home button clicked, load home page

export function renderHome(){
    let contentDiv = document.getElementById("content");

    contentDiv.insertAdjacentHTML("beforeend",
    `
    <!-- bg img -->
    <div class="intro-container">
        <div class="bg-img"></div>
        <!-- front page -->
        <div class="intro">
            <div class="about">
                <p>"Food's pretty good. Would recommend."</p>
                <p>- Owners</p>
            </div>
            <button class="order-btn">Order Now</button>
        </div>

        <div class="info">
            <div class="location">
                <img src="img/map.svg" alt="Location">
                <p>0001 Atlantis Blvd, Bermuda Triangle, Atlantic Ocean</p>
            </div>
            <div class="time">
                <img src="img/clock.svg" alt="Time">
                <div>
                    <p>Mon-Fri: <span>8am-6pm</span></p>
                    <p>Sat-Sun: <span>9am-5pm</span></p>
                </div>
            </div>
        </div>
    </div>
    `);
};