import "./SearchBar.css";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

export default function SearchBar({formSubmit, handleSearchKey, clearSearch, value}) {
  return (
    <div className="searchBar">
      <form onSubmit={formSubmit}>
        <input type="text" onChange={handleSearchKey} value={value} />
        {value && <span onClick={clearSearch}><CloseIcon/></span>}
        <button >
          <SearchIcon />
        </button>
      </form>
    </div>
  );
}
