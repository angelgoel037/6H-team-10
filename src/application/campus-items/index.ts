import { ICampusItemReader, CampusItem, CampusItemFilter } from '@/src/domain/campus-item';

/**
 * Use case: Get items for Explore page or filtered discovery
 */
export class GetCampusItemsUseCase {
  constructor(private readonly reader: ICampusItemReader) {}

  async execute(filter?: CampusItemFilter): Promise<CampusItem[]> {
    return this.reader.findMany(filter);
  }
}

/**
 * Use case: Get high-importance institutional campus updates (bypasses personalization)
 */
export class GetImportantCampusUpdatesUseCase {
  constructor(private readonly reader: ICampusItemReader) {}

  async execute(limit: number = 5): Promise<CampusItem[]> {
    return this.reader.findImportant(limit);
  }
}
