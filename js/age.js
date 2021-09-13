let age = document.getElementById("age");

setInterval(() => {
	age.innerText = ((new Date() - new Date("April 26, 2003 00:12:00")) / (1000 * 60 * 60 * 24 * 365.25))
		.toString()
		.substring(0, 12);
}, 50);