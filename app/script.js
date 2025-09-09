var socket = new WebSocket('ws://27.147.170.162:81');
socket.onmessage = function (event) {
	// console.log(event.data);

	const data = event.data.split(":");
	const data_catagory = data[0] || "";
	const msg = data[1] || ""

	if (data_catagory == "hams_HO") {
		var splited_data = msg.split(",");

		// Main Unit
		updateAllData(splited_data[0], splited_data[1], splited_data[2], splited_data[3], splited_data[4], splited_data[5])

		// power supply unit 

		const psuId = ['bgp-psu1', 'bgp-psu2', 'fortinet-psu1', 'fortinet-psu2', 'check-point-psu1', 'check-point-psu2', 'cisco-psu', 'lan-psu', 'cisco-distribution-psu', 'ho-dr-psu1', 'ho-dr-psu2', 'ho-service-psu1', 'ho-service-psu2', 'pabx-psu', 'nvr-psu', 'r730-1-psu1', 'r730-1-psu2', 'r730-2-psu1', 'r730-2-psu2', 'san-sw1-psu1', 'san-sw1-psu2', 'san-sw-psu1', 'san-sw-psu2', 'san-sorage-psu1', 'san-sorage-psu2'];
		const psuDisplayId = [
			'bgp-d-psu1', 'bgp-d-psu2', 'fortinet-d-psu1', 'fortinet-d-psu2', 'check-point-d-psu1', 'check-point-d-psu2', 'cisco-d-psu', 'lan-d-psu', 'cisco-distribution-d-psu', 'ho-dr-d-psu1', 'ho-dr-d-psu2', 'ho-service-d-psu1', 'ho-service-d-psu2', 'pabx-d-psu', 'nvr-d-psu', 'r730-1-d-psu1', 'r730-1-d-psu2', 'r730-2-d-psu1', 'r730-2-d-psu2',
			'san-sw1-d-psu1', 'san-sw1-d-psu2', 'san-sw-d-psu1', 'san-sw-d-psu2', 'san-sorage-d-psu1', 'san-sorage-d-psu2'
		];

		for (i = 6, j = 0; i <= 30; i++, j++) {

			if (splited_data[i] >= 1) {

				if (splited_data[i] >= 9999) {
					document.getElementById(psuId[j]).innerText = 'ON';
					document.getElementById(psuId[j]).classList.add('on-btn');
					document.getElementById(psuDisplayId[j]).innerText = `9999 VA`;
					document.getElementById(psuDisplayId[j]).classList.add('show-btn');
				}
				else {
					document.getElementById(psuId[j]).innerText = 'ON';
					document.getElementById(psuId[j]).classList.add('on-btn');
					document.getElementById(psuDisplayId[j]).innerText = `${splited_data[i]} VA`;
					document.getElementById(psuDisplayId[j]).classList.add('show-btn');
				}

			}
			else {
				const box2 = document.getElementById(psuId[j]).innerText = 'OFF';
				document.getElementById(psuId[j]).classList.add('off-btn');
			}
		}

		// Others Alarm Unit

		const alarmId = ['water-leakage', 'fire-Alarm', 'generator-status', 'ups1-cb-status', 'ups2-cb-status'];
		const alarmData = [['Alarm', 'No Alarm'], ['Alarm', 'No Alarm'], ['Off', 'On'], ['Tripped', 'ok'], ['Tripped', 'ok']]

		for (i = 31, j = 0; i <= 35; i++, j++) {
			if (splited_data[i] == 1) {
				const box = document.getElementById(alarmId[j]).innerText = alarmData[j][1];
				document.getElementById(alarmId[j]).classList.add('on-btn'); //green
			}
			else {
				const box2 = document.getElementById(alarmId[j]).innerText = alarmData[j][0];
				document.getElementById(alarmId[j]).classList.add('off-btn'); //red
			}
		}
	}
}

// gauge data start 

// Function to determine color based on value and ranges
function getColor(value, ranges) {
	if (value >= ranges.green[0] && value <= ranges.green[1]) {
		return '#22c55e'; // Green
	} else if (value >= ranges.orange[0] && value <= ranges.orange[1]) {
		return '#d8ab23ff'; // Orange
	} else {
		return '#ef4444'; // Red
	}
}

