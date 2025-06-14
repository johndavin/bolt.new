"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, AlertTriangle } from "lucide-react"
import { Navigation } from "@/components/navigation"
import Link from "next/link"

export default function CreditCardCalculator() {
  const [balance, setBalance] = useState(5000)
  const [creditScore, setCreditScore] = useState("740-850")
  const [paymentType, setPaymentType] = useState("minimum")
  const [monthlyPayment, setMonthlyPayment] = useState(150)

  const getCreditCardTerms = (score: string) => {
    const terms: { [key: string]: { apr: number; annualFee: number; creditLimit: number } } = {
      "300-579": { apr: 29.99, annualFee: 99, creditLimit: 500 },
      "580-669": { apr: 24.99, annualFee: 39, creditLimit: 2000 },
      "670-739": { apr: 19.99, annualFee: 0, creditLimit: 5000 },
      "740-850": { apr: 16.99, annualFee: 0, creditLimit: 10000 },
    }
    return terms[score] || terms["740-850"]
  }

  const calculatePayoffTime = (balance: number, apr: number, payment: number) => {
    if (payment <= balance * (apr / 100 / 12)) {
      return { months: 999, totalInterest: 999999 } // Never pays off
    }

    const monthlyRate = apr / 100 / 12
    const months = Math.log(1 + (balance * monthlyRate) / payment) / Math.log(1 + monthlyRate)
    const totalPaid = payment * months
    const totalInterest = totalPaid - balance

    return { months: Math.ceil(months), totalInterest }
  }

  const getMinimumPayment = (balance: number) => {
    return Math.max(25, balance * 0.02) // 2% of balance or $25, whichever is higher
  }

  const currentTerms = getCreditCardTerms(creditScore)
  const actualPayment = paymentType === "minimum" ? getMinimumPayment(balance) : monthlyPayment
  const payoffData = calculatePayoffTime(balance, currentTerms.apr, actualPayment)

  const comparisons = [
    { range: "740-850", label: "Excellent" },
    { range: "670-739", label: "Good" },
    { range: "580-669", label: "Fair" },
    { range: "300-579", label: "Poor" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <CreditCard className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Credit Card Interest Rate Calculator</h1>
          <p className="text-xl text-gray-600">See how your credit score affects credit card terms and payoff time</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Input */}
          <Card>
            <CardHeader>
              <CardTitle>Credit Card Details</CardTitle>
              <CardDescription>Enter your credit card information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="balance">Current Balance</Label>
                <Input
                  id="balance"
                  type="number"
                  value={balance}
                  onChange={(e) => setBalance(Number(e.target.value))}
                  className="text-lg"
                />
                <p className="text-sm text-gray-500 mt-1">Average credit card debt: $6,194 per person</p>
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

              <div>
                <Label htmlFor="payment-type">Payment Strategy</Label>
                <Select value={paymentType} onValueChange={setPaymentType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimum">Minimum Payment Only</SelectItem>
                    <SelectItem value="fixed">Fixed Monthly Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {paymentType === "fixed" && (
                <div>
                  <Label htmlFor="monthly-payment">Monthly Payment</Label>
                  <Input
                    id="monthly-payment"
                    type="number"
                    value={monthlyPayment}
                    onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                    className="text-lg"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Minimum payment: ${getMinimumPayment(balance).toFixed(0)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Credit Card Terms</CardTitle>
                <CardDescription>Based on your credit score: {creditScore}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{currentTerms.apr}%</div>
                    <div className="text-gray-600">APR</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">${currentTerms.annualFee}</div>
                    <div className="text-gray-600">Annual Fee</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      ${currentTerms.creditLimit.toLocaleString()}
                    </div>
                    <div className="text-gray-600">Credit Limit</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payoff Analysis</CardTitle>
                <CardDescription>Monthly payment: ${actualPayment.toFixed(0)}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {payoffData.months > 100 ? (
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                      <span className="font-semibold text-red-800">Warning: Debt Trap</span>
                    </div>
                    <p className="text-red-700 text-sm">
                      With minimum payments, you'll never pay off this balance. The payment barely covers interest
                      charges.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          {Math.floor(payoffData.months / 12)} years {payoffData.months % 12} months
                        </div>
                        <div className="text-gray-600">Time to Pay Off</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">
                        ${payoffData.totalInterest.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                      </div>
                      <div className="text-gray-600">Total Interest Paid</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Comparison Table */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Credit Score Comparison - Credit Card Terms</CardTitle>
            <CardDescription>See how different credit scores affect your credit card options</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Credit Score</th>
                    <th className="text-left py-3 px-4">Rating</th>
                    <th className="text-left py-3 px-4">Typical APR</th>
                    <th className="text-left py-3 px-4">Annual Fee</th>
                    <th className="text-left py-3 px-4">Credit Limit</th>
                    <th className="text-left py-3 px-4">Interest on $5K</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((comp, index) => {
                    const terms = getCreditCardTerms(comp.range)
                    const payoff = calculatePayoffTime(5000, terms.apr, getMinimumPayment(5000))

                    return (
                      <tr key={comp.range} className={`border-b ${comp.range === creditScore ? "bg-blue-50" : ""}`}>
                        <td className="py-3 px-4 font-medium">{comp.range}</td>
                        <td className="py-3 px-4">{comp.label}</td>
                        <td className="py-3 px-4">{terms.apr}%</td>
                        <td className="py-3 px-4">${terms.annualFee}</td>
                        <td className="py-3 px-4">${terms.creditLimit.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          {payoff.months > 100 ? (
                            <span className="text-red-600">Never pays off</span>
                          ) : (
                            <span>${payoff.totalInterest.toLocaleString("en-US", { maximumFractionDigits: 0 })}</span>
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
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Credit Card Approval Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">Excellent Credit (740+)</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Access to premium rewards cards</li>
                    <li>0% introductory APR offers</li>
                    <li>No annual fees on most cards</li>
                    <li>High credit limits ($10,000+)</li>
                    <li>Best cashback and travel rewards</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Good Credit (670-739)</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Good selection of rewards cards</li>
                    <li>Competitive interest rates</li>
                    <li>Most cards have no annual fee</li>
                    <li>Moderate credit limits ($5,000+)</li>
                    <li>Access to balance transfer offers</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-yellow-700 mb-2">Fair Credit (580-669)</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Limited rewards card options</li>
                    <li>Higher interest rates (20-25%)</li>
                    <li>Some cards may have annual fees</li>
                    <li>Lower credit limits ($2,000-5,000)</li>
                    <li>Focus on credit building cards</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-red-700 mb-2">Poor Credit (Below 580)</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Secured credit cards required</li>
                    <li>Very high interest rates (25-30%)</li>
                    <li>High annual fees ($39-99+)</li>
                    <li>Very low credit limits ($300-500)</li>
                    <li>Limited to subprime card options</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Smart Credit Card Strategies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Debt Payoff Strategies</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Pay more than the minimum (even $25 extra helps)</li>
                    <li>Use debt avalanche: pay highest APR first</li>
                    <li>Consider balance transfers to lower APR cards</li>
                    <li>Make bi-weekly payments to reduce interest</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Credit Utilization Tips</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Keep balances below 30% of credit limits</li>
                    <li>Aim for under 10% for excellent scores</li>
                    <li>Pay balances before statement dates</li>
                    <li>Request credit limit increases</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Choosing the Right Card</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Match card to your credit score range</li>
                    <li>Avoid cards with annual fees if rebuilding</li>
                    <li>Look for 0% intro APR for large purchases</li>
                    <li>Consider secured cards for credit building</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Avoiding Common Mistakes</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Never make only minimum payments long-term</li>
                    <li>Don't close old credit cards</li>
                    <li>Avoid cash advances (higher APR + fees)</li>
                    <li>Don't apply for multiple cards at once</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="mt-12 bg-blue-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Credit Cards?</h2>
            <p className="text-xl text-blue-100 mb-6">
              Learn how to improve your credit score and qualify for better credit card terms with lower rates and
              higher limits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#free-report"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Free Credit Report
              </Link>
              <Link
                href="/credit-impact"
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                See Full Credit Impact
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
