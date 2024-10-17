
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const admin_id = document.getElementById("adminID").value;
  const password = document.getElementById("password").value;

  // Check if fields are not empty
  if (!admin_id || !password) {
    alert("Please fill in all fields");
    return;
  }

  try {
    const response = await fetch(
      "https://verbumdei-management-system-vms.onrender.com/subadmin/login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ admin_id, password }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("admin_id", data.user.admin_id);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("first_name", data.user.first_name);
      localStorage.setItem("last_name", data.user.last_name);
      localStorage.setItem("profile_image", data.user.profile_image);
      alert("Login successful!");
      window.location.href = "dashboard.html";
    } else {
      alert("Login failed. Please check your credentials.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again later.");
  }
});
