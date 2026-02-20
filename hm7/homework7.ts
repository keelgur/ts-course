// 1. Написати узагальнену функцію updateProperty, яка не мутує оригінальний об'єкт,
// а повертає його нову копію з оновленим значенням для конкретного ключа. Функція повинна приймати:
//    * Об'єкт типу T
//    * Ключ цього об'єкта
//    * Нове значення, тип якого повинен строго відповідати типу властивості за цим ключем
function updateProperty<T extends Object, K extends keyof T>(
  o: T,
  key: K,
  newVal: T[K]
): T {
  return { ...o, [key]: newVal } as T;
}
// 2. Створіть систему обробки аналітики, яка включає в себе:
//    * Тип EventName = 'click' | 'scroll' | 'purchase'.
//    * Інтерфейс EventPayloads, який описує структуру даних для кожної події
//      (наприклад, для click — { x: number, y: number }, для scroll — { offset: number }, для purchase — { itemId: string, amount: number }).
//    * Узагальненний клас AnalyticsTracker де перший параметр обмежений типом EventName,
//      а другий залежить від першого і відповідає структурі з EventPayloads.
//    * Клас повинен мати метод track(eventName, payload): void.
type EventName = "click" | "scroll" | "purchase";

interface EventPayloads<T> {
  name: T;
  x?: number;
  y?: number;
  offset?: number;
  itemId?: string;
  amount?: number;
}

class AnalyticsTracker<T extends EventName, U extends EventPayloads<T>> {
  eventName!: T;
  payload!: U;

  track(eventName: T, payload: U): void {
    switch (eventName) {
      case "click":
        payload["x"] = 10;
        payload["y"] = 20;
        break;
      case "scroll":
        payload["offset"] = 100;
        break;
      case "purchase":
        payload["itemId"] = "0002323";
        payload["amount"] = 42;
        break;
    }
    console.log(`Tracking ${eventName} event...`);
  }
}

// 3. Вам дістався клас FormProcessor, який створив розробник-початківець. Він намагався зробити клас універсальним,
//    але припустився критичних помилок:
//    * використав небезпечне обмеження extends any
//    * затінив параметр типу у методі
//    * повністю втратив типобезпеку при оновленні полів

class FormProcessor<T extends Object = {}> {
  public data: any; //:T на це змінити для типобезпеки

  constructor(data: T) {
    this.data = data;
  }

  public updateField<T, K extends keyof T>(key: K, value: T[K]): void {
    this.data[key] = value;
  }
}

// Ваше завдання провести рефакторинг:
//  1. Виправте оголошення класу. T має бути обмежений об'єктом. Також додайте значення за замовчуванням: якщо тип не передано,
//     нехай це буде порожній об'єкт.
//  2. Перепишіть сигнатуру методу updateField. Він не повинен затінювати параметр класу.
//  3. Також метод updateField повинен приймати лише існуючі ключі з data та сумісні з ними значення.
