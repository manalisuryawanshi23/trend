export const allPlatforms = [
    { name: 'TikTok', regions: 'global' },
    { name: 'Instagram Reels', regions: 'global' },
    { name: 'YouTube Shorts', regions: 'global' },
    { name: 'Twitter / X', regions: 'global' },
    { name: 'Facebook Reels', regions: 'global' },
    { name: 'Pinterest', regions: 'global' },
    { name: 'LinkedIn', regions: 'global' },
    { name: 'Snapchat', regions: ['United States', 'Canada', 'United Kingdom', 'Australia', 'France', 'Saudi Arabia', 'India'] },
    { name: 'VK', regions: ['Russia'] },
    { name: 'WeChat', regions: ['China'] },
    { name: 'Line', regions: ['Japan', 'Thailand', 'Taiwan', 'Indonesia'] },
    { name: 'KakaoTalk', regions: ['South Korea'] }
  ] as const;
  
  export function getPlatformsForCountry(country: string) {
      const countrySpecificPlatforms = allPlatforms.filter(p => Array.isArray(p.regions) && p.regions.includes(country));
      const globalPlatforms = allPlatforms.filter(p => p.regions === 'global');
      return [...countrySpecificPlatforms, ...globalPlatforms];
  }
  
  export const platforms = allPlatforms.map(p => p.name) as [string, ...string[]];
  
  export const userTypes = [
      "Content Creator / Influencer",
      "Small Business Owner",
      "Marketing Agency",
      "Social Media Manager",
      "E-commerce Brand",
      "Startup",
      "Local Business",
      "Personal Brand",
      "Artist / Musician",
      "Educator / Coach",
      "Non-profit",
      "Student",
      "Hobbyist",
      "Other"
  ] as const;
  
  export const niches = [
      { 
          name: 'AI & Future Tech', 
          microNiches: ['AI Tools & Reviews', 'Generative Art', 'AI News & Ethics', 'Robotics', 'Virtual & Augmented Reality', 'Future of Work', 'Prompt Engineering'] 
      },
      { 
          name: 'Automotive',
          microNiches: ['Car Reviews', 'Classic Cars', 'EVs (Electric Vehicles)', 'Car Modding / Tuning', 'Motorsports', 'Supercars', 'Off-roading & Overlanding']
      },
      { 
          name: 'Beauty', 
          microNiches: ['Skincare & Routines', 'Makeup Tutorials', 'Clean & Sustainable Beauty', 'Haircare & Styling', 'Fragrance Reviews', 'Nail Art', 'Cosplay & SFX Makeup'] 
      },
      {
        name: 'Books & Literature',
        microNiches: ['Book Reviews (#BookTok)', 'Author Interviews', 'Fantasy & Sci-Fi Books', 'Young Adult (YA)', 'Classic Literature', 'Poetry Readings', 'Book Hauls']
      },
      {
        name: 'Business & Entrepreneurship',
        microNiches: ['Startup Life & Vlogs', 'Marketing & Growth Hacks', 'Side Hustles & Passive Income', 'E-commerce Tips', 'Productivity Systems', 'Leadership Advice', 'Small Business Stories']
      },
      { 
          name: 'Comedy',
          microNiches: ['Skits & Sketches', 'Memes & Viral Sounds', 'Stand-up Clips', 'Relatable Humor', 'Parody & Satire', 'Improv', 'Character Comedy']
      },
      {
          name: 'Dance',
          microNiches: ['Dance Challenges', 'Choreography', 'Dance Tutorials', 'Specific Styles (e.g., Hip Hop, Ballet)', 'Live Performance', 'Dance History', 'Freestyle']
      },
      {
          name: 'DIY & Crafts',
          microNiches: ['Home Decor Projects', 'Woodworking', 'Knitting & Crochet', 'Upcycling & Thrifting Flips', 'Pottery & Ceramics', '3D Printing', 'Candle & Soap Making']
      },
      {
          name: 'Education',
          microNiches: ['Language Learning', 'History Facts', 'Study Tips & Hacks', 'Book Summaries', 'Math Tricks', 'Software Tutorials', 'General Knowledge']
      },
      { 
          name: 'Fashion', 
          microNiches: ['Streetwear & Sneakers', 'Luxury Fashion', 'Thrift & Vintage Hauls', 'Sustainable & Ethical Fashion', 'Plus-Size Fashion', 'Fashion History', 'DIY & Sewing'] 
      },
      { 
          name: 'Finance & Investing', 
          microNiches: ['Personal Finance & Budgeting', 'Cryptocurrency & Web3', 'Stock Market Analysis', 'Real Estate Investing', 'Side Hustles', 'FIRE Movement', 'Fintech & Robo-advising'] 
      },
      { 
          name: 'Food & Cooking', 
          microNiches: ['Quick Recipes (Under 30 mins)', 'Vegan & Plant-Based', 'Baking & Desserts', 'Gourmet & Fine Dining', 'Street Food Reviews', 'Meal Prep & Planning', 'ASMR Eating'] 
      },
      { 
          name: 'Gaming', 
          microNiches: ['Indie Game Discoveries', 'eSports & Competitive Gaming', 'Retro Gaming', 'Mobile Gaming', 'Game Development Logs', 'Let\'s Play & Walkthroughs', 'Gaming News & Rumors'] 
      },
      { 
          name: 'Health & Wellness', 
          microNiches: ['Fitness Routines & Challenges', 'Mental Health & Mindfulness', 'Nutrition & Healthy Eating', 'Yoga & Meditation', 'Biohacking', 'Sober & Mindful Drinking', 'Holistic & Alternative Health'] 
      },
      {
        name: 'Home & Garden',
        microNiches: ['Interior Design Trends', 'Gardening & Plant Care', 'Home Organization & Cleaning Hacks', 'Renovation & DIY Projects', 'House Plants', 'Sustainable Living', 'Smart Home Tech']
      },
      { 
          name: 'Movies & TV', 
          microNiches: ['Film & TV Show Analysis', 'Fan Theories', 'TV Show Reviews', 'Behind-the-Scenes Facts', 'Movie News & Trailers', 'Anime & Manga', 'K-Drama & J-Drama']
      },
      {
          name: 'Music',
          microNiches: ['Live Performance Clips', 'Music Production Tutorials', 'Song Covers', 'Artist Interviews', 'Vinyl & Record Collecting', 'Music Theory Lessons', 'New Music Discovery']
      },
      {
          name: 'Parenting',
          microNiches: ['Newborn Tips', 'Toddler Activities', 'Teen Parenting Advice', 'Family Travel', 'Montessori & Gentle Parenting', 'Homeschooling Life', 'Dad Jokes & Family Humor']
      },
      {
          name: 'Pets',
          microNiches: ['Dog Training Tips', 'Funny Cat Videos', 'Exotic Pets Care', 'Pet Product Reviews', 'Animal Rescue Stories', 'Pet Health & Nutrition', 'Obedience & Agility Training']
      },
      {
          name: 'Real Estate',
          microNiches: ['Luxury House Tours', 'Investment Properties', 'Interior Design Inspiration', 'Real Estate Market Analysis', 'First-Time Home Buying Guide', 'Tiny Homes & Alternative Living']
      },
      {
        name: 'Relationships & Dating',
        microNiches: ['Dating App Advice', 'Relationship Goals & Skits', 'Friendship & Social Life', 'Self-Love & Personal Growth', 'Storytime: Dating Disasters', 'Marriage Humor']
      },
      {
          name: 'Science & Nature',
          microNiches: ['Science Experiments', 'Nature Documentaries', 'Space & Astronomy', 'Biology & Animal Facts', 'Environmental Science', 'Cool Science Explained', 'Weather Phenomena']
      },
      {
          name: 'Sports',
          microNiches: ['Football (Soccer) Analysis', 'Basketball Highlights & Breakdowns', 'Fantasy Sports Strategy', 'Extreme Sports', 'Athlete Interviews & Documentaries', 'Sports Betting Tips', 'Calisthenics & Bodyweight Fitness']
      },
      {
        name: 'Spirituality & Mindfulness',
        microNiches: ['Astrology & Horoscopes', 'Tarot & Oracle Readings', 'Manifestation Techniques', 'Guided Meditations', 'Crystal Healing', 'Modern Witchcraft (#WitchTok)', 'Mindful Living']
      },
      { 
          name: 'Tech', 
          microNiches: ['Gadget Reviews', 'Productivity Hacks & Apps', 'Smart Home Setups', 'PC Building & Modding', 'Cybersecurity Tips', 'Web Development'] 
      },
      { 
          name: 'Travel', 
          microNiches: ['Budget Travel & Backpacking', 'Luxury & 5-Star Travel', 'Adventure & Extreme Travel', 'Cultural Immersion & Slow Travel', 'Digital Nomad Lifestyle', 'Unique Stays (AirBnb, etc.)', 'Van Life'] 
      },
      {
          name: 'ASMR',
          microNiches: ['Tapping & Scratching', 'Whispering & Soft Speaking', 'Crinkling & Packaging Sounds', 'Roleplays', 'Unintentional ASMR', 'No-talking ASMR']
      }
  ];
  
  
  export const countries = [
      "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
      "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
      "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
      "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic of the",
      "Congo, Republic of the", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
      "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
      "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
      "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
      "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos",
      "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi",
      "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova",
      "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
      "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
      "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
      "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
      "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia",
      "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan",
      "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo",
      "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
      "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen",
      "Zambia", "Zimbabwe"
    ] as const;
  
  export const aiModels = [
      { name: 'gemini-1.5-flash-latest', label: 'Gemini 1.5 Flash (Fast & Balanced)', description: 'Ideal for most tasks. Quick and cost-effective.' },
      { name: 'gemini-1.5-pro-latest', label: 'Gemini 1.5 Pro (Most Powerful)', description: 'For complex analysis and high-quality creative content.' },
      { name: 'gemini-1.0-pro-latest', label: 'Gemini 1.0 Pro (Legacy)', description: 'A stable and reliable previous generation model.' },
  ] as const;
  

    