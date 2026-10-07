import { ICampusItemWriter, CampusItemDraft, CampusItem } from '@/src/domain/campus-item';

export interface IExtractionService {
  extractFromText(text: string): Promise<CampusItemDraft>;
  extractFromImage(imageBuffer: Uint8Array, mimeType: string): Promise<CampusItemDraft>;
}

export class PublishCampusItemUseCase {
  constructor(
    private readonly writer: ICampusItemWriter,
    private readonly extractor: IExtractionService
  ) {}

  async extractDraft(rawInput: { text?: string; image?: { data: Uint8Array; mimeType: string } }): Promise<CampusItemDraft> {
    if (rawInput.image) {
      return this.extractor.extractFromImage(rawInput.image.data, rawInput.image.mimeType);
    }
    if (rawInput.text) {
      return this.extractor.extractFromText(rawInput.text);
    }
    throw new Error('Either text or image input must be provided for extraction.');
  }

  async publishItem(validatedDraft: Omit<CampusItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<CampusItem> {
    return this.writer.create({
      ...validatedDraft,
      status: 'published',
    });
  }
}
