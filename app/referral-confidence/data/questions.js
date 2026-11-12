// Referral Confidence – question bank
// Based on the four headings of "5 Questions Patients Have but Never Ask"
// (JAMA Neurology, 2018), reframed for what a referring colleague thinks
// but rarely asks when sending a patient for an opinion.

export const SCALE = [
  { value: 0, label: "Never" },
  { value: 1, label: "Rarely" },
  { value: 2, label: "Occasionally" },
  { value: 3, label: "Often" },
  { value: 4, label: "Very often" },
  { value: 5, label: "Always" },
];

export const DOMAINS = [
  {
    id: "connect",
    title: "Personal connect",
    colleagueQuestion: "Do you care about my patient, and about me?",
    color: "#2F5BD8",
    questions: [
      {
        id: "connect-1",
        text: "Treats my patient as a person, not just another case.",
        tip: "Open each consult with one non-medical question about the patient's life, work or family before turning to the history.",
      },
      {
        id: "connect-2",
        text: "Listens to the patient without rushing the visit.",
        tip: "Sit down, face the patient rather than the screen, and let them finish their account before you interrupt.",
      },
      {
        id: "connect-3",
        text: "Explains findings and plans in language the patient understands.",
        tip: "Close each visit by asking the patient to say the plan back in their own words (teach-back).",
      },
      {
        id: "connect-4",
        text: "Respects the history and relationship I already have with the patient.",
        tip: "Read the referral note before the visit and acknowledge the referrer's work-up and concerns out loud.",
      },
      {
        id: "connect-5",
        text: "Treats me as a partner in care, not as a junior.",
        tip: "Invite the referrer's view before finalising the plan, and thank them for the referral in your reply.",
      },
    ],
    actions: [
      "Phone patients after major procedures or missed appointments instead of delegating the call.",
      "Protect a few unhurried minutes in each consult for listening only.",
      "Use teach-back to confirm the patient has understood the plan.",
      "Thank the referrer personally and reference their clinical reasoning in your note.",
      "Ask for patient and referrer feedback on how heard they felt, and review it quarterly.",
    ],
  },
  {
    id: "trade",
    title: "Trust of your trade",
    colleagueQuestion: "Are you the right person for this problem?",
    color: "#0E8A6E",
    questions: [
      {
        id: "trade-1",
        text: "Has expertise that fits the specific problem I referred.",
        tip: "State your scope of practice and case volume for common referral questions on your clinic page or referral form.",
      },
      {
        id: "trade-2",
        text: "Keeps up with current evidence and guidelines.",
        tip: "Block a fixed weekly slot for reading, and name the guideline or trial behind any recommendation you give.",
      },
      {
        id: "trade-3",
        text: "Says openly when a case is beyond their scope and refers onward.",
        tip: "Agree a short list of colleagues you route complex cases to, and tell the referrer when you do so.",
      },
      {
        id: "trade-4",
        text: "Has outcomes and complication rates I would be comfortable reviewing.",
        tip: "Audit your own outcomes yearly and be ready to share them when a colleague asks.",
      },
      {
        id: "trade-5",
        text: "Gives a clear, evidence-based reason for each recommendation.",
        tip: "Add a one-line rationale to every recommendation in your reply letter.",
      },
    ],
    actions: [
      "Attend at least two meetings or courses a year and share the take-home points with referrers.",
      "Join or start a journal club in your sub-specialty.",
      "Review your own outcome and complication data every year.",
      "Be explicit about what you do and do not take on, and who you refer to for the rest.",
      "Seek peer case review for cases that did not go as expected.",
    ],
  },
  {
    id: "trust",
    title: "Social trust",
    colleagueQuestion: "Can I trust you with my patient?",
    color: "#B5541C",
    questions: [
      {
        id: "trust-1",
        text: "Replies promptly and closes the loop with a clear written note.",
        tip: "Set a standing rule: a reply note goes out within 48 hours of every consult, with a clear plan and next steps.",
      },
      {
        id: "trust-2",
        text: "Sends my patient back to me with clear follow-up instead of keeping them unnecessarily.",
        tip: "End every reply with who owns each next step, and the point at which the patient returns to the referrer.",
      },
      {
        id: "trust-3",
        text: "Is honest with me when something has gone wrong.",
        tip: "Call the referrer the same day an adverse event or significant delay occurs, before they hear it elsewhere.",
      },
      {
        id: "trust-4",
        text: "Avoids unnecessary tests or procedures.",
        tip: "Document why each test or procedure is needed and how it will change management.",
      },
      {
        id: "trust-5",
        text: "Acknowledges my work-up instead of quietly redoing everything.",
        tip: "Review and reuse prior results where valid, and explain when a repeat is genuinely needed.",
      },
      {
        id: "trust-6",
        text: "Gives my patient a timely appointment and is reachable when I am worried.",
        tip: "Offer a direct line or message channel for referrers and a fast-track slot for urgent referrals.",
      },
    ],
    actions: [
      "Commit to a reply-note turnaround time and track whether you meet it.",
      "Give referrers a direct contact route for urgent concerns.",
      "Share a short criteria list for tests and procedures you routinely order.",
      "Disclose complications and delays to the referrer promptly and plainly.",
      "Return patients to their referrer with a written follow-up plan by default.",
    ],
  },
  {
    id: "style",
    title: "Treating style",
    colleagueQuestion: "Will you treat my patient, and me, the same as everyone else?",
    color: "#7A3FA0",
    questions: [
      {
        id: "style-1",
        text: "Gives my patient the same attention whatever their income, insurance or location.",
        tip: "Review your waiting times and consult lengths by payer category to check for unintended differences.",
      },
      {
        id: "style-2",
        text: "Does not judge patients for lifestyle, addiction or non-adherence.",
        tip: "Ask about barriers to adherence with open questions, and record them as clinical findings rather than faults.",
      },
      {
        id: "style-3",
        text: "Shows equal respect to patients of every background, sex and ethnicity.",
        tip: "Complete implicit-bias or cultural-safety training and use professional interpreters when language differs.",
      },
      {
        id: "style-4",
        text: "Does not undermine my plan in front of the patient.",
        tip: "Raise disagreements with the referrer directly, then present one agreed plan to the patient.",
      },
      {
        id: "style-5",
        text: "Treats me the same whatever my specialty, seniority or practice size.",
        tip: "Answer every referrer with the same promptness and courtesy, whoever they are.",
      },
    ],
    actions: [
      "Take implicit-bias training and revisit it every year or two.",
      "Look at your outcomes and access data by patient group to spot gaps.",
      "Learn the social determinants of health that affect your patient population.",
      "Settle disagreements with the referrer privately, never in front of the patient.",
      "Ask patients from varied backgrounds how respected they felt, and act on it.",
    ],
  },
];

export const TOTAL_QUESTIONS = DOMAINS.reduce((n, d) => n + d.questions.length, 0);
