"use server"

export async function submitContactForm(formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  if (!firstName || !lastName || !email || !subject || !message) {
    throw new Error("All required fields must be filled out")
  }

  try {
    // Send notification email to John Davin
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer re_Mh3Ap3jH_KAaLCxecRURMsGgT4mhyzz4H`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "InterestRateCalculators.com <noreply@resend.dev>",
        to: ["johnedavin@gmail.com"],
        subject: `New Contact Form Message - ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">New Contact Message</h1>
              <p style="color: #bfdbfe; margin: 10px 0 0 0;">InterestRateCalculators.com</p>
            </div>
            
            <div style="padding: 30px; background: white;">
              <h2 style="color: #1f2937; margin-bottom: 20px;">Contact Details</h2>
              
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #4b5563;"><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p style="margin: 10px 0 0 0; color: #4b5563;"><strong>Email:</strong> ${email}</p>
                ${phone ? `<p style="margin: 10px 0 0 0; color: #4b5563;"><strong>Phone:</strong> ${phone}</p>` : ""}
                <p style="margin: 10px 0 0 0; color: #4b5563;"><strong>Subject:</strong> ${subject}</p>
                <p style="margin: 10px 0 0 0; color: #4b5563;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <h3 style="color: #1f2937; margin-bottom: 10px;">Message:</h3>
              <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb;">
                <p style="margin: 0; color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
              
              <div style="margin-top: 30px; padding: 15px; background: #dbeafe; border-radius: 8px;">
                <p style="margin: 0; color: #1e40af; font-size: 14px;">
                  <strong>Action Required:</strong> Please respond to this inquiry within 24 hours for the best customer experience.
                </p>
              </div>
            </div>
            
            <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 12px; margin: 0;">
                © 2024 InterestRateCalculators.com<br>
                This message was sent from the contact form on your website.
              </p>
            </div>
          </div>
        `,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Contact form email failed:", errorText)
      throw new Error("Failed to send contact message")
    }

    return {
      success: true,
      message: "Your message has been sent successfully. We'll get back to you within 24 hours.",
    }
  } catch (error) {
    console.error("Error processing contact form:", error)
    throw new Error("Failed to send message")
  }
}
