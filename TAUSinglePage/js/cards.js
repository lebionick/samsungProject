window.onload = function(){
	setTimeout(function(){
		loadCardsFromDB();
		}, 1000);
	loadNames();
};
var imagenames = [];
var imagez = {};
var width = 360;
var flag = false;

function cock() {
	//createCard("WEIRDO", "CHUDAK");
//	console.log(dbcards);
//	console.log(imagenames);
	//createCard(1488, "gergeger", "gegege");
	//->by button you can apply to canvas, with combination pathknown + name.jpg
	//rename shit
	console.log(imagenames);
}
var currentCanvas;

function chooseImage(){
	currentCanvas = this;
	var fns = $("#filenamesscroll");
	if(flag === false){
		for(var i in imagenames){
			var fn = imagenames[i];
			fns.append("<li><button onclick = 'applyImageToCard(this.innerHTML)'>"+fn+"</button></li>");
		}
		flag = true;
	}

	if(fns.css("visibility") == "hidden"){
		fns.css("visibility", "visible"); 
	}
	else
		fns.css("visibility", "hidden"); 
}

function applyImageToCard(url){
	var ctx = currentCanvas.getContext("2d");
	var img = document.createElement("IMG");
	img.src = "file:///opt/usr/media/Images/"+url;
	ctx.drawImage(img, 30, 80, 200, 200);
	
	var fns = $("#filenamesscroll");
	fns.css("visibility", "hidden"); 
	delandset(currentCanvas.id, ("file:///opt/usr/media/Images/"+url));
}
var deleted = [];
function delandset(imgid, url){
	console.log("ID OF CANVAS YOU CLICKED: "+imgid + url);
	if(!deleted.contains(imgid)){
		delData(imgid);
		deleted.push(imgid);
	//	console.log("CHANGING CARD TO CARD WITH IMAGE: "+url);
		setData({ native: currentCanvas.native, translate: currentCanvas.trans, image: url });
	}
}

var documentsDir;

function createCard(id, native, translate, image){

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
	 
//	 if(image){
//		 var izo = document.createElement("IMG");
//		 izo.src = image;
	//	 ctx.drawImage(image, 30, 80, 200, 200);
//	 }

	 ctx.textAlign="center";
	 ctx.font = "bold "+(width / 20.0)+"px Verdana";
	 ctx.fillStyle = "black";
	 ctx.fillText(native, 0.5 * nWidth, 0.2 * nHeight);
	 ctx.fillText(translate, 0.5 * nWidth,0.85 * nHeight);
	 console.log("IMAGE NAME: " + image);
	 
	 newCard.trans = translate;
	 newCard.native = native;
	 newCard.id = id;

	 newCard.onclick = chooseImage;
	 $("#scrollCards").append(newCard);

}


function loadCardsFromDB(){
	for(var i in dbcards){
		console.log("LOADCARDSFROMDB");
		createCard(dbcards[i].id, dbcards[i].native, dbcards[i].translate, dbcards[i].image);
	}
}
function loadNames(){

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
		     imagenames.push(files[i].name);
		   }
	  }
	 function onerror(error) {
		   console.log("The error " + error.message + " occurred when listing the files in the selected folder");
	}

}

function imagine(url){
	var izobra = document.createElement("IMG");
	izobra.src = url;
	return izobra;
}


function startEducation(){
	//open new window
	//maximize #cardScroller, redraw, but without translated text
	//card.onclick() = print translated text and draw a tick. Put one xp into bar
	//back button - turn back, not exit
	//endEducation() is pending
}
//
//function findphoto(onFind) {
//    // find all images in content storage with specified prefix
//    var titleFilter = new tizen.AttributeFilter(
//            'title',
//            'STARTSWITH',
//            "20170711_153913"
//        ),
//        typeFilter = new tizen.AttributeFilter('type', 'EXACTLY', 'IMAGE');
//
//    try {
//        tizen.content.find(
//            function findSuccess(files) {
//                if (files.length !== 0) {
//                    // run callback with last image
//                    onFind(files[0].contentURI);
//                } else {
//                    onFind(null);
//                }
//            },
//            null,
//            null,
//            new tizen.CompositeFilter(
//                'INTERSECTION',
//                [titleFilter, typeFilter]
//            ),
//            new tizen.SortMode('modifiedDate', 'DESC')
//        );
//    } catch (e) {
//        console.log('findPhoto error: ', e.message);
//    }
//}