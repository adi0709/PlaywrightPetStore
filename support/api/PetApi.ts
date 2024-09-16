import { RestApi } from "../requests/RestApi";
import { CreatePetResponse, MultipartType } from "./PetApiTypes";
export default class PetApi {
  static createPet(
    request: any,
    payload: Partial<CreatePetResponse>
  ): Promise<any> {
    return RestApi.post(request, "./pet", payload);
  }

  static findPetByStatus(request: any, params: URLSearchParams): Promise<any> {
    return RestApi.get(request, "./pet/findByStatus", params);
  }

  static deletePet(request: any, petId: number): Promise<any> {
    return RestApi.delete(request, `./pet/${petId}`);
  }

  static uploadPictureForPet(
    request: any,
    petId: number,
    multipart: MultipartType
  ): Promise<any> {
    return RestApi.postWithFile(
      request,
      `./pet/${petId}/uploadImage`,
      multipart
    );
  }
}
