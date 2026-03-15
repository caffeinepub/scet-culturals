import { useState } from "react";
import { toast } from "sonner";
import { useAdminStore } from "../lib/adminStore";
import type { AdminEvent, ScheduleItem, SiteSettings } from "../lib/adminStore";

const ADMIN_PASSWORD = "scet2026admin";

const inputClass =
  "w-full bg-bg-card border border-neon/30 text-white font-rajdhani px-3 py-2 focus:border-neon focus:outline-none placeholder:text-white/30 text-sm";
const labelClass =
  "block font-orbitron text-xs text-neon/80 tracking-wider mb-1.5";
const sectionTitle =
  "font-orbitron text-base font-bold text-neon glow-sm mb-4 tracking-wider";

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem("scet_admin_auth", "1");
      onLogin();
    } else {
      setError("ACCESS DENIED. Invalid password.");
    }
  };

  return (
    <div className="min-h-screen bg-bg-deep flex items-center justify-center circuit-bg">
      <div className="w-full max-w-sm mx-4">
        <div className="bg-bg-card border border-neon/30 box-glow p-8">
          <div className="text-center mb-8">
            <div className="font-mono-tech text-xs text-neon/60 tracking-[0.4em] mb-3">
              [ ADMIN ACCESS ]
            </div>
            <h1 className="font-orbitron text-2xl font-black text-neon glow-md">
              SCET ADMIN
            </h1>
            <p className="font-rajdhani text-white/50 text-sm mt-2">
              Enter admin credentials to continue
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className={labelClass}>PASSWORD</div>
              <input
                type="password"
                value={pw}
                onChange={(e) => {
                  setPw(e.target.value);
                  setError("");
                }}
                className={inputClass}
                placeholder="Enter admin password"
                data-ocid="admin.input"
              />
            </div>
            {error && (
              <p
                className="font-mono-tech text-xs text-red-400 border border-red-500/30 px-3 py-2"
                data-ocid="admin.error_state"
              >
                {error}
              </p>
            )}
            <button
              type="submit"
              data-ocid="admin.primary_button"
              className="cyber-button w-full py-3 font-orbitron text-sm font-bold tracking-widest uppercase bg-neon text-bg-deep border-2 border-neon hover:bg-transparent hover:text-neon transition-all duration-300"
            >
              ACCESS PANEL
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function SettingsTab({
  settings,
  onSave,
}: {
  settings: SiteSettings;
  onSave: (updates: Partial<SiteSettings>) => void;
}) {
  const [form, setForm] = useState<SiteSettings>({ ...settings });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    toast.success("Settings saved successfully!");
  };

  const field = (
    key: keyof SiteSettings,
    label: string,
    type = "text",
    hint?: string,
  ) => (
    <div key={key}>
      <div className={labelClass}>{label}</div>
      {hint && (
        <p className="font-rajdhani text-xs text-white/30 mb-1">{hint}</p>
      )}
      <input
        type={type}
        value={form[key]}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, [key]: e.target.value }))
        }
        className={inputClass}
        data-ocid="settings.input"
      />
    </div>
  );

  return (
    <form
      onSubmit={handleSave}
      className="space-y-6"
      data-ocid="settings.panel"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {field("collegeName", "COLLEGE NAME")}
        {field("eventName", "EVENT NAME")}
        {field("tagline", "TAGLINE")}
        {field("eventDates", "EVENT DATES", "text", "e.g. SEPTEMBER 8–9, 2026")}
        {field("eventYear", "EVENT YEAR")}
        {field("location", "LOCATION")}
        {field("contactEmail", "CONTACT EMAIL", "email")}
        {field("contactPhone", "CONTACT PHONE")}
        {field(
          "countdownDate",
          "COUNTDOWN DATE",
          "text",
          "ISO format: 2026-09-08T09:00:00",
        )}
        {field("instagramUrl", "INSTAGRAM URL", "url")}
        {field("youtubeUrl", "YOUTUBE URL", "url")}
        {field("xUrl", "X (TWITTER) URL", "url")}
      </div>
      <div>
        <div className={labelClass}>ABOUT TEXT</div>
        <textarea
          value={form.aboutText}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, aboutText: e.target.value }))
          }
          className={`${inputClass} min-h-[100px] resize-y`}
          data-ocid="settings.textarea"
        />
      </div>
      <button
        type="submit"
        data-ocid="settings.submit_button"
        className="cyber-button px-8 py-3 font-orbitron text-sm font-bold tracking-widest uppercase bg-neon text-bg-deep border-2 border-neon hover:bg-transparent hover:text-neon transition-all duration-300"
      >
        SAVE SETTINGS
      </button>
    </form>
  );
}

