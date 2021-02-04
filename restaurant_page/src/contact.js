export function renderContact(){
    let contentDiv = document.getElementById("content");

    contentDiv.insertAdjacentHTML("beforeend",`
    <div class="contact-container">
        <h1>Contact Us</h1>
        <div class="contact">
            <div class="loc">
                <p>location: <span>0001 Atlantis Blvd, Bermuda Triangle, Atlantic Ocean</span></p>
            </div>

            <div class="opening">
                <p>Opening Hours: <span>Mon-Fri: 8am-6pm, Sat-Sun: 9am-5pm</span></p>
            </div>

            <div class="phone">
                <p>Phone Number: <span>000-0000-0001</span></p>
            </div>

            <div class="message">
                <h2>Message Us</h2>
                <form action="return false" on>
                    <label for="name">Name:</label>
                    <br>
                    <input type="text" id="name" name="name" required>
                </form>
                <form action="return false">
                    <label for="email">Email:</label>
                    <br>
                    <input type="email" id="email" name="email" required>
                </form>

                <div>
                    <label for="textarea">Message:</label>
                    <br>
                    <textarea name="textarea" id="textarea" cols="30" rows="10"></textarea>
                </div>

                <input type="submit" value="send">
            </div>

            <div class="iframe-container">
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d57860.632585589185!2d-71.03930634637463!3d24.9902757839269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1611321007924!5m2!1sen!2sus" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
            </div>
        </div>
    </div>
    `);
}