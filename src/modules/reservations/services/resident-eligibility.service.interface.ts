export const RESIDENT_ELIGIBILITY_SERVICE = 'RESIDENT_ELIGIBILITY_SERVICE';

// Is the resident elegible?
export interface IResidentEligibilityService {
  isEligible(residentId: string): Promise<boolean>;
}
