/* MindSky lessons: india */
LESSONS.push(
/* ==================== INDIA: GEOGRAPHY & HISTORY ==================== */
  {
    id:"physical-features",
    subject:"india",
    pos:{ top:90, left:"46%" },
    label:"Physical Features",
    chapter:"ATLAS ENTRY 01 • THE LAND ITSELF",
    title:"Physical Features of India",
    hook:"Walk from Kanyakumari to the Nepal border and you'd cross a beach, a dry plateau, a river-fed plain, and finally a wall of snow taller than clouds — all in one country. Why is India shaped like four completely different worlds stitched together?",
    sections:[
      { title:"The Himalayas — A Young, Rising Wall", body:"In the far north, the Himalayas form the highest mountain range on Earth, including Mount Everest. They aren't ancient and worn down — they're geologically young, still being pushed upward as the Indian tectonic plate slowly rams into Asia. They also act as a barrier, blocking cold Central Asian winds from reaching the plains below." },
      { title:"The Northern Plains", body:"South of the mountains lies a vast, flat stretch built by rivers — the Indus, Ganga, and Brahmaputra — carrying silt down from the Himalayas for millions of years and dropping it here. This makes the Northern Plains some of the most fertile farmland on the planet, and the most densely populated region of the country." },
      { title:"The Deccan Plateau", body:"South of the plains, the land rises again into the Deccan Plateau — a huge tableland of old, hard rock flanked by the Western and Eastern Ghats. Unlike the young Himalayas, this plateau is part of one of the oldest and most stable landmasses on Earth." },
      { title:"The Coastal Plains", body:"Finally, narrow strips of low, flat land hug the coastline on both the west and east sides of the peninsula before the land meets the sea — shaped over time by rivers reaching the ocean and by the waves themselves." }
    ],
    sim:{
      type:"physicalfeatures",
      canvasId:"physicalCanvas",
      title:"Experiment: Cross India, North to South",
      width:700, height:300,
      controls:[
        { id:"positionInput", label:"Position (North → South)", min:0, max:100, value:15 }
      ],
      readout:{ id:"physicalRead", label:"You are standing in" }
    },
    mentalPicture:[
      "A young, rising wall of snow in the far north — the Himalayas",
      "Rivers pour down and build a flat, fertile plain",
      "Further south, an ancient, hard plateau rises again",
      "<strong>India is four landscapes in one, laid out from mountain to sea</strong>"
    ],
    quiz:[
      { q:"Why are the Himalayas still growing taller?", options:[
        {t:"Because of heavy rainfall erosion"},
        {t:"Because the Indian tectonic plate is still pushing into Asia", c:true},
        {t:"They aren't — they're shrinking"} ] },
      { q:"Why are the Northern Plains so fertile?", options:[
        {t:"Rivers have deposited silt there for millions of years", c:true},
        {t:"The plateau rock underneath is unusually rich"},
        {t:"They receive no rainfall, which preserves the soil"} ] },
      { q:"Compared to the Himalayas, the Deccan Plateau is:", options:[
        {t:"Younger and still rising"},
        {t:"Part of one of the oldest, most stable landmasses on Earth", c:true},
        {t:"Entirely underwater"} ] }
    ]
  },
  {
    id:"rivers",
    subject:"india",
    pos:{ top:250, left:"14%" },
    label:"Rivers",
    chapter:"ATLAS ENTRY 02 • THE LIFELINES",
    title:"Rivers of India",
    hook:"Some Indian rivers still flow strong in the middle of a bone-dry summer. Others shrink to a trickle. Both are called \"rivers,\" but they're born in completely different ways.",
    sections:[
      { title:"Himalayan Rivers — Fed by Snow", body:"Rivers like the Ganga, Yamuna, and Brahmaputra begin high in the Himalayas, fed partly by melting snow and glaciers all year round. That's why they're <strong>perennial</strong> — they keep flowing even in the dry season, because the mountains keep supplying water regardless of rainfall." },
      { title:"Peninsular Rivers — Fed by Rain", body:"Rivers like the Godavari, Krishna, and Narmada rise in the Deccan Plateau, and depend almost entirely on monsoon rainfall rather than snowmelt. Many swell dramatically in the rainy season and shrink noticeably in summer — they are largely <strong>seasonal</strong>." },
      { title:"Why It Matters", body:"This single difference shapes farming, drinking water, and even where cities grew up. Ancient civilizations across the world — including India's own — took root along riverbanks, because a dependable river meant a dependable life." }
    ],
    sim:{
      type:"rivers",
      canvasId:"riversCanvas",
      title:"Experiment: Trace a River",
      width:700, height:300,
      controls:[
        { id:"riverIndex", label:"Choose a River", min:0, max:4, value:0 }
      ],
      readout:{ id:"riversRead", label:"River profile" }
    },
    mentalPicture:[
      "Snow melts high in the Himalayas, all year round",
      "That meltwater keeps Himalayan rivers flowing even in dry months",
      "Peninsular rivers instead wait for the monsoon rains",
      "<strong>Same word, \"river\" — two very different water supplies</strong>"
    ],
    quiz:[
      { q:"Why does the Ganga keep flowing even during the dry season?", options:[
        {t:"It's fed partly by Himalayan snowmelt all year round", c:true},
        {t:"It's connected to the ocean"},
        {t:"It never actually dries up anywhere in the world"} ] },
      { q:"A Peninsular river like the Godavari depends mainly on:", options:[
        {t:"Glacier melt"}, {t:"Monsoon rainfall", c:true}, {t:"Underground springs only"} ] },
      { q:"Why did many early civilizations settle along riverbanks?", options:[
        {t:"For decoration"}, {t:"A dependable water source supports farming and daily life", c:true}, {t:"Rivers were easier to cross there"} ] }
    ]
  },
  {
    id:"monsoon",
    subject:"india",
    pos:{ top:250, left:"78%" },
    label:"Monsoon",
    chapter:"ATLAS ENTRY 03 • THE BREATHING WIND",
    title:"The Indian Monsoon",
    hook:"For months, the sky over India stays dry and hot. Then one day in June, the wind flips direction entirely — and within weeks, entire regions receive most of their year's rainfall. What flips the switch?",
    sections:[
      { title:"The Summer Monsoon (June–September)", body:"As land heats up faster than the ocean each summer, hot air over India rises, and moist wind rushes in from the sea to replace it — carrying huge amounts of water vapor. This <strong>southwest monsoon</strong> brings the bulk of India's annual rainfall in just a few months." },
      { title:"The Retreating Monsoon (October–December)", body:"As the seasons turn, the pattern reverses — the wind starts blowing back out from land toward the sea, now called the <strong>northeast monsoon</strong>. It's generally drier over most of the country, though it still brings meaningful rain to India's southeastern coast." },
      { title:"Why It Matters So Much", body:"A huge share of India's farming depends on the monsoon arriving on time and in the right amount. Too little rain brings drought; too much brings floods — which is why the monsoon's arrival is watched as closely as any national event." }
    ],
    sim:{
      type:"monsoon",
      canvasId:"monsoonCanvas",
      title:"Experiment: Turn the Seasons",
      width:700, height:300,
      controls:[
        { id:"monthInput", label:"Month (1 = Jan)", min:1, max:12, value:7 }
      ],
      readout:{ id:"monsoonRead", label:"Season & wind pattern" }
    },
    mentalPicture:[
      "Summer sun heats the land faster than the sea",
      "Hot air rises over land, and moist sea wind rushes in to fill the gap",
      "That wind carries rain deep across the country",
      "<strong>Come autumn, the wind reverses and blows back out to sea</strong>"
    ],
    quiz:[
      { q:"What triggers the southwest monsoon each summer?", options:[
        {t:"Land heating faster than the ocean, drawing in moist sea wind", c:true},
        {t:"The Himalayas melting all at once"},
        {t:"A yearly ocean current reversal with no link to temperature"} ] },
      { q:"During the northeast (retreating) monsoon, the wind mainly blows:", options:[
        {t:"From the sea toward the land, everywhere"},
        {t:"From the land back out toward the sea", c:true},
        {t:"It stops blowing entirely"} ] },
      { q:"Why is the monsoon's timing so closely watched in India?", options:[
        {t:"It has no real effect on daily life"},
        {t:"A huge share of farming depends on it arriving on time and in the right amount", c:true},
        {t:"It only affects coastal cities"} ] }
    ]
  },
  {
    id:"indus-valley",
    subject:"india",
    pos:{ top:460, left:"14%" },
    label:"Indus Valley",
    chapter:"ATLAS ENTRY 04 • THE FIRST PLANNED CITIES",
    title:"The Indus Valley Civilization",
    hook:"Dig beneath a mound in Mohenjo-daro and you don't find a maze of random huts — you find straight streets crossing at right angles, and covered drains running beneath them. This was built over 4,000 years ago. Who plans a city like that, this early?",
    sections:[
      { title:"A Civilization of Planners", body:"Flourishing along the Indus River and its surroundings from around 2500 BCE, cities like Mohenjo-daro and Harappa were laid out on a grid, with baked-brick houses, public wells, and one of the world's earliest known covered drainage systems — sophistication rarely seen elsewhere at that time." },
      { title:"Trade and Everyday Life", body:"The people of the Indus Valley made standardized weights and measures, carved distinctive seals (many bearing animals and a script still not fully deciphered), and traded goods as far as Mesopotamia. Yet no grand palaces or obvious royal tombs have been found — suggesting a society that may have been governed differently from other ancient civilizations." },
      { title:"A Quiet Decline", body:"By around 1900 BCE, most of these great cities were gradually abandoned. Historians debate the causes — shifting river courses, climate change, and declining trade are all leading theories — but no single dramatic event fully explains it." }
    ],
    sim:{
      type:"indusvalley",
      canvasId:"indusCanvas",
      title:"Experiment: Plan the City",
      width:700, height:300,
      controls:[
        { id:"gridPrecision", label:"Urban Planning Level", min:1, max:10, value:8 }
      ],
      readout:{ id:"indusRead", label:"What's happening" }
    },
    mentalPicture:[
      "Streets laid out on a precise grid, crossing at right angles",
      "Baked-brick houses connected to covered drains beneath the street",
      "Standard weights used across the whole civilization",
      "<strong>A 4,000-year-old city planned with a level of order that feels startlingly modern</strong>"
    ],
    quiz:[
      { q:"What makes Indus Valley cities like Mohenjo-daro stand out to archaeologists?", options:[
        {t:"Their grid-planned streets and covered drainage systems", c:true},
        {t:"Their enormous royal palaces"},
        {t:"Records written entirely in a fully deciphered language"} ] },
      { q:"What is notably absent from Indus Valley excavations, unlike many other ancient civilizations?", options:[
        {t:"Any evidence of trade"},
        {t:"Obvious grand palaces or royal tombs", c:true},
        {t:"Any form of written seals"} ] },
      { q:"What is the leading explanation historians give for the decline of the Indus Valley cities?", options:[
        {t:"A single sudden invasion, well documented in records"},
        {t:"A mix of factors like shifting rivers and climate change, without one confirmed cause", c:true},
        {t:"They were never actually abandoned"} ] }
    ]
  },
  {
    id:"empires",
    subject:"india",
    pos:{ top:460, left:"46%" },
    label:"Empires",
    isHub:true,
    chapter:"ATLAS ENTRY 05 • THE AGE OF EMPIRES",
    title:"Empires of India",
    hook:"Over roughly two thousand years, three very different empires each managed to pull huge, diverse stretches of the subcontinent under one rule — using very different tools each time: an emperor's remorse, a golden age of learning, and a fusion of cultures. Orbiting this star are three empires — click each planet to step into its era.",
    sections:[
      { title:"Three Very Different Paths to Power", body:"The Mauryan Empire united most of the subcontinent through conquest and administration. The Gupta Empire, centuries later, is remembered less for war and more for a flowering of science, mathematics, and art. The Mughal Empire, later still, blended Central Asian, Persian, and Indian traditions into a distinct new culture. Explore each on its own planet below." }
    ],
    mentalPicture:[
      "The Mauryan Empire unites the subcontinent through conquest — then rules through reflection",
      "Centuries later, the Gupta Empire builds a golden age of learning",
      "Centuries after that, the Mughal Empire fuses cultures across a vast realm",
      "<strong>Three empires, three different ways of holding a subcontinent together</strong>"
    ],
    quiz:[
      { q:"What connects the Mauryan, Gupta, and Mughal Empires, despite their differences?", options:[
        {t:"Each one, in its own era, unified a large part of the Indian subcontinent under one rule", c:true},
        {t:"They all ruled at exactly the same time"},
        {t:"They were all founded by the same family"} ] },
      { q:"Where can you learn about each empire individually?", options:[
        {t:"By exploring each of the three planets orbiting this star", c:true},
        {t:"They can only be studied together, never separately"},
        {t:"Only in the Freedom Struggle star"} ] }
    ]
  },
  {
    id:"maurya",
    subject:"india",
    orbit:{ around:"empires", radius:75, angle:20, speed:26 },
    label:"Maurya",
    chapter:"ATLAS ENTRY 06 • THE EMPEROR WHO CHANGED AFTER WAR",
    title:"The Mauryan Empire",
    hook:"A conquering emperor wins one of the bloodiest battles of his life — and instead of celebrating, he is so shaken by the suffering he caused that he changes how he rules for the rest of his reign. That's not a legend. That's Ashoka.",
    sections:[
      { title:"Uniting the Subcontinent", body:"Founded around 321 BCE by Chandragupta Maurya, the Mauryan Empire eventually brought most of the Indian subcontinent under one administration for the first time — an enormous achievement of organization as much as conquest, with officials, roads, and a structured government reaching deep into the empire." },
      { title:"Ashoka's Turn Toward Peace", body:"Chandragupta's grandson, Ashoka, expanded the empire further through the brutal Kalinga War — but was reportedly so horrified by the resulting suffering that he turned toward Buddhism and nonviolence, and had edicts on ethics and welfare carved into pillars and rocks across the empire, some of which still stand today." }
    ],
    sim:{
      type:"maurya",
      canvasId:"mauryaCanvas",
      title:"Experiment: Track the Empire's Reach &amp; Iconic Moments",
      width:700, height:330,
      controls:[
        { id:"mauryaYear", label:"Years Since Founding (321 BCE)", min:0, max:90, value:45 }
      ],
      readout:{ id:"mauryaRead", label:"What's happening" }
    },
    mentalPicture:[
      "Chandragupta Maurya unites scattered kingdoms into one empire",
      "His grandson Ashoka expands it further, through a brutal war",
      "Horrified by the suffering, Ashoka turns to nonviolence",
      "<strong>He carves lessons in ethics into stone for an empire to read</strong>"
    ],
    quiz:[
      { q:"What was unusual about Ashoka's response to winning the Kalinga War?", options:[
        {t:"He was so disturbed by the suffering that he turned toward nonviolence", c:true},
        {t:"He immediately declared more wars"},
        {t:"He ignored the outcome entirely"} ] },
      { q:"How did Ashoka spread his messages about ethics and welfare?", options:[
        {t:"Only through spoken sermons"},
        {t:"By carving edicts into pillars and rocks across the empire", c:true},
        {t:"He never recorded them anywhere"} ] }
    ]
  },
  {
    id:"gupta",
    subject:"india",
    orbit:{ around:"empires", radius:105, angle:150, speed:32 },
    label:"Gupta",
    chapter:"ATLAS ENTRY 07 • A GOLDEN AGE OF IDEAS",
    title:"The Gupta Empire",
    hook:"While much of the world was in turmoil, scholars under one Indian empire were calculating the value of pi, describing a concept of zero as a number, and tracking the movements of planets — centuries ahead of much of the rest of the world.",
    sections:[
      { title:"Stability That Let Ideas Flourish", body:"Rising around 320 CE, the Gupta Empire brought a long stretch of relative peace and stability to northern India — and that stability became fertile ground for extraordinary achievements in mathematics, astronomy, medicine, and the arts." },
      { title:"Breakthroughs That Shaped the World", body:"Gupta-era mathematicians and astronomers, including Aryabhata, made major advances — refining the concept of zero as a number in its own right, calculating pi to a remarkable accuracy, and proposing that the Earth rotates on its axis. Many of these ideas later traveled through the Islamic world into Europe, quietly shaping global science for centuries afterward." }
    ],
    sim:{
      type:"gupta",
      canvasId:"guptaCanvas",
      title:"Experiment: Track the Empire's Reach &amp; Iconic Moments",
      width:700, height:330,
      controls:[
        { id:"guptaYear", label:"Years Since Founding (320 CE)", min:0, max:150, value:60 }
      ],
      readout:{ id:"guptaRead", label:"What's happening" }
    },
    mentalPicture:[
      "A long stretch of peace and stability settles over northern India",
      "Scholars use that calm to push mathematics and astronomy forward",
      "Zero, pi, and planetary motion are studied with new precision",
      "<strong>Ideas born in this era travel outward and quietly shape science worldwide</strong>"
    ],
    quiz:[
      { q:"What made the Gupta era especially favorable for scientific and artistic achievement?", options:[
        {t:"A long period of relative peace and stability", c:true},
        {t:"Constant warfare that forced rapid innovation"},
        {t:"Total isolation from the rest of the world"} ] },
      { q:"Which of these is a Gupta-era mathematical and astronomical achievement?", options:[
        {t:"Refining the concept of zero and calculating pi with remarkable accuracy", c:true},
        {t:"Inventing the printing press"},
        {t:"Mapping the surface of the Moon by telescope"} ] }
    ]
  },
  {
    id:"mughal",
    subject:"india",
    orbit:{ around:"empires", radius:75, angle:270, speed:28 },
    label:"Mughal",
    chapter:"ATLAS ENTRY 08 • A FUSION OF WORLDS",
    title:"The Mughal Empire",
    hook:"Picture a court where Persian poetry, Central Asian horsemanship, and Indian artistry all sat at the same table — and produced a building so refined it's still called one of the most beautiful structures ever built. That table was the Mughal court.",
    sections:[
      { title:"A New Empire, A Blended Culture", body:"Founded in 1526 by Babur, a descendant of both Timur and Genghis Khan, the Mughal Empire grew to control most of the Indian subcontinent at its height. Rather than simply ruling over India, the Mughals fused Persian, Central Asian, and Indian traditions into a distinctive new culture in art, language, cuisine, and architecture." },
      { title:"Monuments That Still Stand", body:"Emperor Shah Jahan commissioned the Taj Mahal in the 17th century as a mausoleum for his wife, Mumtaz Mahal — a building that remains one of the most recognized structures in the world. Mughal-era architecture, blending Persian domes and Indian craftsmanship, still defines the skyline of many Indian cities today." }
    ],
    sim:{
      type:"mughal",
      canvasId:"mughalCanvas",
      title:"Experiment: Track the Empire's Reach &amp; Iconic Moments",
      width:700, height:330,
      controls:[
        { id:"mughalYear", label:"Years Since Founding (1526 CE)", min:0, max:180, value:110 }
      ],
      readout:{ id:"mughalRead", label:"What's happening" }
    },
    mentalPicture:[
      "Babur arrives from Central Asia and founds a new empire in 1526",
      "Persian, Central Asian, and Indian traditions blend together at court",
      "That fusion shapes language, art, and architecture across the subcontinent",
      "<strong>Shah Jahan turns that fusion into stone — the Taj Mahal</strong>"
    ],
    quiz:[
      { q:"What made Mughal culture distinctive, rather than just one culture ruling another?", options:[
        {t:"It fused Persian, Central Asian, and Indian traditions into something new", c:true},
        {t:"It rejected all outside influence entirely"},
        {t:"It copied Central Asian culture without any change"} ] },
      { q:"The Taj Mahal was built by Shah Jahan as:", options:[
        {t:"A military fort"}, {t:"A mausoleum for his wife, Mumtaz Mahal", c:true}, {t:"A royal library"} ] }
    ]
  },
  {
    id:"tamilakam",
    subject:"india",
    pos:{ top:460, left:"78%" },
    label:"Tamilakam",
    isHub:true,
    chapter:"ATLAS ENTRY 11 • THE THREE CROWNED KINGDOMS OF THE SOUTH",
    title:"Tamilakam: The Three Crowned Kingdoms",
    hook:"While empires rose and fell across the north, the far south of the subcontinent told its own story — ruled for centuries not by one empire, but by three neighboring dynasties, each with its own emblem, its own capital, and its own legend. Orbiting this star are all three — click each planet to step into its era.",
    sections:[
      { title:"The Three Crowned Kings", body:"Ancient Tamil poetry calls them the <strong>moovendar</strong> — \"the three crowned kings\": the Chera, ruling the western Malabar coast under the emblem of a bow; the Chola, ruling the fertile Kaveri delta under a tiger; and the Pandya, ruling the south around Madurai under a pair of fish. Sometimes rivals, sometimes at peace, together they shaped the Tamil-speaking world for over a thousand years. Explore each on its own planet below." }
    ],
    mentalPicture:[
      "The Chera rule the spice-rich western coast, emblem: the bow",
      "The Chola rule the fertile river delta, emblem: the tiger",
      "The Pandya rule the southern heartland, emblem: twin fish",
      "<strong>Three crowns, three emblems, one shared Tamil world</strong>"
    ],
    quiz:[
      { q:"What does Tamil tradition call the Chera, Chola, and Pandya together?", options:[
        {t:"The moovendar, \"the three crowned kings\"", c:true},
        {t:"A single unified empire"},
        {t:"Foreign invaders"} ] },
      { q:"Where can you learn about the Chera, Chola, and Pandya individually?", options:[
        {t:"By exploring each of the three planets orbiting this star", c:true},
        {t:"They can only be studied together, never separately"},
        {t:"Only in the Empires star"} ] }
    ]
  },
  {
    id:"chera",
    subject:"india",
    orbit:{ around:"tamilakam", radius:75, angle:15, speed:25 },
    label:"Chera",
    chapter:"ATLAS ENTRY 12 • THE SPICE COAST",
    title:"The Chera Dynasty",
    hook:"Roman ships once sailed all the way to India's southwestern coast chasing a single ingredient — a berry so valuable it was sometimes weighed against gold. The kingdom that grew rich from it left behind few grand ruins, but its trade reshaped economies an ocean away.",
    sections:[
      { title:"Rulers of the Malabar Coast", body:"The Chera controlled the region roughly matching today's Kerala and part of western Tamil Nadu, including key ports like Muziris and Tyndis. Their real wealth wasn't conquest — it was geography: control of the coast where Indian Ocean trade winds naturally delivered ships from across the ancient world." },
      { title:"A Kingdom Known Abroad", body:"Chera ports appear not only in Tamil Sangam poetry but in Greek and Roman writing too — the geographer Pliny the Elder and the sailing guide known as the Periplus of the Erythraean Sea both describe the pepper, gems, and spices flowing out of this coast toward the Mediterranean." }
    ],
    sim:{
      type:"chera",
      canvasId:"cheraCanvas",
      title:"Experiment: Kings, Ports &amp; the Kingdom's Eclipse",
      width:700, height:360,
      controls:[
        { id:"cheraYear", label:"Years Since c. 300 BCE", min:0, max:600, value:250 }
      ],
      readout:{ id:"cheraRead", label:"What's happening" }
    },
    mentalPicture:[
      "The Chera hold the western coast and its natural harbors",
      "Ships from Rome and Greece arrive on the monsoon winds",
      "Pepper and spices flow out; gold and wine flow in",
      "<strong>A coastline's geography alone builds a kingdom's fortune</strong>"
    ],
    quiz:[
      { q:"What was the real source of Chera wealth?", options:[
        {t:"Large-scale conquest of neighboring kingdoms"},
        {t:"Control of coastal ports along a major Indian Ocean trade route", c:true},
        {t:"Gold mines in the interior"} ] },
      { q:"Which of these describes evidence of Chera trade reaching the ancient Mediterranean?", options:[
        {t:"Greek and Roman writings describing pepper and spices from the coast", c:true},
        {t:"Chera coins found in Britain"},
        {t:"There is no outside evidence of Chera trade"} ] }
    ]
  },
  {
    id:"chola",
    subject:"india",
    orbit:{ around:"tamilakam", radius:105, angle:150, speed:31 },
    label:"Chola",
    chapter:"ATLAS ENTRY 13 • THE NAVAL EMPIRE",
    title:"The Chola Dynasty",
    hook:"A temple tower rises 66 metres into the sky, built from granite that had to be hauled from quarries far away — with no cranes, no modern engineering, in the 11th century. It still stands. So does the empire's reputation as the finest navy South Asia ever built.",
    sections:[
      { title:"From Regional Power to Naval Empire", body:"After centuries of decline, Vijayalaya Chola recaptured the city of Thanjavur in 848 CE and re-founded the dynasty. Over the next two centuries, his successors — especially Rajaraja I and his son Rajendra I — built the most powerful navy the region had seen, eventually launching an overseas expedition all the way to Srivijaya, in what is now Indonesia." },
      { title:"Temples as Statements of Power", body:"The Chola were prolific temple builders, and Rajaraja I's Brihadeeswarar Temple in Thanjavur was the ultimate statement — but they also left behind something quieter and just as remarkable: detailed stone inscriptions recording local village councils managing their own affairs, among the earliest evidence of organized local self-government anywhere." }
    ],
    sim:{
      type:"chola",
      canvasId:"cholaCanvas",
      title:"Experiment: Kings, Landmarks &amp; the Empire's Fall",
      width:700, height:360,
      controls:[
        { id:"cholaYear", label:"Years Since Founding (848 CE)", min:0, max:431, value:150 }
      ],
      readout:{ id:"cholaRead", label:"What's happening" }
    },
    mentalPicture:[
      "Vijayalaya recaptures Thanjavur and re-founds the dynasty",
      "Rajaraja and Rajendra build a navy unmatched in the region",
      "That navy carries Chola influence all the way to Southeast Asia",
      "<strong>A granite tower in Thanjavur still marks the empire's peak</strong>"
    ],
    quiz:[
      { q:"What made the Chola military notable compared to most other regional powers of the time?", options:[
        {t:"They relied entirely on foreign mercenaries"},
        {t:"They built a powerful navy capable of overseas expeditions", c:true},
        {t:"They never engaged in any warfare"} ] },
      { q:"What do Chola-era village council inscriptions provide early evidence of?", options:[
        {t:"Organized local self-government", c:true},
        {t:"The invention of paper currency"},
        {t:"A ban on all local governance"} ] }
    ]
  },
  {
    id:"pandya",
    subject:"india",
    orbit:{ around:"tamilakam", radius:75, angle:275, speed:27 },
    label:"Pandya",
    chapter:"ATLAS ENTRY 14 • THE CITY OF PEARLS",
    title:"The Pandya Dynasty",
    hook:"A Venetian traveler, thousands of kilometers from home, writes home about pearls so fine that merchants sail from distant ports just to buy them. He isn't describing a legend — he's describing a real 13th-century kingdom he actually visited.",
    sections:[
      { title:"The Fish Emblem of the South", body:"The Pandya ruled the region around Madurai, in the far south of Tamil Nadu, under the emblem of twin fish. After a long earlier history stretching back to the Sangam age, the dynasty saw a major revival starting in 1251 CE under Jatavarman Sundara Pandyan I, who expanded Pandya territory to its greatest extent." },
      { title:"A Legendary Center of Learning", body:"Madurai is traditionally remembered as the seat of the Sangam academies — legendary gatherings of poets said to have shaped early Tamil literature. The Pandya coast was also famous for its pearl fisheries in the Gulf of Mannar, which drew traders from across the medieval world, including the Venetian traveler Marco Polo, who visited in 1293 CE." }
    ],
    sim:{
      type:"pandya",
      canvasId:"pandyaCanvas",
      title:"Experiment: Kings, Madurai &amp; the Kingdom's Fall",
      width:700, height:360,
      controls:[
        { id:"pandyaYear", label:"Years Since 1251 CE", min:0, max:100, value:50 }
      ],
      readout:{ id:"pandyaRead", label:"What's happening" }
    },
    mentalPicture:[
      "Jatavarman Sundara Pandyan I revives the dynasty in 1251",
      "Madurai flourishes as a center of trade and Tamil learning",
      "Pearl fisheries on the coast draw traders from distant lands",
      "<strong>A foreign traveler's account carries the Pandya's fame back to Europe</strong>"
    ],
    quiz:[
      { q:"What is Madurai traditionally remembered as the seat of?", options:[
        {t:"The legendary Sangam academies of Tamil poetry", c:true},
        {t:"The first Mughal capital"},
        {t:"A Roman trading colony"} ] },
      { q:"Who visited the Pandya coast in 1293 CE and wrote about its pearl fisheries?", options:[
        {t:"Marco Polo", c:true}, {t:"Pliny the Elder"}, {t:"Aryabhata"} ] }
    ]
  },
  {
    id:"freedom-struggle",
    subject:"india",
    pos:{ top:640, left:"25%" },
    label:"Freedom Struggle",
    chapter:"ATLAS ENTRY 09 • THE LONG ROAD TO INDEPENDENCE",
    title:"India's Freedom Struggle",
    hook:"A man walks nearly 390 kilometers to the sea, just to pick up a handful of salt. No weapons. No violence. And it shakes an empire. How does a walk become a revolution?",
    sections:[
      { title:"Early Resistance", body:"Discontent with British colonial rule had simmered for decades, but organized political resistance grew sharply after the founding of the Indian National Congress in 1885, which gradually shifted from polite petitions to demanding self-rule." },
      { title:"Gandhi and Nonviolent Resistance", body:"Mahatma Gandhi became the movement's defining figure, championing <strong>satyagraha</strong> — nonviolent civil resistance. The 1930 Salt March, in which Gandhi and his followers walked to the coast to defy the British salt tax by making their own salt, became a global symbol of peaceful defiance." },
      { title:"The Final Push and Independence", body:"The 1942 Quit India Movement demanded an immediate end to British rule. After years of mounting pressure, negotiation, and sacrifice, India finally gained independence on August 15, 1947 — though it came alongside the difficult and painful partition of the subcontinent into India and Pakistan." }
    ],
    sim:{
      type:"freedomtimeline",
      canvasId:"freedomCanvas",
      title:"Experiment: Walk the Timeline &amp; Iconic Moments",
      width:700, height:280,
      controls:[
        { id:"freedomYear", label:"Year", min:1857, max:1947, value:1930 }
      ],
      readout:{ id:"freedomRead", label:"Nearest major event" }
    },
    gallery:{
      type:"freedomfighters",
      canvasId:"fightersCanvas",
      title:"Faces of the Movement",
      width:700, height:300,
      controls:[
        { id:"fighterIndex", label:"Choose a Figure", min:0, max:4, value:0 }
      ],
      readout:{ id:"fightersRead", label:"About this figure" }
    },
    mentalPicture:[
      "Decades of growing political resistance to colonial rule",
      "Gandhi turns nonviolent resistance into a mass movement",
      "A walk to the sea for salt becomes a symbol the world notices",
      "<strong>Sustained pressure, sacrifice, and negotiation finally win independence in 1947</strong>"
    ],
    quiz:[
      { q:"What was \"satyagraha,\" as championed by Gandhi?", options:[
        {t:"Armed rebellion"}, {t:"Nonviolent civil resistance", c:true}, {t:"A tax collected by the British"} ] },
      { q:"What made the 1930 Salt March so powerful as a protest?", options:[
        {t:"It was a small, private act, kept secret from the British"},
        {t:"It turned a basic, everyday injustice into a visible, peaceful act of mass defiance", c:true},
        {t:"It involved a violent confrontation with British troops"} ] },
      { q:"India gained independence in 1947 alongside:", options:[
        {t:"No major changes to its borders"},
        {t:"The difficult and painful partition into India and Pakistan", c:true},
        {t:"An immediate merger with a neighboring country"} ] }
    ]
  },
  {
    id:"republic-india",
    subject:"india",
    pos:{ top:640, left:"75%" },
    label:"Republic",
    chapter:"ATLAS ENTRY 10 • BUILDING A NEW REPUBLIC",
    title:"The Making of the Republic",
    hook:"A newly independent country of hundreds of millions of people, hundreds of languages, and deep inequality sits down to answer an enormous question: how do we govern ourselves, fairly, all together? The answer took nearly three years to write.",
    sections:[
      { title:"Drafting the Constitution", body:"After independence in 1947, a Constituent Assembly — chaired in its drafting work by Dr. B. R. Ambedkar — worked for almost three years to write the Constitution of India, which came into effect on January 26, 1950, the day now celebrated as Republic Day." },
      { title:"Separation of Powers", body:"The Constitution divides governmental power among three branches: the <strong>Legislature</strong>, which makes laws; the <strong>Executive</strong>, which carries them out; and the <strong>Judiciary</strong>, which interprets them and checks that laws and actions stay within constitutional bounds. No single branch is meant to dominate the others." },
      { title:"A Living Document", body:"The Constitution guarantees fundamental rights to every citizen and establishes India as a sovereign, socialist, secular, democratic republic. It has since been amended many times, reflecting how a huge and diverse democracy continues to adjust the rules it governs itself by." }
    ],
    sim:{
      type:"republic",
      canvasId:"republicCanvas",
      title:"Experiment: Balance the Three Pillars",
      width:700, height:300,
      controls:[
        { id:"legislativeInput", label:"Legislature Strength", min:1, max:10, value:6 },
        { id:"executiveInput", label:"Executive Strength", min:1, max:10, value:6 },
        { id:"judiciaryInput", label:"Judiciary Strength", min:1, max:10, value:6 }
      ],
      readout:{ id:"republicRead", label:"Balance of power" }
    },
    mentalPicture:[
      "A newly independent nation sits down to write its own rulebook",
      "Power is split three ways: make laws, carry them out, interpret them",
      "No one pillar is allowed to grow far past the others",
      "<strong>The Constitution stands on all three pillars at once — that's the balance of a republic</strong>"
    ],
    quiz:[
      { q:"When did the Constitution of India come into effect, now celebrated as Republic Day?", options:[
        {t:"August 15, 1947"}, {t:"January 26, 1950", c:true}, {t:"January 30, 1948"} ] },
      { q:"Why does the Constitution divide power among three separate branches?", options:[
        {t:"So no single branch can dominate the others", c:true},
        {t:"To make government slower for its own sake"},
        {t:"Because only one branch is actually necessary"} ] },
      { q:"Which branch of government is responsible for interpreting laws and checking that they stay within constitutional bounds?", options:[
        {t:"The Legislature"}, {t:"The Executive"}, {t:"The Judiciary", c:true} ] }
    ]
  }
);