const EMPTY_EVENT: Omit<AdminEvent, "id"> = {
  name: "",
  category: "",
  description: "",
  prizes: [],
  maxParticipants: 30,
};

function EventForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: Omit<AdminEvent, "id">;
  onSave: (data: Omit<AdminEvent, "id">) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    ...initial,
    prizesStr: initial.prizes.join(", "),
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: form.name,
      category: form.category,
      description: form.description,
      prizes: form.prizesStr
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean),
      maxParticipants: Number(form.maxParticipants),
    });
  };

  return (
    <form
      onSubmit={handleSave}
      className="bg-bg-mid border border-neon/30 p-5 space-y-4 mt-4"
      data-ocid="events.modal"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <div className={labelClass}>EVENT NAME</div>
          <input
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            className={inputClass}
            required
            data-ocid="events.input"
          />
        </div>
        <div>
          <div className={labelClass}>CATEGORY</div>
          <input
            value={form.category}
            onChange={(e) =>
              setForm((p) => ({ ...p, category: e.target.value }))
            }
            className={inputClass}
            required
            data-ocid="events.input"
          />
        </div>
        <div className="sm:col-span-2">
          <div className={labelClass}>DESCRIPTION</div>
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm((p) => ({ ...p, description: e.target.value }))
            }
            className={`${inputClass} min-h-[80px]`}
            data-ocid="events.textarea"
          />
        </div>
        <div>
          <div className={labelClass}>PRIZES (comma-separated)</div>
          <input
            value={form.prizesStr}
            onChange={(e) =>
              setForm((p) => ({ ...p, prizesStr: e.target.value }))
            }
            className={inputClass}
            placeholder="₹5,000, ₹3,000, ₹1,500"
            data-ocid="events.input"
          />
        </div>
        <div>
          <div className={labelClass}>MAX PARTICIPANTS</div>
          <input
            type="number"
            value={form.maxParticipants}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                maxParticipants: Number(e.target.value),
              }))
            }
            className={inputClass}
            min={1}
            data-ocid="events.input"
          />
        </div>
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          data-ocid="events.save_button"
          className="cyber-button px-6 py-2 font-orbitron text-xs font-bold tracking-widest uppercase bg-neon text-bg-deep border border-neon hover:bg-transparent hover:text-neon transition-all"
        >
          SAVE
        </button>
        <button
          type="button"
          onClick={onCancel}
          data-ocid="events.cancel_button"
          className="cyber-button px-6 py-2 font-orbitron text-xs font-bold tracking-widest uppercase bg-transparent text-neon/60 border border-neon/30 hover:border-neon hover:text-neon transition-all"
        >
          CANCEL
        </button>
      </div>
    </form>
  );
}

