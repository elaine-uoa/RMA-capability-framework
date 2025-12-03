export type CapabilityLevel = "FOUNDATION" | "INTERMEDIATE" | "ADVANCED" | "EXEMPLAR";

export interface DescriptorAlignment {
  descriptorIndex: number; // Index of the bullet point
  alignmentText: string; // Alignment statement for this specific descriptor
  frameworks?: string[]; // Optional: frameworks this aligns to (e.g., "Whāia Te Hihiri", "Ngā Taumata Tutuki")
}

export interface CapabilityLevelDescriptor {
  level: CapabilityLevel;
  bulletPoints: string[];
  alignmentStatement?: string; // General alignment for the level (kept for backward compatibility)
  descriptorAlignments?: DescriptorAlignment[]; // Descriptor-specific alignments
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

