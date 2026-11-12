"use client";

import { useMemo, useRef, useState } from "react";
import styles from "./referral.module.css";
import RadarChart from "./RadarChart";
import { DOMAINS, SCALE, TOTAL_QUESTIONS } from "./data/questions";
import { calculateScores, getDomainPlans, getFocusItems, isComplete } from "./data/scoring";

export default function ReferralConfidence() {
  const [step, setStep] = useState(0); // 0..DOMAINS.length-1 = questions, DOMAINS.length = results
  const [answers, setAnswers] = useState({});
  const [specialist, setSpecialist] = useState("");
  const topRef = useRef(null);

  const onResults = step === DOMAINS.length;
  const answered = Object.keys(answers).length;
  const domain = DOMAINS[step];

  const scores = useMemo(() => calculateScores(answers), [answers]);
  const focus = useMemo(() => getFocusItems(answers), [answers]);
  const plans = useMemo(() => getDomainPlans(scores), [scores]);

  const go = (next) => {
    setStep(next);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const download = () => {
    const payload = {
      timestamp: new Date().toISOString(),
      specialist: specialist || null,
      overall: Number(scores.overall.toFixed(2)),
      level: scores.level.label,
      domains: scores.domains.map((d) => ({ id: d.id, title: d.title, score: Number(d.score.toFixed(2)) })),
      answers,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `referral-confidence-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setAnswers({});
    setSpecialist("");
    go(0);
  };

  return (
    <main className={styles.page} ref={topRef}>
      <header className={styles.header}>
        <h1 className={styles.title}>Referral confidence</h1>
        <p className={styles.lede}>
          What a colleague thinks, but rarely asks, when sending you a patient. Rate a specialist on the
          four questions from <em>5 Questions Patients Have but Never Ask</em> (JAMA Neurology, 2018),
          seen from the referrer&apos;s side.
        </p>
      </header>

      {!onResults && (
        <>
          <nav className={styles.steps} aria-label="Progress">
            {DOMAINS.map((d, i) => (
              <button
                key={d.id}
                type="button"
                className={`${styles.step} ${i === step ? styles.stepActive : ""}`}
                style={{ "--accent": d.color }}
                onClick={() => (i <= step || isComplete(answers, DOMAINS[i - 1])) && go(i)}
                aria-current={i === step ? "step" : undefined}
              >
                <span className={styles.stepBar} />
                <span className={styles.stepLabel}>{d.title}</span>
                {isComplete(answers, d) && <span className={styles.stepDone}>Done</span>}
              </button>
            ))}
          </nav>

          <section className={styles.sheet} style={{ "--accent": domain.color }}>
            <h2 className={styles.domainTitle}>{domain.title}</h2>
            <p className={styles.colleagueQ}>&ldquo;{domain.colleagueQuestion}&rdquo;</p>

            {step === 0 && (
              <label className={styles.nameField}>
                <span>Specialist being rated (optional)</span>
                <input
                  type="text"
                  value={specialist}
                  onChange={(e) => setSpecialist(e.target.value)}
                  placeholder="Name or initials"
                  maxLength={80}
                />
              </label>
            )}

            <p className={styles.scaleHint}>
              How often does this specialist do the following? 0 = {SCALE[0].label}, 5 = {SCALE[5].label}.
            </p>

            {domain.questions.map((q) => (
              <fieldset key={q.id} className={styles.question}>
                <legend className={styles.qText}>{q.text}</legend>
                <div className={styles.scale} role="radiogroup">
                  {SCALE.map((s) => (
                    <label key={s.value} className={styles.opt} title={s.label}>
                      <input
                        type="radio"
                        name={q.id}
                        value={s.value}
                        checked={answers[q.id] === s.value}
                        onChange={() => setAnswers((a) => ({ ...a, [q.id]: s.value }))}
                      />
                      <span className={styles.optFace}>{s.value}</span>
                    </label>
                  ))}
                </div>
                <p className={styles.picked} aria-live="polite">
                  {typeof answers[q.id] === "number" ? SCALE[answers[q.id]].label : "Not answered"}
                </p>
              </fieldset>
            ))}

            <div className={styles.nav}>
              <button type="button" className={styles.ghost} disabled={step === 0} onClick={() => go(step - 1)}>
                Back
              </button>
              <span className={styles.count}>
                {answered} of {TOTAL_QUESTIONS} answered
              </span>
              <button
                type="button"
                className={styles.primary}
                disabled={!isComplete(answers, domain)}
                onClick={() => go(step + 1)}
              >
                {step === DOMAINS.length - 1 ? "See my score" : "Next section"}
              </button>
            </div>
          </section>
        </>
      )}

      {onResults && (
        <section aria-labelledby="results-h">
          <div className={styles.scoreHead}>
            <div>
              <h2 id="results-h" className={styles.resultsTitle}>
                {specialist ? `Referral confidence for ${specialist}` : "Your referral confidence score"}
              </h2>
              <p className={styles.level}>{scores.level.label}</p>
              <p className={styles.levelMsg}>{scores.level.message}</p>
            </div>
            <div className={styles.bigScore} aria-label={`Overall score ${scores.overall.toFixed(1)} out of 5`}>
              <span className={styles.bigNum}>{scores.overall.toFixed(1)}</span>
              <span className={styles.bigOf}>out of 5</span>
            </div>
          </div>

          <div className={styles.resultGrid}>
            <div className={styles.radar}>
              <RadarChart domains={scores.domains} />
            </div>
            <ul className={styles.bars}>
              {scores.domains.map((d) => (
                <li key={d.id}>
                  <div className={styles.barRow}>
                    <span>{d.title}</span>
                    <strong>{d.score.toFixed(1)}</strong>
                  </div>
                  <div className={styles.track} role="presentation">
                    <div className={styles.fill} style={{ width: `${(d.score / 5) * 100}%`, background: d.color }} />
                    <span className={styles.target} title="Target 4.0" />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {focus.length > 0 && (
            <div className={styles.block}>
              <h3>Start here</h3>
              <p className={styles.blockNote}>The lowest-rated behaviours, with one concrete change each.</p>
              <ol className={styles.focusList}>
                {focus.map((f) => (
                  <li key={f.text} style={{ "--accent": f.color }}>
                    <span className={styles.focusMeta}>
                      {f.domain}, rated {f.score}
                    </span>
                    <p className={styles.focusText}>{f.text}</p>
                    <p className={styles.focusTip}>{f.tip}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className={styles.block}>
            <h3>Activities to improve your score</h3>
            {plans.length === 0 ? (
              <p className={styles.blockNote}>
                Every area scored 4.0 or above. Keep the habits that got you here and re-check in six months.
              </p>
            ) : (
              <>
                <p className={styles.blockNote}>Areas under 4.0, weakest first.</p>
                {plans.map((p) => (
                  <details key={p.id} className={styles.plan} style={{ "--accent": p.color }} open={p.score < 3}>
                    <summary>
                      <span>{p.title}</span>
                      <span className={styles.planMeta}>
                        {p.score.toFixed(1)}, {p.priority.toLowerCase()}
                      </span>
                    </summary>
                    <ul>
                      {p.actions.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  </details>
                ))}
              </>
            )}
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.primary} onClick={download}>
              Download results
            </button>
            <button type="button" className={styles.ghost} onClick={() => window.print()}>
              Print
            </button>
            <button type="button" className={styles.ghost} onClick={() => go(0)}>
              Edit answers
            </button>
            <button type="button" className={styles.ghost} onClick={reset}>
              Start over
            </button>
          </div>

          <p className={styles.disclaimer}>
            This is a reflective tool based on perceived behaviours. It is not a validated instrument and is
            not a substitute for formal peer review. Answers stay in your browser and are not sent anywhere.
          </p>
        </section>
      )}
    </main>
  );
}
