const name = document.querySelectorAll('#full-name path');

for(let i = 0; i < name.length; i++) {
    console.log(`Letter ${i} is ${name[i].getTotalLength()}`); 
}

// Scrolls to home section
$("#home-btn").click(function() {
    $('html, body').animate({
        scrollTop: $("#home").offset().top},
        1000);
});

// Scrolls to about me section
$("#about-btn").click(function() {
    $('html, body').animate({
        scrollTop: $("#about-me").offset().top - 100},
        1000);
});

// Scrolls to projects section
$("#projects-btn").click(function() {
    $('html, body').animate({
        scrollTop: $("#projects").offset().top - 100},
        1000);
});

// Scrolls to contact section
$("#contact-btn").click(function() {
    $('html, body').animate({
        scrollTop: $("#contact").offset().top - 100},
        1000);
});

