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
          name: 'Fashion', 
          microNiches: ['Streetwear', 'Luxury Fashion', 'Thrift & Vintage', 'Sustainable Fashion', 'Plus-Size Fashion', 'Fashion History', 'DIY Fashion'] 
      },
      { 
          name: 'Beauty', 
          microNiches: ['Skincare', 'Makeup Tutorials', 'Clean Beauty', 'Haircare', 'Fragrance', 'Nail Art', 'Cosplay Makeup'] 
      },
      { 
          name: 'Food & Cooking', 
          microNiches: ['Quick Recipes', 'Vegan Cooking', 'Baking', 'Gourmet', 'Street Food Reviews', 'Meal Prep', 'ASMR Eating'] 
      },
      { 
          name: 'Health & Wellness', 
          microNiches: ['Fitness Routines', 'Mental Health', 'Nutrition', 'Yoga & Meditation', 'Biohacking', 'Sober Living', 'Holistic Health'] 
      },
      { 
          name: 'Gaming', 
          microNiches: ['Indie Games', 'eSports', 'Retro Gaming', 'Mobile Gaming', 'Game Development', 'Let\'s Play', 'Speedrunning'] 
      },
      { 
          name: 'Tech', 
          microNiches: ['AI Tools', 'Gadget Reviews', 'Productivity Hacks', 'Smart Home', 'Coding', 'Cybersecurity', 'Web3 & Crypto'] 
      },
      { 
          name: 'Travel', 
          microNiches: ['Budget Travel', 'Luxury Travel', 'Adventure Travel', 'Cultural Immersion', 'Digital Nomad Life', 'Staycations', 'Van Life'] 
      },
      { 
          name: 'Finance & Investing', 
          microNiches: ['Personal Finance', 'Cryptocurrency', 'Stock Market', 'Real Estate', 'Side Hustles', 'FIRE Movement', 'Robo-advising'] 
      },
      {
          name: 'DIY & Crafts',
          microNiches: ['Home Decor', 'Woodworking', 'Knitting & Crochet', 'Upcycling', 'Pottery', '3D Printing', 'Candle Making']
      },
      {
          name: 'Education',
          microNiches: ['Language Learning', 'Science Explainers', 'History Facts', 'Study Tips', 'Book summaries (BookTok)', 'Math Tricks', 'Philosophy']
      },
      {
          name: 'Comedy',
          microNiches: ['Skits', 'Memes', 'Stand-up clips', 'Relatable humor', 'Parody', 'Improv', 'Dark Humor']
      },
      {
          name: 'Parenting',
          microNiches: ['Newborn tips', 'Toddler activities', 'Teen parenting', 'Family travel', 'Montessori', 'Homeschooling', 'Dad Jokes']
      },
      {
          name: 'Sports',
          microNiches: ['Football analysis', 'Basketball highlights', 'Fantasy Sports', 'Extreme Sports', 'Athlete interviews', 'Sports betting', 'Calisthenics']
      },
      {
          name: 'Automotive',
          microNiches: ['Car reviews', 'Classic cars', 'EVs (Electric Vehicles)', 'Car modding', 'Motorsports', 'Supercars', 'Off-roading']
      },
      {
          name: 'Pets',
          microNiches: ['Dog training', 'Cat videos', 'Exotic pets', 'Pet care tips', 'Animal rescue stories', 'Funny pet moments']
      },
      {
          name: 'Movies & TV',
          microNiches: ['Film analysis', 'Fan theories', 'TV show reviews', 'Behind-the-scenes', 'Movie news', 'Anime', 'K-Drama']
      },
      {
          name: 'Music',
          microNiches: ['Live performance clips', 'Music production tutorials', 'Song covers', 'Artist interviews', 'Vinyl collecting', 'Music theory']
      },
      {
          name: 'Real Estate',
          microNiches: ['House tours', 'Investment properties', 'Interior design', 'Market analysis', 'First-time home buying', 'Tiny homes']
      },
      {
          name: 'ASMR',
          microNiches: ['Tapping', 'Whispering', 'Crinkling', 'Roleplays', 'Unintentional ASMR', 'No-talking ASMR']
      },
      {
        name: 'Books & Literature',
        microNiches: ['Book Reviews (#BookTok)', 'Author Interviews', 'Fantasy Books', 'Sci-Fi Books', 'Young Adult (YA)', 'Classic Literature', 'Poetry']
      },
      {
        name: 'Business & Entrepreneurship',
        microNiches: ['Startup Life', 'Marketing Tips', 'Side Hustles', 'E-commerce', 'Productivity', 'Leadership', 'Small Business']
      },
      {
        name: 'Home & Garden',
        microNiches: ['Interior Design', 'Gardening', 'Home Organization', 'Renovation & DIY', 'House Plants', 'Sustainable Living', 'Smart Home']
      },
      {
        name: 'Relationships & Dating',
        microNiches: ['Dating Advice', 'Relationship Goals', 'Friendship', 'Self-Love', 'Storytime', 'Marriage Humor']
      },
      {
        name: 'Spirituality & Mindfulness',
        microNiches: ['Astrology', 'Tarot', 'Manifestation', 'Meditation', 'Crystal Healing', 'Modern Witchcraft']
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
  