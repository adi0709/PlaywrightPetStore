export type CreatePetResponse = {
  id: number;
  name: string;
  category: CategoryType;
  photoUrls: string[];
  tags: CategoryType[];
  status: string;
};

export type CategoryType = {
  id: number;
  name: string;
};
