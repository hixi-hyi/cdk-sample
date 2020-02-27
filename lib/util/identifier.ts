import rank = require('./rank');

export class Identifier {
  public chains: string[] = new Array();
  public rank: rank.Rank;

  constructor(r?: rank.Rank) {
    if (r) {
      this.rank = r.copy()
    }
  }

  public withExpandsRank(r: rank.IRank): Identifier {
    this.rank = this.rank.copyWith(r)
    return this
  }

  public copy(): Identifier {
    const id = new Identifier(this.rank);
    id.chains = Array.from(this.chains)
    return id
  }

  public child(name: string): Identifier;
  public child(r: rank.IRank): Identifier;
  public child(value: string | rank.IRank): Identifier {
    const id = this.copy();
    if (typeof value === 'string') {
      id.chains.push(value)
      return id
    }
    id.rank = id.rank.copyWith(value);
    return id
  }

  public logicalId(name: string): string {
    const id = this.copy();
    id.chains.push(name)
    return id.cdkId
  }

  public output(s: string): string {
    return this.cdkId + ':' + s
  }

  // ServiceStandardApi
  public get stackName(): string {
    return this.rank.capitalizeString(rank.RankLoc.Legion)
  }

  // service/standard/api
  public get slashName(): string {
    return this.rank.slashString(rank.RankLoc.Legion)
  }

  public get dotName(): string {
    return this.rank.dotString(rank.RankLoc.Legion)
  }

  // ServiceStandardApiXxxYyy
  public get cdkId(): string {
    return this.stackName + this.chains.reduce((acc, word) => acc + word.charAt(0).toUpperCase() + word.slice(1), '')
  }

  public toString(): string {
    return this.cdkId
  }
}
