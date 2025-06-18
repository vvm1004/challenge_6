import type { SearchBarProps } from '@/types';
import { Form, InputGroup } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';


function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  return (
    <InputGroup className="mb-4 search-group">
      <InputGroup.Text className="search-icon">
        <BsSearch />
      </InputGroup.Text>
      <Form.Control
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
    </InputGroup>
  );
}

export default SearchBar;
