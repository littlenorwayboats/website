"use client";

import { type SubmitEvent, useState } from "react";

export default function MailingList() {
  const [result, setResult] = useState("");
  const [pending, setPending] = useState(false);

  const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", "7ed4741a-741a-427e-9854-ac6a510a9901");
    formData.append("subject", "Launch mailing list signup");

    setPending(true);
    setResult("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setResult("You're on the list.");
        form.reset();
      } else {
        setResult("Something went wrong. Please try again.");
      }
    } catch {
      setResult("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-md text-center">
      <p
        id="mailing-list-heading"
        className="text-lg leading-7 text-mist"
      >
        Sign Up for launch details & special offers
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label htmlFor="mailing-list-email" className="sr-only">
          Email
        </label>
        <input
          id="mailing-list-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="Email address"
          aria-describedby="mailing-list-heading"
          className="w-full rounded-sm border border-iron bg-norse-950 px-3 py-2.5 text-base text-parchment placeholder:text-mist/70"
        />
        <button
          type="submit"
          disabled={pending}
          className="neon-btn shrink-0 rounded-sm px-6 py-2.5 font-display text-sm font-semibold tracking-cta uppercase disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Sending" : "Sign Up"}
        </button>
      </div>
      <p className="mt-3 min-h-6 text-sm text-mist" role="status" aria-live="polite">
        {result}
      </p>
    </form>
  );
}
