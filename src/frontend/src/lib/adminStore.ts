import { useCallback, useEffect, useState } from "react";

export interface SiteSettings {
  collegeName: string;
  eventName: string;
  tagline: string;
  eventDates: string;
  eventYear: string;
  location: string;
  contactEmail: string;
  contactPhone: string;
  aboutText: string;
  instagramUrl: string;
  youtubeUrl: string;
  xUrl: string;
  countdownDate: string;
}

export interface AdminEvent {
  id: string;
  name: string;
  category: string;
  description: string;
  prizes: string[];
  maxParticipants: number;
}

export interface ScheduleItem {
  id: string;
  day: 1 | 2;
  time: string;
  eventName: string;
  venue: string;
  type: string;
  sortOrder: number;
}

const DEFAULT_SETTINGS: SiteSettings = {
  collegeName: "Salem College of Engineering and Technology",
  eventName: "SCET CULTURALS",
  tagline: "Where Technology Meets Culture",
  eventDates: "SEPTEMBER 8\u20139, 2026",
  eventYear: "2026",
  location: "Salem, Tamil Nadu",
  contactEmail: "culturals@scet.ac.in",
  contactPhone: "+91 99999 00000",
  aboutText:
    "SCET Culturals is the annual mega cultural extravaganza of Salem College of Engineering and Technology, bringing together the brightest talents from across the region.",
  instagramUrl: "https://instagram.com",
  youtubeUrl: "https://youtube.com",
  xUrl: "https://x.com",
  countdownDate: "2026-09-08T09:00:00",
};

const DEFAULT_EVENTS: AdminEvent[] = [
  {
    id: "e1",
    name: "Solo Dance",
    category: "Dance",
    description:
      "Showcase your solo dance talent across classical, contemporary, or freestyle genres.",
    prizes: ["\u20b95,000", "\u20b93,000", "\u20b91,500"],
    maxParticipants: 30,
  },
  {
    id: "e2",
    name: "Group Naatiyam",
    category: "Dance",
    description:
      "Team dance performance celebrating the fusion of classical and modern Tamil dance forms.",
    prizes: ["\u20b910,000", "\u20b96,000", "\u20b93,000"],
    maxParticipants: 50,
  },
  {
    id: "e3",
    name: "Solo Singing",
    category: "Music",
    description:
      "Sing your heart out in any language or genre and win the audience over.",
    prizes: ["\u20b95,000", "\u20b93,000", "\u20b91,500"],
    maxParticipants: 40,
  },
  {
    id: "e4",
    name: "Battle of Bands",
    category: "Music",
    description:
      "Compete as a band in this ultimate musical face-off with live instruments.",
    prizes: ["\u20b915,000", "\u20b98,000", "\u20b94,000"],
    maxParticipants: 20,
  },
  {
    id: "e5",
    name: "Street Play",
    category: "Drama",
    description:
      "Perform a compelling street play that moves, inspires, or entertains the crowd.",
    prizes: ["\u20b98,000", "\u20b95,000", "\u20b92,500"],
    maxParticipants: 60,
  },
  {
    id: "e6",
    name: "Fashion Show",
    category: "Fashion",
    description:
      "Walk the ramp in stunning outfits with creative concepts and presentations.",
    prizes: ["\u20b912,000", "\u20b97,000", "\u20b93,500"],
    maxParticipants: 30,
  },
  {
    id: "e7",
    name: "Rangoli & Fine Arts",
    category: "Fine Arts",
    description:
      "Create mesmerizing rangoli or fine art pieces using traditional and digital media.",
    prizes: ["\u20b94,000", "\u20b92,500", "\u20b91,000"],
    maxParticipants: 50,
  },
  {
    id: "e8",
    name: "Debate & Quiz",
    category: "Literary",
    description:
      "Battle of minds — prove your knowledge and rhetorical skills in debate and quiz rounds.",
    prizes: ["\u20b96,000", "\u20b93,500", "\u20b91,500"],
    maxParticipants: 40,
  },
  {
    id: "e9",
    name: "Mobile Gaming",
    category: "Gaming",
    description:
      "Compete in BGMI, Free Fire, and other mobile esports titles for glory.",
    prizes: ["\u20b98,000", "\u20b95,000", "\u20b92,000"],
    maxParticipants: 100,
  },
  {
    id: "e10",
    name: "Photography Contest",
    category: "Arts",
    description:
      "Capture stunning moments and submit your best shots for judging.",
    prizes: ["\u20b95,000", "\u20b93,000", "\u20b91,500"],
    maxParticipants: 50,
  },
];

