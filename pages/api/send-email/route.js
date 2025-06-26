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
  const { status } = req.body;

  if (status === 'DELAY') {
    try {
      await transporter.sendMail({
        from: '"Bestellwebseite" <dein-email@example.com>',
        to: 'kunde@example.com', // Ersetze durch die Zieladresse
        subject: 'Bestellstatus: Verzögerung',
        text: 'Ihre Bestellung hat sich verzögert. Wir entschuldigen uns für die Unannehmlichkeiten.',
      });
      res.status(200).json({ message: 'E-Mail gesendet' });
    } catch (error) {
      res.status(500).json({ message: 'Fehler beim Senden der E-Mail', error });
    }
  } else {
    res.status(200).json({ message: 'Kein E-Mail-Versand erforderlich' });
  }
}
