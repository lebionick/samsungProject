window.onload = function(){
	setTimeout(function(){
		loadCardsFromDB();
		}, 30);
}
var width = 360;
function cock() {
	//loadCardsFromDB();
	createCard("WEIRDO", "CHUDAK");
}
var documentsDir;

function sas(){
	  tizen.filesystem.resolve('documents', function(result) {
	      documentsDir = result;
	  });

	  var testFile = documentsDir.createFile('test.txt');
	  if (testFile != null) {
	      testFile.openStream('rw', onOpenSuccess, null, 'UTF-8');
	  }
}
function createCard(native, translate, image){
	 var cards = $("#cardScroller");
	 var nWidth = 0.7 * width;
	 var nHeight = 1.41 * nWidth;
	 //adding texts
	 var newCard = document.createElement("canvas");
	 newCard.width = nWidth;
	 newCard.height = nHeight;
	 var ctx = newCard.getContext("2d");
	 ctx.fillStyle = "white";
	 ctx.fillRect(10,10,nWidth - 10,nHeight - 10);
	// Create gradient
	 var grd = ctx.createLinearGradient(0,-100,0,1.5 * nHeight);
	 grd.addColorStop(0,"black");
	 grd.addColorStop(1,"white");
	 // Fill with gradient
	 ctx.fillStyle = grd;
	 ctx.fillRect(0.05 * nWidth +10, 0.05 * nHeight +10, 0.9 * nWidth -10, 0.9 * nHeight -10);
	 ctx.textAlign="center";
	 ctx.font = "bold "+(width / 20.0)+"px Verdana";
	 ctx.fillStyle = "black";
	 ctx.fillText(native, 0.5 * nWidth, 0.2 * nHeight);
	 ctx.fillText(translate, 0.5 * nWidth,0.85 * nHeight);

	  $("#scrollCards").append(newCard);
	 //put data into database
}

function loadCardsFromDB(){
	for(var i in dbcards){
		createCard(dbcards[i].native, dbcards[i].translate, dbcards[i].image);
	}
//	for(var i=0; i<5; i++)
//		createCard("CHICKEN", "KURITCA");
}

function loadImage(element, src) {
    var ctx = element.getContext("2d");
    var img = document.createElement("IMG");
    img.src = src;
    ctx.drawImage(img, 10, 10);
}
function getListOfImages(element) {
	loadImage();
}
function startEducation(){
	//open new window
	//maximize #cardScroller, redraw, but without translated text
	//card.onclick() = print translated text and draw a tick. Put one xp into bar
	//back button - turn back, not exit
	//endEducation() is pending
}