// ==========================================
// ATTENDANCE DATA
// ==========================================

let attendanceStudents = [

    {
        name: "Ananya Kumar",
        roll: "IT001",
        department: "IT",
        attendance: 92,
        present: true
    },

    {
        name: "Rahul Sharma",
        roll: "CSE002",
        department: "CSE",
        attendance: 88,
        present: true
    },

    {
        name: "Priya S",
        roll: "ECE003",
        department: "ECE",
        attendance: 95,
        present: true
    },

    {
        name: "Arjun Kumar",
        roll: "EEE004",
        department: "EEE",
        attendance: 76,
        present: false
    },

    {
        name: "Divya R",
        roll: "IT005",
        department: "IT",
        attendance: 68,
        present: false
    }

];


// ==========================================
// LOAD TABLE
// ==========================================

function loadAttendance(data = attendanceStudents) {

    const body =
        document.getElementById("attendanceTableBody");

    body.innerHTML = "";


    data.forEach((student, index) => {

        const letter =
            student.name.charAt(0).toUpperCase();


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>

                <div class="attendance-student">

                    <div class="attendance-avatar">
                        ${letter}
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
                ${student.attendance}%
            </td>


            <td>

                <div class="attendance-buttons">

                    <button
                        class="present-btn ${student.present ? "selected" : ""}"
                        onclick="markPresent(${index})">

                        <i class="fa-solid fa-check"></i>
                        Present

                    </button>


                    <button
                        class="absent-btn ${!student.present ? "selected" : ""}"
                        onclick="markAbsent(${index})">

                        <i class="fa-solid fa-xmark"></i>
                        Absent

                    </button>

                </div>

            </td>

        `;


        body.appendChild(row);

    });


    updateSummary();

}


// ==========================================
// PRESENT
// ==========================================

function markPresent(index) {

    attendanceStudents[index].present = true;

    loadAttendance();

}


// ==========================================
// ABSENT
// ==========================================

function markAbsent(index) {

    attendanceStudents[index].present = false;

    loadAttendance();

}


// ==========================================
// SUMMARY
// ==========================================

function updateSummary() {

    const present =
        attendanceStudents.filter(
            student => student.present
        ).length;


    const absent =
        attendanceStudents.length - present;


    const percentage =
        attendanceStudents.length === 0
            ? 0
            : Math.round(
                (present / attendanceStudents.length) * 100
            );


    document.getElementById("presentCount").textContent =
        present;


    document.getElementById("absentCount").textContent =
        absent;


    document.getElementById("percentage").textContent =
        percentage + "%";

}


// ==========================================
// SEARCH
// ==========================================

function searchAttendance() {

    const value =
        document
            .getElementById("attendanceSearch")
            .value
            .toLowerCase();


    const filtered =
        attendanceStudents.filter(student =>

            student.name.toLowerCase().includes(value)

            ||

            student.roll.toLowerCase().includes(value)

            ||

            student.department.toLowerCase().includes(value)

        );


    loadAttendance(filtered);

}


// ==========================================
// SAVE
// ==========================================

function saveAttendance() {

    const date =
        document.getElementById("attendanceDate").value;


    if (!date) {

        alert("Please select a date.");

        return;

    }


    alert(
        "Attendance saved successfully for " + date
    );

}


// ==========================================
// DEFAULT DATE
// ==========================================

document.getElementById("attendanceDate").value =
    new Date().toISOString().split("T")[0];


// INITIAL LOAD

loadAttendance();