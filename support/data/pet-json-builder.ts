import { CreatePetResponse } from "../api/PetApiTypes";

export default class PetJsonBuilder {
  static buildCreatePetJson = (
    petId: number,
    categoryId: number,
    categoryName: string,
    petName: string,
    photoUrl: string[],
    tagId: number,
    tagName: string
  ): Partial<CreatePetResponse> => {
    return {
      id: petId,
      category: {
        id: categoryId,
        name: categoryName,
      },
      name: petName,
      photoUrls: photoUrl,
      tags: [
        {
          id: tagId,
          name: tagName,
        },
      ],
      status: "available",
    };
  };
}
