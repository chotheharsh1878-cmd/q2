// This file controls the mobile menu and validates the registration form.
document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".menu-button");
  const navigation = document.querySelector(".main-nav");
  const form = document.getElementById("registrationForm");
  const successMessage = document.getElementById("successMessage");

  // Open and close the navigation menu on small screens.
  menuButton.addEventListener("click", function () {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.textContent = isOpen ? "×" : "☰";
  });

  // Close the mobile menu after selecting a navigation link.
  navigation.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "☰";
    });
  });

  // Shows an error below a specific form field.
  function showError(field, message) {
    const group = field.closest(".form-group");
    group.classList.add("invalid");
    group.querySelector(".error-message").textContent = message;
  }

  // Clears the error shown for a field.
  function clearError(field) {
    const group = field.closest(".form-group");
    group.classList.remove("invalid");
    group.querySelector(".error-message").textContent = "";
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Keep the visitor on this page after submission.
    successMessage.classList.remove("visible");

    const name = form.elements.name;
    const email = form.elements.email;
    const phone = form.elements.phone;
    const session = form.elements.session;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    // Validate each required field. trim() removes accidental spaces.
    if (name.value.trim() === "") { showError(name, "Please enter your full name."); isValid = false; } else { clearError(name); }
    if (email.value.trim() === "") { showError(email, "Please enter your email address."); isValid = false; }
    else if (!emailPattern.test(email.value.trim())) { showError(email, "Please enter a valid email address."); isValid = false; }
    else { clearError(email); }
    if (phone.value.trim() === "") { showError(phone, "Please enter your phone number."); isValid = false; } else { clearError(phone); }
    if (session.value === "") { showError(session, "Please select a preferred session."); isValid = false; } else { clearError(session); }

    // A valid form displays a message without reloading the browser page.
    if (isValid) {
      successMessage.textContent = "Thank you, " + name.value.trim() + "! Your registration has been received.";
      successMessage.classList.add("visible");
      form.reset();
    }
  });
});
