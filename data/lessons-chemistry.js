/* MindSky lessons: chemistry */
LESSONS.push(
  /* ==================== CHEMISTRY ==================== */
  {
    id:"matter-states",
    subject:"chemistry",
    pos:{ top:60, left:"5%" },
    label:"States of Matter",
    chapter:"ATLAS ENTRY 01 • SOLID, LIQUID, GAS • GRADES 6–8",
    title:"States of Matter",
    hook:"Ice, water and steam are the same substance. Nothing is added or taken away from the water itself, yet one can be cut with a knife, one pours, and one fills the whole kitchen. What actually changes when you heat it?",
    sections:[
      { title:"Everything Is Particles", body:"All matter is made of tiny particles that are always moving. In a <strong>solid</strong> the particles are packed tightly in fixed places and can only vibrate. In a <strong>liquid</strong> they are still touching, but they slide past each other, which is why liquids pour and take the shape of their container. In a <strong>gas</strong> they are far apart and fly around freely, so a gas spreads out to fill whatever space it is given." },
      { title:"Heat Is Movement", body:"When you heat a substance, its particles move faster. Temperature is a measure of how fast they are moving on average. Give a solid enough energy and the particles shake loose from their places: it <strong>melts</strong>. Give a liquid enough and the particles escape from each other: it <strong>boils</strong>. Take energy away and the changes run backwards: gas condenses to liquid, and liquid freezes to solid.",
        example:"Ice at −10 °C warms up to 0 °C and then stops getting warmer, even though the stove is still on. All the energy is now going into pulling particles out of the crystal. Only once all the ice has melted does the temperature start to rise again." },
      { title:"Melting and Boiling Points", body:"Every pure substance has its own melting point and boiling point. They depend on how strongly the particles hold on to each other. Water melts at 0 °C and boils at 100 °C. Iron needs 1538 °C to melt. Oxygen is already a gas at room temperature and only turns to liquid below −183 °C. Stronger attraction between particles means higher melting and boiling points.",
        formula:"melting: solid → liquid     boiling: liquid → gas" },
      { title:"Why a Gas Presses on Its Container", body:"The particles of a gas keep hitting the walls of whatever holds them. Each hit is tiny, but there are billions every second, and together they push on the wall. That push is <strong>gas pressure</strong>. Pump more air into a bicycle tyre and more particles hit the inside, so it gets harder." },
      { title:"Is Anything Between the Particles?", body:"No. The space between particles is empty. This is why a gas can be squashed into a much smaller volume, while a liquid or solid hardly changes size. The particles themselves do not get smaller; the gaps between them do." }
    ],
    sim:{
      type:"matterstates",
      canvasId:"matterCanvas",
      title:"Experiment: Heat the Particles",
      width:700, height:360,
      controls:[
        { id:"chTemp", label:"Heat (0 = frozen, 100 = very hot)", min:0, max:100, value:10 }
      ],
      readout:{ id:"matterRead", label:"State" },
      note:"Slide the heat up slowly. Around 30 the particles break out of their places, and around 70 they escape the liquid altogether."
    },
    gallery:{
      type:"heatcurve",
      canvasId:"heatCurveCanvas",
      title:"Experiment: Warming 1 g of Water",
      width:700, height:330,
      controls:[
        { id:"chHeatJ", label:"Heat added to 1 g of ice at −20 °C (joules)", min:0, max:3100, step:20, value:0 }
      ],
      readout:{ id:"heatCurveRead", label:"Temperature" },
      note:"The flat parts are melting and boiling. Boiling needs far more energy than melting, about 2260 J for every gram, because the particles have to be pulled completely apart."
    },
    mentalPicture:[
      "A solid is a crowd standing still and shivering",
      "A liquid is the same crowd, shuffling past each other",
      "A gas is the crowd running everywhere, rarely touching",
      "<strong>Heating a substance just makes its particles move faster and escape from each other</strong>"
    ],
    quiz:[
      { q:"What happens to the particles of a solid when it is heated until it melts?", options:[
        {t:"They get bigger"}, {t:"They move faster and break out of their fixed places", c:true}, {t:"They disappear"} ],
        why:"The particles themselves do not change. They gain energy, vibrate more, and eventually slide past each other." },
      { q:"Ice is melting in a glass and the thermometer stays at 0 °C. Where is the energy going?", options:[
        {t:"Into breaking the ice crystal apart", c:true}, {t:"Nowhere, it is lost"}, {t:"Into making the water colder"} ],
        why:"During melting, the energy goes into freeing particles from the crystal, not into raising the temperature." },
      { q:"Why can a gas be squashed into a smaller space much more easily than a liquid?", options:[
        {t:"Gas particles are softer"}, {t:"There are large gaps between gas particles", c:true}, {t:"Gas particles are lighter than liquid particles"} ],
        why:"The particles in a liquid are already touching. In a gas the gaps are big, so there is room to push them closer." },
      { q:"What causes the pressure of a gas inside a closed container?", options:[
        {t:"Particles hitting the walls", c:true}, {t:"The gas being heavy"}, {t:"Particles sticking to each other"} ],
        why:"Billions of tiny collisions with the walls each second add up to a steady push." }
    ]
  },
  {
    id:"atoms",
    subject:"chemistry",
    pos:{ top:210, left:"21%" },
    label:"Atoms",
    chapter:"ATLAS ENTRY 02 • WHAT EVERYTHING IS MADE OF • GRADES 7–9",
    title:"Inside the Atom",
    hook:"A full stop on this page contains billions of atoms. Even so, each atom is almost completely empty space, with a dense speck at the middle and a few tiny electrons far outside. If you could build an atom the size of a stadium, its nucleus would be about the size of a pea.",
    sections:[
      { title:"Three Particles", body:"An atom has three kinds of particle. <strong>Protons</strong> carry a positive charge and <strong>neutrons</strong> carry none; both sit in the tiny central <strong>nucleus</strong> and make up almost all the mass. <strong>Electrons</strong> carry a negative charge, have almost no mass, and move around the nucleus in regions called shells.",
        formula:"proton: +1     neutron: 0     electron: −1" },
      { title:"Atomic Number Decides the Element", body:"The number of protons is called the <strong>atomic number</strong>, and it is what makes an atom the element it is. Every atom with 1 proton is hydrogen, every atom with 6 is carbon, every atom with 8 is oxygen. Change the number of protons and you have a different element. A normal atom has as many electrons as protons, so the charges cancel and it is neutral.",
        example:"Sodium has atomic number 11. So a neutral sodium atom has 11 protons and 11 electrons." },
      { title:"Mass Number and Isotopes", body:"The <strong>mass number</strong> is the number of protons plus neutrons. Atoms of one element can have different numbers of neutrons. These versions are called <strong>isotopes</strong>. Carbon-12 has 6 neutrons and carbon-14 has 8, but both have 6 protons, so both are carbon. Carbon-14 is slightly radioactive, which is how archaeologists date ancient wood and bones.",
        formula:"neutrons = mass number − atomic number",
        example:"Chlorine-37 has mass number 37 and atomic number 17, so it has 37 − 17 = 20 neutrons." },
      { title:"Electrons Live in Shells", body:"Electrons are arranged in shells around the nucleus. The first shell holds up to 2 electrons, the second up to 8, and the third up to 8 again for the first twenty elements. Electrons fill the inner shells first. Sodium has 11 electrons, arranged 2, 8, 1. The last shell matters most, because those outer electrons decide how the atom behaves in reactions.",
        formula:"shell capacity:  2, 8, 8, …" },
      { title:"Ions: Atoms That Gained or Lost Electrons", body:"Atoms can lose or gain electrons without changing their nucleus. An atom that loses an electron has one more proton than electrons, so it has a charge of +1. One that gains an electron has a charge of −1. Charged atoms are called <strong>ions</strong>. Sodium easily loses its single outer electron and becomes Na⁺. Chlorine easily gains one and becomes Cl⁻.",
        example:"A magnesium atom (12 protons) loses 2 electrons. It now has 12 protons and 10 electrons, so its charge is +2." }
    ],
    sim:{
      type:"atomBuilder",
      canvasId:"atomCanvas",
      title:"Experiment: Build an Atom",
      width:700, height:400,
      controls:[
        { id:"chProtons", label:"Protons", min:1, max:20, value:6 },
        { id:"chNeutrons", label:"Neutrons", min:0, max:22, value:6 },
        { id:"chCharge", label:"Charge (positive = electrons lost, negative = gained)", min:-3, max:3, value:0 }
      ],
      readout:{ id:"atomRead", label:"This atom" },
      note:"Changing the protons changes the element. Changing the neutrons makes a different isotope. Changing the charge adds or removes electrons."
    },
    mentalPicture:[
      "A pea at the centre of a stadium: the nucleus",
      "A few specks of dust circling far out in the stands: the electrons",
      "The number of protons is the atom's name tag",
      "<strong>Same protons means same element; different neutrons means a different isotope; different electrons means an ion</strong>"
    ],
    quiz:[
      { q:"An atom has 8 protons, 8 neutrons and 8 electrons. Which element is it?", options:[
        {t:"Oxygen", c:true}, {t:"Carbon"}, {t:"Neon"} ],
        why:"The number of protons decides the element, and 8 protons is oxygen." },
      { q:"How many neutrons does carbon-14 have (carbon has atomic number 6)?", options:[
        {t:"6"}, {t:"8", c:true}, {t:"14"} ],
        why:"Neutrons = mass number − atomic number = 14 − 6 = 8." },
      { q:"A neutral atom has 11 electrons. How are they arranged in shells?", options:[
        {t:"2, 8, 1", c:true}, {t:"8, 3"}, {t:"2, 9"} ],
        why:"The first shell holds 2 and the second holds 8, which uses 10 electrons. The last one goes alone into the third shell." },
      { q:"A fluorine atom (9 protons) gains one electron. What is its charge?", options:[
        {t:"+1"}, {t:"0"}, {t:"−1", c:true} ],
        why:"It now has 9 protons (+9) and 10 electrons (−10), which adds up to −1." },
      { q:"Which two atoms are isotopes of each other?", options:[
        {t:"6 protons, 6 neutrons and 6 protons, 8 neutrons", c:true}, {t:"6 protons, 6 neutrons and 7 protons, 6 neutrons"}, {t:"8 protons, 8 neutrons and 6 protons, 8 neutrons"} ],
        why:"Isotopes have the same number of protons but different numbers of neutrons." }
    ]
  },
  {
    id:"periodic-table",
    subject:"chemistry",
    pos:{ top:60, left:"37%" },
    label:"Periodic Table",
    chapter:"ATLAS ENTRY 03 • THE MAP OF THE ELEMENTS • GRADES 8–10",
    title:"The Periodic Table",
    hook:"In 1869 the Russian chemist Dmitri Mendeleev wrote the known elements on cards and laid them out in rows by weight. Similar elements kept landing in the same column. He found it so reliable that he left gaps for elements nobody had found yet, and predicted what they would be like. Years later, they were discovered, and he was right.",
    sections:[
      { title:"Reading the Table", body:"The modern table lists the elements in order of atomic number. Each horizontal row is a <strong>period</strong>. Each vertical column is a <strong>group</strong>. Elements in the same group behave in similar ways. The table is a map: where an element sits tells you a lot about it before you ever see it in a lab." },
      { title:"Periods Count Shells, Groups Count Outer Electrons", body:"The period number is the number of electron shells the atom is using. The group tells you how many electrons are in the outer shell (for groups 1, 2 and 13–18, the last digit). Sodium is in period 3 and group 1, so it has 3 shells and 1 outer electron. Chlorine is in period 3 and group 17, so 3 shells and 7 outer electrons.",
        formula:"period = number of shells     group (1, 2, 13–18) → outer electrons",
        example:"Where is carbon? Its electrons are 2, 4: two shells, four in the outer one. So it is in period 2, group 14." },
      { title:"Metals and Non-Metals", body:"Most elements are metals. They are on the left and in the middle of the table. Metals are shiny, conduct heat and electricity, and tend to lose electrons. Non-metals are on the right. They are usually dull, do not conduct, and tend to gain electrons. Hydrogen sits at the top left but is a non-metal." },
      { title:"Families Worth Knowing", body:"Group 1, the <strong>alkali metals</strong>, are soft and react violently with water. Group 17, the <strong>halogens</strong>, are very reactive non-metals. Group 18, the <strong>noble gases</strong>, hardly react at all, because their outer shells are already full. That is the real reason elements react: atoms tend to reach a full outer shell, by losing, gaining or sharing electrons." },
      { title:"Trends Across a Period", body:"Moving left to right across a period, the atoms get slightly smaller. Each step adds one proton, which pulls the same shell of electrons in more tightly. It also gets harder to remove an electron: the energy needed (the <strong>ionisation energy</strong>) generally climbs. Moving down a group does the opposite: more shells, so bigger atoms that lose an electron more easily." }
    ],
    sim:{
      type:"periodicTable",
      canvasId:"periodicCanvas",
      title:"Experiment: Explore the First 20 Elements",
      width:700, height:360,
      controls:[
        { id:"chElem", label:"Atomic number", min:1, max:20, value:11 },
        { id:"chView", label:"Colour by (0 = metal type, 1 = outer electrons, 2 = shells)", min:0, max:2, value:0 }
      ],
      readout:{ id:"periodicRead", label:"Element" },
      note:"Watch how the outer electron count repeats down each group. Switch to view 1 and the columns line up perfectly."
    },
    gallery:{
      type:"trends",
      canvasId:"trendCanvas",
      title:"Experiment: Trends Across a Period",
      width:700, height:330,
      controls:[
        { id:"chPeriod", label:"Period (2 or 3)", min:2, max:3, value:2 },
        { id:"chTrend", label:"Show (0 = atom size, 1 = energy to remove an electron)", min:0, max:1, value:0 }
      ],
      readout:{ id:"trendRead", label:"Pattern" },
      note:"Atoms shrink across a period, and the energy needed to pull an electron off rises, with two small dips at boron and oxygen (and their period 3 neighbours)."
    },
    mentalPicture:[
      "Each row is a floor with one more shell added",
      "Each column is a family with the same number of outer electrons",
      "The right-hand column has full outer shells and never needs to react",
      "<strong>Elements react because they are trying to reach a full outer shell</strong>"
    ],
    quiz:[
      { q:"An element is in period 3 and group 2. How many electron shells and outer electrons does it have?", options:[
        {t:"3 shells, 2 outer electrons", c:true}, {t:"2 shells, 3 outer electrons"}, {t:"3 shells, 3 outer electrons"} ],
        why:"The period is the number of shells and the group (for group 2) is the number of outer electrons. This is magnesium: 2, 8, 2." },
      { q:"Why are the noble gases so unreactive?", options:[
        {t:"They are too light"}, {t:"Their outer shells are already full", c:true}, {t:"They have no electrons"} ],
        why:"A full outer shell is the stable arrangement other atoms are trying to reach. Noble gases already have it." },
      { q:"Sodium and potassium are both soft metals that react with water. Why are they similar?", options:[
        {t:"They are in the same group, so each has one outer electron", c:true}, {t:"They are in the same period"}, {t:"They have the same mass"} ],
        why:"Elements in the same group have the same number of outer electrons, which is what controls how they react." },
      { q:"Going across a period from left to right, what happens to the size of the atoms?", options:[
        {t:"They get bigger"}, {t:"They get smaller", c:true}, {t:"They stay exactly the same"} ],
        why:"One more proton is added at every step, but the electrons stay in the same shell, so the nucleus pulls them in more tightly." }
    ]
  },
  {
    id:"bonding",
    subject:"chemistry",
    pos:{ top:60, left:"56%" },
    label:"Chemical Bonding",
    chapter:"ATLAS ENTRY 04 • HOW ATOMS STICK TOGETHER • GRADES 8–10",
    title:"Chemical Bonding",
    hook:"Sodium is a soft metal that explodes in water. Chlorine is a poisonous green gas. Put them together and you get table salt, which you sprinkle on chips. Atoms bond because joining up leaves them more stable than staying alone, and how they join decides what the new substance is like.",
    sections:[
      { title:"Why Atoms Bond", body:"Atoms are most stable when their outer shell is full. Most atoms do not start with a full shell, so they get one by losing, gaining or sharing electrons. Whatever they do, the result is a <strong>chemical bond</strong>: a strong attraction holding atoms together." },
      { title:"Ionic Bonding: Transfer", body:"When a metal meets a non-metal, the metal hands over its outer electrons. Sodium (2, 8, 1) gives one electron to chlorine (2, 8, 7). Sodium becomes Na⁺ and chlorine becomes Cl⁻, and the opposite charges attract strongly. Millions of these ions pack into a regular lattice, which is a salt crystal. Ionic compounds have high melting points, and they conduct electricity only when melted or dissolved, because then the ions are free to move.",
        formula:"Na  →  Na⁺ + e⁻          Cl + e⁻  →  Cl⁻",
        example:"Magnesium (2, 8, 2) meets oxygen (2, 6). Magnesium gives away 2 electrons, oxygen takes 2. You get Mg²⁺ and O²⁻, so the formula is MgO." },
      { title:"Covalent Bonding: Sharing", body:"When two non-metals meet, neither wants to give electrons away, so they share them. A shared pair of electrons is a <strong>covalent bond</strong>. In a water molecule, oxygen shares one pair with each of two hydrogens, and every atom ends up with a full shell. Covalent substances usually exist as separate small molecules, so they often have low melting points, and they do not conduct electricity.",
        formula:"H₂O: O shares 2 pairs, one with each H",
        example:"Each hydrogen needs 1 more electron and each oxygen needs 2 more. So one oxygen can bond with two hydrogens: H₂O." },
      { title:"Between the Two Extremes", body:"Often the sharing is not equal. <strong>Electronegativity</strong> measures how strongly an atom pulls on shared electrons. If two atoms are close in electronegativity, the electrons are shared evenly. If one atom pulls much harder, the electrons sit closer to it, and the bond is <strong>polar</strong>. If the pull is very different (a difference above about 1.7), the electron is basically taken, and the bond is ionic. It is better to think of bonding as a slider than as two boxes.",
        formula:"difference ≈ 0 → equal sharing     ≈ 1 → polar     > 1.7 → ionic" },
      { title:"Making Formulas for Ionic Compounds", body:"Ionic compounds are neutral overall, so the positive and negative charges must cancel. Aluminium forms Al³⁺ and oxygen forms O²⁻. To cancel, you need 2 aluminium ions (+6) and 3 oxide ions (−6). The formula is Al₂O₃. A quick way: swap the charge numbers and use them as the subscripts.",
        formula:"Al³⁺ + O²⁻  →  Al₂O₃" }
    ],
    sim:{
      type:"bondTypes",
      canvasId:"bondCanvas",
      title:"Experiment: Tug of War for Electrons",
      width:700, height:340,
      controls:[
        { id:"chPair", label:"Pair of atoms (1 H–H, 2 H–C, 3 H–N, 4 H–Cl, 5 H–O, 6 Mg–O, 7 Na–Cl, 8 K–F)", min:1, max:8, value:7 }
      ],
      readout:{ id:"bondRead", label:"Bond" },
      note:"The pairs run from H–H up to K–F, so you can see equal sharing slowly turn into complete transfer."
    },
    gallery:{
      type:"ionformula",
      canvasId:"ionCanvas",
      title:"Experiment: Build an Ionic Compound",
      width:700, height:330,
      controls:[
        { id:"chCat", label:"Metal ion charge (1 = Na⁺, 2 = Mg²⁺, 3 = Al³⁺)", min:1, max:3, value:2 },
        { id:"chAn", label:"Non-metal ion charge (1 = Cl⁻, 2 = O²⁻, 3 = N³⁻)", min:1, max:3, value:1 }
      ],
      readout:{ id:"ionRead", label:"Compound" },
      note:"Add up the plus charges and the minus charges. They must balance to zero."
    },
    mentalPicture:[
      "Ionic: one atom hands over its electron and the two stick like magnets",
      "Covalent: two atoms hold the same rope and share the pull",
      "Polar: a tug of war that one side is slightly winning",
      "<strong>Every bond is atoms rearranging electrons to get a full outer shell</strong>"
    ],
    quiz:[
      { q:"Which pair would form an ionic bond?", options:[
        {t:"Carbon and oxygen"}, {t:"Sodium and chlorine", c:true}, {t:"Two hydrogen atoms"} ],
        why:"Sodium is a metal and chlorine is a non-metal, so the metal hands an electron to the non-metal." },
      { q:"What is the formula of the compound made of Mg²⁺ and Cl⁻ ions?", options:[
        {t:"MgCl"}, {t:"MgCl₂", c:true}, {t:"Mg₂Cl"} ],
        why:"One magnesium ion gives +2, so you need two chloride ions (−1 each) to bring the total to zero." },
      { q:"Why does solid table salt not conduct electricity, while salt solution does?", options:[
        {t:"The ions cannot move in the solid but can move in the solution", c:true}, {t:"Salt has no electrons"}, {t:"Water makes new electrons"} ],
        why:"Electricity through a salt needs moving charges. In the crystal the ions are locked in place. Dissolved, they are free." },
      { q:"In a covalent bond, what happens to the electrons?", options:[
        {t:"They are shared between atoms", c:true}, {t:"They are removed"}, {t:"They turn into protons"} ],
        why:"Sharing a pair of electrons lets both atoms count it towards a full outer shell." },
      { q:"Chlorine pulls harder on shared electrons than hydrogen does. What does that make the H–Cl bond?", options:[
        {t:"Non-polar"}, {t:"Polar", c:true}, {t:"Metallic"} ],
        why:"The electrons spend more time near the chlorine, giving it a slight negative charge and leaving hydrogen slightly positive." }
    ]
  },
  {
    id:"reactions",
    subject:"chemistry",
    pos:{ top:200, left:"72%" },
    label:"Chemical Reactions",
    chapter:"ATLAS ENTRY 05 • REARRANGING ATOMS • GRADES 8–10",
    title:"Chemical Reactions & Balancing",
    hook:"When a candle burns, the wax seems to disappear. It does not. The atoms in the wax join with oxygen from the air and leave as carbon dioxide and water vapour, which you cannot see. In 1789 Antoine Lavoisier weighed everything before and after burning, and found that nothing was ever lost.",
    sections:[
      { title:"Signs of a Chemical Reaction", body:"In a chemical reaction, atoms are rearranged to make new substances. Clues are a colour change, a gas bubbling off, a solid forming in a liquid, a temperature change, or light. A physical change, such as ice melting, only changes the state. A chemical change gives something with new properties, and is usually hard to reverse." },
      { title:"Writing Equations", body:"Chemists write a reaction as an equation. The starting substances, the <strong>reactants</strong>, go on the left. The new substances, the <strong>products</strong>, go on the right. An arrow means “turns into”. Hydrogen burning in oxygen to make water is written H₂ + O₂ → H₂O. The small numbers in a formula tell you how many atoms are in one molecule.",
        formula:"reactants  →  products" },
      { title:"Atoms Are Never Lost", body:"This is the law of <strong>conservation of mass</strong>. Atoms cannot be created or destroyed in a reaction, only rearranged. So every kind of atom must appear the same number of times on both sides. In H₂ + O₂ → H₂O, there are two oxygen atoms on the left but only one on the right. The equation is not balanced yet." },
      { title:"Balancing", body:"To balance an equation you put numbers called <strong>coefficients</strong> in front of the formulas. You never change the small numbers inside a formula, because that would change the substance. For water: 2H₂ + O₂ → 2H₂O. Now there are 4 hydrogen and 2 oxygen atoms on each side. A good method is to balance the most complicated formula first, and leave single-element substances like O₂ until last.",
        formula:"2H₂ + O₂  →  2H₂O",
        example:"Methane burning: CH₄ + O₂ → CO₂ + H₂O. Carbon is already balanced (1 and 1). Hydrogen: 4 on the left, so put 2 in front of H₂O. Now oxygen on the right is 2 + 2 = 4, so put 2 in front of O₂. Result: CH₄ + 2O₂ → CO₂ + 2H₂O." },
      { title:"Four Common Types", body:"Many reactions fit a simple pattern. In <strong>combination</strong> two substances join into one. In <strong>decomposition</strong> one substance splits into two or more. In <strong>displacement</strong> a more reactive element pushes a less reactive one out of a compound. In <strong>double displacement</strong> two compounds swap partners. Spotting the type helps you predict what the products will be." }
    ],
    sim:{
      type:"balancer",
      canvasId:"balanceCanvas",
      title:"Experiment: Balance the Equation",
      width:700, height:400,
      controls:[
        { id:"chRxn", label:"Reaction (1 water, 2 methane, 3 rust, 4 ammonia)", min:1, max:4, value:1 },
        { id:"chC1", label:"Coefficient of 1st substance", min:1, max:6, value:1 },
        { id:"chC2", label:"Coefficient of 2nd substance", min:1, max:6, value:1 },
        { id:"chC3", label:"Coefficient of 3rd substance", min:1, max:6, value:1 },
        { id:"chC4", label:"Coefficient of 4th substance", min:1, max:6, value:1 }
      ],
      readout:{ id:"balanceRead", label:"Balance check" },
      note:"The bars compare how many atoms of each element are on each side. The equation is balanced when every pair of bars is the same size. Reactions with three substances ignore the 4th slider."
    },
    gallery:{
      type:"rxntypes",
      canvasId:"rxnTypeCanvas",
      title:"Experiment: Four Types of Reaction",
      width:700, height:300,
      controls:[
        { id:"chRxType", label:"Type (1 combination, 2 decomposition, 3 displacement, 4 double displacement)", min:1, max:4, value:1 },
        { id:"chRxProg", label:"Progress of reaction", min:0, max:100, value:0 }
      ],
      readout:{ id:"rxnTypeRead", label:"Type" },
      note:"Letters stand for atoms. Watch which atoms stay together and which change partners."
    },
    mentalPicture:[
      "A reaction is a LEGO model being taken apart and rebuilt differently",
      "No bricks vanish and no new bricks appear",
      "Coefficients change how many models you make; subscripts change the bricks themselves",
      "<strong>Count the atoms on each side. If the counts match, the equation is balanced</strong>"
    ],
    quiz:[
      { q:"In a balanced equation, which of these must be equal on both sides?", options:[
        {t:"The number of molecules"}, {t:"The number of atoms of each element", c:true}, {t:"The number of formulas"} ],
        why:"Atoms are conserved. Molecules can join or split, so their count is allowed to change." },
      { q:"Which is the correct balanced equation for hydrogen burning in oxygen?", options:[
        {t:"H₂ + O₂ → H₂O"}, {t:"2H₂ + O₂ → 2H₂O", c:true}, {t:"H₂ + 2O₂ → 2H₂O"} ],
        why:"Option two has 4 H and 2 O on each side. The first has 2 O on the left but 1 on the right." },
      { q:"When balancing, you change the small subscript inside a formula to fix the count. What goes wrong?", options:[
        {t:"Nothing, it is allowed"}, {t:"You turn it into a different substance", c:true}, {t:"The reaction runs backwards"} ],
        why:"H₂O is water, but H₂O₂ is hydrogen peroxide. Subscripts define which substance it is, so only coefficients can be changed." },
      { q:"Zinc is added to copper sulfate solution. Zinc takes the place of copper in the compound. What type of reaction is this?", options:[
        {t:"Combination"}, {t:"Displacement", c:true}, {t:"Decomposition"} ],
        why:"A more reactive element (zinc) pushes a less reactive one (copper) out of its compound." },
      { q:"A candle burns and gets shorter. What happens to the mass of the wax?", options:[
        {t:"It is destroyed"}, {t:"It leaves as new substances, mainly carbon dioxide and water vapour", c:true}, {t:"It turns into energy only"} ],
        why:"The atoms are conserved. If you collected all the gases produced, they would weigh more than the wax lost, because they include the oxygen it burned with." }
    ]
  },
  {
    id:"acids-bases",
    subject:"chemistry",
    pos:{ top:60, left:"86%" },
    label:"Acids & Bases",
    chapter:"ATLAS ENTRY 06 • SOUR, SLIPPERY AND pH • GRADES 8–11",
    title:"Acids, Bases & pH",
    hook:"Lemon juice makes your mouth pucker. Soap feels slippery. Both are chemistry at work. Red cabbage water turns pink with lemon and green with soap, and that is how people first sorted substances into acids and bases, long before anyone knew why it worked.",
    sections:[
      { title:"What Makes Something an Acid", body:"An <strong>acid</strong> is a substance that releases hydrogen ions (H⁺) when it dissolves in water. Hydrochloric acid, HCl, splits into H⁺ and Cl⁻. Acids taste sour, turn blue litmus red, and react with metals to give off hydrogen gas. Strong acids can burn skin, so we never taste unknown chemicals." },
      { title:"What Makes Something a Base", body:"A <strong>base</strong> reacts with acids and removes H⁺. A base that dissolves in water is called an <strong>alkali</strong>, and it releases hydroxide ions (OH⁻). Sodium hydroxide, NaOH, splits into Na⁺ and OH⁻. Bases feel slippery, taste bitter, and turn red litmus blue. Soap, baking soda and bleach are all bases." },
      { title:"The pH Scale", body:"The <strong>pH scale</strong> tells you how acidic or basic a solution is, usually from 0 to 14. Pure water is neutral at pH 7. Below 7 is acidic and above 7 is basic. The scale is logarithmic: each step down is ten times more H⁺. So pH 3 is ten times more acidic than pH 4, and a hundred times more acidic than pH 5.",
        formula:"pH = −log₁₀ [H⁺]",
        example:"A solution has [H⁺] = 0.001 mol/L = 10⁻³. So its pH is 3." },
      { title:"Neutralisation", body:"When an acid and a base meet, they cancel each other out. The H⁺ from the acid joins the OH⁻ from the base to make water, and what is left is a salt. This is why antacid tablets ease heartburn: they are bases that neutralise excess stomach acid. Farmers also add lime to acidic soil.",
        formula:"acid + base  →  salt + water     HCl + NaOH  →  NaCl + H₂O" },
      { title:"Titration: Finding an Unknown", body:"To find out how concentrated an acid is, you slowly add a base of known strength until the mixture is exactly neutral. An indicator changes colour at that point. This is called a <strong>titration</strong>. Near the neutral point, one extra drop makes the pH jump from about 3 to about 11, which is why the end point is so easy to spot." }
    ],
    sim:{
      type:"phScale",
      canvasId:"phCanvas",
      title:"Experiment: The pH Scale",
      width:700, height:380,
      controls:[
        { id:"chPH", label:"pH of the solution", min:0, max:14, step:0.5, value:7 }
      ],
      readout:{ id:"phRead", label:"Solution" },
      note:"The dots on the right show roughly how many H⁺ (gold) and OH⁻ (teal) ions are present. Each pH step changes the amount tenfold, so the picture uses a scale that grows quickly."
    },
    gallery:{
      type:"titration",
      canvasId:"titrationCanvas",
      title:"Experiment: Titration of Acid with Alkali",
      width:700, height:360,
      controls:[
        { id:"chVol", label:"Sodium hydroxide added (mL) to 25 mL of 0.10 mol/L hydrochloric acid", min:0, max:50, step:0.5, value:0 }
      ],
      readout:{ id:"titrationRead", label:"Flask" },
      note:"The pH barely moves at first, then rockets upward as it passes 25 mL. That is the neutral point."
    },
    mentalPicture:[
      "Acids hand out H⁺ ions; bases take them back",
      "pH counts the H⁺ on a log scale, so each step is a factor of ten",
      "Neutralisation is H⁺ and OH⁻ meeting to form water",
      "<strong>pH 7 is balanced; lower means more H⁺, higher means fewer</strong>"
    ],
    quiz:[
      { q:"What ion do all acids release in water?", options:[
        {t:"OH⁻"}, {t:"H⁺", c:true}, {t:"Cl⁻"} ],
        why:"Releasing hydrogen ions is what defines an acid. OH⁻ is what an alkali releases." },
      { q:"Solution A has pH 2 and solution B has pH 4. How much more H⁺ does A have?", options:[
        {t:"2 times"}, {t:"100 times", c:true}, {t:"20 times"} ],
        why:"Each pH step is a factor of 10, and A is two steps lower, so 10 × 10 = 100 times." },
      { q:"A solution has a pH of 9. What is it?", options:[
        {t:"A weak alkali", c:true}, {t:"A strong acid"}, {t:"Neutral"} ],
        why:"Above 7 means basic. 9 is only two steps above neutral, so it is weakly basic." },
      { q:"What are the products when hydrochloric acid reacts with sodium hydroxide?", options:[
        {t:"Salt and water", c:true}, {t:"Hydrogen and salt"}, {t:"Two acids"} ],
        why:"HCl + NaOH → NaCl + H₂O. The H⁺ and OH⁻ combine to make water, and NaCl is the salt." },
      { q:"Why do people take antacid tablets for heartburn?", options:[
        {t:"They are acids that dilute the stomach"}, {t:"They are bases that neutralise extra stomach acid", c:true}, {t:"They kill all stomach acid"} ],
        why:"The base removes some of the H⁺ and raises the pH slightly. They do not remove all of it, which is needed for digestion." }
    ]
  },
  {
    id:"mole",
    subject:"chemistry",
    pos:{ top:450, left:"7%" },
    label:"The Mole",
    chapter:"ATLAS ENTRY 07 • COUNTING ATOMS BY WEIGHING • GRADES 9–11",
    title:"The Mole & Chemical Amounts",
    hook:"You cannot count atoms one by one, there are far too many. A single glass of water holds more molecules than there are glasses of water in all the oceans. So chemists do what a shopkeeper does with screws: they weigh them. The trick is knowing how many atoms a given weight stands for.",
    sections:[
      { title:"A Counting Unit", body:"A dozen means 12 of anything. A <strong>mole</strong> means 6.02 × 10²³ of anything. That huge number is called Avogadro's constant. One mole of atoms, molecules or ions is a countable amount that you can pick up and put on a balance. It is a counting unit, like a dozen, only much bigger.",
        formula:"1 mole = 6.02 × 10²³ particles" },
      { title:"Molar Mass Connects Mass to Moles", body:"The <strong>molar mass</strong> of a substance is the mass in grams of one mole of it. It is numerically the same as the atomic or molecular mass on the periodic table. Carbon is 12, so 12 g of carbon contains one mole, or 6.02 × 10²³ atoms. Water, H₂O, is 2 × 1 + 16 = 18, so 18 g of water is one mole of molecules.",
        formula:"moles = mass ÷ molar mass",
        example:"How many moles are in 44 g of carbon dioxide? CO₂ has molar mass 12 + 2 × 16 = 44 g/mol. So 44 ÷ 44 = 1 mole." },
      { title:"From Moles to Particles", body:"Once you have moles, you can find the number of particles by multiplying by Avogadro's constant. That is how, from the reading on a balance, you can say how many molecules are in a sample.",
        formula:"particles = moles × 6.02 × 10²³",
        example:"9 g of water is 9 ÷ 18 = 0.5 mol. That is 0.5 × 6.02 × 10²³ = 3.01 × 10²³ molecules." },
      { title:"Equations Count Moles", body:"The coefficients in a balanced equation are mole ratios. In 2H₂ + O₂ → 2H₂O, 2 moles of hydrogen react with 1 mole of oxygen to give 2 moles of water. That is true for any scale. So you can work out how much of a product you will get from a given mass of a reactant, which is what an industrial chemist needs to do every day.",
        formula:"2 mol H₂ : 1 mol O₂ : 2 mol H₂O" },
      { title:"The Limiting Reactant", body:"If you mix reactants in the wrong proportions, one runs out first. It is called the <strong>limiting reactant</strong>, and it decides how much product you can make. The other reactant is in excess, and some is left over. A cook with 2 eggs and a kilo of flour can only make as many pancakes as the eggs allow.",
        example:"4 g of hydrogen is about 2 mol, and 16 g of oxygen is 0.5 mol. The equation needs 2 mol of H₂ for every 1 mol of O₂, so 0.5 mol of oxygen only uses up 1 mol of hydrogen. Oxygen is the limiting reactant, so 1 mol (18 g) of water forms and 1 mol of hydrogen is left over." }
    ],
    sim:{
      type:"moleConverter",
      canvasId:"moleCanvas",
      title:"Experiment: Grams, Moles and Particles",
      width:700, height:340,
      controls:[
        { id:"chSub", label:"Substance (1 carbon, 2 water, 3 CO₂, 4 salt, 5 iron, 6 oxygen)", min:1, max:6, value:2 },
        { id:"chGrams", label:"Mass (grams)", min:1, max:200, value:36 }
      ],
      readout:{ id:"moleRead", label:"Amount" },
      note:"Every substance has a different molar mass, so 36 g of one substance is not the same number of particles as 36 g of another."
    },
    gallery:{
      type:"limiting",
      canvasId:"limitCanvas",
      title:"Experiment: Hydrogen + Oxygen → Water",
      width:700, height:360,
      controls:[
        { id:"chMassH", label:"Hydrogen (grams)", min:0, max:20, step:0.5, value:4 },
        { id:"chMassO", label:"Oxygen (grams)", min:0, max:160, step:2, value:16 }
      ],
      readout:{ id:"limitRead", label:"Result" },
      note:"The reactant that runs out first limits the water produced. The grey bar is what is left unused."
    },
    mentalPicture:[
      "A mole is a very big dozen",
      "The balance is a particle counter: grams ÷ molar mass gives moles",
      "A balanced equation is a recipe written in moles",
      "<strong>Moles are the bridge between what you can weigh and what the atoms are actually doing</strong>"
    ],
    quiz:[
      { q:"How many moles are there in 36 g of water (molar mass 18 g/mol)?", options:[
        {t:"0.5"}, {t:"2", c:true}, {t:"18"} ],
        why:"moles = mass ÷ molar mass = 36 ÷ 18 = 2 mol." },
      { q:"What is the molar mass of CO₂? (C = 12, O = 16)", options:[
        {t:"28 g/mol"}, {t:"44 g/mol", c:true}, {t:"60 g/mol"} ],
        why:"12 + 2 × 16 = 44. There are two oxygen atoms to count." },
      { q:"How many molecules are in 0.5 mol of any substance?", options:[
        {t:"3.01 × 10²³", c:true}, {t:"6.02 × 10²³"}, {t:"0.5"} ],
        why:"Half a mole is half of 6.02 × 10²³." },
      { q:"2H₂ + O₂ → 2H₂O. How many moles of water form from 3 mol of H₂ with plenty of oxygen?", options:[
        {t:"1.5"}, {t:"3", c:true}, {t:"6"} ],
        why:"The coefficients are 2 to 2, so the moles of water equal the moles of hydrogen." },
      { q:"You have 2 mol of A and 5 mol of B and they react 1 : 1. Which is limiting?", options:[
        {t:"A", c:true}, {t:"B"}, {t:"Neither"} ],
        why:"A runs out after 2 mol of each have reacted, and 3 mol of B is left over." }
    ]
  },
  {
    id:"gas-laws",
    subject:"chemistry",
    pos:{ top:570, left:"24%" },
    label:"Gas Laws",
    chapter:"ATLAS ENTRY 08 • PRESSURE, VOLUME, TEMPERATURE • GRADES 9–11",
    title:"The Gas Laws",
    hook:"Why does a sealed packet of crisps puff up on a mountain? Why does a bicycle pump get warm? And why do car tyres read a lower pressure on a cold morning? Gases follow neat, predictable rules, and three of them are all you need to explain these.",
    sections:[
      { title:"What a Gas Does", body:"A gas is described by four quantities: its <strong>pressure</strong> (P), <strong>volume</strong> (V), <strong>temperature</strong> (T) and the amount of gas, in moles (n). They are not independent. Change one and at least one of the others has to respond." },
      { title:"Use Kelvin for Temperature", body:"Gas laws only work with the <strong>Kelvin</strong> scale, which starts at absolute zero, the point where particles have no motion to lose. The size of a degree is the same as a Celsius degree, but 0 °C is 273 K. To convert, add 273. A gas at 27 °C is at 300 K.",
        formula:"T (K) = T (°C) + 273" },
      { title:"Boyle's Law: Pressure and Volume", body:"At a constant temperature, if you squeeze a gas into half the volume, the particles hit the walls twice as often, so the pressure doubles. Pressure and volume are inversely related: when one goes up, the other goes down. In 1662 Robert Boyle found this by trapping air in a bent glass tube with mercury.",
        formula:"P × V = constant     (fixed T and n)",
        example:"A syringe holds 60 mL of air at 100 kPa. You push the plunger until the volume is 20 mL. New pressure = 100 × 60 ÷ 20 = 300 kPa." },
      { title:"Charles's Law: Volume and Temperature", body:"At a constant pressure, heating a gas makes its particles move faster, and they push outward harder, so the gas expands. The volume is directly proportional to the temperature in kelvin. That is how a hot air balloon works: the heated air takes up more space, so it is less dense than the cold air around it, and the balloon floats.",
        formula:"V ÷ T = constant     (fixed P and n)" },
      { title:"The Ideal Gas Equation", body:"All the laws can be joined into one. For an ideal gas, <strong>PV = nRT</strong>, where R is 8.314 J/(mol·K). If you use P in kilopascals and V in litres, the result works out neatly. Real gases follow this closely except at very high pressure or very low temperature, when the particles start to attract each other.",
        formula:"P V = n R T",
        example:"Find the pressure of 0.50 mol of gas in a 10 L container at 300 K. P = nRT ÷ V = 0.50 × 8.314 × 300 ÷ 10 = 125 kPa." }
    ],
    sim:{
      type:"gasPiston",
      canvasId:"gasCanvas",
      title:"Experiment: Gas in a Cylinder",
      width:700, height:360,
      controls:[
        { id:"chGasT", label:"Temperature (kelvin)", min:200, max:600, step:10, value:300 },
        { id:"chGasV", label:"Volume (litres)", min:2, max:20, step:0.5, value:10 },
        { id:"chGasN", label:"Amount of gas (moles ×10)", min:1, max:20, value:5 }
      ],
      readout:{ id:"gasRead", label:"Pressure" },
      note:"More particles, a hotter gas, or less room all make the particles hit the walls harder or more often, which raises the pressure."
    },
    gallery:{
      type:"boyle",
      canvasId:"boyleCanvas",
      title:"Experiment: Pressure Against Volume",
      width:700, height:340,
      controls:[
        { id:"chBoyleV", label:"Volume (litres)", min:2, max:20, step:0.5, value:10 },
        { id:"chBoyleT", label:"Temperature (kelvin)", min:250, max:450, step:10, value:300 }
      ],
      readout:{ id:"boyleRead", label:"Point on the curve" },
      note:"The amount of gas is fixed at 0.50 mol. The curve is always a hyperbola, and raising the temperature lifts the whole curve."
    },
    mentalPicture:[
      "Squeeze a gas and the same particles hit a smaller wall more often",
      "Heat a gas and the particles hit harder and push the walls out",
      "Always use kelvin; 0 K means no motion left",
      "<strong>Pressure comes from collisions: more of them, or harder ones, mean more pressure</strong>"
    ],
    quiz:[
      { q:"What is 25 °C in kelvin?", options:[
        {t:"248 K"}, {t:"298 K", c:true}, {t:"25 K"} ],
        why:"Add 273: 25 + 273 = 298 K." },
      { q:"A gas is compressed to half its volume at constant temperature. What happens to the pressure?", options:[
        {t:"It halves"}, {t:"It doubles", c:true}, {t:"It stays the same"} ],
        why:"P × V is constant (Boyle's law). Halving V means P has to double." },
      { q:"A sealed rigid tank of gas is heated. What happens to the pressure?", options:[
        {t:"It rises, because the particles hit the walls harder and more often", c:true}, {t:"It falls"}, {t:"It stays the same because the volume is fixed"} ],
        why:"The particles move faster, so collisions are more frequent and more forceful." },
      { q:"Why does a hot air balloon rise?", options:[
        {t:"The air inside expands, so it is less dense than the air outside", c:true}, {t:"Hot air is a different gas from cold air"}, {t:"The balloon is made of a light material only"} ],
        why:"By Charles's law the heated air expands. The same mass fills more space, so the balloon floats in the denser cool air." },
      { q:"Use PV = nRT. What is the pressure of 1 mol of gas in 25 L at 300 K (R = 8.314)?", options:[
        {t:"About 100 kPa", c:true}, {t:"About 10 kPa"}, {t:"About 1000 kPa"} ],
        why:"P = 1 × 8.314 × 300 ÷ 25 ≈ 99.8 kPa, which is close to normal air pressure." }
    ]
  },
  {
    id:"energy-rates",
    subject:"chemistry",
    pos:{ top:450, left:"40%" },
    label:"Energy & Rates",
    chapter:"ATLAS ENTRY 09 • HOW FAST, AND HOW HOT • GRADES 10–12",
    title:"Energy & Reaction Rates",
    hook:"Petrol and air can sit together in a tank for years and nothing happens. Add one spark, and the whole mixture goes off. Something is holding back a reaction that would release a huge amount of energy. And a small piece of metal in a car's exhaust can make a harmful reaction run quickly at a much lower temperature, which is how a catalytic converter works.",
    sections:[
      { title:"Bonds Break and Bonds Make", body:"Every reaction breaks old bonds and makes new ones. Breaking a bond takes energy in. Making a bond gives energy out. Whether a reaction gives out or takes in heat overall depends on which is bigger." },
      { title:"Exothermic and Endothermic", body:"In an <strong>exothermic</strong> reaction, more energy is released making the new bonds than was spent breaking the old ones, so heat flows out into the surroundings and the temperature rises. Burning fuel, rusting and respiration are exothermic. In an <strong>endothermic</strong> reaction, the surroundings give up heat and get colder. Photosynthesis, and the cold packs used for sports injuries, are endothermic.",
        formula:"ΔH < 0 exothermic     ΔH > 0 endothermic",
        example:"The reaction CH₄ + 2O₂ → CO₂ + 2H₂O has ΔH = −890 kJ/mol. The negative sign shows heat is released, which is why natural gas is a fuel." },
      { title:"Activation Energy", body:"Even exothermic reactions usually need a push to start, because bonds have to be broken before new ones form. The minimum energy that colliding particles need for a reaction is the <strong>activation energy</strong>, Eₐ. On an energy diagram it is the hill the reactants have to climb. Most collisions do not have this much energy, so most collisions achieve nothing." },
      { title:"Speeding Reactions Up", body:"For particles to react, they must collide with enough energy. So reactions go faster if you (1) raise the temperature, since the particles move faster and a bigger fraction of them are above the activation energy; (2) raise the concentration or pressure, since collisions are more frequent; (3) crush a solid into powder, since more surface is exposed; or (4) add a catalyst. A common rule of thumb is that a 10 °C rise roughly doubles the rate.",
        formula:"rate depends on: temperature • concentration • surface area • catalyst" },
      { title:"Catalysts", body:"A <strong>catalyst</strong> offers a different route for the reaction with a lower activation energy. It is not used up, so a small amount works again and again. It does not change how much energy is released overall, only how quickly the reaction gets there. Enzymes in your body are biological catalysts, and without them digestion would take years." }
    ],
    sim:{
      type:"energyProfile",
      canvasId:"energyCanvas",
      title:"Experiment: The Energy Hill",
      width:700, height:360,
      controls:[
        { id:"chEa", label:"Activation energy (kJ/mol)", min:20, max:120, step:5, value:80 },
        { id:"chDH", label:"Energy change ΔH (kJ/mol)", min:-100, max:100, step:5, value:-60 },
        { id:"chCat", label:"Catalyst (0 = none, 1 = added)", min:0, max:1, value:0 }
      ],
      readout:{ id:"energyRead", label:"Reaction" },
      note:"Adding a catalyst lowers the hill but leaves the starting and finishing levels where they were."
    },
    gallery:{
      type:"collisions",
      canvasId:"mbCanvas",
      title:"Experiment: Why Heat Speeds Things Up",
      width:700, height:340,
      controls:[
        { id:"chMBT", label:"Temperature (kelvin)", min:280, max:400, step:5, value:300 },
        { id:"chMBEa", label:"Activation energy (kJ/mol)", min:10, max:50, step:2, value:30 }
      ],
      readout:{ id:"mbRead", label:"Rate" },
      note:"Only the gold area, the particles with energy above Eₐ, can react. A small rise in temperature stretches this high-energy tail and increases it a lot."
    },
    mentalPicture:[
      "A reaction is a ball that must be pushed over a hill before it can roll down",
      "The height of the hill is the activation energy",
      "Heat gives more particles the push; a catalyst lowers the hill",
      "<strong>Exothermic means energy is released; the hill is about how fast, not how much</strong>"
    ],
    quiz:[
      { q:"The temperature of a reaction mixture rises as the reaction runs. What kind of reaction is it?", options:[
        {t:"Exothermic", c:true}, {t:"Endothermic"}, {t:"Neither"} ],
        why:"Heat is flowing out of the reacting chemicals into the surroundings, which is exothermic." },
      { q:"What does a catalyst do?", options:[
        {t:"Lowers the activation energy so the reaction is faster", c:true}, {t:"Makes more product than possible"}, {t:"Gets used up as the reaction runs"} ],
        why:"It gives an easier route. It is not consumed and it does not change the amount of product formed." },
      { q:"Why does crushing a lump of marble into powder make it react faster with acid?", options:[
        {t:"More surface is exposed for collisions", c:true}, {t:"It becomes a different substance"}, {t:"The acid gets stronger"} ],
        why:"The acid only touches the outside of the solid. Powder has much more outside." },
      { q:"Why does raising the temperature speed up a reaction?", options:[
        {t:"More particles have enough energy to get over the activation barrier", c:true}, {t:"The activation energy disappears"}, {t:"The particles get bigger"} ],
        why:"The particles move faster, so they collide more often and a larger fraction have at least Eₐ." },
      { q:"On an energy diagram the products are lower than the reactants. This means:", options:[
        {t:"The reaction is endothermic"}, {t:"The reaction is exothermic", c:true}, {t:"The reaction is impossible"} ],
        why:"The chemicals lose energy to the surroundings, so ΔH is negative." }
    ]
  },
  {
    id:"organic",
    subject:"chemistry",
    pos:{ top:520, left:"62%" },
    label:"Carbon Chemistry",
    chapter:"ATLAS ENTRY 10 • THE CHEMISTRY OF LIFE AND FUEL • GRADES 10–12",
    title:"Carbon & Organic Chemistry",
    hook:"There are over a hundred elements, but carbon is in almost everything that is alive. It is in your DNA, in sugar, in petrol, and in plastic bags. Chemists have found tens of millions of carbon compounds, more than all the others put together. What makes this one element so special?",
    sections:[
      { title:"Carbon Makes Four Bonds", body:"A carbon atom has four electrons in its outer shell, so it can make four covalent bonds. It can bond to other carbon atoms, strongly, in long chains, branches and rings. Very few elements can do this. The chains can be hundreds of atoms long, which is how huge molecules like proteins and plastics are possible." },
      { title:"Hydrocarbons", body:"Compounds made of only hydrogen and carbon are <strong>hydrocarbons</strong>. They are the main part of crude oil, natural gas and petrol. The simplest is methane, CH₄: a carbon with four hydrogens. Hydrocarbons burn well and give out a lot of energy, which is why they are fuels.",
        formula:"CH₄  methane     C₂H₆  ethane     C₃H₈  propane" },
      { title:"Alkanes", body:"<strong>Alkanes</strong> have only single bonds between carbons, and they are called saturated because each carbon holds as many hydrogens as it can. The names start with a prefix for the number of carbons (meth-, eth-, prop-, but-, pent-, hex-, hept-, oct-) and end in <strong>-ane</strong>. An alkane with n carbons has 2n + 2 hydrogens.",
        formula:"alkane: CₙH₂ₙ₊₂",
        example:"Pentane has 5 carbons, so it has 2 × 5 + 2 = 12 hydrogens: C₅H₁₂." },
      { title:"Alkenes and Alkynes", body:"If two carbons share a double bond, the compound is an <strong>alkene</strong> (ending -ene); with a triple bond, it is an <strong>alkyne</strong> (-yne). Each extra bond between carbons uses up room that hydrogens would have taken, so these have fewer hydrogens, and are called unsaturated. Alkenes react easily by adding atoms across the double bond. Ethene is used to make polythene.",
        formula:"alkene: CₙH₂ₙ     alkyne: CₙH₂ₙ₋₂" },
      { title:"Same Formula, Different Shapes", body:"Carbon atoms can be arranged in more than one way for the same formula. Butane and methylpropane both have the formula C₄H₁₀, but one is a straight chain and the other is branched. They are called <strong>isomers</strong> and have different boiling points. As the number of isomers grows quickly with chain length, it helps explain why there are so many carbon compounds." },
      { title:"Functional Groups", body:"A group of atoms attached to a carbon chain which decides how the compound behaves is called a <strong>functional group</strong>. An –OH group makes an alcohol, such as ethanol. A –COOH group makes a carboxylic acid, such as the ethanoic acid in vinegar. Learn the group, and you can predict the chemistry, whichever chain it is attached to." }
    ],
    sim:{
      type:"hydrocarbons",
      canvasId:"organicCanvas",
      title:"Experiment: Build a Hydrocarbon",
      width:700, height:380,
      controls:[
        { id:"chCarbons", label:"Number of carbon atoms", min:1, max:8, value:4 },
        { id:"chBondOrder", label:"Bond between the first two carbons (1 single, 2 double, 3 triple)", min:1, max:3, value:1 }
      ],
      readout:{ id:"organicRead", label:"Compound" },
      note:"With only one carbon there is no carbon-to-carbon bond, so methane is always an alkane. For longer chains, try the double and triple bonds and see the hydrogens disappear."
    },
    mentalPicture:[
      "Carbon has four hands and loves to hold other carbons",
      "Chains, branches and rings can be built out of the same atom",
      "Each extra bond between carbons pushes two hydrogens out",
      "<strong>The carbon skeleton gives the shape; the functional group gives the behaviour</strong>"
    ],
    quiz:[
      { q:"How many covalent bonds does a carbon atom usually make?", options:[
        {t:"2"}, {t:"4", c:true}, {t:"6"} ],
        why:"Carbon has four outer electrons, so it needs four more to fill its shell." },
      { q:"How many hydrogen atoms are in an alkane with 6 carbons (hexane)?", options:[
        {t:"12"}, {t:"14", c:true}, {t:"16"} ],
        why:"CₙH₂ₙ₊₂ with n = 6 gives 2 × 6 + 2 = 14." },
      { q:"What is different about an alkene compared with the alkane that has the same number of carbons?", options:[
        {t:"It has a carbon-to-carbon double bond and two fewer hydrogens", c:true}, {t:"It has more hydrogens"}, {t:"It has no carbon atoms"} ],
        why:"The double bond uses up one of each carbon's four bonds, so there is room for fewer hydrogens." },
      { q:"Butane and methylpropane have the same formula, C₄H₁₀, but different structures. What are they called?", options:[
        {t:"Isotopes"}, {t:"Isomers", c:true}, {t:"Ions"} ],
        why:"Isomers are compounds with the same molecular formula arranged differently. Isotopes are atoms of the same element." },
      { q:"The ending -OH on a carbon chain tells you that the compound is a(n):", options:[
        {t:"Alkane"}, {t:"Alcohol", c:true}, {t:"Carboxylic acid"} ],
        why:"An –OH functional group makes an alcohol. A carboxylic acid has –COOH." }
    ]
  }
);
