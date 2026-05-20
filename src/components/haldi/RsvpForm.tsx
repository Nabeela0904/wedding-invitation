"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { heroSpring } from "@/lib/motion";

type AttendingStatus = "yes" | "no" | "maybe";
type FoodPreference = "vegetarian" | "non-vegetarian" | "no-preference";

type RsvpFormState = {
  name: string;
  attending: AttendingStatus | "";
  food: FoodPreference | "";
};

const INITIAL: RsvpFormState = {
  name: "",
  attending: "",
  food: "",
};

export default function RsvpForm() {
  const [form, setForm] = useState<RsvpFormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim() || !form.attending || !form.food) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <motion.div
        className="rounded-xl border border-marigold/30 bg-white/30 px-4 py-6 text-center backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={heroSpring}
        role="status"
      >
        <p className="font-display text-lg text-gold">Thank you, {form.name}!</p>
        <p className="mt-2 font-sans text-sm text-gold/70">
          Your RSVP has been received. We cannot wait to celebrate with you.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="rsvp-name"
          className="mb-1.5 block font-sans text-xs font-medium uppercase tracking-wider text-gold/70"
        >
          Name
        </label>
        <input
          id="rsvp-name"
          type="text"
          required
          autoComplete="name"
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="Your full name"
          className="w-full rounded-xl border border-marigold/25 bg-white/50 px-4 py-3 font-sans text-sm text-gold placeholder:text-gold/40 outline-none transition-[box-shadow,border-color] focus:border-marigold focus:shadow-gold"
        />
      </div>

      <div>
        <label
          htmlFor="rsvp-attending"
          className="mb-1.5 block font-sans text-xs font-medium uppercase tracking-wider text-gold/70"
        >
          Attending Status
        </label>
        <select
          id="rsvp-attending"
          required
          value={form.attending}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              attending: e.target.value as AttendingStatus,
            }))
          }
          className="w-full appearance-none rounded-xl border border-marigold/25 bg-white/50 px-4 py-3 font-sans text-sm text-gold outline-none transition-[box-shadow,border-color] focus:border-marigold focus:shadow-gold"
        >
          <option value="" disabled>
            Select status
          </option>
          <option value="yes">Joyfully attending</option>
          <option value="maybe">Will try my best</option>
          <option value="no">Unable to attend</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="rsvp-food"
          className="mb-1.5 block font-sans text-xs font-medium uppercase tracking-wider text-gold/70"
        >
          Food Preference
        </label>
        <select
          id="rsvp-food"
          required
          value={form.food}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              food: e.target.value as FoodPreference,
            }))
          }
          className="w-full appearance-none rounded-xl border border-marigold/25 bg-white/50 px-4 py-3 font-sans text-sm text-gold outline-none transition-[box-shadow,border-color] focus:border-marigold focus:shadow-gold"
        >
          <option value="" disabled>
            Select preference
          </option>
          <option value="vegetarian">Vegetarian</option>
          <option value="non-vegetarian">Non-vegetarian</option>
          <option value="no-preference">No preference</option>
        </select>
      </div>

      <motion.button
        type="submit"
        className="w-full rounded-xl border border-marigold/40 bg-gradient-to-r from-marigold to-saffron px-6 py-3.5 font-sans text-sm font-semibold uppercase tracking-widest text-cream will-change-transform"
        whileHover={{
          scale: 1.02,
          boxShadow:
            "0 0 28px rgba(245, 158, 11, 0.45), 0 8px 24px rgba(217, 119, 6, 0.25)",
        }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        Submit RSVP
      </motion.button>
    </form>
  );
}
