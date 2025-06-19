let currentIndex = 0;
let slides = [];
let dots = [];
let slideInterval;
let heroText;

document.addEventListener("DOMContentLoaded", () => {
  slides = document.querySelectorAll(".slide");
  dots = document.querySelectorAll(".dot");
  heroText = document.querySelector(".hero-text");

  if (slides.length > 0) {
    showSlide(currentIndex);
    slideInterval = setInterval(showNextSlide, 5000);
  }

  // Pause on hover
  const slideshow = document.querySelector(".slideshow-container");
  slideshow.addEventListener("mouseenter", pauseSlideshow);
  slideshow.addEventListener("mouseleave", resumeSlideshow);

  // Swipe events
  enableSwipe(slideshow);
});

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
    if (dots[i]) dots[i].classList.toggle("active", i === index);
  });

  // Sync text fade with slide
  if (heroText) {
    heroText.classList.remove("active");
    setTimeout(() => {
      heroText.classList.add("active");
    }, 100); // sync delay for smoother appearance
  }

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

// Swipe functionality
function enableSwipe(container) {
  let touchStartX = 0;
  let touchEndX = 0;

  container.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  container.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const threshold = 50; // Minimum distance for swipe
    if (touchEndX < touchStartX - threshold) {
      changeSlide(1); // swipe left
    } else if (touchEndX > touchStartX + threshold) {
      changeSlide(-1); // swipe right
    }
  }
}
// Detect when the user scrolls to add/remove the "scrolled" class on header
window.addEventListener("scroll", function () {
  const header = document.getElementById("main-header");
  if (window.scrollY > 50) {
    // This triggers the background change when scrolled 50px down
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
function showContent(priority) {
  const contentDisplay = document.getElementById("content-display");

  // Update content
  if (priority === "customers") {
    contentDisplay.innerHTML = `
      <p>We provide affordable cleaning services and train our cleaning experts well to do just as you require. If for any reason you aren’t happy with a cleaning service, please contact us immediately and we will come back and clean the specific areas that didn’t meet your expectations. Nothing is more important to us than your satisfaction.</p>
    `;
  } else if (priority === "environment") {
    contentDisplay.innerHTML = `
      <p>We are not only committed to doing what our customers request but to do it with equipment and products which are safe for the health of our customers and cleaning experts.</p>
    `;
  } else if (priority === "communication") {
    contentDisplay.innerHTML = `
      <p>We have various channels open for communication because if you do need assistance we want to hear from you. You may reach us on the phone, email, cleaning teams, etc. If for any reason you aren’t happy with our cleaning service please contact us. In case you also need a special cleaning service please let us know as we offer many unique cleaning solutions.</p>
    `;
  }

  // Manage active class
  const priorityItems = document.querySelectorAll(".priority");
  priorityItems.forEach((item) => item.classList.remove("active"));

  const activeItem = document.getElementById(priority);
  if (activeItem) {
    activeItem.classList.add("active");
  }
}

// Show default content and apply active class on page load
window.onload = function () {
  showContent("customers");
};

let serviceCurrentSlide = 0;
const serviceSlidesPerPage = 3;

function showServiceSlide(index) {
  const serviceList = document.querySelector(".service-list");
  const dots = document.querySelectorAll(".service-dots .dot");
  const slideWidth = document.querySelector(".service-item").offsetWidth + 20;

  serviceCurrentSlide = index;
  serviceList.style.transform = `translateX(-${
    slideWidth * serviceSlidesPerPage * index
  }px)`;

  dots.forEach((dot) => dot.classList.remove("active"));
  if (dots[index]) dots[index].classList.add("active");
}

window.addEventListener("resize", () => {
  showServiceSlide(serviceCurrentSlide);
});

document.addEventListener("DOMContentLoaded", () => {
  showServiceSlide(0);
});

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".count");

  const options = {
    threshold: 0.6,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute("data-target");
        let count = 0;

        const increment = Math.ceil(target / 60); // speed

        const updateCount = () => {
          count += increment;
          if (count > target) count = target;
          counter.textContent = count;
          if (count < target) {
            requestAnimationFrame(updateCount);
          }
        };

        updateCount();
        observer.unobserve(counter); // run only once
      }
    });
  }, options);

  counters.forEach((counter) => observer.observe(counter));
});

const testimonials = document.querySelectorAll(".testimonial");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.classList.remove("active");
    if (i === index) {
      testimonial.classList.add("active");
    }
  });
}

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentIndex);
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(currentIndex);
});

// Initialize
showTestimonial(currentIndex);

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");
  const navLinks = mobileNav.querySelectorAll("a");

  // Toggle mobile menu on hamburger click
  hamburger.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
  });

  // Close mobile menu when any link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("active");
    });
  });
});
