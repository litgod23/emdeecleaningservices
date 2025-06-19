const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".navbar nav");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active"); // Toggle the visibility of the navigation menu
});

let currentIndex = 0;
let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dot");
let slideInterval = setInterval(showNextSlide, 5000); // 5s interval

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
    dots[i].classList.toggle("active", i === index);
  });
  currentIndex = index;
}

function showNextSlide() {
  let nextIndex = (currentIndex + 1) % slides.length;
  showSlide(nextIndex);
}

function changeSlide(n) {
  let newIndex = (currentIndex + n + slides.length) % slides.length;
  showSlide(newIndex);
}

function currentSlide(n) {
  showSlide(n);
}

function pauseSlideshow() {
  clearInterval(slideInterval);
}

function resumeSlideshow() {
  slideInterval = setInterval(showNextSlide, 5000);
}

window.addEventListener("scroll", function () {
  const hero = document.querySelector(".hero");
  let offset = window.pageYOffset;
  hero.style.backgroundPositionY = offset * 0.5 + "px";
});

function addToCart(productId) {
  fetch("php/add_to_cart.php", {
    method: "POST",
    body: JSON.stringify({ product_id: productId }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => alert(data.message))
    .catch((error) => console.error("Error:", error));
}

// Detect when the user scrolls to add/remove the "scrolled" class on header
window.addEventListener("scroll", function () {
  const header = document.getElementById("main-header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
