$('#YellowLight').click(function(){
  var message = new Paho.MQTT.Message('toggle');
  message.destinationName = 'cmnd/sonoff_rb_yl/power';
  message.qos = 0;
  client.send(message);
});

$('#MBTube').click(function(){
  var message = new Paho.MQTT.Message('toggle');
  message.destinationName = 'cmnd/sonoff_mbl/power';
  message.qos = 0;
  client.send(message);
});

$('#RBTube').click(function(){
  var message = new Paho.MQTT.Message('toggle');
  message.destinationName = 'cmnd/sonoff_3ch/POWER1';
  message.qos = 0;
  client.send(message);
});

$('#Staircase').click(function(){
  var message = new Paho.MQTT.Message('toggle');
  message.destinationName = 'cmnd/sonoff_jina/power';
  message.qos = 0;
  client.send(message);
});

$('#MBFan').click(function(){
  var message = new Paho.MQTT.Message('toggle');
  message.destinationName = 'cmnd/sonoff_cfan/power';
  message.qos = 0;
  client.send(message);
});

$('#RBFan').click(function(){
  var message = new Paho.MQTT.Message('toggle');
  message.destinationName = 'cmnd/sonoff_3ch/POWER2';
  message.qos = 0;
  client.send(message);
});

$('#RBLight').click(function(){
  var message = new Paho.MQTT.Message('toggle');
  message.destinationName = 'cmnd/sonoff_3ch/POWER3';
  message.qos = 0;
  client.send(message);
});

$('#MBTV').click(function(){
  var message = new Paho.MQTT.Message('toggle');
  message.destinationName = 'cmnd/sonoff_mb_tv/power';
  message.qos = 0;
  client.send(message);
});

$('#RBSpeaker').click(function(){
  var message = new Paho.MQTT.Message('toggle');
  message.destinationName = 'cmnd/sonoff_rb_speaker/power';
  message.qos = 0;
  client.send(message);
});

$("#menuButton").click(function() {
  $("#menu").toggleClass("close");
});

$("#submit").click(function() {
  var stat = $("#status").val();
  var command = $("#command").val();
  var message = new Paho.MQTT.Message(stat);
  message.destinationName = command;
  message.qos = 0;
  client.send(message);
});
