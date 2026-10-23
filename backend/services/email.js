
const nodemailer = require("nodemailer");
const { logger } = require("../utils/logger");

const useBrevo = Boolean(process.env.BREVO_API_KEY);

let transporter;

if (!useBrevo) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  transporter.verify((error) => {
    if (error) {
      console.error("❌ Gmail error:", error.message);
    } else {
      console.log("✅ Gmail ready");
    }
  });
} else {
  console.log("✅ Brevo API email provider configured");
}

async function sendEmail({ to, name, subject, text, html }) {
  if (useBrevo) {
    const senderEmail =
      process.env.BREVO_SENDER_EMAIL || process.env.GMAIL_EMAIL;

    if (!senderEmail) {
      throw new Error("BREVO_SENDER_EMAIL is not configured");
    }

    const response = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: {
            name: "ResourceHub",
            email: senderEmail,
          },
          to: [{ email: to, ...(name ? { name } : {}) }],
          subject,
          textContent: text,
          htmlContent: html,
        }),
      }
    );

    if (!response.ok) {
      const details = await response.text();
      throw new Error(`Brevo API returned ${response.status}: ${details}`);
    }

    const result = await response.json();
    logger.info(`Email accepted by Brevo for ${to}`);
    return result;
  }

  return transporter.sendMail({
    from: `"ResourceHub" <${process.env.GMAIL_EMAIL}>`,
    to,
    subject,
    text,
    html,
  });
}

// Send magic link verification email
exports.sendVerificationEmail = async (email, name, token) => {
  try {
    const verificationLink =
      `${process.env.FRONTEND_URL}/verify-email?token=${token}` +
      `&email=${encodeURIComponent(email)}`;

    const safeName = String(name || "there").replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[char]
    );

    await sendEmail({
      to: email,
      name,
      subject: "Verify Your ResourceHub Account",
      text:
        `Welcome to ResourceHub, ${name}!\n\n` +
        `Verify your email by clicking this link:\n${verificationLink}\n\n` +
        "This link expires in 24 hours.\n\n" +
        "If you didn't create an account, ignore this email.",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #10b981;">Welcome to ResourceHub, ${safeName}!</h2>
          <p>Click the button below to verify your email:</p>
          <a href="${verificationLink}"
             style="display:inline-block;background:#10b981;color:white;
             padding:12px 24px;text-decoration:none;border-radius:6px;">
            Verify Email
          </a>
          <p>Or copy this link: <a href="${verificationLink}">Verify email</a></p>
          <p style="color:#666;font-size:12px;">
            This link expires in 24 hours.
          </p>
          <hr>
          <p style="color:#999;font-size:12px;">
            If you didn't create an account, ignore this email.
          </p>
        </div>
      `,
    });

    logger.info(`Verification email accepted for ${email}`);
    return true;
  } catch (error) {
    console.error(`❌ Verification email failed: ${error.message}`);
    logger.error(`Verification email failed: ${error.message}`);
    return false;
  }
};

exports.sendWelcomeEmail = async (email, name, userType) => {
  try {
    await sendEmail({
      to: email,
      name,
      subject: "Welcome to ResourceHub!",
      text: `Welcome ${name}! Your account is verified.`,
      html: `<h2>Welcome!</h2><p>Your ResourceHub account is verified and ready to use.</p>`,
    });
    return true;
  } catch (error) {
    logger.error(`Welcome email failed: ${error.message}`);
    return false;
  }
};

exports.sendPasswordResetEmail = async (email, name, token) => {
  try {
    const resetLink =
      `${process.env.FRONTEND_URL}/reset-password?token=${encodeURIComponent(token)}`;

    await sendEmail({
      to: email,
      name,
      subject: "Reset Your ResourceHub Password",
      text: `Reset your password using this link:\n${resetLink}`,
      html: `<p>Use the link below to reset your password:</p>
             <p><a href="${resetLink}">Reset Password</a></p>`,
    });
    return true;
  } catch (error) {
    logger.error(`Password reset email failed: ${error.message}`);
    return false;
  }
};

exports.sendTransactionEmail = async (email, name, type, details) => {
  try {
    await sendEmail({
      to: email,
      name,
      subject: `${type} - ResourceHub`,
      text: String(details ?? ""),
      html: `<p>${String(details ?? "").replace(/[&<>]/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
      })[char])}</p>`,
    });
    return true;
  } catch (error) {
    logger.error(`Transaction email failed: ${error.message}`);
    return false;
  }
};
