import nodemailer from "nodemailer";
import { detokenization } from "./static";

export async function initializeTransporter() {
  try {
    const email = await detokenization(process.env.EMAIL_USER!);
    const password = await detokenization(process.env.EMAIL_PASS!);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
    });

    return { transporter, email };
  } catch (error) {
    console.error("Error initializing transporter:", error);
    throw new Error("Failed to initialize email transporter.");
  }
}

export const sendConfirmationEmail = async (to: string, url: string) => {
  try {
    const { transporter, email } = await initializeTransporter();
    await transporter.sendMail({
      from: email,
      to,
      subject: "Confirm your email",
      html: `Please click this link to confirm your email: <a href="${url}">Confirm Email</a>`,
    });

    console.log(`Confirmation email sent to ${to}`);
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    throw new Error(
      "Failed to send confirmation email. Please try again later."
    );
  }
};

export const sendResetPassword = async (to: string, url: string) => {
  try {
    const { transporter, email } = await initializeTransporter();
    await transporter.sendMail({
      from: email,
      to,
      subject: "Reset your password",
      html: `Please click this link to reset your password: <a href="${url}">Reset password</a>`,
    });

    console.log(`reset password email sent to ${to}`);
  } catch (error) {
    console.error("Error sending reset password email:", error);
    throw new Error(
      "Failed to send reset password email. Please try again later."
    );
  }
};

export const sendInvitationToWorkspace = async (to: [string], url: string) => {
  try {
    const { transporter, email } = await initializeTransporter();
    await transporter.sendMail({
      from: email,
      to,
      subject: "Invitation to workspace",
      html: `Please click this link to join into my workspace: <a href="${url}">Join</a>`,
    });

    console.log(`Invitation email sent to ${to}`);
  } catch (error) {
    console.error("Error sending Invitation email:", error);
    throw new Error("Failed to send Invitation email. Please try again later.");
  }
};
