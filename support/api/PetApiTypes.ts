import exp from "constants";

export type CreatePetResponse = {
  id: number;
  name: string;
  category: CategoryType;
  photoUrls: string[];
  tags: TagType[];
  status: string;
};

export type CategoryType = {
  id: number;
  name: string;
};

export type TagType = {
  id: number;
  name: string;
};

export type UploadPetImageBodyType = {
  additionalMetadata: string;
  //file: File;
};

export type DeletePetResponse = {
  code: number;
  type: string;
  message: string;
};

export type UploadPetImageResponse = {
  code: number;
  type: string;
  message: string;
};

export type MultipartType = {
  file: MutlipartTypeFile;
};

export type MutlipartTypeFile = {
  name: string;
  mimeType: string;
  buffer: Buffer;
};
