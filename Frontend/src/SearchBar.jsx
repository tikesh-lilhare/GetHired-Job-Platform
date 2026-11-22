import Icon from "./components/Icon";

function SearchBar({
    searchTerm,
    setSearchTerm
}) {

    return (

        <div className="input-icon search-bar">

            <Icon name="search" size={20} />

            <input
                type="text"
                className="form-control"
                placeholder="Search by job title, company or skill..."
                aria-label="Search jobs"
                value={searchTerm}
                onChange={(e) =>
                    setSearchTerm(
                        e.target.value
                    )
                }
            />

        </div>

    );
}

export default SearchBar;
