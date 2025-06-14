"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Home, Car, Shield, Zap, CreditCard, DollarSign, CheckCircle } from "lucide-react"

interface CreditImpact {
  mortgageRate: number
  autoRate: number
  insuranceMultiplier: number
  utilityDeposit: number
  creditCardRate: number
  personalLoanRate: number
}

const getCreditImpact = (score: number): CreditImpact => {
  if (score >= 800) {
    return {
      mortgageRate: 6.5,
      autoRate: 4.2,
      insuranceMultiplier: 0.85,
      utilityDeposit: 0,
      creditCardRate: 16.9,
      personalLoanRate: 6.5,
    }
  } else if (score >= 740) {
    return {
      mortgageRate: 6.8,
      autoRate: 5.1,
      insuranceMultiplier: 0.95,
      utilityDeposit: 50,
      creditCardRate: 19.9,
      personalLoanRate: 8.5,
    }
  } else if (score >= 670) {
    return {
      mortgageRate: 7.2,
      autoRate: 6.8,
      insuranceMultiplier: 1.1,
      utilityDeposit: 150,
      creditCardRate: 22.9,
      personalLoanRate: 12.5,
    }
  } else if (score >= 580) {
    return {
      mortgageRate: 8.5,
      autoRate: 9.2,
      insuranceMultiplier: 1.3,
      utilityDeposit: 300,
      creditCardRate: 26.9,
      personalLoanRate: 18.5,
    }
  } else {
    return {
      mortgageRate: 10.2,
      autoRate: 12.5,
      insuranceMultiplier: 1.6,
      utilityDeposit: 500,
      creditCardRate: 29.9,
      personalLoanRate: 25.0,
    }
  }
}

const getCreditScoreCategory = (score: number) => {
  if (score >= 800) return { label: "Exceptional", color: "bg-green-500", textColor: "text-green-700" }
  if (score >= 740) return { label: "Very Good", color: "bg-blue-500", textColor: "text-blue-700" }
  if (score >= 670) return { label: "Good", color: "bg-yellow-500", textColor: "text-yellow-700" }
  if (score >= 580) return { label: "Fair", color: "bg-orange-500", textColor: "text-orange-700" }
  return { label: "Poor", color: "bg-red-500", textColor: "text-red-700" }
}

const calculateMonthlyPayment = (principal: number, rate: number, years: number) => {
  const monthlyRate = rate / 100 / 12
  const numPayments = years * 12
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
  )
}

