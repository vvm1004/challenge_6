export interface Note {
  id: string;
  title: string;
  content: string;
}


export interface NoteFormProps {
  title: string;
  content: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  onSave: () => void;
}

export interface NoteCardProps {
  note: Note;
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSaveEdit: (title: string, content: string) => void;
  onCancelEdit: () => void;
}

export interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}
