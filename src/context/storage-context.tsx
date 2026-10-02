"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ZotCanvasStorage, FocusSessionLog } from "@/types/storage";
import { CanvasCourse, CanvasAssignment } from "@/types/canvas";
import { AssignmentMilestone } from "@/types/study";
import { DEMO_UCI_COURSES, DEMO_UCI_ASSIGNMENTS } from "@/lib/demo-data";
import { fetchCanvasCourses, fetchCanvasAssignments } from "@/lib/canvas-client";

interface StorageContextType extends ZotCanvasStorage {
  setCanvasToken: (token: string, host?: string) => void;
  setGeminiApiKey: (key: string | null) => void;
  setAgreedDisclaimer: (agreed: boolean) => void;
  enableDemoMode: () => void;
  purgeAllData: () => void;
  toggleMilestone: (assignmentId: number, milestoneId: string) => void;
  setMilestones: (assignmentId: number, milestones: AssignmentMilestone[]) => void;
  addFocusSession: (session: Omit<FocusSessionLog, "id" | "timestamp">) => void;
  setWhatIfScore: (assignmentId: number, score: number) => void;
  refreshCanvasData: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const STORAGE_KEY = "zotcanvas_state_v1";

const defaultState: ZotCanvasStorage = {
  canvas_token: null,
  canvas_host: "canvas.eee.uci.edu",
  gemini_api_key: null,
  is_demo_mode: false,
  has_agreed_disclaimer: false,
  cached_courses: [],
  cached_assignments: [],
  assignment_milestones: {},
  focus_sessions: [],
  what_if_grades: {},
};

const StorageContext = createContext<StorageContextType | undefined>(undefined);

export function StorageProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ZotCanvasStorage>(defaultState);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setState((prev) => ({ ...prev, ...JSON.parse(saved) }));
      }
    } catch (e) {
      console.error("Failed to read from localStorage:", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to LocalStorage on state change
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) {
        console.error("Failed to persist to localStorage:", e);
      }
    }
  }, [state, isHydrated]);

  const setCanvasToken = (token: string, host = "canvas.eee.uci.edu") => {
    setState((prev) => ({
      ...prev,
      canvas_token: token,
      canvas_host: host,
      is_demo_mode: false,
    }));
  };

  const setGeminiApiKey = (key: string | null) => {
    setState((prev) => ({ ...prev, gemini_api_key: key }));
  };

  const setAgreedDisclaimer = (agreed: boolean) => {
    setState((prev) => ({ ...prev, has_agreed_disclaimer: agreed }));
  };

  const enableDemoMode = () => {
    setState((prev) => ({
      ...prev,
      is_demo_mode: true,
      has_agreed_disclaimer: true,
      cached_courses: DEMO_UCI_COURSES,
      cached_assignments: DEMO_UCI_ASSIGNMENTS,
    }));
  };

  const purgeAllData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setState(defaultState);
  };

  const toggleMilestone = (assignmentId: number, milestoneId: string) => {
    setState((prev) => {
      const current = prev.assignment_milestones[assignmentId] || [];
      const updated = current.map((m) =>
        m.id === milestoneId ? { ...m, completed: !m.completed } : m
      );
      return {
        ...prev,
        assignment_milestones: {
          ...prev.assignment_milestones,
          [assignmentId]: updated,
        },
      };
    });
  };

  const setMilestones = (assignmentId: number, milestones: AssignmentMilestone[]) => {
    setState((prev) => ({
      ...prev,
      assignment_milestones: {
        ...prev.assignment_milestones,
        [assignmentId]: milestones,
      },
    }));
  };

  const addFocusSession = (session: Omit<FocusSessionLog, "id" | "timestamp">) => {
    const newSession: FocusSessionLog = {
      ...session,
      id: `focus-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setState((prev) => ({
      ...prev,
      focus_sessions: [newSession, ...prev.focus_sessions],
    }));
  };

  const setWhatIfScore = (assignmentId: number, score: number) => {
    setState((prev) => ({
      ...prev,
      what_if_grades: {
        ...prev.what_if_grades,
        [assignmentId]: score,
      },
    }));
  };

  const refreshCanvasData = async () => {
    if (state.is_demo_mode) {
      setState((prev) => ({
        ...prev,
        cached_courses: DEMO_UCI_COURSES,
        cached_assignments: DEMO_UCI_ASSIGNMENTS,
      }));
      return;
    }

    if (!state.canvas_token) return;

    setIsLoading(true);
    setError(null);
    try {
      const courses = await fetchCanvasCourses(state.canvas_token, state.canvas_host);
      const allAssignments: CanvasAssignment[] = [];

      for (const c of courses) {
        try {
          const assignList = await fetchCanvasAssignments(c.id, state.canvas_token, state.canvas_host);
          allAssignments.push(...assignList);
        } catch (e) {
          console.warn(`Could not fetch assignments for course ${c.id}:`, e);
        }
      }

      setState((prev) => ({
        ...prev,
        cached_courses: courses,
        cached_assignments: allAssignments,
      }));
    } catch (err: any) {
      setError(err.message || "Failed to sync Canvas data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StorageContext.Provider
      value={{
        ...state,
        setCanvasToken,
        setGeminiApiKey,
        setAgreedDisclaimer,
        enableDemoMode,
        purgeAllData,
        toggleMilestone,
        setMilestones,
        addFocusSession,
        setWhatIfScore,
        refreshCanvasData,
        isLoading,
        error,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}

export function useStorage() {
  const ctx = useContext(StorageContext);
  if (!ctx) throw new Error("useStorage must be used within StorageProvider");
  return ctx;
}
