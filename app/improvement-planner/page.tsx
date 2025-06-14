"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, CheckCircle, Clock, Target, AlertCircle } from "lucide-react"
import { Navigation } from "@/components/navigation"
import Link from "next/link"

export default function ImprovementPlanner() {
  const [currentScore, setCurrentScore] = useState("580-669")
  const [targetScore, setTargetScore] = useState("740-850")
  const [currentDebt, setCurrentDebt] = useState(15000)
  const [monthlyPayment, setMonthlyPayment] = useState(500)
  const [creditHistory, setCreditHistory] = useState("2-5")
  const [showPlan, setShowPlan] = useState(false)

  const getScoreRange = (range: string) => {
    const ranges: { [key: string]: { min: number; max: number; label: string } } = {
      "300-579": { min: 300, max: 579, label: "Poor" },
      "580-669": { min: 580, max: 669, label: "Fair" },
      "670-739": { min: 670, max: 739, label: "Good" },
      "740-850": { min: 740, max: 850, label: "Excellent" },
    }
    return ranges[range] || ranges["580-669"]
  }

  const calculateImprovementPlan = () => {
    const current = getScoreRange(currentScore)
    const target = getScoreRange(targetScore)

    const pointsNeeded = target.min - current.max

    if (pointsNeeded <= 0) {
      return {
        timeframe: "Already achieved",
        strategies: [],
        milestones: [],
        potentialSavings: 0,
      }
    }

    // Calculate estimated timeframe based on points needed
    let timeframe = "3-6 months"
    if (pointsNeeded > 100) timeframe = "12-18 months"
    else if (pointsNeeded > 60) timeframe = "6-12 months"

    // Calculate potential savings
    const mortgageSavings = 123840 * (pointsNeeded / 160) // Proportional to max savings
    const autoSavings = 9960 * (pointsNeeded / 160)
    const insuranceSavings = 900 * (pointsNeeded / 160)
    const potentialSavings = mortgageSavings + autoSavings + insuranceSavings

    return {
      timeframe,
      pointsNeeded,
      potentialSavings,
      strategies: getStrategies(current.label, target.label),
      milestones: getMilestones(pointsNeeded),
    }
  }

  const getStrategies = (currentLevel: string, targetLevel: string) => {
    const allStrategies = [
      {
        title: "Pay All Bills On Time",
        impact: "High",
        timeframe: "Immediate",
        description: "Set up automatic payments for all bills. Payment history is 35% of your credit score.",
        priority: 1,
      },
      {
        title: "Reduce Credit Card Balances",
        impact: "High",
        timeframe: "1-2 months",
        description: "Pay down balances to below 30% of limits, ideally under 10%. This is 30% of your score.",
        priority: 1,
      },
      {
        title: "Check Credit Reports for Errors",
        impact: "Medium",
        timeframe: "30-60 days",
        description: "Dispute any errors on your credit reports from all three bureaus.",
        priority: 2,
      },
      {
        title: "Request Credit Limit Increases",
        impact: "Medium",
        timeframe: "Immediate",
        description: "Ask for higher limits on existing cards to lower utilization ratios.",
        priority: 2,
      },
      {
        title: "Keep Old Accounts Open",
        impact: "Medium",
        timeframe: "Ongoing",
        description: "Don't close old credit cards. Length of credit history is 15% of your score.",
        priority: 3,
      },
      {
        title: "Diversify Credit Types",
        impact: "Low",
        timeframe: "6+ months",
        description: "Having different types of credit (cards, loans) can help your score.",
        priority: 3,
      },
    ]

    // Return strategies based on current level
    if (currentLevel === "Poor") return allStrategies
    if (currentLevel === "Fair") return allStrategies.slice(0, 4)
    return allStrategies.slice(0, 3)
  }

  const getMilestones = (pointsNeeded: number) => {
    const milestones = []

    if (pointsNeeded >= 30) {
      milestones.push({
        timeframe: "30 days",
        points: "10-30 points",
        actions: ["Set up automatic payments", "Pay down credit card balances", "Check credit reports"],
      })
    }

    if (pointsNeeded >= 60) {
      milestones.push({
        timeframe: "60 days",
        points: "20-50 points",
        actions: ["See initial improvements", "Dispute credit report errors", "Request credit limit increases"],
      })
    }

    if (pointsNeeded >= 90) {
      milestones.push({
        timeframe: "90+ days",
        points: "30-100+ points",
        actions: ["Significant improvements", "Qualify for better rates", "Lower insurance premiums"],
      })
    }

    return milestones
  }

  const plan = showPlan ? calculateImprovementPlan() : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <TrendingUp className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Credit Improvement Planner</h1>
          <p className="text-xl text-gray-600">
            Create your personalized plan to boost your credit score and save money
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>Your Credit Profile</CardTitle>
              <CardDescription>Tell us about your current situation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="current-score">Current Credit Score Range</Label>
                <Select value={currentScore} onValueChange={setCurrentScore}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="300-579">300-579 (Poor)</SelectItem>
                    <SelectItem value="580-669">580-669 (Fair)</SelectItem>
                    <SelectItem value="670-739">670-739 (Good)</SelectItem>
                    <SelectItem value="740-850">740-850 (Excellent)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="target-score">Target Credit Score Range</Label>
                <Select value={targetScore} onValueChange={setTargetScore}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="580-669">580-669 (Fair)</SelectItem>
                    <SelectItem value="670-739">670-739 (Good)</SelectItem>
                    <SelectItem value="740-850">740-850 (Excellent)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="current-debt">Total Credit Card Debt</Label>
                <Input
                  id="current-debt"
                  type="number"
                  value={currentDebt}
                  onChange={(e) => setCurrentDebt(Number(e.target.value))}
                  className="text-lg"
                />
                <p className="text-sm text-gray-500 mt-1">Include all credit card balances</p>
              </div>

              <div>
                <Label htmlFor="monthly-payment">Monthly Payment Capacity</Label>
                <Input
                  id="monthly-payment"
                  type="number"
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                  className="text-lg"
                />
                <p className="text-sm text-gray-500 mt-1">How much can you pay toward debt monthly?</p>
              </div>

              <div>
                <Label htmlFor="credit-history">Length of Credit History</Label>
                <Select value={creditHistory} onValueChange={setCreditHistory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">Less than 1 year</SelectItem>
                    <SelectItem value="1-2">1-2 years</SelectItem>
                    <SelectItem value="2-5">2-5 years</SelectItem>
                    <SelectItem value="5+">5+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={() => setShowPlan(true)} className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                <Target className="mr-2 h-5 w-5" />
                Create My Improvement Plan
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {showPlan && plan ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Improvement Plan</CardTitle>
                  <CardDescription>Customized strategy to reach your goals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{plan.timeframe}</div>
                      <div className="text-gray-600">Estimated Timeline</div>
                    </div>
                  </div>

                  {plan.pointsNeeded > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{plan.pointsNeeded}</div>
                        <div className="text-gray-600">Points Needed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          ${plan.potentialSavings.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                        </div>
                        <div className="text-gray-600">Potential Savings</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {plan.pointsNeeded <= 0 && (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-green-800 mb-2">Congratulations!</h3>
                    <p className="text-green-700">
                      You're already in your target credit score range. Focus on maintaining good credit habits.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Ready to Get Started?</h3>
                <p className="text-gray-500">
                  Fill out your credit profile on the left to generate your personalized improvement plan.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Improvement Strategies */}
        {showPlan && plan && plan.strategies.length > 0 && (
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Your Action Plan</CardTitle>
              <CardDescription>Prioritized strategies to improve your credit score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {plan.strategies.map((strategy, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-4 ${
                            strategy.priority === 1
                              ? "bg-red-500"
                              : strategy.priority === 2
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                        >
                          {strategy.priority}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{strategy.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span
                              className={`px-2 py-1 rounded ${
                                strategy.impact === "High"
                                  ? "bg-red-100 text-red-700"
                                  : strategy.impact === "Medium"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-green-100 text-green-700"
                              }`}
                            >
                              {strategy.impact} Impact
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {strategy.timeframe}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{strategy.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Timeline Milestones */}
        {showPlan && plan && plan.milestones.length > 0 && (
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Your Progress Timeline</CardTitle>
              <CardDescription>Expected milestones on your credit improvement journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {plan.milestones.map((milestone, index) => (
                  <div key={index} className="relative">
                    {index < plan.milestones.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-16 bg-blue-200"></div>
                    )}
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-6">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 mr-4">{milestone.timeframe}</h3>
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                            {milestone.points}
                          </span>
                        </div>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {milestone.actions.map((action, actionIndex) => (
                            <li key={actionIndex}>{action}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Educational Content */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Credit Score Factors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Payment History</span>
                  <span className="font-semibold text-blue-600">35%</span>
                </div>
                <Progress value={35} className="h-2" />

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Credit Utilization</span>
                  <span className="font-semibold text-blue-600">30%</span>
                </div>
                <Progress value={30} className="h-2" />

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Length of History</span>
                  <span className="font-semibold text-blue-600">15%</span>
                </div>
                <Progress value={15} className="h-2" />

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Credit Mix</span>
                  <span className="font-semibold text-blue-600">10%</span>
                </div>
                <Progress value={10} className="h-2" />

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">New Credit</span>
                  <span className="font-semibold text-blue-600">10%</span>
                </div>
                <Progress value={10} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Credit Mistakes to Avoid</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Making Only Minimum Payments</h4>
                    <p className="text-sm text-gray-600">Keeps balances high and utilization ratios poor</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Closing Old Credit Cards</h4>
                    <p className="text-sm text-gray-600">Reduces available credit and shortens credit history</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Applying for Multiple Cards</h4>
                    <p className="text-sm text-gray-600">Multiple hard inquiries can lower your score</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Ignoring Credit Reports</h4>
                    <p className="text-sm text-gray-600">Errors can drag down your score for years</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Maxing Out Credit Cards</h4>
                    <p className="text-sm text-gray-600">High utilization severely impacts your score</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="mt-12 bg-blue-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Credit Journey?</h2>
            <p className="text-xl text-blue-100 mb-6">
              Get your free credit improvement report with detailed strategies and start saving money today.
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
                See Full Impact Analysis
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
