function PageHeader({ eyebrow, title, subtitle, children }) {
    return (
        <div className="page-head">
            <div>
                {eyebrow && <span className="eyebrow">{eyebrow}</span>}
                <h1>{title}</h1>
                {subtitle && <p>{subtitle}</p>}
            </div>
            {children}
        </div>
    );
}

export default PageHeader;
