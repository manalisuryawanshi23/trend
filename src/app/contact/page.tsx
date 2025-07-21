
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Briefcase, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter">
            Contact Us
          </h1>
          <p className="mt-4 text-md md:text-lg text-muted-foreground">
            We&apos;d love to hear from you. Here&apos;s how you can get in touch.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Mail className="text-primary"/>General Inquiries</CardTitle>
                    <CardDescription>For general questions, feedback, or support.</CardDescription>
                </CardHeader>
                <CardContent>
                    <a href="mailto:support@uptrendfinder.com" className="font-semibold text-primary hover:underline">
                        support@uptrendfinder.com
                    </a>
                    <p className="text-sm text-muted-foreground mt-2">We typically respond within 1-2 business days.</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Briefcase className="text-primary"/>Business & Partnerships</CardTitle>
                    <CardDescription>For business proposals and collaborations.</CardDescription>
                </CardHeader>
                <CardContent>
                    <a href="mailto:partnerships@uptrendfinder.com" className="font-semibold text-primary hover:underline">
                        partnerships@uptrendfinder.com
                    </a>
                </CardContent>
            </Card>
        </div>

        <div className="text-center mt-16">
            <h3 className="font-headline text-2xl font-semibold">Social Media</h3>
            <p className="text-muted-foreground mt-2 mb-4">Follow us for the latest trends and updates!</p>
            <div className="flex justify-center gap-4">
                {/* Add social media links here when available */}
                <p className="text-sm text-muted-foreground">(Social media links coming soon)</p>
            </div>
        </div>
      </div>
    </div>
  );
}
