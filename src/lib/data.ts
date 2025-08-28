
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
        "name": "Dance",
        "microNiches": [
            "Choreography",
            "Dance covers",
            "Trending songs",
            "Freestyle dance",
            "Classical dance",
            "Dance tutorials",
            "Dance challenges",
            "Regional dances",
            "Group dance reels"
        ]
    },
    {
        "name": "Lip Sync & Dialogue",
        "microNiches": [
            "Movie scenes",
            "Comedy dialogues",
            "Emotional dialogues",
            "Trending voiceovers",
            "TV serials mimicry",
            "Reel remixes"
        ]
    },
    {
        "name": "Comedy/Skits",
        "microNiches": [
            "Situational humor",
            "Parody content",
            "Relatable daily life",
            "Office comedy",
            "School/College humor",
            "Regional comedy",
            "Stand-up clips",
            "Meme-style skits"
        ]
    },
    {
        "name": "Art & Craft",
        "microNiches": [
            "DIY crafts",
            "Recycled art",
            "Drawing tutorials",
            "Painting timelapse",
            "Clay art",
            "Sketching",
            "Resin art",
            "Origami",
            "Calligraphy",
            "Paper crafts"
        ]
    },
    {
        "name": "Makeup & Beauty",
        "microNiches": [
            "Daily makeup looks",
            "Bridal makeup",
            "Before-after transformations",
            "Product reviews",
            "Get ready with me (GRWM)",
            "Skincare routines",
            "Eye makeup tutorials",
            "Lipstick swatches"
        ]
    },
    {
        "name": "Fashion & Styling",
        "microNiches": [
            "OOTD (Outfit of the day)",
            "Styling tips",
            "Wardrobe hacks",
            "Outfit transitions",
            "Fashion hacks",
            "Accessories styling",
            "Traditional wear looks",
            "Thrifted fashion"
        ]
    },
    {
        "name": "Photography/Videography",
        "microNiches": [
            "Photo editing tricks",
            "Mobile photography tips",
            "Behind the scenes (BTS)",
            "Reel transitions",
            "Cinematic shots",
            "Creative angles",
            "Lightroom/VSCO tips"
        ]
    },
    {
        "name": "Home Decor",
        "microNiches": [
            "Room makeover",
            "Home DIYs",
            "Budget decor tips",
            "Aesthetic setups",
            "Organizing hacks",
            "Wall art",
            "IKEA hacks",
            "Interior styling"
        ]
    },
    {
        "name": "Motivational/Quotes",
        "microNiches": [
            "Success quotes",
            "Morning affirmations",
            "Entrepreneur motivation",
            "Life advice",
            "Self-growth",
            "Audio + caption reels",
            "Mindset reels"
        ]
    },
    {
        "name": "Book Reviews",
        "microNiches": [
            "Book summaries",
            "Top 5 book lists",
            "Reading hacks",
            "Book quotes",
            "Book vs Movie",
            "Favorite books by genre"
        ]
    },
    {
        "name": "Facts & Curiosities",
        "microNiches": [
            "History facts",
            "Space exploration",
            "Tech facts",
            "Unbelievable world facts",
            "Health myths",
            "Did-you-know series",
            "Human body facts"
        ]
    },
    {
        "name": "Language Learning",
        "microNiches": [
            "English grammar",
            "Spoken English tips",
            "Language challenges",
            "Multilingual comparisons",
            "Word of the day",
            "Idioms and phrases",
            "Regional language basics"
        ]
    },
    {
        "name": "Life Hacks/Tips",
        "microNiches": [
            "Productivity tips",
            "Study hacks",
            "Smartphone tricks",
            "Money-saving hacks",
            "Office hacks",
            "Household hacks",
            "DIY fixes"
        ]
    },
    {
        "name": "Fitness",
        "microNiches": [
            "Home workouts",
            "Gym workouts",
            "Weight loss journey",
            "Fitness motivation",
            "Yoga + strength mix",
            "Workout challenges",
            "Equipment-free fitness"
        ]
    },
    {
        "name": "Yoga/Meditation",
        "microNiches": [
            "Morning flow",
            "Breathing techniques",
            "Guided meditations",
            "Yoga for stress",
            "Yoga poses for beginners",
            "Mindfulness tips",
            "Spiritual affirmations"
        ]
    },
    {
        "name": "Nutrition/Diet",
        "microNiches": [
            "Weight loss recipes",
            "Healthy snacks",
            "Calorie tracking",
            "Meal prep ideas",
            "Smoothie recipes",
            "Diabetic/keto-friendly meals",
            "Immunity boosting foods"
        ]
    },
    {
        "name": "Self-care/Mental Health",
        "microNiches": [
            "Mental wellness tips",
            "Journaling prompts",
            "Night routine",
            "Burnout recovery",
            "Affirmations",
            "Digital detox ideas"
        ]
    },
    {
        "name": "Travel & Exploration",
        "microNiches": [
            "Hidden places",
            "Solo travel",
            "Budget travel hacks",
            "Food while traveling",
            "Vlogs",
            "Adventure activities",
            "Cultural reels"
        ]
    },
    {
        "name": "Small Business",
        "microNiches": [
            "Order packing videos",
            "Product labeling",
            "Behind-the-scenes of business",
            "Business journey",
            "Etsy/Shopee tips",
            "Product showcase",
            "Customer reviews"
        ]
    },
    {
        "name": "Digital Marketing",
        "microNiches": [
            "Instagram growth tips",
            "SEO basics",
            "Social media strategy",
            "Paid ads hacks",
            "Content creation tools",
            "Analytics & insights"
        ]
    },
    {
        "name": "Affiliate Marketing",
        "microNiches": [
            "Amazon product finds",
            "Niche-based product lists",
            "How to use the product",
            "Commission tricks",
            "Coupon codes usage"
        ]
    },
    {
        "name": "Finance & Investment",
        "microNiches": [
            "Personal budgeting",
            "Crypto for beginners",
            "Mutual funds basics",
            "Investing tips",
            "Credit card hacks",
            "Teen finance",
            "Stock market education"
        ]
    },
    {
        "name": "E-commerce/Drop-shipping",
        "microNiches": [
            "Store design",
            "Product research tools",
            "Shopify tips",
            "Ad strategy",
            "Sourcing products",
            "Order fulfillment workflow"
        ]
    },
    {
        "name": "Cooking & Recipes",
        "microNiches": [
            "Quick snacks",
            "Indian recipes",
            "One-pot meals",
            "5-ingredient recipes",
            "Tiffin ideas",
            "International cuisines",
            "Street food at home",
            "2-minute recipes"
        ]
    },
    {
        "name": "Street Food/Reviews",
        "microNiches": [
            "Local vendor reels",
            "Unique food items",
            "Taste test reactions",
            "Hidden food gems",
            "Regional food special",
            "Food festival content"
        ]
    },
    {
        "name": "Food Art",
        "microNiches": [
            "Aesthetic plating",
            "Bento box art",
            "Cake decoration",
            "Food styling tutorials",
            "Fruit carving",
            "Smoothie art"
        ]
    },
    {
        "name": "Singing",
        "microNiches": [
            "Cover songs",
            "Duets",
            "Original songs",
            "Trending audio covers",
            "Reaction reels",
            "Regional song covers",
            "Singing challenges"
        ]
    },
    {
        "name": "Instrumental Music",
        "microNiches": [
            "Solo instrument play",
            "Music practice clips",
            "Instrumental covers",
            "Tutorials",
            "Duet with singers",
            "Classical/jazz/folk reels"
        ]
    },
    {
        "name": "Music Production",
        "microNiches": [
            "Beat making",
            "Studio tour",
            "Music equipment setup",
            "Vocal layering",
            "Sound effects",
            "Behind the scenes of a song"
        ]
    },
    {
        "name": "Tech Reviews",
        "microNiches": [
            "Smartphone reviews",
            "Gadgets unboxing",
            "Camera comparisons",
            "Budget tech",
            "Pros & cons",
            "Tech for content creators"
        ]
    },
    {
        "name": "App Tips & Tools",
        "microNiches": [
            "Top 5 apps",
            "Hidden features",
            "Productivity tools",
            "AI tools",
            "Reel/video editing apps",
            "Phone customization apps"
        ]
    },
    {
        "name": "Gaming",
        "microNiches": [
            "Gameplay highlights",
            "Funny game moments",
            "Live stream clips",
            "Gaming memes",
            "Game review reels",
            "Game comparisons"
        ]
    },
    {
        "name": "Pet Content",
        "microNiches": [
            "Cute pet moments",
            "Pet routines",
            "Pet care tips",
            "Voice-over pets",
            "Pet transformation",
            "Animal rescues",
            "Feeding time ASMR"
        ]
    },
    {
        "name": "Couple Content",
        "microNiches": [
            "Love story reels",
            "Couple challenges",
            "Pranks",
            "Travel with partner",
            "Anniversary specials",
            "Couple quotes",
            "Relationship tips"
        ]
    },
    {
        "name": "Parenting/Mom Life",
        "microNiches": [
            "Baby tips",
            "Newborn hacks",
            "Funny mom reels",
            "Growth milestone",
            "Parenting struggles",
            "Baby product reviews",
            "Daily routine with toddler"
        ]
    },
    {
        "name": "Friendship Content",
        "microNiches": [
            "Friendship pranks",
            "Emotional bond reels",
            "Best friend challenges",
            "Group college memories",
            "BFF quotes"
        ]
    },
    {
        "name": "Reel-Specific Trends",
        "microNiches": [
            "Outfit transitions",
            "Voiceover reels",
            "POV reels",
            "Text-based storytelling",
            "Trend templates",
            "Viral transitions",
            "Glow-up reels"
        ]
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
     { name: 'gemini-2.5-flash', label: 'Gemini-2.5 Flash', description: 'For complex analysis and high-quality creative content.' },
      { name: 'gemini-1.5-flash-latest', label: 'Gemini 1.5 Flash (Fast & Balanced)', description: 'Ideal for most tasks. Quick and cost-effective.' },
      { name: 'gemini-2.5-pro-preview', label: 'Gemini 2.5 Pro  (Experimental)', description: 'The latest experimental model with cutting-edge capabilities.' },
      { name: 'gemini-1.0-pro-latest', label: 'Gemini 1.0 Pro (Legacy)', description: 'A stable and reliable previous generation model.' },
  ] as const;
  

    


    