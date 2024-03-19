import TextField from "@mui/material/TextField";
import './SearchBar.css';

const SearchBar = ({
    inputValue
}) => {
    return (
        <div className="main-search">
            <div className="search">
                <TextField
                    id="outlined-basic"
                    onChange={inputValue}
                    variant="outlined"
                    fullWidth
                    label="Search by book name, author or ISBN..."
                    placeholder="Search by book name, author or ISBN..."
                />
            </div>
        </div>
    );
}

export default SearchBar;