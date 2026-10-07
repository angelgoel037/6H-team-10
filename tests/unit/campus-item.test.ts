import { describe, it, expect } from 'vitest';
import { CampusItemSchema, CampusItemDraftSchema } from '@/src/domain/campus-item/schema';
import sampleItems from '../../shared/sample-data/campus-items.sample.json';

describe('CampusItem Domain & Schema Validation', () => {
  it('should successfully validate well-formed CampusItems from sample data', () => {
    expect(sampleItems.length).toBeGreaterThan(0);

    for (const item of sampleItems) {
      const result = CampusItemSchema.safeParse(item);
      expect(result.success, `Validation failed for item: ${item.id}`).toBe(true);
    }
  });

  it('should reject a CampusItem with invalid category', () => {
    const invalidItem = {
      ...sampleItems[0],
      category: 'invalid_category_xyz',
    };

    const result = CampusItemSchema.safeParse(invalidItem);
    expect(result.success).toBe(false);
  });

  it('should reject a CampusItem with invalid date format', () => {
    const invalidItem = {
      ...sampleItems[0],
      date: '15-10-2026', // Expected YYYY-MM-DD
    };

    const result = CampusItemSchema.safeParse(invalidItem);
    expect(result.success).toBe(false);
  });

  it('should validate a draft item with minimal required fields', () => {
    const draft = {
      title: 'Quick Hackathon Draft',
      category: 'technical',
      organizer: 'Coding Society',
    };

    const result = CampusItemDraftSchema.safeParse(draft);
    expect(result.success).toBe(true);
  });
});
