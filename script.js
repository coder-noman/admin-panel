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

const bts = document.getElementById('bts');
const upsA = document.getElementById('upsA');
const upsB = document.getElementById('upsB');
const pdb = document.getElementById('pdb');
const temperature = document.getElementById('temperature');

temperature.innerText = 219;




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

bgpPSU1.innerText = 'OFF'


// Others Alarm Unit

const waterLeakage = document.getElementById('water-leakage');
const fireAlarm = document.getElementById('fire-Alarm');
const generatorStatus = document.getElementById('generator-status');
const ups1CB = document.getElementById('ups1-cb-status');
const ups2CB = document.getElementById('ups2-cb-status');

ups2CB.innerText = 'OK';