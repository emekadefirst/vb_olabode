
function getCSRFToken() {
    let csrfToken = null;
    const cookies = document.cookie.split(";");
    cookies.forEach((cookie) => {
        const trimmedCookie = cookie.trim();
        if (trimmedCookie.startsWith("csrftoken=")) {
            csrfToken = trimmedCookie.split("=")[1];
        }
    });
    return csrfToken;
}

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const admin_id = document.getElementById("adminID").value;
    const password = document.getElementById("password").value;
    const csrfToken = getCSRFToken();

    // Check if fields are not empty
    if (!admin_id || !password) {
        alert("Please fill in all fields");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:8000/subadmin/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
            },
            body: JSON.stringify({ admin_id, password }),
        });

        if (response.ok) {
            const data = await response.json();
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("admin_id", data.user.admin_id);
            sessionStorage.setItem("username", data.user.username);
            sessionStorage.setItem("email", data.user.email);
            sessionStorage.setItem("first_name", data.user.first_name);
            sessionStorage.setItem("last_name", data.user.last_name);
            sessionStorage.setItem("profile_image", data.user.profile_image);
            alert("Login successful!")
            window.location.href = "dashboard.html";
        } else {
            alert("Login failed. Please check your credentials.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    }
});