function EventsTab({
  events,
  onAdd,
  onUpdate,
  onDelete,
}: {
  events: AdminEvent[];
  onAdd: (e: Omit<AdminEvent, "id">) => void;
  onUpdate: (id: string, e: Partial<AdminEvent>) => void;
  onDelete: (id: string) => void;
}) {
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAdd = (data: Omit<AdminEvent, "id">) => {
    onAdd(data);
    setAdding(false);
    toast.success("Event added!");
  };

  const handleUpdate = (id: string, data: Omit<AdminEvent, "id">) => {
    onUpdate(id, data);
    setEditingId(null);
    toast.success("Event updated!");
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete "${name}"?`)) {
      onDelete(id);
      toast.success("Event deleted.");
    }
  };

  return (
    <div data-ocid="events.panel">
      <div className="flex items-center justify-between mb-4">
        <h3 className={sectionTitle}>EVENTS ({events.length})</h3>
        <button
          type="button"
          onClick={() => {
            setAdding(true);
            setEditingId(null);
          }}
          data-ocid="events.open_modal_button"
          className="cyber-button px-4 py-2 font-orbitron text-xs font-bold tracking-widest uppercase bg-neon/10 border border-neon/40 text-neon hover:bg-neon/20 hover:border-neon transition-all"
        >
          + ADD EVENT
        </button>
      </div>

      {adding && (
        <EventForm
          initial={EMPTY_EVENT}
          onSave={handleAdd}
          onCancel={() => setAdding(false)}
        />
      )}

      <div className="space-y-2 mt-4" data-ocid="events.list">
        {events.map((ev, i) => (
          <div key={ev.id} data-ocid={`events.item.${i + 1}`}>
            {editingId === ev.id ? (
              <EventForm
                initial={ev}
                onSave={(data) => handleUpdate(ev.id, data)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="flex items-center gap-3 bg-bg-card border border-neon/15 hover:border-neon/30 transition-all p-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-orbitron text-xs font-bold text-white">
                      {ev.name}
                    </span>
                    <span className="font-rajdhani text-xs text-neon/60 border border-neon/20 px-2 py-0.5">
                      {ev.category}
                    </span>
                  </div>
                  <p className="font-rajdhani text-xs text-white/40 truncate mt-0.5">
                    {ev.description}
                  </p>
                  <p className="font-mono-tech text-xs text-neon/50 mt-0.5">
                    {ev.prizes.slice(0, 2).join(" | ")} · {ev.maxParticipants}{" "}
                    max
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(ev.id);
                      setAdding(false);
                    }}
                    data-ocid={`events.edit_button.${i + 1}`}
                    className="px-3 py-1.5 font-orbitron text-xs border border-neon/30 text-neon/70 hover:border-neon hover:text-neon transition-all"
                  >
                    EDIT
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(ev.id, ev.name)}
                    data-ocid={`events.delete_button.${i + 1}`}
                    className="px-3 py-1.5 font-orbitron text-xs border border-red-500/30 text-red-400/70 hover:border-red-500 hover:text-red-400 transition-all"
                  >
                    DEL
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {events.length === 0 && (
          <div
            className="text-center py-10 border border-neon/10 text-white/30 font-rajdhani"
            data-ocid="events.empty_state"
          >
            No events. Click + ADD EVENT to create one.
          </div>
        )}
      </div>
    </div>
  );
}

const EMPTY_SCHEDULE_ITEM: Omit<ScheduleItem, "id"> = {
  day: 1,
  time: "",
  eventName: "",
  venue: "",
  type: "ceremony",
  sortOrder: 99,
};

function ScheduleItemForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: Omit<ScheduleItem, "id">;
  onSave: (data: Omit<ScheduleItem, "id">) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({ ...initial });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form
      onSubmit={handleSave}
      className="bg-bg-mid border border-neon/30 p-4 space-y-3 mt-3"
      data-ocid="schedule.modal"
    >
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        <div>
          <div className={labelClass}>DAY</div>
          <select
            value={form.day}
            onChange={(e) =>
              setForm((p) => ({ ...p, day: Number(e.target.value) as 1 | 2 }))
            }
            className={`${inputClass} cursor-pointer`}
            data-ocid="schedule.select"
          >
            <option value={1}>Day 1 – Sep 8</option>
            <option value={2}>Day 2 – Sep 9</option>
          </select>
        </div>
        <div>
          <div className={labelClass}>TIME</div>
          <input
            value={form.time}
            onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
            className={inputClass}
            placeholder="09:00 AM"
            required
            data-ocid="schedule.input"
          />
        </div>
        <div>
          <div className={labelClass}>TYPE</div>
          <input
            value={form.type}
            onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
            className={inputClass}
            placeholder="ceremony, dance, music…"
            data-ocid="schedule.input"
          />
        </div>
        <div className="sm:col-span-2">
          <div className={labelClass}>EVENT NAME</div>
          <input
            value={form.eventName}
            onChange={(e) =>
              setForm((p) => ({ ...p, eventName: e.target.value }))
            }
            className={inputClass}
            required
            data-ocid="schedule.input"
          />
        </div>
        <div>
          <div className={labelClass}>VENUE</div>
          <input
            value={form.venue}
            onChange={(e) => setForm((p) => ({ ...p, venue: e.target.value }))}
            className={inputClass}
            data-ocid="schedule.input"
          />
        </div>
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          data-ocid="schedule.save_button"
          className="cyber-button px-6 py-2 font-orbitron text-xs font-bold tracking-widest uppercase bg-neon text-bg-deep border border-neon hover:bg-transparent hover:text-neon transition-all"
        >
          SAVE
        </button>
        <button
          type="button"
          onClick={onCancel}
          data-ocid="schedule.cancel_button"
          className="cyber-button px-6 py-2 font-orbitron text-xs font-bold tracking-widest uppercase bg-transparent text-neon/60 border border-neon/30 hover:border-neon hover:text-neon transition-all"
        >
          CANCEL
        </button>
      </div>
    </form>
  );
}

const TYPE_COLORS: Record<string, string> = {
  ceremony: "text-neon border-neon/40",
  dance: "text-pink-400 border-pink-400/40",
  music: "text-purple-400 border-purple-400/40",
  literary: "text-cyan-400 border-cyan-400/40",
  arts: "text-orange-400 border-orange-400/40",
  break: "text-white/30 border-white/20",
  drama: "text-yellow-400 border-yellow-400/40",
  fashion: "text-blue-400 border-blue-400/40",
  gaming: "text-red-400 border-red-400/40",
};

function ScheduleTab({
  schedule,
  onAdd,
  onUpdate,
  onDelete,
}: {
  schedule: ScheduleItem[];
  onAdd: (item: Omit<ScheduleItem, "id">) => void;
  onUpdate: (id: string, item: Partial<ScheduleItem>) => void;
  onDelete: (id: string) => void;
}) {
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addDay, setAddDay] = useState<1 | 2>(1);

  const day1 = schedule
    .filter((s) => s.day === 1)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const day2 = schedule
    .filter((s) => s.day === 2)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const handleAdd = (data: Omit<ScheduleItem, "id">) => {
    onAdd(data);
    setAdding(false);
    toast.success("Schedule item added!");
  };

  const handleUpdate = (id: string, data: Omit<ScheduleItem, "id">) => {
    onUpdate(id, data);
    setEditingId(null);
    toast.success("Schedule item updated!");
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete "${name}"?`)) {
      onDelete(id);
      toast.success("Item deleted.");
    }
  };

  const renderDayItems = (
    items: ScheduleItem[],
    dayLabel: string,
    dayNum: 1 | 2,
  ) => (
    <div className="mb-8" data-ocid="schedule.panel">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="bg-neon text-bg-deep px-3 py-1 font-orbitron font-black text-xs tracking-widest">
            {dayLabel}
          </div>
          <span className="font-mono-tech text-xs text-white/40">
            {items.length} ITEMS
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            setAddDay(dayNum);
            setAdding(true);
            setEditingId(null);
          }}
          data-ocid="schedule.open_modal_button"
          className="cyber-button px-3 py-1.5 font-orbitron text-xs border border-neon/40 text-neon hover:border-neon hover:bg-neon/10 transition-all"
        >
          + ADD
        </button>
      </div>

      {adding && addDay === dayNum && (
        <ScheduleItemForm
          initial={{
            ...EMPTY_SCHEDULE_ITEM,
            day: dayNum,
            sortOrder: items.length + 1,
          }}
          onSave={handleAdd}
          onCancel={() => setAdding(false)}
        />
      )}

      <div className="space-y-1 mt-2" data-ocid="schedule.list">
        {items.map((item, i) => (
          <div key={item.id} data-ocid={`schedule.item.${i + 1}`}>
            {editingId === item.id ? (
              <ScheduleItemForm
                initial={item}
                onSave={(data) => handleUpdate(item.id, data)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="flex items-center gap-3 bg-bg-card border border-neon/10 hover:border-neon/30 transition-all p-2.5">
                <span
                  className={`font-mono-tech text-xs border px-2 py-0.5 ${TYPE_COLORS[item.type] || "text-neon/60 border-neon/30"} shrink-0`}
                >
                  {item.time}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-orbitron text-xs text-white truncate">
                    {item.eventName}
                  </div>
                  <div className="font-rajdhani text-xs text-white/40">
                    {item.venue}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(item.id);
                      setAdding(false);
                    }}
                    data-ocid={`schedule.edit_button.${i + 1}`}
                    className="px-2 py-1 font-orbitron text-xs border border-neon/30 text-neon/70 hover:border-neon hover:text-neon transition-all"
                  >
                    EDIT
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.eventName)}
                    data-ocid={`schedule.delete_button.${i + 1}`}
                    className="px-2 py-1 font-orbitron text-xs border border-red-500/30 text-red-400/70 hover:border-red-500 hover:text-red-400 transition-all"
                  >
                    DEL
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {items.length === 0 && (
          <div
            className="text-center py-6 border border-neon/10 text-white/30 font-rajdhani text-sm"
            data-ocid="schedule.empty_state"
          >
            No items for this day.
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      {renderDayItems(day1, "DAY 01 · SEP 8", 1)}
      {renderDayItems(day2, "DAY 02 · SEP 9", 2)}
    </div>
  );
}

const TABS = ["Settings", "Events", "Schedule"] as const;
type Tab = (typeof TABS)[number];

export function AdminPanel() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem("scet_admin_auth") === "1",
  );
  const [activeTab, setActiveTab] = useState<Tab>("Settings");
  const store = useAdminStore();

  const handleLogout = () => {
    sessionStorage.removeItem("scet_admin_auth");
    setAuthed(false);
  };

  if (!authed) {
    return <LoginScreen onLogin={() => setAuthed(true)} />;
  }

  return (
    <div className="min-h-screen bg-bg-deep text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-bg-deep/95 backdrop-blur border-b border-neon/20 px-4 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="font-mono-tech text-xs text-neon/50 hover:text-neon transition-colors border border-neon/20 px-3 py-1"
            data-ocid="admin.link"
          >
            ← SITE
          </a>
          <span className="font-orbitron text-sm font-bold text-neon glow-sm tracking-wider">
            ADMIN PANEL
          </span>
          <span className="font-mono-tech text-xs text-white/30 hidden sm:block">
            SCET CULTURALS 2026
          </span>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          data-ocid="admin.secondary_button"
          className="cyber-button px-4 py-2 font-orbitron text-xs font-bold tracking-widest uppercase border border-red-500/40 text-red-400/70 hover:border-red-500 hover:text-red-400 transition-all"
        >
          LOGOUT
        </button>
      </header>

      {/* Tabs */}
      <div className="border-b border-neon/15 px-4 sm:px-8">
        <div className="flex gap-0">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              data-ocid="admin.tab"
              className={`font-orbitron text-xs font-bold tracking-widest uppercase px-5 py-4 border-b-2 transition-all ${
                activeTab === tab
                  ? "border-neon text-neon"
                  : "border-transparent text-white/40 hover:text-white/70"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
        {activeTab === "Settings" && (
          <SettingsTab
            settings={store.settings}
            onSave={store.updateSettings}
          />
        )}
        {activeTab === "Events" && (
          <EventsTab
            events={store.events}
            onAdd={store.addEvent}
            onUpdate={store.updateEvent}
            onDelete={store.deleteEvent}
          />
        )}
        {activeTab === "Schedule" && (
          <ScheduleTab
            schedule={store.schedule}
            onAdd={store.addScheduleItem}
            onUpdate={store.updateScheduleItem}
            onDelete={store.deleteScheduleItem}
          />
        )}
      </main>
    </div>
  );
}
