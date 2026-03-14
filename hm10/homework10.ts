/* Вам треба створити додаток для управління нотатками, використовуючи принципи ООП, патерн DTO та декоратори.

1. Нотатки
Кожна нотатка має містити:
- ідентифікатор
- назву
- зміст
- дату створення
- дату редагування
- статус
- тип

Нотатки бувають двох типів (використовуйте наслідування):
- Дефолтні.
- Такі, що вимагають підтвердження при редагуванні та видалинні

2. У списку нотаток повинні бути методи для:
- Додавання нового запису.
- Видалення запису за ідентифікатором.
- Редагування запису.
- Отримання повної інформації про нотатку за ідентифікатором.
- Позначення нотатки як "виконаної".
- Отримання статистики: скільки всього нотаток у списку і скільки залишилося невиконаними.
- У списку повинна бути можливість пошуку нотатки за ім'ям або змістом.
- Додайте можливість сортування нотаток за статусом виконання або за часом створення.

3. Робота з даними
Уявіть, що дані надходять до вашого списку із зовнішнього API. Всі вхідні дані приходять у форматі snake_case.
Внутрішня бізнес-логіка вашого додатку та класи повинні суворо використовувати camelCase.

Типізуйте механізм, який автоматично трансформує ключі об'єктів зі snake_case у camelCase при отриманні даних, та навпаки — при поверненні результату клієнту.

4. Декоратори
Для оптимізації та чистоти коду необхідно реалізувати та застосувати наступні декоратори:

@SanitizeInput: Застосовується до методів додавання та редагування. Повинен автоматично видаляти зайві пробіли на початку
та в кінці строк у назві та змісті нотатки перед тим, як дані потраплять до основної логіки методу.

@ValidateNotEmpty: Застосовується після очищення. Нотатки не повинні бути порожніми. Декоратор перевіряє,
чи не є назва та зміст порожніми строками, і якщо так — викидає помилку до виконання основної логіки методу.

@AutoUpdateTimestamp: Застосовується до методу редагування. Декоратор повинен перехоплювати виклик методу
і автоматично оновлювати поле дата редагування поточною датою та часом, звільняючи розробника від необхідності
писати цю логіку всередині самого методу.
*/

const mockServerResponse: NoteServerDTO[] = [
  {
    note_id: "1",
    note_title: "Прочитати: Великий Гетсбі (Ф. Скотт Фіцджеральд)",
    note_content:
      "Проаналізувати мотив «зеленого вогника» та крах американської мрії.",
    created_at: "2026-02-01T10:00:00Z",
    updated_at: "2026-02-02T15:30:00Z",
    is_completed: true,
    type: "default",
  },
  {
    note_id: "2",
    note_title: "Купити: На Західному фронті без змін (Е.М. Ремарк)",
    note_content:
      "Звернути увагу на контраст між мирним життям та жахами окопів.",
    created_at: "2026-02-05T09:15:00Z",
    updated_at: "2026-02-05T09:15:00Z",
    is_completed: false,
    type: "confirmation",
  },
  {
    note_id: "3",
    note_title: "Написати есе: Фієста (Е. Хемінґвей)",
    note_content: "Розібрати «принцип айсберга» Хемінґвея.",
    created_at: "2026-02-10T14:20:00Z",
    updated_at: "2026-02-12T11:00:00Z",
    is_completed: false,
    type: "default",
  },
];

function ValidateNotEmpty() {
  //TODO
}

function SanitizeInput() {
  //TODO
}

function AutoUpdateTimestamp() {
  //TODO
}

interface Note {
  noteId: string;
  noteTitle: string;
  noteContent: string;
  createdAt: string;
  updatedAt: string;
  isCompleted: boolean;
  type: "default" | "confirmation";
}

class NoteList {
  protected _list: Note[];

  constructor(list: NoteServerDTO[]) {
    this._list = list.map((val) => mapFromDTO(val));
  }

  addNote(n: Note): void {
    this._list.push(n);
  }

  delNote(id: string): void {
    this._list = this._list.filter((n) => n.noteId !== id);
  }

