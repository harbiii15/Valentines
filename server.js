import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: String(process.env.SMTP_SECURE).toLowerCase() === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const defaultMessage = `Valentine's Date Details
\uD83D\uDCC5 Date: February 14
\u23F0 Time: 12:00 AM - 12:00 PM
\uD83D\uDCCD Venue: Kahit saan, basta kasama ko asawa ko hehehe

Hi mii
You know that i am the luckiest person in the world kasi your always there for me wag mo ako iiwan ahh, dont forget sa 14 ikaw benta ako tulog hehheheehehe. wag mo din kalimutan ung promise mo hmmm`;

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

app.post("/send", async (req, res) => {
  const incomingMessage =
    typeof req.body?.message === "string" ? req.body.message.trim() : "";
  const message = incomingMessage || defaultMessage;
  const lines = message.split(/\r?\n/);
  const heading = escapeHtml(lines[0] || "Valentine's Date Details");
  const subheading = escapeHtml(lines[1] || "");
  const body = escapeHtml(lines.slice(2).join("\n")).replace(/\n/g, "<br>");

  try {
    await transporter.sendMail({
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to: process.env.TO_EMAIL,
      subject: "Its official, bawal na mag back out ok.",
      text: message,
      html: `
        <div style="margin:0;padding:24px;background:#fff7fb;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;background:#ffffff;border:1px solid #ffd7e5;border-radius:14px;">
                  <tr>
                    <td style="padding:24px 26px 20px;text-align:center;">
                      <h1 style="margin:0 0 8px;font-family:Georgia,'Times New Roman',serif;font-size:34px;line-height:1.15;color:#d13b72;">
                        ${heading}
                      </h1>
                      <h2 style="margin:0 0 18px;font-family:Verdana,Arial,sans-serif;font-size:18px;font-weight:600;line-height:1.35;color:#7c3d57;">
                        ${subheading}
                      </h2>
                      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.75;color:#2f2530;">
                        ${body}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>`,
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Email send failed:", error);
    res.status(500).json({ ok: false, error: "Failed to send email" });
  }
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
