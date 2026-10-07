/**
 * CampusPilot — Core Domain Constants & Enums
 * Source of truth: docs/phase-0/01-PRD.md & docs/phase-0/02-SRD.md
 */

export const CAMPUS_CATEGORIES = [
  'technical',
  'cultural_music',
  'sports',
  'social',
  'career',
  'wellness',
  'academic_important',
] as const;

export type CampusCategory = (typeof CAMPUS_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<CampusCategory, { label: string; icon: string; description: string }> = {
  technical: {
    label: 'Technical & Coding',
    icon: '💻',
    description: 'Hackathons, coding, AI, robotics, tech workshops',
  },
  cultural_music: {
    label: 'Cultural & Music',
    icon: '🎵',
    description: 'Music society, dance, drama, art, open mic',
  },
  sports: {
    label: 'Sports & Esports',
    icon: '🏆',
    description: 'Cricket, football, basketball, athletics, esports',
  },
  social: {
    label: 'Social & Campus Life',
    icon: '🎉',
    description: 'Freshers, farewell, fests, parties, student gatherings',
  },
  career: {
    label: 'Career & Internships',
    icon: '💼',
    description: 'Placement talks, internships, company sessions, resume workshops',
  },
  wellness: {
    label: 'Wellness & Psychology',
    icon: '🧠',
    description: 'Psychology sessions, health camps, mental wellbeing workshops',
  },
  academic_important: {
    label: 'Academic & Notices',
    icon: '📢',
    description: 'MST/exam schedules, results, key institutional notices',
  },
};

export const IMPORTANCE_LEVELS = ['normal', 'high', 'critical'] as const;
export type ImportanceLevel = (typeof IMPORTANCE_LEVELS)[number];

export const ITEM_STATUSES = ['draft', 'published', 'cancelled', 'archived'] as const;
export type ItemStatus = (typeof ITEM_STATUSES)[number];

export const AUDIENCE_TYPES = ['all_students', 'specific_group', 'specific_department'] as const;
export type AudienceType = (typeof AUDIENCE_TYPES)[number];

export const SOURCE_TYPES = ['publisher_manual', 'poster_extraction', 'future_integration'] as const;
export type SourceType = (typeof SOURCE_TYPES)[number];

/**
 * Heuristic weights for personalized ranking (PRD Section 9)
 */
export const RECOMMENDATION_WEIGHTS = {
  INTEREST_MATCH: 0.40,
  TIME_RELEVANCE: 0.25,
  URGENCY: 0.15,
  POPULARITY: 0.10,
  DISCOVERY: 0.10,
} as const;
