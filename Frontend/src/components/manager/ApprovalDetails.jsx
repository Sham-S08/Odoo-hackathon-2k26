import RiskScore from "../ai/RiskScore";
import RiskReasons from "../ai/RiskReasons";
import RuleViolationCard from "./RuleViolationCard";
import ApprovalActions from "./ApprovalActions";
import Card from "../common/Card";

export default function ApprovalDetails({ approval, onDecision }) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <div className="space-y-5 lg:col-span-2">
        <Card title="Discount violations">
          <div className="space-y-3">
            {approval.violations.map((v) => (
              <RuleViolationCard key={v.line} violation={v} />
            ))}
          </div>
        </Card>
        <Card title="Why this needs review">
          <RiskReasons reasons={approval.reasons} />
        </Card>
      </div>
      <div className="space-y-5">
        <Card title="Risk assessment">
          <RiskScore score={approval.riskScore} />
        </Card>
        <Card>
          <ApprovalActions onDecision={onDecision} />
        </Card>
      </div>
    </div>
  );
}
