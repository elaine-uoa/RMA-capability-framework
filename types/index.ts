export type CapabilityLevel = "FOUNDATION" | "INTERMEDIATE" | "ADVANCED" | "EXEMPLAR";

export interface CapabilityLevelDescriptor {
  level: CapabilityLevel;
  bulletPoints: string[];
  alignmentStatement?: string;
}

export interface Capability {
  id: string;
  name: string;
  description?: string;
  levels: CapabilityLevelDescriptor[];
}

export interface SelectedDescriptor {
  level: CapabilityLevel;
  descriptorIndex: number; // Index of the bullet point in the level's bulletPoints array
}

export interface AssessmentResponse {
  capabilityId: string;
  currentLevel: CapabilityLevel | null;
  desiredLevel: CapabilityLevel | null;
  notes: string;
  focusAreas?: SelectedDescriptor[]; // Selected descriptors as focus areas
}

export interface AssessmentState {
  responses: Record<string, AssessmentResponse>;
  lastUpdated: string;
}

// Future extension - placeholder for role mapping
export interface RoleProfile {
  id: string;
  title: string;
  description?: string;
  recommendedLevels: {
    capabilityId: string;
    level: CapabilityLevel;
  }[];
}

