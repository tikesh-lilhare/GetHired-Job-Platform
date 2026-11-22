import { prettyStatus, statusTone } from "../utils/format";

function StatusBadge({ status }) {
    return <span className={`badge ${statusTone(status)}`}>{prettyStatus(status)}</span>;
}

export default StatusBadge;
