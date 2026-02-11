const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");

let yesSize = 1;

const sendYesEmail = async () => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 7000);

  try {
    const response = await fetch("/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error("Failed to send email");
    }
  } finally {
    clearTimeout(timeoutId);
  }
};

yesBtn?.addEventListener("click", async () => {
  message.textContent = "Sending invitation...";
  yesBtn.disabled = true;

  try {
    await sendYesEmail();
    message.textContent = "Invitation Sent!";
    window.location.href = "/next.html";
  } catch (err) {
    console.error(err);
    message.textContent = "Email failed. Please try again.";
    yesBtn.disabled = false;
  }
});

noBtn?.addEventListener("click", () => {
  yesSize += 0.2;
  yesBtn.style.transform = `scale(${yesSize})`;
  message.textContent = "Are you sure? Try again...";
});
