// ==========================================
// MARKS DATA
// ==========================================

let marks = [

    {
        name: "Ananya Kumar",
        roll: "IT001",
        subject: "Java",
        internal1: 22,
        internal2: 23,
        assignment: 9
    },

    {
        name: "Rahul Sharma",
        roll: "CSE002",
        subject: "Python",
        internal1: 20,
        internal2: 21,
        assignment: 8
    },

    {
        name: "Priya S",
        roll: "ECE003",
        subject: "DBMS",
        internal1: 24,
        internal2: 23,
        assignment: 10
    },

    {
        name: "Arjun Kumar",
        roll: "EEE004",
        subject: "Mathematics",
        internal1: 18,
        internal2: 19,
        assignment: 7
    },

    {
        name: "Divya R",
        roll: "IT005",
        subject: "Java",
        internal1: 15,
        internal2: 17,
        assignment: 7
    }

];


// ==========================================
// CALCULATE TOTAL
// ==========================================

function getTotal(mark) {

    return mark.internal1 +
           mark.internal2 +
           mark.assignment;

}


// ==========================================
// GET GRADE
// ==========================================

function getGrade(total) {

    if (total >= 50) return "A";

    if (total >= 40) return "B";

    if (total >= 30) return "C";

    return "D";

}


// ==========================================
// LOAD TABLE
// ==========================================

function loadMarks(data = marks) {

    const body =
        document.getElementById("marksTableBody");

    body.innerHTML = "";


    data.forEach((mark, index) => {

        const total = getTotal(mark);

        const grade = getGrade(total);

        const letter =
            mark.name.charAt(0).toUpperCase();


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>

                <div class="mark-student">

                    <div class="mark-avatar">
                        ${letter}
                    </div>

                    <div>

                        <strong>
                            ${mark.name}
                        </strong>

                        <small>
                            Student
                        </small>

                    </div>

                </div>

            </td>


            <td>${mark.roll}</td>

            <td>${mark.subject}</td>

            <td>${mark.internal1}</td>

            <td>${mark.internal2}</td>

            <td>${mark.assignment}</td>

            <td><strong>${total}</strong></td>

            <td>

                <span class="grade grade-${grade}">
                    ${grade}
                </span>

            </td>


            <td>

                <button
                    class="action-btn delete-btn"
                    onclick="deleteMark(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        `;


        body.appendChild(row);

    });


    updateSummary();

}


// ==========================================
// SUMMARY
// ==========================================

function updateSummary() {

    if (marks.length === 0) {

        document.getElementById("totalStudents").textContent = 0;
        document.getElementById("averageMarks").textContent = "0%";
        document.getElementById("highestMarks").textContent = "0%";

        return;
    }


    const percentages =
        marks.map(mark => {

            const total = getTotal(mark);

            return (total / 60) * 100;

        });


    const average =
        percentages.reduce(
            (a, b) => a + b,
            0
        ) / percentages.length;


    const highest =
        Math.max(...percentages);


    document.getElementById("totalStudents").textContent =
        marks.length;


    document.getElementById("averageMarks").textContent =
        Math.round(average) + "%";


    document.getElementById("highestMarks").textContent =
        Math.round(highest) + "%";

}


// ==========================================
// OPEN MODAL
// ==========================================

function openMarksModal() {

    document
        .getElementById("marksModal")
        .classList.add("show");

}


// ==========================================
// CLOSE MODAL
// ==========================================

function closeMarksModal() {

    document
        .getElementById("marksModal")
        .classList.remove("show");

}


// ==========================================
// ADD MARKS
// ==========================================

document
    .getElementById("marksForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const newMark = {

            name:
                document.getElementById("markStudent").value,

            roll:
                document.getElementById("markRoll").value,

            subject:
                document.getElementById("markSubject").value,

            internal1:
                Number(
                    document.getElementById("internal1").value
                ),

            internal2:
                Number(
                    document.getElementById("internal2").value
                ),

            assignment:
                Number(
                    document.getElementById("assignment").value
                )

        };


        marks.push(newMark);


        loadMarks();


        document.getElementById("marksForm").reset();


        closeMarksModal();


        alert("Marks added successfully!");

    });


// ==========================================
// DELETE
// ==========================================

function deleteMark(index) {

    if (
        confirm(
            "Are you sure you want to delete these marks?"
        )
    ) {

        marks.splice(index, 1);

        loadMarks();

    }

}


// ==========================================
// SEARCH
// ==========================================

function searchMarks() {

    const value =
        document
            .getElementById("markSearch")
            .value
            .toLowerCase();


    const filtered =
        marks.filter(mark =>

            mark.name.toLowerCase().includes(value)

            ||

            mark.roll.toLowerCase().includes(value)

            ||

            mark.subject.toLowerCase().includes(value)

        );


    loadMarks(filtered);

}


// ==========================================
// FILTER
// ==========================================

function filterMarks() {

    const subject =
        document.getElementById("subjectFilter").value;


    if (subject === "all") {

        loadMarks();

        return;

    }


    const filtered =
        marks.filter(mark =>
            mark.subject === subject
        );


    loadMarks(filtered);

}


// INITIAL LOAD

loadMarks();