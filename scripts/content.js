var styleElement = document.createElement("style");
// Add your CSS rules to the style element
styleElement.textContent = `
  .dictionaryPopup {
		display: none;
    	width: 300px;
		height: 230px;
		position: absolute;
		border: 1px solid #ddd;
  		border-radius: 4px;
  		box-shadow: 0 30px 90px -20px rgba(0,0,0,0.3), 0 0 1px 1px rgba(0,0,0,0.05);
  		background-color: #f7f7f7 !important;
		z-index: 10000;
		padding: 10px 12px !important;
  }
	.dictionaryPopupHeader {
		font-size: 16px !important;
		line-height: 20px !important;
		width: 100%;
		letter-spacing: 0.5px !important;
		color: #202122 !important;
	}
	.meaningContainer {
		border: 1px solid #ddd !important;
  		border-radius: 4px !important;
		background-color: #fff !important;
		margin-top: 10px !important;
		padding: 7px !important;
		height: 80% !important;
		overflow: scroll !important;
		font-size: 13px !important;
		font-weight: 500 !important;
	}
	.dictionaryPopupBottom {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		margin-top: 13px;
	}
	.saveBtn {
		font-size: 12px;
    	cursor: pointer;
		color: #666666;
		border: 1px solid #b2b2b2;
		border-radius: 1px;
		padding: 4px 6px;
		background-color: #f5f5f5;
	}
	.saveBtn:hover {
		background-color: #f5f5f56b;
	}
	.wordElement {
		font-size: 14px !important;
		font-weight: 700 !important;
		color: #1b1b1b !important;
	}
	.meaningContainer p {
		color: #1b1b1b !important;
		line-height: 15px !important;
		margin-top: 7px  !important;
		margin-bottom: 7px  !important;
	}
	.hDivider {
		width: 100%;
		height: 1.5px;
		background-color: #eee;
	}
	.audioPlayer {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background-color: grey;
	}
	.meaningContainer::-webkit-scrollbar {
 		width: 4px !important; /* Set the width of the scrollbar */
	}
	.meaningContainer::-webkit-scrollbar-thumb {
  		background-color: #cccccc !important; /* Set the color of the thumb */
  		border-radius: 6px !important; /* Optional: Set the border-radius of the thumb */
	}
	.meaningContainer::-webkit-scrollbar-track {
  		background-color: #fff !important; /* Set the color of the track */
	}
	.f-italics {
		font-style: italic;
	}
`;

let isDblClickEnabled = true;
let isMouseSelectionEnabled = true;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	console.log("in listner");
	if (message.variable1) {
		var receivedVariable = message.variable1;
		console.log("Received variable from popup:", receivedVariable);
		// Do something with receivedVariable
	}
	if (message.isDblClickEnable) {
		console.log("dbl click true");
		isDblClickEnabled = true;
	} else {
		console.log("dbl click false");
		isDblClickEnabled = false;
	}
	if (message.isMouseSelectionEnable) {
		console.log("isMouseSelectionEnable  true");
		isMouseSelectionEnabled = true;
	} else {
		console.log("isMouseSelectionEnable false");
		isMouseSelectionEnabled = false;
	}
});

document.head.appendChild(styleElement);
function createElement(elementType, attributesObject, classesArray) {
	var elem = document.createElement(elementType);
	//adds attributes to the created element
	for (const attr in attributesObject) {
		if (attributesObject.hasOwnProperty(attr)) {
			elem[attr] = attributesObject[attr];
		}
	}
	//adds CSS classes to the created element
	for (let className of classesArray) {
		elem.classList.add(className);
	}
	return elem;
}
var dictionaryPopup = createElement("div", { id: "dictionaryCardID" }, ["dictionaryPopup"]); //Outermost div for dictionary popup
var dictionaryPopupHeader = createElement("div", { id: "dictionaryPopupHeaderID", textContent: "Dictionary" }, [
	"dictionaryPopupHeader",
]); //Div for header of the popup
var meaningContainer = createElement("div", { id: "meaningContainerID" }, ["meaningContainer"]); // Div container for meaning
var hDivider = createElement("div", {}, ["hDivider"]); // Div which acts as a horizontal divider
dictionaryPopup.appendChild(dictionaryPopupHeader);
dictionaryPopup.appendChild(meaningContainer);
document.body.appendChild(dictionaryPopup);
// Following code is for addding Save button to popup bottom
// var dictionaryPopupBottom = document.createElement("div");
// var saveButton = document.createElement("button");
// saveButton.textContent = "Save Word";
// dictionaryPopupBottom.id = "dictionaryPopupBottomID";
// dictionaryPopupBottom.classList.add("dictionaryPopupBottom");
// saveButton.classList.add("saveBtn");
// dictionaryPopupBottom.appendChild(saveButton);
//dictionaryPopup.appendChild(dictionaryPopupBottom);
{
	/* <audio id="audioPlayer" controls preload="auto">
  <source src="your-audio-file.mp3" type="audio/mp3">
  Your browser does not support the audio tag.
</audio> */
}
// var audioPlayer = document.createElement("div");
// audioPlayer.classList.add("audioPlayer");
// var pronunciationPlayer = document.createElement("audio");
// pronunciationPlayer.id = "audioPlayer";
// pronunciationPlayer.controls = true;
// pronunciationPlayer.preload = "none";
// var sourceElem = document.createElement("source");
// sourceElem.type = "audio/mp3";
// pronunciationPlayer.appendChild(sourceElem);
// audioPlayer.appendChild(pronunciationPlayer);
// let audioSrc = null;
// audioPlayer.addEventListener("click", function () {
// 	console.log("audio source saved: " + audioSrc);
// 	sourceElem.src = audioSrc;
// 	pronunciationPlayer.src = audioSrc;
// 	var playPromise = pronunciationPlayer.play();
// 	if (playPromise !== undefined) {
// 		playPromise
// 			.then((_) => {
// 				console.log("playing audio");
// 			})
// 			.catch((error) => {
// 				console.log(error);
// 			});
// 	}
// });

