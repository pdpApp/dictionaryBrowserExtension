var myVariable = "Hello from popup";

let dblclickCheckbox = document.getElementById("dblclickToggler");
let mouseselectionCheckbox = document.getElementById("mouseselectionToggler");
console.log(dblclickCheckbox);

let dblclickToggler = true;
let mouseselectionToggler = true;
// Add event listener for the 'change' event
dblclickCheckbox.addEventListener("change", function (event) {
	// Check if the checkbox is checked
	if (event.target.checked) {
		console.log("Checkbox is checked");
		dblclickToggler = true;
		sendMsgToContentJS();
		// Do something when the checkbox is checked
	} else {
		console.log("Checkbox is unchecked");
		dblclickToggler = false;
		sendMsgToContentJS();
		// Do something when the checkbox is unchecked
	}
});

mouseselectionCheckbox.addEventListener("change", function (event) {
	// Check if the checkbox is checked
	if (event.target.checked) {
		console.log("Checkbox is checked");
		mouseselectionToggler = true;
		sendMsgToContentJS();
		// Do something when the checkbox is checked
	} else {
		console.log("Checkbox is unchecked");
		mouseselectionToggler = false;
		sendMsgToContentJS();
		// Do something when the checkbox is unchecked
	}
});

function sendMsgToContentJS() {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		console.log("in sender");
		chrome.tabs.sendMessage(tabs[0].id, {
			variable1: myVariable,
			isDblClickEnable: dblclickToggler,
			isMouseSelectionEnable: mouseselectionToggler,
		});
	});
}
