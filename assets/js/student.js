
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('imageUploadContainer');
    const fileInput = document.getElementById('fileInput');
    const imagePreview = document.getElementById('imagePreview');
    const uploadIcon = document.getElementById('uploadIcon');

    // Function to handle file selection
    function handleFileSelect(file) {
        if (file && file.type.startsWith('image/')) {
            if (file.size <= 2 * 1024 * 1024) { // 2MB limit
                const reader = new FileReader();
                reader.onload = function (e) {
                    imagePreview.src = e.target.result;
                    imagePreview.classList.remove('hidden');
                    uploadIcon.classList.add('hidden');
                };
                reader.readAsDataURL(file);
            } else {
                alert('File is too large. Please select an image under 2MB.');
            }
        } else {
            alert('Please select a valid image file.');
        }
    }

    // Click to upload
    container.addEventListener('click', function () {
        fileInput.click();
    });

    fileInput.addEventListener('change', function (e) {
        handleFileSelect(e.target.files[0]);
    });

    // Drag and drop functionality
    container.addEventListener('dragover', function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.add('border-blue-500');
    });

    container.addEventListener('dragleave', function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.remove('border-blue-500');
    });

    container.addEventListener('drop', function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.remove('border-blue-500');
        handleFileSelect(e.dataTransfer.files[0]);
    });
});


document
  .getElementById("studentEnrollmentForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();


    const fileInput = document.getElementById("fileInput").files[0];
    if (fileInput && fileInput.size > 2 * 1024 * 1024) {
      alert("Profile photo must be less than 2MB.");
      return;
    }

    const formData = new FormData();
    formData.append("upload", fileInput); 
    formData.append("type", document.getElementById("studentType").value);
    formData.append("first_name", document.getElementById("firstName").value); 
    formData.append("other_name",document.getElementById("otherName").value); 
    formData.append("last_name", document.getElementById("lastName").value); 
    formData.append("date_of_birth",document.getElementById("dateOfBirth").value); 
    formData.append("gender", document.getElementById("gender").value); 
    formData.append("parent", document.getElementById("parent_select").value); 
    formData.append("religion",document.getElementById("religion").value ); 
    formData.append("home_address",document.getElementById("homeAddress").value); 
    formData.append("local_government_area",document.getElementById("lga").value); 
    formData.append("state_of_origin",document.getElementById("stateOfOrigin").value); 
    formData.append("nationality",document.getElementById("nationality").value); 

    try {
      const response = await fetch("http://127.0.0.1:8000/student/students/", {
        method: "POST",
        body: formData,
        headers: {
          "X-CSRFToken": getCSRFToken(),
        },
      });

      if (response.ok) {
        const data = await response.json();
        alert("Student enrolled successfully!");
        document.getElementById("studentEnrollmentForm").reset(); 
      } else {
        const errorData = await response.json();
        alert("Failed to enroll student. Error: " + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  });

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


