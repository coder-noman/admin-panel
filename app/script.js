//Handle Logout Button Start
const user = sessionStorage.getItem("loggedInUser");
if (!user || user !== "admin") {
  window.location.href = "../registration.html";
}

// logOut Button
document.getElementById("log-out").addEventListener("click", function () {
  sessionStorage.removeItem("loggedInUser");
  window.location.href = "../registration.html";
});
//Handle Logout Button End

// if data is not coming start
let dataReceived = false;

const timeout = setTimeout(() => {
  if (!dataReceived) {
    showDefaultData();
  }
}, 9000);

function showDefaultData() {
  console.log("Hello from default!");
}

// if data is not coming end

let ipdu1_arr = [0, 0, 0, 0, 0, 0, 0, 0];
let ipdu2_arr = [0, 0, 0, 0, 0, 0, 0, 0];
let ipdu3_arr = [0, 0, 0, 0, 0, 0, 0, 0];

//.........websocket_client code..............
var socket = new WebSocket("ws://27.147.170.162:81");
socket.onmessage = function (event) {
  const data = event.data.split(":");
  const data_catagory = data[0] || "";
  const msg = data[1] || "";

  // checking data is coming or not start
  if (data_catagory == "Hams_HO") {
    dataReceived = true;
    clearTimeout(timeout);
  } else {
    return;
  }
  // checking data is coming or not end

  // if (data_catagory !== "Hams_HO") {
  //   return;
  // }

  // Clear all data function
  clearAllData();

  console.log(data[1]);
  console.log(data[2]);
  console.log(data[3]);
  console.log(data[4]);

  var splited_data = data[4].split(",");

  // Device Inforfation
  deviceInformation(
    splited_data[12],
    splited_data[13],
    splited_data[14],
    splited_data[15],
    splited_data[16],
    splited_data[17],
    splited_data[18]
  );

  // Main Gauge
  updateAllData(
    splited_data[1],
    splited_data[2],
    splited_data[3],
    splited_data[4],
    splited_data[5],
    splited_data[6]
  );

  // power supply unit
  const psuId = [
    "bgp-psu1",
    "bgp-psu2",
    "fortinet-psu1",
    "fortinet-psu2",
    "check-point-psu1",
    "check-point-psu2",
    "cisco-psu",
    "lan-psu",
    "cisco-distribution-psu",
    "ho-dr-psu1",
    "ho-dr-psu2",
    "ho-service-psu1",
    "ho-service-psu2",
    "nvr-psu",
    "r730-1-psu1",
    "r730-1-psu2",
    "r730-2-psu1",
    "r730-2-psu2",
    "san-sw1-psu1",
    "san-sw1-psu2",
    "san-sw-psu1",
    "san-sw-psu2",
    "san-sorage-psu1",
    "san-sorage-psu2",
  ];

  const psuDisplayId = [
    "bgp-d-psu1",
    "bgp-d-psu2",
    "fortinet-d-psu1",
    "fortinet-d-psu2",
    "check-point-d-psu1",
    "check-point-d-psu2",
    "cisco-d-psu",
    "lan-d-psu",
    "cisco-distribution-d-psu",
    "ho-dr-d-psu1",
    "ho-dr-d-psu2",
    "ho-service-d-psu1",
    "ho-service-d-psu2",
    "nvr-d-psu",
    "r730-1-d-psu1",
    "r730-1-d-psu2",
    "r730-2-d-psu1",
    "r730-2-d-psu2",
    "san-sw1-d-psu1",
    "san-sw1-d-psu2",
    "san-sw-d-psu1",
    "san-sw-d-psu2",
    "san-sorage-d-psu1",
    "san-sorage-d-psu2",
  ];
  const psuCardData = [
    "BGP PSU1",
    "BGP PSU2",
    "Fortinet PSU1",
    "Fortinet PSU2",
    "Check P. PSU1",
    "Check P. PSU2",
    "Core Router PSU",
    "LAN Router",
    "CISCO Dist PSU",
    "HO DR PSU1",
    "HO DR PSU2",
    "HO S PSU1",
    "HO S PSU2",
    "NVR PSU",
    "R 730 1 PSU1",
    "R 730 1 PSU2",
    "R 730 2 PSU1",
    "R 730 2 PSU2",
    "SAN SW 1 PSU1",
    "SAN SW 1 PSU2",
    "SAN SW PSU1",
    "SAN SW PSU2",
    "SAN SORAGE PSU1",
    "SAN SORAGE PSU2",
  ];

  // ipdu 1 Data Insert
  if (data[1] != "") {
    var ipdu1_data = data[1].split(",");
    for (i = 2, k = 0; i <= 9; i++, k++) {
      if (ipdu1_data[i] >= 1) {
        ipdu1_arr[k] = parseInt(ipdu1_data[i]);
      } else {
        ipdu1_arr[k] = parseInt(ipdu1_data[i]);
      }
    }
  }

  // ipdu 1 Data show
  for (i = 0, j = 0; i <= 7; i++, j++) {
    if (ipdu1_arr[i] >= 1) {
      psuOnShowData(psuId[j], psuDisplayId[j], ipdu1_arr[i]);
    } else {
      psuOffShowData(psuId[j], psuCardData[j]);
    }
  }

  // ipdu 2 Data Insert
  if (data[2] != "") {
    var ipdu2_data = data[2].split(",");
    for (i = 2, k = 0; i <= 9; i++, k++) {
      if (ipdu2_data[i] >= 1) {
        ipdu2_arr[k] = parseInt(ipdu2_data[i]);
      } else {
        ipdu2_arr[k] = parseInt(ipdu2_data[i]);
      }
    }
  }

  // ipdu 2 Data show
  for (i = 0, j = 8; i <= 7; i++, j++) {
    if (ipdu2_arr[i] >= 1) {
      psuOnShowData(psuId[j], psuDisplayId[j], ipdu2_arr[i]);
    } else {
      psuOffShowData(psuId[j], psuCardData[j]);
    }
  }

  // ipdu 3 Data Insert
  if (data[3] != "") {
    var ipdu3_data = data[3].split(",");
    for (i = 2, k = 0; i <= 9; i++, k++) {
      if (ipdu3_data[i] >= 1) {
        ipdu3_arr[k] = parseInt(ipdu3_data[i]);
      } else {
        ipdu3_arr[k] = parseInt(ipdu3_data[i]);
      }
    }
  }

  // ipdu 3 Data show
  for (i = 0, j = 16; i <= 7; i++, j++) {
    if (ipdu3_arr[i] >= 1) {
      psuOnShowData(psuId[j], psuDisplayId[j], ipdu3_arr[i]);
    } else {
      psuOffShowData(psuId[j], psuCardData[j]);
    }
  }

  console.log("ipdu1 = ", ipdu1_arr);
  console.log("ipdu2 = ", ipdu2_arr);
  console.log("ipdu3 = ", ipdu3_arr);

  // Others Alarm Unit
  const alarmId = [
    "water-leakage",
    "fire-Alarm",
    "generator-status",
    "ups1-cb-status",
    "ups2-cb-status",
  ];
  const alarmCardId = [
    "Water Leakage",
    "Fire-Alarm",
    "Generator Status",
    "Ups1 cb Status",
    "Ups2 cb Status",
  ];
  const alarmData = [
    ["Alarm", "No Alarm"],
    ["Alarm", "No Alarm"],
    ["Off", "On"],
    ["Tripped", "ok"],
    ["Tripped", "ok"],
  ];
  // var ipdu1_data=data[2].split(",");
  for (i = 7, j = 0; i <= 11; i++, j++) {
    if (splited_data[i] == 1) {
      document.getElementById(alarmId[j]).innerText = alarmData[j][1];
      document.getElementById(alarmId[j]).classList.add("on-btn"); //green
    } else {
      document.getElementById(alarmId[j]).innerText = alarmData[j][0];
      document.getElementById(alarmId[j]).classList.add("off-btn"); //red
      let ul = document.getElementById("alert-list");
      let li = document.createElement("li");
      li.classList.add("alert-list-card");
      li.textContent = `${alarmCardId[j]} is ${alarmData[j][0]}`;
      ul.appendChild(li);
    }
  }
};
// console.log('hello nOman');

