"use client";

import emailjs from "@emailjs/browser";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { getEmailJsConfig, isEmailJsConfigured } from "@/lib/emailjs-config";
import { heroSpring } from "@/lib/motion";

type AttendingStatus = "yes" | "no" | "maybe";
type FoodPreference = "vegetarian" | "non-vegetarian" | "no-preference";

type FormState = {
  name: string;
  attending: AttendingStatus | "";
  food: FoodPreference | "";
};

const INITIAL: FormState = { name: "", attending: "", food: "" };

const ATTENDING_LABELS: Record<AttendingStatus, string> = {
  yes: "Joyfully attending",
  maybe: "Will try my best",
  no: "Unable to attend",
};

const FOOD_LABELS: Record<FoodPreference, string> = {
  vegetarian: "Vegetarian",
  "non-vegetarian": "Non-vegetarian",
  "no-preference": "No preference",
};

type RsvpFormProps = {
  eventName?: string;
};

export default function RsvpForm({ eventName = "Wedding Event" }: RsvpFormProps) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.name.trim() || !form.attending || !form.food || isSubmitting) return;

    if (!isEmailJsConfigured()) {
      setError(
        "RSVP is not configured yet. Please add your EmailJS keys to .env.local and restart the dev server.",
      );
      return;
    }

    const attendingLabel = ATTENDING_LABELS[form.attending];
    const foodLabel = FOOD_LABELS[form.food];
    const { serviceId, templateId, publicKey } = getEmailJsConfig();

    setIsSubmitting(true);
    setError("");

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name.trim(),
          guest_name: form.name.trim(),
          name: form.name.trim(),
          attending: attendingLabel,
          food: foodLabel,
          food_preference: foodLabel,
          event_name: eventName,
          event: eventName,
          message: [
            `Event: ${eventName}`,
            `Name: ${form.name.trim()}`,
            `Attending: ${attendingLabel}`,
            `Food preference: ${foodLabel}`,
          ].join("\n"),
        },
        { publicKey },
      );

      setSubmitted(true);
    } catch (submitError) {
      console.error("EmailJS RSVP failed:", submitError);
      setError("We could not send your RSVP right now. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <motion.div
        className="rounded-xl border border-marigold/25 bg-white/40 px-4 py-6 text-center backdrop-blur-sm"
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
        <label htmlFor="rsvp-name" className="mb-1.5 block font-sans text-xs font-medium uppercase tracking-wider text-gold/70">
          Name
        </label>
        <input
          id="rsvp-name"
          required
          autoComplete="name"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          placeholder="Your full name"
          className="haldi-input"
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label htmlFor="rsvp-attending" className="mb-1.5 block font-sans text-xs font-medium uppercase tracking-wider text-gold/70">
          Attending Status
        </label>
        <select
          id="rsvp-attending"
          required
          value={form.attending}
          onChange={(e) => setForm((p) => ({ ...p, attending: e.target.value as AttendingStatus }))}
          className="haldi-input"
          disabled={isSubmitting}
        >
          <option value="" disabled>Select status</option>
          <option value="yes">Joyfully attending</option>
          <option value="maybe">Will try my best</option>
          <option value="no">Unable to attend</option>
        </select>
      </div>
      <div>
        <label htmlFor="rsvp-food" className="mb-1.5 block font-sans text-xs font-medium uppercase tracking-wider text-gold/70">
          Food Preference
        </label>
        <select
          id="rsvp-food"
          required
          value={form.food}
          onChange={(e) => setForm((p) => ({ ...p, food: e.target.value as FoodPreference }))}
          className="haldi-input"
          disabled={isSubmitting}
        >
          <option value="" disabled>Select preference</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="non-vegetarian">Non-vegetarian</option>
          <option value="no-preference">No preference</option>
        </select>
      </div>

      {error ? (
        <motion.p
          className="rounded-lg border border-red-300/40 bg-red-50/80 px-3 py-2 font-sans text-sm text-red-800"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
        >
          {error}
        </motion.p>
      ) : null}

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl border border-marigold/40 bg-gradient-to-r from-marigold to-saffron px-6 py-3.5 font-sans text-sm font-semibold uppercase tracking-widest text-cream will-change-transform disabled:cursor-not-allowed disabled:opacity-70"
        whileHover={
          isSubmitting
            ? undefined
            : {
                scale: 1.02,
                boxShadow: "0 0 28px rgba(245, 158, 11, 0.45), 0 8px 24px rgba(217, 119, 6, 0.25)",
              }
        }
        whileTap={isSubmitting ? undefined : { scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {isSubmitting ? "Sending..." : "Submit RSVP"}
      </motion.button>
    </form>
  );
}
