import { Nav } from '@/components/nav';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
            <h1 className="font-headline text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Trend Seer
            </h1>
            <Nav />
        </div>
      </header>
      <main>
        {children}
      </main>
    </>
  );
}
