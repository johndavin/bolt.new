"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Home } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState(300000)
  const [loanTerm, setLoanTerm] = useState(30)
  const [creditScore, setCreditScore] = useState("740-850")

  // Updated with more accurate current mortgage rates (as of 2024)
  const getInterestRate = (score: string) => {
    const rates: { [key: string]: number } = {
      "300-579": 7.5, // Poor credit - subprime rates
      "580-669": 6.8, // Fair credit
      "670-739": 6.2, // Good credit
      "740-850": 5.8, // Excellent credit - best conventional rates
    }
    return rates[score] || 5.8
  }

  const calculatePayment = (principal: number, rate: number, years: number) => {
    const monthlyRate = rate / 100 / 12
    const numPayments = years * 12
    const payment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    return payment
  }

  const currentRate = getInterestRate(creditScore)
  const currentPayment = calculatePayment(loanAmount, currentRate, loanTerm)
  const totalPaid = currentPayment * loanTerm * 12
  const totalInterest = totalPaid - loanAmount

  const comparisons = [
    { range: "740-850", rate: 5.8 },
    { range: "670-739", rate: 6.2 },
    { range: "580-669", rate: 6.8 },
    { range: "300-579", rate: 7.5 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Home className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mortgage Interest Rate Calculator</h1>
          <p className="text-xl text-gray-600">See how your credit score affects your mortgage payments</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Input */}
          <Card>
            <CardHeader>
              <CardTitle>Loan Details</CardTitle>
              <CardDescription>Enter your mortgage information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="loan-amount">Loan Amount</Label>
                <Input
                  id="loan-amount"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="text-lg"
                />
              </div>
              <div>
                <Label htmlFor="loan-term">Loan Term (Years)</Label>
                <Select value={loanTerm.toString()} onValueChange={(value) => setLoanTerm(Number(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 Years</SelectItem>
                    <SelectItem value="20">20 Years</SelectItem>
                    <SelectItem value="25">25 Years</SelectItem>
                    <SelectItem value="30">30 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="credit-score">Credit Score Range</Label>
                <Select value={creditScore} onValueChange={setCreditScore}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="740-850">740-850 (Excellent)</SelectItem>
                    <SelectItem value="670-739">670-739 (Good)</SelectItem>
                    <SelectItem value="580-669">580-669 (Fair)</SelectItem>
                    <SelectItem value="300-579">300-579 (Poor)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle>Your Results</CardTitle>
              <CardDescription>Based on your credit score: {creditScore}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    ${currentPayment.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-gray-600">Monthly Payment</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{currentRate.toFixed(2)}%</div>
                  <div className="text-gray-600">Interest Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    ${totalInterest.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-gray-600">Total Interest</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Table */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Credit Score Comparison</CardTitle>
            <CardDescription>See how different credit scores affect your mortgage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Credit Score Range</th>
                    <th className="text-left py-3 px-4">Interest Rate</th>
                    <th className="text-left py-3 px-4">Monthly Payment</th>
                    <th className="text-left py-3 px-4">Total Interest</th>
                    <th className="text-left py-3 px-4">Difference</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((comp, index) => {
                    const payment = calculatePayment(loanAmount, comp.rate, loanTerm)
                    const totalInt = payment * loanTerm * 12 - loanAmount
                    const bestTotal = calculatePayment(loanAmount, 5.8, loanTerm) * loanTerm * 12 - loanAmount
                    const difference = totalInt - bestTotal

                    return (
                      <tr key={comp.range} className={`border-b ${comp.range === creditScore ? "bg-blue-50" : ""}`}>
                        <td className="py-3 px-4 font-medium">{comp.range}</td>
                        <td className="py-3 px-4">{comp.rate.toFixed(2)}%</td>
                        <td className="py-3 px-4">${payment.toLocaleString("en-US", { maximumFractionDigits: 0 })}</td>
                        <td className="py-3 px-4">${totalInt.toLocaleString("en-US", { maximumFractionDigits: 0 })}</td>
                        <td className="py-3 px-4">
                          {difference > 0 ? (
                            <span className="text-red-600">
                              +${difference.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                            </span>
                          ) : (
                            <span className="text-green-600">Best Rate</span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Educational Content */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Why Credit Scores Matter for Mortgages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Your credit score is one of the most important factors lenders consider when determining your mortgage
                interest rate. A higher score demonstrates to lenders that you're a lower-risk borrower.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Excellent credit (740+): Qualify for the best rates available</li>
                <li>Good credit (670-739): Still get competitive rates with most lenders</li>
                <li>Fair credit (580-669): Higher rates, but conventional loans still possible</li>
                <li>Poor credit (below 580): May need FHA loans or face significantly higher rates</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tips to Improve Your Credit Score</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Pay all bills on time, every time (35% of score)</li>
                <li>Keep credit card balances low - under 10% is ideal (30% of score)</li>
                <li>Don't close old credit cards (15% of score)</li>
                <li>Limit new credit applications (10% of score)</li>
                <li>Check your credit report for errors annually</li>
                <li>Consider becoming an authorized user on someone else's account</li>
                <li>Pay down existing debt strategically</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
