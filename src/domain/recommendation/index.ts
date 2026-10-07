import { CampusItem } from '../campus-item/types';
import { StudentPreferences } from '../preferences';

export type UrgencyLevel = 'normal' | 'soon' | 'urgent';

export interface RecommendationResult {
  item: CampusItem;
  score: number; // 0 to 100
  reasons: string[];
  urgency: UrgencyLevel;
}

/**
 * RecommendationEngine interface following Strategy / Dependency Inversion pattern
 */
export interface IRecommendationEngine {
  rank(items: CampusItem[], preferences: StudentPreferences): RecommendationResult[];
  calculateScore(item: CampusItem, preferences: StudentPreferences): RecommendationResult;
}
