import { api } from "./api.js";

document
  .getElementById("payment-creation")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log("Form submitted!");

    const token = localStorage.getItem("authToken");

    const formData = new FormData();
    formData.append("payment_name",document.getElementById("payment_name").value);
    formData.append("grade", document.getElementById("class").value); // This now sends the name of the grade
    formData.append("term", document.getElementById("term").value); // This now sends the name of the term
    formData.append("amount", document.getElementById("amount").value);

    try {
      const response = await fetch(`${api}/payment/payment-types/`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        alert("Payment created successfully!");
        document.getElementById("payment-creation").reset(); // Reset form
        location.reload(); // Refresh page
      } else {
        const errorData = await response.json();
        console.error("Failed to create payment:", errorData);
        alert(`Failed to create payment: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error("An error occurred. Please try again later:", error);
      alert("An error occurred. Please try again later.");
    }
  });
