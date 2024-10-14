// Fetch profile details from session storage
const profile_image = sessionStorage.getItem("profile_image");
const email = sessionStorage.getItem("email");
const first_name = sessionStorage.getItem("first_name");
const last_name = sessionStorage.getItem("last_name");
const fullname = `${first_name} ${last_name}`;

// Update the UI with profile details
const profileImageElement = document.getElementsByClassName(
  "shrink-0 size-[38px] rounded-full"
)[0];
const profileEmailElement = document.getElementsByClassName(
  "text-sm font-medium text-gray-800 dark:text-neutral-200"
)[0];
const fullnameElement = document.getElementById("user-fullname");

if (profile_image && profileImageElement) {
  profileImageElement.src = profile_image;
}

if (email && profileEmailElement) {
  profileEmailElement.textContent = email;
}

if (fullname && fullnameElement) {
  fullnameElement.textContent = fullname;
}

// Fetch total number of students
async function fetchStudentCount() {
  try {
    const StudentCount = await fetch(
      "http://127.0.0.1:8000/student/student-count/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (StudentCount.ok) {
      const studentCountData = await StudentCount.json();
      const count = studentCountData.count;

      const countElement = document.getElementById("student-count");
      if (countElement) {
        countElement.textContent = count;
      }
    } else {
      console.error("Failed to fetch student count");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Fetch total number of staff
async function fetchStaffCount() {
  try {
    const StaffCount = await fetch("http://127.0.0.1:8000/staff/staff-count/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (StaffCount.ok) {
      const staffCountData = await StaffCount.json();
      const count = staffCountData.count;

      const countElement = document.getElementById("staff-count");
      if (countElement) {
        countElement.textContent = count;
      }
    } else {
      console.error("Failed to fetch staff count");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Fetch total number of subject
async function fetchSubjectCount() {
  try {
    const SubjectCount = await fetch("http://127.0.0.1:8000/class/subjects/count/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (SubjectCount.ok) {
      const subjectCountData = await SubjectCount.json();
      const count = subjectCountData.count;

      const countElement = document.getElementById("subject-count");
      if (countElement) {
        countElement.textContent = count;
      }
    } else {
      console.error("Failed to fetch subject count");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Fetch total tuition 
async function totalTuition() {
  try {
    const total = await fetch("http://127.0.0.1:8000/payment/total-tuition/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (total.ok) {
      const totalData = await total.json();
      const sum = totalData.total_tuition_for_current_month;
      const perc = totalData.percentage_change;

      const sumElement = document.getElementById("total-sum");
      const percElement = document.getElementById("perc-increase");
      if (sumElement) {
        sumElement.textContent = sum;
      }
     if (percElement) {
       percElement.textContent = perc;
     }
    } else {
      console.error("Failed to revenue data");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the functions to fetch the student and staff counts on page load
totalTuition();
fetchSubjectCount();
fetchStudentCount();
fetchStaffCount();
