export interface NormalizedEntity<T> {
  entities: {
    [entity: string]: {
      [id: string]: T;
    };
  };
  result: string;
}

export interface NormalizedEntities<T> {
  entities: {
    [entity: string]: {
      [id: string]: T;
    };
  };
  result: string[];
}
