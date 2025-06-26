import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.example.com', // Ersetze durch deinen SMTP-Host
  port: 587,
  secure: false,
  auth: {
    user: 'dein-email@example.com', // Ersetze durch deine SMTP-User
    pass: 'dein-passwort', // Ersetze durch dein SMTP-Passwort
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  const { status, shipmentId, customText, to } = req.body;
  // subject und html werden von der Frontend-Logik erwartet
  const subject = req.body.subject || `Status update for your shipment`;
  const html = req.body.html || '';

  if (!to) {
    return res.status(400).json({ message: 'No recipient email provided.' });
  }

  try {
    await transporter.sendMail({
      from: '"Aquavinci" <your-email@example.com>',
      to,
      subject,
      html,
    });
    res.status(200).json({ message: 'E-Mail sent' });
  } catch (error) {
    res.status(500).json({ message: 'Error: E-Mail did not send', error });
  }
}
