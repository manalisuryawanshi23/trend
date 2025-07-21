
export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter">
            Terms and Conditions
          </h1>
          <p className="mt-4 text-md md:text-lg text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </header>

        <article className="prose prose-lg dark:prose-invert mx-auto space-y-4">
          <p>
            Welcome to Up Trend Finder. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website, we assume you accept these terms and conditions. Do not continue to use Up Trend Finder if you do not agree to all of the terms and conditions stated on this page.
          </p>

          <h2 className="font-headline text-2xl font-semibold">1. License to Use Website</h2>
          <p>
            Unless otherwise stated, Up Trend Finder and/or its licensors own the intellectual property rights for all material on Up Trend Finder. All intellectual property rights are reserved. You may access this from Up Trend Finder for your own personal use subjected to restrictions set in these terms and conditions.
          </p>
          <p>You must not:</p>
          <ul>
            <li>Republish material from Up Trend Finder</li>
            <li>Sell, rent, or sub-license material from Up Trend Finder</li>
            <li>Reproduce, duplicate or copy material from Up Trend Finder</li>
            <li>Redistribute content from Up Trend Finder</li>
          </ul>

          <h2 className="font-headline text-2xl font-semibold">2. User Accounts</h2>
          <p>
            When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
          </p>

          <h2 className="font-headline text-2xl font-semibold">3. Limitation of Liability</h2>
          <p>
            The information and tools on Up Trend Finder are provided on an &quot;as is&quot; basis. In no event shall Up Trend Finder, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Website. The insights and data provided are for informational purposes only and not a guarantee of virality or success.
          </p>

          <h2 className="font-headline text-2xl font-semibold">4. Governing Law</h2>
          <p>
            These Terms will be governed by and interpreted in accordance with the laws of the jurisdiction in which the company is based, without regard to its conflict of law provisions.
          </p>

          <h2 className="font-headline text-2xl font-semibold">5. Changes to These Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>

          <h2 className="font-headline text-2xl font-semibold">Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at legal@uptrendfinder.com.
          </p>
        </article>
      </div>
    </div>
  );
}
