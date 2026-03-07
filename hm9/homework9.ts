enum GridFilterTypeEnum {
  NameFilter = "name",
  RangeFilter = "range",
  ValuesFilter = "values",
}

interface Film {
  name: string;
  year: number;
  rate: number;
  oscar?: string;
}

class FilmList {
  readonly filtersState!: GridFilterSetValues<GridFilterValue<string | number>>;
  list!: Array<Film>;

  valueSearch<T>(): Array<Film> {
    //TODO
    return this.list;
  }
  rangeSearch(): Array<Film> {
    //TODO
    return this.list;
  }

  applySearchValue(v: GridFilterValue<string | number>): void {
    this.filtersState.values.push(v);
  }

  applyFiltersValue(v: GridFilterValue<string | number>[]): void {
    v.forEach((val) => {
      this.filtersState.values.push(val);
    });
  }
}

interface Category {
  name: string;
  films: Film[];
}

class CategoryList {
  readonly filtersState!: GridFilterSetValues<GridFilterValue<string | number>>;
  list!: Array<Category>;

  applySearchValue(v: GridFilterValue<string | number>): void {
    this.filtersState.values.push(v);
  }

  applyFiltersValue(v: GridFilterValue<string | number>[]): void {
    v.forEach((val) => {
      this.filtersState.values.push(val);
    });
  }

  nameSearch(): Array<Category> {
    //TODO
    return this.list;
  }
  rangeSearch(): Array<Category> {
    //TODO
    return this.list;
  }
}

type GridFilterValue<T> = {
  type: GridFilterTypeEnum;
  filter: Extract<T, string | number>;
  filterTo?: Extract<T, string | number>;
};

type GridFilterSetValues<T> = {
  values: T[];
};
