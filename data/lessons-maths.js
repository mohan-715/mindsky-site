/* MindSky lessons: maths */
LESSONS.push(
  /* ==================== MATHEMATICS ==================== */
  {
    id:"primes",
    subject:"mathematics",
    pos:{ top:70, left:"5%" },
    label:"Factors & Primes",
    chapter:"ATLAS ENTRY 01 • THE ATOMS OF NUMBERS • GRADES 6–8",
    title:"Factors, Multiples & Primes",
    hook:"A chocolate bar has 12 squares. You can share it equally among 2, 3, 4 or 6 friends with nothing left over. But a bar with 13 squares? Only 1 friend or 13 friends works — anything else leaves crumbs. Why are some numbers so easy to split and others so stubborn?",
    sections:[
      { title:"Factors and Multiples", body:"A <strong>factor</strong> of a number divides it exactly, with nothing left over. The factors of 12 are 1, 2, 3, 4, 6 and 12. A <strong>multiple</strong> goes the other way: it is what you get by multiplying the number by 1, 2, 3, … so the multiples of 4 are 4, 8, 12, 16, … Factors are the ways to build a number; multiples are its times table.",
        formula:"a is a factor of n   ⇔   n ÷ a leaves remainder 0",
        example:"Is 7 a factor of 91? Since 7 × 13 = 91, yes. So 13 is a factor of 91 as well — factors always come in pairs." },
      { title:"Prime Numbers", body:"A <strong>prime</strong> has exactly two factors: 1 and itself. 2, 3, 5, 7, 11 and 13 are primes. A number with more than two factors is <strong>composite</strong>. The number 1 is neither, because it has only one factor. And 2 is the only even prime: every other even number is divisible by 2." },
      { title:"Prime Factorisation", body:"Every whole number above 1 can be built from primes in exactly one way (ignoring the order). This is called the Fundamental Theorem of Arithmetic. Primes are the atoms; composite numbers are the molecules made from them.",
        formula:"36 = 2 × 2 × 3 × 3 = 2² × 3²",
        example:"Break 60 apart: 60 = 6 × 10 = (2 × 3) × (2 × 5) = 2² × 3 × 5. However you split it, you end up with the same primes." },
      { title:"HCF and LCM", body:"The <strong>HCF</strong> (highest common factor) of two numbers is the largest number that divides both. The <strong>LCM</strong> (lowest common multiple) is the smallest number that both divide into. Using prime factors: the HCF uses the primes the two numbers share, and the LCM uses every prime that appears in either.",
        formula:"HCF(a, b) × LCM(a, b) = a × b",
        example:"12 = 2² × 3 and 18 = 2 × 3². HCF = 2 × 3 = 6 and LCM = 2² × 3² = 36. Check: 6 × 36 = 216 = 12 × 18." },
      { title:"Why Primes Matter", body:"Multiplying two huge primes together is easy for a computer. Working backwards from the product to find the two primes is extremely slow. Much of the encryption that protects online payments relies on exactly this one-way difficulty." }
    ],
    sim:{
      type:"primes",
      canvasId:"primesCanvas",
      title:"Experiment: The Sieve of Eratosthenes",
      width:700, height:410,
      controls:[
        { id:"sievePrimes", label:"Sieve steps (cross out multiples of 2, 3, 5, 7)", min:0, max:4, value:0 },
        { id:"factorPick", label:"Pick a number to take apart", min:2, max:100, value:36 }
      ],
      readout:{ id:"primesRead", label:"Prime factors" },
      note:"Eratosthenes, a librarian in ancient Alexandria, found primes by crossing out multiples. Cross out the multiples of 2, 3, 5 and 7, and every number left in this table is prime."
    },
    gallery:{
      type:"hcflcm",
      canvasId:"hcfCanvas",
      title:"Experiment: Share the Primes",
      width:700, height:330,
      controls:[
        { id:"hlA", label:"First number", min:2, max:60, value:12 },
        { id:"hlB", label:"Second number", min:2, max:60, value:18 }
      ],
      readout:{ id:"hcfRead", label:"HCF and LCM" },
      note:"Primes in the overlap are shared. Multiply them for the HCF. Multiply every prime in the picture for the LCM."
    },
    mentalPicture:[
      "Every number is a rectangle of dots, or it can’t be one",
      "A prime only makes a single line of dots: 1 × n",
      "Everything else breaks down into primes, in exactly one way",
      "<strong>Primes are the building blocks; every other whole number is a unique product of them</strong>"
    ],
    quiz:[
      { q:"Which of these is a prime number?", options:[
        {t:"21"}, {t:"29", c:true}, {t:"39"} ],
        why:"21 = 3 × 7 and 39 = 3 × 13. The number 29 has no factors except 1 and 29." },
      { q:"Which statement about the number 2 is true?", options:[
        {t:"It is the only even prime", c:true}, {t:"It is not prime because it is even"}, {t:"It is the only odd prime"} ],
        why:"Every other even number can be divided by 2, so it has at least three factors." },
      { q:"What is the prime factorisation of 60?", options:[
        {t:"2 × 3 × 10"}, {t:"2² × 3 × 5", c:true}, {t:"6 × 10"} ],
        why:"10 and 6 are not prime, so those are not finished. 2 × 2 × 3 × 5 = 60 uses primes only." },
      { q:"What is the HCF of 12 and 18?", options:[
        {t:"3"}, {t:"6", c:true}, {t:"36"} ],
        why:"The largest number that divides both is 6. (36 is their LCM, not their HCF.)" },
      { q:"What is the LCM of 4 and 6?", options:[
        {t:"2"}, {t:"24"}, {t:"12", c:true} ],
        why:"Multiples of 4: 4, 8, 12. Multiples of 6: 6, 12. The first one they share is 12." }
    ]
  },
  {
    id:"fractions",
    subject:"mathematics",
    pos:{ top:170, left:"24%" },
    label:"Fractions",
    chapter:"ATLAS ENTRY 02 • THE ART OF SHARING • GRADES 5–8",
    title:"Fractions",
    hook:"You order a pizza. It’s cut into 8 equal slices. You eat 3 of them. Your friend says “you’ve had 3 out of 8” — but really, you’ve eaten something with a name: three-eighths. What does that name actually mean?",
    sections:[
      { title:"Parts of a Whole", body:"A fraction describes a whole that’s been cut into equal pieces, and how many of those pieces you’re talking about. The bottom number (denominator) says how many equal pieces the whole was split into. The top number (numerator) says how many of those pieces you have.",
        formula:"Fraction = Numerator (pieces you have) ⁄ Denominator (pieces in the whole)" },
      { title:"The Same Amount, Different Names", body:"Cut a pizza into 4 slices and take 2, or cut it into 8 slices and take 4 — you’ve eaten exactly the same amount of pizza both times. 2/4 and 4/8 are different names for the same quantity. This is why fractions can be simplified: dividing the top and bottom by the same number never changes how much you actually have.",
        example:"Simplify 6/8. Divide the top and bottom by 2 to get 3/4. Divide again? 3 and 4 share no factor, so 3/4 is in lowest terms." },
      { title:"Comparing Fractions", body:"Which is bigger, 1/3 of a pizza or 1/8 of the same pizza? Even though 8 is a bigger number than 3, 1/8 is the smaller slice — because the pizza got cut into more pieces, so each piece shrank. The bigger the denominator, the smaller each individual piece becomes.",
        example:"Compare 3/4 and 5/8. Write both in eighths: 3/4 = 6/8, which is bigger than 5/8. So 3/4 is larger." },
      { title:"Adding Fractions", body:"You can only add pieces that are the same size. Halves and thirds are different-sized slices, so 1/2 + 1/3 can’t be added directly. Rewrite both with a common denominator: 1/2 = 3/6 and 1/3 = 2/6, so the sum is 5/6. Only the numerators are added; the denominator names the slice size and stays the same.",
        formula:"a/c + b/c = (a + b)/c",
        example:"3/4 + 1/6. The lowest common denominator is 12: 9/12 + 2/12 = 11/12." },
      { title:"One Amount, Three Names", body:"A fraction is also a division: 3/8 means 3 ÷ 8 = 0.375, which is 37.5%. Fractions, decimals and percentages are three names for one amount. A fraction bigger than 1, like 7/4, is called improper and can be written as a mixed number: 1 3/4." }
    ],
    sim:{
      type:"fractions",
      canvasId:"fractionsCanvas",
      title:"Experiment: Slice the Circle",
      width:500, height:320,
      controls:[
        { id:"numeratorInput", label:"Slices Taken", min:1, max:12, value:3 },
        { id:"denominatorInput", label:"Total Slices", min:1, max:12, value:8 }
      ],
      readout:{ id:"fractionRead", label:"You are looking at" }
    },
    gallery:{
      type:"fractionsadd",
      canvasId:"fracAddCanvas",
      title:"Experiment: Add Two Fractions",
      width:700, height:300,
      controls:[
        { id:"fn1", label:"First fraction: top", min:1, max:8, value:1 },
        { id:"fd1", label:"First fraction: bottom", min:2, max:8, value:2 },
        { id:"fn2", label:"Second fraction: top", min:1, max:8, value:1 },
        { id:"fd2", label:"Second fraction: bottom", min:2, max:8, value:3 }
      ],
      readout:{ id:"fracAddRead", label:"Working" },
      note:"Notice that the two bars only line up once both are cut into the same-size slices."
    },
    mentalPicture:[
      "A whole pizza, uncut",
      "Cut it into equal slices — that’s the denominator",
      "Count how many slices you take — that’s the numerator",
      "<strong>A fraction is just a precise way to say how much of the whole you have</strong>"
    ],
    quiz:[
      { q:"A pizza is cut into 8 slices. You eat 4. What fraction of the pizza did you eat?", options:[
        {t:"4/8 (equivalent to one half)", c:true}, {t:"8/4"}, {t:"4/4"} ],
        why:"You ate 4 of the 8 equal slices, which is 4/8 = 1/2." },
      { q:"Which is the larger amount: 1/3 of a cake or 1/6 of the same cake?", options:[
        {t:"1/6, because 6 is a bigger number"},
        {t:"1/3, because the cake was cut into fewer, bigger pieces", c:true},
        {t:"They’re always equal"} ],
        why:"Splitting into more pieces makes each piece smaller, so a sixth is smaller than a third." },
      { q:"2/4 and 4/8 of the same pizza represent:", options:[
        {t:"Different amounts"},
        {t:"The exact same amount, just named differently", c:true},
        {t:"It depends on the toppings"} ],
        why:"Both simplify to 1/2." },
      { q:"What is 1/4 + 2/4?", options:[
        {t:"3/8"}, {t:"3/4", c:true}, {t:"2/8"} ],
        why:"The slices are already the same size (quarters), so just add the numerators: 1 + 2 = 3 quarters." },
      { q:"To add 1/2 + 1/3, what do you need first?", options:[
        {t:"Add the tops and the bottoms to get 2/5"},
        {t:"A common denominator, such as sixths", c:true},
        {t:"To multiply the fractions" } ],
        why:"Halves and thirds are different-size slices. In sixths the sum is 3/6 + 2/6 = 5/6." },
      { q:"As a decimal, 3/8 equals:", options:[
        {t:"0.375", c:true}, {t:"0.83"}, {t:"3.8"} ],
        why:"3 ÷ 8 = 0.375." }
    ]
  },
  {
    id:"ratio-percent",
    subject:"mathematics",
    pos:{ top:80, left:"43%" },
    label:"Ratio & Percent",
    chapter:"ATLAS ENTRY 03 • COMPARING BY SCALE • GRADES 6–8",
    title:"Ratio & Percentages",
    hook:"A shop says “30% off”. A recipe says “flour to sugar, 3 to 1”. A map says “1 cm is 5 km”. All three are one idea in different clothes: comparing one amount to another by scale. How do you see through them?",
    sections:[
      { title:"Ratio: Comparing Two Amounts", body:"A <strong>ratio</strong> compares quantities in the same units, written a : b. A paint mix of 2 : 3 means that for every 2 parts of blue there are 3 parts of yellow, 5 parts in all. A ratio doesn’t care about the size of the batch: 2 : 3 and 4 : 6 are the same mix.",
        example:"Squash is mixed 1 : 4 with water. For 500 ml of drink there are 5 parts, so one part is 100 ml: 100 ml of squash and 400 ml of water." },
      { title:"Percent: Out of One Hundred", body:"“Per cent” means “per hundred”. 35% means 35 out of every 100, which is 35/100 = 0.35. A percentage is a ratio whose second part is fixed at 100, which makes it easy to compare things of different sizes.",
        formula:"x% of N = (x ÷ 100) × N",
        example:"35% of 200 = 0.35 × 200 = 70." },
      { title:"Ratio, Fraction and Percent Together", body:"A ratio of 2 : 3 splits a whole into 5 equal parts, so the two shares are 2/5 and 3/5, which are 40% and 60%. Take care: 2 : 3 compares part to part, while 2/5 compares part to whole. Mixing those up is the most common ratio mistake." },
      { title:"Percentage Change", body:"To raise a number by 20%, multiply by 1.20. To cut it by 20%, multiply by 0.80. Percentage changes don’t simply cancel: 20% up then 20% down gives 1.20 × 0.80 = 0.96, a 4% loss, because the second percentage is taken of a different amount.",
        formula:"New value = Old value × (1 ± percent ÷ 100)",
        example:"A ₹500 jacket is 30% off: 500 × 0.70 = ₹350." },
      { title:"Unit Rate and Direct Proportion", body:"If 6 notebooks cost ₹90, then one notebook costs ₹15 (the unit rate), so 10 notebooks cost ₹150. When two quantities grow at the same rate, so that doubling one doubles the other, they are in direct proportion." }
    ],
    sim:{
      type:"ratiopercent",
      canvasId:"ratioCanvas",
      title:"Experiment: One Share, Three Names",
      width:700, height:320,
      controls:[
        { id:"pctValue", label:"Percent", min:0, max:100, value:35 },
        { id:"pctWhole", label:"Whole amount", min:20, max:400, step:20, value:200 },
        { id:"ratioA", label:"Ratio: first part", min:1, max:9, value:2 },
        { id:"ratioB", label:"Ratio: second part", min:1, max:9, value:3 }
      ],
      readout:{ id:"ratioRead", label:"Result" }
    },
    gallery:{
      type:"percentchange",
      canvasId:"pctChangeCanvas",
      title:"Experiment: Up Then Down",
      width:700, height:300,
      controls:[
        { id:"chgA", label:"First change (%)", min:-50, max:50, step:5, value:20 },
        { id:"chgB", label:"Second change (%)", min:-50, max:50, step:5, value:-20 }
      ],
      readout:{ id:"pctChangeRead", label:"Value" },
      note:"Try +20% then −20%. The price does not return to 100, because the second change is a percentage of the new, larger amount."
    },
    mentalPicture:[
      "A whole split into equal parts",
      "A ratio says how many parts each side gets",
      "Percent is the same split, counted out of 100",
      "<strong>Ratio, fraction, decimal and percent are four ways to describe the same share</strong>"
    ],
    quiz:[
      { q:"A paint mix is 2 parts red to 3 parts white. What fraction of the mix is red?", options:[
        {t:"2/3"}, {t:"2/5", c:true}, {t:"3/5"} ],
        why:"There are 2 + 3 = 5 parts in total, and 2 of them are red." },
      { q:"What is 25% of 80?", options:[
        {t:"20", c:true}, {t:"25"}, {t:"32"} ],
        why:"25% is a quarter, and 80 ÷ 4 = 20." },
      { q:"A price rises by 10% and then falls by 10%. Compared with the start, the final price is:", options:[
        {t:"The same"}, {t:"1% lower", c:true}, {t:"1% higher"} ],
        why:"1.10 × 0.90 = 0.99, so the price ends at 99% of where it began." },
      { q:"6 notebooks cost ₹90. At the same rate, 10 notebooks cost:", options:[
        {t:"₹150", c:true}, {t:"₹100"}, {t:"₹900"} ],
        why:"One notebook costs 90 ÷ 6 = ₹15, and 10 × 15 = ₹150." },
      { q:"The ratio 4 : 6 is equivalent to:", options:[
        {t:"2 : 3", c:true}, {t:"4 : 10"}, {t:"6 : 4"} ],
        why:"Divide both parts by 2." }
    ]
  },
  {
    id:"number-system",
    subject:"mathematics",
    pos:{ top:175, left:"62%" },
    label:"Number System",
    chapter:"ATLAS ENTRY 04 • THE FAMILY OF NUMBERS • GRADES 6–9",
    title:"The Number System",
    hook:"“-3 apples” makes no sense. “-3 degrees” makes perfect sense. Both use the number -3. So why does it behave differently depending on what it’s counting? Not all numbers belong to the same family.",
    sections:[
      { title:"Counting Numbers", body:"The numbers you first learned — 1, 2, 3, 4... — are called <strong>natural numbers</strong>. Add zero to that group and you get the <strong>whole numbers</strong>: 0, 1, 2, 3... Neither group has room for anything negative or broken into pieces." },
      { title:"Below Zero", body:"<strong>Integers</strong> widen the family to include negative numbers too: ...-3, -2, -1, 0, 1, 2, 3... A temperature, a bank overdraft, or a floor below ground level all need integers — whole numbers alone can’t describe them." },
      { title:"Distance from Zero", body:"On the number line, numbers to the right are bigger. The <strong>absolute value</strong> of a number, written |x|, is its distance from zero, ignoring direction. So |−7| = 7 and |7| = 7. Two numbers with the same absolute value sit on opposite sides of zero.",
        example:"Which is colder, −8 °C or −3 °C? −8 is further left on the line, so it is smaller and colder. But |−8| = 8 is larger: it is further from zero." },
      { title:"Numbers That Can Be Split", body:"<strong>Rational numbers</strong> are any number that can be written as one integer divided by another, like 1/2 or -7/3. This includes fractions, and also decimals that either stop (0.75) or repeat forever in a pattern (0.333...). Between any two rational numbers there is always another one, so there is no “next” fraction." },
      { title:"Numbers That Never Settle", body:"Some numbers can never be written as a simple fraction, and their decimals never repeat or stop — they just go on forever with no pattern. π (3.14159...) and √2 (1.41421...) are <strong>irrational numbers</strong>. Together, rational and irrational numbers make up every point on the number line — the <strong>real numbers</strong>." }
    ],
    sim:{
      type:"numberline",
      canvasId:"numberlineCanvas",
      title:"Experiment: Place the Number",
      width:700, height:200,
      controls:[
        { id:"numlineValue", label:"Pick a Number (steps of 0.5)", min:-20, max:20, step:0.5, value:6 }
      ],
      readout:{ id:"numlineRead", label:"This number is" }
    },
    gallery:{
      type:"decimalexpand",
      canvasId:"decCanvas",
      title:"Experiment: Does the Decimal Stop?",
      width:700, height:300,
      controls:[
        { id:"decP", label:"Top of the fraction", min:1, max:30, value:1 },
        { id:"decQ", label:"Bottom of the fraction", min:2, max:30, value:7 }
      ],
      readout:{ id:"decRead", label:"As a decimal" },
      note:"Long division either reaches remainder 0 (the decimal stops) or meets a remainder it has seen before (the digits repeat from there)."
    },
    mentalPicture:[
      "Natural numbers sit inside Whole numbers",
      "Whole numbers sit inside Integers",
      "Integers sit inside Rational numbers",
      "<strong>Rational and Irrational numbers together fill every point on the line — the Real numbers</strong>"
    ],
    quiz:[
      { q:"Is -5 a whole number?", options:[
        {t:"Yes, whole numbers include all integers"}, {t:"No — whole numbers can’t be negative", c:true}, {t:"Only if it is written as a fraction"} ],
        why:"Whole numbers start at 0 and go up. Negative numbers first appear in the integers." },
      { q:"0.333... (repeating forever in a pattern) is:", options:[
        {t:"Irrational, because it never ends"},
        {t:"Rational, because repeating decimals can be written as a fraction (1/3)", c:true},
        {t:"Not a real number"} ],
        why:"A decimal that repeats in a pattern can always be written as a fraction. Irrational decimals have no pattern." },
      { q:"Which of these is irrational?", options:[
        {t:"0.75"}, {t:"-4"}, {t:"√2, because its decimal never repeats or ends", c:true} ],
        why:"0.75 = 3/4 and −4 = −4/1 are both rational. √2 cannot be written as a fraction." },
      { q:"What is |−7|?", options:[
        {t:"−7"}, {t:"7", c:true}, {t:"0"} ],
        why:"Absolute value is distance from zero, and distance is never negative." },
      { q:"Which fraction becomes a repeating decimal?", options:[
        {t:"3/8"}, {t:"1/3", c:true}, {t:"7/10"} ],
        why:"A fraction in lowest terms stops only if its denominator has no prime factors except 2 and 5. The 3 in 1/3 makes it repeat." },
      { q:"Is there a rational number between 0.1 and 0.2?", options:[
        {t:"No, they are neighbours"}, {t:"Yes: 0.15, and infinitely many more", c:true}, {t:"Only 0.15 and 0.16"} ],
        why:"Between any two rational numbers you can always find another, for example their average." }
    ]
  },
  {
    id:"exponents",
    subject:"mathematics",
    pos:{ top:85, left:"81%" },
    label:"Powers & Roots",
    chapter:"ATLAS ENTRY 05 • THE SPEED OF GROWTH • GRADES 7–10",
    title:"Powers & Roots",
    hook:"Fold a sheet of paper in half. Then again. And again. Seven folds make a stack 128 layers thick. In theory, about 42 folds would be enough to reach the Moon. How can something so ordinary run away so fast?",
    sections:[
      { title:"Repeated Multiplication", body:"An <strong>exponent</strong> counts how many times a number (the base) is multiplied by itself. 2⁵ = 2 × 2 × 2 × 2 × 2 = 32. The small raised number is the power, or exponent.",
        formula:"bⁿ = b × b × … × b   (n copies of b)" },
      { title:"Squares and Cubes", body:"n² is the area of a square with side n, and n³ is the volume of a cube with edge n. That is why we say “squared” and “cubed”.",
        example:"A cube with 4 cm edges is built from 4³ = 64 unit cubes." },
      { title:"The Laws of Exponents", body:"When you multiply powers of the same base, add the exponents. When you divide, subtract. A power of a power multiplies the exponents. And anything to the power 0 is 1, because 2³ ÷ 2³ = 2⁰ = 1.",
        formula:"aᵐ × aⁿ = aᵐ⁺ⁿ<br>aᵐ ÷ aⁿ = aᵐ⁻ⁿ<br>(aᵐ)ⁿ = aᵐⁿ<br>a⁰ = 1",
        example:"2³ × 2⁴ = (2×2×2) × (2×2×2×2) = 2⁷ = 128." },
      { title:"Roots: Undoing a Power", body:"A square root asks “what number times itself makes this?”. √49 = 7 because 7² = 49. Numbers like 49 are perfect squares. Others, like √50, are irrational: about 7.07, between 7 and 8. The cube root ∛27 = 3 undoes cubing." },
      { title:"Standard Form", body:"Scientists write huge and tiny numbers with powers of ten. The speed of light, 300,000,000 m/s, is 3 × 10⁸ m/s, and 0.00005 is 5 × 10⁻⁵. A negative exponent means “one over”: 10⁻² = 1/100.",
        example:"The Sun is about 1.5 × 10⁸ km from Earth, which is 150,000,000 km." }
    ],
    sim:{
      type:"exponents",
      canvasId:"exponentCanvas",
      title:"Experiment: Build a Power",
      width:700, height:360,
      controls:[
        { id:"baseInput", label:"Base", min:2, max:9, value:2 },
        { id:"expInput", label:"Exponent", min:0, max:6, value:3 }
      ],
      readout:{ id:"exponentRead", label:"Value" }
    },
    gallery:{
      type:"roots",
      canvasId:"rootsCanvas",
      title:"Experiment: Roots as Side Lengths",
      width:700, height:340,
      controls:[
        { id:"rootArea", label:"Area of the square", min:1, max:100, value:50 }
      ],
      readout:{ id:"rootsRead", label:"Square root" },
      note:"The side of a square with area A is √A. Slide the area to a perfect square and the side snaps onto the grid."
    },
    mentalPicture:[
      "Multiply a number by itself again and again",
      "Squares fill an area; cubes fill a volume",
      "Each extra power multiplies the result, so growth snowballs",
      "<strong>An exponent is a shortcut for repeated multiplication; a root undoes it</strong>"
    ],
    quiz:[
      { q:"What is 2⁵?", options:[
        {t:"10"}, {t:"32", c:true}, {t:"25"} ],
        why:"2 × 2 × 2 × 2 × 2 = 32. The exponent counts copies of the base; it is not multiplied by it." },
      { q:"2³ × 2⁴ equals:", options:[
        {t:"2⁷", c:true}, {t:"2¹²"}, {t:"4⁷"} ],
        why:"Same base, so add the exponents: 3 + 4 = 7." },
      { q:"What is 7⁰?", options:[
        {t:"0"}, {t:"7"}, {t:"1", c:true} ],
        why:"7³ ÷ 7³ = 1, and by the subtraction law that is also 7⁰." },
      { q:"√50 lies between:", options:[
        {t:"5 and 6"}, {t:"7 and 8", c:true}, {t:"24 and 26"} ],
        why:"7² = 49 and 8² = 64, so √50 is just over 7." },
      { q:"A paper stack doubles in thickness with each fold. After 10 folds it is how many times thicker?", options:[
        {t:"20"}, {t:"100"}, {t:"1024", c:true} ],
        why:"Ten doublings is 2¹⁰ = 1024." }
    ]
  },
  {
    id:"algebra",
    subject:"mathematics",
    pos:{ top:400, left:"5%" },
    label:"Algebra",
    chapter:"ATLAS ENTRY 06 • THE ART OF THE UNKNOWN • GRADES 7–10",
    title:"Algebra",
    hook:"A locked box holds some coins — you don’t know how many. Add 5 more coins to the box, and now it holds 12 in total. How many coins were in the box to begin with? You just solved algebra without ever calling it that.",
    sections:[
      { title:"Letters Standing In for Numbers", body:"In algebra, a letter like <em>x</em> is just a placeholder for a number we don’t know yet — exactly like the locked box. “x + 5 = 12” says: some unknown number, plus 5, equals 12. Algebra is the set of tools for uncovering what x has to be." },
      { title:"Expressions and Like Terms", body:"An expression such as 3x + 2x + 5 has no equals sign. Terms with the same letter are <strong>like terms</strong> and can be combined: 3x + 2x = 5x. A plain number can’t be merged with an x-term, so the expression simplifies to 5x + 5.",
        example:"Simplify 4x + 3 + 2x − 1. Combine the x-terms (4x + 2x = 6x) and the numbers (3 − 1 = 2) to get 6x + 2." },
      { title:"The Balance Scale Rule", body:"Think of an equation as a balance scale: both sides must always weigh the same. Whatever you do to one side — add, subtract, multiply, divide — you must do to the other side too, or the scale tips and the equation breaks.",
        formula:"x + 5 = 12  →  x + 5 − 5 = 12 − 5  →  x = 7" },
      { title:"Solving Step by Step", body:"To isolate x, undo whatever is being done to it, working backward. If x is multiplied by a number, divide both sides by that number. If a number is added to x, subtract it from both sides. Peel away one layer at a time until x stands alone. Finally, check your answer by putting it back into the original equation.",
        example:"2x + 3 = 11. Subtract 3 from both sides: 2x = 8. Divide by 2: x = 4. Check: 2 × 4 + 3 = 11 ✓." },
      { title:"Unknowns on Both Sides", body:"When x appears on both sides, first gather the x-terms on one side by subtracting the smaller one from both sides, then solve as usual.",
        formula:"5x − 3 = 2x + 9  →  3x − 3 = 9  →  3x = 12  →  x = 4" },
      { title:"Turning Words into Equations", body:"“Think of a number, triple it, subtract 4 and you get 11” becomes 3x − 4 = 11. Read the sentence in order and write down each step on x. Once it is an equation, the same balance rule solves it." }
    ],
    sim:{
      type:"algebra",
      canvasId:"algebraCanvas",
      title:"Experiment: Balance the Scale",
      width:700, height:260,
      controls:[
        { id:"coefInput", label:"Coefficient of x", min:1, max:5, value:2 },
        { id:"constInput", label:"Constant Added", min:-5, max:5, value:3 },
        { id:"targetInput", label:"Right Side (Target)", min:0, max:20, value:11 },
        { id:"guessInput", label:"Your Guess for x", min:0, max:15, value:5 }
      ],
      readout:{ id:"algebraRead", label:"Left side total (guess it to zero out the tilt)" }
    },
    gallery:{
      type:"functionmachine",
      canvasId:"machineCanvas",
      title:"Experiment: The Function Machine",
      width:700, height:310,
      controls:[
        { id:"fmMul", label:"Multiply by", min:1, max:5, value:3 },
        { id:"fmAdd", label:"Then add", min:-6, max:8, value:4 },
        { id:"fmIn", label:"Input x", min:-4, max:10, value:2 }
      ],
      readout:{ id:"machineRead", label:"Flow" },
      note:"Solving an equation means running the machine backwards: undo the last step first, then the one before it."
    },
    mentalPicture:[
      "An equation is a balance scale — both sides must weigh the same",
      "x is a locked box hiding an unknown weight",
      "Do the same operation to both sides to keep it balanced",
      "<strong>Keep peeling away layers until the box stands alone — that’s x solved</strong>"
    ],
    quiz:[
      { q:"To solve x + 5 = 12, what should you do to both sides?", options:[
        {t:"Add 5 to both sides"}, {t:"Subtract 5 from both sides", c:true}, {t:"Multiply both sides by 5"} ],
        why:"Subtracting 5 undoes the +5 and leaves x on its own." },
      { q:"To solve 3x = 15, what should you do to both sides?", options:[
        {t:"Divide both sides by 3", c:true}, {t:"Subtract 3 from both sides"}, {t:"Add 15 to both sides"} ],
        why:"3x means 3 times x, and division undoes multiplication." },
      { q:"In the equation 2x + 3 = 11, what is x?", options:[
        {t:"5"}, {t:"4", c:true}, {t:"7"} ],
        why:"11 − 3 = 8, and 8 ÷ 2 = 4." },
      { q:"Simplify 4x + 3x.", options:[
        {t:"7x", c:true}, {t:"7x²"}, {t:"12x"} ],
        why:"Four of something plus three of the same thing is seven of it. The letter doesn’t change." },
      { q:"Solve 5x − 3 = 2x + 9.", options:[
        {t:"x = 2"}, {t:"x = 4", c:true}, {t:"x = 6"} ],
        why:"Subtract 2x: 3x − 3 = 9. Add 3: 3x = 12. So x = 4. Check: 17 on both sides." },
      { q:"“Triple a number, subtract 4, get 11.” Which equation is that?", options:[
        {t:"3x − 4 = 11", c:true}, {t:"3 + x − 4 = 11"}, {t:"x³ − 4 = 11"} ],
        why:"Tripling is 3x, then subtract 4, and the result is 11. (The answer is x = 5.)" }
    ]
  },
  {
    id:"linear-graphs",
    subject:"mathematics",
    pos:{ top:500, left:"24%" },
    label:"Straight Lines",
    chapter:"ATLAS ENTRY 07 • EQUATIONS YOU CAN SEE • GRADES 8–10",
    title:"Straight Lines & Graphs",
    hook:"A taxi charges ₹50 just to start the meter, then ₹12 for every kilometre. You can describe that in a sentence, a table, or as one straight line on a graph. How does a single line capture the fare for every possible trip?",
    sections:[
      { title:"The Coordinate Plane", body:"Two number lines cross at right angles: the horizontal <strong>x-axis</strong> and the vertical <strong>y-axis</strong>. Any point is a pair (x, y): go x steps across, then y steps up (or down, if y is negative). The crossing point (0, 0) is the origin.",
        example:"(3, 2) is 3 right and 2 up. (−2, −1) is 2 left and 1 down." },
      { title:"Slope: How Steep?", body:"<strong>Slope</strong> (or gradient) measures steepness as rise ÷ run: how far the line goes up for each step across. A positive slope climbs to the right, a negative slope falls, and a slope of zero is flat.",
        formula:"m = rise ÷ run = (y₂ − y₁) ÷ (x₂ − x₁)",
        example:"From (1, 2) to (3, 8): the rise is 6 and the run is 2, so the slope is 3." },
      { title:"The Equation y = mx + c", body:"Every straight line (that isn’t vertical) has an equation y = mx + c. The number m is the slope, and c is the <strong>y-intercept</strong>, where the line crosses the y-axis (the value of y when x = 0). For the taxi, fare = 12 × km + 50, so m = 12 rupees per km and c = 50, the starting charge.",
        formula:"y = mx + c" },
      { title:"Reading a Line", body:"Substitute any x to find y: on y = 2x + 1, x = 3 gives y = 7. Work the other way too: for y = 11, solve 2x + 1 = 11 to get x = 5. Every point on the line is a pair of numbers that makes the equation true." },
      { title:"Where Two Lines Meet", body:"Two lines cross at the one point that satisfies both equations. That point is the solution of the pair of simultaneous equations. Lines with the same slope but different intercepts are parallel and never meet. Two equations for the same line have infinitely many shared points.",
        example:"y = x − 2 and y = −x + 4. Set them equal: x − 2 = −x + 4, so 2x = 6 and x = 3. Then y = 1. They meet at (3, 1)." }
    ],
    sim:{
      type:"linegraph",
      canvasId:"lineCanvas",
      title:"Experiment: Steer the Line",
      width:700, height:420,
      controls:[
        { id:"slopeInput", label:"Slope m", min:-5, max:5, step:0.5, value:2 },
        { id:"interceptInput", label:"Intercept c", min:-8, max:8, value:1 },
        { id:"probeX", label:"Probe: choose x", min:-8, max:8, value:3 }
      ],
      readout:{ id:"lineRead", label:"Line" },
      note:"The dashed teal and violet strokes show one step of run and the matching rise. That rise is the slope."
    },
    gallery:{
      type:"lineintersect",
      canvasId:"intersectCanvas",
      title:"Experiment: Where Do They Meet?",
      width:700, height:380,
      controls:[
        { id:"m1", label:"Teal line: slope", min:-4, max:4, step:0.5, value:1 },
        { id:"c1", label:"Teal line: intercept", min:-6, max:6, value:-2 },
        { id:"m2", label:"Violet line: slope", min:-4, max:4, step:0.5, value:-1 },
        { id:"c2", label:"Violet line: intercept", min:-6, max:6, value:4 }
      ],
      readout:{ id:"intersectRead", label:"Result" },
      note:"Make the slopes equal to see parallel lines, and then make the intercepts equal as well to see one line lying on the other."
    },
    mentalPicture:[
      "Two axes make a map of every pair of numbers",
      "The slope says how steeply the line climbs",
      "The intercept says where it starts",
      "<strong>A line is a picture of an equation: every point on it is a solution</strong>"
    ],
    quiz:[
      { q:"What is the slope of the line through (0, 1) and (2, 5)?", options:[
        {t:"2", c:true}, {t:"4"}, {t:"1/2"} ],
        why:"The rise is 5 − 1 = 4 and the run is 2 − 0 = 2, so the slope is 4 ÷ 2 = 2." },
      { q:"In y = 3x − 2, the y-intercept is:", options:[
        {t:"3"}, {t:"−2", c:true}, {t:"2"} ],
        why:"When x = 0, y = −2. That is where the line crosses the y-axis." },
      { q:"Which line is parallel to y = 2x + 5?", options:[
        {t:"y = −2x + 5"}, {t:"y = 2x − 1", c:true}, {t:"y = 5x + 2"} ],
        why:"Parallel lines have the same slope, 2, but can start in different places." },
      { q:"A line with slope 0 is:", options:[
        {t:"Vertical"}, {t:"Horizontal", c:true}, {t:"Steeply rising"} ],
        why:"A rise of 0 for every step across means the line stays level." },
      { q:"Where do y = x + 1 and y = 2x − 1 meet?", options:[
        {t:"(2, 3)", c:true}, {t:"(1, 2)"}, {t:"(3, 4)"} ],
        why:"x + 1 = 2x − 1 gives x = 2, and then y = 3. (1, 2) fits the first line only." }
    ]
  },
  {
    id:"quadratics",
    subject:"mathematics",
    pos:{ top:410, left:"43%" },
    label:"Quadratics",
    chapter:"ATLAS ENTRY 08 • THE CURVE OF A THROWN BALL • GRADES 9–10",
    title:"Quadratics & Parabolas",
    hook:"Throw a ball up and watch it. It rises fast, slows, stops for an instant at the top, then falls — faster and faster. The path isn’t a straight line; it’s a smooth arch called a parabola, and its equation contains a squared term. Why is the arch always the same shape?",
    sections:[
      { title:"A Squared Term Bends the Line", body:"A straight line has x only to the power 1. Add an x² term and the graph bends into a U-shaped curve called a <strong>parabola</strong>. The general quadratic is y = ax² + bx + c, where a cannot be zero.",
        formula:"y = ax² + bx + c" },
      { title:"What a, b and c Do", body:"The number a controls the opening: a > 0 opens upward, a < 0 opens downward, and a larger |a| makes the curve narrower. The number c is where the curve crosses the y-axis. The turning point is the <strong>vertex</strong>, and the vertical line through it is the axis of symmetry, x = −b ÷ 2a." },
      { title:"Roots: Where the Curve Meets the Axis", body:"The <strong>roots</strong> are the x-values where y = 0, that is, the solutions of ax² + bx + c = 0. A parabola can cross the x-axis twice, touch it once, or miss it completely. The quadratic formula finds them.",
        formula:"x = (−b ± √(b² − 4ac)) ÷ 2a",
        example:"x² − 2x − 3 = 0 has a = 1, b = −2, c = −3. Then b² − 4ac = 4 + 12 = 16 and √16 = 4, so x = (2 ± 4) ÷ 2, which gives x = 3 or x = −1." },
      { title:"The Discriminant", body:"The part under the root, D = b² − 4ac, tells you how many roots to expect before you solve anything. If D > 0 there are two roots (the curve crosses the axis twice). If D = 0 there is one (it just touches). If D < 0 there are none (it never reaches the axis)." },
      { title:"Factorising", body:"Sometimes you can skip the formula: x² − 2x − 3 = (x − 3)(x + 1). If a product is zero then one of its factors must be zero, so x = 3 or x = −1. Both methods find the same roots." }
    ],
    sim:{
      type:"quadratic",
      canvasId:"quadCanvas",
      title:"Experiment: Bend the Parabola",
      width:700, height:400,
      controls:[
        { id:"quadA", label:"a (opening)", min:-4, max:4, step:0.5, value:1 },
        { id:"quadB", label:"b (sideways shift)", min:-6, max:6, value:-2 },
        { id:"quadC", label:"c (height at x = 0)", min:-8, max:8, value:-3 }
      ],
      readout:{ id:"quadRead", label:"Curve" },
      note:"Teal marks the vertex, violet marks the roots on the x-axis. Push the curve above the axis with a > 0 to watch the roots disappear."
    },
    gallery:{
      type:"throwball",
      canvasId:"throwCanvas",
      title:"Experiment: Throw the Ball",
      width:700, height:340,
      controls:[
        { id:"throwSpeed", label:"Launch speed (m/s)", min:5, max:30, value:18 },
        { id:"throwAngle", label:"Launch angle (degrees)", min:20, max:80, value:45 },
        { id:"throwHeight", label:"Starting height (m)", min:0, max:20, value:2 },
        { id:"throwG", label:"Gravity (m/s²)", min:1, max:20, step:0.1, value:9.8 }
      ],
      readout:{ id:"throwRead", label:"Flight" },
      note:"Gravity of 9.8 is Earth; try about 1.6 for the Moon. The height equation has a t² term, so the path is a parabola."
    },
    mentalPicture:[
      "A line bends when you add an x² term",
      "The bend makes an arch, a parabola, with a turning point",
      "Where the arch meets the ground are the roots",
      "<strong>A thrown ball, a satellite dish, a fountain’s jet: one curve, one family of equations</strong>"
    ],
    quiz:[
      { q:"In y = ax² + bx + c, if a is negative the parabola opens:", options:[
        {t:"Upward"}, {t:"Downward", c:true}, {t:"Sideways"} ],
        why:"Negative a flips the curve into a frown shape with its vertex at the top." },
      { q:"The roots of x² − 5x + 6 = 0 are:", options:[
        {t:"2 and 3", c:true}, {t:"−2 and −3"}, {t:"1 and 6"} ],
        why:"x² − 5x + 6 = (x − 2)(x − 3), so x = 2 or x = 3." },
      { q:"If the discriminant b² − 4ac is negative, the parabola:", options:[
        {t:"Crosses the x-axis twice"}, {t:"Touches the x-axis once"}, {t:"Never reaches the x-axis", c:true} ],
        why:"There is no real number whose square is negative, so there are no real roots." },
      { q:"The axis of symmetry of y = x² − 4x + 1 is:", options:[
        {t:"x = 2", c:true}, {t:"x = −4"}, {t:"x = 1"} ],
        why:"x = −b ÷ 2a = 4 ÷ 2 = 2." },
      { q:"Why does a thrown ball follow a parabola?", options:[
        {t:"Gravity changes its vertical speed steadily, giving a t² term in its height", c:true},
        {t:"The air pushes it into an arch"},
        {t:"Balls are shaped like parabolas"} ],
        why:"Steady change in speed means the height contains a squared time term, and that is exactly what makes a parabola." }
    ]
  },
  {
    id:"sequences",
    subject:"mathematics",
    pos:{ top:510, left:"62%" },
    label:"Sequences",
    chapter:"ATLAS ENTRY 09 • PATTERNS THAT CONTINUE • GRADES 8–10",
    title:"Sequences & Series",
    hook:"Stack tins in a pyramid: 1 on top, then 2, then 3, then 4. How many tins are in a stack 10 rows tall — without counting each one? A famous story says a young Gauss summed 1 to 100 in seconds. He spotted a pattern, and so can you.",
    sections:[
      { title:"What Is a Sequence?", body:"A <strong>sequence</strong> is a list of numbers that follows a rule: 3, 5, 7, 9, … Each number is a term, and the nth term is written aₙ. If you know the rule you can find any term without writing out all the ones before it." },
      { title:"Arithmetic Sequences", body:"In an <strong>arithmetic sequence</strong> you add the same number, the common difference d, each time. 3, 5, 7, 9 has d = 2. The graph of its terms is a straight line.",
        formula:"aₙ = a + (n − 1)d",
        example:"3, 7, 11, … has a = 3 and d = 4. The 10th term is 3 + 9 × 4 = 39." },
      { title:"Geometric Sequences", body:"In a <strong>geometric sequence</strong> you multiply by the same number, the common ratio r, each time. 3, 6, 12, 24 has r = 2. These sequences grow (or shrink) explosively, like exponents.",
        formula:"aₙ = a × rⁿ⁻¹",
        example:"Start with 5 bacteria that double every hour. After 6 hours there are 5 × 2⁶ = 320." },
      { title:"Adding Up a Sequence", body:"To add 1 + 2 + … + n, write the list forwards and then backwards underneath. Every column adds to n + 1, and there are n columns, so twice the total is n(n + 1).",
        formula:"1 + 2 + … + n = n(n + 1) ÷ 2",
        example:"1 + 2 + … + 100 = 100 × 101 ÷ 2 = 5050." },
      { title:"Patterns Everywhere", body:"Simple interest adds the same amount each year, which is arithmetic. Compound interest multiplies by the same factor each year, which is geometric. The Fibonacci numbers, 1, 1, 2, 3, 5, 8, …, follow a different rule: each term is the sum of the two before it." }
    ],
    sim:{
      type:"sequences",
      canvasId:"seqCanvas",
      title:"Experiment: Add or Multiply?",
      width:700, height:340,
      controls:[
        { id:"seqFirst", label:"First term a", min:1, max:20, value:3 },
        { id:"seqDiff", label:"Common difference d (arithmetic)", min:-1, max:6, value:2 },
        { id:"seqRatio", label:"Common ratio r (geometric)", min:1, max:3, step:0.5, value:2 },
        { id:"seqN", label:"Highlight term n", min:1, max:12, value:8 }
      ],
      readout:{ id:"seqRead", label:"Highlighted" },
      note:"Violet bars add d each step. Gold dots multiply by r each step. Even with a small ratio, the dots soon leave the chart."
    },
    gallery:{
      type:"staircase",
      canvasId:"stairCanvas",
      title:"Experiment: Gauss’s Staircase",
      width:700, height:340,
      controls:[
        { id:"stairN", label:"Number of steps n", min:1, max:20, value:10 }
      ],
      readout:{ id:"stairRead", label:"Sum" },
      note:"Two copies of the same staircase make a rectangle that is n wide and n + 1 tall, so each staircase is half the rectangle."
    },
    mentalPicture:[
      "A sequence is a rule you can keep applying",
      "Arithmetic: climb by equal steps",
      "Geometric: multiply by equal factors, so growth explodes",
      "<strong>Spot the rule and you can find any term without listing the rest</strong>"
    ],
    quiz:[
      { q:"What is the next term: 4, 9, 14, 19, …?", options:[
        {t:"24", c:true}, {t:"23"}, {t:"28"} ],
        why:"The common difference is 5, so 19 + 5 = 24." },
      { q:"Which sequence is geometric?", options:[
        {t:"2, 4, 6, 8"}, {t:"2, 4, 8, 16", c:true}, {t:"1, 4, 9, 16"} ],
        why:"2, 4, 8, 16 multiplies by 2 each time. 2, 4, 6, 8 adds 2, and 1, 4, 9, 16 are squares." },
      { q:"What is the 10th term of 5, 8, 11, …?", options:[
        {t:"32", c:true}, {t:"35"}, {t:"29"} ],
        why:"a = 5 and d = 3, so the 10th term is 5 + 9 × 3 = 32." },
      { q:"1 + 2 + 3 + … + 20 =", options:[
        {t:"200"}, {t:"210", c:true}, {t:"420"} ],
        why:"20 × 21 ÷ 2 = 210. (420 is the full rectangle, and the sum is half of it.)" },
      { q:"Why does a geometric sequence with r = 2 outgrow any arithmetic one?", options:[
        {t:"Each step multiplies, so the amount added keeps getting larger", c:true},
        {t:"It starts with a bigger first term"},
        {t:"It doesn’t; they grow at the same rate" } ],
        why:"An arithmetic sequence adds the same amount every time. A geometric one adds double the previous addition." }
    ]
  },
  {
    id:"calculus",
    subject:"mathematics",
    pos:{ top:420, left:"81%" },
    label:"Calculus",
    chapter:"ATLAS ENTRY 10 • THE MATHEMATICS OF CHANGE • GRADES 11–12",
    title:"Rates of Change: Intro to Calculus",
    hook:"A car’s speedometer reads 60 km/h. But speed over a trip is distance ÷ time — an average. How can a speedometer report your speed at one exact instant, when an instant lasts no time at all to divide by? Answering that question led Newton and Leibniz to calculus.",
    sections:[
      { title:"Average Rate of Change", body:"Pick two points on a curve. The straight line through them is called a <strong>secant</strong>, and its slope is the average rate of change between the points: the change in y divided by the change in x.",
        formula:"average rate = (f(x + h) − f(x)) ÷ h" },
      { title:"Shrinking the Gap", body:"Now slide the second point closer to the first: h = 1, then 0.5, then 0.1, then 0.01. The secant swings round towards a single line that just touches the curve at that point, the <strong>tangent</strong>. Its slope is the instantaneous rate of change, called the <strong>derivative</strong>.",
        formula:"f′(x) = the value that [f(x + h) − f(x)] ÷ h approaches as h → 0" },
      { title:"A Worked Derivative", body:"For f(x) = x²: (x + h)² − x² = 2xh + h². Dividing by h gives 2x + h. As h shrinks towards 0 the extra h disappears and the slope approaches 2x. So the curve y = x² has slope 2x at every point.",
        example:"At x = 3 the slope of y = x² is 6. At x = 1.5 it is 3. In the experiment, set x = 1.5 and h = 1.5: the secant slope is 4.5 (that is 3 + h), then watch it fall towards 3 as h shrinks." },
      { title:"Rules to Remember", body:"The <strong>power rule</strong> says the derivative of xⁿ is n·xⁿ⁻¹. So x² gives 2x and x³ gives 3x². The derivative of sin x is cos x. Speed is the derivative of distance, and acceleration is the derivative of speed.",
        formula:"d/dx (xⁿ) = n·xⁿ⁻¹<br>d/dx (sin x) = cos x" },
      { title:"The Other Half: Area Under a Curve", body:"Adding up the areas of thin rectangles under a curve estimates the area beneath it, and the thinner the rectangles the better the estimate. The limit is the <strong>integral</strong>. Remarkably, integrating undoes differentiating, which is the Fundamental Theorem of Calculus.",
        example:"The area under y = x² from 0 to 3 is exactly 9. With 60 rectangles the estimate is already within about 0.25 of it." }
    ],
    sim:{
      type:"derivative",
      canvasId:"derivCanvas",
      title:"Experiment: From Secant to Tangent",
      width:700, height:400,
      controls:[
        { id:"calcFn", label:"Curve (1: x², 2: x³, 3: sin x)", min:1, max:3, value:1 },
        { id:"calcX", label:"Point x", min:-3, max:3, step:0.1, value:1.5 },
        { id:"calcH", label:"Gap h (shrink it!)", min:0.05, max:2, step:0.05, value:1.5 }
      ],
      readout:{ id:"derivRead", label:"Slopes" },
      note:"The violet dashed secant joins the two points. The teal tangent touches only the first. Drag h down and the secant slope closes in on the tangent slope."
    },
    gallery:{
      type:"riemann",
      canvasId:"riemannCanvas",
      title:"Experiment: Area from Slivers",
      width:700, height:360,
      controls:[
        { id:"riemannN", label:"Number of rectangles", min:1, max:60, value:6 }
      ],
      readout:{ id:"riemannRead", label:"Estimate" },
      note:"Each rectangle uses the curve’s height at its left edge, so the estimate starts too low and creeps up towards 9."
    },
    mentalPicture:[
      "A curve has a different steepness at every point",
      "A secant gives the average steepness between two points",
      "Bring the points together and the secant becomes the tangent",
      "<strong>The derivative is steepness at exactly one point; the integral is area built from slivers</strong>"
    ],
    quiz:[
      { q:"As h gets smaller, the secant line approaches the:", options:[
        {t:"x-axis"}, {t:"tangent line", c:true}, {t:"y-axis"} ],
        why:"The two points merge, and the line through them becomes the line that just touches the curve." },
      { q:"The derivative of x² is:", options:[
        {t:"x"}, {t:"2x", c:true}, {t:"x³"} ],
        why:"The power rule: bring the 2 down in front and lower the power by one." },
      { q:"What is the slope of y = x² at x = 3?", options:[
        {t:"3"}, {t:"6", c:true}, {t:"9"} ],
        why:"The slope is 2x, and 2 × 3 = 6." },
      { q:"A derivative tells you:", options:[
        {t:"The total area under a curve"}, {t:"The instantaneous rate of change", c:true}, {t:"The average of all the values"} ],
        why:"It is the slope of the tangent: how fast the quantity is changing at that exact moment." },
      { q:"Using more, thinner rectangles to estimate the area under a curve gives:", options:[
        {t:"A worse estimate"}, {t:"A better estimate", c:true}, {t:"Exactly the same estimate"} ],
        why:"Thinner rectangles leave smaller gaps between the rectangles and the curve." }
    ]
  },
  {
    id:"geometry",
    subject:"mathematics",
    pos:{ top:740, left:"11%" },
    label:"Geometry",
    isHub:true,
    chapter:"ATLAS ENTRY 11 • THE SHAPE OF SPACE • GRADES 6–10",
    title:"Geometry",
    hook:"You want to fence a rectangular garden and also cover it with grass. The fence company asks for the distance around the edge. The turf company asks for the space inside. Same garden, two completely different numbers. Why? (Three more shape topics orbit this star: Circles, Pythagoras and Solids.)",
    sections:[
      { title:"Perimeter: The Distance Around", body:"Perimeter is the total length of the boundary — if you walked all the way around the edge and measured every step, that total is the perimeter. For a rectangle, you walk the length twice and the width twice.",
        formula:"Perimeter of a Rectangle = 2 × (Length + Width)" },
      { title:"Area: The Space Inside", body:"Area measures how much surface is enclosed — how many unit squares could fit inside the shape. A rectangle’s area comes from multiplying its two dimensions, because you’re counting rows of squares stacked on top of each other.",
        formula:"Area of a Rectangle = Length × Width<br><br>Area of a Triangle = ½ × Base × Height" },
      { title:"Why They Don’t Move Together", body:"A long, thin rectangle and a short, wide one can share the exact same perimeter but enclose very different areas. Perimeter only cares about the edge; area cares about everything trapped inside it — that’s why a fence quote and a turf quote almost never match." },
      { title:"Triangles: Half a Rectangle", body:"Draw a rectangle around any triangle, using the triangle’s base and its perpendicular height. The triangle fills exactly half of it. That is why the area is ½ × base × height, and why sliding the top corner sideways doesn’t change the area: the base and the height stay the same.",
        example:"A triangle with base 10 and height 6 has area ½ × 10 × 6 = 30." },
      { title:"Angles in a Triangle", body:"The three angles of any triangle add up to 180°. To see why, draw a line through the top corner parallel to the base. The angles on that line match the two base angles, and together with the top angle they make a straight line, 180°.",
        formula:"A + B + C = 180°",
        example:"If two angles of a triangle are 50° and 60°, the third is 180° − 110° = 70°." }
    ],
    sim:{
      type:"geometry",
      canvasId:"geometryCanvas",
      title:"Experiment: Stretch the Rectangle",
      width:700, height:300,
      controls:[
        { id:"widthInput", label:"Width", min:2, max:16, value:8 },
        { id:"heightInput2", label:"Height", min:2, max:10, value:5 }
      ],
      readout:{ id:"geometryRead", label:"Perimeter / Area" }
    },
    gallery:{
      type:"trianglebuilder",
      canvasId:"triCanvas",
      title:"Experiment: Build a Triangle",
      width:700, height:360,
      controls:[
        { id:"triBase", label:"Base", min:3, max:14, value:10 },
        { id:"triHeight", label:"Height", min:2, max:10, value:6 },
        { id:"triApex", label:"Slide the top corner sideways", min:-5, max:15, value:3 }
      ],
      readout:{ id:"triRead", label:"Area and angles" },
      note:"Slide the top corner and watch two things: the angles change, yet the angles always sum to 180° and the area stays put."
    },
    mentalPicture:[
      "A shape has an edge and an inside",
      "Walk the whole edge — that total length is the perimeter",
      "Count the unit squares packed inside — that total is the area",
      "<strong>Same shape, two different questions: how far around, and how much space within</strong>"
    ],
    quiz:[
      { q:"A rectangle is 8m long and 3m wide. What is its perimeter?", options:[
        {t:"11m"}, {t:"22m", c:true}, {t:"24m"} ],
        why:"2 × (8 + 3) = 22 m." },
      { q:"A rectangle is 8m long and 3m wide. What is its area?", options:[
        {t:"22 square meters"}, {t:"11 square meters"}, {t:"24 square meters", c:true} ],
        why:"8 × 3 = 24 square metres." },
      { q:"Two rectangles have the exact same perimeter. Do they have to have the same area?", options:[
        {t:"Yes, always"},
        {t:"No — a long thin one and a short wide one can have very different areas", c:true},
        {t:"Only if they are squares"} ],
        why:"A 1 × 9 rectangle and a 5 × 5 rectangle both have perimeter 20, but their areas are 9 and 25." },
      { q:"The three angles of a triangle always add up to:", options:[
        {t:"90°"}, {t:"180°", c:true}, {t:"360°"} ],
        why:"This is true for every triangle, whatever its shape or size." },
      { q:"A triangle has base 10 and height 6. Its area is:", options:[
        {t:"60"}, {t:"30", c:true}, {t:"16"} ],
        why:"½ × 10 × 6 = 30. Forgetting the ½ gives the rectangle’s area, 60." },
      { q:"You slide a triangle’s top corner sideways, keeping the base and height fixed. Its area:", options:[
        {t:"Increases"}, {t:"Stays the same", c:true}, {t:"Doubles"} ],
        why:"Area depends only on the base and the perpendicular height, and neither has changed." }
    ]
  },
  {
    id:"circles",
    subject:"mathematics",
    orbit:{ around:"geometry", radius:75, angle:20, speed:26 },
    label:"Circles",
    chapter:"ATLAS ENTRY 12 • THE PERFECT CURVE • GRADES 7–10",
    title:"Circles & π",
    hook:"Measure the distance around any circle — a coin, a plate, a bicycle wheel — and divide it by the distance straight across. You get just over 3, every time. Why does one number show up in every circle ever drawn?",
    sections:[
      { title:"Parts of a Circle", body:"The <strong>radius</strong> r is the distance from the centre to the edge. The <strong>diameter</strong> d = 2r goes straight across through the centre. The <strong>circumference</strong> is the distance all the way around the edge." },
      { title:"Meeting π", body:"The number <strong>π</strong> (pi) is the ratio of any circle’s circumference to its diameter: about 3.14159. It is irrational, so its decimal never ends or repeats. Because the ratio is the same for every circle, one formula covers them all.",
        formula:"C = πd = 2πr",
        example:"A wheel with radius 35 cm has circumference 2 × 3.14 × 35 ≈ 220 cm. One full turn rolls it forward about 2.2 m." },
      { title:"Area: Slice and Rearrange", body:"Cut a circle into thin slices and lay them side by side, alternately pointing up and down. The result is nearly a rectangle. Its base is half the circumference, πr, and its height is r. So the area is πr × r.",
        formula:"A = πr²",
        example:"A pizza with radius 15 cm has area 3.14 × 225 ≈ 707 cm²." },
      { title:"Arcs and Sectors", body:"A <strong>sector</strong> is a slice of the circle with angle θ at the centre. It takes up the fraction θ/360 of the whole circle. Its curved edge is an <strong>arc</strong>.",
        formula:"Arc length = (θ/360) × 2πr<br>Sector area = (θ/360) × πr²",
        example:"A 90° sector of a circle with radius 10 has area ¼ × π × 100 ≈ 78.5." },
      { title:"Why Bigger Pizzas Are Such a Bargain", body:"Area depends on r², so doubling the radius makes the area four times as big. A 16-inch pizza has four times the area of an 8-inch pizza, even though it only looks twice as wide." }
    ],
    sim:{
      type:"circles",
      canvasId:"circlesCanvas",
      title:"Experiment: Slice and Rearrange",
      width:700, height:380,
      controls:[
        { id:"radiusInput", label:"Radius", min:1, max:10, value:5 },
        { id:"sliceCount", label:"Number of slices", min:4, max:48, step:4, value:16 }
      ],
      readout:{ id:"circlesRead", label:"Result" },
      note:"With few slices the rearranged shape is bumpy. With many, it becomes almost a perfect rectangle of width πr and height r."
    },
    gallery:{
      type:"sectors",
      canvasId:"sectorCanvas",
      title:"Experiment: Cut a Sector",
      width:700, height:320,
      controls:[
        { id:"secAngle", label:"Angle at the centre (degrees)", min:10, max:360, step:10, value:90 },
        { id:"secR", label:"Radius", min:1, max:10, value:6 }
      ],
      readout:{ id:"sectorRead", label:"Sector" }
    },
    mentalPicture:[
      "Measure around a circle and across it",
      "Around ÷ across is always π ≈ 3.14",
      "Slice and rearrange it into a rectangle: πr by r",
      "<strong>One number, π, ties the edge of every circle to its size</strong>"
    ],
    quiz:[
      { q:"A circle has radius 7 cm. Its diameter is:", options:[
        {t:"3.5 cm"}, {t:"14 cm", c:true}, {t:"49 cm"} ],
        why:"The diameter is twice the radius." },
      { q:"The circumference of a circle with radius 5 is:", options:[
        {t:"10π", c:true}, {t:"25π"}, {t:"5π"} ],
        why:"C = 2πr = 2 × π × 5 = 10π." },
      { q:"The area of a circle with radius 3 is:", options:[
        {t:"9π", c:true}, {t:"6π"}, {t:"3π"} ],
        why:"A = πr² = π × 3² = 9π. (6π is the circumference.)" },
      { q:"If you double a circle’s radius, its area becomes:", options:[
        {t:"2 times as big"}, {t:"4 times as big", c:true}, {t:"8 times as big"} ],
        why:"Area depends on r², and 2² = 4." },
      { q:"A sector with a 180° angle is what fraction of the circle?", options:[
        {t:"1/4"}, {t:"1/2", c:true}, {t:"1/3"} ],
        why:"180/360 = 1/2: a semicircle." }
    ]
  },
  {
    id:"pythagoras",
    subject:"mathematics",
    orbit:{ around:"geometry", radius:105, angle:140, speed:32 },
    label:"Pythagoras",
    chapter:"ATLAS ENTRY 13 • THE SQUARE ON EVERY SIDE • GRADES 8–10",
    title:"Pythagoras’ Theorem",
    hook:"A carpenter checks that a corner is perfectly square using only a tape: measure 3 along one wall, 4 along the other, and the distance between the two marks should be exactly 5. Why does that trick always work?",
    sections:[
      { title:"Right Triangles and Their Squares", body:"In a right triangle the longest side, opposite the right angle, is the <strong>hypotenuse</strong> c. Draw a square on each side. Pythagoras’ theorem says the two smaller squares together have exactly the same area as the biggest one.",
        formula:"a² + b² = c²" },
      { title:"Finding a Missing Side", body:"To find the hypotenuse, add the squares and take the square root. To find a shorter side, subtract instead. Always add when you look for the longest side and subtract when you look for a shorter one.",
        formula:"c = √(a² + b²)      a = √(c² − b²)",
        example:"Legs 6 and 8: c = √(36 + 64) = √100 = 10. Hypotenuse 13 and one leg 5: the other leg is √(169 − 25) = √144 = 12." },
      { title:"Pythagorean Triples", body:"Some sets of whole numbers fit the rule exactly: (3, 4, 5), (5, 12, 13), (8, 15, 17), and multiples such as (6, 8, 10). Builders and astronomers in Babylon, India and China used such relationships long before Pythagoras; the Sulba Sutras of ancient India state the rule explicitly." },
      { title:"The Converse: Is It a Right Angle?", body:"The theorem works backwards too. If a triangle’s sides satisfy a² + b² = c², then it must contain a right angle. That is why the 3-4-5 rope trick can be used to lay out a perfectly square corner." },
      { title:"Distance Between Two Points", body:"On a grid, the horizontal and vertical gaps between two points form the legs of a right triangle, and the straight-line distance is its hypotenuse.",
        formula:"d = √((x₂ − x₁)² + (y₂ − y₁)²)",
        example:"From (1, 2) to (4, 6): the gaps are 3 and 4, so the distance is 5." }
    ],
    sim:{
      type:"pythagoras",
      canvasId:"pythCanvas",
      title:"Experiment: Squares on the Sides",
      width:700, height:420,
      controls:[
        { id:"legA", label:"Leg a", min:1, max:12, value:3 },
        { id:"legB", label:"Leg b", min:1, max:12, value:4 }
      ],
      readout:{ id:"pythRead", label:"Check" }
    },
    gallery:{
      type:"ladder",
      canvasId:"ladderCanvas",
      title:"Experiment: The Ladder Problem",
      width:700, height:340,
      controls:[
        { id:"ladderLen", label:"Ladder length (m)", min:3, max:10, step:0.5, value:5 },
        { id:"ladderBase", label:"Distance of the foot from the wall (m)", min:0.5, max:9.5, step:0.5, value:3 }
      ],
      readout:{ id:"ladderRead", label:"Height reached" },
      note:"A ladder, the wall and the ground form a right triangle. A common safety guide places the ladder at about 75° to the ground."
    },
    mentalPicture:[
      "Draw a square on each side of a right triangle",
      "The two small squares’ areas add up to the big one",
      "So any two sides give you the third",
      "<strong>a² + b² = c² turns areas of squares into straight-line distances</strong>"
    ],
    quiz:[
      { q:"A right triangle has legs 5 and 12. What is the hypotenuse?", options:[
        {t:"13", c:true}, {t:"17"}, {t:"7"} ],
        why:"25 + 144 = 169 and √169 = 13." },
      { q:"The hypotenuse is 10 and one leg is 6. The other leg is:", options:[
        {t:"4"}, {t:"8", c:true}, {t:"16"} ],
        why:"For a leg, subtract: 100 − 36 = 64 and √64 = 8." },
      { q:"Which set of lengths can form a right triangle?", options:[
        {t:"4, 5, 6"}, {t:"6, 8, 10", c:true}, {t:"5, 7, 9"} ],
        why:"36 + 64 = 100 = 10². For the others, 16 + 25 ≠ 36 and 25 + 49 ≠ 81." },
      { q:"What is the distance from (0, 0) to (6, 8)?", options:[
        {t:"14"}, {t:"10", c:true}, {t:"48"} ],
        why:"√(6² + 8²) = √100 = 10." },
      { q:"In a right triangle the hypotenuse is always:", options:[
        {t:"The longest side", c:true}, {t:"The shortest side"}, {t:"Equal to the sum of the other two" } ],
        why:"It sits opposite the biggest angle, 90°. It is always shorter than the sum of the other two sides, though." }
    ]
  },
  {
    id:"solids",
    subject:"mathematics",
    orbit:{ around:"geometry", radius:75, angle:260, speed:28 },
    label:"Solids",
    chapter:"ATLAS ENTRY 14 • FILLING SPACE • GRADES 8–10",
    title:"Volume & Surface Area",
    hook:"You need to paint a water tank and also know how much water it holds. Painting only touches the outside; filling uses the inside. Same tank, two different measurements. Which is which, and how do you work them out?",
    sections:[
      { title:"Volume: The Space Inside", body:"<strong>Volume</strong> counts how many unit cubes fit inside a solid, measured in cubic units (cm³, m³). For a cuboid, imagine stacking layers: each layer has length × width cubes, and there are as many layers as the height.",
        formula:"Volume of a cuboid = l × w × h",
        example:"A tank 5 m × 3 m × 4 m holds 60 m³, which is 60,000 litres." },
      { title:"Surface Area: The Wrapping", body:"<strong>Surface area</strong> is the total area of all the faces, the amount of paper needed to wrap the solid. A cuboid has three pairs of identical rectangles.",
        formula:"Surface area = 2(lw + lh + wh)",
        example:"For 5 × 3 × 4: 2(15 + 20 + 12) = 94 m²." },
      { title:"Prisms: Base × Height", body:"A prism has the same cross-section all the way along its length. Its volume is the area of that cross-section multiplied by the length.",
        formula:"Volume of a prism = (area of base) × height",
        example:"A triangular prism whose triangle has area 6 cm² and whose length is 10 cm has volume 60 cm³." },
      { title:"Cylinders", body:"A cylinder is a circle stretched upwards, so its volume is the circle’s area times the height. Its curved wall unrolls into a rectangle that is 2πr wide and h tall. Add the two circular lids to get the total.",
        formula:"V = πr²h<br>Curved area = 2πrh<br>Total area = 2πrh + 2πr²",
        example:"For r = 3 and h = 6: V = π × 9 × 6 ≈ 169.6 cm³." },
      { title:"Why Volume Outgrows Surface", body:"Double every edge of a cube and each face grows by 2² = 4 times, so the surface area is 4 times larger. But the volume grows by 2³ = 8 times. Small animals have more surface for their volume, so they lose body heat faster than big ones." }
    ],
    sim:{
      type:"solids",
      canvasId:"solidsCanvas",
      title:"Experiment: Build a Box",
      width:700, height:360,
      controls:[
        { id:"boxL", label:"Length", min:1, max:10, value:5 },
        { id:"boxW", label:"Width", min:1, max:8, value:3 },
        { id:"boxH", label:"Height", min:1, max:8, value:4 }
      ],
      readout:{ id:"solidsRead", label:"Result" }
    },
    gallery:{
      type:"cylinder",
      canvasId:"cylCanvas",
      title:"Experiment: Unroll a Cylinder",
      width:700, height:330,
      controls:[
        { id:"cylR", label:"Radius", min:1, max:8, value:3 },
        { id:"cylH", label:"Height", min:1, max:12, value:6 }
      ],
      readout:{ id:"cylRead", label:"Result" }
    },
    mentalPicture:[
      "Fill a box with unit cubes: that count is the volume",
      "Wrap it in paper: that area is the surface area",
      "A cylinder unrolls into a rectangle plus two circles",
      "<strong>Volume measures the inside, surface area measures the outside</strong>"
    ],
    quiz:[
      { q:"A box measures 4 cm × 5 cm × 3 cm. What is its volume?", options:[
        {t:"60 cm³", c:true}, {t:"47 cm³"}, {t:"12 cm³"} ],
        why:"4 × 5 × 3 = 60." },
      { q:"What is the surface area of a cube with edges of 2?", options:[
        {t:"8"}, {t:"24", c:true}, {t:"12"} ],
        why:"A cube has 6 faces, each 2 × 2 = 4, so 6 × 4 = 24." },
      { q:"The volume of a cylinder with radius 2 and height 5 is:", options:[
        {t:"20π", c:true}, {t:"10π"}, {t:"4π"} ],
        why:"πr²h = π × 4 × 5 = 20π." },
      { q:"If you double every edge of a cube, its volume becomes:", options:[
        {t:"2 times as big"}, {t:"4 times as big"}, {t:"8 times as big", c:true} ],
        why:"Volume depends on three lengths, so it grows by 2 × 2 × 2 = 8." },
      { q:"To work out how much paint a tank needs, you want its:", options:[
        {t:"Volume"}, {t:"Surface area", c:true}, {t:"Perimeter"} ],
        why:"Paint covers the outside surface. Volume tells you how much the tank holds." }
    ]
  },
  {
    id:"trigonometry",
    subject:"mathematics",
    pos:{ top:800, left:"38%" },
    label:"Trigonometry",
    chapter:"ATLAS ENTRY 15 • THE ANGLES THAT MEASURE THE WORLD • GRADES 9–12",
    title:"Trigonometry",
    hook:"You want to know how tall a tree is without climbing it. You stand back, measure the angle from your eye to the treetop, and measure your distance from the trunk. That’s it — you can now calculate the height. How?",
    sections:[
      { title:"The Right Triangle’s Three Sides", body:"Every right triangle has a <strong>hypotenuse</strong> (the longest side, opposite the right angle), an <strong>opposite</strong> side (across from the angle you care about), and an <strong>adjacent</strong> side (next to that angle, but not the hypotenuse). Which side is “opposite” depends on which angle you’re looking from." },
      { title:"Sine, Cosine, Tangent", body:"These three ratios compare two sides of the triangle for a given angle. They don’t change no matter how big or small the triangle is drawn — only the angle matters. That’s what makes them so powerful: measure one angle and one length, and the rest of the triangle follows.",
        formula:"sin(angle) = Opposite ÷ Hypotenuse<br>cos(angle) = Adjacent ÷ Hypotenuse<br>tan(angle) = Opposite ÷ Adjacent" },
      { title:"A Memory Trick", body:"Remember the three ratios as <strong>SOH – CAH – TOA</strong>: Sine = Opposite over Hypotenuse, Cosine = Adjacent over Hypotenuse, Tangent = Opposite over Adjacent. Pick the ratio that contains the side you know and the side you want." },
      { title:"Worked Example: The Tree", body:"You stand 20 m from the base of a tree, and the angle up to its top is 35°. You know the adjacent side (20 m) and want the opposite side (the height), so use tangent: tan 35° = height ÷ 20.",
        formula:"height = 20 × tan 35° ≈ 20 × 0.70 = 14 m",
        example:"Add the height of your eyes above the ground to get the full height of the tree. At 45° the height would be exactly 20 m, because tan 45° = 1." },
      { title:"Going Around the Circle", body:"Draw a circle of radius 1. A point at angle θ has coordinates (cos θ, sin θ), so cosine is the width and sine is the height of a point moving around the circle. As θ goes all the way round, sin θ traces a smooth wave that repeats every 360°, the same shape as sound waves and alternating current." },
      { title:"Why It Matters", body:"Surveyors, sailors, and astronomers have used these ratios for centuries to measure distances they could never physically walk — the height of a mountain, the width of a river, the distance to a star. Angle in, distance out." }
    ],
    sim:{
      type:"trigonometry",
      canvasId:"trigonometryCanvas",
      title:"Experiment: Tilt the Triangle",
      width:700, height:320,
      controls:[
        { id:"angleInput", label:"Angle (degrees)", min:5, max:80, value:35 }
      ],
      readout:{ id:"trigRead", label:"sin / cos / tan of this angle" }
    },
    gallery:{
      type:"unitcircle",
      canvasId:"unitCanvas",
      title:"Experiment: Around the Unit Circle",
      width:700, height:340,
      controls:[
        { id:"ucAngle", label:"Angle θ (degrees)", min:0, max:360, value:40 }
      ],
      readout:{ id:"unitRead", label:"Values" },
      note:"The violet vertical segment is sin θ and the teal horizontal one is cos θ. The waves on the right record both as the angle grows."
    },
    mentalPicture:[
      "A right triangle has a fixed corner and a swinging angle",
      "As the angle grows, the opposite side stretches taller",
      "The ratios of the sides never lie, no matter the triangle’s size",
      "<strong>Trigonometry turns one measured angle into every other measurement you need</strong>"
    ],
    quiz:[
      { q:"In a right triangle, the longest side — opposite the right angle — is called the:", options:[
        {t:"Adjacent"}, {t:"Opposite"}, {t:"Hypotenuse", c:true} ],
        why:"The hypotenuse always faces the right angle." },
      { q:"sin(angle) is defined as:", options:[
        {t:"Adjacent ÷ Hypotenuse"}, {t:"Opposite ÷ Hypotenuse", c:true}, {t:"Opposite ÷ Adjacent"} ],
        why:"SOH: Sine = Opposite ÷ Hypotenuse. The other two are cosine and tangent." },
      { q:"As the angle in a right triangle increases toward 90°, what happens to the opposite side (with the hypotenuse fixed)?", options:[
        {t:"It shrinks toward zero"}, {t:"It grows longer, approaching the hypotenuse’s length", c:true}, {t:"It stays exactly the same"} ],
        why:"sin θ climbs toward 1, so the opposite side approaches the full hypotenuse length." },
      { q:"In SOH-CAH-TOA, what does CAH stand for?", options:[
        {t:"Cosine = Adjacent ÷ Hypotenuse", c:true}, {t:"Cosine = Opposite ÷ Adjacent"}, {t:"Cosine = Hypotenuse ÷ Adjacent"} ],
        why:"C-A-H: Cosine, Adjacent, Hypotenuse." },
      { q:"From 20 m away, the angle up to the top of a tree is 45°. Ignoring eye height, how tall is the tree?", options:[
        {t:"20 m", c:true}, {t:"10 m"}, {t:"28.3 m"} ],
        why:"tan 45° = 1, so height = 20 × 1 = 20 m." },
      { q:"On the unit circle, what is sin 90°?", options:[
        {t:"0"}, {t:"1", c:true}, {t:"−1"} ],
        why:"At 90° the point is at the very top of the circle, where its height is 1." }
    ]
  },
  {
    id:"probability",
    subject:"mathematics",
    pos:{ top:750, left:"60%" },
    label:"Probability",
    chapter:"ATLAS ENTRY 16 • THE MATHEMATICS OF CHANCE • GRADES 7–12",
    title:"Probability",
    hook:"A friend offers you a bet: roll a 20-sided die, and if it lands on one of your five chosen numbers, you win. Is that a good bet? Chance isn’t just a feeling — it’s something you can calculate exactly.",
    sections:[
      { title:"What Is Probability?", body:"Probability measures how likely something is to happen, as a fraction of all the equally possible outcomes. If 5 out of 20 faces would make you win, your chance of winning is 5 out of 20 — nothing mysterious about it.",
        formula:"Probability = Favorable Outcomes ÷ Total Possible Outcomes" },
      { title:"Certain, Impossible, and Everything Between", body:"Probability always sits between 0 and 1 (or 0% and 100%). A probability of 0 means it simply cannot happen. A probability of 1 means it is guaranteed. Everything else — a coin landing heads, a die rolling a six — sits somewhere in between." },
      { title:"The Complement: “Not” an Event", body:"Either something happens or it doesn’t, so the two chances add up to 1. That gives a handy shortcut: the probability of an event not happening is 1 minus the probability that it does.",
        formula:"P(not A) = 1 − P(A)",
        example:"The chance of rolling a 6 on a fair die is 1/6, so the chance of not rolling a 6 is 5/6." },
      { title:"Independent Events", body:"Flip a coin twice. The first flip doesn’t influence the second at all — each flip is an <strong>independent event</strong>. To find the chance of two independent events both happening, multiply their individual probabilities together. A coin has no memory: after five heads in a row, the next flip is still 1/2." },
      { title:"The Law of Large Numbers", body:"A short run of flips can stray far from the true chance. But as the number of trials grows, the share of heads settles down close to the true probability. That’s why a casino can’t predict one spin but can predict a million." }
    ],
    sim:{
      type:"probability",
      canvasId:"probabilityCanvas",
      title:"Experiment: Spin the Wheel",
      width:500, height:320,
      controls:[
        { id:"sidesInput", label:"Total Sections", min:2, max:16, value:8 },
        { id:"winInput", label:"Winning Sections", min:1, max:16, value:3 }
      ],
      readout:{ id:"probRead", label:"Chance of winning" }
    },
    gallery:{
      type:"lawlarge",
      canvasId:"lawCanvas",
      title:"Experiment: Flip Many Coins",
      width:700, height:340,
      controls:[
        { id:"lawFlips", label:"Number of flips", min:1, max:1000, value:20 },
        { id:"lawP", label:"True chance of heads (%)", min:10, max:90, step:5, value:50 },
        { id:"lawSeed", label:"Experiment number", min:1, max:9, value:1 }
      ],
      readout:{ id:"lawRead", label:"Result" },
      note:"Change the experiment number to repeat the whole run with different luck. With few flips the lines differ wildly; with 1000 they all crowd around the true chance."
    },
    mentalPicture:[
      "A wheel is split into equal sections",
      "Some sections are marked as wins, the rest as losses",
      "The chance of winning is just wins divided by total sections",
      "<strong>Probability is nothing more than counting favorable outcomes against every possible one</strong>"
    ],
    quiz:[
      { q:"A bag has 10 marbles, 4 of them red. What’s the probability of pulling a red marble?", options:[
        {t:"4/10 (or 2/5)", c:true}, {t:"10/4"}, {t:"6/10"} ],
        why:"4 favourable outcomes out of 10 possible ones." },
      { q:"A probability of exactly 1 means an event is:", options:[
        {t:"Impossible"}, {t:"Guaranteed to happen", c:true}, {t:"50-50"} ],
        why:"1 means 100%: it will certainly happen." },
      { q:"You flip a fair coin twice. What is the probability of getting heads both times?", options:[
        {t:"1/2"}, {t:"1/4, because you multiply 1/2 × 1/2", c:true}, {t:"1"} ],
        why:"Independent events: multiply the chances, 1/2 × 1/2 = 1/4." },
      { q:"What is the chance of not rolling a 6 on a fair die?", options:[
        {t:"1/6"}, {t:"5/6", c:true}, {t:"1/2"} ],
        why:"1 − 1/6 = 5/6." },
      { q:"A fair coin has landed heads five times in a row. The chance the next flip is heads is:", options:[
        {t:"Higher than 1/2"}, {t:"Lower than 1/2, it’s due for tails"}, {t:"Still exactly 1/2", c:true} ],
        why:"Each flip is independent. The coin has no memory of the earlier flips." },
      { q:"As you flip a fair coin more and more times, the share of heads:", options:[
        {t:"Is exactly 50% after 10 flips"}, {t:"Settles close to 50%", c:true}, {t:"Keeps drifting further away" } ],
        why:"This is the law of large numbers: long-run frequencies approach the true probability." }
    ]
  },
  {
    id:"statistics",
    subject:"mathematics",
    pos:{ top:810, left:"80%" },
    label:"Statistics",
    chapter:"ATLAS ENTRY 17 • THE SHAPE OF DATA • GRADES 8–12",
    title:"Statistics",
    hook:"Five students take a test: 40, 85, 88, 90, 92. One classmate says “the class did great, everyone scored in the high 80s and 90s!” Are they right? A single number that summarizes a whole data set can hide as much as it reveals.",
    sections:[
      { title:"Mean: The Balancing Point", body:"The mean (average) is found by adding every value together and dividing by how many values there are. It’s the point where the data would balance perfectly, like a seesaw — but a single extreme value, like that 40, can drag it far from where most of the data sits.",
        formula:"Mean = (Sum of all values) ÷ (Number of values)" },
      { title:"Median: The Middle Value", body:"The median is the value sitting exactly in the middle when all the data is lined up in order. Unlike the mean, one extreme score barely budges it — which is why the median often gives a fairer picture of “typical” when the data has outliers. With an even number of values, take the average of the middle two." },
      { title:"Mode: The Most Frequent", body:"The mode is simply whichever value appears most often in the data set. A class where most students scored exactly 85 has a mode of 85, even if the mean and median land somewhere else entirely." },
      { title:"Range and Spread", body:"Two sets of data can share the same mean and still tell very different stories. The <strong>range</strong> is the highest value minus the lowest. A more refined measure is the <strong>standard deviation</strong>, written σ: roughly, how far a typical value sits from the mean. Small σ means the data is tightly bunched; large σ means it is scattered.",
        example:"Marks 4, 9, 9, 12, 16 have a range of 16 − 4 = 12. Marks 9, 10, 10, 10, 11 have a range of only 2, so the second class is far more consistent." },
      { title:"Choosing the Right Average", body:"When the data is roughly symmetric, the mean is a fine summary. When a few huge values pull it sideways, as with incomes or house prices, the median describes a typical person better. The mode is the natural choice for categories, such as the most common shoe size." }
    ],
    sim:{
      type:"statistics",
      canvasId:"statisticsCanvas",
      title:"Experiment: Reshape the Data",
      width:700, height:320,
      controls:[
        { id:"d1", label:"Score 1", min:0, max:20, value:4 },
        { id:"d2", label:"Score 2", min:0, max:20, value:9 },
        { id:"d3", label:"Score 3", min:0, max:20, value:9 },
        { id:"d4", label:"Score 4", min:0, max:20, value:12 },
        { id:"d5", label:"Score 5", min:0, max:20, value:16 }
      ],
      readout:{ id:"statsRead", label:"Mean / Median / Mode" }
    },
    gallery:{
      type:"spread",
      canvasId:"spreadCanvas",
      title:"Experiment: Same Mean, Different Story",
      width:700, height:330,
      controls:[
        { id:"spreadB", label:"How scattered is Class B?", min:0, max:10, step:0.5, value:5 }
      ],
      readout:{ id:"spreadRead", label:"Summary" },
      note:"Class A is always tightly bunched. Class B keeps the same mean but its marks spread out as you raise the slider."
    },
    mentalPicture:[
      "A handful of scattered data points",
      "The mean is where they’d balance if placed on a seesaw",
      "The median is the value sitting in the middle, once lined up in order",
      "<strong>One outlier can drag the mean away, but barely touches the median</strong>"
    ],
    quiz:[
      { q:"Data set: 40, 85, 88, 90, 92. Which measure is dragged furthest from “typical” by the 40?", options:[
        {t:"The mean", c:true}, {t:"The median"}, {t:"Neither is affected"} ],
        why:"The mean uses every value, so the 40 pulls it down to 79, while the median stays at 88." },
      { q:"In the data set 3, 3, 3, 7, 9, the mode is:", options:[
        {t:"9"}, {t:"3, because it appears most often", c:true}, {t:"5, the average"} ],
        why:"The mode is the most frequent value." },
      { q:"Data set: 2, 4, 6, 8, 10. What is the median?", options:[
        {t:"4"}, {t:"6, the middle value once ordered", c:true}, {t:"10"} ],
        why:"With five ordered values, the middle one is the third: 6." },
      { q:"What is the range of 4, 9, 9, 12, 16?", options:[
        {t:"12", c:true}, {t:"9"}, {t:"16"} ],
        why:"Highest minus lowest: 16 − 4 = 12." },
      { q:"Two classes have the same mean, but Class B’s marks are much more spread out. What does that tell you?", options:[
        {t:"The classes performed identically"}, {t:"Class B’s results are less predictable, with more very high and very low marks", c:true}, {t:"Class B must have a higher median" } ],
        why:"The mean alone hides the spread. A larger σ means a wider scatter around the same average." },
      { q:"Which average best describes typical income in a town where a few people earn enormous amounts?", options:[
        {t:"The mean"}, {t:"The median", c:true}, {t:"The mode"} ],
        why:"A few huge incomes drag the mean upward; the median isn’t pulled by extreme values." }
    ]
  }
);
