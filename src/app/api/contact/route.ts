import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Cached transporter instance with connection pooling for rapid dispatch
let cachedTransporter: nodemailer.Transporter | null = null;

function getTransporter(user: string, pass: string) {
  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // SSL
      auth: {
        user,
        pass,
      },
      pool: true,
      maxConnections: 3,
      maxMessages: 100,
      connectionTimeout: 5000,
      greetingTimeout: 3000,
      socketTimeout: 10000,
    });
  }
  return cachedTransporter;
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      name,
      email,
      phone,
      company,
      website,
      projectType,
      budget,
      timeline,
      message,
    } = data;

    // Validate essential fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_APP_PASSWORD;
    const recipientEmail = process.env.RECIPIENT_EMAIL || 'deepcipherstudio@gmail.com';

    // If credentials are not set in environment (e.g. local dev / testing)
    if (!emailUser || !emailPass) {
      console.log('----------------------------------------------------');
      console.log('⚡ [CONTACT FORM SUBMISSION]');
      console.log('Time:', new Date().toISOString());
      console.log('From:', `${name} <${email}>`);
      console.log('Phone:', phone || 'N/A');
      console.log('Company:', company || 'N/A');
      console.log('Website:', website || 'N/A');
      console.log('Project Type:', projectType || 'Not specified');
      console.log('Budget:', budget || 'Not specified');
      console.log('Timeline:', timeline || 'Not specified');
      console.log('Message:', message);
      console.log('💡 Note: Set EMAIL_USER & EMAIL_APP_PASSWORD in .env.local to send live emails.');
      console.log('----------------------------------------------------');

      return NextResponse.json({
        success: true,
        message: 'Project brief received successfully!',
      });
    }

    // Configure the Nodemailer transporter
    const transporter = getTransporter(emailUser, emailPass);

    // Create the email options
    const mailOptions = {
      from: `"${name}" <${emailUser}>`,
      replyTo: email,
      to: recipientEmail,
      subject: `New Project Inquiry: ${company ? `${company} (${name})` : name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a; line-height: 1.6; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0A0A0A; padding: 24px; border-bottom: 3px solid #B8956A;">
            <h2 style="color: #F5F0E8; margin: 0; font-size: 20px; letter-spacing: 0.05em; text-transform: uppercase;">DEEPCIPHER STUDIO — New Inquiry</h2>
          </div>
          <div style="padding: 24px;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; color: #777; width: 140px; font-size: 13px; text-transform: uppercase;">Name:</td>
                <td style="padding: 8px 0; font-weight: 600; color: #111;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #777; font-size: 13px; text-transform: uppercase;">Email:</td>
                <td style="padding: 8px 0; font-weight: 600; color: #111;"><a href="mailto:${email}" style="color: #B8956A; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #777; font-size: 13px; text-transform: uppercase;">Phone:</td>
                <td style="padding: 8px 0; color: #111;">${phone || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #777; font-size: 13px; text-transform: uppercase;">Company / Brand:</td>
                <td style="padding: 8px 0; color: #111;">${company || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #777; font-size: 13px; text-transform: uppercase;">Website:</td>
                <td style="padding: 8px 0; color: #111;">${website || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #777; font-size: 13px; text-transform: uppercase;">Project Type:</td>
                <td style="padding: 8px 0; color: #111;">${projectType || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #777; font-size: 13px; text-transform: uppercase;">Budget Range:</td>
                <td style="padding: 8px 0; color: #111;">${budget || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #777; font-size: 13px; text-transform: uppercase;">Timeline:</td>
                <td style="padding: 8px 0; color: #111;">${timeline || 'Not specified'}</td>
              </tr>
            </table>

            <div style="background-color: #f9f9f9; border-left: 4px solid #B8956A; padding: 16px; margin-top: 10px; border-radius: 0 4px 4px 0;">
              <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 14px; text-transform: uppercase; color: #555; letter-spacing: 0.05em;">Project Brief:</h3>
              <p style="margin: 0; white-space: pre-wrap; font-size: 14px; color: #222;">${message}</p>
            </div>
          </div>
        </div>
      `,
    };

    // Send email with timeout protection
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully!' });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to send email. Please try again or email us directly.' },
      { status: 500 }
    );
  }
}
