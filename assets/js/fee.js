const modal = document.getElementById("class-creation-modal");
const closeModalBtn = document.getElementById("close-modal");

closeModalBtn.addEventListener("click", function () {
  modal.classList.add("hidden");
});

// Fetch payment type
// Function to toggle transaction input visibility based on selected payment method
function toggleTransactionInput() {
  const paymentMethod = document.getElementById("payment_method").value;
  const transactionInput = document.getElementById("transaction-input");

  if (paymentMethod === "POS" || paymentMethod === "TRANSFER") {
    transactionInput.style.display = "block";
  } else {
    transactionInput.style.display = "none";
    document.getElementById("transaction_number").value = ""; // Clear transaction number
  }
}

// Submit event listener for the payment creation form