//Psu On Show Data Funtion
function psuOnShowData(psu_Id, psu_d_id, psu_value) {
  document.getElementById(psu_Id).innerText = "ON";
  document.getElementById(psu_Id).classList.add("on-btn");
  document.getElementById(psu_d_id).innerText = `${psu_value} VA`;
  document.getElementById(psu_d_id).classList.add("show-btn");
}
//Psu Off Show Data Funtion
function psuOffShowData(psu_Id, psuCardData) {
  document.getElementById(psu_Id).innerText = "OFF";
  document.getElementById(psu_Id).classList.add("off-btn");
  let ul = document.getElementById("alert-list");
  let li = document.createElement("li");
  li.classList.add("alert-list-card");
  li.textContent = `${psuCardData} Failed.`;
  ul.appendChild(li);
}

// device Information

function deviceInformation(lan, gsmOp, gsmSig, ib, psu1, psu2, ds) {
  const lanIp = document.getElementById("device-lan");
  const gsmOperator = document.getElementById("gsm-operator");
  const gsmSignal = document.getElementById("gsm-signal");
  const internalBattery = document.getElementById("internal-battery");
  const devicePsu1 = document.getElementById("device-psu1");
  const devicePsu2 = document.getElementById("device-psu2");
  const dataSource = document.getElementById("data-source");

  // Lan IP
  lanIp.innerHTML = `: ${lan}`;

  // Gsm Operator
  gsmOperator.innerText = `: ${gsmOp}`;

  // if(gsmOp == 0){
  //   gsmOperator.innerText = ': Not Found';
  // }else if(gsmOp == 1){
  //   gsmOperator.innerText = ': GP';
  // }else if(gsmOp == 2){
  //   gsmOperator.innerText = ': Robi';
  // }else if(gsmOp == 3){
  //   gsmOperator.innerText = ': Banglalink';
  // }else if(gsmOp == 4){
  //   gsmOperator.innerText = ': Airtel';
  // }else if(gsmOp == 5){
  //   gsmOperator.innerText = ': Teletalk';
  // }

  // Gsm Signal
  gsmSignal.innerText = `: ${gsmSig} %`;

  // Internal Battery
  internalBattery.innerText = `: ${ib} V`;

  // Psu Stutus 1
  if (psu1 == 1) {
    devicePsu1.innerText = `: OK`;
  } else {
    devicePsu1.innerText = `: Failed`;
  }

  // Psu Stutus 2
  if (psu2 == 1) {
    devicePsu2.innerText = `: OK`;
  } else {
    devicePsu2.innerText = `: Failed`;
  }

  // Data Source
  if (ds == 0) {
    dataSource.innerText = `: LAN`;
  } else if (ds == 1) {
    dataSource.innerText = `: WIFI`;
  } else if (ds == 2) {
    dataSource.innerText = `: GPRS`;
  }
}

