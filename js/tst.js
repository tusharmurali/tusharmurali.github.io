// Set my wake-up time in 24-hour format (e.g., 18 for 6 PM)
const wakeUpHour = 14;  // Change this as needed based on my sleep schedule
		
function convertToTST() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    
    // Calculate the difference in hours and minutes between the current time and the wake-up time
    let hourDifference = currentHour - wakeUpHour;
    let minuteDifference = currentMinute; // Since wake-up time has 30 minutes, we adjust minutes

    // Adjust if minutes go negative
    if (minuteDifference < 30) {
        minuteDifference += 60;
        hourDifference--;
    }

    // Calculate TST relative to the wake-up time (6:30 AM TST)
    let tstHour = 6 + hourDifference;  // Add the hour difference to 6 AM (TST)
    let tstMinute = 30 + minuteDifference;  // Add the minute difference to 30 minutes

    if (tstMinute >= 60) {
        tstMinute -= 60;
        tstHour++;
    }

    // Determine AM/PM
    let period = tstHour >= 12 ? 'PM' : 'AM';
    tstHour = tstHour % 12;
    tstHour = tstHour ? tstHour : 12;  // Adjust '0' hour to '12' in 12-hour format

    // Format the minutes to always show 2 digits
    let tstTime = `${tstHour}:${tstMinute < 10 ? '0' : ''}${tstMinute} ${period}`;
    
    // Display the TST time on the page
    document.querySelector('#tst-time span').textContent = tstTime;
}

// Update TST time every minute
setInterval(convertToTST, 60000);
convertToTST(); // Initial call to display the time right away