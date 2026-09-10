const saved = JSON.parse(localStorage.getItem('hackathonUser') || 'null');


document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function(event) {

            event.preventDefault();

            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value;
            const error = document.getElementById("loginError");

            // ADMIN ACCOUNT
            if (
                email === "admin@lspu.edu.ph" &&
                password === "admin123"
            ) {

                localStorage.setItem("userRole", "admin");
                localStorage.setItem(
                    "hackathonUser",
                    JSON.stringify({
                        name: "LSPU Admin",
                        email: email,
                        role: "admin"
                    })
                );

                window.location.href = "admin.html";
                return;
            }

            // STUDENT ACCOUNT
            if (
                email === "student@lspu.edu.ph" &&
                password === "student123"
            ) {

                localStorage.setItem("userRole", "student");
                localStorage.setItem(
                    "hackathonUser",
                    JSON.stringify({
                        name: "Student Participant",
                        email: email,
                        student: "2026-00001",
                        course: "BSIT - 2C",
                        team: "Team Innovate",
                        role: "student"
                    })
                );

                window.location.href = "dashboard.html";
                return;
            }

            // INVALID LOGIN
            error.textContent =
                "Invalid email or password. Please check your login details.";

        });
    }

const calendarDates = document.querySelectorAll(".calendar button");
const selectedDate = document.getElementById("selectedDate");

calendarDates.forEach(function (dateButton) {
    dateButton.addEventListener("click", function () {

        calendarDates.forEach(function (button) {
            button.classList.remove("selected-day");
        });

        this.classList.add("selected-day");

        const date = this.dataset.date;
        const parts = date.split(" ");

        const month = parts[0].substring(0, 3).toUpperCase();
        const day = parts[1].replace(",", "");

        selectedDate.textContent = month + " " + day;

        localStorage.setItem("selectedDate", date);
    });
});




  const reg = document.getElementById('registerForm');
  if (reg) reg.addEventListener('submit', e => {
    e.preventDefault();
    const user = {
      name: document.getElementById('regName').value,
      student: document.getElementById('regStudent').value,
      email: document.getElementById('regEmail').value,
      course: document.getElementById('regCourse').value,
      team: document.getElementById('regTeam').value
    };
    localStorage.setItem('hackathonUser', JSON.stringify(user));
    alert('Account created successfully! Welcome to the hackathon.');
    location.href = 'dashboard.html';
  });

  const name = document.getElementById('dashName');
  if (name && saved) {
    name.textContent = saved.name;
    const map = {dashTeam:saved.team,detailName:saved.name,detailStudent:saved.student || '—',detailCourse:saved.course || '—',detailTeam:saved.team};
    Object.entries(map).forEach(([id,val]) => {const el=document.getElementById(id); if(el) el.textContent=val;});
  }

  const logout = document.getElementById('logoutBtn');
  if (logout) logout.onclick = () => { localStorage.removeItem('hackathonUser'); location.href='index.html'; };

  let selectedSlot = null;
  document.querySelectorAll('.slots button[data-slot]').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.slots button').forEach(b=>b.classList.remove('selected'));
    btn.classList.add('selected'); selectedSlot=btn.dataset.slot;
  }));
  const reserve = document.getElementById('reserveBtn');
  if (reserve) reserve.onclick = () => {
    const msg = document.getElementById('reserveMessage');
    if (!selectedSlot) { msg.textContent='Please select an available slot first.'; msg.style.color='#fbbf24'; return; }
    localStorage.setItem('reservation', selectedSlot);
    const dash = document.getElementById('dashReservation');
    if(dash) dash.textContent=selectedSlot;
    msg.textContent = `Reservation confirmed for ${selectedSlot}.`;
    msg.style.color='var(--green)';
  };
  const currentReservation = localStorage.getItem('reservation');
  const dashReservation = document.getElementById('dashReservation');
  if(dashReservation && currentReservation) dashReservation.textContent=currentReservation;

  /* =========================================
   RESERVATION SYSTEM
   ========================================= */

const calendar =
    document.getElementById("calendar");

const calendarTitle =
    document.getElementById("calendarTitle");

const prevMonth =
    document.getElementById("prevMonth");

const nextMonth =
    document.getElementById("nextMonth");

const selectedDateBadge =
    document.getElementById("selectedDateBadge");

const slotsContainer =
    document.getElementById("slots");

const reserveBtn =
    document.getElementById("reserveBtn");

const reserveMessage =
    document.getElementById("reserveMessage");


