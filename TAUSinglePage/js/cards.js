window.onload = function(){
	setTimeout(function(){
		loadCardsFromDB();
		}, 1000);
}
var texts = [];
var width = 360;
function cock() {
	//loadCardsFromDB();
	createCard("WEIRDO", "CHUDAK");
	showcontent();
	console.log("FILES INCLUDE:");
	console.log(texts);
	//->load images names into array. Show them in list, with choosing
	//->by button you can apply to canvas, with combination pathknown + name.jpg
	//rename shit
}
var documentsDir;

function createCard(native, translate, image){
	 var cards = $("#cardScroller");
	 var nWidth = 0.7 * width;
	 var nHeight = 1.41 * nWidth;

	 var newCard = document.createElement("canvas");
	 newCard.width = nWidth;
	 newCard.height = nHeight;
	 var ctx = newCard.getContext("2d");
	 ctx.fillStyle = "white";
	 ctx.fillRect(10,10,nWidth - 10,nHeight - 10);

	 var grd = ctx.createLinearGradient(0,-100,0,1.5 * nHeight);
	 grd.addColorStop(0,"black");
	 grd.addColorStop(1,"white");

	 ctx.fillStyle = grd;
	 ctx.fillRect(0.05 * nWidth +10, 0.05 * nHeight +10, 0.9 * nWidth -10, 0.9 * nHeight -10);
	 ctx.textAlign="center";
	 ctx.font = "bold "+(width / 20.0)+"px Verdana";
	 ctx.fillStyle = "black";
	 ctx.fillText(native, 0.5 * nWidth, 0.2 * nHeight);
	 ctx.fillText(translate, 0.5 * nWidth,0.85 * nHeight);
	 
	 newCard.te = native;
	 newCard.onclick = function(){
		//alert(this.te);
		var ctx = this.getContext("2d");
		var img = document.createElement("IMG");
		img.width = 200;
		img.height = 300;
		img.src = "file:///opt/usr/media/Images/20170711_153913.jpg";
//		findphoto(function(file){
//			console.log(file);
//			img.src = file;
//		});
		ctx.drawImage(img, 10, 10);
	   // ctx.drawImage(img, 10, 10);
//	    var ctx = this.getContext("2d");
////	    var img = document.createElement("IMG");
////	    img.src = "images/tizen_32.png";
////	    img.width = 200;
////	    img.height = 300;
//	    ctx.drawImage(img, 10, 10);
	 };
//	 newCard.onmousedown = function(){
//		 timer = setTimeout( doStuff, 500);
//	 };
//
//	 newCard.onmouseup = function(){
//		 clearTimeout( timer );
//	 };
//	 
//	 function doStuff() {
//		  alert('choose image from library');
//	 }

	  $("#scrollCards").append(newCard);

}

function loadCardsFromDB(){
	for(var i in dbcards){
		console.log("LOADCARDSFROMDB");
		createCard(dbcards[i].native, dbcards[i].translate, dbcards[i].image);
	}
}
function showcontent(){

	 tizen.filesystem.resolve(
		     'images',
		     function(dir){
		       documentsDir = dir; 
		       dir.listFiles(onsuccess,onerror);
		     }, function(e) {
		       console.log("Error" + e.message);
		     }, "r"
		 );
	 function onsuccess(files) {
		   for(var i = 0; i < files.length; i++) {
		     console.log(files[i].name);
		     texts.push(files[i].name);
		   }
	  }
	 function onerror(error) {
		   console.log("The error " + error.message + " occurred when listing the files in the selected folder");
	}

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

function findphoto(onFind) {
    // find all images in content storage with specified prefix
    var titleFilter = new tizen.AttributeFilter(
            'title',
            'STARTSWITH',
            "20170711_153913"
        ),
        typeFilter = new tizen.AttributeFilter('type', 'EXACTLY', 'IMAGE');

    try {
        tizen.content.find(
            function findSuccess(files) {
                if (files.length !== 0) {
                    // run callback with last image
                    onFind(files[0].contentURI);
                } else {
                    onFind(null);
                }
            },
            null,
            null,
            new tizen.CompositeFilter(
                'INTERSECTION',
                [titleFilter, typeFilter]
            ),
            new tizen.SortMode('modifiedDate', 'DESC')
        );
    } catch (e) {
        console.log('findPhoto error: ', e.message);
    }
}