import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'aquavinci.shipments@gmail.com',
    pass: 'pvdyuwwhdyoacynr', // App-Passwort von Google
  },
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { status, shipmentId, customText, to, subject, html } = body;
    if (!to) {
      return new Response(JSON.stringify({ message: 'No recipient email provided.' }), { status: 400 });
    }
    await transporter.sendMail({
      from: 'Aquavinci <aquavinci.shipments@gmail.com>',
      to,
      subject: subject || 'Status update for your shipment',
      html: html || '',
    });
    return new Response(JSON.stringify({ message: 'E-Mail sent' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error: E-Mail not sent', error: error.message }), { status: 500 });
  }
}
