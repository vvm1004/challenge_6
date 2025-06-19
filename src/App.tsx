// App.tsx
import { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import NoteForm from 'components/NoteForm';
import NoteCard from 'components/NoteCard';
import SearchBar from 'components/SearchBar';
import type { Note } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('notes');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setNotes(parsed);
        }
      } catch (e) {
        console.error('Lỗi khi parse notes từ localStorage:', e);
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }, [notes, loaded]);


  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content cannot be empty.");
      return;
    }
    const newNote: Note = {
      id: uuidv4(),
      title: title.trim(),
      content: content.trim(),
    };

    setNotes([newNote, ...notes]);
    setTitle('');
    setContent('');
  };

  const handleDelete = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleSaveEdit = (id: string, newTitle: string, newContent: string) => {
    
    setNotes(notes.map(note =>
      note.id === id ? { ...note, title: newTitle, content: newContent } : note
    ));
    setEditingId(null);
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
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <NoteForm
          title={title}
          content={content}
          setTitle={setTitle}
          setContent={setContent}
          onSave={handleSave}
        />
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            isEditing={editingId === note.id}
            onEdit={() => setEditingId(note.id)}
            onDelete={() => handleDelete(note.id)}
            onSaveEdit={(newTitle, newContent) => handleSaveEdit(note.id, newTitle, newContent)}
            onCancelEdit={() => setEditingId(null)}
          />
        ))}

      </Container>
    </>
  );
}

export default App;
