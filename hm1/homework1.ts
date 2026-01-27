class School {
  directions: Direction[] = [];

  addDirection(direction: Direction) {
    this.directions.push(direction);
  }
}

class Direction {
  levels: Level[] = [];

  _name: string;

  get name() {
    return this._name;
  }

  constructor(name: string) {
    this._name = name;
  }

  addLevel(level: Level) {
    this.levels.push(level);
  }
}

class Level {
  groups: Group[] = [];

  _name: string;
  _program: string;

  constructor(name: string, program: string) {
    this._name = name;
    this._program = program;
  }

  get name() {
    return this._name;
  }

  get program() {
    return this._program;
  }

  addGroup(group: Group) {
    this.groups.push(group);
  }
}

class Group {
  _students: Student[] = [];
  directionName: string;
  levelName: string;

  get students() {
    return this._students;
  }

  constructor(directionName: string, levelName: string) {
    this.directionName = directionName;
    this.levelName = levelName;
  }

  addStudent(student: Student) {
    this._students.push(student);
  }

  showPerformance() {
    const sortedStudents = this._students.toSorted(
      (a, b) => b.getPerformanceRating() - a.getPerformanceRating()
    );

    return sortedStudents;
  }
}

class Student {
  grades: any = {};
  attendance: boolean[] = [];
  firstName: string | undefined;
  lastName: string | undefined;
  birthYear: number;

  constructor(firstName: string, lastName: string, birthYear: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
  }

  get fullName() {
    return `${this.lastName} ${this.firstName}`;
  }

  set fullName(value: string) {
    [this.lastName, this.firstName] = value.split(" ");
  }

  get age() {
    return new Date().getFullYear() - this.birthYear;
  }

  setGrade(subject: string, grade: number) {
    this.grades[subject] = grade;
  }

  markAttendance(present: boolean) {
    this.attendance.push(present);
  }

  getPerformanceRating() {
    const gradeValues: number[] = Object.values(this.grades);

    if (gradeValues.length === 0) return 0;

    const averageGrade: number =
      gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;

    const attendancePercentage: number =
      (this.attendance.filter((present) => present).length /
        this.attendance.length) *
      100;

    return (averageGrade + attendancePercentage) / 2;
  }
}
