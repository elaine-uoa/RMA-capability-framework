"use client";

import { useCallback, useMemo, useState } from "react";
import {
  clearGuidedFilterSelection,
  getCapabilityMappingsForSelection,
  getRelevantDescriptorIndexes,
  getRequiredLevelForCapability,
  GuidedFilterSelection,
  GuidedFilterType,
  loadGuidedFilterSelection,
  saveGuidedFilterSelection,
} from "@/data/roleFilters";
import { CapabilityLevel } from "@/types";

export function useGuidedFilter() {
  const [selection, setSelection] = useState<GuidedFilterSelection | null>(() =>
    loadGuidedFilterSelection()
  );

  const setGuidedFilter = useCallback((filterType: GuidedFilterType, filterId: string) => {
    const next = { filterType, filterId } satisfies GuidedFilterSelection;
    setSelection(next);
    saveGuidedFilterSelection(next);
  }, []);

  const clearGuidedFilter = useCallback(() => {
    setSelection(null);
    clearGuidedFilterSelection();
  }, []);

  const mappings = useMemo(() => {
    if (!selection) return [];
    return getCapabilityMappingsForSelection(selection.filterType, selection.filterId);
  }, [selection]);

  const mappedCapabilityIds = useMemo(
    () => mappings.map((m) => m.capabilityId),
    [mappings]
  );

  const getRequiredLevel = useCallback(
    (capabilityId: string): CapabilityLevel | null => {
      if (!selection) return null;
      return getRequiredLevelForCapability(selection.filterType, selection.filterId, capabilityId);
    },
    [selection]
  );

  const getRelevantDescriptorIndexesForLevel = useCallback(
    (capabilityId: string, level: CapabilityLevel, totalDescriptors: number): number[] => {
      const required = getRequiredLevel(capabilityId);
      if (!required || required !== level) return [];
      return getRelevantDescriptorIndexes(required, totalDescriptors);
    },
    [getRequiredLevel]
  );

  const isMappedCapability = useCallback(
    (capabilityId: string) => mappedCapabilityIds.includes(capabilityId),
    [mappedCapabilityIds]
  );

  return {
    selection,
    filterType: selection?.filterType ?? null,
    selectedFilterId: selection?.filterId ?? null,
    mappings,
    mappedCapabilityIds,
    isGuidedFilterActive: !!selection,
    setGuidedFilter,
    clearGuidedFilter,
    getRequiredLevel,
    getRelevantDescriptorIndexesForLevel,
    isMappedCapability,
  };
}

