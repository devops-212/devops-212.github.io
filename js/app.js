if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("Service Worker registrado"))
      .catch(err => console.log("Service Worker NO registrado", err));
  });
}
