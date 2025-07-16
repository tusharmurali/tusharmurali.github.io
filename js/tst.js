const wakeUpHour = 14; // 2 PM

function convertToTST() {
  const currentDate = new Date();

  const wakeUpTime = new Date(currentDate);
  wakeUpTime.setHours(wakeUpHour, 30, 0, 0);

  let diffMs = currentDate - wakeUpTime;

  if (diffMs < 0) {
    wakeUpTime.setDate(wakeUpTime.getDate() - 1);
    diffMs = currentDate - wakeUpTime;
  }

  const baseTST = new Date(wakeUpTime);
  baseTST.setHours(6, 30, 0, 0);

  const tstTime = new Date(baseTST.getTime() + diffMs);

  let tstHour = tstTime.getHours();
  const tstMinute = tstTime.getMinutes();
  const isPM = tstHour >= 12;

  const displayHour = tstHour % 12 || 12;
  const displayMinute = tstMinute.toString().padStart(2, '0');
  const formattedTime = `${displayHour}:${displayMinute}`;

  document.getElementById("tst-digits").textContent = formattedTime;

  // Highlight the correct period
  document.getElementById("am").classList.toggle("active", !isPM);
  document.getElementById("pm").classList.toggle("active", isPM);
}

setInterval(convertToTST, 60000);
convertToTST();