  editNote<V extends Partial<NoteServerDTO>>(id: string, payload: V): void {
    const ed_note: Note | undefined = this._list.find((n) => n.noteId === id);
    //const formed_payload = mapFromDTO(payload);
    if (ed_note !== undefined) {
      this._list[this._list.indexOf(ed_note)] = { ...ed_note, ...payload }; //TODO
    } else {
      throw new Error(`[Validation Error]: Couldn't find given index: ${id}`);
    }
  }

  getNoteInfo(id: string): NoteServerDTO {
    const nt = this._list.find((n) => n.noteId === id);
    if (nt !== undefined) return mapToDTO(nt);
    else
      throw new Error(`[Validation Error]: Couldn't find given index: ${id}`);
  }

  completeNote(id: string): void {
    const nt = this._list.find((n) => n.noteId === id);
    if (nt !== undefined)
      this._list[this._list.indexOf(nt)]!.isCompleted = true;
    else
      throw new Error(`[Validation Error]: Couldn't find given index: ${id}`);
  }

  noteStatistics(): string {
    return `Completed notes: ${
      this._list.filter((n) => n.isCompleted).length
    }, Not completed notes: ${this._list.filter((n) => !n.isCompleted).length}`;
  }

  searchByTitle(t: string): NoteServerDTO {
    const nt = this._list.find((n) => n.noteTitle === t);
    if (nt !== undefined) return mapToDTO(nt);
    else throw new Error(`[Validation Error]: Couldn't find given title: ${t}`);
  }

  searchByContent(cont: string): NoteServerDTO {
    const nt = this._list.find((n) => n.noteContent === cont);
    if (nt !== undefined) return mapToDTO(nt);
    else
      throw new Error(`[Validation Error]: Couldn't find given title: ${cont}`);
  }

  sortByStatus(): NoteServerDTO[] {
    return this._list
      .sort((a, b) => {
        return a === b ? 0 : a ? -1 : 1;
      })
      .map((n) => mapToDTO(n));
  }

  sortByCreated(): void {
    //TODO
  }
}

type StartsWithUppercase<StringPart extends string> =
  StringPart extends Uncapitalize<StringPart> ? false : true;

type IsUnderscore<StringPart extends string> = StringPart extends "_"
  ? true
  : false;

type CamelToSnake<Text extends string> =
  Text extends `${infer CurrentChar}${infer RestOfString}`
    ? StartsWithUppercase<RestOfString> extends true
      ? `${Uncapitalize<CurrentChar>}_${CamelToSnake<RestOfString>}`
      : `${Uncapitalize<CurrentChar>}${CamelToSnake<RestOfString>}`
    : Text;

type MapToSnakeCaseDTO<T> = {
  [K in keyof T as CamelToSnake<K & string>]: T[K];
};

type SnakeToCamel<Text extends string> =
  Text extends `${infer CurrentChar}${infer RestOfString}`
    ? IsUnderscore<CurrentChar> extends true
      ? `${Capitalize<RestOfString>}`
      : `${CurrentChar}${SnakeToCamel<RestOfString>}`
    : Text; // Fixed

type MapToCamelCaseDomain<T> = {
  [K in keyof T as SnakeToCamel<K & string>]: T[K];
  // Fixed
};

type NoteServerDTO = MapToSnakeCaseDTO<Note>;
type ReconstructedNote = MapToCamelCaseDomain<NoteServerDTO>;

function mapToDTO(data: ReconstructedNote): NoteServerDTO {
  return {
    note_id: data.noteId,
    note_title: data.noteTitle,
    note_content: data.noteContent,
    created_at: data.createdAt,
    updated_at: data.updatedAt,
    is_completed: data.isCompleted,
    type: data.type,
  };
}

function mapFromDTO(data: NoteServerDTO): ReconstructedNote {
  return {
    noteId: data.note_id,
    noteTitle: data.note_title,
    noteContent: data.note_content,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    isCompleted: data.is_completed,
    type: data.type,
  };
}
