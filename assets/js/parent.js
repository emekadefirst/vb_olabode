document.getElementById('parentForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const form = this;
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    fetch('http://127.0.0.1:8000/parent/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            alert('Form submitted successfully!');
                form.reset();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
});


document.addEventListener('DOMContentLoaded', function() {
    const parentSelect = document.getElementById('parent_select');

    async function fetchParents() {
        try {
            const response = await fetch("http://127.0.0.1:8000/parent/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                
      
                data.forEach(parent => {
                    const option = document.createElement('option');
                    option.value = parent.parent_name; 
                    option.textContent = parent.parent_name;
                    parentSelect.appendChild(option);
                });
            } else {
                console.error('Failed to fetch parents');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    fetchParents();
});