// clear all data function
function clearAllData() {
  document.getElementById("alert-list").innerHTML = "";

  const psuId = [
    "bgp-psu1",
    "bgp-psu2",
    "fortinet-psu1",
    "fortinet-psu2",
    "check-point-psu1",
    "check-point-psu2",
    "cisco-psu",
    "lan-psu",
    "cisco-distribution-psu",
    "ho-dr-psu1",
    "ho-dr-psu2",
    "ho-service-psu1",
    "ho-service-psu2",
    "nvr-psu",
    "r730-1-psu1",
    "r730-1-psu2",
    "r730-2-psu1",
    "r730-2-psu2",
    "san-sw1-psu1",
    "san-sw1-psu2",
    "san-sw-psu1",
    "san-sw-psu2",
    "san-sorage-psu1",
    "san-sorage-psu2",
  ];

  const psuDisplayId = [
    "bgp-d-psu1",
    "bgp-d-psu2",
    "fortinet-d-psu1",
    "fortinet-d-psu2",
    "check-point-d-psu1",
    "check-point-d-psu2",
    "cisco-d-psu",
    "lan-d-psu",
    "cisco-distribution-d-psu",
    "ho-dr-d-psu1",
    "ho-dr-d-psu2",
    "ho-service-d-psu1",
    "ho-service-d-psu2",
    "nvr-d-psu",
    "r730-1-d-psu1",
    "r730-1-d-psu2",
    "r730-2-d-psu1",
    "r730-2-d-psu2",
    "san-sw1-d-psu1",
    "san-sw1-d-psu2",
    "san-sw-d-psu1",
    "san-sw-d-psu2",
    "san-sorage-d-psu1",
    "san-sorage-d-psu2",
  ];

  for (let j = 0; j < psuId.length; j++) {
    const psuElem = document.getElementById(psuId[j]);
    const psuDisplayElem = document.getElementById(psuDisplayId[j]);

    if (psuElem) {
      psuElem.innerText = "";
      psuElem.className = "";
    }
    if (psuDisplayElem) {
      psuDisplayElem.innerText = "";
      psuDisplayElem.className = "";
    }
  }

  // Clear alarm elements
  const alarmId = [
    "water-leakage",
    "fire-Alarm",
    "generator-status",
    "ups1-cb-status",
    "ups2-cb-status",
  ];
  for (let j = 0; j < alarmId.length; j++) {
    const alarmElem = document.getElementById(alarmId[j]);
    if (alarmElem) {
      alarmElem.innerText = "";
      alarmElem.className = "";
    }
  }
}

