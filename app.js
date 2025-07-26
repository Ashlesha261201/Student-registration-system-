document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".Studentform");
    const nameInput = document.getElementById("name");
    const idInput = document.getElementById("student-id");
    const emailInput = document.getElementById("email");
    const contactInput = document.getElementById("contact");
    const tableBody = document.querySelector("#studentTable tbody");

    let students = JSON.parse(localStorage.getItem("students")) || [];
    let editIndex = -1;

    renderTable();

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = nameInput.value.trim();
        const studentId = idInput.value.trim();
        const email = emailInput.value.trim();
        const contact = contactInput.value.trim();

        // Validation
        if (!/^[a-zA-Z ]+$/.test(name)) {
            alert("Name must contain only letters.");
            return;
        }
        if (!/^[0-9]+$/.test(studentId)) {
            alert("Student ID must be a number.");
            return;
        }
        if (!/^[0-9]+$/.test(contact)) {
            alert("Contact Number must be a number.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Please enter a valid email.");
            return;
        }

        const newStudent = { name, studentId, email, contact };

        if (editIndex === -1) {
            // Add new
            students.push(newStudent);
        } else {
            // Edit existing
            students[editIndex] = newStudent;
            editIndex = -1;
        }

        // Reset form
        form.reset();
        renderTable();
    });

    window.editStudent = function(index) {
        const student = students[index];
        nameInput.value = student.name;
        idInput.value = student.studentId;
        emailInput.value = student.email;
        contactInput.value = student.contact;
        editIndex = index;
    };

    window.deleteStudent = function(index) {
        if (confirm("Are you sure you want to delete this record?")) {
            students.splice(index, 1);
            renderTable();
        }
    };

    function renderTable() {
        tableBody.innerHTML = "";

        students.forEach((student, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.studentId}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editStudent(${index})">Edit</button>
                    <button class="action-btn delete-btn" onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        localStorage.setItem("students", JSON.stringify(students));
    }
});