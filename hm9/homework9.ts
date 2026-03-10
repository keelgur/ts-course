enum GridFilterTypeEnum {
  ValidFilter = "valid",
  RangeFilter = "range",
  ValuesFilter = "values",
}

interface Film {
  name: string;
  year: number;
  rate: number;
  oscar: string;
}

class FilmList<T> {
  filtersState!: GridFilterValue<T>[];
  list!: Array<Film>;

  nameSearch(ind: number) {
    let filter = this.filtersState.at(ind);
    if (filter?.type === "valid")
      return this.list.filter((val) => val.name === filter?.filter);
    else if (filter?.values !== undefined && filter?.type === "values")
      return this.list.filter((val) => {
        let matches = 0;
        for (let i in filter?.values?.values) {
          if (val.name === i) matches += 1;
        }
        matches >= 1;
      });
  }

  yearSearch(ind: number) {
    let filter = this.filtersState.at(ind);
    if (filter?.type === "range" && filter?.filterTo !== undefined)
      return this.list.filter(
        (val) =>
          val.year >= (filter?.filter as number) &&
          val.year <= (filter?.filterTo as number)
      );
  }

  rateSearch(ind: number) {
    let filter = this.filtersState.at(ind);
    if (filter?.type === "range" && filter?.filterTo !== undefined)
      return this.list.filter(
        (val) =>
          val.rate >= (filter?.filter as number) &&
          val.rate <= (filter?.filterTo as number)
      );
  }

  oscarSearch(ind: number) {
    let filter = this.filtersState.at(ind);
    if (filter?.type === "valid")
      return this.list.filter((val) => val.oscar === filter?.filter);
    else if (!!this.filtersState["values"] && filter?.type === "values")
      return this.list.filter((val) => {
        let matches = 0;
        for (let i in filter?.values?.values) {
          if (val.oscar === i) matches += 1;
        }
        matches >= 1;
      });
  }

  applySearchValue<V extends T>(v: GridFilterValue<V>): void {
    this.filtersState.push(v);
  }

  applyFiltersValue<V extends T>(v: GridFilterValue<V>[]): void {
    this.filtersState = v;
  }
}

interface Category {
  name: string;
  films: Film[];
}

class CategoryList<T> {
  filtersState!: GridFilterValue<T>[];
  list!: Array<Category>;

  nameSearch(ind: number) {
    let filter = this.filtersState.at(ind);
    if (filter?.type === "valid")
      return this.list.filter((val) => val.name === filter?.filter);
    else if (filter?.values !== undefined && filter?.type === "values")
      return this.list.filter((val) => {
        let matches = 0;
        for (let i in filter?.values?.values) {
          if (val.name === i) matches += 1;
        }
        matches >= 1;
      });
  }

  applySearchValue<V extends T>(v: GridFilterValue<V>): void {
    this.filtersState.push(v);
  }

  applyFiltersValue<V extends T>(v: GridFilterValue<V>[]): void {
    this.filtersState = v;
  }
}

type GridFilterValue<T> = {
  type: T extends string
    ? typeof GridFilterTypeEnum.ValidFilter
    : T extends number[]
      ? typeof GridFilterTypeEnum.RangeFilter
      : typeof GridFilterTypeEnum.ValuesFilter;
  filter: Extract<T, string | number>;
  filterTo?: Extract<T, number>;
  values?: T extends [infer U] ? GridFilterSetValues<U> : never;
};

type GridFilterSetValues<T> = {
  values: T[];
};