// gauge data start

// Function to determine color based on value and ranges
function getColor(value, ranges) {
  if (value >= ranges.green[0] && value <= ranges.green[1]) {
    return "#4ECDC4"; // Green
  } else if (value >= ranges.orange[0] && value <= ranges.orange[1]) {
    return "#FE9B13"; // Orange
  } else {
    return "#FC5C65"; // Red
  }
}

// Function to determine status based on value and ranges
function getStatus(value, ranges) {
  if (value >= ranges.green[0] && value <= ranges.green[1]) {
    return { text: "Normal", class: "status-normal" };
  } else if (value >= ranges.orange[0] && value <= ranges.orange[1]) {
    return { text: "Warning", class: "status-warning" };
  } else {
    return { text: "Danger", class: "status-danger" };
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
  const unit = valueElement.querySelector(".gauge-unit")?.textContent || "";
  valueElement.innerHTML = `${value} <span class="gauge-unit">${unit}</span>`;

  // Update status
  statusElement.textContent = status.text;
  statusElement.className = `status ${status.class}`;

  // Add pulse animation for warning and danger statuses
  if (status.class !== "status-normal") {
    statusElement.classList.add("pulse");
  } else {
    statusElement.classList.remove("pulse");
  }
}

// Function to generate and update all sensor data
function updateAllData(a, b, c, d, e, f) {
  // Input Voltage (0-300V)
  const inputVoltage = a || 230;
  updateGauge("input-voltage", inputVoltage, {
    green: [200, 230],
    orange: [0, 199],
    red: [231, 300],
    max: 300,
  });

  // UPS1 Output Voltage (0-300V)
  const ups1Voltage = b || 220;
  updateGauge("ups1-voltage", ups1Voltage, {
    green: [200, 230],
    orange: [0, 199],
    red: [231, 300],
    max: 300,
  });

  // UPS2 Output Voltage (0-300V)
  const ups2Voltage = c || 220;
  updateGauge("ups2-voltage", ups2Voltage, {
    green: [200, 230],
    orange: [0, 199],
    red: [231, 300],
    max: 300,
  });

  // Battery Voltage (0-60V)
  const batteryVoltage = d || 48.5;
  updateGauge("battery-voltage", batteryVoltage, {
    green: [48, 55],
    orange: [0, 47.9],
    red: [56, 60],
    max: 60,
  });

  // Temperature (0-55°C)
  const temperature = e || 25;
  updateGauge("temperature", temperature, {
    green: [0, 25],
    orange: [25.1, 30],
    red: [30.1, 55],
    max: 55,
  });

  // Humidity (0-100%)
  const humidity = f || 75;
  updateGauge("humidity", humidity, {
    green: [40.1, 70],
    orange: [0, 40],
    red: [70.1, 100],
    max: 100,
  });
}
updateAllData();

// Chart data Start
// Initialize variables
let environmentChart, voltageChart;

// Static data for the charts
const timeLabels = ["10:00", "10:05", "10:10", "10:15", "10:20"];
let temperature = [10, 20, 10, 40, 10]; // Your specified default data
let humidity = [10, 50, 10, 60, 40]; // Sample humidity data

const voltageData = {
  input: [150], // Initialized to 0
  ups1: [350], // Initialized to 0
  ups2: [300], // Initialized to 0
};
let color = "white";

// Initialize charts
function initCharts() {
  // Environment chart (temperature and humidity)
  const environmentCtx = document
    .getElementById("environment-chart")
    .getContext("2d");
  environmentChart = new Chart(environmentCtx, {
    type: "line",
    data: {
      labels: timeLabels,
      datasets: [
        {
          label: "Temperature (°C)",
          data: temperature,
          borderColor: "#ff9f1a",
          backgroundColor: "rgba(255, 159, 26, 0.1)",
          borderWidth: 2,
          tension: 0.3,
          yAxisID: "y",
          fill: true,
        },
        {
          label: "Humidity (%)",
          data: humidity,
          borderColor: "#3867d6",
          backgroundColor: "rgba(56, 103, 214, 0.1)",
          borderWidth: 2,
          tension: 0.3,
          yAxisID: "y1",
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: `${color}`,
            font: {
              size: 14,
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            color: "rgba(160, 174, 192, 0.1)",
          },
          ticks: {
            color: `${color}`,
            maxTicksLimit: 5,
            font: {
              size: 12,
            },
          },
        },
        y: {
          type: "linear",
          display: true,
          position: "left",
          grid: {
            color: "rgba(160, 174, 192, 0.1)",
          },
          ticks: {
            color: `${color}`,
            font: {
              size: 12,
            },
          },
          suggestedMin: 0,
          suggestedMax: 60,
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
          grid: {
            drawOnChartArea: false,
          },
          ticks: {
            color: `${color}`,
            font: {
              size: 12,
            },
          },
          suggestedMin: 30,
          suggestedMax: 70,
        },
      },
    },
  });

  // bar chart
  const voltageCtx = document.getElementById("voltage-chart").getContext("2d");
  voltageChart = new Chart(voltageCtx, {
    type: "bar",
    data: {
      labels: ["Input", "UPS 1", "UPS 2"],
      datasets: [
        {
          label: "Voltage (V)",
          data: [
            voltageData.input[voltageData.input.length - 1],
            voltageData.ups1[voltageData.ups1.length - 1],
            voltageData.ups2[voltageData.ups2.length - 1],
          ],
          backgroundColor: [
            "rgba(78, 205, 196, 0.7)",
            "rgba(252, 92, 101, 0.7)",
            "rgba(136, 152, 176, 0.7)",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(160, 174, 192, 0.1)",
          },
          ticks: {
            color: `${color}`,
            font: {
              size: 12,
            },
          },
          suggestedMin: 0,
          suggestedMax: 350,
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: `${color}`,
            font: {
              size: 12,
            },
          },
        },
      },
    },
  });
}

