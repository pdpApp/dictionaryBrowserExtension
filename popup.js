var myVariable = "Hello from popup";

let dblclickCheckbox = document.getElementById("dblclickToggler");
let mouseselectionCheckbox = document.getElementById("mouseselectionToggler");
console.log(dblclickCheckbox);

//const dataStored = {};

const dataToShare = {
	dblclickToggler: true,
	mouseselectionToggler: true,
};
//chrome.storage.sync.set(dataToShare);
// Add event listener for the 'change' event
dblclickCheckbox.addEventListener("change", function (event) {
	const isChecked = event.target.checked;
	// const data = {};
	// data["dblClickCheckboxStorage"] = isChecked;

	// Check if the checkbox is checked
	if (isChecked) {
		console.log("Checkbox is checked");
		dataToShare.dblclickToggler = true;
		//dataStored.dblclickToggler = true;
		console.log(dataToShare);
		//console.log(dataStored);
		sendMsgToContentJS();
		// Do something when the checkbox is checked
	} else {
		console.log("Checkbox is unchecked");
		dataToShare.dblclickToggler = false;
		dataStored.dblclickToggler = false;
		sendMsgToContentJS();
		// Do something when the checkbox is unchecked
	}
	//chrome.storage.sync.set(dataStored);
});

mouseselectionCheckbox.addEventListener("change", function (event) {
	const isChecked = event.target.checked;
	//chrome.storage.sync.set(dataToShare);
	// Check if the checkbox is checked
	if (isChecked) {
		console.log("Checkbox is checked");
		dataToShare.mouseselectionToggler = true;
		//dataStored.mouseselectionToggler = true;

		sendMsgToContentJS();
	} else {
		console.log("Checkbox is unchecked");
		dataToShare.mouseselectionToggler = false;
		//dataStored.mouseselectionToggler = false;

		sendMsgToContentJS();
	}
	//chrome.storage.sync.set(dataStored);
});

function sendMsgToContentJS() {
	chrome.windows.getAll({ populate: true }, function (windows) {
		windows.forEach(function (window) {
			window.tabs.forEach(function (tab) {
				chrome.tabs.sendMessage(tab.id, { data: dataToShare });
			});
		});
	});
}

// document.addEventListener("DOMContentLoaded", function () {
// 	console.log("dom content loaded event");
// 	// Restore checkbox states
// 	setTimeout(() => {
// 		chrome.storage.sync.get(["dblclickToggler", "mouseselectionToggler", "test"], function (result) {
// 			console.log("-----------------------");
// 			console.log(result);
// 			console.log(result["test"]);
// 			console.log(result["dblclickToggler"]);
// 			console.log(result["mouseselectionToggler"]);
// 			console.log("-----------------------");

// 			dblclickCheckbox.checked = result["dblclickToggler"];
// 			mouseselectionCheckbox.checked = result["mouseselectionToggler"];
// 			// const checkbox1 = document.getElementById("checkbox1-id");
// 			// checkbox1.checked = result.checkbox1State || false; // Default to false if not set

// 			// const checkbox2 = document.getElementById("checkbox2-id");
// 			// checkbox2.checked = result.checkbox2State || false; // Default to false if not set
// 		});
// 	}, 500);
// });
