"use client"

import Link from "next/link"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Car, AlertTriangle, TrendingUp, DollarSign } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function AutoCalculator() {
  const [loanAmount, setLoanAmount] = useState(30000)
  const [loanTerm, setLoanTerm] = useState(60)
  const [creditScore, setCreditScore] = useState("740-850")
  const [vehicleType, setVehicleType] = useState("used")

  const getInterestRate = (score: string, type: string) => {
    const newCarRates: { [key: string]: number } = {
      "300-579": 14.39,
      "580-669": 9.75,
      "670-739": 6.4,
      "740-850": 4.21,
    }

    const usedCarRates: { [key: string]: number } = {
      "300-579": 20.99,
      "580-669": 15.24,
      "670-739": 10.48,
      "740-850": 7.71,
    }

    return type === "new" ? newCarRates[score] || 4.21 : usedCarRates[score] || 7.71
  }

  const calculatePayment = (principal: number, rate: number, months: number) => {
    const monthlyRate = rate / 100 / 12
    const payment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    return payment
  }

  const currentRate = getInterestRate(creditScore, vehicleType)
  const currentPayment = calculatePayment(loanAmount, currentRate, loanTerm)
  const totalPaid = currentPayment * loanTerm
  const totalInterest = totalPaid - loanAmount

  const comparisons = [
    { range: "740-850", label: "Excellent" },
    { range: "670-739", label: "Good" },
    { range: "580-669", label: "Fair" },
    { range: "300-579", label: "Poor" },
  ]

  const bestRate = getInterestRate("740-850", vehicleType)
  const bestPayment = calculatePayment(loanAmount, bestRate, loanTerm)
  const bestTotal = bestPayment * loanTerm
  const extraCost = totalPaid - bestTotal

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Car className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Auto Loan Interest Rate Calculator</h1>
          <p className="text-xl text-gray-600">Discover how your credit score affects your car loan payments</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Input */}
          <Card>
            <CardHeader>
              <CardTitle>Loan Details</CardTitle>
              <CardDescription>Enter your auto loan information</CardDescription>
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
                <p className="text-sm text-gray-500 mt-1">Average new car: $48,000 | Average used car: $28,000</p>
              </div>

              <div>
                <Label htmlFor="vehicle-type">Vehicle Type</Label>
                <Select value={vehicleType} onValueChange={setVehicleType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New Car</SelectItem>
                    <SelectItem value="used">Used Car</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="loan-term">Loan Term (Months)</Label>
                <Select value={loanTerm.toString()} onValueChange={(value) => setLoanTerm(Number(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="36">36 Months (3 Years)</SelectItem>
                    <SelectItem value="48">48 Months (4 Years)</SelectItem>
                    <SelectItem value="60">60 Months (5 Years)</SelectItem>
                    <SelectItem value="72">72 Months (6 Years)</SelectItem>
                    <SelectItem value="84">84 Months (7 Years)</SelectItem>
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
          <div className="space-y-6">
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

            {/* Extra Cost Warning */}
            {extraCost > 1000 && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
                    <span className="font-semibold text-red-800">Credit Score Impact</span>
                  </div>
                  <p className="text-red-700 mb-2">
                    With your current credit score, you'll pay{" "}
                    <span className="font-bold">
                      ${extraCost.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                    </span>{" "}
                    more than someone with excellent credit.
                  </p>
                  <p className="text-red-600 text-sm">
                    Improving your credit score could save you thousands on this loan.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Comparison Table */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Credit Score Comparison - {vehicleType === "new" ? "New" : "Used"} Car Rates</CardTitle>
            <CardDescription>See how different credit scores affect your auto loan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Credit Score</th>
                    <th className="text-left py-3 px-4">Rating</th>
                    <th className="text-left py-3 px-4">Interest Rate</th>
                    <th className="text-left py-3 px-4">Monthly Payment</th>
                    <th className="text-left py-3 px-4">Total Interest</th>
                    <th className="text-left py-3 px-4">Extra Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((comp, index) => {
                    const rate = getInterestRate(comp.range, vehicleType)
                    const payment = calculatePayment(loanAmount, rate, loanTerm)
                    const totalInt = payment * loanTerm - loanAmount
                    const bestTotal = bestPayment * loanTerm - loanAmount
                    const difference = totalInt - bestTotal

                    return (
                      <tr key={comp.range} className={`border-b ${comp.range === creditScore ? "bg-blue-50" : ""}`}>
                        <td className="py-3 px-4 font-medium">{comp.range}</td>
                        <td className="py-3 px-4">{comp.label}</td>
                        <td className="py-3 px-4">{rate.toFixed(2)}%</td>
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

        {/* Key Insights */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-red-700 mb-2">
                ${(getInterestRate("300-579", vehicleType) - getInterestRate("740-850", vehicleType)).toFixed(1)}%
              </div>
              <div className="text-red-600 font-medium">Higher rate with poor credit</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-yellow-700 mb-2">
                $
                {Math.round(
                  calculatePayment(30000, getInterestRate("300-579", vehicleType), 60) * 60 -
                    calculatePayment(30000, getInterestRate("740-850", vehicleType), 60) * 60,
                ).toLocaleString()}
              </div>
              <div className="text-yellow-600 font-medium">Extra cost on $30K loan</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6 text-center">
              <Car className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-green-700 mb-2">{vehicleType === "new" ? "4.21%" : "7.71%"}</div>
              <div className="text-green-600 font-medium">Best rate available</div>
            </CardContent>
          </Card>
        </div>

        {/* Educational Content */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Auto Loan Credit Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">Excellent Credit (740+)</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Qualify for manufacturer incentives and 0% APR offers</li>
                    <li>Access to the best rates from banks and credit unions</li>
                    <li>Minimal down payment requirements</li>
                    <li>Pre-approval gives strong negotiating power</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Good Credit (670-739)</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Competitive rates from most lenders</li>
                    <li>May qualify for some manufacturer incentives</li>
                    <li>Good selection of loan terms</li>
                    <li>Reasonable down payment requirements</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-yellow-700 mb-2">Fair Credit (580-669)</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Higher interest rates but still qualify</li>
                    <li>May need larger down payment</li>
                    <li>Consider credit unions for better rates</li>
                    <li>Shorter loan terms may get better rates</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-red-700 mb-2">Poor Credit (Below 580)</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Subprime lenders with high rates</li>
                    <li>Large down payments often required</li>
                    <li>Consider improving credit before buying</li>
                    <li>Buy here, pay here lots as last resort</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Smart Auto Loan Strategies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Before You Shop</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Check your credit score and report</li>
                    <li>Get pre-approved from banks/credit unions</li>
                    <li>Determine your budget including insurance</li>
                    <li>Research vehicle values and reliability</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">New vs. Used Cars</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>New cars typically get lower interest rates</li>
                    <li>Used cars (2-3 years old) offer best value</li>
                    <li>Cars over 7 years old may have higher rates</li>
                    <li>Consider certified pre-owned for warranty</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Loan Term Considerations</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Shorter terms = higher payments, less interest</li>
                    <li>Longer terms = lower payments, more interest</li>
                    <li>Avoid being "upside down" on the loan</li>
                    <li>Consider the car's useful life vs. loan term</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Improving Your Rate</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Make a larger down payment (20%+ ideal)</li>
                    <li>Consider a co-signer with good credit</li>
                    <li>Shop around with multiple lenders</li>
                    <li>Time your purchase after credit improvements</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rate Factors */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Factors That Affect Your Auto Loan Rate</CardTitle>
            <CardDescription>Understanding what lenders consider when setting your interest rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Primary Factors</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Credit Score</span>
                    <span className="font-semibold text-blue-600">Most Important</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Loan Term</span>
                    <span className="font-semibold text-blue-600">Very Important</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Vehicle Age</span>
                    <span className="font-semibold text-blue-600">Very Important</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Down Payment</span>
                    <span className="font-semibold text-orange-600">Important</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Secondary Factors</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Income & Employment</span>
                    <span className="font-semibold text-orange-600">Important</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Debt-to-Income Ratio</span>
                    <span className="font-semibold text-orange-600">Important</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Vehicle Type & Value</span>
                    <span className="font-semibold text-gray-600">Moderate</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Existing Relationship</span>
                    <span className="font-semibold text-gray-600">Moderate</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="mt-12 bg-blue-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get the Best Auto Loan Rate?</h2>
            <p className="text-xl text-blue-100 mb-6">
              Don't let poor credit cost you thousands. Learn how to improve your credit score and save money on your
              next car purchase.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/credit-impact"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                See Full Credit Impact
              </Link>
              <Link
                href="/improvement-planner"
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Improve Your Credit
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
