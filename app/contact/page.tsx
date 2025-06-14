import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Mail className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about credit scores, interest rates, or financial planning? We're here to help you make
            informed decisions about your financial future.
          </p>
        </div>

        {/* About Section */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About "The Prepared You" Model</h2>
              <div className="prose prose-lg text-gray-700">
                <p className="mb-4">
                  We are passionate about helping people become more prepared for all stages of life through financial
                  education and smart planning. As part of "The Prepared You" model, we believe that understanding how
                  your credit score impacts your financial life is one of the most important steps you can take toward
                  financial security and independence.
                </p>
                <p>
                  Whether you're just starting your financial journey, planning for a major purchase like a home or car,
                  or looking to optimize your existing credit profile, we're here to provide you with the tools,
                  calculators, and knowledge you need to make informed decisions. Our mission is to empower you with the
                  information that can save you thousands of dollars and help you build a stronger financial future.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>We'd love to hear from you and help with your financial questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">JohnDavinBiz@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">636-346-2301</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Address</h3>
                    <p className="text-gray-600">
                      123 Financial St, Suite 100
                      <br />
                      City, State 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM
                      <br />
                      Saturday: 10:00 AM - 4:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About John Davin */}
            <Card>
              <CardHeader>
                <CardTitle>About John Davin</CardTitle>
                <CardDescription>Your Financial Education Partner</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  John Davin is the founder of "The Prepared You" model and is dedicated to helping individuals and
                  families achieve financial preparedness through education and smart planning strategies.
                </p>
                <p className="text-gray-600">
                  With years of experience in financial education, John understands the real impact that credit scores
                  and interest rates have on people's lives. He created InterestRateCalculators.com to provide
                  accessible tools and resources that help people make informed financial decisions.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  Have a specific question or need personalized advice? Send us a message and we'll get back to you
                  promptly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
              <CardDescription>
                Quick answers to common questions about credit scores and financial planning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">How often should I check my credit score?</h3>
                    <p className="text-gray-600 text-sm">
                      You should check your credit score at least once a month. Many banks and credit card companies
                      offer free credit score monitoring, and you can get free annual reports from
                      AnnualCreditReport.com.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      How long does it take to improve my credit score?
                    </h3>
                    <p className="text-gray-600 text-sm">
                      You can see improvements in 30-60 days with consistent effort. Significant improvements (50-100+
                      points) typically take 3-6 months of following good credit practices.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Are your calculators accurate?</h3>
                    <p className="text-gray-600 text-sm">
                      Our calculators use current market data and standard financial formulas. While actual rates may
                      vary by lender, our tools provide realistic estimates to help you understand potential costs and
                      savings.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">What's the fastest way to improve my credit?</h3>
                    <p className="text-gray-600 text-sm">
                      Pay down credit card balances to below 10% of limits, ensure all bills are paid on time, and check
                      your credit report for errors to dispute. These actions can show results within 30-60 days.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Do you offer personalized financial advice?</h3>
                    <p className="text-gray-600 text-sm">
                      While our website provides educational tools and resources, for personalized financial advice,
                      please contact us directly. We're happy to discuss your specific situation and provide guidance.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Is my information secure?</h3>
                    <p className="text-gray-600 text-sm">
                      Yes, we take privacy seriously. We never share or sell your personal information. Any data you
                      enter into our calculators is processed securely and not stored on our servers.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-blue-600 text-white">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Financial Future?</h2>
              <p className="text-xl text-blue-100 mb-6">
                Start with our free credit improvement report and discover how much you could save with better credit.
              </p>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
                <a href="/#free-report">Get Your Free Report</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
