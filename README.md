# MindSky

Learn until you can see it.

MindSky is a free interactive learning site for students in Grades 6 to 12. Each subject is a constellation, and each topic is a star on it. Open a star and you get a short story, a clear explanation, an experiment you can change yourself, and a quiz that explains every answer.

## Subjects

- **Physics:** gravity, motion, forces, energy, electricity and electronics
- **Mathematics:** 17 topics, from primes and fractions to trigonometry and calculus
- **Chemistry:** atoms, the periodic table, bonding, reactions, acids and bases, the mole, gas laws, energy and rates, and carbon chemistry
- **Indian Geography & History:** physical features, rivers, the monsoon, the Indus Valley, empires, Tamilakam, the freedom struggle and the Republic

## Features

- Interactive experiments in every topic, plus a Lab for free play
- Quizzes with explanations, saved scores and mastery levels
- Stars and constellation lines light up as you learn
- Works offline once opened, and can be installed like an app
- A link for every topic, for example `#/chemistry/atoms`
- No accounts and no tracking. Progress stays in your own browser, with a backup code to move it between devices

## Project layout

```
index.html          the page
css/style.css       styles
data/               lessons, one file per subject
js/                 the app, experiments, Lab, router and backup
assets/             icons and images
sw.js               offline support
manifest.webmanifest
```

## Running it locally

There is nothing to install. From the project folder:

```
python3 -m http.server 8000
```

Then open http://localhost:8000 in a browser.

## License

Copyright © 2026 Mohan. All rights reserved.
