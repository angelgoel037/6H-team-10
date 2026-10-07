import { CampusItemDraft } from '@/src/domain/campus-item';
import { IExtractionService } from '@/src/application/publishing';

/**
 * Provider-agnostic AI extraction interface
 * Reference: docs/phase-0/03-ARCHITECTURE.md Section 9 & docs/phase-0/05-ENGINEERING-STANDARDS.md Section 8
 */
export interface IAIExtractorProvider {
  name: string;
  extractFromText(text: string): Promise<CampusItemDraft>;
  extractFromPosterImage(imageBuffer: Uint8Array, mimeType: string): Promise<CampusItemDraft>;
}

/**
 * Deterministic Mock AI Extractor — used for offline testing, local dev, and reliable demo fallbacks
 */
export class MockContentExtractor implements IAIExtractorProvider, IExtractionService {
  name = 'mock';

  async extractFromText(text: string): Promise<CampusItemDraft> {
    return {
      title: 'Extracted Sample Campus Event',
      description: text.slice(0, 150) || 'Sample description extracted from announcement.',
      category: 'technical',
      organizer: 'Tech Society',
      date: new Date().toISOString().split('T')[0],
      startTime: '16:00',
      endTime: '18:00',
      venue: 'Main Auditorium',
      audience: 'all_students',
      importance: 'normal',
      tags: ['hackathon', 'coding'],
      source: 'poster_extraction',
    };
  }

  async extractFromPosterImage(imageBuffer: Uint8Array, _mimeType: string): Promise<CampusItemDraft> {
    return this.extractFromImage(imageBuffer, _mimeType);
  }

  async extractFromImage(_imageBuffer: Uint8Array, _mimeType: string): Promise<CampusItemDraft> {
    return {
      title: 'Poster Extracted Hackathon 2026',
      description: 'Extracted details from uploaded poster image.',
      category: 'technical',
      organizer: 'Computer Science Department',
      date: new Date().toISOString().split('T')[0],
      startTime: '10:00',
      endTime: '17:00',
      venue: 'Innovation Hub',
      audience: 'all_students',
      importance: 'high',
      tags: ['ai', 'hackathon'],
      source: 'poster_extraction',
    };
  }
}
