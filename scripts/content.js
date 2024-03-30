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
  	background-color: #f7f7f7;
		z-index: 999;
		padding: 10px 12px;
  }
	.dictionaryPopupHeader {
		font-size: 16px;
		line-height: 20px;
		width: 100%;
		letter-spacing: 0.5px;
		color: #202122;
	}
	.meaningContainer {
		border: 1px solid #ddd;
  	border-radius: 4px;
		background-color: #fff;
		margin-top: 10px;
		padding: 7px;
		height: 80%;
		overflow: scroll;
		font-size: 13px;
		font-weight: 500;
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
		font-size: 14px;
		font-weight: 700;
	}
	.hDivider {
		width: 100%;
		height: 1px;
		background-color: #eee;
	}
	.audioPlayer {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background-color: grey;
	}
	::-webkit-scrollbar {
 		width: 4px; /* Set the width of the scrollbar */
	}
	::-webkit-scrollbar-thumb {
  	background-color: #cccccc; /* Set the color of the thumb */
  	border-radius: 6px; /* Optional: Set the border-radius of the thumb */
	}
	::-webkit-scrollbar-track {
  	background-color: #fff; /* Set the color of the track */
	}
`;
document.head.appendChild(styleElement);
function createElement(elementType, attributesObject, classesArray) {
	var elem = document.createElement(elementType);
	//adds attributes to the created element
	for (const attr in attributesObject) {
		if (attributesObject.hasOwnProperty(attr)) {
			console.log(attributesObject[attr]);
			elem[attr] = attributesObject[attr];
		}
	}
	//adds CSS classes to the created element
	for (let className of classesArray) {
		elem.classList.add(className);
	}
	return elem;
}
var dictionaryPopup = createElement("div", { id: "dictionaryCardID" }, [
	"dictionaryPopup",
]); //Outermost div for dictionary popup
var dictionaryPopupHeader = createElement(
	"div",
	{ id: "dictionaryPopupHeaderID", textContent: "Dictionary" },
	["dictionaryPopupHeader"]
); //Div for header of the popup
var meaningContainer = createElement("div", { id: "meaningContainerID" }, [
	"meaningContainer",
]); // Div container for meaning
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

function populateMeaning(meaningData) {
	const meaningObj = meaningData[0];
	let wordElement = document.createElement("p");
	wordElement.classList.add("wordElement");
	wordElement.textContent = meaningObj.word;
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
		count++;
		console.log(meaning);
		console.log("*********************************");
		meaningContainer.appendChild(hDivider);
		let partOfSpeech = document.createElement("p");
		partOfSpeech.textContent = meaning.partOfSpeech;
		meaningContainer.appendChild(partOfSpeech);
		let meaningNumber = 0;
		for (let definition of meaning.definitions) {
			meaningNumber++;
			let meaningOfWord = document.createElement("p");
			meaningOfWord.textContent =
				meaningNumber + ". " + definition.definition;
			meaningContainer.appendChild(meaningOfWord);
		}
	}
	console.log("counter: " + count);
}
function populateNoMeaningFound(selectedText) {
	console.log("populateNoMeaningFound called..");
	let wordElement = document.createElement("p");
	wordElement.classList.add("wordElement");
	wordElement.textContent = selectedText;
	meaningContainer.appendChild(wordElement);
	meaningContainer.appendChild(hDivider);
	let noMeaningFoundMsg = document.createElement("p");
	noMeaningFoundMsg.textContent = "No definitions found.";
	meaningContainer.appendChild(noMeaningFoundMsg);
}

let dblClickEventHappend = false;

function dblClickEventHandler(event) {
	console.log("dblClickEventHandler called +++++++++++++++++++++");
	dblClickEventHappend = true;
	docClickHandler(event);
	setTimeout(() => {
		dblClickEventHappend = false;
	}, 1500);
}

function mouseUpEventHandler(event) {
	console.log("mouseUpEventHandler called +++++++++++++++++++++");
	setTimeout(() => {
		if (!dblClickEventHappend) {
			docClickHandler(event);
		}
	}, 2000);
}
function docClickHandler(event) {
	console.log("-------------------docClickHandler------------------");
	console.log(event);
	let selectedText = getSelectedText();
	if (selectedText.trim().length !== 0) {
		fetch(
			"https://api.dictionaryapi.dev/api/v2/entries/en/" +
				selectedText.trim()
		)
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
				console.log("Data in content.js file: ", respData);
				//			chrome.runtime.sendMessage({ data: respData });
				showMeaningPopup(event);
				console.log("this is calling this is calling this is calling");
				populateMeaning(respData);
			})
			.catch((error) => {
				console.log(error.message);
				console.log(selectedText);
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
	console.log("++++++++++++++++++++++++++");
	console.log(x + " " + y);
	console.log("++++++++++++++++++++++++++");
	// const viewportWidth = window.innerWidth;
	// const viewportHeight = window.innerHeight;
	// console.log(`Viewport Width: ${viewportWidth}px`);
	// console.log(`Viewport Height: ${viewportHeight}px`);
	const triggerY = event.clientY - 230 - 60;
	console.log(`trigger Y: ${triggerY}`);
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
	console.log(`trigger X: ${triggerX}`);
	console.log("inner width: " + window.innerWidth);
	if (triggerX > window.innerWidth) {
		x = x - 150;
	}
	console.log(y);
	console.log(x);
	dictionaryPopup.style.left = x + "px";
	dictionaryPopup.style.top = y + "px";
	dictionaryPopup.style.display = "block";
}
function onSingleClick() {
	console.log("on single click");
	var meaningDiv = document.getElementById("dictionaryCardID");
	if (meaningDiv) {
		dictionaryPopup.style.display = "none";
		while (meaningContainer.firstChild) {
			console.log("removing child");
			meaningContainer.removeChild(meaningContainer.firstChild);
		}
	}
}
document.addEventListener("dblclick", dblClickEventHandler);
document.addEventListener("mouseup", mouseUpEventHandler);
document.addEventListener("click", onSingleClick);
