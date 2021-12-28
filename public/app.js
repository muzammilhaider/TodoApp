const firebaseConfig = {
	apiKey: "AIzaSyC-q_a0_N3KHsAO6ZI96WWhp9HvF5YT5ww",
	authDomain: "todoapp-2133d.firebaseapp.com",
	databaseURL: "https://todoapp-2133d-default-rtdb.firebaseio.com",
	projectId: "todoapp-2133d",
	storageBucket: "todoapp-2133d.appspot.com",
	messagingSenderId: "920375350791",
	appId: "1:920375350791:web:da25497a67fee61935fca2"
  };

const app = firebase.initializeApp(firebaseConfig);
var lists = document.getElementById("todo_list");
app.database().ref("todo").on("child_added" , function(data){
	var texts = data.val().userInput;
	var li = document.createElement("li");
	li.setAttribute('class','list-unstyled');
	li.style.padding = "10px";
	li.style.backgroundColor = "#8ad07e";
	li.style.color = "white";
	li.style.borderRadius = "7px";
	li.style.marginBottom = "10px";
	li.appendChild(document.createTextNode(texts));

	var btn_edit = document.createElement("button");
	var edit_text = document.createTextNode("Edit");
	btn_edit.setAttribute("onclick","editRow(this)");
	btn_edit.setAttribute("class","btn btn-info");
	btn_edit.setAttribute("id",data.val().key);
	btn_edit.appendChild(edit_text);

	var btn_delete = document.createElement("button");
	var delete_text = document.createTextNode("Delete");
	btn_delete.setAttribute("onclick","deleteRow(this)");
	btn_delete.setAttribute("class","btn btn-danger");
	btn_delete.setAttribute("id",data.val().key);
	btn_delete.appendChild(delete_text);

	li.appendChild(btn_edit);
	li.appendChild(btn_delete);
	lists.appendChild(li);
})

function addList() {
	var userInput = document.getElementById("userInput");
	if(userInput.value.length > 3){
		var value = userInput.value;
		var key = app.database().ref('/').push().key;
		var obj = {
			userInput : value,
			key : key
		};
		app.database().ref('todo').child(key).set(obj);
		userInput.value = "";
	} else{
		alert('enter min 4 characters');
	}
}

function deleteAll(){
	var lists = document.getElementById("todo_list");
	lists.innerHTML = "";
	app.database().ref('/todo/').once('value',function(data){
		data.forEach(function(childs){
			app.database().ref('/todo/').child(childs.key).remove();
		});
	});
}

function deleteRow(btn) {
	btn.parentElement.remove();
	app.database().ref('todo').child(btn.id).remove();
}

function editRow(edit_btn){
	var val = prompt("Enter value",edit_btn.previousSibling.nodeValue);
	edit_btn.previousSibling.nodeValue = val;
	app.database().ref('todo').child(edit_btn.id).update({
        userInput : val
    })
}