// Start the dashboard when the page loads
window.addEventListener("load", initCharts);
// Chart data end

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

// Old code

// //.........websocket_client code..............
// var socket = new WebSocket('ws://27.147.170.162:81');
// socket.onmessage = function (event) {

// 	const data = event.data.split(":");
// 	const data_catagory = data[0] || "";
// 	const msg = data[1] || ""

// //Hams_HO:ipdu1,234,0,0,0,0,0,114,0,0:::GD,631,220,222,0.0,25,60,0,0,0,0,0,,Gra,52,3.3,1,1
// 	if (data_catagory !== "hams_HO") {
// 		return;
// 	}

// 	// Clear all data function
// 	clearAllData();

// 	var splited_data = msg.split(",");

// 	// Main Unit
// 	updateAllData(splited_data[0], splited_data[1], splited_data[2], splited_data[3], splited_data[4], splited_data[5])

// 	// power supply unit
// 	const psuId = ['bgp-psu1', 'bgp-psu2', 'fortinet-psu1', 'fortinet-psu2', 'check-point-psu1', 'check-point-psu2', 'cisco-psu', 'lan-psu', 'cisco-distribution-psu', 'ho-dr-psu1', 'ho-dr-psu2', 'ho-service-psu1', 'ho-service-psu2', 'pabx-psu', 'nvr-psu', 'r730-1-psu1', 'r730-1-psu2', 'r730-2-psu1', 'r730-2-psu2', 'san-sw1-psu1', 'san-sw1-psu2', 'san-sw-psu1', 'san-sw-psu2', 'san-sorage-psu1', 'san-sorage-psu2'];
// 	const psuDisplayId = [
// 		'bgp-d-psu1', 'bgp-d-psu2', 'fortinet-d-psu1', 'fortinet-d-psu2', 'check-point-d-psu1', 'check-point-d-psu2', 'cisco-d-psu', 'lan-d-psu', 'cisco-distribution-d-psu', 'ho-dr-d-psu1', 'ho-dr-d-psu2', 'ho-service-d-psu1', 'ho-service-d-psu2', 'pabx-d-psu', 'nvr-d-psu', 'r730-1-d-psu1', 'r730-1-d-psu2', 'r730-2-d-psu1', 'r730-2-d-psu2',
// 		'san-sw1-d-psu1', 'san-sw1-d-psu2', 'san-sw-d-psu1', 'san-sw-d-psu2', 'san-sorage-d-psu1', 'san-sorage-d-psu2'
// 	];

