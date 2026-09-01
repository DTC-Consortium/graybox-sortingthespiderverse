// Worldwide box-office gross, USD. Snapshot date: 2026-08-31.
// Sources: Box Office Mojo, The Numbers, Variety, The Hollywood Reporter.
// Inclusion rule: Spider-Man (Peter Parker or Miles Morales) must be the title
// character and lead protagonist of the film. Ensemble/cameo appearances
// (Captain America: Civil War, the Avengers films) and spin-offs where he is
// not the protagonist (Venom) are excluded.
export interface SpiderManMovie {
  title: string
  shortTitle: string
  year: number
  worldwideGross: number
  note?: string
}

export const spidermanMovies: SpiderManMovie[] = [
  { title: 'Spider-Man', shortTitle: 'Spider-Man', year: 2002, worldwideGross: 823_929_972 },
  { title: 'Spider-Man 2', shortTitle: 'Spider-Man 2', year: 2004, worldwideGross: 797_001_599 },
  { title: 'Spider-Man 3', shortTitle: 'Spider-Man 3', year: 2007, worldwideGross: 896_337_268 },
  { title: 'The Amazing Spider-Man', shortTitle: 'Amazing SM', year: 2012, worldwideGross: 757_930_663 },
  { title: 'The Amazing Spider-Man 2', shortTitle: 'Amazing SM 2', year: 2014, worldwideGross: 716_934_779 },
  { title: 'Spider-Man: Homecoming', shortTitle: 'Homecoming', year: 2017, worldwideGross: 880_166_924 },
  { title: 'Spider-Man: Into the Spider-Verse', shortTitle: 'Into Spider-Verse', year: 2018, worldwideGross: 373_807_069 },
  { title: 'Spider-Man: Far From Home', shortTitle: 'Far From Home', year: 2019, worldwideGross: 1_132_723_226 },
  { title: 'Spider-Man: No Way Home', shortTitle: 'No Way Home', year: 2021, worldwideGross: 1_921_206_586 },
  { title: 'Spider-Man: Across the Spider-Verse', shortTitle: 'Across Spider-Verse', year: 2023, worldwideGross: 690_824_738 },
  {
    title: 'Spider-Man: Brand New Day',
    shortTitle: 'Brand New Day',
    year: 2026,
    worldwideGross: 2_332_821_029,
    note: 'Still in theatrical release as of the 2026-08-31 snapshot; total will continue to climb.',
  },
]

export const moviesByGrossAscending = [...spidermanMovies].sort(
  (a, b) => a.worldwideGross - b.worldwideGross,
)
