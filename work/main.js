document.addEventListener("DOMContentLoaded", () => {

  /* ================= MOBILE MENU ================= */
  const hamburger = document.getElementById("hamburger");
  const menu = document.querySelector(".menu"); // ✅ FIXED

  if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      menu.classList.toggle("active");
    });
  }
/* ================= MOBILE DROPDOWN ================= */
const navLinks = document.querySelectorAll(".nav-item > a");

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    if (window.innerWidth <= 992) {
      const dropdown = link.nextElementSibling;

      if (dropdown && dropdown.classList.contains("dropdown")) {
        e.preventDefault();

        // close other dropdowns
        document.querySelectorAll(".dropdown.show").forEach(d => {
          if (d !== dropdown) d.classList.remove("show");
        });

        dropdown.classList.toggle("show");
      }
    }
  });
});


  /* ================= CLOSE MENU ON LINK CLICK (MOBILE) ================= */
  document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 992 && !link.nextElementSibling) {
        menu.classList.remove("active");
        hamburger.classList.remove("active");
      }
    });
  });

  /* ================= STICKY NAVBAR ================= */
  const header = document.querySelector(".site-header");

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 30) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  /* ================= TESTIMONIAL SLIDER ================= */
  let offset = 0;
  window.slide = function (dir) {
    const slider = document.getElementById("slider");
    if (!slider) return;

    offset += dir * 320;
    slider.style.transform = `translateX(${-offset}px)`;
  };

  /* ================= SMOOTH SCROLL ================= */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

});

/* ================= MODAL (GLOBAL FIX) ================= */
window.openModal = function () {
  const modal = document.getElementById("assistModal");

  if (!modal) {
    console.error("assistModal NOT found in DOM");
    return;
  }

  modal.classList.add("active");
  console.log("Modal opened");
};

window.closeModal = function () {
  const modal = document.getElementById("assistModal");
  if (!modal) return;

  modal.classList.remove("active");
  console.log("Modal closed");
};

/* Close when clicking background */
document.addEventListener("click", function (e) {
  const modal = document.getElementById("assistModal");
  if (e.target === modal) {
    window.closeModal();
  }
});

/* ================= MODAL VALIDATION ================= */

window.validateModal = function () {
  const mobile = document.getElementById("mobile");
  const name = document.getElementById("name");
  const email = document.getElementById("email");

  let valid = true;

  [mobile, name, email].forEach(input => {
    const error = input.nextElementSibling;

    if (!input.value.trim()) {
      input.classList.add("error-input");
      error.style.display = "block";
      valid = false;
    } else {
      input.classList.remove("error-input");
      error.style.display = "none";
    }
  });

  if (valid) {
    closeModal(); // success case
  }
};

/* Remove error while typing */
document.addEventListener("input", function (e) {
  if (e.target.closest(".assist-form input")) {
    e.target.classList.remove("error-input");
    e.target.nextElementSibling.style.display = "none";
  }
});

/* ================= MODAL VALIDATION (PHONE + EMAIL) ================= */

window.validateModal = function () {
  const mobile = document.getElementById("mobile");
  const name = document.getElementById("name");
  const email = document.getElementById("email");

  let valid = true;

  // Mobile number: exactly 10 digits
  const mobileRegex = /^[6-9]\d{9}$/;

  // Email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // ===== MOBILE =====
  if (!mobile.value.trim()) {
    showError(mobile, "Mobile number is required");
    valid = false;
  } else if (!mobileRegex.test(mobile.value.trim())) {
    showError(mobile, "Enter valid 10 digit mobile number");
    valid = false;
  } else {
    hideError(mobile);
  }

  // ===== NAME =====
  if (!name.value.trim()) {
    showError(name, "Name is required");
    valid = false;
  } else {
    hideError(name);
  }

  // ===== EMAIL =====
  if (!email.value.trim()) {
    showError(email, "Email is required");
    valid = false;
  } else if (!emailRegex.test(email.value.trim())) {
    showError(email, "Enter valid email address");
    valid = false;
  } else {
    hideError(email);
  }

  // SUCCESS
  if (valid) {
    closeModal();
    alert("Details submitted successfully!");
  }
};

// ===== Helper Functions =====
function showError(input, message) {
  input.classList.add("error-input");
  input.nextElementSibling.innerText = message;
  input.nextElementSibling.style.display = "block";
}

function hideError(input) {
  input.classList.remove("error-input");
  input.nextElementSibling.style.display = "none";
}

/* Remove error while typing */
document.addEventListener("input", function (e) {
  if (e.target.closest(".assist-form input")) {
    hideError(e.target);
  }
});


