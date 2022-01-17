//Make the DIV element draggagle:
dragElement(document.getElementById("popup"));
dragElement(document.getElementById("main"));

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

function popup(state,title,body,width,height) {
  if (state == "show") {
    document.getElementById("popup").style.display = "block";
  } else if (state == "hide") {
    document.getElementById("popup").style.display = "none";
  }
  document.getElementById("popupTitle").innerHTML = title;
  document.getElementById("popupBody").innerHTML = body;
  document.getElementById("popup").style.width = width;
  document.getElementById("popup").style.height = height;
}

function main(title,body) {
  document.getElementById("mainTitle").innerHTML = title;
  document.getElementById("mainBody").innerHTML = body;
}

var shortcuts = "<li><a href='#' onclick='manager()'>Manager</a></li>"

function manager() {
  main('Manager','<ul style="margin: 0px; font-weight: bold; padding: 0px; list-style-type: none;">' + shortcuts + '</ul>')
}

manager()

function addToManager(title,action) {
  shortcuts += "<li><a href='#' onclick='" + action + "'>" + title + "</a><li>"
  main('Manager','<ul style="margin: 0px; font-weight: bold; padding: 0px;">' + shortcuts + '</ul>')
}

function finishinstall() {
 var script = document.createElement('script');
 script.src = document.getElementById("packagename").textContent;
 document.head.appendChild(script) 
 popup('show','Install',document.getElementById("packagename").textContent + " was installed.<br><br><button onclick='closepopup()'>Close</a>")
}

function install() {
  popup('show','Install',"<span style='color: red'>NOTE: FILES MUST BE HOSTED ON REPL TO LINK</span><br>Package URL:<br>><span contenteditable='true' id='packagename' onclick='selectText(this.id)'>_</span><br><br><button onclick='finishinstall()' style='margin-right: 10px;'>Install Script</buton><button onclick='closepopup()'>Close</a>","500px","auto")
}

function closepopup() {
  popup('hide')
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

function hidepopupLinks() {
  if (popupState == "1") {
  document.getElementById("popupLinks").style.display = "none";
  document.getElementById("popupTitleBox").style.borderBottom = "2px solid black";
  document.getElementById("hidepopupLinks").innerHTML = "+";
  popupState = "0"
  } else if (popupState == "0") {
  document.getElementById("popupLinks").style.display = "block";
  document.getElementById("popupTitleBox").style.borderBottom = "1px solid black";
  document.getElementById("hidepopupLinks").innerHTML = "-";
  popupState = "1"
  }
}