"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Mail, CheckCircle, AlertCircle } from "lucide-react"
import { submitCreditReportForm } from "@/app/actions/credit-report"

export function CreditReportForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; userEmailSent?: boolean; message?: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    try {
      const response = await submitCreditReportForm(formData)
      if (response.success) {
        setResult(response)
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setResult({ success: false, message: "There was an error processing your request. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted && result?.success) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6 text-center">
          <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-green-800 mb-2">Request Received Successfully!</h3>
          <p className="text-green-700 mb-4">
            {result.userEmailSent
              ? "Your free credit improvement report has been sent to your email address. Check your inbox (and spam folder) for the download link."
              : "We've received your request for the free credit improvement report. We'll follow up with you shortly via email with your personalized report."}
          </p>
          {!result.userEmailSent && (
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 mb-4">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-yellow-600 mr-2" />
                <p className="text-sm text-yellow-800">
                  Due to email delivery limitations, we'll send your report directly to ensure you receive it.
                </p>
              </div>
            </div>
          )}
          <p className="text-sm text-green-600">
            The report includes actionable strategies to improve your credit score and save money on loans.
          </p>
        </CardContent>
      </Card>
    )
  }

  if (result && !result.success) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-red-800 mb-2">Oops! Something went wrong</h3>
          <p className="text-red-700 mb-4">
            {result.message || "There was an error processing your request. Please try again."}
          </p>
          <Button
            onClick={() => {
              setResult(null)
              setIsSubmitted(false)
            }}
            variant="outline"
            className="border-red-300 text-red-700 hover:bg-red-100"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-gray-900">Get Your Free Report</CardTitle>
        <CardDescription className="text-gray-600">
          Enter your details below to receive your personalized credit improvement guide
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-gray-700">
              Full Name
            </Label>
            <Input id="name" name="name" type="text" required placeholder="Enter your full name" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="email" className="text-gray-700">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email address"
              className="mt-1"
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3" disabled={isLoading}>
            {isLoading ? (
              <>
                <Mail className="mr-2 h-4 w-4 animate-spin" />
                Processing Request...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Get My Free Report
              </>
            )}
          </Button>
          <p className="text-xs text-gray-500 text-center">
            We respect your privacy. Your information will never be shared or sold.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
