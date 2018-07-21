$("form").submit(function(event) {
  var nickname = $("#nickname").val();
  var command = $('#command').val();
  var status = $('#status').val();
  var LWTval = $('#LWT').val();
  var On = $('#On').val();
  var Off = $('#Off').val();
  var Offline = $('#Offline').val();
  event.preventDefault();
  if(nickname !== "" && command !== "" && status !== "" && On !== "" && Off !== "" && Offline !== "") {
    deviceID[status] = nickname;
    deviceID[LWTval] = nickname;
    commandDevices[nickname] = command;
    event.preventDefault();
  }
  event.preventDefault();
});
