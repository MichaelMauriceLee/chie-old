export enum FieldTypes {
  front = 'Front',
  back = 'Back'
}

export interface Media {
  url: string;
  filename: string;
  skiphash?: string;
  fields: FieldTypes[]
}

export interface Note {
  deckName: string;
  modelName: string;
  fields: {
    Front: string;
    Back: string;
  },
  options?: {
    allowDuplicate: boolean;
    duplicateScope: string;
    duplicateScopeOptions: {
      deckName: string;
      checkChildren?: boolean;
    }
  },
  tags?: string[],
  audio?: Media[],
  video?: Media[],
  picture?: Media[]
}
