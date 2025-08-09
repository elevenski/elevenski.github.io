mybutton = document.getElementById("goTop");

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

console.log(
  "%cDesigned with ❤️ and dedication by Eleven. Every pixel, every line of code, and every detail you see here has been crafted with passion and creativity to bring you the best possible experience. Thank you for visiting and being part of this journey.",
  "color: white; background: linear-gradient(90deg, #00c6ff, #0072ff); padding: 12px 16px; border-radius: 13px; font-size: 15px; font-weight: normal; line-height: 1.2;"
);
