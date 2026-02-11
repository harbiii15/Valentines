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
  message.textContent = "Yay! I love you!";
  yesBtn.disabled = true;

  try {
    await sendYesEmail();
  } catch (err) {
    console.error(err);
    message.textContent = "Saved! Redirecting...";
  } finally {
    window.location.href = "/next.html";
  }
});

noBtn?.addEventListener("click", () => {
  yesSize += 0.2;
  yesBtn.style.transform = `scale(${yesSize})`;
  message.textContent = "Are you sure? Try again...";
});
