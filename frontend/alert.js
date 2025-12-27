function showAlert(alert) {
  const box = document.getElementById("alertBox");
  box.innerHTML = `
    <div class="alert">
      🐋 ${alert.type}<br>
      Value: $${Math.round(alert.value || alert.rollingValue)}<br>
      Confidence: ${alert.confidence}
    </div>
  `;
}
