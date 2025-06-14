import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Interest Rate Calculators - See How Credit Scores Affect Your Finances",
  description:
    "Discover how your credit score impacts interest rates on mortgages, auto loans, credit cards, and insurance. Interactive calculators show real savings potential.",
  keywords:
    "credit score, interest rates, mortgage calculator, auto loan calculator, credit improvement, financial calculators",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
