"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { AssessmentState, AssessmentResponse, CapabilityLevel } from "@/types";

interface AssessmentContextType {
  assessmentState: AssessmentState;
  updateResponse: (capabilityId: string, response: Partial<AssessmentResponse>) => void;
  getResponse: (capabilityId: string) => AssessmentResponse | null;
  clearAssessment: () => void;
  getCompletedCount: () => number;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

const STORAGE_KEY = "rma-assessment-state";

const defaultState: AssessmentState = {
  responses: {},
  lastUpdated: new Date().toISOString(),
};

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [assessmentState, setAssessmentState] = useState<AssessmentState>(defaultState);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setAssessmentState(parsed);
      }
    } catch (error) {
      console.error("Error loading assessment state:", error);
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(assessmentState));
      } catch (error) {
        console.error("Error saving assessment state:", error);
      }
    }
  }, [assessmentState, isHydrated]);

  // CRITICAL FIX: Wrap updateResponse in useCallback to prevent infinite loops
  const updateResponse = useCallback((capabilityId: string, response: Partial<AssessmentResponse>) => {
    setAssessmentState((prev) => {
      const existing = prev.responses[capabilityId] || {
        capabilityId,
        currentLevel: null,
        desiredLevel: null,
        notes: "",
      };

      const updated = {
        ...existing,
        ...response,
      };

      return {
        responses: {
          ...prev.responses,
          [capabilityId]: updated,
        },
        lastUpdated: new Date().toISOString(),
      };
    });
  }, []); // Empty dependency array - function is stable

  const getResponse = useCallback((capabilityId: string): AssessmentResponse | null => {
    return assessmentState.responses[capabilityId] || null;
  }, [assessmentState.responses]);

  const clearAssessment = useCallback(() => {
    setAssessmentState(defaultState);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const getCompletedCount = useCallback((): number => {
    return Object.values(assessmentState.responses).filter(
      (r) => r.currentLevel !== null
    ).length;
  }, [assessmentState.responses]);

  return (
    <AssessmentContext.Provider
      value={{
        assessmentState,
        updateResponse,
        getResponse,
        clearAssessment,
        getCompletedCount,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error("useAssessment must be used within an AssessmentProvider");
  }
  return context;
}
