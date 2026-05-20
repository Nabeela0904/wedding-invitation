"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { heroSpring, staggerSection, fadeSlideUpSoft } from "@/lib/motion";

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
        className="rounded-lg border border-luxe-gold/25 bg-black/35 px-4 py-6 text-center"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={heroSpring}
        role="status"
      >
        <p className="font-display text-lg text-luxe-gold">
          Thank you, {form.name}!
        </p>
        <p className="mt-2 font-sans text-sm text-luxe-cream/65">
          Your RSVP has been received. We cannot wait to celebrate with you.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      variants={staggerSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div variants={fadeSlideUpSoft}>
        <label
          htmlFor="rsvp-name"
          className="mb-1.5 block font-sans text-xs font-medium uppercase tracking-[0.2em] text-luxe-cream/55"
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
          className="cinematic-input"
        />
      </motion.div>

      <motion.div variants={fadeSlideUpSoft}>
        <label
          htmlFor="rsvp-attending"
          className="mb-1.5 block font-sans text-xs font-medium uppercase tracking-[0.2em] text-luxe-cream/55"
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
          className="cinematic-input"
        >
          <option value="" disabled>
            Select status
          </option>
          <option value="yes">Joyfully attending</option>
          <option value="maybe">Will try my best</option>
          <option value="no">Unable to attend</option>
        </select>
      </motion.div>

      <motion.div variants={fadeSlideUpSoft}>
        <label
          htmlFor="rsvp-food"
          className="mb-1.5 block font-sans text-xs font-medium uppercase tracking-[0.2em] text-luxe-cream/55"
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
          className="cinematic-input"
        >
          <option value="" disabled>
            Select preference
          </option>
          <option value="vegetarian">Vegetarian</option>
          <option value="non-vegetarian">Non-vegetarian</option>
          <option value="no-preference">No preference</option>
        </select>
      </motion.div>

      <motion.button
        type="submit"
        variants={fadeSlideUpSoft}
        className="w-full rounded-lg border border-luxe-gold/40 bg-gradient-to-r from-islamic-emerald via-[#1a5c4a] to-islamic-emerald px-6 py-3.5 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-luxe-cream will-change-transform"
        whileHover={{
          scale: 1.02,
          boxShadow:
            "0 0 36px rgba(212, 175, 55, 0.4), 0 0 60px rgba(15, 61, 50, 0.5)",
        }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
      >
        Submit RSVP
      </motion.button>
    </motion.form>
  );
}
