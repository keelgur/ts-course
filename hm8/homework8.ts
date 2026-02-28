type Item = {
  itemId: string;
};

type Player = {
  id: string;
  nickname: string;
  hp: number;
  mana: number;
  gold?: number;
  item?: Item;
};

type DeepReadonly<T> = {
  readonly [K in keyof T]: Readonly<T[K]>;
};

type DeepRequiredReadonly<T> = {
  readonly [K in keyof T]-?: Required<Readonly<T[K]>>;
};

type UpperCaseKeys<T> = {
  [K in keyof T as `${Uppercase<K & string>}`]: T[K];
};

type ObjectToPropertyDescriptor<T> = {
  [K in keyof T]: TypedPropertyDescriptor<T[K]>;
};

const player: DeepReadonly<Player> = {
  id: "12312",
  nickname: "asdsd",
  hp: 129,
  mana: 430,
  gold: 23,
  item: { itemId: "09999" },
};
//player.gold=0: Cannot assign to 'gold' because it is a read-only property.
//player.item.itemId="23": Cannot assign to 'itemId' because it is a read-only property.

const player2: DeepRequiredReadonly<Player> = {
  id: "1233312",
  nickname: "asdsd",
  hp: 19,
  mana: 40,
  gold: 83838, //Property 'gold' is missing in type
  item: { itemId: "01212" }, //Property 'itemId' is missing in type '{}' but required in type 'Required<Readonly<Item>>'
};

const player3: UpperCaseKeys<Player> = {
  ID: "1337", //id: Object literal may only specify known properties, but 'id' does not exist in type 'UpperCaseKeys<Player>'. Did you mean to write 'ID'?
  NICKNAME: "SHODAN",
  HP: 9999,
  MANA: 8888,
};
