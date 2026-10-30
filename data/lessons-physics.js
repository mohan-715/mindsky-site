/* MindSky lessons: physics */
LESSONS.push(
  {
    id:"gravity",
    subject:"physics",
    pos:{ top:100, left:"45%" },
    label:"Gravity",
    chapter:"ATLAS ENTRY 01 • THE FALLING WORLDS",
    title:"Gravity",
    hook:"Imagine standing on a mountain. You release a stone. It falls toward Earth. Now imagine the Moon. It is also falling. But it never reaches Earth. Why?",
    sections:[
      { title:"The Hidden Pull", body:"Everything with mass attracts everything else. A tiny object attracts another tiny object. A planet attracts objects around it. The larger the mass, the stronger the attraction. The greater the distance, the weaker the attraction." }
    ],
    sim:{
      type:"gravity",
      canvasId:"gravityCanvas",
      title:"Experiment: Shape Gravity",
      width:700, height:350,
      controls:[
        { id:"mass", label:"Planet Mass", min:1, max:10, value:5 },
        { id:"distance", label:"Distance", min:50, max:200, value:100 }
      ]
    },
    mentalPicture:[
      "Space is a giant invisible ocean",
      "A massive planet creates a deep current",
      "Objects follow that invisible pull",
      "<strong>Gravity is the universe holding everything together</strong>"
    ],
    quiz:[
      { q:"If a planet's mass doubles but distance stays the same, the pull it exerts:", options:[
        {t:"Gets stronger", c:true}, {t:"Gets weaker"}, {t:"Stays exactly the same"} ] },
      { q:"The Moon keeps falling toward Earth but never lands because:", options:[
        {t:"Earth's gravity switches off in space"},
        {t:"It is also moving sideways fast enough to keep missing Earth", c:true},
        {t:"The Moon has no mass"} ] }
    ]
  },
  {
    id:"motion",
    subject:"physics",
    pos:{ top:280, left:"20%" },
    label:"Motion",
    chapter:"ATLAS ENTRY 02 • THE PATH OF MOVING WORLDS",
    title:"Motion",
    hook:"Look around you. The Earth is moving. You are moving. Even a stone sitting on the ground is moving through space with the planet. Motion is everywhere. But how do we describe it?",
    sections:[
      { title:"Distance and Displacement", body:"Distance tells us how much ground an object covers. Displacement tells us the change from the starting point to the ending point. A person walking around a park and returning home has travelled a distance, but their displacement is zero.",
        formula:"Distance = Total path travelled<br><br>Displacement = Final position − Initial position" },
      { title:"Speed and Velocity", body:"Speed only asks: \"How fast?\" Velocity asks: \"How fast and in which direction?\" A car travelling 60 km/h north has velocity because direction matters." },
      { title:"Acceleration", body:"Acceleration is the change in velocity. A car speeding up. A bicycle slowing down. A rocket launching. All are examples of acceleration." }
    ],
    sim:{
      type:"motion",
      canvasId:null,
      title:"Interactive Motion Map",
      controls:[ { id:"speedControl", label:"Speed", min:1, max:10, value:5 } ]
    },
    mentalPicture:[
      "The universe is a giant map",
      "Every object leaves an invisible trail",
      "<strong>Motion is the story of change</strong>"
    ],
    quiz:[
      { q:"A runner does one full lap of a circular track and returns to the start. Their displacement is:", options:[
        {t:"Zero", c:true}, {t:"Equal to the distance run"}, {t:"Impossible to know"} ] },
      { q:"Two cars both travel at 60 km/h, one heading north and one heading south. Their velocities are:", options:[
        {t:"Identical"}, {t:"Different, because direction differs", c:true}, {t:"Both zero"} ] }
    ]
  },
  {
    id:"forces",
    subject:"physics",
    pos:{ top:320, left:"65%" },
    label:"Forces",
    chapter:"ATLAS ENTRY 03 • THE INVISIBLE HANDS",
    title:"Forces & Newton's Laws",
    hook:"A bus is cruising along. Suddenly the driver slams the brakes. The bus stops — but your body keeps lurching forward. Nobody pushed you. So why did you move?",
    sections:[
      { title:"What Is a Force?", body:"A force is a push or a pull. It can start motion, stop motion, speed something up, slow it down, or change its direction. Forces are invisible, but their effects are everywhere: a kicked ball, a stretched spring, a rocket lifting off the ground." },
      { title:"Newton's Three Laws", body:"<strong>First Law — Inertia.</strong> An object at rest stays at rest, and an object in motion stays in motion, unless a force acts on it. On the bus, your body was moving with the bus. When the bus stopped, nothing stopped you at the same instant, so you kept going forward.<br><br><strong>Second Law — Force, Mass, Acceleration.</strong> A bigger push causes bigger acceleration. A heavier object needs a bigger push to speed up by the same amount. This is why the same kick moves a football much farther than a bowling ball.",
        formula:"Force = Mass × Acceleration" },
      { title:"Action and Reaction", body:"<strong>Third Law.</strong> Every force has an equal and opposite partner force. A rocket pushes hot gas downward; the gas pushes the rocket upward with equal strength. When you walk, your foot pushes the ground backward, and the ground pushes you forward." }
    ],
    sim:{
      type:"forces",
      canvasId:"forcesCanvas",
      title:"Experiment: Push, Mass & Friction",
      width:700, height:220,
      controls:[
        { id:"forceInput", label:"Push Force", min:1, max:10, value:6 },
        { id:"massInput", label:"Object Mass", min:1, max:10, value:4 },
        { id:"frictionInput", label:"Friction", min:0, max:10, value:3 }
      ],
      readout:{ id:"accelRead", label:"Acceleration (Force ÷ Mass − Friction drag)" }
    },
    mentalPicture:[
      "Bus is moving, you are moving with it",
      "Bus stops suddenly",
      "Your body keeps wanting to move",
      "<strong>That resistance to change is inertia — a force made you feel it</strong>"
    ],
    quiz:[
      { q:"You push a shopping cart and an identical cart loaded with bricks, using the same force. Which accelerates faster?", options:[
        {t:"The empty cart", c:true}, {t:"The loaded cart"}, {t:"Both accelerate the same"} ] },
      { q:"A rocket in the vacuum of space fires its engines. There is no air to \"push against,\" yet it accelerates. Why?", options:[
        {t:"Space itself pushes the rocket"},
        {t:"The rocket pushes exhaust gas one way, the gas pushes the rocket the opposite way", c:true},
        {t:"Rockets don't actually need force in space"} ] },
      { q:"A book sits still on a table. Nothing appears to be happening. According to the First Law, this means:", options:[
        {t:"The forces on it are balanced, so it stays at rest", c:true},
        {t:"No forces are acting on it at all"},
        {t:"Gravity has been switched off"} ] }
    ]
  },
  {
    id:"energy",
    subject:"physics",
    pos:{ top:130, left:"15%" },
    label:"Energy",
    chapter:"ATLAS ENTRY 04 • THE HIDDEN CURRENCY",
    title:"Work, Energy &amp; Power",
    hook:"A boulder sits at the top of a cliff. It looks completely still, completely harmless. But push it off the edge, and it can flatten a car. Where was all that violence hiding while it just sat there?",
    sections:[
      { title:"What Counts as Work?", body:"In physics, work only happens when a force actually moves something in the direction of the push. Pushing hard against a wall that never moves is exhausting — but it's zero work, because nothing moved. Carry a box across a flat room at constant height, and gravity does zero work on it too, because gravity pulls down while you moved sideways.",
        formula:"Work = Force × Distance moved (in the direction of the force)" },
      { title:"Two Kinds of Energy", body:"<strong>Kinetic energy</strong> is the energy of motion — a moving car, a thrown ball, a spinning fan. <strong>Potential energy</strong> is stored energy waiting to be released — a stretched bowstring, water behind a dam, or that boulder sitting at the top of the cliff. The boulder isn't doing anything, but its height above the ground is energy in storage.",
        formula:"Gravitational Potential Energy = Mass × Gravity × Height" },
      { title:"Energy Never Disappears", body:"As the boulder falls, its stored height-energy doesn't vanish — it converts into motion-energy, getting faster and faster. This is the Law of Conservation of Energy: energy changes form, but the total amount stays the same. A swinging pendulum trades height for speed and back again, over and over, never losing the total." },
      { title:"Power Is the Speed of Work", body:"Two workers can lift the same 50 identical bricks to the same height — doing the exact same total work. But if one finishes in five minutes and the other in one hour, the first is far more powerful. Power isn't about how much energy you move, it's about how fast you move it.",
        formula:"Power = Work ÷ Time" }
    ],
    sim:{
      type:"energy",
      canvasId:"energyCanvas",
      title:"Experiment: The Falling Boulder",
      width:700, height:320,
      controls:[
        { id:"heightInput", label:"Cliff Height", min:2, max:10, value:6 },
        { id:"massInput2", label:"Boulder Mass", min:1, max:10, value:5 }
      ],
      readout:{ id:"energyRead", label:"Potential → Kinetic (as it falls)" }
    },
    mentalPicture:[
      "Boulder sits at the top of a cliff — height is stored energy",
      "It tips over the edge",
      "Stored energy converts into motion, faster with every meter",
      "<strong>Energy never disappears — it just changes costume, from stillness to speed</strong>"
    ],
    quiz:[
      { q:"You push against a locked wall as hard as you can for a full minute. How much work did you do on the wall?", options:[
        {t:"Zero, because the wall never moved", c:true},
        {t:"A lot, because you got tired"},
        {t:"It depends on how loud you grunted"} ] },
      { q:"A boulder is halfway down a cliff, moving fast. Compared to when it sat at the top, its potential energy has:", options:[
        {t:"Vanished completely"},
        {t:"Partly converted into kinetic energy", c:true},
        {t:"Doubled"} ] },
      { q:"Two cranes lift identical loads to the same height. Crane A takes 10 seconds, Crane B takes 40 seconds. Which crane is more powerful?", options:[
        {t:"Crane B, because it works longer"},
        {t:"They're equal, since the work done is identical"},
        {t:"Crane A, because it does the same work in less time", c:true} ] }
    ]
  },
  {
    id:"electricity",
    subject:"physics",
    pos:{ top:420, left:"45%" },
    label:"Electricity",
    chapter:"ATLAS ENTRY 05 • THE INVISIBLE RIVER",
    title:"Electricity",
    hook:"Flip a switch and a room floods with light — instantly, silently, with nothing visibly moving. But something IS moving, through wires, faster than you can blink. What is actually flowing?",
    sections:[
      { title:"A River of Charge", body:"Every wire is packed with tiny charged particles called electrons. Normally they jitter around randomly, going nowhere. But connect a battery, and it's like tilting a riverbed — suddenly all those electrons drift in the same direction at once. That drift is electric current.",
        formula:"Current (I) = Charge (Q) ÷ Time (t)" },
      { title:"Voltage Is the Push", body:"A battery doesn't create electrons — the wire is already full of them. What the battery provides is push, a pressure difference called voltage that shoves the electrons along, the same way a pump doesn't create water but pressurizes it to make it flow." },
      { title:"Resistance Is the Narrow Pipe", body:"Every material resists the flow of charge a little — some a lot (rubber, wood), some barely at all (copper, silver). A thin, long, or poor-quality wire acts like a narrow pipe: for the same push, less current gets through. This relationship between push, flow, and narrowness is one of the most useful rules in all of physics.",
        formula:"Voltage (V) = Current (I) × Resistance (R)" },
      { title:"Series vs. Parallel", body:"Wire bulbs in a single loop (series) and the same current must pass through every bulb one after another — break the loop anywhere and all of them go dark. Wire them side-by-side on separate branches (parallel) and each bulb gets its own path — break one branch and the others stay lit. This is why a single burnt-out bulb kills an old-style string of holiday lights, but not your house wiring." }
    ],
    sim:{
      type:"electricity",
      canvasId:"electricityCanvas",
      title:"Experiment: Voltage, Resistance &amp; Current",
      width:700, height:220,
      controls:[
        { id:"voltageInput", label:"Voltage", min:1, max:10, value:6 },
        { id:"resistanceInput", label:"Resistance", min:1, max:10, value:3 }
      ],
      readout:{ id:"currentRead", label:"Current (Voltage ÷ Resistance)" }
    },
    mentalPicture:[
      "A wire is a river already full of electrons, just standing still",
      "A battery tilts the riverbed, pushing them all one way",
      "Resistance is how narrow the riverbed is",
      "<strong>Electricity is push (voltage) moving charge (current) through a channel (resistance)</strong>"
    ],
    quiz:[
      { q:"A battery is connected to a wire. What does the battery actually supply?", options:[
        {t:"Brand new electrons that didn't exist before"},
        {t:"A push (voltage) that makes existing electrons drift together", c:true},
        {t:"Resistance"} ] },
      { q:"If you keep the voltage the same but use a thinner, more resistant wire, the current will:", options:[
        {t:"Increase"}, {t:"Decrease", c:true}, {t:"Stay exactly the same"} ] },
      { q:"One bulb burns out in an old-fashioned single-loop (series) string of holiday lights. What happens to the rest?", options:[
        {t:"Nothing, they stay lit"},
        {t:"They all go dark too, because the loop is broken", c:true},
        {t:"They get brighter"} ] }
    ]
  },

  {
    id:"electronics",
    subject:"physics",
    pos:{ top:170, left:"70%" },
    label:"Electronics",
    isHub:true,
    chapter:"ATLAS ENTRY 06 • THE BUILDING BLOCKS OF CIRCUITS",
    title:"Electronics",
    hook:"Crack open a remote control and you'll find a handful of tiny components crammed onto a green board — a striped cylinder, a little silver can, a coil of wire, a glowing bead, sometimes a small spinning can. Each looks unimportant on its own. Together, they make the whole device work.",
    sections:[
      { title:"A Family of Tiny Machines", body:"Every component on a circuit board has exactly one specialized job. Some hold current back. Some store it briefly. Some resist sudden change. Some turn it into light. Some turn it into motion. None of them do everything — and that's the point. Five of the most fundamental components are orbiting this star below. Click each planet to explore how it works, on its own." }
    ],
    mentalPicture:[
      "A resistor holds the current back, like a narrow gate",
      "A capacitor fills and empties, like a tiny bucket of charge",
      "An inductor resists sudden change, like a heavy flywheel",
      "An LED lights up only when current flows the right way",
      "<strong>A motor spins because current in a magnetic field creates a push</strong>"
    ],
    quiz:[
      { q:"Why does a typical circuit board contain many different types of components instead of just one?", options:[
        {t:"Because each component performs a distinct, specialized job", c:true},
        {t:"Because manufacturers want the board to look complicated"},
        {t:"Because all components are actually identical inside"} ] },
      { q:"Where can you learn exactly how a resistor, capacitor, inductor, LED, or motor works?", options:[
        {t:"By exploring each of the five planets orbiting this star", c:true},
        {t:"They cannot be studied individually"},
        {t:"Only in the Electricity star"} ] }
    ]
  },
  {
    id:"resistor",
    subject:"physics",
    orbit:{ around:"electronics", radius:70, angle:0, speed:24 },
    label:"Resistor",
    chapter:"ATLAS ENTRY 07 • THE TRAFFIC CONTROLLER",
    title:"Resistor",
    hook:"Every circuit has at least one component whose entire job is to say \"not so fast.\" Without it, delicate parts downstream would be flooded with more current than they can survive.",
    sections:[
      { title:"What a Resistor Does", body:"A resistor limits how much current flows past it, on purpose. Too much current can burn out a delicate component, so a resistor holds the flow back to a safe level — like a narrow section of pipe slowing down water. The energy that gets held back doesn't vanish; it leaves as a small amount of heat.",
        formula:"Voltage across it = Current × Resistance (V = I × R)" },
      { title:"Reading the Stripes", body:"Real resistors are usually tiny cylinders with colored stripes painted around them. Each color stands for a digit, so anyone who knows the code can read a resistor's exact value at a glance, without needing to measure it at all." }
    ],
    sim:{
      type:"resistor",
      canvasId:"resistorCanvas",
      title:"Experiment: Turn Up the Resistance",
      width:700, height:220,
      controls:[
        { id:"resistorOhms", label:"Resistance", min:1, max:10, value:5 }
      ],
      readout:{ id:"resistorRead", label:"What's happening" }
    },
    mentalPicture:[
      "Current tries to rush through a wire",
      "A resistor narrows the path on purpose",
      "Some energy is shed as heat while the rest gets through",
      "<strong>The higher the resistance, the harder it is for current to pass</strong>"
    ],
    quiz:[
      { q:"What does a resistor mainly do to the current passing through it?", options:[
        {t:"Stores it for later"}, {t:"Limits it, releasing the excess as heat", c:true}, {t:"Reverses its direction"} ] },
      { q:"The colored stripes painted on a resistor exist to:", options:[
        {t:"Let you read its resistance value at a glance", c:true},
        {t:"Keep it cool"},
        {t:"Just for decoration"} ] }
    ]
  },
  {
    id:"capacitor",
    subject:"physics",
    orbit:{ around:"electronics", radius:95, angle:72, speed:30 },
    label:"Capacitor",
    chapter:"ATLAS ENTRY 08 • THE TINY BUCKET",
    title:"Capacitor",
    hook:"A camera flash needs a sudden burst of power far greater than its little battery can supply in an instant. So the camera spends a second or two quietly filling up a component — then dumps it all at once.",
    sections:[
      { title:"Storing Charge", body:"A capacitor is two metal plates facing each other with a small gap between them. It stores electric charge temporarily, the way a small bucket stores water — filling up when connected to a source, and releasing that stored charge quickly when needed, like a tiny rechargeable battery with a very short memory.",
        formula:"Stored Charge = Capacitance × Voltage (Q = C × V)" },
      { title:"Charging and Discharging", body:"Left connected to a source, a capacitor fills up until it's full, then simply sits there holding its charge. Disconnect the source and give it a path, and it empties out again. This fill-and-release rhythm is used everywhere — smoothing out bumpy power supplies, and timing how long a circuit waits before doing something." }
    ],
    sim:{
      type:"capacitor",
      canvasId:"capacitorCanvas",
      title:"Experiment: Charge and Discharge",
      width:700, height:260,
      controls:[
        { id:"capacitorFarads", label:"Capacity", min:1, max:10, value:5 }
      ],
      readout:{ id:"capacitorRead", label:"What's happening" }
    },
    mentalPicture:[
      "Two metal plates face each other with a gap between them",
      "Connect a source, and charge piles up between them",
      "Give it a path, and the charge rushes back out",
      "<strong>A capacitor is a tiny bucket for electric charge</strong>"
    ],
    quiz:[
      { q:"A capacitor is best compared to:", options:[
        {t:"A tiny bucket that fills with charge and can release it quickly", c:true},
        {t:"A one-way valve for current"},
        {t:"A permanent magnet"} ] },
      { q:"What happens to a charged capacitor once it is disconnected and given a path to flow?", options:[
        {t:"It stays charged forever"}, {t:"It discharges, releasing its stored charge", c:true}, {t:"It explodes"} ] }
    ]
  },
  {
    id:"inductor",
    subject:"physics",
    orbit:{ around:"electronics", radius:70, angle:144, speed:26 },
    label:"Inductor",
    chapter:"ATLAS ENTRY 09 • THE RELUCTANT COIL",
    title:"Inductor",
    hook:"A sudden power spike races down a wire toward a sensitive circuit. Something needs to smooth that spike out before it does damage — without a single moving part.",
    sections:[
      { title:"Building a Magnetic Field", body:"An inductor is just a coil of wire. When current flows through it, the coil builds up a magnetic field around itself, storing a little bit of energy in that field the way a spinning flywheel stores energy in its motion." },
      { title:"Opposing Change", body:"That magnetic field pushes back against any sudden change in the current — a heavy flywheel resists being sped up or slowed down abruptly, and an inductor behaves the same way electrically. This makes inductors useful for smoothing out sudden spikes and dips in a circuit." }
    ],
    sim:{
      type:"inductor",
      canvasId:"inductorCanvas",
      title:"Experiment: Strengthen the Field",
      width:700, height:240,
      controls:[
        { id:"inductorHenries", label:"Field Strength", min:1, max:10, value:5 }
      ],
      readout:{ id:"inductorRead", label:"What's happening" }
    },
    mentalPicture:[
      "Current flows through a coil of wire",
      "The coil builds a magnetic field around itself",
      "That field resists any sudden change in the current",
      "<strong>An inductor is a flywheel for electric current</strong>"
    ],
    quiz:[
      { q:"Why does an inductor resist sudden changes in current?", options:[
        {t:"It gets physically hot and expands"},
        {t:"Its magnetic field pushes back against the change, like a flywheel resisting a speed change", c:true},
        {t:"It has no resistance at all"} ] },
      { q:"An inductor is fundamentally just:", options:[
        {t:"Two metal plates facing each other"}, {t:"A coil of wire", c:true}, {t:"A striped cylinder"} ] }
    ]
  },
  {
    id:"led",
    subject:"physics",
    orbit:{ around:"electronics", radius:95, angle:216, speed:22 },
    label:"LED",
    chapter:"ATLAS ENTRY 10 • THE ONE-WAY LIGHT",
    title:"LED",
    hook:"An old-fashioned bulb glows because a thin wire inside it gets so hot it radiates light — most of the electricity becomes wasted heat. A tiny bead-shaped light on the same shelf uses a fraction of the power for the same brightness. What's different inside it?",
    sections:[
      { title:"One-Way Light", body:"A Light Emitting Diode (LED) only allows current to flow through it in one direction. When current flows the correct way, its internal material releases energy directly as light instead of heat. Connect it backward, and no current flows at all — no light, nothing happens." },
      { title:"Why It Needs a Resistor", body:"An LED offers very little resistance of its own, so if it's connected straight to a power source, current would rush through it unrestrained and burn it out almost instantly. That's why LEDs are almost always paired with a Resistor star in series — the resistor holds the current to a safe level so the LED can shine for years instead of seconds." }
    ],
    sim:{
      type:"led",
      canvasId:"ledCanvas",
      title:"Experiment: Dial Up the Brightness",
      width:700, height:260,
      controls:[
        { id:"ledCurrent", label:"Forward Current", min:1, max:10, value:5 }
      ],
      readout:{ id:"ledRead", label:"What's happening" }
    },
    mentalPicture:[
      "Current tries to flow through the LED",
      "Flowing the correct way, it releases energy as light",
      "Flowing backward, nothing happens at all",
      "<strong>An LED turns electricity directly into light, in one direction only</strong>"
    ],
    quiz:[
      { q:"An LED is connected backward in a circuit. What happens?", options:[
        {t:"It lights up dimly"}, {t:"It lights up brighter than normal"}, {t:"No current flows, so it stays dark", c:true} ] },
      { q:"Why is an LED almost always paired with a resistor?", options:[
        {t:"To make it look better"},
        {t:"To limit the current so the LED isn't destroyed", c:true},
        {t:"To reverse its direction"} ] }
    ]
  },
  {
    id:"motor",
    subject:"physics",
    orbit:{ around:"electronics", radius:70, angle:288, speed:28 },
    label:"Motor",
    chapter:"ATLAS ENTRY 11 • TURNING ELECTRICITY INTO MOTION",
    title:"Motor",
    hook:"A toy car's wheels spin the instant a battery is connected — no engine, no fuel, nothing burning. Just electricity going in, and spinning motion coming out.",
    sections:[
      { title:"Coil Meets Magnet", body:"A motor is a coil of wire sitting inside a magnetic field. When current flows through the coil, the magnetic forces described in the earlier Forces star push on it, making it spin. This is the same push-and-pull that makes a compass needle twitch, just arranged so the twitch never stops." },
      { title:"More Current, More Spin", body:"More current flowing through the coil, or a stronger surrounding magnetic field, both mean a stronger push — and a faster spin. This is how electrical energy becomes mechanical motion, whether it's spinning a tiny toy's wheels or a washing machine drum." }
    ],
    sim:{
      type:"motor",
      canvasId:"motorCanvas",
      title:"Experiment: Power the Motor",
      width:700, height:260,
      controls:[
        { id:"motorPower", label:"Applied Power", min:1, max:10, value:5 }
      ],
      readout:{ id:"motorRead", label:"What's happening" }
    },
    mentalPicture:[
      "A coil of wire sits inside a magnetic field",
      "Current flows through the coil",
      "The magnetic force pushes the coil around",
      "<strong>A motor turns electrical energy into spinning motion</strong>"
    ],
    quiz:[
      { q:"A motor converts electrical energy into:", options:[
        {t:"Stored charge"}, {t:"Mechanical motion, by spinning a coil inside a magnetic field", c:true}, {t:"Pure heat only"} ] },
      { q:"What happens to a motor's spin speed if you increase the current through its coil?", options:[
        {t:"It spins faster", c:true}, {t:"It spins slower"}, {t:"Nothing changes"} ] }
    ]
  }
);
