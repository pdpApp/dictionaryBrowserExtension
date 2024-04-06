chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.local.set({
		checkboxState: {
			dblClickToggler: true,
			mouseSelectionToggler: false,
		},
	});
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.fetchFeatures === "checkboxes") {
		chrome.storage.local.get("checkboxState").then(sendResponse);
		return true;
	}
	if (message.setCheckboxValues) {
		chrome.storage.local.set({
			checkboxState: message.setCheckboxValues,
		});
		chrome.windows.getAll({ populate: true }, function (windows) {
			windows.forEach(function (window) {
				window.tabs.forEach(function (tab) {
					chrome.tabs.sendMessage(tab.id, {
						from: "service-worker",
						data: message.setCheckboxValues,
					});
				});
			});
		});
	}
});
