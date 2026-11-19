class User {
  public  id: number
  public name: string
  public email: string
  private password: string
  protected phone: string
  private _age: number

  constructor(id: number,name: string,email: string,password: string,phone: string,age: number) {
    this.id = id
    this.name = name
    this.email = email
    this.password = password
    this.phone = phone
    this._age = 18
    this.age = age
  }
  
  public set age(value: number) {
    if (value < 18 || value > 60) {
      throw new Error("Age must be between 18 and 60.");
    }
    this._age = value
  }
  public get age(): number {
    return this._age
  }


  public displayInfo(): void {
    console.log(`ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Phone: ${this.phone}, Age: ${this._age}`);
  }
}

class Admin extends User {
  public manageNotes(action: "delete" | "archive" | "restore", noteId: number): void {
    console.log(`Admin ${this.name} performed '${action}' on note #${noteId}.`);
  }
}

class Note {
  public readonly id: number
  public title: string
  public content: string
  public author: User

  constructor(id: number, title: string, content: string, author: User) {
    this.id = id
    this.title = title
    this.content = content
    this.author = author
  }

  public get userId(): number {
    return this.author.id
  }

  public preview(maxLength: number = 50): string {
    if (this.content.length <= maxLength) {
      return this.content
    }
    return `${this.content.slice(0, maxLength)}...`
  }
}

class NoteBook {
  public  id: number
  public title: string
  private notes: Note[] = []

  constructor(id: number, title: string) {
    this.id = id
    this.title = title
  }

  public addNote(note: Note): void {
    this.notes.push(note)
  }

  public removeNote(noteId: number): boolean {
    const initialLength = this.notes.length
    this.notes = this.notes.filter((note) => note.id !== noteId);
    return this.notes.length < initialLength
  }

  public getNotes(): Note[] {
    return [...this.notes]
  }
}

class Storage<T> {
  private items: T[] = [];

  public addItem(item: T): void {
    this.items.push(item);
  }

  public removeItem(item: T): boolean {
    const index = this.items.indexOf(item);
    if (index === -1) {
      return false;
    }
    this.items.splice(index, 1);
    return true;
  }

  public getAllItems(): T[] {
    return [...this.items];
  }
}

const user = new User(1, "Zeyad Tamer", "zeyad@example.com", "123124125", "01123123123", 21);
const admin = new Admin(2, "Admin User", "admin@example.com", "admin123", "01231231231", 30);

const notebook = new NoteBook(101, "Engineering Notes");
const note1 = new Note(1, "TypeScript OOP", "Implementing classes, inheritance, composition, aggregation, association, and generics.", user);
const note2 = new Note(2, "System Design", "Reviewing UML class diagrams and relationships.", user);

notebook.addNote(note1);
notebook.addNote(note2);

const userNotebooks = new Storage<NoteBook>();
userNotebooks.addItem(notebook);

user.displayInfo();
console.log(note1.preview(30));
admin.manageNotes("archive", note2.id);
console.log(userNotebooks.getAllItems());