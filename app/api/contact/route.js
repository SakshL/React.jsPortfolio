import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Brevo API configuration
    const brevoApiKey = process.env.BREVO_API_KEY;
    console.log("Environment check - BREVO_API_KEY exists:", !!brevoApiKey);
    console.log(
      "Environment check - BREVO_API_KEY length:",
      brevoApiKey?.length || 0
    );

    if (!brevoApiKey) {
      console.error("BREVO_API_KEY environment variable is not set");
      return NextResponse.json(
        { error: "Email service configuration error" },
        { status: 500 }
      );
    }

    // Send email using Brevo API
    const emailData = {
      sender: {
        name: "Portfolio Sakshyam",
        email: "noreply@sakshyambaral.com.np"
      },
      to: [
        {
          email: "sakshyambaral97@gmail.com",
          name: "Sakshyam Baral"
        }
      ],
      subject: `📩 ${subject}`,
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Message</title>
        </head>
        <body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; background-color: #f1f5f9; color: #334155;">
          
          <!-- Main Container -->
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="padding: 32px 32px 24px; border-bottom: 1px solid #e2e8f0;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 600; color: #1e293b;">
                New Contact Message
              </h1>
            </div>
            
            <!-- Content -->
            <div style="padding: 32px;">
              
              <!-- From Section -->
              <div style="margin-bottom: 24px; padding: 20px; background-color: #f8fafc; border-radius: 6px; border-left: 3px solid #4d67ff;">
                <div style="margin-bottom: 12px;">
                  <strong style="color: #374151;">From:</strong> ${name}
                </div>
                <div style="margin-bottom: 12px;">
                  <strong style="color: #374151;">Email:</strong> 
                  <a href="mailto:${email}" style="color: #4d67ff; text-decoration: none;">${email}</a>
                </div>
                <div>
                  <strong style="color: #374151;">Subject:</strong> ${subject}
                </div>
              </div>
              
              <!-- Message Section -->
              <div style="margin-bottom: 32px;">
                <h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 600; color: #374151;">
                  Message:
                </h3>
                <div style="padding: 20px; background-color: #f8fafc; border-radius: 6px; border-left: 3px solid #1491ff;">
                  <p style="margin: 0; line-height: 1.6; color: #4b5563; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
              
              <!-- Reply Button -->
              <div style="text-align: center; margin: 32px 0;">
                <a href="mailto:${email}?subject=Re: ${subject}" 
                   style="display: inline-block; padding: 12px 24px; background-color: #4d67ff; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 14px;">
                  Reply to Message
                </a>
              </div>
              
            </div>
            
            <!-- Footer -->
            <div style="padding: 20px 32px; border-top: 1px solid #e2e8f0; background-color: #f8fafc;">
              <p style="margin: 0; font-size: 14px; color: #64748b; text-align: center;">
                Sent from your portfolio contact form at <strong>sakshyambaral.com.np</strong>
              </p>
            </div>
            
          </div>
          
        </body>
        </html>
      `,
      replyTo: {
        email: email,
        name: name
      }
    };

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Api-Key": brevoApiKey
      },
      body: JSON.stringify(emailData)
    });

    console.log("Brevo API Response Status:", response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Brevo API Error:", response.status, errorData);
      return NextResponse.json(
        {
          error: `Failed to send email: ${response.status} - ${errorData}`
        },
        { status: 500 }
      );
    }

    const result = await response.json();
    console.log("Email sent successfully:", result.messageId);
    console.log("Full Brevo response:", JSON.stringify(result, null, 2));
    console.log("Email was sent FROM:", emailData.sender.email);
    console.log("Email was sent TO:", emailData.to[0].email);

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully!",
        messageId: result.messageId,
        sentFrom: emailData.sender.email,
        sentTo: emailData.to[0].email
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API Error:", error);
    console.error("Error details:", error.message, error.stack);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
