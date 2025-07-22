
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Your privacy is important to us. Read the Up Trend Finder privacy policy to learn how we collect, use, and protect your personal information and data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter">
            Privacy Policy
          </h1>
          <p className="mt-4 text-md md:text-lg text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </header>

        <article className="prose prose-lg dark:prose-invert mx-auto space-y-4">
          <p>
            Up Trend Finder (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
          </p>

          <h2 className="font-headline text-2xl font-semibold">1. Information We Collect</h2>
          <p>
            We may collect information about you in a variety of ways. The information we may collect on the Site includes:
          </p>
          <ul>
            <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. This may include your email address and name when you create an account or contact us.</li>
            <li><strong>Usage Data:</strong> We may automatically collect information that your browser sends whenever you visit our Service. This Usage Data may include information such as your computer&apos;s Internet Protocol (IP) address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data.</li>
            <li><strong>Tracking & Cookies Data:</strong> We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</li>
          </ul>

          <h2 className="font-headline text-2xl font-semibold">2. Use of Your Information</h2>
          <p>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
          </p>
          <ul>
            <li>Create and manage your account.</li>
            <li>Improve our website and services.</li>
            <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
            <li>Respond to your comments and questions and provide customer service.</li>
          </ul>

          <h2 className="font-headline text-2xl font-semibold">3. Third-Party Services</h2>
          <p>
            We may use third-party services for purposes such as analytics or advertising. These services have their own privacy policies.
          </p>
          <ul>
            <li><strong>Google AdSense & DoubleClick Cookie:</strong> We may use Google AdSense to serve advertisements on our website. Google, as a third-party vendor, uses cookies to serve ads based on a user&apos;s prior visits to our website or other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our Service or other sites on the Internet. Users may opt out of personalized advertising by visiting the Ads Settings page from Google.</li>
          </ul>

          <h2 className="font-headline text-2xl font-semibold">4. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>

          <h2 className="font-headline text-2xl font-semibold">5. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>

          <h2 className="font-headline text-2xl font-semibold">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@uptrendfinder.com.
          </p>
        </article>
      </div>
    </div>
  );
}