// Function to determine status based on value and ranges
function getStatus(value, ranges) {
	if (value >= ranges.green[0] && value <= ranges.green[1]) {
		return { text: 'Normal', class: 'status-normal' };
	} else if (value >= ranges.orange[0] && value <= ranges.orange[1]) {
		return { text: 'Warning', class: 'status-warning' };
	} else {
		return { text: 'Danger', class: 'status-danger' };
	}
}

// Function to update circular gauge
function updateGauge(elementId, value, ranges) {
	const fillElement = document.getElementById(`${elementId}-fill`);
	const valueElement = document.getElementById(`${elementId}-value`);
	const statusElement = document.getElementById(`${elementId}-status`);

	// Calculate rotation based on value (0 to 360 degrees for 0 to max value)
	const rotation = (value / ranges.max) * 360;

	// Get color and status
	const color = getColor(value, ranges);
	const status = getStatus(value, ranges);

	// Update gauge fill
	fillElement.style.background = `conic-gradient(${color} 0deg ${rotation}deg, transparent ${rotation}deg 360deg)`;
	fillElement.style.color = color;

	// Update value (keep the unit span)
	const unit = valueElement.querySelector('.gauge-unit')?.textContent || '';
	valueElement.innerHTML = `${value} <span class="gauge-unit">${unit}</span>`;

	// Update status
	statusElement.textContent = status.text;
	statusElement.className = `status ${status.class}`;

	// Add pulse animation for warning and danger statuses
	if (status.class !== 'status-normal') {
		statusElement.classList.add('pulse');
	} else {
		statusElement.classList.remove('pulse');
	}
}

// Function to generate and update all sensor data
function updateAllData(a, b, c, d, e, f) {
	console.log("Update all Data - ", a, b, c, d, e, f)

	// Input Voltage (0-300V)
	const inputVoltage = a || 230;
	updateGauge('input-voltage', inputVoltage, {
		green: [200, 230],
		orange: [0, 199],
		red: [231, 300],
		max: 300
	});

	// UPS1 Output Voltage (0-300V)
	const ups1Voltage = b || 220;
	updateGauge('ups1-voltage', ups1Voltage, {
		green: [200, 230],
		orange: [0, 199],
		red: [231, 300],
		max: 300
	});

	// UPS2 Output Voltage (0-300V)
	const ups2Voltage = c || 220;
	updateGauge('ups2-voltage', ups2Voltage, {
		green: [200, 230],
		orange: [0, 199],
		red: [231, 300],
		max: 300
	});

	// Battery Voltage (0-60V)
	const batteryVoltage = d || 48.5;
	updateGauge('battery-voltage', batteryVoltage, {
		green: [48, 55],
		orange: [0, 47.9],
		red: [56, 60],
		max: 60
	});

	// Temperature (0-55°C)
	const temperature = e || 25;
	updateGauge('temperature', temperature, {
		green: [0, 25],
		orange: [25.1, 30],
		red: [30.1, 55],
		max: 55
	});

	// Humidity (0-100%)
	const humidity = f || 75;
	updateGauge('humidity', humidity, {
		green: [40.1, 70],
		orange: [0, 40],
		red: [70.1, 100],
		max: 100
	});
}
updateAllData();



























// Sidebar Dropdown
// const allDropdown = document.querySelectorAll('#sidebar .side-dropdown');
// const sidebar = document.getElementById('sidebar');

// allDropdown.forEach(item => {
// 	const a = item.parentElement.querySelector('a:first-child');
// 	a.addEventListener('click', function (e) {
// 		e.preventDefault();

// 		if (!this.classList.contains('active')) {
// 			allDropdown.forEach(i => {
// 				const aLink = i.parentElement.querySelector('a:first-child');

// 				aLink.classList.remove('active');
// 				i.classList.remove('show');
// 			})
// 		}

// 		this.classList.toggle('active');
// 		item.classList.toggle('show');
// 	})
// })