// =========================================
// EARLY WARNING SYSTEM
// =========================================

function calculateRisk(student) {

    let score = 0;

    // Attendance risk
    if (student.attendance < 65) {
        score += 3;
    } else if (student.attendance < 75) {
        score += 2;
    }

    // Academic risk
    if (student.marks < 50) {
        score += 3;
    } else if (student.marks < 65) {
        score += 2;
    } else if (student.marks < 75) {
        score += 1;
    }

    if (score >= 4) {

        return {
            level: "HIGH RISK",
            className: "risk-high",
            action: "Faculty intervention recommended"
        };

    }

    if (score >= 2) {

        return {
            level: "NEEDS ATTENTION",
            className: "risk-medium",
            action: "Monitor performance"
        };

    }

    return {
        level: "SAFE",
        className: "risk-safe",
        action: "Continue current progress"
    };
}


function loadEarlyWarnings() {

    const container =
        document.getElementById("riskStudents");

    if (!container) return;

    container.innerHTML = "";

    let highRisk = 0;

    dashboardStudents.forEach(student => {

        const risk = calculateRisk(student);

        if (risk.level === "HIGH RISK") {
            highRisk++;
        }

        container.innerHTML += `

            <div class="risk-student">

                <div class="risk-avatar">
                    ${student.name.charAt(0)}
                </div>

                <div class="risk-info">

                    <strong>
                        ${student.name}
                    </strong>

                    <small>
                        ${student.department}
                    </small>

                </div>

                <div class="risk-details">

                    <div class="risk-score ${risk.className}">
                        ${risk.level}
                    </div>

                    <div class="risk-action">
                        Attendance: ${student.attendance}%
                        · Marks: ${student.marks}%
                    </div>

                    <div class="risk-action">
                        ${risk.action}
                    </div>

                </div>

            </div>

        `;

    });

    document.getElementById("riskSummary").textContent =
        highRisk + " At Risk";
}


loadEarlyWarnings();
function loadDashboardNotices() {

    const container =
        document.getElementById("dashboardNotices");

    if (!container) return;


    const notices =
        JSON.parse(
            localStorage.getItem("recNotices")
        ) || [];


    const latest =
        notices
            .sort(
                (a, b) =>
                    new Date(b.date) -
                    new Date(a.date)
            )
            .slice(0, 3);


    container.innerHTML = "";


    latest.forEach(notice => {

        container.innerHTML += `

            <div style="
                padding:13px 0;
                border-bottom:1px solid #eee;
            ">

                <div style="
                    display:flex;
                    justify-content:space-between;
                    gap:10px;
                ">

                    <strong style="font-size:11px">
                        ${notice.title}
                    </strong>

                    <span style="
                        font-size:8px;
                        color:#5B2DA3;
                    ">
                        ${notice.priority.toUpperCase()}
                    </span>

                </div>

                <small style="
                    color:#999;
                    font-size:9px;
                ">
                    ${notice.department} · ${notice.date}
                </small>

            </div>

        `;

    });

}


loadDashboardNotices();