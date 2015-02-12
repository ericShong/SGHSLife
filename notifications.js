var n = document.getElementById('notificationsList')
var newNotification = document.getElementById('newNotification');
var removeNotification = document.getElementById('removeNotification');
nArray = ["Don't forget to turn in FBLA State Conference Permission Slips!", "CSF Applications are out! Due September"]
for (var i = 0; i < nArray.length; ++i){
	var notif = document.createElement('div');
	var checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	notif.appendChild(checkbox);
	var txt = document.createTextNode(nArray[i]);
	notif.appendChild(txt);
	n.appendChild(notif);
}