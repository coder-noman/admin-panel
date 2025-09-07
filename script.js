//bts ="";

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

		

		if(splited_data[5] == 1){
			document.getElementById('bgp-psu1').innerText = 'ON';
		}
		else{
			document.getElementById('bgp-psu1').innerText = 'OFF';
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

// main 

//power supply unit

const bgpPSU1 = document.getElementById('bgp-psu1');
const bgpPSU2 = document.getElementById('bgp-psu2');
const fortinetPSU1 = document.getElementById('fortinet-psu1');
const fortinetPSU2 = document.getElementById('fortinet-psu2');
const checkPointPSU1 = document.getElementById('check-point-psu1');
const checkPointPSU2 = document.getElementById('check-point-psu2');
const ciscoPsu = document.getElementById('cisco-psu');
const lanPsu = document.getElementById('lan-psu');
const ciscoDistPsu = document.getElementById('cisco-distribution-psu');
const hoDrPsu1 = document.getElementById('ho-dr-psu1');
const hoDrPsu2 = document.getElementById('ho-dr-psu2');
const hoServicePsu1 = document.getElementById('ho-service-psu1');
const hoServicePsu2 = document.getElementById('ho-service-psu2');
const pabxPsu = document.getElementById('pabx-psu');
const nvrPsu = document.getElementById('nvr-psu');
const r7301Psu1 = document.getElementById('r730-1-psu1');
const r7301Psu2 = document.getElementById('r730-1-psu2');
const r7302Psu1 = document.getElementById('r730-2-psu1');
const r7302Psu2 = document.getElementById('r730-2-psu2');
const sanSw1psu1 = document.getElementById('san-sw1-psu1');
const sanSw1psu2 = document.getElementById('san-sw1-psu2');
const sanSwpsu1 = document.getElementById('san-sw-psu1');
const sanSwpsu2 = document.getElementById('san-sw-psu2');
const sanSoragepsu1 = document.getElementById('san-sorage-psu1');
const sanSoragepsu2 = document.getElementById('san-sorage-psu2');

// bgpPSU1.innerText = 'OFF'


// Others Alarm Unit

const waterLeakage = document.getElementById('water-leakage');
const fireAlarm = document.getElementById('fire-Alarm');
const generatorStatus = document.getElementById('generator-status');
const ups1CB = document.getElementById('ups1-cb-status');
const ups2CB = document.getElementById('ups2-cb-status');

ups2CB.innerText = 'OK';