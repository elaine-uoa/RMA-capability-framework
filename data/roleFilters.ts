import { CapabilityLevel } from "@/types";

export interface RoleCapabilityMapping {
  capabilityId: string;
  level: CapabilityLevel;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  capabilities: RoleCapabilityMapping[];
}

export interface Function {
  id: string;
  name: string;
  description?: string;
  capabilities: RoleCapabilityMapping[];
}

// Real Role Mapping provided by the RMA team (with placeholder data expanded for UI demonstration)
export const roles: Role[] = [
  {
    id: "research-programme-coordinator",
    name: "Research Programme Coordinator",
    description: "Coordinates research programmes and initiatives",
    capabilities: [
      { capabilityId: "research-engagement", level: "FOUNDATION" },
      { capabilityId: "maximising-impact", level: "FOUNDATION" },
      { capabilityId: "researcher-development", level: "FOUNDATION" },
      { capabilityId: "environment-culture", level: "FOUNDATION" },
      { capabilityId: "funding-opportunities", level: "INTERMEDIATE" },
      { capabilityId: "proposal-support", level: "INTERMEDIATE" },
      { capabilityId: "initiation", level: "INTERMEDIATE" },
      { capabilityId: "projects-initiatives", level: "INTERMEDIATE" },
      { capabilityId: "monitoring-reporting", level: "FOUNDATION" },
      { capabilityId: "policy-strategy", level: "FOUNDATION" },
    ]
  },
  {
    id: "research-funding-specialist",
    name: "Research Funding Specialist",
    description: "Specialises in identifying and supporting funding opportunities",
    capabilities: [
      { capabilityId: "funding-opportunities", level: "ADVANCED" },
      { capabilityId: "proposal-support", level: "ADVANCED" },
      { capabilityId: "research-engagement", level: "INTERMEDIATE" },
      { capabilityId: "monitoring-reporting", level: "INTERMEDIATE" },
    ]
  },
  {
    id: "research-impact-advisor",
    name: "Research Impact Advisor",
    description: "Focuses on maximising research impact and engagement",
    capabilities: [
      { capabilityId: "maximising-impact", level: "ADVANCED" },
      { capabilityId: "research-engagement", level: "ADVANCED" },
      { capabilityId: "monitoring-reporting", level: "INTERMEDIATE" },
      { capabilityId: "policy-strategy", level: "INTERMEDIATE" },
    ]
  },
  {
    id: "contract-administrator",
    name: "Contract Administrator",
    description: "Manages research contracts and agreements",
    capabilities: [
      { capabilityId: "initiation", level: "ADVANCED" },
      { capabilityId: "projects-initiatives", level: "INTERMEDIATE" },
      { capabilityId: "monitoring-reporting", level: "INTERMEDIATE" },
      { capabilityId: "policy-strategy", level: "FOUNDATION" },
    ]
  },
  {
    id: "ethics-administrator",
    name: "Ethics Administrator",
    description: "Oversees research ethics applications and compliance",
    capabilities: [
      { capabilityId: "policy-strategy", level: "INTERMEDIATE" },
      { capabilityId: "monitoring-reporting", level: "INTERMEDIATE" },
      { capabilityId: "researcher-development", level: "FOUNDATION" },
    ]
  },
  {
    id: "grants-manager",
    name: "Grants Manager",
    description: "Manages grant applications and reporting processes",
    capabilities: [
      { capabilityId: "funding-opportunities", level: "ADVANCED" },
      { capabilityId: "proposal-support", level: "ADVANCED" },
      { capabilityId: "monitoring-reporting", level: "ADVANCED" },
      { capabilityId: "projects-initiatives", level: "INTERMEDIATE" },
    ]
  },
  {
    id: "knowledge-exchange-officer",
    name: "Knowledge Exchange Officer",
    description: "Facilitates knowledge transfer and partnerships",
    capabilities: [
      { capabilityId: "research-engagement", level: "ADVANCED" },
      { capabilityId: "maximising-impact", level: "ADVANCED" },
      { capabilityId: "environment-culture", level: "INTERMEDIATE" },
    ]
  },
  {
    id: "postdoctoral-coordinator",
    name: "Postdoctoral Coordinator",
    description: "Supports postdoctoral researchers' development and administration",
    capabilities: [
      { capabilityId: "researcher-development", level: "INTERMEDIATE" },
      { capabilityId: "environment-culture", level: "INTERMEDIATE" },
      { capabilityId: "funding-opportunities", level: "FOUNDATION" },
    ]
  },
  {
    id: "research-analyst",
    name: "Research Analyst",
    description: "Analyses research data and performance metrics",
    capabilities: [
      { capabilityId: "monitoring-reporting", level: "ADVANCED" },
      { capabilityId: "policy-strategy", level: "INTERMEDIATE" },
      { capabilityId: "maximising-impact", level: "INTERMEDIATE" },
    ]
  },
  {
    id: "research-administrator",
    name: "Research Administrator",
    description: "Provides general administrative support for research activities",
    capabilities: [
      { capabilityId: "projects-initiatives", level: "FOUNDATION" },
      { capabilityId: "monitoring-reporting", level: "FOUNDATION" },
      { capabilityId: "proposal-support", level: "FOUNDATION" },
    ]
  },
  {
    id: "research-communications-specialist",
    name: "Research Communications Specialist",
    description: "Manages research communications and public engagement",
    capabilities: [
      { capabilityId: "research-engagement", level: "ADVANCED" },
      { capabilityId: "maximising-impact", level: "ADVANCED" },
      { capabilityId: "environment-culture", level: "INTERMEDIATE" },
    ]
  },
  {
    id: "research-facilities-manager",
    name: "Research Facilities Manager",
    description: "Oversees research facilities and infrastructure",
    capabilities: [
      { capabilityId: "projects-initiatives", level: "ADVANCED" },
      { capabilityId: "environment-culture", level: "INTERMEDIATE" },
      { capabilityId: "policy-strategy", level: "INTERMEDIATE" },
    ]
  },
  {
    id: "research-finance-officer",
    name: "Research Finance Officer",
    description: "Manages financial aspects of research projects",
    capabilities: [
      { capabilityId: "monitoring-reporting", level: "ADVANCED" },
      { capabilityId: "projects-initiatives", level: "INTERMEDIATE" },
      { capabilityId: "initiation", level: "INTERMEDIATE" },
    ]
  },
  {
    id: "research-partnerships-manager",
    name: "Research Partnerships Manager",
    description: "Develops and maintains research partnerships",
    capabilities: [
      { capabilityId: "research-engagement", level: "EXEMPLAR" },
      { capabilityId: "maximising-impact", level: "ADVANCED" },
      { capabilityId: "policy-strategy", level: "ADVANCED" },
    ]
  },
  {
    id: "research-strategy-officer",
    name: "Research Strategy Officer",
    description: "Develops and implements research strategy",
    capabilities: [
      { capabilityId: "policy-strategy", level: "ADVANCED" },
      { capabilityId: "monitoring-reporting", level: "ADVANCED" },
      { capabilityId: "funding-opportunities", level: "INTERMEDIATE" },
    ]
  },
  {
    id: "senior-research-officer",
    name: "Senior Research Officer",
    description: "Senior-level research administration and management",
    capabilities: [
      { capabilityId: "projects-initiatives", level: "ADVANCED" },
      { capabilityId: "researcher-development", level: "ADVANCED" },
      { capabilityId: "policy-strategy", level: "ADVANCED" },
      { capabilityId: "monitoring-reporting", level: "ADVANCED" },
    ]
  },
].sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically

// Placeholder functions for demonstration (expanded for UI demonstration)
export const functions: Function[] = [
  {
    id: "research-operations",
    name: "Research Operations",
    description: "Day-to-day management and administration of research activities",
    capabilities: [
      { capabilityId: "projects-initiatives", level: "INTERMEDIATE" },
      { capabilityId: "initiation", level: "INTERMEDIATE" },
      { capabilityId: "monitoring-reporting", level: "INTERMEDIATE" },
      { capabilityId: "policy-strategy", level: "FOUNDATION" },
    ]
  },
  {
    id: "research-development",
    name: "Research Development",
    description: "Supporting researcher capabilities and proposal development",
    capabilities: [
      { capabilityId: "researcher-development", level: "INTERMEDIATE" },
      { capabilityId: "funding-opportunities", level: "INTERMEDIATE" },
      { capabilityId: "proposal-support", level: "INTERMEDIATE" },
      { capabilityId: "environment-culture", level: "INTERMEDIATE" },
    ]
  },
  {
    id: "strategic-partnerships",
    name: "Strategic Partnerships",
    description: "Building research partnerships and engagement",
    capabilities: [
      { capabilityId: "research-engagement", level: "ADVANCED" },
      { capabilityId: "maximising-impact", level: "ADVANCED" },
      { capabilityId: "policy-strategy", level: "INTERMEDIATE" },
    ]
  },
  {
    id: "commercialisation",
    name: "Commercialisation",
    description: "Managing commercialisation of research outcomes",
    capabilities: [
      { capabilityId: "maximising-impact", level: "ADVANCED" },
      { capabilityId: "research-engagement", level: "INTERMEDIATE" },
      { capabilityId: "projects-initiatives", level: "INTERMEDIATE" },
    ]
  },
  {
    id: "compliance-governance",
    name: "Compliance & Governance",
    description: "Ensuring research compliance and governance standards",
    capabilities: [
      { capabilityId: "policy-strategy", level: "ADVANCED" },
      { capabilityId: "monitoring-reporting", level: "ADVANCED" },
      { capabilityId: "projects-initiatives", level: "INTERMEDIATE" },
    ]
  },
  {
    id: "data-management",
    name: "Data Management",
    description: "Managing research data infrastructure and policies",
    capabilities: [
      { capabilityId: "policy-strategy", level: "INTERMEDIATE" },
      { capabilityId: "projects-initiatives", level: "INTERMEDIATE" },
      { capabilityId: "researcher-development", level: "FOUNDATION" },
    ]
  },
  {
    id: "ethics-integrity",
    name: "Ethics & Integrity",
    description: "Overseeing research ethics and integrity processes",
    capabilities: [
      { capabilityId: "policy-strategy", level: "ADVANCED" },
      { capabilityId: "monitoring-reporting", level: "INTERMEDIATE" },
      { capabilityId: "researcher-development", level: "INTERMEDIATE" },
    ]
  },
  {
    id: "facilities-infrastructure",
    name: "Facilities & Infrastructure",
    description: "Managing research facilities and infrastructure",
    capabilities: [
      { capabilityId: "projects-initiatives", level: "ADVANCED" },
      { capabilityId: "environment-culture", level: "INTERMEDIATE" },
      { capabilityId: "initiation", level: "INTERMEDIATE" },
    ]
  },
  {
    id: "financial-management",
    name: "Financial Management",
    description: "Managing research finances and budgets",
    capabilities: [
      { capabilityId: "monitoring-reporting", level: "ADVANCED" },
      { capabilityId: "projects-initiatives", level: "ADVANCED" },
      { capabilityId: "initiation", level: "INTERMEDIATE" },
    ]
  },
  {
    id: "grant-contract-management",
    name: "Grant & Contract Management",
    description: "Managing research grants and contracts",
    capabilities: [
      { capabilityId: "funding-opportunities", level: "ADVANCED" },
      { capabilityId: "initiation", level: "ADVANCED" },
      { capabilityId: "monitoring-reporting", level: "ADVANCED" },
    ]
  },
  {
    id: "impact-engagement",
    name: "Impact & Engagement",
    description: "Maximising research impact and public engagement",
    capabilities: [
      { capabilityId: "maximising-impact", level: "EXEMPLAR" },
      { capabilityId: "research-engagement", level: "EXEMPLAR" },
      { capabilityId: "environment-culture", level: "INTERMEDIATE" },
    ]
  },
  {
    id: "international-research",
    name: "International Research",
    description: "Supporting international research collaborations",
    capabilities: [
      { capabilityId: "research-engagement", level: "ADVANCED" },
      { capabilityId: "funding-opportunities", level: "INTERMEDIATE" },
      { capabilityId: "policy-strategy", level: "INTERMEDIATE" },
    ]
  },
  {
    id: "knowledge-transfer",
    name: "Knowledge Transfer",
    description: "Facilitating knowledge transfer and exchange",
    capabilities: [
      { capabilityId: "research-engagement", level: "ADVANCED" },
      { capabilityId: "maximising-impact", level: "ADVANCED" },
      { capabilityId: "researcher-development", level: "INTERMEDIATE" },
    ]
  },
  {
    id: "proposal-development",
    name: "Proposal Development",
    description: "Supporting research proposal development",
    capabilities: [
      { capabilityId: "proposal-support", level: "EXEMPLAR" },
      { capabilityId: "funding-opportunities", level: "ADVANCED" },
      { capabilityId: "research-engagement", level: "INTERMEDIATE" },
    ]
  },
  {
    id: "researcher-support",
    name: "Researcher Support",
    description: "Providing comprehensive support for researchers",
    capabilities: [
      { capabilityId: "researcher-development", level: "ADVANCED" },
      { capabilityId: "environment-culture", level: "ADVANCED" },
      { capabilityId: "proposal-support", level: "INTERMEDIATE" },
    ]
  },
  {
    id: "strategy-planning",
    name: "Strategy & Planning",
    description: "Developing and implementing research strategy",
    capabilities: [
      { capabilityId: "policy-strategy", level: "EXEMPLAR" },
      { capabilityId: "monitoring-reporting", level: "ADVANCED" },
      { capabilityId: "maximising-impact", level: "INTERMEDIATE" },
    ]
  },
].sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically

// Helper function to get all capability IDs for a role
export function getCapabilityIdsForRole(roleId: string): string[] {
  const role = roles.find(r => r.id === roleId);
  return role ? role.capabilities.map(c => c.capabilityId) : [];
}

// Helper function to get all capability IDs for a function
export function getCapabilityIdsForFunction(functionId: string): string[] {
  const func = functions.find(f => f.id === functionId);
  return func ? func.capabilities.map(c => c.capabilityId) : [];
}
