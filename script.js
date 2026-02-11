// Initialize EmailJS
(function () {
  emailjs.init("YOUR_PUBLIC_KEY"); // <-- replace
})();

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");

let yesSize = 1;

// YES button
yesBtn.addEventListener("click", () => {
  message.innerHTML = "Yay! 💕 I love you!";

  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    to_name: "My Valentine",
    message: "She said YES! 💖💖💖"
  }).then(() => {
    alert("Email sent successfully 💌");
  }).catch(err => {
    alert("Failed to send email 😢");
    console.error(err);
  });
});

// NO button
noBtn.addEventListener("click", () => {
  yesSize += 0.2;
  yesBtn.style.transform = `scale(${yesSize})`;
  message.innerHTML = "Are you sure? 😏 Try again...";
});
