import type { NoteFormProps } from '@/types';
import { Form, Button, Card } from 'react-bootstrap';
import { BsPlusCircle } from 'react-icons/bs';



function NoteForm({ title, content, setTitle, setContent, onSave }: NoteFormProps) {
  return (
    <Card className="p-4 mb-4 border-0">
      <h6 className="mb-3 card__title">{'Create a new note'}</h6>
      <Form.Group className="mb-2">
        <Form.Label className='form__label'>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Note title"
          className='form__control'
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          />
      </Form.Group>
      <Form.Group className="mb-3 mt-2">
        <Form.Label className='form__label'>Content</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Write your note here..."
          value={content}
          className='form__control'
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
          style={{ height: '100px' }}
        />
      </Form.Group>
      <div className="form__wrapper">
        <Button variant="success" onClick={onSave} className='form__button'>
          <BsPlusCircle className="form__button-icon" />
              Save Note
        </Button>
      </div>
    </Card>
  );
}

export default NoteForm;
