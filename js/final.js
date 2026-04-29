
window.addEventListener("load", function () {


  var board     = document.getElementById("board");
  var scoreText = document.getElementById("scoreText");
  var submitBtn = document.getElementById("submitBtn");
  var resetBtn  = document.getElementById("resetBtn");

  var score     = 0;
  var holdStart = 0; 

  submitBtn.addEventListener("click", function () {
    alert("You selected a volume score of " + score);
  });

  // RESET
  resetBtn.addEventListener("click", function () {
    score = 0;
    scoreText.textContent = "Volume Score: 0";
    var darts = document.querySelectorAll(".dart");
    for (var i = 0; i < darts.length; i++) {
      darts[i].remove();
    }
  });

  // HOLD
  board.addEventListener("mousedown", function () {
    holdStart = Date.now();
  });

  // RELESE DART
  board.addEventListener("mouseup", function (event) {

    // click locash
    var rect = board.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    var holdTime = Date.now() - holdStart;
    if (holdTime > 5000) { holdTime = 5000; }

    // At 0ms hold: svary = 100px. At 5000ms hold: spread = 5px.
    var spread = 200 - (holdTime / 5000) * 200;

    // Add random offset within the spread
    x = x + (Math.random() - 0.5) * spread;
    y = y + (Math.random() - 0.5) * spread;

    // DISTASNCE
    var centerX = 180;
    var centerY = 180;
    var dx = x - centerX;
    var dy = y - centerY;
    var distance = Math.sqrt(dx * dx + dy * dy);

    var points = 0;

    if (distance <= 180) {

      if (distance <= 17) {
        points = 100 - score;

      } else {

        //angle of the dart from the center
        var angle = Math.atan2(dy, dx) * (180 / Math.PI);

        // add 360 to any negative value to get 0-360 so that we cna math
        if (angle < 0) { angle += 360; }

         //225-270 lines up with 0
        angle = (angle + 135) % 360;

        //gives one of the slices 1-8
        var sliceIndex = Math.floor(angle / 45);

        // POINTS PLEASE BE RIGHT THIS TIME PLEASE PLEASE
        var values = [20, -20, -10, 10, 5, -5, 15, -15];
        points = values[sliceIndex];
      }

      score = score + points;
      if (score > 100) { score = 100; }
      if (score < 0)   { score = 0; }

      scoreText.textContent = "Volume Score: " + score;
    }

    // Draw a dart dot where it landed
    var dart = document.createElement("div");
    dart.className = "dart";
    dart.style.left = x + "px";
    dart.style.top  = y + "px";
    board.appendChild(dart);

  });

});