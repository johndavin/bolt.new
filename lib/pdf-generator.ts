export async function generateCreditReportPDF(userName: string): Promise<Buffer> {
  // Use jsPDF which is browser-compatible
  const { jsPDF } = await import("jspdf")

  const doc = new jsPDF()

  // Set up colors and fonts
  const primaryBlue = "#2563eb"
  const darkGray = "#1f2937"
  const mediumGray = "#4b5563"
  const lightGray = "#6b7280"

  let yPosition = 20

  // Header
  doc.setFontSize(24)
  doc.setTextColor(primaryBlue)
  doc.text("InterestRateCalculators.com", 20, yPosition)

  yPosition += 10
  doc.setFontSize(12)
  doc.setTextColor(lightGray)
  doc.text("Your Financial Education Resource", 20, yPosition)

  // Title
  yPosition += 20
  doc.setFontSize(28)
  doc.setTextColor(darkGray)
  doc.text("Credit Improvement Report", 20, yPosition)

  yPosition += 15
  doc.setFontSize(16)
  doc.setTextColor(mediumGray)
  doc.text(`Personalized for: ${userName}`, 20, yPosition)

  // Introduction
  yPosition += 20
  doc.setFontSize(14)
  doc.setTextColor(darkGray)
  doc.text("Introduction", 20, yPosition)

  yPosition += 10
  doc.setFontSize(11)
  doc.setTextColor(mediumGray)
  const introText =
    "Your credit score is one of the most important numbers in your financial life. It affects everything from the interest rates you pay on loans to your insurance premiums and even your ability to rent an apartment."
  const splitIntro = doc.splitTextToSize(introText, 170)
  doc.text(splitIntro, 20, yPosition)

  // The Real Cost of Poor Credit (Updated with accurate figures)
  yPosition += 30
  doc.setFontSize(14)
  doc.setTextColor(darkGray)
  doc.text("The Real Cost of Poor Credit", 20, yPosition)

  yPosition += 10
  doc.setFontSize(11)
  doc.setTextColor(mediumGray)
  const costs = [
    "• Home Mortgage: $123,840+ extra over 30 years with poor credit",
    "• Auto Loan: $9,960+ additional cost on a $30K loan",
    "• Insurance: $900+ higher annual premiums",
    "• Utilities: $800+ in security deposits",
    "• Credit Cards: 13% higher APR rates plus annual fees",
  ]

  costs.forEach((cost) => {
    doc.text(cost, 20, yPosition)
    yPosition += 8
  })

  // New page for strategies
  doc.addPage()
  yPosition = 20

  // Credit Improvement Strategies
  doc.setFontSize(18)
  doc.setTextColor(darkGray)
  doc.text("Credit Improvement Strategies", 20, yPosition)

  // Strategy 1
  yPosition += 20
  doc.setFontSize(14)
  doc.setTextColor(primaryBlue)
  doc.text("1. Pay All Bills On Time (35% of your score)", 20, yPosition)

  yPosition += 10
  doc.setFontSize(11)
  doc.setTextColor(mediumGray)
  const strategy1Text =
    "Payment history is the most important factor in your credit score. Set up automatic payments for at least the minimum amount due. Even one late payment can drop your score by 60-110 points."
  const splitStrategy1 = doc.splitTextToSize(strategy1Text, 170)
  doc.text(splitStrategy1, 20, yPosition)

  yPosition += 20
  doc.text("Action Steps:", 20, yPosition)
  yPosition += 8
  doc.text("• Set up automatic payments for all bills", 25, yPosition)
  yPosition += 6
  doc.text("• Use calendar reminders for due dates", 25, yPosition)
  yPosition += 6
  doc.text("• Pay twice per month to lower utilization", 25, yPosition)

  // Strategy 2
  yPosition += 20
  doc.setFontSize(14)
  doc.setTextColor(primaryBlue)
  doc.text("2. Keep Credit Utilization Low (30% of your score)", 20, yPosition)

  yPosition += 10
  doc.setFontSize(11)
  doc.setTextColor(mediumGray)
  const strategy2Text =
    "Keep your credit card balances below 30% of your credit limits, ideally below 10%. This shows lenders you can manage credit responsibly."
  const splitStrategy2 = doc.splitTextToSize(strategy2Text, 170)
  doc.text(splitStrategy2, 20, yPosition)

  yPosition += 15
  doc.text("Action Steps:", 20, yPosition)
  yPosition += 8
  doc.text("• Pay down existing balances", 25, yPosition)
  yPosition += 6
  doc.text("• Request credit limit increases", 25, yPosition)
  yPosition += 6
  doc.text("• Spread balances across multiple cards", 25, yPosition)

  // Add more content on additional pages
  doc.addPage()
  yPosition = 20

  // Timeline
  doc.setFontSize(18)
  doc.setTextColor(darkGray)
  doc.text("Expected Timeline for Results", 20, yPosition)

  yPosition += 20
  doc.setFontSize(14)
  doc.setTextColor("#059669")
  doc.text("30 Days:", 20, yPosition)
  yPosition += 10
  doc.setFontSize(11)
  doc.setTextColor(mediumGray)
  doc.text("• Pay down credit card balances", 25, yPosition)
  yPosition += 6
  doc.text("• Set up automatic payments", 25, yPosition)
  yPosition += 6
  doc.text("• Check credit reports for errors", 25, yPosition)

  yPosition += 15
  doc.setFontSize(14)
  doc.setTextColor("#059669")
  doc.text("60 Days:", 20, yPosition)
  yPosition += 10
  doc.setFontSize(11)
  doc.setTextColor(mediumGray)
  doc.text("• See initial score improvements (10-30 points)", 25, yPosition)
  yPosition += 6
  doc.text("• Dispute any errors found", 25, yPosition)
  yPosition += 6
  doc.text("• Request credit limit increases", 25, yPosition)

  yPosition += 15
  doc.setFontSize(14)
  doc.setTextColor("#059669")
  doc.text("90+ Days:", 20, yPosition)
  yPosition += 10
  doc.setFontSize(11)
  doc.setTextColor(mediumGray)
  doc.text("• Significant score improvements (30-100+ points)", 25, yPosition)
  yPosition += 6
  doc.text("• Qualify for better interest rates", 25, yPosition)
  yPosition += 6
  doc.text("• Lower insurance premiums", 25, yPosition)

  // Savings Calculator (Updated with accurate figures)
  yPosition += 30
  doc.setFontSize(18)
  doc.setTextColor(darkGray)
  doc.text("Your Potential Savings", 20, yPosition)

  yPosition += 15
  doc.setFontSize(11)
  doc.setTextColor(mediumGray)
  doc.text("By improving your credit score from poor (580) to excellent (750+):", 20, yPosition)

  yPosition += 15
  doc.setFontSize(12)
  doc.setTextColor("#059669")
  doc.text("$300,000 Home Mortgage:", 25, yPosition)
  yPosition += 8
  doc.setFontSize(11)
  doc.setTextColor(mediumGray)
  doc.text("• Poor Credit (7.5% APR): $2,098/month", 30, yPosition)
  yPosition += 6
  doc.text("• Excellent Credit (5.8% APR): $1,754/month", 30, yPosition)
  yPosition += 6
  doc.text("• Total Savings: $123,840 over 30 years", 30, yPosition)

  yPosition += 15
  doc.setFontSize(12)
  doc.setTextColor("#059669")
  doc.text("$30,000 Auto Loan:", 25, yPosition)
  yPosition += 8
  doc.setFontSize(11)
  doc.setTextColor(mediumGray)
  doc.text("• Poor Credit (15.9% APR): $724/month", 30, yPosition)
  yPosition += 6
  doc.text("• Excellent Credit (4.5% APR): $558/month", 30, yPosition)
  yPosition += 6
  doc.text("• Total Savings: $9,960 over 5 years", 30, yPosition)

  // Footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(10)
    doc.setTextColor(lightGray)
    doc.text("© 2024 InterestRateCalculators.com", 20, 285)
    doc.text("Visit: https://interestratecalculators.com", 20, 292)
  }

  // Convert to buffer
  const pdfOutput = doc.output("arraybuffer")
  return Buffer.from(pdfOutput)
}
