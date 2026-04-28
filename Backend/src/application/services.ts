export interface IHashService {
  hash(data: string): Promise<string>;
  compare(data: string, encrypted: string): Promise<boolean>;
}

export interface ITokenService {
  generate(payload: any): string;
  verify(token: string): any;
}
