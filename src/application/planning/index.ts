import { CampusItem } from '@/src/domain/campus-item';
import { IPlanRepository, IPlanningConflictDetector, PlanConflict, PlanItem } from '@/src/domain/planning';

export class ManagePlanUseCase {
  constructor(
    private readonly planRepository: IPlanRepository,
    private readonly conflictDetector: IPlanningConflictDetector
  ) {}

  async getUserPlan(userId: string): Promise<{ items: PlanItem[]; conflicts: PlanConflict[] }> {
    const items = await this.planRepository.getPlan(userId);
    const campusItems = items.map((p) => p.item);
    const conflicts = this.conflictDetector.findConflicts(campusItems);
    return { items, conflicts };
  }

  async addItemToPlan(userId: string, item: CampusItem): Promise<PlanItem> {
    return this.planRepository.addItem(userId, item);
  }

  async removeItemFromPlan(userId: string, campusItemId: string): Promise<void> {
    return this.planRepository.removeItem(userId, campusItemId);
  }
}
