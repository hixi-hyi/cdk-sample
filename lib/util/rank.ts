import * as lodash from 'lodash'
const _ = lodash

export interface IRank {
  empire?: string;
  kingdom?: string;
  division?: string;
  section?: string;
  legion?: string;
  cohort?: string;
  family?: string;
  tribe?: string;
  genus?: string;
  series?: string;
  species?: string;
}

export enum RankLoc {
  Empire = 0,
  Kingdom,
  Division,
  Section,
  Legion,
  Cohort,
  Family,
  Tribe,
  Genus,
  Series,
  Species,
}

export class Rank implements IRank {
  public empire: string = '';
  public kingdom: string = '';
  public division: string = '';
  public section: string = '';
  public legion: string = '';
  public cohort: string = '';
  public family: string = '';
  public tribe: string = '';
  public genus: string = '';
  public series: string = '';
  public species: string = '';

  constructor(rank?: IRank) {
    if (rank) {
      this.expands(rank);
    }
  }

  public expands(rank: IRank) {
    this.empire = rank.empire || this.empire;
    this.kingdom = rank.kingdom || this.kingdom;
    this.division = rank.division || this.division;
    this.section = rank.section || this.section;
    this.legion = rank.legion || this.legion;
    this.cohort = rank.cohort || this.cohort;
    this.family = rank.family || this.family;
    this.tribe = rank.tribe || this.tribe;
    this.genus = rank.genus || this.genus;
    this.series = rank.series || this.series;
    this.species = rank.species || this.species;
  }

  public copy(): Rank {
    return _.cloneDeep(this);
  }

  public copyWith(rank: IRank): Rank {
    const ret = this.copy();
    ret.expands(rank);
    return ret
  }

  private toArray(): string[] {
    const array : string[] = new Array();
    array.push(this.empire);
    array.push(this.kingdom);
    array.push(this.division);
    array.push(this.section);
    array.push(this.legion);
    array.push(this.cohort);
    array.push(this.family);
    array.push(this.tribe);
    array.push(this.genus);
    array.push(this.series);
    array.push(this.species);
    return array
  }

  private toArrayWithLoc(first: RankLoc = RankLoc.Empire, last?: RankLoc): string[] {
    last = last? last+1: undefined
    const array = this.toArray().slice(first, last);
    return array.filter(Boolean)
  }

  public capitalizeString(first: RankLoc = RankLoc.Empire, last?: RankLoc): string {
    const array = this.toArrayWithLoc(first, last);
    return array.reduce((acc, word) => acc + word.charAt(0).toUpperCase() + word.slice(1), '')
  }

  public slashString(first: number = 0, last?: number): string {
    const array = this.toArrayWithLoc(first, last);
    return array.join('/')
  }

  public dotString(first: number = 0, last?: number): string {
    const array = this.toArrayWithLoc(first, last);
    return array.join('.')
  }

  public isStandardFamily(): boolean {
    return this.family == "standard"
  }

  public isProduction(): boolean {
    return this.section == "production"
  }
}
