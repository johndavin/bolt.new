import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Target, Shield, PiggyBank, Home, GraduationCap, Heart, Phone, Mail } from "lucide-react"
import { Navigation } from "@/components/navigation"
import Link from "next/link"

export default function FinancialPlanningPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <TrendingUp className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Financial Planning Guide</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive approach to building financial security and achieving your life goals through smart planning
            and preparation.
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-12 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Financial Planning Matters</h2>
            <div className="prose prose-lg text-gray-700">
              <p className="mb-4">
                Financial planning is more than just saving money or investing for retirement. It's about creating a
                roadmap that helps you navigate life's financial challenges and opportunities with confidence. As part
                of "The Prepared You" philosophy, we believe that proper financial planning is essential for achieving
                true financial security and peace of mind.
              </p>
              <p>
                Your credit score, which we focus on extensively through our calculators, is just one piece of a much
                larger financial puzzle. While improving your credit can save you thousands of dollars, integrating it
                into a comprehensive financial plan can help you build lasting wealth and security for you and your
                family.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* The 6 Pillars of Financial Planning */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">The 6 Pillars of Financial Planning</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <Target className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>1. Goal Setting & Budgeting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  <strong>Foundation of Success:</strong> Clear financial goals and a realistic budget are the
                  cornerstone of any successful financial plan.
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li>Define short-term (1-2 years) and long-term (5+ years) goals</li>
                  <li>Create a monthly budget that tracks income and expenses</li>
                  <li>Identify areas where you can reduce spending</li>
                  <li>Allocate funds for savings, debt repayment, and investments</li>
                  <li>Review and adjust your budget quarterly</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>2. Emergency Fund & Risk Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  <strong>Your Financial Safety Net:</strong> Protecting yourself and your family from unexpected
                  financial setbacks.
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li>Build an emergency fund covering 3-6 months of expenses</li>
                  <li>Ensure adequate health, auto, and home insurance coverage</li>
                  <li>Consider life and disability insurance for income protection</li>
                  <li>Review insurance policies annually for adequate coverage</li>
                  <li>Understand how your credit score affects insurance premiums</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>3. Debt Management & Credit Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  <strong>Maximize Your Financial Power:</strong> Strategic debt management and credit improvement can
                  save you tens of thousands of dollars.
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li>Prioritize high-interest debt elimination</li>
                  <li>Implement credit score improvement strategies</li>
                  <li>Understand the true cost of different types of debt</li>
                  <li>Use our calculators to see potential savings</li>
                  <li>Consider debt consolidation when beneficial</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <PiggyBank className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>4. Savings & Investment Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  <strong>Building Wealth Over Time:</strong> Systematic saving and smart investing are key to long-term
                  financial success.
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li>Maximize employer 401(k) matching contributions</li>
                  <li>Open and fund IRA accounts for additional retirement savings</li>
                  <li>Diversify investments based on your risk tolerance</li>
                  <li>Consider tax-advantaged savings accounts (HSA, 529 plans)</li>
                  <li>Automate savings to ensure consistency</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Home className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>5. Major Purchase Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  <strong>Smart Big-Ticket Decisions:</strong> Planning for major purchases like homes and cars can save
                  you thousands through better financing.
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li>Improve credit scores before major purchases</li>
                  <li>Save for adequate down payments (20% for homes)</li>
                  <li>Shop around for the best financing terms</li>
                  <li>Consider total cost of ownership, not just monthly payments</li>
                  <li>Time purchases strategically with your financial situation</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <GraduationCap className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>6. Education & Estate Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  <strong>Planning for the Future:</strong> Preparing for education costs and ensuring your legacy is
                  protected.
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li>Start saving early for children's education with 529 plans</li>
                  <li>Create or update your will and beneficiary designations</li>
                  <li>Consider power of attorney and healthcare directives</li>
                  <li>Review and update estate plans after major life events</li>
                  <li>Understand tax implications of different planning strategies</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Your Financial Planning Journey */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Your Financial Planning Journey: A Step-by-Step Approach</CardTitle>
            <CardDescription>
              Building financial security is a process that happens over time. Here's how to get started and stay on
              track.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Phase 1 */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Phase 1: Foundation Building (Months 1-6)</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">Immediate Actions</h4>
                    <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                      <li>Track all income and expenses for one month</li>
                      <li>Check your credit score and reports</li>
                      <li>List all debts with balances and interest rates</li>
                      <li>Open a high-yield savings account</li>
                      <li>Set up automatic bill payments</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">Goals to Achieve</h4>
                    <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                      <li>Create a realistic monthly budget</li>
                      <li>Build $1,000 starter emergency fund</li>
                      <li>Begin credit score improvement plan</li>
                      <li>Eliminate any late payment habits</li>
                      <li>Start employer 401(k) if available</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Phase 2: Debt Elimination & Building (Months 6-24)
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Focus Areas</h4>
                    <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                      <li>Aggressively pay down high-interest debt</li>
                      <li>Build emergency fund to 3-6 months expenses</li>
                      <li>Increase credit score by 50+ points</li>
                      <li>Maximize employer retirement matching</li>
                      <li>Review and optimize insurance coverage</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Milestones</h4>
                    <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                      <li>Credit card debt eliminated or significantly reduced</li>
                      <li>Credit score improved to "Good" range (670+)</li>
                      <li>Full emergency fund established</li>
                      <li>Consistent monthly savings habit</li>
                      <li>Annual financial plan review completed</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="border-l-4 border-purple-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Phase 3: Wealth Building & Optimization (Year 2+)
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-purple-700 mb-2">Advanced Strategies</h4>
                    <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                      <li>Maximize retirement account contributions</li>
                      <li>Diversify investment portfolio</li>
                      <li>Consider real estate investment</li>
                      <li>Optimize tax strategies</li>
                      <li>Plan for major purchases with excellent credit</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-700 mb-2">Long-term Goals</h4>
                    <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                      <li>Achieve "Excellent" credit score (740+)</li>
                      <li>Build substantial investment portfolio</li>
                      <li>Plan for children's education costs</li>
                      <li>Consider early retirement strategies</li>
                      <li>Establish estate planning documents</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How Credit Fits Into Your Financial Plan */}
        <Card className="mb-12 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How Credit Optimization Accelerates Your Financial Plan
            </h2>
            <div className="prose prose-lg text-gray-700">
              <p className="mb-4">
                Your credit score isn't just a number—it's a powerful financial tool that can accelerate or hinder every
                aspect of your financial plan. Here's how improving your credit score creates a ripple effect throughout
                your financial life:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="font-semibold text-orange-700 mb-3">Immediate Benefits</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>
                      <strong>Lower interest rates</strong> on all future loans
                    </li>
                    <li>
                      <strong>Reduced insurance premiums</strong> saving $900+ annually
                    </li>
                    <li>
                      <strong>No utility deposits</strong> when moving or setting up service
                    </li>
                    <li>
                      <strong>Better credit card terms</strong> with rewards and no fees
                    </li>
                    <li>
                      <strong>Increased negotiating power</strong> with lenders
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-700 mb-3">Long-term Impact</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>
                      <strong>$100,000+ savings</strong> on mortgage over 30 years
                    </li>
                    <li>
                      <strong>Faster debt elimination</strong> with lower rates
                    </li>
                    <li>
                      <strong>More money for investing</strong> due to lower borrowing costs
                    </li>
                    <li>
                      <strong>Earlier retirement</strong> through increased savings capacity
                    </li>
                    <li>
                      <strong>Greater financial flexibility</strong> for opportunities
                    </li>
                  </ul>
                </div>
              </div>

              <p className="mt-6">
                This is why we've created comprehensive calculators to show you exactly how much your credit score
                impacts your financial life. Use our tools to see your potential savings, then integrate credit
                improvement into your overall financial strategy.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Common Financial Planning Mistakes */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Common Financial Planning Mistakes to Avoid</CardTitle>
            <CardDescription>
              Learn from others' mistakes and avoid these common pitfalls that can derail your financial progress.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-red-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Not Having Clear Goals</h4>
                    <p className="text-sm text-gray-600">
                      Without specific, measurable goals, it's impossible to create an effective financial plan or track
                      progress.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-red-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Ignoring Credit Score Impact</h4>
                    <p className="text-sm text-gray-600">
                      Many people don't realize how much their credit score affects their overall financial picture and
                      miss opportunities to save thousands.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-red-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Procrastinating on Emergency Fund</h4>
                    <p className="text-sm text-gray-600">
                      Delaying emergency fund creation leaves you vulnerable to debt when unexpected expenses arise.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-red-600 font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Focusing Only on Monthly Payments</h4>
                    <p className="text-sm text-gray-600">
                      Looking at monthly payments instead of total cost leads to poor financial decisions on major
                      purchases.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-red-600 font-bold text-sm">5</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Not Maximizing Employer Benefits</h4>
                    <p className="text-sm text-gray-600">
                      Missing out on employer 401(k) matching is like leaving free money on the table.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-red-600 font-bold text-sm">6</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Inadequate Insurance Coverage</h4>
                    <p className="text-sm text-gray-600">
                      Being underinsured can wipe out years of financial progress in a single catastrophic event.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-red-600 font-bold text-sm">7</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Trying to Time the Market</h4>
                    <p className="text-sm text-gray-600">
                      Attempting to time market movements often results in buying high and selling low, hurting
                      long-term returns.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-red-600 font-bold text-sm">8</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Not Reviewing and Adjusting</h4>
                    <p className="text-sm text-gray-600">
                      Financial plans need regular review and adjustment as life circumstances and goals change.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Get Professional Help */}
        <Card className="bg-blue-600 text-white">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <Heart className="h-16 w-16 text-blue-200 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Ready to Take Your Financial Planning to the Next Level?</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                While this guide provides a solid foundation, every person's financial situation is unique. A
                personalized financial plan can help you navigate complex decisions and optimize your strategy for
                maximum success.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-blue-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">What You Get with Professional Planning:</h3>
                <ul className="space-y-2 text-blue-100">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                    Personalized analysis of your complete financial picture
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                    Custom strategies based on your specific goals and timeline
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                    Credit optimization integrated with your overall plan
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                    Tax-efficient investment and savings strategies
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                    Regular reviews and adjustments as your life changes
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                    Accountability and support to keep you on track
                  </li>
                </ul>
              </div>

              <div className="bg-blue-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Perfect for People Who:</h3>
                <ul className="space-y-2 text-blue-100">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                    Want to maximize their credit score improvements
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                    Are planning major purchases (home, car, etc.)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                    Need help prioritizing multiple financial goals
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                    Want to optimize their debt payoff strategy
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                    Are approaching major life changes (marriage, kids, retirement)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                    Feel overwhelmed by all the financial decisions they need to make
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Get Started with Your Personalized Financial Plan</h3>
              <p className="text-blue-100 mb-6">
                Contact us today to discuss how we can help you create a comprehensive financial plan that integrates
                credit optimization with your broader financial goals.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
                  <Link href="/contact">
                    <Mail className="mr-2 h-5 w-5" />
                    Contact Us Today
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700" asChild>
                  <Link href="/#free-report">Get Free Credit Report First</Link>
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center text-blue-100">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>636-346-2301</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  <span>JohnDavinBiz@gmail.com</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Continue Your Financial Education</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link href="/#calculators">Use Our Calculators</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/credit-impact">Credit Impact Analysis</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/improvement-planner">Credit Improvement Planner</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/#free-report">Free Credit Report</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
