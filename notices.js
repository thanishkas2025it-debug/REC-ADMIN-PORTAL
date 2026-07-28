let notices = JSON.parse(
    localStorage.getItem("recNotices")
) || [

    {
        id: 1,
        title: "Semester Examination Schedule",
        description: "The semester examination schedule has been released. Students are requested to check the examination timetable.",
        priority: "important",
        department: "All",
        date: "2026-07-25"
    },

    {
        id: 2,
        title: "Attendance Shortage Alert",
        description: "Students with attendance below 75% are advised to contact their respective faculty mentors.",
        priority: "urgent",
        department: "All",
        date: "2026-07-24"
    },

    {
        id: 3,
        title: "Department Meeting",
        description: "A department meeting will be conducted for faculty members this week.",
        priority: "general",
        department: "IT",
        date: "2026-07-22"
    }

];


function saveNotices() {

    localStorage.setItem(
        "recNotices",
        JSON.stringify(notices)
    );

}


function renderNotices() {

    const container =
        document.getElementById("noticeContainer");

    const search =
        document.getElementById("noticeSearch")
            .value
            .toLowerCase();

    const filter =
        document.getElementById("noticeFilter").value;


    const filtered = notices.filter(notice => {

        const matchesSearch =
            notice.title.toLowerCase().includes(search) ||
            notice.description.toLowerCase().includes(search) ||
            notice.department.toLowerCase().includes(search);


        const matchesFilter =
            filter === "all" ||
            notice.priority === filter;


        return matchesSearch && matchesFilter;

    });


    container.innerHTML = "";


    if (filtered.length === 0) {

        container.innerHTML = `

            <div class="dashboard-card"
                 style="grid-column:1/-1;text-align:center">

                <i class="fa-solid fa-bell-slash"
                   style="font-size:30px;color:#aaa"></i>

                <p style="margin-top:10px;color:#999">
                    No notices found.
                </p>

            </div>

        `;

        return;

    }


    filtered
        .sort((a,b) => new Date(b.date) - new Date(a.date))
        .forEach(notice => {

            container.innerHTML += `

                <div class="notice-card">

                    <div class="notice-top">

                        <span class="
                            notice-priority
                            priority-${notice.priority}
                        ">

                            ${notice.priority.toUpperCase()}

                        </span>

                        <span class="notice-date">

                            ${formatDate(notice.date)}

                        </span>

                    </div>


                    <h3>
                        ${notice.title}
                    </h3>


                    <p>
                        ${notice.description}
                    </p>


                    <div class="notice-footer">

                        <span class="notice-department">

                            <i class="fa-solid fa-users"></i>

                            ${notice.department}

                        </span>


                        <div class="notice-actions">

                            <button
                                class="edit-notice"
                                onclick="editNotice(${notice.id})">

                                <i class="fa-solid fa-pen"></i>

                            </button>


                            <button
                                class="delete-notice"
                                onclick="deleteNotice(${notice.id})">

                                <i class="fa-solid fa-trash"></i>

                            </button>

                        </div>

                    </div>

                </div>

            `;

        });

}


function formatDate(date) {

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


function openNoticeModal(id = null) {

    document
        .getElementById("noticeModal")
        .classList.add("show");


    document
        .getElementById("noticeForm")
        .reset();


    document.getElementById("noticeId").value = "";


    document.getElementById("noticeDate").value =
        new Date().toISOString().split("T")[0];


    document.getElementById("modalTitle").textContent =
        "Add Notice";


    if (id !== null) {

        const notice =
            notices.find(n => n.id === id);

        if (!notice) return;


        document.getElementById("noticeId").value =
            notice.id;

        document.getElementById("noticeTitle").value =
            notice.title;

        document.getElementById("noticeDescription").value =
            notice.description;

        document.getElementById("noticePriority").value =
            notice.priority;

        document.getElementById("noticeDepartment").value =
            notice.department;

        document.getElementById("noticeDate").value =
            notice.date;

        document.getElementById("modalTitle").textContent =
            "Edit Notice";

    }

}


function closeNoticeModal() {

    document
        .getElementById("noticeModal")
        .classList.remove("show");

}


function editNotice(id) {

    openNoticeModal(id);

}


document
    .getElementById("noticeForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const id =
            document.getElementById("noticeId").value;


        const noticeData = {

            title:
                document.getElementById("noticeTitle").value.trim(),

            description:
                document.getElementById("noticeDescription").value.trim(),

            priority:
                document.getElementById("noticePriority").value,

            department:
                document.getElementById("noticeDepartment").value,

            date:
                document.getElementById("noticeDate").value

        };


        if (id) {

            const index =
                notices.findIndex(
                    n => n.id === Number(id)
                );

            notices[index] = {

                ...notices[index],
                ...noticeData

            };

        } else {

            notices.push({

                id: Date.now(),

                ...noticeData

            });

        }


        saveNotices();

        renderNotices();

        closeNoticeModal();

    });


function deleteNotice(id) {

    if (
        !confirm("Delete this notice?")
    ) return;


    notices =
        notices.filter(
            notice => notice.id !== id
        );


    saveNotices();

    renderNotices();

}


renderNotices();