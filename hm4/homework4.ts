interface PrintProcessor {
  print(): void;
}

abstract class Figure {
  public readonly color: string;
  public readonly name: string;

  constructor(name: string, color: string) {
    this.color = color;
    this.name = name;
  }

  public abstract calculateArea(): number;
}

class Circle extends Figure {
  private _radius: number;
  constructor(name: string, color: string, r: number) {
    super(name, color);
    this._radius = r;
  }

  calculateArea(): number {
    return Math.pow(this._radius, 2) * Math.PI;
  }
}

class Triangle extends Figure {
  private _height: number;
  private _side: number;
  constructor(name: string, color: string, a: number, h: number) {
    super(name, color);
    this._height = h;
    this._side = a;
  }

  calculateArea(): number {
    return (this._height * this._side) / 2;
  }
}

class Rectangle extends Figure implements PrintProcessor {
  private _a: number;
  private _b: number;
  constructor(name: string, color: string, a: number, b: number) {
    super(name, color);
    this._a = a;
    this._b = b;
  }

  print(): void {
    console.log("S=a*b");
  }

  calculateArea(): number {
    return this._a * this._b;
  }
}

class Square extends Figure implements PrintProcessor {
  private _a: number;

  constructor(name: string, color: string, a: number) {
    super(name, color);
    this._a = a;
  }

  print(): void {
    console.log("S=a*a");
  }

  calculateArea(): number {
    return this._a * this._a;
  }
}
