function Loader({ text = "Loading..." }) {
    return (
        <div className="loader" role="status">
            <div className="spinner-border" />
            <p>{text}</p>
        </div>
    );
}

export default Loader;
