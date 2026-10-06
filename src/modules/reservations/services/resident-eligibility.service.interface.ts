export const RESIDENT_ELIGIBILITY_SERVICE = 'RESIDENT_ELIGIBILITY_SERVICE';

export interface IResidentEligibilityService {
  isEligible(residentId: string): Promise<boolean>;
}
