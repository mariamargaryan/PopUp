var myPopup = document.getElementById("PopupContent"),
	myBtn = document.getElementById("Btn"),
	closeBtn = document.getElementsByClassName("close"),
	overlay = document.getElementById("Overlay");

function openPopup() {
	myPopup.classList.add("is-visible");
	overlay.classList.add("is-visible");
}

function closePopup() {
	myPopup.classList.remove("is-visible");
	overlay.classList.remove("is-visible");
}

function changeSize() {
	let myWidth = document.getElementById("Width").value;
	document.getElementById("PopupContent").style.width = myWidth + "px";
	
	let myHeight = document.getElementById("Height").value;
	document.getElementById("PopupContent").style.height = myHeight + "px";
}

function changeColor() {
	let clr0 = document.getElementById("BodyColor").value;
	document.getElementById("Message").style.backgroundColor = clr0;
	
	let clr1 = document.getElementById("BodyTextColor").value;
	document.getElementById("Message").style.color = clr1;
	
	let clr2 = document.getElementById("TitleTextColor").value;
	document.getElementById("Header").style.color = clr2;

	let clr3 = document.getElementById("TitleColor").value;
	document.getElementById("PopupHeader").style.backgroundColor = clr3;
	
	let dimLayerColor = document.getElementById("DimLayerColor").value;
	document.getElementById("Overlay").style.backgroundColor = dimLayerColor;

	let myTitle = document.getElementById("DialogTitle").value;
	document.getElementById("Header").innerHTML = myTitle; //??
}

// function changeTitle() {
// 	let myTitle = document.getElementById("DialogTitle").value;
// 	document.getElementById("Header").innerHTML = myTitle;
// }

function changeOpacity() {
	let myOpacity = document.getElementById("DimLayerOpacity").value;
	document.getElementById("Overlay").style.opacity = myOpacity;
}

window.onload = function() {
	initDragElement();
	makeResizableDiv('.popup-content');
};

function initDragElement() {
	var pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;
	var popups = document.getElementsByClassName("popup-content");
	var elmnt = null;
	var currentZIndex = 100; //TODO reset z index when a threshold is passed

for (var i = 0; i < popups.length; i++) {
	var popup = popups[i];
	var header = getHeader(popup);

	popup.onmousedown = function() {
		this.style.zIndex = "" + ++currentZIndex;
	};

	if (header) {
		header.parentPopup = popup;
		header.onmousedown = dragMouseDown;
	}
}

function dragMouseDown(e) {
	elmnt = this.parentPopup;
	elmnt.style.zIndex = "" + ++currentZIndex;

	e = e || window.event;
	// get the mouse cursor position at startup:
	pos3 = e.clientX;
	pos4 = e.clientY;
	document.onmouseup = closeDragElement;
	// call a function whenever the cursor moves:
	document.onmousemove = elementDrag;
}

function elementDrag(e) {
	if (!elmnt) {
		return;
	}

	e = e || window.event;
	// calculate the new cursor position:
	pos1 = pos3 - e.clientX;
	pos2 = pos4 - e.clientY;
	pos3 = e.clientX;
	pos4 = e.clientY;
	// set the element's new position:
	elmnt.style.top = elmnt.offsetTop - pos2 + "px";
	elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
}

function closeDragElement() {
	/* stop moving when mouse button is released:*/
	document.onmouseup = null;
	document.onmousemove = null;
}

function getHeader(element) {
	var headerItems = element.getElementsByClassName("popup-header");

	if (headerItems.length === 1) {
		return headerItems[0];
	}
		return null;
	}
}

function makeResizableDiv() {
  const element = document.querySelector('#PopupContent'),
  		resizers = document.querySelectorAll('#PopupContent' + ' .resizer');

  let original_width = 0,
  	  original_height = 0,
  	  original_x = 0,
      original_y = 0,
  	  original_mouse_x = 0,
  	  original_mouse_y = 0;

  for (let i = 0;i < resizers.length; i++) {
    const currentResizer = resizers[i];

    currentResizer.addEventListener('mousedown', function(e) {
      e.preventDefault()
      original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
      original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
      original_x = element.getBoundingClientRect().left;
      original_y = element.getBoundingClientRect().top;
      original_mouse_x = e.pageX;
      original_mouse_y = e.pageY;
      window.addEventListener('mousemove', resize)
      window.addEventListener('mouseup', stopResize)
    })
    
    function resize(e) {
      if (currentResizer.classList.contains('bottom-right')) {
		const width = original_width + (e.pageX - original_mouse_x),
        	  height = original_height + (e.pageY - original_mouse_y);

        if (width > original_width) {
          element.style.width = width + 'px'
        }
        if (height > original_height) {
          element.style.height = height + 'px'
        }
      }
      else if (currentResizer.classList.contains('bottom-left')) {
        const height = original_height + (e.pageY - original_mouse_y),
        	  width = original_width - (e.pageX - original_mouse_x);

        if (height > original_height) {
          element.style.height = height + 'px'
        }
        if (width > original_width) {
          element.style.width = width + 'px'
        //   element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
        }
      }
      else if (currentResizer.classList.contains('top-right')) {
        const width = original_width + (e.pageX - original_mouse_x),
        	  height = original_height - (e.pageY - original_mouse_y);

        if (width > original_width) {
          element.style.width = width + 'px'
        }
        if (height > original_height) {
          element.style.height = height + 'px'
        //   element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
        }
      }
      else {
        const width = original_width - (e.pageX - original_mouse_x),
        	  height = original_height - (e.pageY - original_mouse_y);

        if (width > original_width) {
          element.style.width = width + 'px'
        //   element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
        }
        if (height > original_height) {
          element.style.height = height + 'px'
        //   element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
        }
      }
    }
    
    function stopResize() {
      window.removeEventListener('mousemove', resize);
    }
  }
}