let dblClickEventHappend = false;

function dblClickEventHandler(event) {
	dblClickEventHappend = true;
	if (isDblClickEnabled) {
		fetchMeaningOfSelected(event);
	}
	setTimeout(() => {
		dblClickEventHappend = false;
	}, 1000);
}

function mouseUpEventHandler(event) {
	setTimeout(() => {
		if (!dblClickEventHappend && isMouseSelectionEnabled) {
			fetchMeaningOfSelected(event);
		}
	}, 500);
}
function fetchMeaningOfSelected(event) {
	let selectedText = getSelectedText();
	if (selectedText.trim().length !== 0) {
		fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + selectedText.trim())
			.then((response) => {
				// Check if the request was successful (status code in the range 200-299)
				if (!response.ok) {
					throw new Error("No definitions found");
				}
				// Parse the response as JSON
				return response.json();
			})
			.then((respData) => {
				// Process the JSON respData
				showMeaningPopup(event);
				populateMeaning(respData);
			})
			.catch((error) => {
				showMeaningPopup(event);
				populateNoMeaningFound(selectedText);
			});
	}
}
function getSelectedText() {
	var selectedText = "";
	if (window.getSelection) {
		selectedText = window.getSelection().toString();
	} else if (document.selection && document.selection.type !== "Control") {
		selectedText = document.selection.createRange().text;
	}
	return selectedText;
}
function showMeaningPopup(event) {
	let x = event.pageX - 150;
	let y = event.pageY - 290;
	const triggerY = event.clientY - 230 - 60;
	//handling if popup is overflowing out of top
	if (triggerY < 0) {
		y = y - triggerY;
		if (x - 210 < 0) {
			x = x + 210;
		} else {
			x = x - 210;
		}
	}
	//handling if popup is overflowing out of left
	if (x < 0) {
		x = 150 - x;
	}
	//handling if popup is overflowing out of right
	const triggerX = event.clientX + 150;
	if (triggerX > window.innerWidth) {
		x = x - 150;
	}
	dictionaryPopup.style.left = x + "px";
	dictionaryPopup.style.top = y + "px";
	dictionaryPopup.style.display = "block";
}

function populateMeaning(meaningData) {
	const meaningObj = meaningData[0];
	let wordElement = createElement("p", { textContent: meaningObj.word }, ["wordElement"]);
	meaningContainer.appendChild(wordElement);
	// for (let phonetic of meaningObj.phonetics) {
	// 	if (phonetic.audio && phonetic.audio.includes("mp3")) {
	// 		sourceElem.src = phonetic.audio;
	// 		audioSrc = phonetic.audio;
	// 	}
	// }
	//meaningContainer.appendChild(audioPlayer);
	let count = 0;
	for (let meaning of meaningObj.meanings) {
		const clonedHDividerNode = hDivider.cloneNode(true); // true parameter clones all descendants as well
		if (count > 0) {
			meaningContainer.appendChild(clonedHDividerNode);
		}

		let partOfSpeech = createElement("p", { textContent: meaning.partOfSpeech }, ["f-italics"]);
		meaningContainer.appendChild(partOfSpeech);
		let meaningNumber = 0;
		for (let definition of meaning.definitions) {
			meaningNumber++;
			let meaningOfWord = document.createElement("p");
			meaningOfWord.textContent = meaningNumber + ". " + definition.definition;
			meaningContainer.appendChild(meaningOfWord);
		}
		count++;
	}
	meaningContainer.scrollTop = 0;
}
function populateNoMeaningFound(selectedText) {
	let wordElement = createElement("p", { textContent: selectedText }, ["wordElement"]);
	meaningContainer.appendChild(wordElement);
	meaningContainer.appendChild(hDivider);
	let noMeaningFoundMsg = document.createElement("p");
	noMeaningFoundMsg.textContent = "No definitions found.";
	meaningContainer.appendChild(noMeaningFoundMsg);
}

function onSingleClick() {
	var meaningDiv = document.getElementById("dictionaryCardID");
	if (meaningDiv) {
		dictionaryPopup.style.display = "none";
		while (meaningContainer.firstChild) {
			meaningContainer.removeChild(meaningContainer.firstChild);
		}
	}
}
document.addEventListener("dblclick", dblClickEventHandler);
document.addEventListener("mouseup", mouseUpEventHandler);
document.addEventListener("click", onSingleClick);
