import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'aquavinci.shipments@gmail.com',
    pass: 'Passwort123',
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  const { status, shipmentId, customText, to } = req.body;
  const subject = req.body.subject || `Status update for your shipment`;
  const html = req.body.html || '';

  if (!to) {
    return res.status(400).json({ message: 'No recipient email provided.' });
  }

  try {
    await transporter.sendMail({
      from: '"Aquavinci" <aquavinci.shipments@gmail.com>',
      to,
      subject,
      html,
    });
    res.status(200).json({ message: 'E-Mail sent' });
  } catch (error) {
    res.status(500).json({ message: 'Error: E-Mail not sent', error });
  }
}
