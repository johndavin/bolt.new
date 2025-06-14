"use server"

import { generateCreditReportPDF } from "@/lib/pdf-generator"

export async function submitCreditReportForm(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string

  if (!name || !email) {
    throw new Error("Name and email are required")
  }

  try {
    // Generate the PDF report
    const pdfBuffer = await generateCreditReportPDF(name)

    // Convert PDF to base64 for email attachment
    const pdfBase64 = pdfBuffer.toString("base64")

    // Send notification email to business owner (using verified email address)
    const notificationResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer re_Mh3Ap3jH_KAaLCxecRURMsGgT4mhyzz4H`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "InterestRateCalculators.com <noreply@resend.dev>",
        to: ["johnedavin@gmail.com"], // Changed to verified email address
        subject: "New Credit Report Request - Lead Notification",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">New Lead - InterestRateCalculators.com</h1>
            </div>
            
            <div style="padding: 30px; background: white;">
              <h2 style="color: #1f2937; margin-bottom: 20px;">New Credit Report Request</h2>
              
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #4b5563;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 10px 0 0 0; color: #4b5563;"><strong>Email:</strong> ${email}</p>
                <p style="margin: 10px 0 0 0; color: #4b5563;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                <p style="margin: 10px 0 0 0; color: #4b5563;"><strong>Source:</strong> InterestRateCalculators.com</p>
              </div>
              
              <p style="color: #4b5563; line-height: 1.6;">
                This lead has requested the free credit improvement report. The PDF report has been generated and 
                we attempted to send it to their email address.
              </p>
              
              <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #92400e; font-size: 14px;">
                  <strong>Note:</strong> Due to Resend free tier limitations, the PDF may not have been delivered 
                  to the user's email. You may want to follow up directly.
                </p>
              </div>
            </div>
            
            <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 12px; margin: 0;">
                © 2024 InterestRateCalculators.com
              </p>
            </div>
          </div>
        `,
      }),
    })

    let userEmailSent = false
    let userEmailError = null

    // Try to send PDF report to the user (may fail with free tier)
    try {
      const userResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer re_Mh3Ap3jH_KAaLCxecRURMsGgT4mhyzz4H`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "InterestRateCalculators.com <noreply@resend.dev>",
          to: [email],
          subject: "Your Free Credit Improvement Report - InterestRateCalculators.com",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px;">InterestRateCalculators.com</h1>
                <p style="color: #bfdbfe; margin: 10px 0 0 0;">Your Financial Education Resource</p>
              </div>
              
              <div style="padding: 30px; background: white;">
                <h2 style="color: #1f2937; margin-bottom: 20px;">Hi ${name},</h2>
                
                <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
                  Thank you for requesting your free credit improvement report! Attached is your comprehensive guide to boosting your credit score and saving thousands on loans, insurance, and more.
                </p>
                
                <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #1f2937; margin-top: 0;">What's Inside Your Report:</h3>
                  <ul style="color: #4b5563; line-height: 1.8;">
                    <li>Step-by-step credit improvement strategies</li>
                    <li>Timeline for seeing results (30, 60, 90 days)</li>
                    <li>Common credit mistakes to avoid</li>
                    <li>How to dispute errors on your credit report</li>
                    <li>Debt payoff strategies that boost your score</li>
                    <li>Potential savings calculator</li>
                  </ul>
                </div>
                
                <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
                  Remember, even small improvements in your credit score can save you thousands of dollars over time. Start implementing these strategies today!
                </p>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="https://interestratecalculators.com" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                    Visit Our Calculators
                  </a>
                </div>
                
                <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
                  Questions? Reply to this email or visit our website for more financial calculators and resources.
                </p>
              </div>
              
              <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                <p style="color: #6b7280; font-size: 12px; margin: 0;">
                  © 2024 InterestRateCalculators.com. All rights reserved.<br>
                  <a href="https://interestratecalculators.com" style="color: #2563eb;">InterestRateCalculators.com</a>
                </p>
              </div>
            </div>
          `,
          attachments: [
            {
              filename: "Credit-Improvement-Report.pdf",
              content: pdfBase64,
              type: "application/pdf",
            },
          ],
        }),
      })

      if (userResponse.ok) {
        userEmailSent = true
      } else {
        const errorText = await userResponse.text()
        userEmailError = errorText
        console.log("User email failed (expected with free tier):", errorText)
      }
    } catch (error) {
      userEmailError = error
      console.log("User email failed (expected with free tier):", error)
    }

    // Check if notification email was sent successfully
    if (!notificationResponse.ok) {
      const notificationError = await notificationResponse.text()
      console.error("Notification email failed:", notificationError)
      throw new Error("Failed to send notification email")
    }

    // Return success even if user email failed (due to free tier limitations)
    return {
      success: true,
      userEmailSent,
      message: userEmailSent
        ? "Report sent successfully to your email!"
        : "Request received! We'll follow up with your report shortly.",
    }
  } catch (error) {
    console.error("Error processing credit report request:", error)
    throw new Error("Failed to process request")
  }
}