if (
    calendar &&
    calendarTitle &&
    prevMonth &&
    nextMonth &&
    selectedDateBadge &&
    slotsContainer &&
    reserveBtn
) {

    /*
        Current calendar month.

        Starts at September 2026.
    */

    let currentMonth = 8;
    let currentYear = 2026;


    /*
        Selected date.

        Starts at September 20, 2026.
    */

    let selectedDate =
        "September 20, 2026";


    let selectedSlot = null;


    /*
        Saved reservations.

        Only September 20,
        10:00 AM is reserved
        by default.
    */

    let reservations =
        JSON.parse(
            localStorage.getItem(
                "hackathonReservations"
            )
        ) || {

            "September 20, 2026": [
                "10:00 AM"
            ]

        };


    /*
        Save reservations.
    */

    function saveReservations() {

        localStorage.setItem(
            "hackathonReservations",
            JSON.stringify(reservations)
        );

    }


    /*
        Get reservations for a specific date.
    */

    function getReservationsForDate(date) {

        return reservations[date] || [];

    }


    /*
        Format the date for the badge.

        Example:

        September 20, 2026
        becomes

        SEPT 20
    */

    function formatBadgeDate(dateString) {

        const date =
            new Date(dateString);


        const month =
            date
                .toLocaleString(
                    "en-US",
                    {
                        month: "short"
                    }
                )
                .toUpperCase();


        const day =
            date.getDate();


        return `${month} ${day}`;

    }


    /*
        Format a full date.

        Example:

        September 21, 2026
    */

    function formatFullDate(
        year,
        month,
        day
    ) {

        const date =
            new Date(
                year,
                month,
                day
            );


        return date.toLocaleDateString(
            "en-US",
            {
                month: "long",
                day: "numeric",
                year: "numeric"
            }
        );

    }


    /*
        Generate the calendar.
    */

    function generateCalendar() {

        calendar.innerHTML = "";


        const firstDay =
            new Date(
                currentYear,
                currentMonth,
                1
            ).getDay();


        const daysInMonth =
            new Date(
                currentYear,
                currentMonth + 1,
                0
            ).getDate();


        /*
            Update month title.
        */

        calendarTitle.textContent =
            new Date(
                currentYear,
                currentMonth,
                1
            ).toLocaleDateString(
                "en-US",
                {
                    month: "long",
                    year: "numeric"
                }
            );


        /*
            Empty spaces before
            the first day.
        */

        for (
            let i = 0;
            i < firstDay;
            i++
        ) {

            const empty =
                document.createElement("span");

            calendar.appendChild(empty);

        }


        /*
            Generate every day.
        */

        for (
            let day = 1;
            day <= daysInMonth;
            day++
        ) {

            const button =
                document.createElement("button");


            button.type = "button";


            const date =
                formatFullDate(
                    currentYear,
                    currentMonth,
                    day
                );


            button.dataset.date =
                date;


            button.textContent =
                day;


            /*
                Keep the selected date highlighted.
            */

            if (date === selectedDate) {

                button.classList.add(
                    "selected-day"
                );

            }


            /*
                Click a date.
            */

            button.addEventListener(
                "click",
                function () {

                    document
                        .querySelectorAll(
                            ".calendar button"
                        )
                        .forEach(
                            dayButton => {

                                dayButton
                                    .classList
                                    .remove(
                                        "selected-day"
                                    );

                            }
                        );


                    this.classList.add(
                        "selected-day"
                    );


                    selectedDate =
                        this.dataset.date;


                    selectedSlot = null;


                    selectedDateBadge.textContent =
                        formatBadgeDate(
                            selectedDate
                        );


                    if (reserveMessage) {

                        reserveMessage.textContent =
                            "";

                    }


                    updateSlots();

                }
            );


            calendar.appendChild(button);

        }

    }


    /*
        Previous month.
    */

    prevMonth.addEventListener(
        "click",
        function () {

            currentMonth--;


            if (currentMonth < 0) {

                currentMonth = 11;
                currentYear--;

            }


            generateCalendar();

        }
    );


    /*
        Next month.
    */

    nextMonth.addEventListener(
        "click",
        function () {

            currentMonth++;


            if (currentMonth > 11) {

                currentMonth = 0;
                currentYear++;

            }


            generateCalendar();

        }
    );


    /*
        Update available slots
        according to selected date.
    */

    function updateSlots() {

        const reservedSlots =
            getReservationsForDate(
                selectedDate
            );


        const slotButtons =
            slotsContainer.querySelectorAll(
                "button[data-slot]"
            );


        slotButtons.forEach(
            button => {

                const slot =
                    button.dataset.slot;


                const status =
                    button.querySelector("span");


                button.classList.remove(
                    "taken",
                    "slot-selected"
                );


                button.disabled = false;


                if (
                    reservedSlots.includes(slot)
                ) {

                    button.classList.add(
                        "taken"
                    );


                    button.disabled = true;


                    status.textContent =
                        "Reserved";

                } else {

                    status.textContent =
                        "Available";

                }

            }
        );

    }


    /*
        Select a time slot.
    */

    const slotButtons =
        slotsContainer.querySelectorAll(
            "button[data-slot]"
        );


    slotButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                function () {

                    if (this.disabled) {
                        return;
                    }


                    slotButtons.forEach(
                        slot => {

                            slot.classList.remove(
                                "slot-selected"
                            );

                        }
                    );


                    this.classList.add(
                        "slot-selected"
                    );


                    selectedSlot =
                        this.dataset.slot;


                    if (reserveMessage) {

                        reserveMessage.textContent =
                            "";

                    }

                }
            );

        }
    );


    /*
        Reserve selected slot.
    */

    reserveBtn.addEventListener(
        "click",
        function () {

            if (!selectedSlot) {

                reserveMessage.textContent =
                    "Please select an available time slot first.";

                return;

            }


            if (!reservations[selectedDate]) {

                reservations[selectedDate] = [];

            }


            if (
                reservations[selectedDate]
                    .includes(selectedSlot)
            ) {

                reserveMessage.textContent =
                    "This slot is already reserved.";

                updateSlots();

                return;

            }


            /*
                Store the reservation
                under the selected date.
            */

            reservations[selectedDate].push(
                selectedSlot
            );


            saveReservations();


            reserveMessage.textContent =
                `Successfully reserved ${selectedSlot} on ${selectedDate}.`;


            selectedSlot = null;


            updateSlots();

        }
    );


    /*
        Initial calendar.
    */

    generateCalendar();


    /*
        Initial selected date.
    */

    selectedDateBadge.textContent =
        formatBadgeDate(
            selectedDate
        );


    updateSlots();

}
});
