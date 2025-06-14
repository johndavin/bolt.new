"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Zap, AlertTriangle, TrendingUp, DollarSign } from "lucide-react"
import { Navigation } from "@/components/navigation"
import Link from "next/link"

export default function UtilityCalculator() {
  const [creditScore, setCreditScore] = useState("740-850")
  const [utilities, setUtilities] = useState({
    electric: true,
    gas: true,
    water: true,
    internet: true,
    cable: false,
  })
  const [monthlyBudget, setMonthlyBudget] = useState(200)
  const [location, setLocation] = useState("average")

  const getUtilityDeposit = (score: string, utilityType: string, budget: number, loc: string) => {
    // Base deposit multipliers by credit score
    const multipliers: { [key: string]: number } = {
      "300-579": 3.0, // 3x monthly bill
      "580-669": 2.0, // 2x monthly bill
      "670-739": 1.0, // 1x monthly bill
      "740-850": 0.0, // No deposit required
    }

    // Location adjustments
    const locationMultipliers: { [key: string]: number } = {
      "low-cost": 0.8,
      average: 1.0,
      "high-cost": 1.3,
    }

    // Utility-specific base amounts (monthly)
    const utilityBases: { [key: string]: number } = {
      electric: budget * 0.4, // 40% of budget
      gas: budget * 0.2, // 20% of budget
      water: budget * 0.15, // 15% of budget
      internet: 70, // Fixed amount
      cable: 80, // Fixed amount
    }

    const baseAmount = utilityBases[utilityType] || 50
    const scoreMultiplier = multipliers[score] || 0
    const locMultiplier = locationMultipliers[loc] || 1

    return baseAmount * scoreMultiplier * locMultiplier
  }

  const calculateTotalDeposits = () => {
    let total = 0
    Object.entries(utilities).forEach(([utility, enabled]) => {
      if (enabled) {
        total += getUtilityDeposit(creditScore, utility, monthlyBudget, location)
      }
    })
    return total
  }

  const totalDeposits = calculateTotalDeposits()
  const bestCaseTotal = Object.entries(utilities).reduce((sum, [utility, enabled]) => {
    if (enabled) {
      return sum + getUtilityDeposit("740-850", utility, monthlyBudget, location)
    }
    return sum
  }, 0)

  const extraCost = totalDeposits - bestCaseTotal

  const comparisons = [
    { range: "740-850", label: "Excellent", multiplier: 0.0 },
    { range: "670-739", label: "Good", multiplier: 1.0 },
    { range: "580-669", label: "Fair", multiplier: 2.0 },
    { range: "300-579", label: "Poor", multiplier: 3.0 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Zap className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Utility Deposit Calculator</h1>
          <p className="text-xl text-gray-600">See how your credit score affects utility connection deposits</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Input */}
          <Card>
            <CardHeader>
              <CardTitle>Utility Setup Details</CardTitle>
              <CardDescription>Select the utilities you need to connect</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
                <Label htmlFor="location">Location Cost Level</Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low-cost">Low Cost Area</SelectItem>
                    <SelectItem value="average">Average Cost Area</SelectItem>
                    <SelectItem value="high-cost">High Cost Area</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="monthly-budget">Expected Monthly Utility Budget</Label>
                <Input
                  id="monthly-budget"
                  type="number"
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                  className="text-lg"
                />
                <p className="text-sm text-gray-500 mt-1">Average household: $150-250/month</p>
              </div>

              <div>
                <Label className="text-base font-medium">Utilities to Connect</Label>
                <div className="space-y-3 mt-3">
                  {Object.entries(utilities).map(([utility, checked]) => (
                    <div key={utility} className="flex items-center space-x-2">
                      <Checkbox
                        id={utility}
                        checked={checked}
                        onCheckedChange={(checked) =>
                          setUtilities((prev) => ({ ...prev, [utility]: checked as boolean }))
                        }
                      />
                      <Label htmlFor={utility} className="capitalize">
                        {utility === "internet" ? "Internet/Phone" : utility}
                        {utility === "cable" && " TV"}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Required Deposits</CardTitle>
                <CardDescription>Based on your credit score: {creditScore}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      ${totalDeposits.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-gray-600">Total Upfront Deposits</div>
                  </div>
                </div>

                {/* Individual Utility Breakdown */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Deposit Breakdown:</h4>
                  {Object.entries(utilities).map(([utility, enabled]) => {
                    if (!enabled) return null
                    const deposit = getUtilityDeposit(creditScore, utility, monthlyBudget, location)
                    return (
                      <div key={utility} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="capitalize text-gray-700">
                          {utility === "internet" ? "Internet/Phone" : utility}
                          {utility === "cable" && " TV"}
                        </span>
                        <span className="font-semibold">
                          ${deposit.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Extra Cost Warning */}
            {extraCost > 0 && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
                    <span className="font-semibold text-red-800">Credit Score Impact</span>
                  </div>
                  <p className="text-red-700 mb-2">
                    Your credit score requires{" "}
                    <span className="font-bold">
                      ${extraCost.toLocaleString("en-US", { maximumFractionDigits: 0 })} in extra deposits
                    </span>{" "}
                    compared to excellent credit.
                  </p>
                  <p className="text-red-600 text-sm">
                    These deposits are typically refundable after 12 months of on-time payments.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Comparison Table */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Credit Score Impact on Utility Deposits</CardTitle>
            <CardDescription>See how different credit scores affect your upfront costs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Credit Score</th>
                    <th className="text-left py-3 px-4">Rating</th>
                    <th className="text-left py-3 px-4">Deposit Multiplier</th>
                    <th className="text-left py-3 px-4">Total Deposits</th>
                    <th className="text-left py-3 px-4">Extra Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((comp, index) => {
                    const tempUtilities = utilities
                    const tempTotal = Object.entries(tempUtilities).reduce((sum, [utility, enabled]) => {
                      if (enabled) {
                        return sum + getUtilityDeposit(comp.range, utility, monthlyBudget, location)
                      }
                      return sum
                    }, 0)
                    const difference = tempTotal - bestCaseTotal

                    return (
                      <tr key={comp.range} className={`border-b ${comp.range === creditScore ? "bg-blue-50" : ""}`}>
                        <td className="py-3 px-4 font-medium">{comp.range}</td>
                        <td className="py-3 px-4">{comp.label}</td>
                        <td className="py-3 px-4">
                          {comp.multiplier === 0 ? "No deposit" : `${comp.multiplier}x monthly bill`}
                        </td>
                        <td className="py-3 px-4">
                          ${tempTotal.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                        </td>
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
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Understanding Utility Deposits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Utility companies use credit scores to assess the risk of non-payment. Poor credit often means higher
                  deposits to secure service.
                </p>

                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">How Deposits Work</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Required upfront before service activation</li>
                    <li>Typically 1-3 times your estimated monthly bill</li>
                    <li>Held as security against unpaid bills</li>
                    <li>Usually refundable after 12 months of on-time payments</li>
                    <li>May earn interest in some states</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Factors That Affect Deposits</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Credit score and credit history</li>
                    <li>Previous utility payment history</li>
                    <li>Income verification</li>
                    <li>Type of utility service</li>
                    <li>Local regulations and utility policies</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Alternatives to Deposits</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Letter of guarantee from previous utility</li>
                    <li>Co-signer with good credit</li>
                    <li>Prepaid utility programs</li>
                    <li>Budget billing plans</li>
                    <li>Third-party deposit assistance programs</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Strategies to Avoid or Reduce Deposits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Improve Your Credit Score</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Pay all bills on time, including current utilities</li>
                    <li>Keep credit card balances low</li>
                    <li>Don't close old credit accounts</li>
                    <li>Check credit reports for errors and dispute them</li>
                    <li>Consider becoming an authorized user</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Provide Additional Documentation</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Proof of steady income and employment</li>
                    <li>Bank statements showing financial stability</li>
                    <li>Letter from previous utility company</li>
                    <li>References from landlords or employers</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibant text-blue-700 mb-2">Timing and Planning</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Set up utilities in advance to avoid rush fees</li>
                    <li>Transfer service from previous address when possible</li>
                    <li>Ask about payment plan options for deposits</li>
                    <li>Budget for deposits when moving</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Getting Deposits Back</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Make all payments on time for 12 months</li>
                    <li>Request deposit review after good payment history</li>
                    <li>Deposits typically applied to final bill when moving</li>
                    <li>Some utilities pay interest on held deposits</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Statistics */}
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-red-700 mb-2">$800+</div>
              <div className="text-red-600 font-medium">Average deposits with poor credit</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-6 text-center">
              <Zap className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-yellow-700 mb-2">3x</div>
              <div className="text-yellow-600 font-medium">Monthly bill multiplier</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-blue-700 mb-2">12</div>
              <div className="text-blue-600 font-medium">Months to get deposit back</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-green-700 mb-2">$0</div>
              <div className="text-green-600 font-medium">Deposits with excellent credit</div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="mt-12 bg-blue-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Eliminate Utility Deposits?</h2>
            <p className="text-xl text-blue-100 mb-6">
              Improving your credit score can save you hundreds in upfront utility deposits and make moving more
              affordable.
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
