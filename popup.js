let dblclickCheckbox = document.getElementById("dblclickToggler");
let mouseselectionCheckbox = document.getElementById("mouseselectionToggler");

let dataStored = {};

(async () => {
	const { checkboxState } = await chrome.runtime.sendMessage({ fetchFeatures: "checkboxes" });
	dataStored = checkboxState;
	dblclickCheckbox.checked = checkboxState.dblClickToggler;
	mouseselectionCheckbox.checked = checkboxState.mouseSelectionToggler;
})();

// Add event listener for the 'change' event
dblclickCheckbox.addEventListener("change", function (event) {
	const isChecked = event.target.checked;
	dataStored.dblClickToggler = isChecked;
	chrome.runtime.sendMessage({ setCheckboxValues: dataStored });
});

mouseselectionCheckbox.addEventListener("change", function (event) {
	const isChecked = event.target.checked;
	dataStored.mouseSelectionToggler = isChecked;
	chrome.runtime.sendMessage({ setCheckboxValues: dataStored });
});