const DEFAULT_SCHEDULE: ScheduleItem[] = [
  {
    id: "s1",
    day: 1,
    time: "08:00 AM",
    eventName: "Inauguration Ceremony",
    venue: "Main Auditorium",
    type: "ceremony",
    sortOrder: 1,
  },
  {
    id: "s2",
    day: 1,
    time: "09:30 AM",
    eventName: "Solo Dance Competition",
    venue: "Open Air Stage",
    type: "dance",
    sortOrder: 2,
  },
  {
    id: "s3",
    day: 1,
    time: "10:00 AM",
    eventName: "Solo Singing – Round 1",
    venue: "Indoor Hall A",
    type: "music",
    sortOrder: 3,
  },
  {
    id: "s4",
    day: 1,
    time: "11:00 AM",
    eventName: "Debate Competition",
    venue: "Seminar Hall",
    type: "literary",
    sortOrder: 4,
  },
  {
    id: "s5",
    day: 1,
    time: "12:00 PM",
    eventName: "Rangoli & Fine Arts",
    venue: "Art Gallery",
    type: "arts",
    sortOrder: 5,
  },
  {
    id: "s6",
    day: 1,
    time: "01:00 PM",
    eventName: "Lunch Break",
    venue: "College Canteen",
    type: "break",
    sortOrder: 6,
  },
  {
    id: "s7",
    day: 1,
    time: "02:00 PM",
    eventName: "Photography Contest",
    venue: "Campus-wide",
    type: "arts",
    sortOrder: 7,
  },
  {
    id: "s8",
    day: 1,
    time: "03:00 PM",
    eventName: "Mobile Gaming – Qualifiers",
    venue: "Gaming Zone",
    type: "gaming",
    sortOrder: 8,
  },
  {
    id: "s9",
    day: 1,
    time: "04:00 PM",
    eventName: "Group Naatiyam",
    venue: "Open Air Stage",
    type: "dance",
    sortOrder: 9,
  },
  {
    id: "s10",
    day: 1,
    time: "06:00 PM",
    eventName: "Evening Cultural Performances",
    venue: "Main Auditorium",
    type: "ceremony",
    sortOrder: 10,
  },
  {
    id: "s11",
    day: 2,
    time: "09:00 AM",
    eventName: "Battle of Bands – Round 1",
    venue: "Main Stage",
    type: "music",
    sortOrder: 1,
  },
  {
    id: "s12",
    day: 2,
    time: "10:00 AM",
    eventName: "Street Play Competition",
    venue: "Open Air Stage",
    type: "drama",
    sortOrder: 2,
  },
  {
    id: "s13",
    day: 2,
    time: "11:00 AM",
    eventName: "Quiz Competition – Finals",
    venue: "Seminar Hall",
    type: "literary",
    sortOrder: 3,
  },
  {
    id: "s14",
    day: 2,
    time: "12:00 PM",
    eventName: "Fashion Show Ramp Walk",
    venue: "Main Auditorium",
    type: "fashion",
    sortOrder: 4,
  },
  {
    id: "s15",
    day: 2,
    time: "01:00 PM",
    eventName: "Lunch Break",
    venue: "College Canteen",
    type: "break",
    sortOrder: 5,
  },
  {
    id: "s16",
    day: 2,
    time: "02:00 PM",
    eventName: "Gaming Finals – BGMI & PC",
    venue: "Gaming Zone",
    type: "gaming",
    sortOrder: 6,
  },
  {
    id: "s17",
    day: 2,
    time: "03:00 PM",
    eventName: "Solo Singing – Grand Finale",
    venue: "Main Auditorium",
    type: "music",
    sortOrder: 7,
  },
  {
    id: "s18",
    day: 2,
    time: "04:30 PM",
    eventName: "Battle of Bands – Grand Finale",
    venue: "Main Stage",
    type: "music",
    sortOrder: 8,
  },
  {
    id: "s19",
    day: 2,
    time: "06:00 PM",
    eventName: "Prize Distribution & Valediction",
    venue: "Main Auditorium",
    type: "ceremony",
    sortOrder: 9,
  },
  {
    id: "s20",
    day: 2,
    time: "07:30 PM",
    eventName: "Grand Closing Performance",
    venue: "Main Stage",
    type: "ceremony",
    sortOrder: 10,
  },
];

const STORAGE_KEYS = {
  settings: "scet_admin_settings",
  events: "scet_admin_events",
  schedule: "scet_admin_schedule",
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored) as T;
  } catch {
    // ignore
  }
  return fallback;
}

function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function useAdminStore() {
  const [settings, setSettings] = useState<SiteSettings>(() =>
    loadFromStorage(STORAGE_KEYS.settings, DEFAULT_SETTINGS),
  );
  const [events, setEvents] = useState<AdminEvent[]>(() =>
    loadFromStorage(STORAGE_KEYS.events, DEFAULT_EVENTS),
  );
  const [schedule, setSchedule] = useState<ScheduleItem[]>(() =>
    loadFromStorage(STORAGE_KEYS.schedule, DEFAULT_SCHEDULE),
  );

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.settings, settings);
  }, [settings]);
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.events, events);
  }, [events]);
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.schedule, schedule);
  }, [schedule]);

  const updateSettings = useCallback((updates: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  const addEvent = useCallback((event: Omit<AdminEvent, "id">) => {
    setEvents((prev) => [...prev, { ...event, id: `e${Date.now()}` }]);
  }, []);

  const updateEvent = useCallback(
    (id: string, updates: Partial<AdminEvent>) => {
      setEvents((prev) =>
        prev.map((e) => (e.id === id ? { ...e, ...updates } : e)),
      );
    },
    [],
  );

  const deleteEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const addScheduleItem = useCallback((item: Omit<ScheduleItem, "id">) => {
    setSchedule((prev) => [...prev, { ...item, id: `s${Date.now()}` }]);
  }, []);

  const updateScheduleItem = useCallback(
    (id: string, updates: Partial<ScheduleItem>) => {
      setSchedule((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updates } : s)),
      );
    },
    [],
  );

  const deleteScheduleItem = useCallback((id: string) => {
    setSchedule((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return {
    settings,
    events,
    schedule,
    updateSettings,
    addEvent,
    updateEvent,
    deleteEvent,
    addScheduleItem,
    updateScheduleItem,
    deleteScheduleItem,
  };
}

export { DEFAULT_SETTINGS, DEFAULT_EVENTS, DEFAULT_SCHEDULE };
