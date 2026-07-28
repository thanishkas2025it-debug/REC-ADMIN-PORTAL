

let students = [

    {
        name: "Ananya Kumar",
        roll: "IT001",
        department: "IT",
        year: "1st Year",
        attendance: 92,
        status: "Active"
    },

    {
        name: "Rahul Sharma",
        roll: "CSE002",
        department: "CSE",
        year: "2nd Year",
        attendance: 88,
        status: "Active"
    },

    {
        name: "Priya S",
        roll: "ECE003",
        department: "ECE",
        year: "1st Year",
        attendance: 95,
        status: "Active"
    },

    {
        name: "Arjun Kumar",
        roll: "EEE004",
        department: "EEE",
        year: "3rd Year",
        attendance: 76,
        status: "Active"
    },

    {
        name: "Divya R",
        roll: "IT005",
        department: "IT",
        year: "4th Year",
        attendance: 68,
        status: "Inactive"
    }

];


// ==========================================
// LOAD STUDENTS
// ==========================================

function loadStudents(data = students) {

    const tableBody =
        document.getElementById("studentTableBody");

    tableBody.innerHTML = "";


    data.forEach((student, index) => {

        const firstLetter =
            student.name.charAt(0).toUpperCase();


        const attendanceClass =
            student.attendance >= 75
                ? "attendance-good"
                : "attendance-warning";


        const statusClass =
            student.status === "Active"
                ? "status-active"
                : "status-inactive";


        const row = document.createElement("tr");


        row.innerHTML = `

            <td>

                <div class="student-name">

                    <div class="student-avatar">

                        ${firstLetter}

                    </div>

                    <div>

                        <strong>
                            ${student.name}
                        </strong>

                        <small>
                            Student
                        </small>

                    </div>

                </div>

            </td>


            <td>
                ${student.roll}
            </td>


            <td>
                ${student.department}
            </td>


            <td>
                ${student.year}
            </td>


            <td>

                <span class="${attendanceClass}">

                    ${student.attendance}%

                </span>

            </td>


            <td>

                <span class="${statusClass}">

                    ${student.status}

                </span>

            </td>


            <td>

                <button
                    class="action-btn edit-btn"
                    onclick="editStudent(${index})">

                    <i class="fa-solid fa-pen"></i>

                </button>


                <button
                    class="action-btn delete-btn"
                    onclick="deleteStudent(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });


    document.getElementById("studentCount").textContent =
        data.length;

}


// ==========================================
// OPEN MODAL
// ==========================================

function openStudentModal() {

    document
        .getElementById("studentModal")
        .classList.add("show");


    document.getElementById("studentForm").reset();


    document.getElementById("editIndex").value = "";


    document.getElementById("modalTitle").textContent =
        "Add Student";

}


// ==========================================
// CLOSE MODAL
// ==========================================

function closeStudentModal() {

    document
        .getElementById("studentModal")
        .classList.remove("show");

}


// ==========================================
// ADD / EDIT STUDENT
// ==========================================

document
    .getElementById("studentForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("studentName").value.trim();

        const roll =
            document.getElementById("rollNumber").value.trim();

        const department =
            document.getElementById("studentDepartment").value;

        const year =
            document.getElementById("studentYear").value;

        const attendance =
            Number(
                document.getElementById("studentAttendance").value
            );

        const status =
            document.getElementById("studentStatus").value;


        const editIndex =
            document.getElementById("editIndex").value;


        const student = {

            name: name,

            roll: roll,

            department: department,

            year: year,

            attendance: attendance,

            status: status

        };


        // EDIT

        if (editIndex !== "") {

            students[editIndex] = student;

            alert("Student updated successfully!");

        }


        // ADD

        else {

            students.push(student);

            alert("Student added successfully!");

        }


        loadStudents();

        closeStudentModal();

    });


// ==========================================
// EDIT STUDENT
// ==========================================

function editStudent(index) {

    const student = students[index];


    document.getElementById("studentName").value =
        student.name;


    document.getElementById("rollNumber").value =
        student.roll;


    document.getElementById("studentDepartment").value =
        student.department;


    document.getElementById("studentYear").value =
        student.year;


    document.getElementById("studentAttendance").value =
        student.attendance;


    document.getElementById("studentStatus").value =
        student.status;


    document.getElementById("editIndex").value =
        index;


    document.getElementById("modalTitle").textContent =
        "Edit Student";


    document
        .getElementById("studentModal")
        .classList.add("show");

}


// ==========================================
// DELETE STUDENT
// ==========================================

function deleteStudent(index) {

    const student = students[index];


    const confirmDelete =
        confirm(
            `Delete ${student.name}?`
        );


    if (confirmDelete) {

        students.splice(index, 1);

        loadStudents();

        alert("Student deleted successfully!");

    }

}


// ==========================================
// SEARCH
// ==========================================

function searchStudents() {

    const searchValue =
        document
            .getElementById("searchStudent")
            .value
            .toLowerCase();


    const filtered =
        students.filter(student =>

            student.name
                .toLowerCase()
                .includes(searchValue)

            ||

            student.roll
                .toLowerCase()
                .includes(searchValue)

            ||

            student.department
                .toLowerCase()
                .includes(searchValue)

        );


    loadStudents(filtered);

}


// ==========================================
// DEPARTMENT FILTER
// ==========================================

function filterStudents() {

    const department =
        document
            .getElementById("departmentFilter")
            .value;


    if (department === "all") {

        loadStudents();

        return;

    }


    const filtered =
        students.filter(student =>

            student.department === department

        );


    loadStudents(filtered);

}


// ==========================================
// INITIAL LOAD
// ==========================================

loadStudents();