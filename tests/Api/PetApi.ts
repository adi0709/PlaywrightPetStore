import { RestApi } from "../../requests/RestApi";
import { CreatePetResponse } from "./PetApiTypes";
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
}