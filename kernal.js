//Make the DIV element draggagle:

function triggerMove(title) {
dragElement(document.getElementById(title));
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "TitleBox")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "TitleBox").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Select text when you click on it
function selectText(id){
	var sel, range;
	var el = document.getElementById(id); //get element id
	if (window.getSelection && document.createRange) { //Browser compatibility
	  sel = window.getSelection();
	  if(sel.toString() == ''){ //no text selection
		 window.setTimeout(function(){
			range = document.createRange(); //range object
			range.selectNodeContents(el); //sets Range
			sel.removeAllRanges(); //remove all ranges from selection
			sel.addRange(range);//add Range to a Selection.
		},1);
	  }
	}else if (document.selection) { //older ie
		sel = document.selection.createRange();
		if(sel.text == ''){ //no text selection
			range = document.body.createTextRange();//Creates TextRange object
			range.moveToElementText(el);//sets Range
			range.select(); //make selection.
		}
	}
}


function popup(title,body,width,height) {
  document.body.innerHTML += '<div style="background-color: white; border: 2px solid black; height: auto; position: absolute; width: auto;left: 30px;top:30px; border-top: 1px solid black;filter: drop-shadow(5px 5px 1px grey);resize: both;overflow: auto;display:block;" id="' + title + '"><div style="text-align: center;background-color: #557fa9; border: 1px solid black;" id="' + title + 'TitleBox" onmouseover="triggerMove(' + "'" + title + "'" + ')"><span class="title" style="background-color: #557fa9; color: white;font-weight: normal;float: left;"><a href="#" onclick="hidepopupLinks(' + "'" + title + "'" +')"><button style="border-bottom: 0px solid black;" id="hide' + title + 'Links">-</button></a></span><span class="title" style="background-color: #557fa9; color: white; display: inline;font-weight: normal;" id="' + title + 'Title">Empty Panel</span><span class="title" style="background-color: #557fa9; color: white;font-weight: normal;float: right;"><a href="#" onclick="hide(' + "'" + title + "'" + ')"><button style="border-bottom: 0px solid black;">x</button></a></span></div><div style="text-align: left; background-color: #c0c7c8; border: 1px solid black;border-bottom: 2px solid black;" id="' + title + 'Links"><a class="link" onclick="hide(' + "'" + title + "'" + ')" href="#" id="closeLink">Close</a></div><div id="' + title + 'Body"></div></div>'
  document.getElementById(title + "Title").innerHTML = title;
  document.getElementById(title + "Body").innerHTML = body;
  document.getElementById(title).style.width = width;
  document.getElementById(title).style.height = height;
  dragElement(document.getElementById(title));
  dragElement(document.getElementById("main"));
}

var shortcuts = "<li id='apps'><a href='#' onclick='manager();'>Manager</a></li><li><a href='#' onclick='install()'>Install</a></li><li><a href='#' onclick='clock()'>Clock</a></li><li><a href='#' onclick='about()'>About</a></li>"

function about() {
  popup("About","You are currently using ExOS v0.3<br>This version includes infinite popups and a new taskbar at the top!");
}

function manager() {
  document.getElementById("mainTitle").innerHTML = 'Manager';
  document.getElementById("mainBody").innerHTML = '<ul style="margin: 0px; font-weight: bold; padding: 0px; list-style-type: none;">' + shortcuts + '</ul>';
}

manager()

function addToManager(title,action) {
  shortcuts += "<li><a href='#' onclick='" + action + "'>" + title + "</a><li>"
  document.getElementById("mainTitle").innerHTML = 'Manager';
  document.getElementById("mainBody").innerHTML = '<ul style="margin: 0px; font-weight: bold; padding: 0px;">' + shortcuts + '</ul>';
}

function finishinstalling() {
 var script = document.createElement('script');
 script.src = "https://brodyking.github.io/ExOS-Apps/" + document.getElementById("packagename").textContent + ".js";
 document.head.appendChild(script);
 var packagename = document.getElementById("packagename").textContent;
 hide("Install");
 popup('Install',packagename + " was installed.","232px","103px");
}


function install() {
  popup('Install',"Package Name:<br>><span contenteditable='true' id='packagename' onclick='selectText(this.id)'>_</span><br><br><button onclick='finishinstalling()' style='margin-right: 10px;'>Install Script</buton>","500px","auto")
}


var mainState = "1"

function hidemainLinks() {
  if (mainState == "1") {
  document.getElementById("mainLinks").style.display = "none";
  document.getElementById("mainTitleBox").style.borderBottom = "2px solid black";
  document.getElementById("hidemainLinks").innerHTML = "+";
  mainState = "0"
  } else if (mainState == "0") {
  document.getElementById("mainLinks").style.display = "block";
  document.getElementById("mainTitleBox").style.borderBottom = "1px solid black";
  document.getElementById("hidemainLinks").innerHTML = "-";
  mainState = "1"
  }
}

var popupState = "1"

function hidepopupLinks(name) {
  if (popupState == "1") {
  document.getElementById(name + "Links").style.display = "none";
  document.getElementById(name + "TitleBox").style.borderBottom = "2px solid black";
  document.getElementById("hide" + name + "Links").innerHTML = "+";
  popupState = "0"
  } else if (popupState == "0") {
  document.getElementById(name + "Links").style.display = "block";
  document.getElementById(name + "TitleBox").style.borderBottom = "1px solid black";
  document.getElementById("hide" + name + "Links").innerHTML = "-";
  popupState = "1"
  }
}


setInterval(function(){ 
  var today = new Date();
  var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' ] '+time;
  document.getElementById("datetime").innerHTML = dateTime;  
}, 100);

var clockOpen = "0"

function clock() {
  clockOpen = "1"
  popup("Clock","The current date/time is <i>" + document.getElementById("datetime").textContent + "</i><br>If you want a live update, look at the top right lol.","auto","79px");
}

function hide(popup) {
  document.getElementById(popup).remove();
}