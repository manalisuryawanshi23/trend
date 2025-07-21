
export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter">
            Disclaimer
          </h1>
          <p className="mt-4 text-md md:text-lg text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </header>

        <article className="prose prose-lg dark:prose-invert mx-auto space-y-4">
          <p>
            The information provided by Up Trend Finder (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) on our website is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
          </p>

          <h2 className="font-headline text-2xl font-semibold">No Guarantees of Success</h2>
          <p>
            The AI-powered tools, trend forecasts, post plans, and analyses provided by Up Trend Finder are based on data and algorithms that are subject to change. They are intended to be used as a guide and a tool for creative inspiration. We do not guarantee that following our suggestions will result in virality, increased followers, or any specific metric of success. Social media performance is dependent on numerous factors beyond the scope of our tools, including content quality, audience engagement, and platform algorithm changes.
          </p>
          
          <h2 className="font-headline text-2xl font-semibold">Not Professional Advice</h2>
          <p>
            The content on this website is not intended to be a substitute for professional marketing, business, or financial advice. Always seek the advice of a qualified professional with any questions you may have regarding a business decision. Reliance on any information provided by this website is solely at your own risk.
          </p>

          <h2 className="font-headline text-2xl font-semibold">External Links Disclaimer</h2>
          <p>
            The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the site.
          </p>
          
          <h2 className="font-headline text-2xl font-semibold">Affiliate Disclaimer</h2>
          <p>
            This site may contain links to affiliate websites, and we may receive an affiliate commission for any purchases made by you on the affiliate website using such links.
          </p>
        </article>
      </div>
    </div>
  );
}
