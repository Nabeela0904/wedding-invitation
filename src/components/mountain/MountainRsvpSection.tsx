"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { HALDI_EVENT } from "@/lib/haldi-event";
import {
  cardReveal,
  fadeSlideUpSoft,
  heroSpring,
  staggerSection,
} from "@/lib/motion";

type AttendingStatus = "yes" | "no" | "maybe";
type FoodPreference = "vegetarian" | "non-vegetarian" | "no-preference";

type FormState = {
  name: string;
  attending: AttendingStatus | "";
  food: FoodPreference | "";
};

export default function MountainRsvpSection() {
  const [form, setForm] = useState<FormState>({ name: "", attending: "", food: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.name.trim() || !form.attending || !form.food) return;
    setSubmitted(true);
  }

  return (
    <section className="mountain-section mountain-section--compact">
      <motion.div
        className="w-full max-w-md text-center"
        variants={staggerSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <motion.p
          variants={fadeSlideUpSoft}
          className="font-display text-lg text-mountain-muted sm:text-xl"
        >
          {HALDI_EVENT.rsvpPrompt}
        </motion.p>

        {submitted ? (
          <motion.div
            className="mountain-card mt-8 text-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={heroSpring}
            role="status"
          >
            <p className="font-display text-lg text-mountain-ink">
              Thank you, {form.name}!
            </p>
            <p className="mt-2 text-sm text-mountain-muted">
              Your RSVP has been received.
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="mountain-card mt-8 space-y-4 text-left"
            variants={cardReveal}
          >
            <div>
              <label
                htmlFor="mtn-name"
                className="mb-1 block text-xs font-medium uppercase tracking-wider text-mountain-muted"
              >
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
            </div>
            <div>
              <label
                htmlFor="mtn-attending"
                className="mb-1 block text-xs font-medium uppercase tracking-wider text-mountain-muted"
              >
                Attending
              </label>
              <select
                id="mtn-attending"
                required
                value={form.attending}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    attending: e.target.value as AttendingStatus,
                  }))
                }
                className="mountain-input"
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
                htmlFor="mtn-food"
                className="mb-1 block text-xs font-medium uppercase tracking-wider text-mountain-muted"
              >
                Food Preference
              </label>
              <select
                id="mtn-food"
                required
                value={form.food}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    food: e.target.value as FoodPreference,
                  }))
                }
                className="mountain-input"
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
              className="mountain-btn-primary will-change-transform"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 8px 28px rgba(125,90,140,0.35)",
              }}
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
