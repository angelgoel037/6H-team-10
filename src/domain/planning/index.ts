import { CampusItem } from '../campus-item/types';

export interface PlanItem {
  id: string;
  userId: string;
  campusItemId: string;
  item: CampusItem;
  addedAt: string;
}

export interface PlanConflict {
  itemA: CampusItem;
  itemB: CampusItem;
  reason: string;
}

/**
 * Interface for time-conflict detection in Student's personal plan
 * Contract: FR-007 (A.start < B.end && B.start < A.end on same date)
 */
export interface IPlanningConflictDetector {
  hasConflict(itemA: CampusItem, itemB: CampusItem): boolean;
  findConflicts(items: CampusItem[]): PlanConflict[];
}

export interface IPlanRepository {
  getPlan(userId: string): Promise<PlanItem[]>;
  addItem(userId: string, item: CampusItem): Promise<PlanItem>;
  removeItem(userId: string, campusItemId: string): Promise<void>;
  hasItem(userId: string, campusItemId: string): Promise<boolean>;
}
