//.........websocket_client code..............
var socket = new WebSocket('ws://27.147.170.162:81');
socket.onmessage = function (event) {
	// console.log(event.data);

	const data = event.data.split(":");
	const data_catagory = data[0] || "";
	const msg = data[1] || ""
	//console.log("Data Catagort:",data_catagory);
	//console.log("Main Data:",msg );
	if (data_catagory == "hams_HO") {
		var splited_data = msg.split(",");

		document.getElementById('bts').innerText = splited_data[0];
		document.getElementById('upsA').innerText = splited_data[1];
		document.getElementById('upsB').innerText = splited_data[2];
		document.getElementById('pdb').innerText = splited_data[3];
		document.getElementById('temperature').innerText = splited_data[4];

		// power supply unit 

		const psuId = ['bgp-psu1', 'bgp-psu2', 'fortinet-psu1', 'fortinet-psu2', 'check-point-psu1', 'check-point-psu2', 'cisco-psu', 'lan-psu', 'cisco-distribution-psu', 'ho-dr-psu1', 'ho-dr-psu2', 'ho-service-psu1', 'ho-service-psu2', 'pabx-psu', 'nvr-psu', 'r730-1-psu1', 'r730-1-psu2', 'r730-2-psu1', 'r730-2-psu2', 'san-sw1-psu1', 'san-sw1-psu2', 'san-sw-psu1', 'san-sw-psu2', 'san-sorage-psu1', 'san-sorage-psu2'];

		for (i = 5, j = 0; i <= 29; i++, j++) {

			if (splited_data[i] == 1) {
				const box = document.getElementById(psuId[j]).innerText = 'ON';
				document.getElementById(psuId[j]).classList.add('on-btn');
			}
			else {
				const box2 = document.getElementById(psuId[j]).innerText = 'OFF';
				document.getElementById(psuId[j]).classList.add('off-btn');
			}

		}

		// Others Alarm Unit

		const alarmId = ['water-leakage', 'fire-Alarm', 'generator-status', 'ups1-cb-status', 'ups2-cb-status'];
		const alarmData = [['Alarm', 'No Alarm'], ['Alarm', 'No Alarm'], ['Running', 'off'], ['Tripped', 'ok'], ['Tripped', 'ok']]

		for (i = 30, j = 0; i <= 34; i++, j++) {
			if (splited_data[i] == 1) {
				const box = document.getElementById(alarmId[j]).innerText = alarmData[j][1];
				document.getElementById(alarmId[j]).classList.add('on-btn');
			}
			else {
				const box2 = document.getElementById(alarmId[j]).innerText = alarmData[j][0];
				document.getElementById(alarmId[j]).classList.add('off-btn');
			}
		}

		// console.log("BGP psu 1:", splited_data[5]);
		// console.log("bgp psu 2:", splited_data[6]);


	}
}

// Sidebar Dropdown
const allDropdown = document.querySelectorAll('#sidebar .side-dropdown');
const sidebar = document.getElementById('sidebar');

allDropdown.forEach(item => {
	const a = item.parentElement.querySelector('a:first-child');
	a.addEventListener('click', function (e) {
		e.preventDefault();

		if (!this.classList.contains('active')) {
			allDropdown.forEach(i => {
				const aLink = i.parentElement.querySelector('a:first-child');

				aLink.classList.remove('active');
				i.classList.remove('show');
			})
		}

		this.classList.toggle('active');
		item.classList.toggle('show');
	})
})
