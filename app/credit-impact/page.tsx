import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, Home, Car, CreditCard, Shield, Zap, TrendingDown, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export default function CreditImpactPage() {
  const impactData = [
    {
      category: "Home Mortgage",
      icon: Home,
      excellent: { rate: "5.8%", monthly: "$1,754", total: "$331,440" },
      poor: { rate: "7.5%", monthly: "$2,098", total: "$455,280" },
      difference: "$123,840",
      description: "30-year, $300,000 mortgage",
    },
    {
      category: "Auto Loan",
      icon: Car,
      excellent: { rate: "4.5%", monthly: "$558", total: "$3,480" },
      poor: { rate: "15.9%", monthly: "$724", total: "$13,440" },
      difference: "$9,960",
      description: "5-year, $30,000 auto loan",
    },
    {
      category: "Credit Cards",
      icon: CreditCard,
      excellent: { rate: "16.9%", monthly: "No annual fee", total: "$0" },
      poor: { rate: "29.9%", monthly: "$99 annual fee", total: "$99" },
      difference: "13% higher APR + fees",
      description: "Average credit card terms",
    },
    {
      category: "Auto Insurance",
      icon: Shield,
      excellent: { rate: "Standard rate", monthly: "$125", total: "$1,500" },
      poor: { rate: "Credit penalty", monthly: "$200", total: "$2,400" },
      difference: "$900/year",
      description: "Annual premium difference",
    },
    {
      category: "Utilities",
      icon: Zap,
      excellent: { rate: "No deposit", monthly: "$0", total: "$0" },
      poor: { rate: "Security deposit", monthly: "$300-800", total: "$800" },
      difference: "$800 upfront",
      description: "Utility connection deposits",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <TrendingUp className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">The True Cost of Poor Credit</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your credit score affects nearly every aspect of your financial life. See the real impact across different
            areas of spending.
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-6 text-center">
              <TrendingDown className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-red-600 mb-2">$135,499</div>
              <div className="text-gray-700">Total extra cost with poor credit</div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-blue-600 mb-2">5 Areas</div>
              <div className="text-gray-700">Where credit scores impact costs</div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-green-600 mb-2">150+ Points</div>
              <div className="text-gray-700">Potential credit score improvement</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Impact Cards */}
        <div className="space-y-8">
          {impactData.map((item, index) => {
            const Icon = item.icon
            return (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-gray-50">
                  <div className="flex items-center">
                    <Icon className="h-8 w-8 text-blue-600 mr-3" />
                    <div>
                      <CardTitle className="text-xl">{item.category}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
                    {/* Excellent Credit */}
                    <div className="p-6 bg-green-50">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-green-800 mb-2">Excellent Credit (740+)</div>
                        <div className="space-y-2">
                          <div className="text-2xl font-bold text-green-600">{item.excellent.rate}</div>
                          <div className="text-gray-600">Monthly: {item.excellent.monthly}</div>
                          <div className="text-gray-600">Total Interest: {item.excellent.total}</div>
                        </div>
                      </div>
                    </div>

                    {/* Poor Credit */}
                    <div className="p-6 bg-red-50">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-red-800 mb-2">Poor Credit (300-579)</div>
                        <div className="space-y-2">
                          <div className="text-2xl font-bold text-red-600">{item.poor.rate}</div>
                          <div className="text-gray-600">Monthly: {item.poor.monthly}</div>
                          <div className="text-gray-600">Total Interest: {item.poor.total}</div>
                        </div>
                      </div>
                    </div>

                    {/* Difference */}
                    <div className="p-6 bg-yellow-50">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-yellow-800 mb-2">Extra Cost</div>
                        <div className="text-3xl font-bold text-yellow-600 mb-2">{item.difference}</div>
                        <div className="text-gray-600">With poor credit</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Educational Content */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Beyond Interest Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Credit scores don't just affect loan interest rates. They impact many areas of your financial life:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>
                  <strong>Employment:</strong> Some employers check credit for financial positions
                </li>
                <li>
                  <strong>Housing:</strong> Landlords often require credit checks and higher deposits
                </li>
                <li>
                  <strong>Insurance:</strong> Auto and home insurance rates can be significantly affected
                </li>
                <li>
                  <strong>Cell Phone:</strong> May require deposits for new service plans
                </li>
                <li>
                  <strong>Business Loans:</strong> Personal credit affects business loan terms and availability
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>The Compound Effect</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Poor credit creates a compound effect that can cost you hundreds of thousands over your lifetime:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Higher interest rates on all loans and credit products</li>
                <li>Larger security deposits required for utilities and rentals</li>
                <li>Limited access to the best credit products and rewards</li>
                <li>Higher insurance premiums across multiple policies</li>
                <li>Difficulty qualifying for mortgages or favorable terms</li>
                <li>Less negotiating power with lenders and service providers</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="mt-12 bg-blue-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Improve Your Credit?</h2>
            <p className="text-xl text-blue-100 mb-6">
              Small improvements in your credit score can save you thousands of dollars. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/improvement-planner"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Create Improvement Plan
              </Link>
              <Link
                href="/resources"
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
