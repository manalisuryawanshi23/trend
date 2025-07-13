import { Instagram, Twitter, Facebook } from 'lucide-react';
import { TikTokIcon } from './icons/tiktok-icon';
import { YouTubeShortsIcon } from './icons/youtube-shorts-icon';

type PlatformIconProps = {
  platform: string;
  className?: string;
};

export function PlatformIcon({ platform, className = "w-6 h-6" }: PlatformIconProps) {
  // Normalize platform name to handle variations like "Reel" or "Tweet"
  const lowerCasePlatform = platform.toLowerCase();

  if (lowerCasePlatform.includes('instagram') || lowerCasePlatform.includes('reel')) {
    return <Instagram className={className} />;
  }
  if (lowerCasePlatform.includes('tiktok')) {
    return <TikTokIcon className={className} />;
  }
  if (lowerCasePlatform.includes('youtube') || lowerCasePlatform.includes('shorts')) {
    return <YouTubeShortsIcon className={className} />;
  }
  if (lowerCasePlatform.includes('twitter') || lowerCasePlatform.includes('tweet')) {
    return <Twitter className={className} />;
  }
  if (lowerCasePlatform.includes('facebook')) {
    return <Facebook className={className} />;
  }

  return null; // or a default icon
}
