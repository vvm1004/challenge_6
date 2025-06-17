// App.tsx
import { useEffect, useState } from 'react';
import {
  Container,
  Form,
  Button,
  Card,
  Stack,
  InputGroup,
} from 'react-bootstrap';
import type { Note } from './types';
import { BsPencil, BsPlusCircle, BsSearch, BsTrash } from 'react-icons/bs';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('notes');
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;
    const newNote = { title, content };

    if (editingIndex !== null) {
      const updated = [...notes];
      updated[editingIndex] = newNote;
      setNotes(updated);
      setEditingIndex(null);
    } else {
      setNotes([...notes, newNote]);
    }

    setTitle('');
    setContent('');
  };

  const handleEdit = (index: number) => {
    const note = notes[index];
    setTitle(note.title);
    setContent(note.content);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const updated = notes.filter((_, i) => i !== index);
    setNotes(updated);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Card className="p-3 mb-4 shadow-sm border-0">
        <Container><h4 className="fw-bold mb-0">My Notes</h4></Container>
      </Card>
      <Container className="py-1">

        <InputGroup className="mb-4 search-group" >
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


        <Card className="p-4 mb-4 border-0">
          <h6 className="mb-3 card__title">Create a new note</h6>
          <Form.Group className="mb-2">
            <Form.Label className='form__label'>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Note title"
              className='form__control'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3 mt-2">
            <Form.Label className='form__label'>Content</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Write your note here..."
              value={content}
              className='form__control'
              onChange={(e) => setContent(e.target.value)}
              style={{ height: '100px' }}
            />
          </Form.Group>

          <div className="text-end">
            <Button variant="success" onClick={handleSave}>
              <BsPlusCircle className="me-1" />
              {editingIndex !== null ? 'Update Note' : 'Save Note'}
            </Button>
          </div>
        </Card>

        {filteredNotes.map((note, index) => (
          <Card key={index} className="mb-3 border-start border-success border-3 rounded-3">
            <Card.Body>
              <Card.Title className="fw-semibold small">{note.title}</Card.Title>
              <Card.Text className="text-muted small">{note.content}</Card.Text>
              <div className="text-end">
                <Stack direction="horizontal" gap={2} className="justify-content-end">
                  <Button variant="outline-secondary" size="sm" onClick={() => handleEdit(index)}>
                    <BsPencil className="me-1" />
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>
                    <BsTrash />
                  </Button>
                </Stack>
              </div>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </>

  );
}

export default App;