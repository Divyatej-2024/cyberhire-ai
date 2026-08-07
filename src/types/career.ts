export type CareerRole =
  | 'student'
  | 'graduate'
  | 'soc-analyst'
  | 'cloud-security'
  | 'network-engineer'
  | 'it-support'
  | 'security-analyst'
  | 'career-switcher';

export type OpportunityStatus =
  | 'queued'
  | 'applied'
  | 'interview'
  | 'assessment'
  | 'offer'
  | 'rejected'
  | 'withdrawn'
  | 'ghosted';

export interface OpportunityRecord {
  id: string;
  title: string;
  company: string;
  roleFamily: string;
  location: string;
  remote: boolean;
  salaryBand: string;
  postedAt: string;
  matchScore: number;
  sponsorshipSignal: 'unknown' | 'likely' | 'low-risk' | 'high-risk';
  status: OpportunityStatus;
  notes?: string;
}

export interface ProfileSnapshot {
  id: string;
  fullName: string;
  role: CareerRole;
  focusAreas: string[];
  certifications: string[];
  experienceYears: number;
  location: string;
  visaNeeds: boolean;
}