// 	for (i = 6, j = 0; i <= 30; i++, j++) {
// 		if (splited_data[i] >= 1) {
// 			document.getElementById(psuId[j]).innerText = 'ON';
// 			document.getElementById(psuId[j]).classList.add('on-btn');
// 			document.getElementById(psuDisplayId[j]).innerText = `${splited_data[i]} VA`;
// 			document.getElementById(psuDisplayId[j]).classList.add('show-btn');
// 		}
// 		else {
// 			document.getElementById(psuId[j]).innerText = 'OFF';
// 			document.getElementById(psuId[j]).classList.add('off-btn');
// 			let ul = document.getElementById('alert-list');
// 			let li = document.createElement('li');
// 			li.classList.add('alert-list-card');
// 			li.textContent = `${psuId[j]} is Failed.`;
// 			ul.appendChild(li);
// 		}
// 	}

// 	// Others Alarm Unit
// 	const alarmId = ['water-leakage', 'fire-Alarm', 'generator-status', 'ups1-cb-status', 'ups2-cb-status'];
// 	const alarmData = [['Alarm', 'No Alarm'], ['Alarm', 'No Alarm'], ['Off', 'On'], ['Tripped', 'ok'], ['Tripped', 'ok']]

// 	for (i = 31, j = 0; i <= 35; i++, j++) {
// 		if (splited_data[i] == 1) {
// 			document.getElementById(alarmId[j]).innerText = alarmData[j][1];
// 			document.getElementById(alarmId[j]).classList.add('on-btn'); //green
// 		}
// 		else {
// 			document.getElementById(alarmId[j]).innerText = alarmData[j][0];
// 			document.getElementById(alarmId[j]).classList.add('off-btn'); //red
// 			let ul = document.getElementById('alert-list');
// 			let li = document.createElement('li');
// 			li.classList.add('alert-list-card');
// 			li.textContent = `${alarmId[j]} is ${alarmData[j][0]}`;
// 			ul.appendChild(li);
// 		}
// 	}
// }

// // clear all data function
// function clearAllData() {

// 	document.getElementById('alert-list').innerHTML = '';

// 	const psuId = ['bgp-psu1', 'bgp-psu2', 'fortinet-psu1', 'fortinet-psu2', 'check-point-psu1', 'check-point-psu2', 'cisco-psu', 'lan-psu', 'cisco-distribution-psu', 'ho-dr-psu1', 'ho-dr-psu2', 'ho-service-psu1', 'ho-service-psu2', 'pabx-psu', 'nvr-psu', 'r730-1-psu1', 'r730-1-psu2', 'r730-2-psu1', 'r730-2-psu2', 'san-sw1-psu1', 'san-sw1-psu2', 'san-sw-psu1', 'san-sw-psu2', 'san-sorage-psu1', 'san-sorage-psu2'];

// 	const psuDisplayId = [
// 		'bgp-d-psu1', 'bgp-d-psu2', 'fortinet-d-psu1', 'fortinet-d-psu2', 'check-point-d-psu1', 'check-point-d-psu2', 'cisco-d-psu', 'lan-d-psu', 'cisco-distribution-d-psu', 'ho-dr-d-psu1', 'ho-dr-d-psu2', 'ho-service-d-psu1', 'ho-service-d-psu2', 'pabx-d-psu', 'nvr-d-psu', 'r730-1-d-psu1', 'r730-1-d-psu2', 'r730-2-d-psu1', 'r730-2-d-psu2',
// 		'san-sw1-d-psu1', 'san-sw1-d-psu2', 'san-sw-d-psu1', 'san-sw-d-psu2', 'san-sorage-d-psu1', 'san-sorage-d-psu2'
// 	];

// 	for (let j = 0; j < psuId.length; j++) {
// 		const psuElem = document.getElementById(psuId[j]);
// 		const psuDisplayElem = document.getElementById(psuDisplayId[j]);

// 		if (psuElem) {
// 			psuElem.innerText = '';
// 			psuElem.className = '';
// 		}
// 		if (psuDisplayElem) {
// 			psuDisplayElem.innerText = '';
// 			psuDisplayElem.className = '';
// 		}
// 	}

// 	// Clear alarm elements
// 	const alarmId = ['water-leakage', 'fire-Alarm', 'generator-status', 'ups1-cb-status', 'ups2-cb-status'];
// 	for (let j = 0; j < alarmId.length; j++) {
// 		const alarmElem = document.getElementById(alarmId[j]);
// 		if (alarmElem) {
// 			alarmElem.innerText = '';
// 			alarmElem.className = '';
// 		}
// 	}
// }

// // Set default data on page load
// window.onload = function () {

// 	const defaultData = [220, 220, 220, 48.5, 25, 75, 78, 0, 134, 492, 0, 112, 443, 307, 275, 0, 353, 487, 235, 127, 0, 423, 311, 0, 94, 299, 465, 0, 243, 104, 205, 1, 0, 0, 1, 0];

