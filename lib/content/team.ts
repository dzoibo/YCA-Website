// Working teams shown in the team carousel. Names, taglines and roles are translated in
// lib/i18n (t.team.departments[key]); roles are matched to members by position.

export type DepartmentKey = "operations" | "marketing" | "events" | "sports";

export type Member = {
  /** File in public/assets. */
  photo: string;
  name: string;
  /** Team lead: highlighted with a yellow ring. */
  lead?: boolean;
};

export type Department = { key: DepartmentKey; members: Member[] };

const photos = {
  hilary: "team-hilary.png",
  anne: "team-anne.png",
  ines: "team-ines-portrait.png",
  franck: "team-franck.png",
  erika: "team-erika.jpg",
  loic: "team-loic.jpg",
  ulrich: "team-ulrich.jpg",
  isabelle: "team-isabelle.jpg",
  leaticia: "team-leaticia.jpg",
  edbi: "team-edbi.jpg",
  joy: "team-joy.jpg",
  fabiola: "team-fabiola.jpg",
  euclide: "team-euclide.jpg",
  ivan: "team-ivan.jpg",
} as const;

export const departments: Department[] = [
  {
    key: "operations",
    members: [
      { photo: photos.hilary, name: "Hilary Dondji" },
      { photo: photos.anne, name: "Anne Tembou" },
      { photo: photos.ines, name: "Ines Ngale" },
      { photo: photos.erika, name: "Erika Yimga" },
    ],
  },
  {
    key: "marketing",
    members: [
      { photo: photos.franck, name: "Franck Pokam", lead: true },
      { photo: photos.ines, name: "Ines Ngale" },
      { photo: photos.erika, name: "Erika Yimga" },
      { photo: photos.loic, name: "Loïc Atanga" },
      { photo: photos.ulrich, name: "Ulrich Njengoue" },
    ],
  },
  {
    key: "events",
    members: [
      { photo: photos.isabelle, name: "Isabelle Fokom", lead: true },
      { photo: photos.leaticia, name: "Leaticia Nde Mba" },
      { photo: photos.edbi, name: "Edbi Nocha" },
      { photo: photos.loic, name: "Loïc Atanga" },
      { photo: photos.joy, name: "Joy Scotia" },
    ],
  },
  {
    key: "sports",
    members: [
      { photo: photos.ivan, name: "Ivan Dzoibo", lead: true },
      { photo: photos.fabiola, name: "Fabiola Maboga" },
      { photo: photos.euclide, name: "Euclide Wamba" },
    ],
  },
];
