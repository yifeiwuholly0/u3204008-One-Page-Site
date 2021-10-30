
var container = document.getElementById("container"); // Get container node
var lis = document.querySelectorAll(".controls li"); // Get all li node objects
var viewHeight = document.body.clientHeight; // Get the current page height
var flag = true; // Set flag
var index = 0; // set index

// Encapsulated event function
function addEvent(o, eventType, fn) {
    if (o.addEventListener) {
        o.addEventListener(eventType, fn);
    } else {
        o.attachEvent("on" + eventType, fn);
    }

}

// Mouse scroll event handler
function handler(e) {
    var evt = window.event || e;
    if (flag) {
        flag = false;
        if (evt.wheelDelta == 120) { // If the mouse wheel scrolls up
            index--;
            if (index < 0) {
                index = 0;
            }
        } else { // Scroll down
            index++;
            if (index > lis.length - 1) { // If the index is greater than the number of pages, when you scroll to the last page, scroll the mouse and the page no longer scrolls
                index = lis.length - 1;
            }
        }
        container.style.top = -index * viewHeight + "px"; // Move the container up by index pages as a whole
        for (var i = 0; i < lis.length; i++) {
            lis[i].className = ""; // clear class
        }
        lis[index].className = "active"; // set class
        setTimeout(function() { // Page scrolling interval is one second to prevent scrolling too fast
            flag = true; // set flag for true
        },
        1000);
    }
}

addEvent(document, "mousewheel", handler); // run addEvent function

//click 
for (var i = 0; i < lis.length; i++) {
    lis[i].tag = i;
    lis[i].onclick = function() {
        for (var j = 0; j < lis.length; j++) {
            lis[j].className = "";
        }
        lis[this.tag].className = "active";
        container.style.top = -this.tag * viewHeight + "px";
    }
}