"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, AlertTriangle, TrendingUp, DollarSign } from "lucide-react"
import { Navigation } from "@/components/navigation"
import Link from "next/link"

export default function InsuranceCalculator() {
  const [age, setAge] = useState(35)
  const [creditScore, setCreditScore] = useState("740-850")
  const [insuranceType, setInsuranceType] = useState("auto")
  const [vehicleValue, setVehicleValue] = useState(25000)
  const [homeValue, setHomeValue] = useState(300000)

  const getInsurancePremium = (score: string, type: string, value: number, userAge: number) => {
    // Base rates vary by insurance type and age
    let baseRate = 0

    if (type === "auto") {
      // Auto insurance base rate (annual)
      if (userAge < 25)
        baseRate = value * 0.08 // 8% for young drivers
      else if (userAge < 65)
        baseRate = value * 0.05 // 5% for middle-aged
      else baseRate = value * 0.06 // 6% for seniors
    } else {
      // Home insurance base rate (annual)
      baseRate = value * 0.004 // 0.4% of home value
    }

    // Credit score multipliers
    const multipliers: { [key: string]: number } = {
      "300-579": 1.75, // 75% higher premium
      "580-669": 1.45, // 45% higher premium
      "670-739": 1.15, // 15% higher premium
      "740-850": 1.0, // Base rate (best)
    }

    return baseRate * (multipliers[score] || 1.0)
  }

  const currentPremium = getInsurancePremium(
    creditScore,
    insuranceType,
    insuranceType === "auto" ? vehicleValue : homeValue,
    age,
  )
  const bestPremium = getInsurancePremium(
    "740-850",
    insuranceType,
    insuranceType === "auto" ? vehicleValue : homeValue,
    age,
  )
  const extraCost = currentPremium - bestPremium

  const comparisons = [
    { range: "740-850", label: "Excellent", multiplier: 1.0 },
    { range: "670-739", label: "Good", multiplier: 1.15 },
    { range: "580-669", label: "Fair", multiplier: 1.45 },
    { range: "300-579", label: "Poor", multiplier: 1.75 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Insurance Premium Calculator</h1>
          <p className="text-xl text-gray-600">Discover how your credit score affects auto and home insurance costs</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Input */}
          <Card>
            <CardHeader>
              <CardTitle>Insurance Details</CardTitle>
              <CardDescription>Enter your information to calculate premiums</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="insurance-type">Insurance Type</Label>
                <Select value={insuranceType} onValueChange={setInsuranceType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto Insurance</SelectItem>
                    <SelectItem value="home">Home Insurance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="age">Your Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="text-lg"
                />
                <p className="text-sm text-gray-500 mt-1">Age affects base insurance rates</p>
              </div>

              {insuranceType === "auto" ? (
                <div>
                  <Label htmlFor="vehicle-value">Vehicle Value</Label>
                  <Input
                    id="vehicle-value"
                    type="number"
                    value={vehicleValue}
                    onChange={(e) => setVehicleValue(Number(e.target.value))}
                    className="text-lg"
                  />
                  <p className="text-sm text-gray-500 mt-1">Current market value of your vehicle</p>
                </div>
              ) : (
                <div>
                  <Label htmlFor="home-value">Home Value</Label>
                  <Input
                    id="home-value"
                    type="number"
                    value={homeValue}
                    onChange={(e) => setHomeValue(Number(e.target.value))}
                    className="text-lg"
                  />
                  <p className="text-sm text-gray-500 mt-1">Current market value of your home</p>
                </div>
              )}

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
                <CardTitle>Your Insurance Premium</CardTitle>
                <CardDescription>
                  {insuranceType === "auto" ? "Auto" : "Home"} insurance based on credit score: {creditScore}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      ${currentPremium.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-gray-600">Annual Premium</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      ${(currentPremium / 12).toLocaleString("en-US", { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-gray-600">Monthly Cost</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {((currentPremium / bestPremium - 1) * 100).toFixed(0)}%
                    </div>
                    <div className="text-gray-600">Above Best Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Extra Cost Warning */}
            {extraCost > 100 && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
                    <span className="font-semibold text-red-800">Credit Score Impact</span>
                  </div>
                  <p className="text-red-700 mb-2">
                    Your credit score is costing you{" "}
                    <span className="font-bold">
                      ${extraCost.toLocaleString("en-US", { maximumFractionDigits: 0 })} per year
                    </span>{" "}
                    in higher insurance premiums.
                  </p>
                  <p className="text-red-600 text-sm">
                    Over 10 years, that's ${(extraCost * 10).toLocaleString("en-US", { maximumFractionDigits: 0 })} in
                    extra costs.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Comparison Table */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Credit Score Impact on {insuranceType === "auto" ? "Auto" : "Home"} Insurance</CardTitle>
            <CardDescription>See how different credit scores affect your insurance premiums</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Credit Score</th>
                    <th className="text-left py-3 px-4">Rating</th>
                    <th className="text-left py-3 px-4">Rate Multiplier</th>
                    <th className="text-left py-3 px-4">Annual Premium</th>
                    <th className="text-left py-3 px-4">Monthly Cost</th>
                    <th className="text-left py-3 px-4">Extra Cost/Year</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((comp, index) => {
                    const premium = getInsurancePremium(
                      comp.range,
                      insuranceType,
                      insuranceType === "auto" ? vehicleValue : homeValue,
                      age,
                    )
                    const difference = premium - bestPremium

                    return (
                      <tr key={comp.range} className={`border-b ${comp.range === creditScore ? "bg-blue-50" : ""}`}>
                        <td className="py-3 px-4 font-medium">{comp.range}</td>
                        <td className="py-3 px-4">{comp.label}</td>
                        <td className="py-3 px-4">{comp.multiplier}x</td>
                        <td className="py-3 px-4">${premium.toLocaleString("en-US", { maximumFractionDigits: 0 })}</td>
                        <td className="py-3 px-4">
                          ${(premium / 12).toLocaleString("en-US", { maximumFractionDigits: 0 })}
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
              <CardTitle>Why Credit Affects Insurance Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Insurance companies use credit-based insurance scores because studies show a correlation between
                  credit management and insurance claims. Here's what they consider:
                </p>

                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Credit Factors Used</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Payment history (most important)</li>
                    <li>Outstanding debt levels</li>
                    <li>Length of credit history</li>
                    <li>Types of credit accounts</li>
                    <li>New credit applications</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">State Regulations</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>California, Hawaii, Massachusetts ban credit scoring</li>
                    <li>Maryland, Nevada have restrictions</li>
                    <li>Most states allow credit-based pricing</li>
                    <li>Cannot be the sole factor in coverage decisions</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">What's NOT Considered</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Income level</li>
                    <li>Race, gender, religion, nationality</li>
                    <li>Marital status</li>
                    <li>Interest rates you pay</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Strategies to Lower Insurance Costs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Improve Your Credit Score</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Pay all bills on time consistently</li>
                    <li>Keep credit card balances low</li>
                    <li>Don't close old credit accounts</li>
                    <li>Check credit reports for errors</li>
                    <li>Limit new credit applications</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Other Ways to Save</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Bundle auto and home insurance</li>
                    <li>Increase deductibles to lower premiums</li>
                    <li>Take advantage of discounts (safe driver, etc.)</li>
                    <li>Shop around with multiple insurers</li>
                    <li>Consider usage-based insurance programs</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Auto Insurance Specific</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Choose vehicles with good safety ratings</li>
                    <li>Install anti-theft devices</li>
                    <li>Complete defensive driving courses</li>
                    <li>Maintain continuous coverage</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Home Insurance Specific</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Install security and fire safety systems</li>
                    <li>Update electrical, plumbing, and roofing</li>
                    <li>Choose wind/hail resistant materials</li>
                    <li>Stay with the same insurer for loyalty discounts</li>
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
              <div className="text-2xl font-bold text-red-700 mb-2">75%</div>
              <div className="text-red-600 font-medium">Higher premiums with poor credit</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-6 text-center">
              <Shield className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-yellow-700 mb-2">$900+</div>
              <div className="text-yellow-600 font-medium">Average extra cost per year</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-blue-700 mb-2">47</div>
              <div className="text-blue-600 font-medium">States allow credit scoring</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-green-700 mb-2">90%</div>
              <div className="text-green-600 font-medium">Of insurers use credit scores</div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="mt-12 bg-blue-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Lower Your Insurance Costs?</h2>
            <p className="text-xl text-blue-100 mb-6">
              Improving your credit score can save you hundreds of dollars annually on insurance premiums. Start your
              credit improvement journey today.
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
