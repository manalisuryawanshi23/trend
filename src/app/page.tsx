import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/trends');
  return null;
}
