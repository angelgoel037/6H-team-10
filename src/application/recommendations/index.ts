import { ICampusItemReader, CampusItem } from '@/src/domain/campus-item';
import { StudentPreferences } from '@/src/domain/preferences';
import { IRecommendationEngine, RecommendationResult } from '@/src/domain/recommendation';

/**
 * Use case: Get personalized feed items ranked for a specific student profile
 */
export class GetPersonalizedFeedUseCase {
  constructor(
    private readonly reader: ICampusItemReader,
    private readonly recommendationEngine: IRecommendationEngine
  ) {}

  async execute(preferences: StudentPreferences): Promise<RecommendationResult[]> {
    const allPublished = await this.reader.findMany({ status: 'published' });
    return this.recommendationEngine.rank(allPublished, preferences);
  }
}
