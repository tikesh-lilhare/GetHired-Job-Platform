import Icon from "./Icon";

function EmptyState({ icon = "inbox", title, text, children }) {
    return (
        <div className="state-box">
            <span className="icon-tile soft">
                <Icon name={icon} size={24} />
            </span>
            <h4>{title}</h4>
            {text && <p>{text}</p>}
            {children}
        </div>
    );
}

export default EmptyState;
