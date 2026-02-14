interface KeyNumString {
  [key: string]: string | number;
}

interface KeyFunc {
  [key: string]: Function;
}

interface ProductList {
  [key: number]: Product;
}

interface ProductBasicProperties extends ProductProperties {
  developer: string;
  brand: string;
  country: string;
  serial_code: number;
}

interface ProductProperties {
  [key: string]: string | boolean | number;
}

interface Product {
  name: string;
  props?: ProductBasicProperties;
  [key: string]: unknown;
}

function checkKeys(
  typeCriteria: string,
  keys: string[] | number[],
  obj: { [key: string | number]: any }
): void {
  keys.forEach((k: string | number) => {
    if (obj[k]) {
      if (typeof obj[k] !== typeCriteria) {
        console.log(`Value of prop ${k} is not ${typeCriteria} type!`);
      } else {
        console.log(`Value of prop ${k} is ${typeCriteria}.`);
      }
    } else {
      console.log(`Property ${k} don't exist on given object!`);
    }
  });
}
