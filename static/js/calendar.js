let today           = new Date();
let dayNames        = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let currentDay      = dayNames[today.getDay()];
let monthNames      = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let currentMonth    = monthNames[today.getMonth()];
let currentYear     = today.getFullYear();
let monthNum        = today.getMonth() + 1;
if (monthNum < 10) {
  monthNum = '0' + monthNum;
}
let todayString     = currentYear + '-' + monthNum + '-' + today.getDate();

function initialize() {
  // ***
  // Sets up the initial load 
  // ***

  console.log('Page is being initialized');

  buildDay();
  buildWeek();

  let dateHeader          = document.getElementById("dateHeader");
  dateHeader.innerHTML    = today.toDateString();
  let weekDate            = document.getElementById("weekDate");
  weekDate.innerHTML      = generateWeek(today);
  let monthName           = document.getElementById("monthName");
  monthName.innerHTML     = currentMonth;

  changeView('day');
}

function changeView(view) {
  // ***
  // Changes the view on the main
  // ***

  // Hide all calendars
  let day     = document.getElementById("dayCalendar");
  let week    = document.getElementById("weekCalendar");
  let month   = document.getElementById("monthCalendar");
  let schedule= document.getElementById("scheduleEvent");

  day.style.display       = "none";
  week.style.display      = "none";
  month.style.display     = "none";
  schedule.style.display  = "none";

  // Enable selected calendar
  switch(view) {
    case 'day': 
      console.log('Day calendar is being shown');
      day.style.display   = "block";
      break;
    case 'week': 
      console.log('Week calendar is being shown');
      week.style.display  = "block";
      break;
    case 'month': 
      console.log('Month calendar is being shown');
      month.style.display = "block";
      buildMonth();
      generateMonth(today);
      break;
    case 'schedule':
      console.log('Schedule meeting form is being shown');
      schedule.style.display = "block";
  }
}

function buildTime(schedule) {
  let dayEnd          = 18;
  let timeEnd         = ":00";
  let meridiem        = "AM";
  let hour            = 0;
  
  for (let dayStart = 9; dayStart < dayEnd; dayStart += .5) {     
    let tableRow        = document.createElement("tr");
    let timeCol         = document.createElement("td");
      
    if (dayStart % 1 > 0) {
      hour = dayStart - .5;
      timeEnd = ":30";
    } else {
      hour = dayStart;
      timeEnd = ":00"
    }

    if (dayStart > 12.5) {
      hour = hour - 12;
      meridiem = " AM";
    } else {
      meridiem = " PM";
    }

    timeCol.innerHTML   = hour + timeEnd + meridiem;
    timeCol.className   = "time";
    let entry           = document.createElement("td");
    entry.className     = "entry";

    tableRow.appendChild(timeCol);
    tableRow.appendChild(entry);
    schedule.appendChild(tableRow);
  }
  return schedule;
}

function buildDay() {
    // ***
    // Builds the day calendar with a time schedule
    // ***

    let day                 = document.getElementById("dayCalendar");
    let daySchedule         = document.createElement("table");
    daySchedule.className   = "daySchedule " + todayString + 'DV';
    daySchedule.id          = "dayTable";

    let schedule = buildTime(daySchedule);
    
    day.appendChild(schedule);
}

function generateDay(givenDate) {
  let dateHeader          = document.getElementById("dateHeader");
  dateHeader.innerHTML    = givenDate.toDateString();

  let dateName = givenDate.toISOString().split("T")[0];
  
  let dayTable = document.getElementById("dayTable");
  dayTable.className = "daySchedule " + dateName + 'DV';
}

function buildWeek() {
    // ***
    // Builds the week calendar with a time schedule
    // ***

    let weeks = document.getElementsByClassName("timeSchedule");
  
    for (let weekday = 0; weekday < 7; weekday++) {
        let weekSchedule       = document.createElement("table");
        weekSchedule.className = "weekSchedule";
        weekSchedule.id        = "weekTable" + weekday;
        
        let schedule = buildTime(weekSchedule);
        
        weeks[weekday].appendChild(schedule);
    }
}

