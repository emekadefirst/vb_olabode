import { api } from "./api.js";

const token = localStorage.getItem("authToken");
const eventsPerPage = 3;
let currentPage = 1;

async function fetchEvents(page = 1) {
  try {
    const response = await fetch(
      `${api}/program/events/?page=${page}&limit=${eventsPerPage}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data); // Check the data structure in the console
      renderEvents(data.events); // Access events array from data
      renderPagination(data.count); // Call function to render pagination
    } else {
      console.error("Error fetching events:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

function renderEvents(events) {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = ""; // Clear existing rows

  events.forEach((event) => {
    const dateObj = new Date(event.date);
    const createdAtObj = new Date(event.created_at);

    const row = `
      <tr>
        <td class="py-1 px-3">
          <input type="checkbox" class="border-gray-300 rounded text-blue-600 focus:ring-blue-500">
        </td>
        <td class="py-1">${event.name}</td>
        <td class="py-1">${dateObj.toLocaleDateString()}</td>
        <td class="py-1">${dateObj.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}</td>
        <td class="py-1">${createdAtObj.toLocaleDateString()}</td>
      </tr>
    `;
    tableBody.insertAdjacentHTML("beforeend", row);
  });
}

function renderPagination(totalCount) {
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = ""; // Clear existing pagination

  const totalPages = Math.ceil(totalCount / eventsPerPage);

  if (currentPage > 1) {
    paginationContainer.insertAdjacentHTML(
      "beforeend",
      `<a href="#" class="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-200 rounded hover:bg-gray-100 hover:text-gray-700" data-page="${
        currentPage - 1
      }">
          <i class="fa fa-chevron-left"></i>
        </a>`
    );
  }

  for (let i = 1; i <= totalPages; i++) {
    paginationContainer.insertAdjacentHTML(
      "beforeend",
      `<a href="#" class="px-3 py-2 text-sm ${
        currentPage === i
          ? "text-white bg-blue-600 border border-blue-600"
          : "text-gray-500 bg-white border border-gray-200"
      } rounded hover:bg-gray-100" data-page="${i}">${i}</a>`
    );
  }

  if (currentPage < totalPages) {
    paginationContainer.insertAdjacentHTML(
      "beforeend",
      `<a href="#" class="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-200 rounded hover:bg-gray-100 hover:text-gray-700" data-page="${
        currentPage + 1
      }">
          <i class="fa fa-chevron-right"></i>
        </a>`
    );
  }

  // Add click event listeners for pagination links
  document.querySelectorAll(".pagination a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const page = parseInt(event.target.dataset.page);
      currentPage = page; // Update currentPage
      fetchEvents(page); // Fetch events for the new page
    });
  });
}

// Ensure the DOM is ready before fetching
document.addEventListener("DOMContentLoaded", () => {
  fetchEvents(currentPage); // Initial fetch for the first page
});
