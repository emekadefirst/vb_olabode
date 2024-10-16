// x btn to close modal
const modal = document.getElementById("class-creation-modal");
const closeModalBtn = document.getElementById("close-modal");
closeModalBtn.addEventListener("click", function () {
  modal.classList.add("hidden");
});



// fetch payment type
document.addEventListener("DOMContentLoaded", function () {
    const parentSelect = document.getElementById("payment-type");

    async function fetchPaymentType() {
    try {
        const response = await fetch(
        "http://127.0.0.1:8000/payment/payment-types/",
        {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        }
        );

        if (response.ok) {
        const data = await response.json();
        data.forEach((type) => {
            const option = document.createElement("option");
            option.value = type.payment_name;
            option.textContent = type.payment_name;
            parentSelect.appendChild(option);
        });
        } else {
        console.error("Failed to fetch payment type");
        }
    } catch (error) {
        console.error("Error:", error);
    }
    }

    fetchPaymentType();
});


// make-payment api
// Function to toggle the transaction input field based on the selected payment method
function toggleTransactionInput() {
    const paymentMethod = document.getElementById("payment_method").value;
    const transactionInput = document.getElementById("transaction-input");

    // Show the transaction input if the payment method is POS or Transfer
    if (paymentMethod === "POS" || paymentMethod === "TRANSFER") {
        transactionInput.style.display = "block";
    } else {
        transactionInput.style.display = "none";
        document.getElementById("transaction_number").value = ""; // Clear transaction number if hidden
    }
}

// Submit event listener for the payment creation form
document.getElementById("payment-creation").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("payment_name", document.getElementById("payment-type").value); // Corrected ID
    formData.append("student", document.getElementById("student").value);
    formData.append("term", document.getElementById("term").value);
    formData.append("method", document.getElementById("payment_method").value); // Updated ID for payment method
    formData.append("amount_paid", document.getElementById("amount_paid").value);

    const paymentMethod = document.getElementById("payment_method").value;
    const transactionNumberInput = document.getElementById("transaction_number");

    // Append transaction number if the payment method is POS or Transfer
    if (paymentMethod === "POS" || paymentMethod === "TRANSFER") {
        formData.append("transaction_id", transactionNumberInput.value);

    }

    try {
        const response = await fetch("http://127.0.0.1:8000/payment/physical-payments/", {
            method: "POST",
            body: formData,
            headers: {},
        });

        if (response.ok) {
            const data = await response.json();
            alert("Payment successfully!");
            document.getElementById("payment-creation").reset();
            location.reload(); // Reset the correct form ID
            toggleTransactionInput(); // Reset the transaction input visibility
        } else {
            const errorData = await response.json();
            alert("Failed to save payment", errorData);
        }
    } catch (error) {
        console.error("An error occurred. Please try again later.", error);
        alert("An error occurred. Please try again later.");
    }
});


// fetch term
  document.addEventListener("DOMContentLoaded", function () {
    const parentSelect = document.getElementById("term");

    async function fetchTerm() {
      try {
        const response = await fetch("http://127.0.0.1:8000/term/all/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          data.forEach((type) => {
            const option = document.createElement("option");
            option.value = type.name;
            option.textContent = type.name;
            parentSelect.appendChild(option);
          });
        } else {
          console.error("Failed to fetch term");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchTerm();
  });

// fetch students
document.addEventListener("DOMContentLoaded", function () {
    const parentSelect = document.getElementById("student");

    async function fetctStudent() {
        try {
            const response = await fetch("http://127.0.0.1:8000/student/students/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                data.forEach((student) => {
                    const option = document.createElement("option");
                    option.value = student.registration_id;
                    option.textContent = `${student.first_name} ${student.last_name}${student.other_name}`;
                    parentSelect.appendChild(option);
                });
            } else {
                console.error("Failed to fetch payment type");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    fetctStudent();
});


function fetchPayments() {
    fetch('http://127.0.0.1:8000/payment/physical-payments/')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('paymentTableBody');
            tableBody.innerHTML = '';  // Clear existing content

            data.forEach(payment => {
                const row = `
                    <tr>
                        <td class="px-2 sm:px-5 py-2 sm:py-5 border-b border-gray-200 bg-white whitespace-nowrap">${payment.id}</td>
                        <td class="px-2 sm:px-5 py-2 sm:py-5 border-b border-gray-200 bg-white whitespace-nowrap">
                            ${payment.student.first_name} ${payment.student.last_name}
                        </td>
                        <td class="px-2 sm:px-5 py-2 sm:py-5 border-b border-gray-200 bg-white whitespace-nowrap">
                            ${payment.term.name}
                        </td>
                        <td class="px-2 sm:px-5 py-2 sm:py-5 border-b border-gray-200 bg-white whitespace-nowrap">
                            ${payment.payment_name.payment_name}
                        </td>
                        <td class="px-2 sm:px-5 py-2 sm:py-5 border-b border-gray-200 bg-white whitespace-nowrap">
                            &#8358;${payment.amount_paid}
                        </td>
                        <td class="px-2 sm:px-5 py-2 sm:py-5 border-b border-gray-200 bg-white whitespace-nowrap">
                            &#8358;${payment.balance}
                        </td>
                        <td class="px-2 sm:px-5 py-2 sm:py-5 border-b border-gray-200 bg-white whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                ${payment.status}
                            </span>
                        </td>
                        <td class="px-2 sm:px-5 py-2 sm:py-5 border-b border-gray-200 bg-white whitespace-nowrap">
                            ${payment.payment_id}
                        </td>
                        <td class="px-2 sm:px-5 py-2 sm:py-5 border-b border-gray-200 bg-white whitespace-nowrap">
                            ${payment.transaction_id}
                        </td>
                        <td class="px-2 sm:px-5 py-2 sm:py-5 border-b border-gray-200 bg-white whitespace-nowrap">
                            ${payment.method}
                        </td>
                        <td class="px-2 sm:px-5 py-2 sm:py-5 border-b border-gray-200 bg-white whitespace-nowrap">
                            ${new Date(payment.time).toLocaleString()}
                        </td>
                    </tr>
                `;
                tableBody.insertAdjacentHTML('beforeend', row);
            });
        })
        .catch(error => console.error('Error fetching payment data:', error));
}

window.onload = fetchPayments;
