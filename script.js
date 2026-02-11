const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");

let yesSize = 1;

const sendYesEmail = async () => {
  const response = await fetch("/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    throw new Error("Failed to send email");
  }
};

yesBtn.addEventListener("click", async () => {
  message.textContent = "Yay! I love you!";

  try {
    await sendYesEmail();
  } catch (err) {
    console.error(err);
  } finally {
    window.location.href = "/next.html";
  }
});

noBtn.addEventListener("click", () => {
  yesSize += 0.2;
  yesBtn.style.transform = `scale(${yesSize})`;
  message.textContent = "Are you sure? Try again...";
});
