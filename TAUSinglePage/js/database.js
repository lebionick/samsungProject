var baseName 	  = "DataBase1";
var storeName 	  = "CardsStore";
var indexedDB 	  = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var IDBTransaction  = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;


!function(){
	console.log("LOADDB");
	//clearStorage();
	fillCards();
	loadCards();
}();
var dbcards;
function fillCards(){
	var pack = [];
	pack.push({ native: "Mother", translate: "Mama", image: undefined });
	pack.push({ native: "Father", translate: "Papa", image: undefined });
	for(var card in pack){
		setData(pack[card]);
	}
}
function loadCards(){
	console.log("LOAD");
	var cards = [];
	getStorage(function(res){
    	for(var field in res) {
    		cards.push(res[field]);
    		console.log("I HAVE GOT",res[field]);
    	}
	});
	dbcards = cards;
}

function logerr(err){
	console.log(err);
	console.log("ERROR CREATE DB");
			
}

function connectDB(f){
	console.log("CONNECTED DB " + baseName);
	var request = indexedDB.open(baseName, 1);
	request.onerror = logerr;
	request.onsuccess = function(){
		f(request.result);
		
	}
	request.onupgradeneeded = 
		function(e){
			var objectStore = e.currentTarget.result.createObjectStore(storeName, { autoIncrement: true });
			connectDB(f);
		}
}

function getStorage(f){
	connectDB(function(db){
		var rows = [],
			store = db.transaction([storeName], "readonly").objectStore(storeName);

		if(store.mozGetAll)
			store.mozGetAll().onsuccess = function(e){
				f(e.target.result);
			};
		else
			store.openCursor().onsuccess = function(e) {
			console.dir(e);
				var cursor = e.target.result;
				if(cursor){
					rows.push(cursor.value);
					cursor.continue();
				}
				else {
					f(rows);
				}
			};
	});
}

function setData(obj){
	connectDB(function(db){
		var request = db.transaction([storeName], "readwrite").objectStore(storeName).add(obj);
		request.onerror = logerr;
		request.onsuccess = function(){
			return request.result;
		}
	});
}

function delData(key){
	connectDB(function(db){
		var request = db.transaction([storeName], "readwrite").objectStore(storeName).delete(key);
		request.onerror = logerr;
		request.onsuccess = function(){
			console.log("File delete from DB:", storeName);
		}
	});
}

function clearStorage(){
	connectDB(function(db){
		var request = db.transaction([storeName], "readwrite").objectStore(storeName).clear();;
		request.onerror = logerr;
		request.onsuccess = function(){
			console.log("Clear");
		}
	});
}
