import { api } from "./api.js";

document
  .getElementById("add-payment")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log("Form submitted!");

    const token = localStorage.getItem("authToken");
    const amountInput = document.getElementById("amount_paid");
    const amountPaid = amountInput.value;

    console.log("Amount paid:", amountPaid, "Type:", typeof amountPaid); // Log amount and its type

    const formData = new FormData();
    formData.append(
      "payment_name",
      document.getElementById("payment-type").value
    );
    formData.append("student", document.getElementById("registrationId").value);
    formData.append("term", document.getElementById("term-add").value);
    formData.append("method", document.getElementById("payment_method").value);
    formData.append("amount_paid", document.getElementById("deposit").value); // Fixed the reference to the correct input

    const paymentMethod = document.getElementById("payment_method").value;
    const transactionNumberInput =
      document.getElementById("transaction_number");

    if (paymentMethod === "POS" || paymentMethod === "TRANSFER") {
      transactionNumberInput.setAttribute("required", "true");
      transactionNumberInput.style.display = "block"; // Ensure it's visible
      formData.append("transaction_id", transactionNumberInput.value);
    } else {
      transactionNumberInput.removeAttribute("required");
      transactionNumberInput.style.display = "none"; // Hide when not required
    }

    try {
      const response = await fetch(`${api}/payment/physical-payments/`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        alert("Payment successful!");
        document.getElementById("add-payment").reset(); // Reset form
        location.reload(); // Refresh page
      } else {
        const errorData = await response.json();
        alert(
          "Failed to save payment: " + (errorData.detail || "Unknown error")
        );
      }
    } catch (error) {
      console.error("An error occurred. Please try again later:", error);
      alert("An error occurred. Please try again later.");
    }
  });

// Toggle the transaction number input based on payment method selection
document
  .getElementById("payment_method")
  .addEventListener("change", function () {
    const transactionNumberInput =
      document.getElementById("transaction_number");
    if (this.value === "POS" || this.value === "TRANSFER") {
      transactionNumberInput.style.display = "block";
      transactionNumberInput.setAttribute("required", "true");
    } else {
      transactionNumberInput.style.display = "none";
      transactionNumberInput.removeAttribute("required");
    }
  });

// Log the current amount value on input change
document.getElementById("amount_paid").addEventListener("input", function () {
  console.log("Current amount value:", this.value);
});
