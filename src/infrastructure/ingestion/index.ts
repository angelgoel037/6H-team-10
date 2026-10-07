import { CampusItemDraft } from '@/src/domain/campus-item';
import { SourceType } from '@/src/shared/constants';

/**
 * Open/Closed Principle: IContentSource allows new campus information sources
 * (manual upload, poster extraction, email, ERP, websites) to be added without modifying the domain model.
 * Reference: docs/phase-0/03-ARCHITECTURE.md Section 8
 */
export interface IContentSource {
  readonly sourceType: SourceType;
  readonly name: string;
  fetchDrafts(): Promise<CampusItemDraft[]>;
}
