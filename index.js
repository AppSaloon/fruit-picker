
const select = document.getElementById("aantal");

for (var i = 0; i < 10; i++) {
	const option = document.createElement("option");
	option.textContent = i;
	option.value = i;
	select.appendChild(option);
}