// 	updateAllData(defaultData[0], defaultData[1], defaultData[2], defaultData[3], defaultData[4], defaultData[5])

// 	const psuId = ['bgp-psu1', 'bgp-psu2', 'fortinet-psu1', 'fortinet-psu2', 'check-point-psu1', 'check-point-psu2', 'cisco-psu', 'lan-psu', 'cisco-distribution-psu', 'ho-dr-psu1', 'ho-dr-psu2', 'ho-service-psu1', 'ho-service-psu2', 'pabx-psu', 'nvr-psu', 'r730-1-psu1', 'r730-1-psu2', 'r730-2-psu1', 'r730-2-psu2', 'san-sw1-psu1', 'san-sw1-psu2', 'san-sw-psu1', 'san-sw-psu2', 'san-sorage-psu1', 'san-sorage-psu2'];
// 	const psuDisplayId = [
// 		'bgp-d-psu1', 'bgp-d-psu2', 'fortinet-d-psu1', 'fortinet-d-psu2', 'check-point-d-psu1', 'check-point-d-psu2', 'cisco-d-psu', 'lan-d-psu', 'cisco-distribution-d-psu', 'ho-dr-d-psu1', 'ho-dr-d-psu2', 'ho-service-d-psu1', 'ho-service-d-psu2', 'pabx-d-psu', 'nvr-d-psu', 'r730-1-d-psu1', 'r730-1-d-psu2', 'r730-2-d-psu1', 'r730-2-d-psu2',
// 		'san-sw1-d-psu1', 'san-sw1-d-psu2', 'san-sw-d-psu1', 'san-sw-d-psu2', 'san-sorage-d-psu1', 'san-sorage-d-psu2'
// 	];

// 	for (i = 6, j = 0; i <= 30; i++, j++) {
// 		if (defaultData[i] >= 1) {
// 			document.getElementById(psuId[j]).innerText = 'ON';
// 			document.getElementById(psuId[j]).classList.add('on-btn');
// 			document.getElementById(psuDisplayId[j]).innerText = `${defaultData[i]} VA`;
// 			document.getElementById(psuDisplayId[j]).classList.add('show-btn');
// 		}
// 		else {
// 			document.getElementById(psuId[j]).innerText = 'OFF';
// 			document.getElementById(psuId[j]).classList.add('off-btn');
// 			const ul = document.getElementById('alert-list');
// 			const li = document.createElement('li');
// 			li.classList.add('alert-list-card');
// 			li.textContent = `${psuId[j]} is Failed.`;
// 			ul.appendChild(li);
// 		}
// 	}

// 	// Others Alarm Unit
// 	const alarmId = ['water-leakage', 'fire-Alarm', 'generator-status', 'ups1-cb-status', 'ups2-cb-status'];
// 	const alarmData = [['Alarm', 'No Alarm'], ['Alarm', 'No Alarm'], ['Off', 'On'], ['Tripped', 'ok'], ['Tripped', 'ok']]

// 	for (i = 31, j = 0; i <= 35; i++, j++) {
// 		if (defaultData[i] == 1) {
// 			document.getElementById(alarmId[j]).innerText = alarmData[j][1];
// 			document.getElementById(alarmId[j]).classList.add('on-btn'); //green
// 		}
// 		else {
// 			document.getElementById(alarmId[j]).innerText = alarmData[j][0];
// 			document.getElementById(alarmId[j]).classList.add('off-btn'); //red
// 			let ul = document.getElementById('alert-list');
// 			let li = document.createElement('li');
// 			li.classList.add('alert-list-card');
// 			li.textContent = `${alarmId[j]} is ${alarmData[j][0]}`;
// 			ul.appendChild(li);
// 		}
// 	}
// };

// // gauge data start

// // Function to determine color based on value and ranges
// function getColor(value, ranges) {
// 	if (value >= ranges.green[0] && value <= ranges.green[1]) {
// 		return '#4ECDC4'; // Green
// 	} else if (value >= ranges.orange[0] && value <= ranges.orange[1]) {
// 		return '#FE9B13'; // Orange
// 	} else {
// 		return '#FC5C65'; // Red
// 	}
// }

// // Function to determine status based on value and ranges
// function getStatus(value, ranges) {
// 	if (value >= ranges.green[0] && value <= ranges.green[1]) {
// 		return { text: 'Normal', class: 'status-normal' };
// 	} else if (value >= ranges.orange[0] && value <= ranges.orange[1]) {
// 		return { text: 'Warning', class: 'status-warning' };
// 	} else {
// 		return { text: 'Danger', class: 'status-danger' };
// 	}
// }

