document.getElementById("logout").addEventListener("click", function(event) {
    event.preventDefault(); 
    localStorage.removeItem("authToken");
    localStorage.removeItem("admin_id");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("profile_image"); 
    alert("You have logged out successfully."); 
    
    window.location.href = "/"; 
});
