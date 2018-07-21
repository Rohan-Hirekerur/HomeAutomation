var hostname = '192.168.86.196';
var port = 9002;
var path = ''
var clientid = "" + Math.floor(Math.random() * 100000000000000001);
var devices = {}
var log = {}
client = new Paho.MQTT.Client(hostname, port, path, clientid);

// set callback handlers
client.onConnectionLost = function (responseObject) {
  console.log("Connection Lost: "+responseObject.errorMessage);
  location.reload();
}

client.onMessageArrived = function (message) {
  devices[message.topic] = message.payloadString;
  $("#log").prepend("<tr><td>"+message.topic+"</td>"+"<td>"+message.payloadString+"</td></tr>");
  console.log('Rendering ' + message.topic)
  render(message.topic,message.payloadString);
}

// Connect the client, providing an onConnect callback
client.connect({
  onSuccess: onConnect
});

// Called when the connection is made
function onConnect(){
  console.log("onConnect");
  client.subscribe("#");
  message = new Paho.MQTT.Message("Hello");
  message.destinationName = "/World";
}
deviceID = {
  "/ESP_Easy/EE_Info/Wifi_RSSI":"Other",
  "/World":"Other",
  "Test":"Other",
  "myhome/switch1":"Other",
  "stat/sonoff_rb_yl/POWER":"YellowLight",
  "stat/sonoff_cfan/POWER":"MBFan",
  "stat/sonoff_jina/POWER":"Staircase",
  "stat/sonoff_mb_tv/POWER":"MBTV",
  "stat/sonoff_mbl/POWER":"MBTube",
  "stat/sonoff_3ch/POWER1":"RBTube",
  "stat/sonoff_3ch/POWER2":"RBFan",
  "stat/sonoff_3ch/POWER3":"RBLight",
  "stat/sonoff_rb_speaker/POWER":"RBSpeaker",
  "tele/esp01_relay1/LWT":"Other",
  "tele/esp01_weather/LWT":"Other",
  "tele/esp12e/LWT":"Other",
  "tele/sonoff/LWT":"Other",
  "tele/sonoff_cfan/LWT":"MBFan",
  "tele/sonoff_jina/LWT":"Staircase",
  "tele/sonoff_mb_tv/LWT":"MBTV",
  "tele/sonoff_mbl/LWT":"MBTube",
  "tele/sonoff_rb_yl/LWT":"YellowLight",
  "tele/sonoff_3ch/LWT":"RBTube",
  "tele/sonoff_rb_speaker/LWT":"RBSpeaker",
  "tele/sonoff_small_fan/LWT":"Other",
  "tele/sonoff_wemos/LWT":"Other",
  "/ESP_E_Blk/status/LWT":"Other",
  "/ESP_Easy/status/LWT":"Other",
}

var LWTDict = {
  "MBFan":"tele/sonoff_cfan/LWT",
  "Staircase":"tele/sonoff_jina/LWT",
  "MBTV":"tele/sonoff_mb_tv/LWT",
  "MBTube":"tele/sonoff_mbl/LWT",
  "YellowLight":"tele/sonoff_rb_yl/LWT",
  "RBTube":"tele/sonoff_3ch/LWT",
  "RBSpeaker":"tele/sonoff_rb_speaker/LWT",
}

var offIcons = {
  "YellowLight":"../icon/Home__Mood_off.png",
  "MBFan":"../icon/Home__Fan_off.png",
  "RBFan":"../icon/Home__Fan_off.png",
  "Staircase":"../icon/Home__Stairs_off.png",
  "MBTV":"../icon/Home__TV_off.png",
  "RBTV":"../icon/Home__TV_off.png",
  "MBTube":"../icon/Home__Tubelight_off.png",
  "RBTube":"../icon/Home__Tubelight_off.png",
  "RBLight":"../icon/Home__Bulb_off.png",
  "Other":"../icon/Home__Other_off.png",
  "RBSpeaker":"../icon/Home__Speakers_off.png"
}
var offlineIcons = {
  "YellowLight":"../icon/Home__Mood_offline.png",
  "MBFan":"../icon/Home__Fan_offline.png",
  "RBFan":"../icon/Home__Fan_offline.png",
  "Staircase":"../icon/Home__Stairs_offline.png",
  "MBTV":"../icon/Home__TV_offline.png",
  "RBTV":"../icon/Home__TV_offline.png",
  "MBTube":"../icon/Home__Tubelight_offline.png",
  "RBTube":"../icon/Home__Tubelight_offline.png",
  "RBLight":"../icon/Home__Bulb_offline.png",
  "Other":"../icon/Home__Other_offline.png",
  "RBSpeaker":"../icon/Home__Speakers_offline.png"
}
var onIcons = {
  "YellowLight":"../icon/Home__Mood_on.png",
  "MBFan":"../icon/Home__Fan_on.png",
  "RBFan":"../icon/Home__Fan_on.png",
  "Staircase":"../icon/Home__Stairs_on.png",
  "MBTV":"../icon/Home__TV_on.png",
  "RBTV":"../icon/Home__TV_on.png",
  "MBTube":"../icon/Home__Tubelight_on.png",
  "RBTube":"../icon/Home__Tubelight_on.png",
  "RBLight":"../icon/Home__Bulb_on.png",
  "Other":"../icon/Home__Other_on.png",
  "RBSpeaker":"../icon/Home__Speakers_on.png"
}

for (device in deviceID) {
  var curr = deviceID[device];
  $("#"+curr).css("background-image", 'url("'+offlineIcons[curr]+'")');
}

function render(device,stat) {
  var currentDevice = deviceID[device];
  console.log(currentDevice);

  if(stat === "Offline") {
    if(currentDevice === "RBTube") {
      $("#RBFan").css("background-image", 'url("'+offlineIcons["RBFan"]+'")');
      $("#RBLight").css("background-image", 'url("'+offlineIcons["RBLight"]+'")');
    }
    $("#"+currentDevice).css("background-image", 'url("'+offlineIcons[currentDevice]+'")');
    return;
  }
  else {
    console.log(device+ "  " +deviceID[device] + "  " + stat);
    if(stat === "ON" && devices[LWTDict[currentDevice]] !== "Offline") {
      $("#"+currentDevice).css("background-image", 'url("'+onIcons[currentDevice]+'")');
    }
    else if(stat === "OFF" && devices[LWTDict[currentDevice]] !== "Offline"){
      $("#"+currentDevice).css("background-image", 'url("'+offIcons[currentDevice]+'")');
    }
    else if(stat.includes('Temperature')) {
      var stated = JSON.parse(stat);
      $("#temp").html("<tr><td>Temperature : " + stated.DHT11.Temperature + ' <span>&#8451;</span></td>' + "<td>Humidity : " + stated.DHT11.Humidity + "%</td></tr>");
    }
  }
}
