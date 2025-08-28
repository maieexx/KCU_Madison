export interface Project {
  _id: string;
  semester: string;
  isWinner?: boolean;
  teamName: string;
  teamMembers: string[];
  presentation: string;
  presentationThumb?: string;
  title: string;
  description: string;
  languages: string[];
  github: string | null;
}

