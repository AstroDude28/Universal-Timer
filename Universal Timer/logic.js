(function() {
  // Add CSS style for blinking effect and grow/shrink effect
  const style = document.createElement('style');
  style.textContent = `


    @keyframes growShrink {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(180deg); }
    }

    #container, #break-message {
      pointer-events: none;
    }

    #alert-emoji {
      animation: growShrink 1s infinite;
    }

    #break-message {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
      height: 80%;
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      font-size: 60px; /* Largest font size for the message */
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10001;
      text-align: center;
      padding: 20px; /* Padding around the text */
      box-sizing: border-box; /* Include padding in the element's total width and height */
      overflow: hidden; /* Ensure the message doesn't overflow */
    }
  `;
  document.head.appendChild(style);

  // Create container for timer and emoji
  const containerDiv = document.createElement('div');
  containerDiv.id = 'container';
  containerDiv.style.position = 'fixed';
  containerDiv.style.right = '10px'; // Align to the right
  containerDiv.style.top = '70px'; // Vertically centered
  containerDiv.style.transform = 'translateY(-50%)'; // Adjust for vertical centering
  containerDiv.style.zIndex = '10000';
  containerDiv.style.textAlign = 'center';
  document.body.appendChild(containerDiv);

  // Create alert emoji element
  const alertEmoji = document.createElement('div');
  alertEmoji.id = 'alert-emoji';
  alertEmoji.style.position = 'relative'; // Adjust positioning relative to the container
  alertEmoji.style.bottom = '10px'; // Reduced distance from the timer
  alertEmoji.style.fontSize = '50px'; // Adjust size as needed
  alertEmoji.textContent = '⌛'; // Alert emoji
  alertEmoji.style.opacity = 0.5;
  containerDiv.appendChild(alertEmoji);

  // Create timer element
  const timerDiv = document.createElement('div');
  timerDiv.id = 'universal-timer';
  timerDiv.style.position = 'relative';
  timerDiv.style.padding = '10px';
  timerDiv.style.backgroundColor = "#00FF00"; // Initial background color
  timerDiv.style.color = 'black';
  timerDiv.style.fontSize = '22px';
  timerDiv.style.borderRadius = '10px';
  timerDiv.style.width = '100px'; // Adjust width of timer block
  timerDiv.style.textAlign = 'center';
  timerDiv.style.opacity = 0.75;
  containerDiv.appendChild(timerDiv);

  let seconds = 0;
  let minutes = 0;
  let hours = 0;

  // List of colors to cycle through every minute
  const colors = [
    "#00FF00", "#33FF00", "#66FF00", "#99FF00", "#CCFF00", "#FFFF00", "#FFCC00", "#FF9900", "#FF6600", "#FF3300", "#FF0000"  
  ];

  function updateTime() {
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      // Change background color every minute
      timerDiv.style.backgroundColor = colors[minutes % colors.length];
      if (minutes >= 10) {
        timerDiv.style.backgroundColor = "#FF0000";
      }
      if (minutes >= 60) {
        minutes = 0;
        hours++;
        // Show break message every hour
        showBreakMessage();
      }
    }

    // Update the timer text in hh:mm:ss format
    timerDiv.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  function showBreakMessage() {
    const breakMessage = document.createElement('div');
    breakMessage.id = 'break-message';
    breakMessage.textContent = "I can see your eyes are working hard. Why not give them a little break and close them for a while?";
    document.body.appendChild(breakMessage);

    if (seconds >= 10) {
      showBreakMessage();
      seconds = 0; // Reset minutes to 0 after showing the break message
    }

    setTimeout(() => {
      document.body.removeChild(breakMessage);
    }, 5000);
  }

  setInterval(updateTime, 1000); // Update every second
})();
