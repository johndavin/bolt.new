"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { submitContactForm } from "@/app/actions/contact"

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message?: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    try {
      const response = await submitContactForm(formData)
      if (response.success) {
        setResult(response)
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setResult({ success: false, message: "There was an error sending your message. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted && result?.success) {
    return (
      <div className="text-center p-6 bg-green-50 border border-green-200 rounded-lg">
        <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent Successfully!</h3>
        <p className="text-green-700 mb-4">
          Thank you for contacting us. We've received your message and will get back to you within 24 hours.
        </p>
        <p className="text-sm text-green-600">
          In the meantime, feel free to explore our calculators and download your free credit improvement report.
        </p>
      </div>
    )
  }

  if (result && !result.success) {
    return (
      <div className="text-center p-6 bg-red-50 border border-red-200 rounded-lg">
        <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-red-800 mb-2">Oops! Something went wrong</h3>
        <p className="text-red-700 mb-4">
          {result.message || "There was an error sending your message. Please try again."}
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
      </div>
    )
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" name="firstName" type="text" required placeholder="Enter your first name" />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" name="lastName" type="text" required placeholder="Enter your last name" />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" name="email" type="email" required placeholder="Enter your email address" />
      </div>

      <div>
        <Label htmlFor="phone">Phone Number (Optional)</Label>
        <Input id="phone" name="phone" type="tel" placeholder="Enter your phone number" />
      </div>

      <div>
        <Label htmlFor="subject">Subject</Label>
        <Select name="subject" required>
          <SelectTrigger>
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="credit-score">Credit Score Questions</SelectItem>
            <SelectItem value="mortgage">Mortgage Interest Rates</SelectItem>
            <SelectItem value="auto-loan">Auto Loan Questions</SelectItem>
            <SelectItem value="financial-planning">Financial Planning</SelectItem>
            <SelectItem value="calculator-help">Calculator Help</SelectItem>
            <SelectItem value="partnership">Partnership Opportunities</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Tell us how we can help you..."
          className="min-h-[120px]"
        />
      </div>

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
        {isLoading ? (
          <>
            <Send className="mr-2 h-4 w-4 animate-pulse" />
            Sending Message...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        We typically respond within 24 hours. Your information is kept confidential and never shared.
      </p>
    </form>
  )
}
