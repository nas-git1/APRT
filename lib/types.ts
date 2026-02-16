export type EventIndexItem = {
  slug: string;
  editionTitle: string;
  datesText: string;
  city: string;
  venue?: string;
  posterImagePath: string;
  status: "upcoming" | "past";
  featured?: boolean;
  startDateISO: string;
};

export type SessionTalk = {
  speaker?: string;
  title: string;
  time?: string;
};

export type ProgrammeSession = {
  title: string;
  time?: string;
  moderators?: string[];
  talks?: SessionTalk[];
};

export type ProgrammeDay = {
  key: string;
  label: string;
  sessions: ProgrammeSession[];
};

export type EventData = {
  slug: string;
  editionTitle: string;
  identityLine?: string;
  datesText: string;
  city: string;
  venue?: string;
  posterImagePath: string;
  themes: string[];
  prizes?: {
    first: string;
    second: string;
  };
  contacts: {
    name: string;
    phone: string;
  }[];
  email?: string;
  submissionDeadline?: string;
  sections: {
    programme?: {
      days: ProgrammeDay[];
    };
    speakers?: {
      name: string;
      role?: string;
    }[];
    eposters?: {
      title: string;
      language?: string;
      tags?: string[];
    }[];
    presidentMessage?: {
      content: string;
      signature: string;
    };
    practicalInfo?: {
      title: string;
      value: string;
    }[];
    documents?: {
      label: string;
      href: string;
    }[];
    usefulLinks?: {
      label: string;
      href: string;
    }[];
  };
};

export type NewsItem = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  href: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  imagePath: string;
};
