let currentSlide = 0;
const slides = document.querySelector(".slides");
const dots = document.querySelectorAll(".dot");
const slideImages = document.querySelectorAll(".slide img");

function getDominantColor(img, callback) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = 50; // tamaño pequeño para rendimiento
  canvas.height = 50;
  context.drawImage(img, 0, 0, 50, 50);

  const data = context.getImageData(0, 0, 50, 50).data;
  let r = 0, g = 0, b = 0, count = 0;

  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    count++;
  }

  r = Math.floor(r / count);
  g = Math.floor(g / count);
  b = Math.floor(b / count);

  callback(`rgba(${r},${g},${b},0.8)`); // un poco transparente
}

function showSlide(index) {
  slides.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach(dot => {
    dot.style.background = "rgba(255,255,255,0.3)"; // reset base
  });

  const activeImg = slideImages[index];
  getDominantColor(activeImg, (color) => {
    dots[index].style.background = color; // mismo tono que la imagen
  });

  currentSlide = index;
}

// Auto cambiar cada 5 segundos
setInterval(() => {
  let nextSlide = (currentSlide + 1) % slideImages.length;
  showSlide(nextSlide);
}, 5000);

// Click manual en los puntos
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => showSlide(index));
});

// Mostrar la primera
showSlide(0);

function toggleChatbot() {
  const chatbot = document.getElementById("chatbot-container");
  if (chatbot.style.display === "flex") {
    chatbot.style.display = "none";
  } else {
    chatbot.style.display = "flex";
  }
}

function sendMessage() {
  const input = document.getElementById("chatbot-input");
  const body = document.getElementById("chatbot-body");

  if (input.value.trim() !== "") {
    // Mensaje del usuario
    body.innerHTML += `<p><strong>Tú:</strong> ${input.value}</p>`;

    // Respuesta automática
    setTimeout(() => {
      body.innerHTML += `<p><strong>NovaBot:</strong> Gracias por tu mensaje. Un asesor te contactará pronto.</p>`;
      body.scrollTop = body.scrollHeight; // baja hasta el final
    }, 800);

    input.value = "";
    body.scrollTop = body.scrollHeight;
  }
}
function clearChat() {
  const body = document.getElementById("chatbot-body");
  body.innerHTML = `<p><strong>NovaBot:</strong> ¡Hola! 👋 ¿En qué puedo ayudarte?</p>`;
}

