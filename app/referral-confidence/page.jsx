import ReferralConfidence from "./ReferralConfidence";

export const metadata = {
  title: "Referral Confidence",
  description:
    "Rate how confident a referring colleague feels sending patients to a specialist, and get a plan to improve.",
};

export default function Page() {
  return <ReferralConfidence />;
}
