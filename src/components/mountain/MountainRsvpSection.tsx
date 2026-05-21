"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { cardReveal, fadeSlideUpSoft, heroSpring, staggerSection } from "@/lib/motion";

type AttendingStatus = "yes" | "no" | "maybe";
type FoodPreference = "vegetarian" | "non-vegetarian" | "no-preference";

type FormState = {
  name: string;
  attending: AttendingStatus | "";
  food: FoodPreference | "";
};

const INITIAL: FormState = { name: "", attending: "", food: "" };

export default function MountainRsvpSection() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.name.trim() || !form.attending || !form.food) return;
    setSubmitted(true);
  }

  return (
    <section className="mountain-section">
      <motion.div
        className="mountain-card w-full max-w-md"
        variants={cardReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <motion.p variants={fadeSlideUpSoft} className="mountain-label">
          RSVP
        </motion.p>
        <motion.h2
          variants={fadeSlideUpSoft}
          className="mt-3 font-display text-2xl text-mountain-ink"
        >
          Click to confirm
        </motion.h2>
        <motion.p
          variants={fadeSlideUpSoft}
          className="mt-2 font-sans text-sm text-mountain-muted"
        >
          Kindly let us know if you will be joining us
        </motion.p>

        {submitted ? (
          <motion.div
            className="mt-6 rounded-xl bg-white/70 px-4 py-6"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={heroSpring}
            role="status"
          >
            <p className="font-display text-lg text-mountain-ink">
              Thank you, {form.name}!
            </p>
            <p className="mt-2 text-sm text-mountain-muted">
              Your RSVP has been received with love.
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4 text-left"
            variants={staggerSection}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeSlideUpSoft}>
              <label htmlFor="mtn-name" className="mb-1 block text-xs font-medium uppercase tracking-wider text-mountain-muted">
                Name
              </label>
              <input
                id="mtn-name"
                required
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className="mountain-input"
                placeholder="Your full name"
              />
            </motion.div>
            <motion.div variants={fadeSlideUpSoft}>
              <label htmlFor="mtn-attending" className="mb-1 block text-xs font-medium uppercase tracking-wider text-mountain-muted">
                Attending
              </label>
              <select
                id="mtn-attending"
                required
                value={form.attending}
                onChange={(e) =>
                  setForm((p) => ({ ...p, attending: e.target.value as AttendingStatus }))
                }
                className="mountain-input"
              >
                <option value="" disabled>Select status</option>
                <option value="yes">Joyfully attending</option>
                <option value="maybe">Will try my best</option>
                <option value="no">Unable to attend</option>
              </select>
            </motion.div>
            <motion.div variants={fadeSlideUpSoft}>
              <label htmlFor="mtn-food" className="mb-1 block text-xs font-medium uppercase tracking-wider text-mountain-muted">
                Food Preference
              </label>
              <select
                id="mtn-food"
                required
                value={form.food}
                onChange={(e) =>
                  setForm((p) => ({ ...p, food: e.target.value as FoodPreference }))
                }
                className="mountain-input"
              >
                <option value="" disabled>Select preference</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="non-vegetarian">Non-vegetarian</option>
                <option value="no-preference">No preference</option>
              </select>
            </motion.div>
            <motion.button
              type="submit"
              variants={fadeSlideUpSoft}
              className="w-full rounded-full bg-mountain-accent px-6 py-3.5 font-sans text-sm font-semibold uppercase tracking-widest text-white will-change-transform"
              whileHover={{ scale: 1.02, boxShadow: "0 8px 28px rgba(125,90,140,0.35)" }}
              whileTap={{ scale: 0.96 }}
            >
              Submit RSVP
            </motion.button>
          </motion.form>
        )}
      </motion.div>
    </section>
  );
}