export default function CreditScoreCalculator() {
  const [creditScore, setCreditScore] = useState([720])
  const [homePrice, setHomePrice] = useState(350000)
  const [downPayment, setDownPayment] = useState(70000)
  const [carPrice, setCarPrice] = useState(30000)
  const [carDownPayment, setCarDownPayment] = useState(5000)
  const [annualInsurance, setAnnualInsurance] = useState(1200)

  const currentScore = creditScore[0]
  const currentImpact = getCreditImpact(currentScore)
  const excellentImpact = getCreditImpact(800)
  const category = getCreditScoreCategory(currentScore)

  // Mortgage calculations
  const loanAmount = homePrice - downPayment
  const currentMortgagePayment = calculateMonthlyPayment(loanAmount, currentImpact.mortgageRate, 30)
  const excellentMortgagePayment = calculateMonthlyPayment(loanAmount, excellentImpact.mortgageRate, 30)
  const mortgageDifference = currentMortgagePayment - excellentMortgagePayment
  const mortgageLifetimeDifference = mortgageDifference * 12 * 30

  // Auto loan calculations
  const autoLoanAmount = carPrice - carDownPayment
  const currentAutoPayment = calculateMonthlyPayment(autoLoanAmount, currentImpact.autoRate, 5)
  const excellentAutoPayment = calculateMonthlyPayment(autoLoanAmount, excellentImpact.autoRate, 5)
  const autoDifference = currentAutoPayment - excellentAutoPayment
  const autoLifetimeDifference = autoDifference * 12 * 5

  // Insurance calculations
  const currentInsuranceCost = annualInsurance * currentImpact.insuranceMultiplier
  const excellentInsuranceCost = annualInsurance * excellentImpact.insuranceMultiplier
  const insuranceDifference = currentInsuranceCost - excellentInsuranceCost

  // Total annual extra cost
  const totalAnnualExtra = mortgageDifference * 12 + autoDifference * 12 + insuranceDifference

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Credit Score Impact Calculator</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover how your credit score affects your financial life - from mortgage rates to insurance premiums
          </p>
        </div>

        {/* Credit Score Input */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-6 w-6" />
              Your Credit Score
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-medium">Credit Score: {currentScore}</Label>
                <Badge className={`${category.color} text-white px-3 py-1`}>{category.label}</Badge>
              </div>
              <Slider
                value={creditScore}
                onValueChange={setCreditScore}
                max={850}
                min={300}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>300 (Poor)</span>
                <span>580 (Fair)</span>
                <span>670 (Good)</span>
                <span>740 (Very Good)</span>
                <span>850 (Exceptional)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input Parameters */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Home Purchase
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Home Price</Label>
                <Input
                  type="number"
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Down Payment</Label>
                <Input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Auto Purchase
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Car Price</Label>
                <Input
                  type="number"
                  value={carPrice}
                  onChange={(e) => setCarPrice(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Down Payment</Label>
                <Input
                  type="number"
                  value={carDownPayment}
                  onChange={(e) => setCarDownPayment(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Impact Results */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Mortgage Impact */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-6 w-6 text-blue-600" />
                Mortgage Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Your Rate</div>
                  <div className="text-2xl font-bold text-gray-900">{currentImpact.mortgageRate}%</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-sm text-gray-600">Excellent Rate</div>
                  <div className="text-2xl font-bold text-green-600">{excellentImpact.mortgageRate}%</div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Monthly Payment Difference:</span>
                  <span className={`font-bold ${mortgageDifference > 0 ? "text-red-600" : "text-green-600"}`}>
                    {mortgageDifference > 0 ? "+" : ""}${mortgageDifference.toFixed(0)}/month
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>30-Year Total Extra Cost:</span>
                  <span className={`font-bold ${mortgageLifetimeDifference > 0 ? "text-red-600" : "text-green-600"}`}>
                    {mortgageLifetimeDifference > 0 ? "+" : ""}${mortgageLifetimeDifference.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Auto Loan Impact */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-6 w-6 text-purple-600" />
                Auto Loan Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Your Rate</div>
                  <div className="text-2xl font-bold text-gray-900">{currentImpact.autoRate}%</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-sm text-gray-600">Excellent Rate</div>
                  <div className="text-2xl font-bold text-green-600">{excellentImpact.autoRate}%</div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Monthly Payment Difference:</span>
                  <span className={`font-bold ${autoDifference > 0 ? "text-red-600" : "text-green-600"}`}>
                    {autoDifference > 0 ? "+" : ""}${autoDifference.toFixed(0)}/month
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>5-Year Total Extra Cost:</span>
                  <span className={`font-bold ${autoLifetimeDifference > 0 ? "text-red-600" : "text-green-600"}`}>
                    {autoLifetimeDifference > 0 ? "+" : ""}${autoLifetimeDifference.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Other Impacts */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-orange-600" />
                Insurance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600">Annual Premium</div>
                  <div className="text-xl font-bold">${currentInsuranceCost.toFixed(0)}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">Extra vs Excellent Credit</div>
                  <div className={`text-lg font-bold ${insuranceDifference > 0 ? "text-red-600" : "text-green-600"}`}>
                    {insuranceDifference > 0 ? "+" : ""}${insuranceDifference.toFixed(0)}/year
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                Utility Deposits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600">Required Deposit</div>
                  <div className="text-xl font-bold">${currentImpact.utilityDeposit}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">vs Excellent Credit</div>
                  <div
                    className={`text-lg font-bold ${currentImpact.utilityDeposit > 0 ? "text-red-600" : "text-green-600"}`}
                  >
                    {currentImpact.utilityDeposit > 0 ? `+$${currentImpact.utilityDeposit}` : "No deposit"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-indigo-600" />
                Credit Cards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600">Typical APR</div>
                  <div className="text-xl font-bold">{currentImpact.creditCardRate}%</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">vs Excellent Credit</div>
                  <div className="text-lg font-bold text-red-600">
                    +{(currentImpact.creditCardRate - excellentImpact.creditCardRate).toFixed(1)}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <DollarSign className="h-6 w-6" />
              Annual Financial Impact Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Extra Costs Per Year:</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Mortgage payments:</span>
                    <span className="font-bold text-red-600">+${(mortgageDifference * 12).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Auto loan payments:</span>
                    <span className="font-bold text-red-600">+${(autoDifference * 12).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Insurance premiums:</span>
                    <span className="font-bold text-red-600">+${insuranceDifference.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total Annual Extra:</span>
                    <span className="font-bold text-red-600">+${totalAnnualExtra.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Improvement Tips:</h3>
                <div className="space-y-2 text-sm">
                  {currentScore < 740 && (
                    <>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Pay all bills on time (35% of score)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Keep credit utilization below 30% (30% of score)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Don't close old credit accounts</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Monitor credit reports for errors</span>
                      </div>
                    </>
                  )}
                  {currentScore >= 740 && (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span>Great job! You're in an excellent credit range.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
