import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      name,
      email,
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

    // Configure the Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    // Create the email options
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`, // MUST send from authenticated user
      replyTo: email,
      to: 'deepcipherstudio@gmail.com',
      subject: `New Project Inquiry: ${company || name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #0A0A0A; border-bottom: 2px solid #B8956A; padding-bottom: 10px;">New Project Intake Protocol</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Website:</strong> ${website || 'N/A'}</p>
          <p><strong>Project Type:</strong> ${projectType || 'Not specified'}</p>
          <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
          <p><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>
          <h3 style="margin-top: 20px;">Project Details:</h3>
          <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #B8956A;">
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email.' },
      { status: 500 }
    );
  }
}
