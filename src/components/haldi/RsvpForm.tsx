"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { premiumSpring } from "@/lib/motion";

type AttendanceChoice = "attending" | "declining" | "";

type RsvpFormState = {
  guestName: string;
  attendance: AttendanceChoice;
};

const INITIAL: RsvpFormState = {
  guestName: "",
  attendance: "",
};

export default function RsvpForm() {
  const [form, setForm] = useState<RsvpFormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.guestName.trim() || !form.attendance) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <motion.div
        className="rounded-xl border-2 border-marigold/30 bg-white/25 px-4 py-6 text-center backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={premiumSpring}
        role="status"
      >
        <p className="font-display text-lg text-deep-gold">
          Thank you, {form.guestName}!
        </p>
        <p className="mt-2 font-sans text-sm text-deep-gold/70">
          Your RSVP has been received with warmth and gratitude.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label
          htmlFor="haldi-guest-name"
          className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-wider text-deep-gold/75"
        >
          Guest Name
        </label>
        <input
          id="haldi-guest-name"
          name="guestName"
          type="text"
          required
          autoComplete="name"
          value={form.guestName}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, guestName: e.target.value }))
          }
          placeholder="Your full name"
          className="w-full rounded-xl border-2 border-marigold/25 bg-white/40 px-4 py-3 font-sans text-sm text-deep-gold placeholder:text-deep-gold/40 outline-none transition-[box-shadow,border-color] focus:border-marigold focus:shadow-gold"
        />
      </div>

      <fieldset>
        <legend className="mb-2 font-sans text-xs font-semibold uppercase tracking-wider text-deep-gold/75">
          Attendance
        </legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <AttendanceOption
            id="attending"
            name="attendance"
            label="Attending"
            checked={form.attendance === "attending"}
            onSelect={() =>
              setForm((prev) => ({ ...prev, attendance: "attending" }))
            }
            required
          />
          <AttendanceOption
            id="declining"
            name="attendance"
            label="Regretfully Declining"
            checked={form.attendance === "declining"}
            onSelect={() =>
              setForm((prev) => ({ ...prev, attendance: "declining" }))
            }
          />
        </div>
      </fieldset>

      <motion.button
        type="submit"
        className="w-full rounded-xl border-2 border-marigold/45 bg-gradient-to-r from-marigold via-saffron to-marigold px-6 py-3.5 font-sans text-sm font-semibold uppercase tracking-widest text-cream will-change-transform"
        whileHover={{
          scale: 1.02,
          boxShadow:
            "0 0 32px rgba(245, 158, 11, 0.55), 0 0 64px rgba(234, 88, 12, 0.28)",
        }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", mass: 0.8, damping: 18 }}
      >
        Submit RSVP
      </motion.button>
    </form>
  );
}

type AttendanceOptionProps = {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onSelect: () => void;
  required?: boolean;
};

function AttendanceOption({
  id,
  name,
  label,
  checked,
  onSelect,
  required,
}: AttendanceOptionProps) {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 transition-colors ${
        checked
          ? "border-marigold bg-marigold/15 shadow-gold"
          : "border-marigold/25 bg-white/30"
      }`}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={id}
        checked={checked}
        onChange={onSelect}
        required={required}
        className="h-4 w-4 accent-marigold"
      />
      <span className="font-sans text-sm text-deep-gold">{label}</span>
    </label>
  );
}
