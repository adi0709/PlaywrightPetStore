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

export type MultipartType = {
  file: string;
  additionalMetadata: string;
};