function generateWeek(givenDate) {
    // ***
    // Generates the date for the week calendar
    // ***

    // Get dates for the current week
    let givenDateDay = dayNames[givenDate.getDay()];
    let sun;
    let sat;
    let sunDate;
    let satDate;

    // Start with given date: which day of the week is it?
    switch (givenDateDay) {
        case 'Sunday':
            sun     = givenDate.toLocaleDateString();
            satDate = new Date(givenDate.getFullYear(), givenDate.getMonth(), givenDate.getDate()+6);
            sat     = satDate.toLocaleDateString();
            break;
        case 'Monday':
            sunDate = new Date(givenDate.getFullYear(), givenDate.getMonth(), givenDate.getDate()-1);
            sun     = sunDate.toLocaleDateString();
            satDate = new Date(givenDate.getFullYear(), givenDate.getMonth(), givenDate.getDate()+5);
            sat     = satDate.toLocaleDateString();
            break;
        case 'Tuesday':
            sunDate = new Date(givenDate.getFullYear(), givenDate.getMonth(), givenDate.getDate()-2);
            sun     = sunDate.toLocaleDateString();
            satDate = new Date(givenDate.getFullYear(), givenDate.getMonth(), givenDate.getDate()+4);
            sat     = satDate.toLocaleDateString();
            break;
        case 'Wednesday':
            sunDate = new Date(givenDate.getFullYear(), givenDate.getMonth(), givenDate.getDate()-3);
            sun     = sunDate.toLocaleDateString();
            satDate = new Date(givenDate.getFullYear(), givenDate.getMonth(), givenDate.getDate()+3);
            sat     = satDate.toLocaleDateString();
            break;
        case 'Thursday':
            sunDate = new Date(givenDate.getFullYear(), givenDate.getMonth(), givenDate.getDate()-4);
            sun     = sunDate.toLocaleDateString();
            satDate = new Date(givenDate.getFullYear(), givenDate.getMonth(), givenDate.getDate()+2);
            sat     = satDate.toLocaleDateString();
            break;
        case 'Friday':
            sunDate = new Date(givenDate.getFullYear(), givenDate.getMonth(), givenDate.getDate()-5);
            sun     = sunDate.toLocaleDateString();
            satDate = new Date(givenDate.getFullYear(), givenDate.getMonth(), givenDate.getDate()+1);
            sat     = satDate.toLocaleDateString();
            break;
        case 'Saturday':
            sunDate = new Date(givenDate.getFullYear(), givenDate.getMonth(), givenDate.getDate()-6);
            sun     = sunDate.toLocaleDateString();
            sat     = givenDate.toLocaleDateString();
            break;
    }

    // console.log(sunDate);
    generateWeekDates(sunDate);

    // Return week date to Sunday's date - Saturday's date
    return `${sun} - ${sat}`;
}

function generateWeekDates(givenDate) {
  for (let weekday = 0; weekday < 7; weekday++) {
    let idTag = "weekTable" + weekday;
    let weekTable = document.getElementById(idTag);
    let dateName = givenDate.toISOString().split("T")[0];
    weekTable.className = "weekSchedule " + dateName + 'WV';
    // console.log(weekTable);
  }
}

function buildMonth() {
    // ***
    // Builds the month table with the ids for the boxes
    // ***

    let monthTable          = document.getElementById("monthTable");

    for (let r = 0; r < 6; r++) {
        let row             = document.createElement("tr");
        row.className       = `r${r}`;

        for (let c = 0; c < 7; c++) {
            let box         = document.createElement("td");
            box.id          = `box_r${r}c${c}`;
            box.innerHTML   = `<div id="div_r${r}c${c}" class="boxDiv"></div>`;

            row.appendChild(box);
        }

        monthTable.appendChild(row);
    }
}

