// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD25hUSj2CDxE18duRhcPtfOxXgvCVxflA",
  authDomain: "ecodivemareaazul.firebaseapp.com",
  databaseURL: "https://ecodivemareaazul-default-rtdb.firebaseio.com",
  projectId: "ecodivemareaazul",
  storageBucket: "ecodivemareaazul.appspot.com",
  messagingSenderId: "601786420819",
  appId: "1:601786420819:web:69242bae40081f45fd00a6"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Referencia a la base de datos
const contactFormDB = firebase.database().ref("Comentarios PWA");

// Evento de envío del formulario
document.getElementById("commentsForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  // Obtener valores
  const name = getElementVal("name");
  const emailid = getElementVal("emailid");
  const msgContent = getElementVal("msgContent");

  // Guardar datos
  const newComment = contactFormDB.push();
  newComment.set({
    name: name,
    emailid: emailid,
    msgContent: msgContent,
  })
  .then(() => {
    showAlert("Tu comentario ha sido enviado correctamente", "success");
    document.getElementById("commentsForm").reset();
  })
  .catch((error) => {
    console.error("Error al guardar comentario:", error.message);
    showAlert("Error al enviar el comentario. Intenta más tarde.", "error");
  });
}

// Mostrar alerta animada
function showAlert(message, type) {
  const alertBox = document.querySelector(".alert");
  alertBox.textContent = message;
  alertBox.style.background = type === "success" ? "#00c853" : "#d32f2f";
  alertBox.classList.remove("hide");
  alertBox.style.display = "block";
  alertBox.classList.add("show");

  setTimeout(() => {
    alertBox.classList.remove("show");
    alertBox.classList.add("hide");
    setTimeout(() => {
      alertBox.style.display = "none";
    }, 400);
  }, 3000);
}

// Obtener valor de campos
const getElementVal = (id) => {
  return document.getElementById(id).value;
};

