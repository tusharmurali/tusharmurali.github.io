const wakeUpHour = 14; // 2 PM

function convertToTST() {
    const currentDate = new Date();

    // Create a Date object for today's wake-up time
    const wakeUpTime = new Date(currentDate);
    wakeUpTime.setHours(wakeUpHour);
    wakeUpTime.setMinutes(30); // Assume wake-up is at HH:30
    wakeUpTime.setSeconds(0);
    wakeUpTime.setMilliseconds(0);

    // Calculate the difference in milliseconds
    let diffMs = currentDate - wakeUpTime;

    // If current time is before wake-up time, adjust wake-up to yesterday
    if (diffMs < 0) {
        wakeUpTime.setDate(wakeUpTime.getDate() - 1);
        diffMs = currentDate - wakeUpTime;
    }

    // Base TST is 6:30 AM
    const baseTST = new Date(wakeUpTime);
    baseTST.setHours(6);
    baseTST.setMinutes(30);

    // Add the time difference to the base TST
    const tstTime = new Date(baseTST.getTime() + diffMs);

    // Format TST time to 12-hour format with AM/PM
    let tstHour = tstTime.getHours();
    let tstMinute = tstTime.getMinutes();
    let period = tstHour >= 12 ? 'PM' : 'AM';
    tstHour = tstHour % 12 || 12;

    let formattedMinute = tstMinute < 10 ? '0' + tstMinute : tstMinute;
    let formattedTime = `${tstHour}:${formattedMinute} ${period}`;

    // Display the TST time
    document.querySelector('#tst-time span').textContent = formattedTime;
}

// Update every minute
setInterval(convertToTST, 60000);
convertToTST(); // Initial call