function clearMonth() {
    // ***
    // Clear the month table of inner HTML
    // ***

    let monthTable          = document.getElementById("monthTable");
    monthTable.innerHTML    = `
        <tr>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
        </tr>
    `;

    for (let r = 0; r < 6; r++) {
        let row             = document.createElement("tr");
        row.className       = `r${r}`;

        for (let c = 0; c < 7; c++) {
            let box         = document.createElement("td");
            box.id          = `box_r${r}c${c}`;
            box.innerHTML   = `<div id="div_r${r}c${c}" class="boxDiv"></div>`;

            row.appendChild(box);
        }

        monthTable.appendChild(row);
    }
}

function generateMonth(givenDate) {
    // ***
    // Populates the month table with dates
    // ***

    let startDay        = givenDate.getDate();
    let givenMonth      = givenDate.getMonth() + 1;
    let givenYear       = givenDate.getFullYear();
    
    let monthName           = document.getElementById("monthName");
    monthName.innerHTML     = monthNames[givenMonth-1];

    clearMonth();

    // What day of the week does the 1st day of the month start?
    let firstDay        = new Date(`${givenYear}-${givenMonth}-01`);
    // console.log(firstDay);
    let firstDayBoxCol  = firstDay.getDay();
    // console.log(firstDayBoxCol);

    // How many days are in the current month?
    let monthDays       = getDaysInMonth(givenYear, givenMonth);
    // console.log(monthDays);

    // Populate day numbers in month table
    let days = 1;
    let rowNum = 0;
    
    while (days <= monthDays) {

        for (let colNum = firstDayBoxCol; colNum < 7; colNum++) {
            let box         = document.getElementById(`box_r${rowNum}c${colNum}`);
            box.className   = "monthBox";
            box.innerHTML   = `<h3>${days}</h3>`;
            days++;
            if (days > monthDays) {
                break;
            }
        }

        rowNum++;
        firstDayBoxCol = 0;
    }

    // TODO: Link each box to the day view
}

function getDaysInMonth(year, month) {
    // ***
    // Returns the number of days in a given month during a given year
    // *** 

    return new Date(year, month, 0).getDate();
}

// ***
// Variables for changing the date
// ***
// Here for easy reference while coding
let shownDate = today;
let shownWeek = today;
let shownMonth = today;
let prevMovement = 0;
let nextMovement = 0;

function changeDate(movement, calendarType) {
    // ***
    // Changes the date information shown in the calendar
    // ***
    
    let movementType = 0;

    switch (movement) {
        case 'prev':
            movementType = -1;
            break;
        case 'next':
            movementType = 1;
            break;
    }

    if (calendarType === 'day') {
        shownDate = new Date(shownDate.getFullYear(), shownDate.getMonth(), shownDate.getDate() + movementType);
        // console.log(shownDate);
        generateDay(shownDate);
    }
    if (calendarType === 'week') {
        shownWeek = new Date(shownWeek.getFullYear(), shownWeek.getMonth(), shownWeek.getDate() + (movementType * 7));
        // console.log(shownWeek);
        let weekDate            = document.getElementById("weekDate");
        weekDate.innerHTML      = generateWeek(shownWeek);
        // generateWeek(shownWeek);
    }
    if (calendarType === 'month') {
        shownMonth = new Date(shownMonth.getFullYear(), shownMonth.getMonth() + movementType, shownMonth.getDate());
        // console.log(shownMonth);
        generateMonth(shownMonth);
    }
} 

function recurringOptions() {
  let optionSelected = document.getElementById("recurring").value;
  let recurringDays = document.getElementById("recurringDays");
  
  if (optionSelected === "no") {
    recurringDays.style.display = "none";
  } else {
    recurringDays.style.display = "block";
  }
}

function populateEvents() {
  let dayTable = document.getElementById("daySchedule");
  let weekTables = document.getElementsByClassName("timeSchedule");
  let monthTable = document.getElementById("monthTable");

  let abbrvDayNames = ["sun", "mon", "tues", "wed", "thurs", "fri", "sat"];

  for (let i = 0; i < weekTables.length; i++) {
    
  }
}

