import { APIResponse } from "@playwright/test";
import { RestApi } from "../requests/RestApi";
import { CreatePetResponse, MultipartType } from "./PetApiTypes";
import fs from "fs";
export default class PetApi {
  static async createPet(
    payload: Partial<CreatePetResponse>
  ): Promise<APIResponse> {
    const response = await RestApi.post("./pet", payload);
    return response;
  }

  static async findPetByStatus(params: URLSearchParams): Promise<APIResponse> {
    const response = await RestApi.get("./pet/findByStatus", params);
    return response;
  }

  static async deletePet(petId: number): Promise<APIResponse> {
    const response = await RestApi.delete(`./pet/${petId}`);
    return response;
  }

  static async uploadPictureForPet(
    petId: number,
    filePath: string
  ): Promise<APIResponse> {
    //Reading the file
    const fileBuffer = fs.readFileSync(filePath);
    //Creating the multipart data
    const multipartData = {
      file: {
        name: `${filePath.split("/").pop()}`,
        mimeType: "image/jpeg",
        buffer: fileBuffer,
      },
    };

    const response = await RestApi.postWithFile(
      `./pet/${petId}/uploadImage`,
      multipartData,
      {}
    );
    return response;
  }
}
