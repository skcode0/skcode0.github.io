// add comments
let comments = [];

function Commenters(name, pic, day, comment, likes, replies=""){
    this.name = name;
    this.pic = pic;
    this.day = day;
    this.comment = comment;
    this.likes = likes;
    this.replies = replies;
}

comments.push(new Commenters("TUSHAR", "https://yt3.ggpht.com/ytc/AAUvwnjpQ1zEuwO-aKngkcEWdJYi7sT5LjNlX7NHRQeFQw=s48-c-k-c0xffffffff-no-rj-mo", "3 days ago", "Try to be a square but if not it's ok that hit me hard.", 26));

comments.push(new Commenters("Israel Hodson", "https://yt3.ggpht.com/ytc/AAUvwnjRRkUEggw2n1Nr_0U6WUmtLiR4ebV_Qu6CQ1A2=s48-c-k-c0xffffffff-no-rj-mo", "3 days ago", `width: 90vw; <br> height: calc(9 /  16 * 90vw);`, 13, "View 3 replies"));

comments.push(new Commenters("Arthematix", "https://yt3.ggpht.com/ytc/AAUvwni9O721rPGCTD5jl66FlLl6wJm0rcJSt9ylRB0eJQ=s48-c-k-c0xffffffff-no-rj-mo", "3 days ago", "I'm addicted to CSS))))", 12));

comments.push(new Commenters("Rafał Mucha", "https://yt3.ggpht.com/ytc/AAUvwnhwRwIB6UZN-0kG5q3W0XTWVglZIrKS8HnmjUcwrm0=s48-c-k-c0xffffffff-no-rj-mo", "3 days ago (edited)", "YEEEEES!!! Finally; I've literally spent months of life fighting with this aspect ratio crap.", 10, "View reply"));

comments.push(new Commenters("Ben Baudart", "https://yt3.ggpht.com/ytc/AAUvwnh64bLSqdJHtoK42KvhWM7fWrc9nJACi4ieTCBvew=s48-c-k-c0xffffffff-no-rj-mo", "3 days ago", `"Can be enabled by setting #enable-experimental-web-platform-features to Enabled"  (in Chrome, according to CanIUse) but is not enabled by default. Worth mentioning…`, 6, "View 3 replies from Kevin Powell and others"));

comments.push(new Commenters("BenRangel", "https://yt3.ggpht.com/ytc/AAUvwnjmxLcx1By9B0lnYrL7PbIoK6LaZJV_AG3L-Bgdzw=s48-c-k-c0xffffffff-no-rj-mo", "1 day ago (edited)", `Fun side note: while googling for this feature I also found the old aspect-ratio for mediaQuery ! <br> Never ever used that before but found it's been around since IE9. Whoa. Not sure what it'd use it for but it's interesting @media (min-aspect-ratio: 1/1)`, 0));


let renderComments = (() =>{
    let userComments = document.getElementById("comments-container");

    comments.forEach(user => {
        if(user.likes === 0){
            user.likes = "";
        }
        let replyContainer = "";
        if(user.replies !== ""){
            replyContainer = `
            <div class="reply-container">
                <img src="images/menu-down.svg" alt="Menu Down">
                <span>${user.replies}</span>
            </div>
            `
        }
        userComments.insertAdjacentHTML("beforeend", `
        <div class="user-comment">
            <img src="${user.pic}" alt="user profile pic">
            <div class="user-info">
                <div class="user-name flex">
                    <h2>${user.name}</h2>
                    <span>${user.day}</span>
                </div>
                <div class="comment-container">
                    <p class="comment">${user.comment}</p>
                    <img src="images/dots-vertical.svg" alt="Vertical Dots">
                </div>
                <div class="user-likes flex">
                    <div class="liked-comment flex">
                        <img src="images/thumb-up.svg" alt="Thumbs Up">
                        <p class="liked">${user.likes}</p>
                    </div>
                    <img class="comment-dislike" src="images/thumb-down.svg" alt="Thumbs Down">
                    <p class="reply">REPLY</p>
                </div>
                ${replyContainer}
            </div>
        </div>
        `);
    });
})();


