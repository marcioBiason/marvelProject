export class Hero {
  id?: number;
  name?: string;
  image?: string;
  description?: string;
  thumbnail?: {
    path?: string,
    extension?: string
  }
  stories?: {
    items?: [{
      name?: string;
    }];
  }
  events?: {
    items?: [{
      name?: string;
    }];
  }
}

export interface DataHero {
  count: number;
  pages: number;
  data: Hero[];
  offset: number;
  total?: number;
}

export interface ParamsHero {
  id?: number;
  offset?: number;
}
