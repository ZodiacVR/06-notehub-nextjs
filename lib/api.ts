import axios from 'axios';
import type { Note } from '../types/note';

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

interface NewNote {
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

const URL = 'https://notehub-public.goit.study/api/notes';

export const fetchNotes = async (query: string, page: number): Promise<NotesHttpResponse> => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;
  if (!token) {
    throw new Error('NoteHub token is missing. Please set VITE_NOTEHUB_TOKEN in your .env file.');
  }

  try {
    const parameters = new URLSearchParams({
      ...(query !== '' ? { search: query } : {}),
      page: page.toString(),
    });
    const response = await axios.get<NotesHttpResponse>(`${URL}?${parameters}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`, // Додано префікс Bearer
      },
    });
    return response.data;
  } catch (error) {
    console.error('Fetch notes error:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch notes');
  }
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;
  if (!token) {
    throw new Error('NoteHub token is missing. Please set VITE_NOTEHUB_TOKEN in your .env file.');
  }

  try {
    const response = await axios.post<Note>(URL, newNote, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`, // Додано префікс Bearer
      },
    });
    return response.data;
  } catch (error) {
    console.error('Create note error:', error);
    throw error instanceof Error ? error : new Error('Failed to create note');
  }
};

export const deleteNote = async (id: number): Promise<Note> => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;
  if (!token) {
    throw new Error('NoteHub token is missing. Please set VITE_NOTEHUB_TOKEN in your .env file.');
  }

  try {
    const response = await axios.delete<Note>(`${URL}/${id}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`, // Додано префікс Bearer
      },
    });
    return response.data;
  } catch (error) {
    console.error('Delete note error:', error);
    throw error instanceof Error ? error : new Error('Failed to delete note');
  }
};