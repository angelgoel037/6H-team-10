import {
  CampusCategory,
  ImportanceLevel,
  ItemStatus,
  AudienceType,
  SourceType,
} from '@/src/shared/constants';

/**
 * CampusItem — The normalized representation of all campus life information.
 * Supports technical events, cultural activities, sports, wellness, notices, etc.
 * Reference: docs/phase-0/03-ARCHITECTURE.md Section 5
 */
export interface CampusItem {
  id: string;
  title: string;
  description: string;
  category: CampusCategory;
  subCategory?: string | null;
  date: string; // ISO date string (YYYY-MM-DD)
  startTime?: string | null; // HH:mm format
  endTime?: string | null; // HH:mm format
  venue?: string | null;
  organizer: string;
  registrationUrl?: string | null;
  deadline?: string | null; // ISO date/time string
  audience: AudienceType;
  importance: ImportanceLevel;
  tags: string[];
  source: SourceType;
  status: ItemStatus;
  imageUrl?: string | null;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

/**
 * CampusItemDraft — Unverified draft item produced by AI extraction or initial publisher form
 */
export type CampusItemDraft = Partial<Omit<CampusItem, 'id' | 'createdAt' | 'updatedAt'>> & {
  title: string;
  category: CampusCategory;
  organizer: string;
};

/**
 * Filter criteria for querying campus items
 */
export interface CampusItemFilter {
  category?: CampusCategory;
  categories?: CampusCategory[];
  startDate?: string;
  endDate?: string;
  status?: ItemStatus;
  importance?: ImportanceLevel;
  audience?: AudienceType;
  searchQuery?: string;
}

/**
 * Repository interface adhering to Interface Segregation & Dependency Inversion (SOLID)
 */
export interface ICampusItemReader {
  findById(id: string): Promise<CampusItem | null>;
  findMany(filter?: CampusItemFilter): Promise<CampusItem[]>;
  findImportant(limit?: number): Promise<CampusItem[]>;
}

export interface ICampusItemWriter {
  create(item: Omit<CampusItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<CampusItem>;
  update(id: string, item: Partial<CampusItem>): Promise<CampusItem>;
  setStatus(id: string, status: ItemStatus): Promise<CampusItem>;
}

export interface ICampusItemRepository extends ICampusItemReader, ICampusItemWriter {}
