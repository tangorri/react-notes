export class Note {
  constructor(id, text) {
    this.id = id;
    this.text = text;
  }

  length() {
    return this.text.length;
  }
}
