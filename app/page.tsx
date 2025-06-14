import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, Home, Car, CreditCard, Shield, Zap, TrendingUp } from "lucide-react"
import { CreditReportForm } from "@/components/credit-report-form"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Your Credit Score Could Save You <span className="text-blue-600">Thousands</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover how your credit score impacts interest rates on mortgages, auto loans, credit cards, and even
                insurance premiums. Small improvements can lead to massive savings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="#calculators">
                    <Calculator className="mr-2 h-5 w-5" />
                    Calculate Your Savings
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/credit-impact">Learn About Credit Scores</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/family-home.webp"
                alt="Happy family in their new home"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Real Cost of Poor Credit</h2>
            <p className="text-xl text-blue-100">See how credit scores affect your financial life</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">$123K+</div>
              <div className="text-blue-100">Extra paid on a 30-year mortgage with poor credit</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">$10K+</div>
              <div className="text-blue-100">Additional cost on a $30K auto loan</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">$900+</div>
              <div className="text-blue-100">Higher annual insurance premiums</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">$800+</div>
              <div className="text-blue-100">Extra utility deposits required</div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Report Section */}
      <section id="free-report" className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Get Your FREE Credit Improvement Report</h2>
              <p className="text-xl text-green-100 mb-6">
                Discover the exact steps to boost your credit score and save thousands on loans, insurance, and more.
              </p>
              <ul className="space-y-3 text-green-100">
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-3 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Step-by-step credit improvement strategies
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-3 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Timeline for seeing results
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-3 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Common mistakes to avoid
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-3 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Potential savings calculator
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-xl">
              <CreditReportForm />
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Grid */}
      <section id="calculators" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Interactive Calculators</h2>
            <p className="text-xl text-gray-600">See exactly how your credit score affects your finances</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Home className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Mortgage Calculator</CardTitle>
                <CardDescription>Compare mortgage payments across different credit scores</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <Link href="/mortgage-calculator">Calculate Mortgage Impact</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Car className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Auto Loan Calculator</CardTitle>
                <CardDescription>See how credit affects your car loan payments</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <Link href="/auto-calculator">Calculate Auto Savings</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CreditCard className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Credit Card Impact</CardTitle>
                <CardDescription>Compare credit card interest rates and fees</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <Link href="/credit-card-calculator">Compare Credit Impact</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Insurance Premium Calculator</CardTitle>
                <CardDescription>How credit scores affect insurance costs</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <Link href="/insurance-calculator">Calculate Insurance Impact</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Utility Deposit Calculator</CardTitle>
                <CardDescription>Estimate utility deposits based on credit</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <Link href="/utility-calculator">Calculate Deposits</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Credit Improvement Planner</CardTitle>
                <CardDescription>Plan your path to better credit and savings</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <Link href="/improvement-planner">Start Planning</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Educational Content */}
      <section id="resources" className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Credit Score Education</h2>
            <p className="text-xl text-gray-600">Learn how to improve your credit and save money</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Understanding Credit Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Learn what factors affect your credit score and how lenders use this information to determine your
                  interest rates.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/credit-impact">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Improving Your Credit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Discover proven strategies to boost your credit score and qualify for better interest rates on all
                  types of loans.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="#free-report">Get Started</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Create a comprehensive financial plan that includes credit improvement and debt management strategies.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/mortgage-calculator">Plan Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Calculator className="h-8 w-8 text-blue-400 mr-2" />
                <span className="text-xl font-bold">InterestRateCalculators.com</span>
              </div>
              <p className="text-gray-400">
                Helping you understand the true cost of credit and make informed financial decisions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Calculators</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/mortgage-calculator" className="hover:text-white">
                    Mortgage Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/auto-calculator" className="hover:text-white">
                    Auto Loan Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/credit-impact" className="hover:text-white">
                    Credit Impact Analysis
                  </Link>
                </li>
                <li>
                  <Link href="#free-report" className="hover:text-white">
                    Free Credit Report
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/credit-impact" className="hover:text-white">
                    Credit Score Guide
                  </Link>
                </li>
                <li>
                  <Link href="#free-report" className="hover:text-white">
                    Improvement Tips
                  </Link>
                </li>
                <li>
                  <Link href="#calculators" className="hover:text-white">
                    Financial Planning
                  </Link>
                </li>
                <li>
                  <Link href="#resources" className="hover:text-white">
                    Education Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="text-gray-400 space-y-2">
                <p>John Davin</p>
                <p>Email: JohnDavinBiz@gmail.com</p>
                <p>Phone: 636-346-2301</p>
                <p>Address: 123 Financial St, Suite 100</p>
                <p>City, State 12345</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 InterestRateCalculators.com. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
