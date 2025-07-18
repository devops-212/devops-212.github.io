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

  // Guardar en la base de datos
  saveMessages(name, emailid, msgContent);

  // Mostrar alerta con fade-in
  const alertBox = document.querySelector(".alert");
  alertBox.classList.remove("hide");
  alertBox.style.display = "block";
  alertBox.classList.add("show");

  // Ocultar con fade-out
  setTimeout(() => {
    alertBox.classList.remove("show");
    alertBox.classList.add("hide");
    setTimeout(() => {
      alertBox.style.display = "none";
    }, 400);
  }, 3000);

  // Resetear formulario
  document.getElementById("commentsForm").reset();
}

const saveMessages = (name, emailid, msgContent) => {
  const newContactForm = contactFormDB.push();
  newContactForm.set({
    name: name,
    emailid: emailid,
    msgContent: msgContent,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
