// Accordion code
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}


function openNav() {
  document.getElementById("mySidepanel").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}


// ****************** space on code tag &********************

document.querySelectorAll("pre code").forEach(function (element, n) {
  if (element.classList.contains("nuke-html")) {
    var text = element.innerHTML;
  } else {
    var text = element.innerText;
  }
  text = text.replace(/^\n/, '').trimEnd();// goodbye starting whitespace
  var to_kill = Infinity;
  var lines = text.split("\n");
  for (var i = 0; i < lines.length; i++) {
    if (!lines[i].trim()) { continue; }
    to_kill = Math.min(lines[i].search(/\S/), to_kill);
  }
  out = [];
  for (var i = 0; i < lines.length; i++) {
    out.push(lines[i].replace(new RegExp("^ {" + to_kill + "}", "g"), ""));
  }
  element.innerText = out.join("\n");
});

// ********* adding dots *********
let codes = document.querySelectorAll('.dotc');
codes.forEach(box => {
  box.innerHTML += '<div class="dots"><div class="f"></div><div class="s"></div><div class="t"></div></div>'
});

// ****************************************** TEST ********************************

