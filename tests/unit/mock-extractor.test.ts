import { describe, it, expect } from 'vitest';
import { MockContentExtractor } from '@/src/infrastructure/ai';
import { CampusItemDraftSchema } from '@/src/domain/campus-item/schema';

describe('AI Extractor Contract & Mock Fallback', () => {
  it('should return valid structured CampusItemDraft from text extraction', async () => {
    const extractor = new MockContentExtractor();
    const rawText = 'Annual College Hackathon 2026 organized by Tech Society on 15th October at Main Audi.';

    const draft = await extractor.extractFromText(rawText);

    expect(draft.title).toBeDefined();
    expect(draft.category).toBe('technical');
    expect(draft.organizer).toBeDefined();

    const validation = CampusItemDraftSchema.safeParse(draft);
    expect(validation.success).toBe(true);
  });
});
