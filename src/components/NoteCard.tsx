import { useEffect, useState } from 'react';
import { Card, Button, Stack, Form } from 'react-bootstrap';
import { BsPencil, BsTrash, BsCheck, BsX } from 'react-icons/bs';
import type { NoteCardProps } from '../types';
import { toast } from 'react-toastify';

function NoteCard({ note, isEditing, onEdit, onDelete, onSaveEdit, onCancelEdit }: NoteCardProps) {
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);

  useEffect(() => {
    setEditTitle(note.title);
    setEditContent(note.content);
  }, [note]);

  if (isEditing) {
    return (
      <Card className="mb-3 border-0 rounded-start note-card__edit">
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Title"
              className='note-card__edit-title'
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              as="textarea"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Content"
              style={{ height: '120px' }}
              className='note-card__edit-content'

            />
          </Form.Group>
          <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button variant="outline-secondary" size="sm" onClick={onCancelEdit}>
              <BsX className="me-1" />
              Cancel
            </Button>


            <Button
              variant="success"
              size="sm"
              onClick={() => {
                const trimmedTitle = editTitle.trim();
                const trimmedContent = editContent.trim();
                if (!trimmedTitle || !trimmedContent) {
                  toast.error("Title and content cannot be empty.");
                  return;
                }
                onSaveEdit(trimmedTitle, trimmedContent);
              }}
            >
              <BsCheck className="me-1" />
              Save
            </Button>
          
          </Stack>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card
      className="mb-3 border-0 rounded-start note-card"
    >
      <Card.Body>
      <Card.Title className="note-card__title">{note.title}</Card.Title>
      <Card.Text className="note-card__content">{note.content}</Card.Text>
      <div className="text-end">
          <Stack direction="horizontal" gap={2} className="justify-content-end">
            <Button variant="outline-secondary" size="sm" onClick={onEdit}>
              <BsPencil className="me-1" />
              Edit
            </Button>
            <Button variant="danger" size="sm" onClick={onDelete}>
              <BsTrash className="me-1" />
                Delete
            </Button>
          </Stack>
        </div>
      </Card.Body>
    </Card>

  );

}

export default NoteCard;
