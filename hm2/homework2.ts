class Lecturer {
  _name: string;
  _surname: string;
  _position: string;
  _company: string;
  _experience: number;
  _courses: string[];
  _contacts: string;

  constructor(
    name: string,
    sname: string,
    pos: string,
    comp: string,
    exp: number,
    courses: string[],
    conts: string
  ) {
    this._name = name;
    this._surname = sname;
    this._position = pos;
    this._company = comp;
    this._experience = exp;
    this._courses = courses;
    this._contacts = conts;
  }
}

class School {
  // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods

  _areas: Area[] = [];
  _lecturers: Lecturer[] = []; // Name, surname, position, company, experience, courses, contacts

  get areas(): Area[] {
    return this._areas;
  }

  get lecturers(): Lecturer[] {
    return this._lecturers;
  }

  addArea(a: Area): void {
    this._areas.push(a);
  }

  addLecturer(l: Lecturer): void {
    this._lecturers.push(l);
  }

  removeArea(a: Area): void {
    let i = this._areas.indexOf(a);
    if (i > -1) this._areas.splice(i, 1);
  }

  removeLecturer(l: Lecturer): void {
    let i = this._lecturers.indexOf(l);
    if (i > -1) this._lecturers.splice(i, 1);
  }
}

class Area {
  // implement getters for fields and 'add/remove level' methods
  _levels: Level[] = [];
  _name: string;

  get name(): string {
    return this._name;
  }

  get levels(): Level[] {
    return this._levels;
  }

  addLevel(l: Level): void {
    this._levels.push(l);
  }

  removeLevel(l: Level): void {
    let i = this._levels.indexOf(l);
    if (i > -1) this._levels.splice(i, 1);
  }

  constructor(name: string) {
    this._name = name;
  }
}

class Level {
  // implement getters for fields and 'add/remove group' methods

  _groups: Group[] = [];
  _name: string;
  _description: string;

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get groups(): Group[] {
    return this._groups;
  }

  addGroup(g: Group): void {
    this._groups.push(g);
  }

  removeGroup(g: Group): void {
    let i = this._groups.indexOf(g);
    if (i > -1) this._groups.splice(i, 1);
  }

  constructor(name: string, desc: string) {
    this._name = name;
    this._description = desc;
  }
}

class Group {
  // implement getters for fields and 'add/remove student' and 'set status' methods

  _area: Area;
  _school: School;
  _status: string | boolean = "";
  directionName: string;
  levelName: string;

  get area(): Area {
    return this._area;
  }

  _students: Student[] = []; // Modify the array so that it has a valid toSorted method*
  //It works correctly and valid, i checked

  get students(): Student[] {
    return this._students;
  }

  addStudent(s: Student): void {
    this._students.push(s);
  }

  removeStudent(s: Student): void {
    let i = this._students.indexOf(s);
    if (i > -1) this._students.splice(i, 1);
  }

  constructor(directionName: string, levelName: string) {
    this.directionName = directionName; // Is it for description of Level or for an Area? Not clear enough(
    this.levelName = levelName;

    this._area = new Area(directionName);
    this._area.addLevel(new Level(levelName, ""));

    this._school = new School();
    this._school.addArea(this._area);
  }

  setStatus(s: typeof this._status): void {
    this._status = s;
  }

  showPerformance(): Student[] {
    const sortedStudents = this._students.toSorted(
      (a: Student, b: Student): number =>
        b.getPerformanceRating() - a.getPerformanceRating()
    );
    return sortedStudents;
  }
}

type Grade = { [key: string]: number };
type Visit = { [key: string]: boolean };

class Student {
  // implement 'set grade' and 'set visit' methods

  _firstName: string | undefined;
  _lastName: string | undefined;
  _birthYear: number;

  _grades: Grade[] = []; // workName: mark
  _visits: Visit[] = []; // lesson: present

  setGrade(g: Grade): void {
    this._grades.push(g);
  }

  setVisit(v: Visit): void {
    this._visits.push(v);
  }

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(" ");
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  getPerformanceRating(): number {
    const gradeValues: Grade[] = Object.values(this._grades);

    if (!gradeValues.length) return 0;

    const averageGrade: number =
      gradeValues.reduce(
        (sum, grade: Grade) => sum + Object.values(grade)[0]!,
        0
      ) / gradeValues.length;
    const attendancePercentage: number =
      (this._visits.filter((present) => present).length / this._visits.length) *
      100;

    return (averageGrade + attendancePercentage) / 2;
  }
}
