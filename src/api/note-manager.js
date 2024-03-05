import { Note } from '../models/note';

const BASE_API_URL = 'http://localhost:3000/notes/';
const HEADERS_API = {
  "Content-Type": "application/json"
};

export class NoteManager {

  static async list() {
    const response = await fetch(BASE_API_URL);
    const data = await response.json();
    return data.map(obj => new Note(obj.id, obj.text));
  }

  static async create(note) {
    const response = await fetch(BASE_API_URL, {
      method: "POST",
      headers: HEADERS_API,
      body: JSON.stringify(note)
    });
    const data = await response.json();
    return data;
  }

  static async remove(id) {
    const response = await fetch(BASE_API_URL + id, {
      method: "DELETE",
      headers: HEADERS_API
    });
    const data = await response.json();
    return data;
  }
}
