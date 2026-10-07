import { CampusCategory } from '@/src/shared/constants';
import { z } from 'zod';
import { CampusCategorySchema } from '../campus-item/schema';

export interface StudentPreferences {
  userId: string;
  selectedCategories: CampusCategory[];
  isOnboardingCompleted: boolean;
  updatedAt: string;
}

export const StudentPreferencesSchema = z.object({
  userId: z.string().min(1),
  selectedCategories: z.array(CampusCategorySchema),
  isOnboardingCompleted: z.boolean().default(false),
  updatedAt: z.string().datetime().or(z.string()),
});

export interface IPreferencesRepository {
  getPreferences(userId: string): Promise<StudentPreferences | null>;
  savePreferences(preferences: StudentPreferences): Promise<void>;
}
