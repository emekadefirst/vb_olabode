import { api } from "./api.js";

const loginForm = document.getElementById("loginForm");
const loginButton = document.getElementById("loginButton");
const loginSuccessAlert = document.getElementById("loginSuccessAlert");

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const admin_id = document.getElementById("adminID").value;
  const password = document.getElementById("password").value;

  // Check if fields are not empty
  if (!admin_id || !password) {
    alert("Please fill in all fields");
    return;
  }

  // Change button text to spinner
  loginButton.innerHTML = `
    <svg class="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 019.293-7.293 1 1 0 01.707 1.707A6 6 0 106 12H4z"></path>
    </svg>
  `;
  loginButton.disabled = true; // Disable button during loading

  try {
    const response = await fetch(`${api}/subadmin/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ admin_id, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("admin_id", data.user.admin_id);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("first_name", data.user.first_name);
      localStorage.setItem("last_name", data.user.last_name);
      localStorage.setItem("profile_image", data.user.profile_image);

      // Show Preline success alert
      loginSuccessAlert.classList.remove("hidden");

      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 2000);
    } else {
      alert("Login failed. Please check your credentials.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again later.");
  } finally {
    // Restore button text and state
    loginButton.innerHTML = "Login";
    loginButton.disabled = false;
  }
});
