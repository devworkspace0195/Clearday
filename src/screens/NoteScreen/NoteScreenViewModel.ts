import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootState } from '../../store/store';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { addNote, deleteNote, updateNote } from '../../store/slices/notesSlice';
import type { Note } from './NoteScreenModel';

type NoteScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Note'>;

interface ComposeState {
  isOpen: boolean;
  editingNote: Note | null;
  titleDraft: string;
  bodyDraft: string;
}

interface UseNoteScreenViewModelReturn {
  notes: Note[];
  filteredNotes: Note[];
  searchQuery: string;
  noteCount: number;
  compose: ComposeState;
  canSave: boolean;
  setSearchQuery: (q: string) => void;
  openCompose: () => void;
  openEdit: (note: Note) => void;
  closeCompose: () => void;
  setTitleDraft: (text: string) => void;
  setBodyDraft: (text: string) => void;
  saveNote: () => void;
  removeNote: (id: string) => void;
  goBack: () => void;
}

export const useNoteScreenViewModel = (): UseNoteScreenViewModelReturn => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NoteScreenNavigationProp>();
  const notes = useSelector((state: RootState) => state.notes.notes);

  const [searchQuery, setSearchQuery] = useState('');
  const [compose, setCompose] = useState<ComposeState>({
    isOpen: false,
    editingNote: null,
    titleDraft: '',
    bodyDraft: '',
  });

  const filteredNotes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) { return notes; }
    return notes.filter(
      n =>
        n.title.toLowerCase().includes(q) ||
        n.body.toLowerCase().includes(q),
    );
  }, [notes, searchQuery]);

  const noteCount = useMemo(() => notes.length, [notes]);

  const canSave = useMemo(
    () => compose.titleDraft.trim().length > 0 || compose.bodyDraft.trim().length > 0,
    [compose.titleDraft, compose.bodyDraft],
  );

  const openCompose = useCallback(() => {
    setCompose({ isOpen: true, editingNote: null, titleDraft: '', bodyDraft: '' });
  }, []);

  const openEdit = useCallback((note: Note) => {
    setCompose({
      isOpen: true,
      editingNote: note,
      titleDraft: note.title,
      bodyDraft: note.body,
    });
  }, []);

  const closeCompose = useCallback(() => {
    setCompose({ isOpen: false, editingNote: null, titleDraft: '', bodyDraft: '' });
  }, []);

  const setTitleDraft = useCallback((text: string) => {
    setCompose(prev => ({ ...prev, titleDraft: text }));
  }, []);

  const setBodyDraft = useCallback((text: string) => {
    setCompose(prev => ({ ...prev, bodyDraft: text }));
  }, []);

  const saveNote = useCallback(() => {
    if (!canSave) { return; }
    const now = Date.now();

    if (compose.editingNote) {
      dispatch(
        updateNote({
          ...compose.editingNote,
          title: compose.titleDraft.trim(),
          body: compose.bodyDraft.trim(),
          updatedAt: now,
        }),
      );
    } else {
      const newNote: Note = {
        id: `note_${now}_${Math.random().toString(36).slice(2, 9)}`,
        title: compose.titleDraft.trim(),
        body: compose.bodyDraft.trim(),
        createdAt: now,
        updatedAt: now,
      };
      dispatch(addNote(newNote));
    }

    closeCompose();
  }, [canSave, compose, dispatch, closeCompose]);

  const removeNote = useCallback(
    (id: string) => {
      dispatch(deleteNote(id));
    },
    [dispatch],
  );

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    notes,
    filteredNotes,
    searchQuery,
    noteCount,
    compose,
    canSave,
    setSearchQuery,
    openCompose,
    openEdit,
    closeCompose,
    setTitleDraft,
    setBodyDraft,
    saveNote,
    removeNote,
    goBack,
  };
};
