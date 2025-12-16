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
  // Behaviours the user can competently demonstrate (holistic self-assessment - includes previous roles/experiences)
  demonstratedDescriptors?: SelectedDescriptor[];
  // Descriptors the user WANTS TO develop (development plan)
  developmentFocus?: SelectedDescriptor[];
  // Development notes per focus area
  developmentNotes?: Record<string, string>; // key: "level-descriptorIndex"
  // Legacy field - kept for backward compatibility during migration
  focusAreas?: SelectedDescriptor[];
  // Explicitly included in assessment set (for capabilities outside current role or with zero experience)
  // Allows capability to appear in development plan even if no level selected or descriptors ticked
  isIncluded?: boolean;
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

