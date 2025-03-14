import { type ReactNode } from "react";

export interface Link {
  text: string;
  url: string;
}

export interface Job {
  title: string;
  company: string;
  period: string;
  accomplishments: string[];
  techStack: string;
}

export interface Resume {
  id: string;
  title: string;
  name: string;
  icon: ReactNode;
  titles: string[];
  email: string;
  links: Link[];
  highlightedTitle: string;
  summary: string;
  experience: Job[];
  skills?: string[][];
  keyAchievements?: string[];
  education?: string[];
}
