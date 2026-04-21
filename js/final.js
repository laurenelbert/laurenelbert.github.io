window.addEventListener("load", function () {
   const board = document.getElementById("board");
   const scoreText = document.getElementById("scoreText");
   const submitBtn = document.getElementById("submitBtn");
   const message = document.getElementById("message");

   let score = 0;
   const requiredScore = 100;

   board.addEventListener("click", function (event) {
      const rect = board.getBoundingClientRect();

      // Raw click position
      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;

      // -------------------------
      // ARC / INACCURACY EFFECT
      // -------------------------
      const arcStrength = 35; // higher = harder to aim

      const offsetX = (Math.random() - 0.5) * arcStrength;

      // creates a curved "flight" feel (not straight-line accuracy)
      const offsetY = Math.sin(x / 25) * (arcStrength / 2);

      x += offsetX;
      y += offsetY;

      // Center calculations (for scoring)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const dx = x - centerX;
      const dy = y - centerY;

      const distance = Math.sqrt(dx * dx + dy * dy);

      let points = 0;

      if (distance <= 35) {
         points = 50;
      }
      else if (distance <= 80) {
         points = 25;
      }
      else if (distance <= 120) {
         points = 10;
      }
      else if (distance <= 160) {
         points = 5;
      }

      score += points;
      scoreText.textContent = "Volume Score: " + score;

      // Draw dart at FINAL (offset) position
      const dart = document.createElement("div");
      dart.className = "dart";
      dart.style.left = x + "px";
      dart.style.top = y + "px";
      board.appendChild(dart);
   });

   submitBtn.addEventListener("click", function () {
      if (score >= requiredScore) {
         message.textContent = "Volume accepted.";
      }
      else {
         message.textContent = "Not enough volume. Keep throwing darts.";
      }
   });
});