// add recommended videos
let videos = [];

function Vid(link, img, time, title, uploader, views, isNew=false){
    this.link = link;
    this.img = img;
    this.time = time;
    this.title = title;
    this.uploader = uploader;
    this.views = views;
    this.isNew = isNew;
}

videos.push(new Vid("https://www.youtube.com/watch?v=-QgJgZCJvo4&t=1s","https://i.ytimg.com/vi/-QgJgZCJvo4/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBNaA9dYXsf0yw3ArAJhFfirDyOTA", "37:44", "I Challenged The CSS King To A CSS Battle", "Web Dev Simplified", "58K views • 6 days ago", true));

videos.push(new Vid("https://www.youtube.com/watch?v=VfGW0Qiy2I0", "https://i.ytimg.com/vi/VfGW0Qiy2I0/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBLUSXx5I54OEsmbcDSFQMyvfRTcA", "1:05:15", "Web Development In 2021 - A Practical Guide", "Traversy Media", "329K views • 3 weeks ago"));

videos.push(new Vid("https://www.youtube.com/watch?v=Azfj1efPAH0", "https://i.ytimg.com/vi/Azfj1efPAH0/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLDLUhwTdTgfYj_7ZXAdIaUr-b86mQ", "14:40", "You can do that with margins?", "Kevin Powell", "36K views • 4 months ago"));

videos.push(new Vid("https://www.youtube.com/watch?v=aydFCQiUW44", "https://i.ytimg.com/vi/jA14r2ujQ7s/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLAJaqlOfAPS4t6PoITJYn8_uOdIaw", "12:17", "How I setup VS Code for a beginners front-end workflow", "Coder Coder", "50K views • 8 months ago"));

videos.push(new Vid("https://www.youtube.com/watch?v=YszONjKpgg4", "https://i.ytimg.com/vi/YszONjKpgg4/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLCmHNdeySlxi1OwwXOY8-Uou8VjBQ", "15:33", "Learn CSS Animation In 15 Minutes", "Web Dev Simplified", "51K views • 3 months ago"));

videos.push(new Vid("https://www.youtube.com/watch?v=a9VZEgbHxrg", "https://i.ytimg.com/vi/a9VZEgbHxrg/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLC6PqK1jULvoHlB85ujGXtuctKoUA", "11:24", "Top Tools For Web Developers That I Use", "Dev Ed", "299K views • 1 year ago"));

videos.push(new Vid("https://www.youtube.com/watch?v=jV8B24rSN5o", "https://i.ytimg.com/vi/jV8B24rSN5o/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLAbIWZviC6IshbDqP3ISwAYa2AUKw", "27:54", "CSS Grid Layout Crash Course", "Traversy Media", "1.4M views • 3 years ago"));

videos.push(new Vid("https://www.youtube.com/watch?v=yU7jJ3NbPdA", "//i.ytimg.com/vi/yU7jJ3NbPdA/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLA0IodyetXKZ6KmaoTkxhn0j9MeHg", "7:11", "Learn CSS Media Query In 7 Minutes", "Web Dev Simplified", "155K views • 1 year ago"));


let renderVids = (() =>{
    let aside = document.getElementById("vid-aside");

    videos.forEach(video => {
        let newTag = "";
        if(video.isNew){
            newTag = `<p class="new">New</p>`;
        }
        aside.insertAdjacentHTML("beforeend",`
        <a href="${video.link}" class="recommended-video">
            <div class="thumbnail-img">
                <img src="${video.img}" alt="${video.title}">
                <div class="hover-options">
                    <img src="images/clock.svg" alt="Clock">
                    <br>
                    <img src="images/playlist-play.svg" alt="Playlist Play">
                </div>
                <p class="time-stamp">${video.time}</p>
            </div>
            <div class="thumbnail-info">
                <h3>${video.title}</h3>
                <p class="uploader-name">${video.uploader}<img src="images/check-circle.svg" alt="Verified"></p>
                <p>${video.views}</p>
                ${newTag}
            </div>
            <img class="vertical-dots" src="images/dots-vertical-thumb.svg" alt="Vertical Dots">
        </a>`);
    });
})();