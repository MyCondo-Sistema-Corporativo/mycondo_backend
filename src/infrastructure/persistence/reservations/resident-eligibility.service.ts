import { IResidentEligibilityService } from '../../../modules/reservations/services/resident-eligibility.service.interface.js';

export class ConfiguredResidentEligibilityService
  implements IResidentEligibilityService
{
  private readonly eligibleResidents: Set<string>;

  constructor() {
    const configuredResidents =
      process.env.ELIGIBLE_RESIDENT_IDS ?? 'resident-1,resident-2';
    this.eligibleResidents = new Set(
      configuredResidents
        .split(',')
        .map((residentId) => residentId.trim())
        .filter(Boolean),
    );
  }

  async isEligible(residentId: string): Promise<boolean> {
    return this.eligibleResidents.has(residentId);
  }
}
