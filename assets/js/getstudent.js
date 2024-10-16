document.addEventListener("DOMContentLoaded", function () {
  fetch("http://127.0.0.1:8000/student/students/")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("student-table-body");
      const noResultsDiv = document.getElementById("no-results");

      if (data.length === 0) {
        // Show the no-results message if there are no students
        noResultsDiv.style.display = "block";
      } else {
        // Hide the no-results message and display the table if there are students
        noResultsDiv.style.display = "none";

        data.forEach((student) => {
          const row = `
            <tr>
                <td class="py-3 ps-3">
                    <div class="flex items-center h-5">
                        <input type="checkbox" class="border-gray-300 rounded text-blue-600 focus:ring-blue-500">
                    </div>
                </td>
                <td class="p-3 whitespace-nowrap text-sm font-medium text-gray-800">
                    <img src="${student.img_url}" alt="${student.first_name} ${
            student.last_name
          }" class="w-10 h-10 rounded-full">
                </td>
                <td class="p-3 whitespace-nowrap text-sm font-medium text-gray-800">
                    ${student.first_name} ${student.last_name} ${
            student.other_name
          }
                </td>
                <td class="py-3 px-1 whitespace-nowrap text-sm text-gray-800">
                    ${student.registration_id}
                </td>
                <td class="py-3 px-1 whitespace-nowrap text-sm text-gray-800">
                    ${new Date(student.registration_date).toDateString()}
                </td>
                <td class="py-3 px-1 whitespace-nowrap text-sm text-gray-800">
                    ${student.parent}
                </td>
                <td class="py-3 px-1 whitespace-nowrap text-sm text-gray-800">
                    ${student.type}
                </td>
                <td class="p-3 whitespace-nowrap text-end text-sm font-medium">
                    <a id="view-teacher-details-${student.id}" href="#">
                        <img src="/assets/images/dots.svg" alt="dots" class="cursor-pointer self-end inline-flex">
                    </a>
                </td>
            </tr>
          `;
          tableBody.innerHTML += row;

          // Set the href for the dynamically created link
          const viewTeacherDetailsLink = document.getElementById(
            `view-teacher-details-${student.id}`
          );
          viewTeacherDetailsLink.setAttribute(
            "href",
            `student-profile.html?studentID=${student.id}`
          );
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching student data:", error);
    });
});
