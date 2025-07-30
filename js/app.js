if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("✅ Service Worker registrado"))
      .catch(err => console.log("❌ Service Worker NO registrado", err));
  });
}

async function cargarVista(ruta, agregarAlHistorial = true) {
  const content = document.getElementById("content");

  try {
    const res = await fetch(ruta);
    if (!res.ok) throw new Error("Error al cargar vista");

    const textoHTML = await res.text();

    const temp = document.createElement("div");
    temp.innerHTML = textoHTML;
    const nuevoContenido = temp.querySelector("main");

    if (nuevoContenido) {
      content.innerHTML = nuevoContenido.innerHTML;

      if (agregarAlHistorial) {
        history.pushState({ ruta }, "", ruta);
      }

      ejecutarScriptsDinamicos(temp);

    } else {
      content.innerHTML = "<p>Error al cargar la vista.</p>";
    }
  } catch (error) {
    content.innerHTML = "<p>No se pudo cargar el contenido.</p>";
    console.error(error);
  }
}

function ejecutarScriptsDinamicos(contenedor) {
  const scripts = contenedor.querySelectorAll("script");

  scripts.forEach(oldScript => {
    const newScript = document.createElement("script");
    if (oldScript.src) {
      newScript.src = oldScript.src;
    } else {
      newScript.textContent = oldScript.textContent;
    }
    document.body.appendChild(newScript);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const enlaces = document.querySelectorAll("a.nav-btn");

  enlaces.forEach(enlace => {
    enlace.addEventListener("click", function (e) {
      e.preventDefault();
      const ruta = this.getAttribute("href");
      cargarVista(ruta);
    });
  });

  const rutaActual = window.location.pathname;
  if (rutaActual.endsWith("about.html")) {
    cargarVista("about.html", false);
  } else if (rutaActual.endsWith("contact.html")) {
    cargarVista("contact.html", false);
  } else {
    cargarVista("index.html", false);
  }
});

window.addEventListener("popstate", (event) => {
  if (event.state && event.state.ruta) {
    cargarVista(event.state.ruta, false);
  }
});