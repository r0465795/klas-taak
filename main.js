// lucs@sabayon ~/tmp/ProberRequestNodeJs $ npm install --save request
var request = require("request");

// http://stackoverflow.com/questions/10888610/ignore-invalid-self-signed-ssl-certificate-in-node-js-with-https-request
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";



var BASE_URL = "https://web-ims.thomasmore.be/datadistribution/API/2.0";
var Settings = function (url) {
	this.url = BASE_URL + url;
	this.method = "GET";
	this.qs = {format: 'json'};
	this.headers = {
		authorization: "Basic aW1zOno1MTJtVDRKeVgwUExXZw=="
	};
};

var Drone = function (name, mac) {
	this.name = name;
	this.mac = mac;
};
var File = function (id){
        this.id = id;
};

var dronesSettings = new Settings("/drones?format=json");
var FilesSettings = new Settings("/files?format=json");

var droneMem = [];
var fileMEM = [];
request(FilesSettings, function(error, response, fileString){
    var Files = JSON.parse(fileString);
    console.log("********************************");
    Files.forEach(function (File){
        var FileSettings = new Settings("/files/" + File.id + "?format==json")
        request(FileSettings, function (error, response, droneString){
            var File = JSON.parse(fileString);
            fileMEM.push(new file(File.id));
            console.log(fileMEM);
            console.log("********************************************");
        });
    });
});
request(dronesSettings, function (error, response, dronesString) {
	var drones = JSON.parse(dronesString);
	console.log(drones);
	console.log("***************************************************************************");
	drones.forEach(function (drone) {
		var droneSettings = new Settings("/drones/" + drone.id + "?format=json")
		request(droneSettings, function (error, response, droneString) {
			var drone = JSON.parse(droneString);
			droneMem.push(new Drone(drone.name, drone.mac_address));
			console.log(droneMem);
			console.log("***************************************************************************");
		});
	});
});

console.log("Hello World!");