// // Function to update circular gauge
// function updateGauge(elementId, value, ranges) {
// 	const fillElement = document.getElementById(`${elementId}-fill`);
// 	const valueElement = document.getElementById(`${elementId}-value`);
// 	const statusElement = document.getElementById(`${elementId}-status`);

// 	// Calculate rotation based on value (0 to 360 degrees for 0 to max value)
// 	const rotation = (value / ranges.max) * 360;

// 	// Get color and status
// 	const color = getColor(value, ranges);
// 	const status = getStatus(value, ranges);

// 	// Update gauge fill
// 	fillElement.style.background = `conic-gradient(${color} 0deg ${rotation}deg, transparent ${rotation}deg 360deg)`;
// 	fillElement.style.color = color;

// 	// Update value (keep the unit span)
// 	const unit = valueElement.querySelector('.gauge-unit')?.textContent || '';
// 	valueElement.innerHTML = `${value} <span class="gauge-unit">${unit}</span>`;

// 	// Update status
// 	statusElement.textContent = status.text;
// 	statusElement.className = `status ${status.class}`;

// 	// Add pulse animation for warning and danger statuses
// 	if (status.class !== 'status-normal') {
// 		statusElement.classList.add('pulse');
// 	} else {
// 		statusElement.classList.remove('pulse');
// 	}
// }

// // Function to generate and update all sensor data
// function updateAllData(a, b, c, d, e, f) {

// 	// Input Voltage (0-300V)
// 	const inputVoltage = a || 230;
// 	updateGauge('input-voltage', inputVoltage, {
// 		green: [200, 230],
// 		orange: [0, 199],
// 		red: [231, 300],
// 		max: 300
// 	});

// 	// UPS1 Output Voltage (0-300V)
// 	const ups1Voltage = b || 220;
// 	updateGauge('ups1-voltage', ups1Voltage, {
// 		green: [200, 230],
// 		orange: [0, 199],
// 		red: [231, 300],
// 		max: 300
// 	});

// 	// UPS2 Output Voltage (0-300V)
// 	const ups2Voltage = c || 220;
// 	updateGauge('ups2-voltage', ups2Voltage, {
// 		green: [200, 230],
// 		orange: [0, 199],
// 		red: [231, 300],
// 		max: 300
// 	});

// 	// Battery Voltage (0-60V)
// 	const batteryVoltage = d || 48.5;
// 	updateGauge('battery-voltage', batteryVoltage, {
// 		green: [48, 55],
// 		orange: [0, 47.9],
// 		red: [56, 60],
// 		max: 60
// 	});

// 	// Temperature (0-55°C)
// 	const temperature = e || 25;
// 	updateGauge('temperature', temperature, {
// 		green: [0, 25],
// 		orange: [25.1, 30],
// 		red: [30.1, 55],
// 		max: 55
// 	});

// 	// Humidity (0-100%)
// 	const humidity = f || 75;
// 	updateGauge('humidity', humidity, {
// 		green: [40.1, 70],
// 		orange: [0, 40],
// 		red: [70.1, 100],
// 		max: 100
// 	});
// }
// updateAllData();

// // device Information

// const deviceInformation = () =>{
// 	const lanIp = document.getElementById('device-lan');
// 	const gsmOperator = document.getElementById('gsm-operator');
// 	const gsmSignal = document.getElementById('gsm-signal');
// 	const internalBattery = document.getElementById('internal-battery');
// 	const devicePsu1 = document.getElementById('device-psu1');
// 	const devicePsu2 = document.getElementById('device-psu2');
// 	const dataSource = document.getElementById('data-source');

// }

// // Sidebar Dropdown
// // const allDropdown = document.querySelectorAll('#sidebar .side-dropdown');
// // const sidebar = document.getElementById('sidebar');

// // allDropdown.forEach(item => {
// // 	const a = item.parentElement.querySelector('a:first-child');
// // 	a.addEventListener('click', function (e) {
// // 		e.preventDefault();

// // 		if (!this.classList.contains('active')) {
// // 			allDropdown.forEach(i => {
// // 				const aLink = i.parentElement.querySelector('a:first-child');

// // 				aLink.classList.remove('active');
// // 				i.classList.remove('show');
// // 			})
// // 		}

// // 		this.classList.toggle('active');
// // 		item.classList.toggle('show');
// // 	})
// // })
