document.addEventListener("DOMContentLoaded", function () {
  const parentSelect = document.getElementById("teacher");

  async function fetchTeacher() {
    try {
      const response = await fetch("http://127.0.0.1:8000/staff/staff", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        data.forEach((teacher) => {
          const option = document.createElement("option");
          option.value = teacher.id;
          option.textContent = `${teacher.first_name} ${teacher.last_name}`;
          parentSelect.appendChild(option);
        });
      } else {
        console.error("Failed to fetch parents");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  fetchTeacher();
});

document
  .getElementById("class-creation")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get the form inputs
    const className = document.getElementById("name").value;
    const teacherName = document.getElementById("teacher").value;

    // Validation: Check if class name or teacher name is empty
    if (!className || !teacherName) {
      alert("Class name and teacher name are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", className);
    formData.append("teacher", teacherName);

    try {
      const response = await fetch("http://127.0.0.1:8000/class/classes/", {
        method: "POST",
        body: formData,
        headers: {
          // Add necessary headers if needed, for example:
          // 'X-CSRFToken': csrftoken,  (for Django CSRF protection)
        },
      });

      if (response.ok) {
        const data = await response.json();
        alert("Class created successfully!");
        document.getElementById("class-creation").reset(); // Reset the form on success
      } else {
        const errorData = await response.json();

        // Handling errorData.teacher, which may be an array
        if (
          Array.isArray(errorData.teacher) &&
          errorData.teacher.length === 0
        ) {
          alert("No teacher assigned.");
        } else if (Array.isArray(errorData.teacher)) {
          alert(errorData.teacher.join(", ")); // Show the teacher errors nicely
        } else {
          alert("An error occurred: " + JSON.stringify(errorData));
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  });



document
  .getElementById("subject-creation")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", document.getElementById("name").value);
    formData.append("teacher", document.getElementById("teacher").value);

    try {
      const response = await fetch("http://127.0.0.1:8000/class/subjects/", {
        method: "POST",
        body: formData,
        headers: {},
      });

      if (response.ok) {
        const data = await response.json();
        alert("Subject ecreated successfully!");
        document.getElementById("class-creation").reset();
      } else {
        const errorData = await response.json();
        alert("Failed to Create subject");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  });