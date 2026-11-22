import { Fragment } from "react";
import Icon from "./Icon";
import { statusStep } from "../utils/format";

const STAGES = ["Applied", "Shortlisted", "Interview", "Hired"];

function StatusStepper({ status }) {
    const rejected = status === "REJECTED";
    const current = rejected ? 0 : statusStep(status);

    return (
        <div className={`stepper ${rejected ? "rejected" : ""}`} aria-label={`Application status: ${status}`}>
            {STAGES.map((label, i) => (
                <Fragment key={label}>
                    <div className={`s ${i <= current ? "done" : ""}`}>
                        <span className="dot">{i <= current && <Icon name="check" size={12} strokeWidth={3} />}</span>
                        {label}
                    </div>
                    {i < STAGES.length - 1 && <span className={`bar ${i < current ? "done" : ""}`} />}
                </Fragment>
            ))}
        </div>
    );
}

export default StatusStepper;
