import { DOMAINS } from "./questions";

// Every answer is 0-5. A domain score is the mean of its answers (0-5).
// The overall score is the mean of the domain scores, so each of the four
// headings carries equal weight even though they have different question counts.

export const LEVELS = [
  {
    min: 4.5,
    label: "Exemplary referral partner",
    message:
      "Colleagues can send you patients with full confidence. Keep doing what you do and share your habits with peers.",
  },
  {
    min: 3.5,
    label: "Trusted referral partner",
    message:
      "Colleagues generally trust you with their patients. A few targeted changes could move you to exemplary.",
  },
  {
    min: 2.5,
    label: "Developing",
    message:
      "There is a base to build on, but referrers may be hesitant. Focus on the priority areas below.",
  },
  {
    min: 0,
    label: "Needs attention",
    message:
      "Referrers are likely to have reservations. Pick two or three actions below and start there.",
  },
];

export function getLevel(score) {
  return LEVELS.find((l) => score >= l.min) ?? LEVELS[LEVELS.length - 1];
}

export function isComplete(answers, domain) {
  return domain.questions.every((q) => typeof answers[q.id] === "number");
}

export function calculateScores(answers) {
  const domains = DOMAINS.map((d) => {
    const values = d.questions
      .map((q) => answers[q.id])
      .filter((v) => typeof v === "number");
    const score = values.length
      ? values.reduce((a, b) => a + b, 0) / values.length
      : 0;
    return { id: d.id, title: d.title, color: d.color, score, answered: values.length };
  });
  const overall = domains.reduce((a, d) => a + d.score, 0) / domains.length;
  return { domains, overall, level: getLevel(overall) };
}

// Lowest-rated individual items (score of 3 or below), each with its improvement tip.
export function getFocusItems(answers, limit = 3) {
  const items = [];
  for (const d of DOMAINS) {
    for (const q of d.questions) {
      const v = answers[q.id];
      if (typeof v === "number" && v <= 3) {
        items.push({ domain: d.title, color: d.color, text: q.text, tip: q.tip, score: v });
      }
    }
  }
  return items.sort((a, b) => a.score - b.score).slice(0, limit);
}

// Domains scoring under 4 get a list of suggested activities, weakest first.
export function getDomainPlans(scores) {
  return scores.domains
    .filter((d) => d.score < 4)
    .sort((a, b) => a.score - b.score)
    .map((d) => {
      const domain = DOMAINS.find((x) => x.id === d.id);
      return {
        id: d.id,
        title: d.title,
        color: d.color,
        score: d.score,
        priority: d.score < 3 ? "High priority" : "Refine",
        actions: domain.actions,
      };
    });
}
