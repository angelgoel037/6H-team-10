import { z } from 'zod';
import {
  CAMPUS_CATEGORIES,
  IMPORTANCE_LEVELS,
  ITEM_STATUSES,
  AUDIENCE_TYPES,
  SOURCE_TYPES,
} from '@/src/shared/constants';

export const CampusCategorySchema = z.enum(CAMPUS_CATEGORIES);
export const ImportanceLevelSchema = z.enum(IMPORTANCE_LEVELS);
export const ItemStatusSchema = z.enum(ITEM_STATUSES);
export const AudienceTypeSchema = z.enum(AUDIENCE_TYPES);
export const SourceTypeSchema = z.enum(SOURCE_TYPES);

/**
 * Zod validation schema for CampusItem
 */
export const CampusItemSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  category: CampusCategorySchema,
  subCategory: z.string().nullable().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:mm format').nullable().optional(),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:mm format').nullable().optional(),
  venue: z.string().nullable().optional(),
  organizer: z.string().min(2, 'Organizer name is required'),
  registrationUrl: z.string().url('Invalid registration URL').nullable().optional(),
  deadline: z.string().nullable().optional(),
  audience: AudienceTypeSchema.default('all_students'),
  importance: ImportanceLevelSchema.default('normal'),
  tags: z.array(z.string()).default([]),
  source: SourceTypeSchema.default('publisher_manual'),
  status: ItemStatusSchema.default('published'),
  imageUrl: z.string().url('Invalid image URL').nullable().optional(),
  createdAt: z.string().datetime().or(z.string()),
  updatedAt: z.string().datetime().or(z.string()),
});

export type CampusItemValidated = z.infer<typeof CampusItemSchema>;

/**
 * Zod schema for Draft item before human review & publishing
 */
export const CampusItemDraftSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional().default(''),
  category: CampusCategorySchema,
  subCategory: z.string().nullable().optional(),
  date: z.string().optional(),
  startTime: z.string().nullable().optional(),
  endTime: z.string().nullable().optional(),
  venue: z.string().nullable().optional(),
  organizer: z.string().min(1, 'Organizer is required'),
  registrationUrl: z.string().url().nullable().optional(),
  deadline: z.string().nullable().optional(),
  audience: AudienceTypeSchema.optional().default('all_students'),
  importance: ImportanceLevelSchema.optional().default('normal'),
  tags: z.array(z.string()).optional().default([]),
  source: SourceTypeSchema.optional().default('poster_extraction'),
  imageUrl: z.string().nullable().optional(),
});
