import { test, expect } from "@playwright/test";
import { CreatePetResponse } from "../support/api/PetApiTypes";
import PetApi from "../support/api/PetApi";
import PetJsonBuilder from "../support/data/pet-json-builder";
import { faker } from "@faker-js/faker";

let petId;
let categoryId;
let categoryName;
let petName;
let photoUrl;
let tagId;
let tagName;

test.beforeEach(async () => {
  //creating new data for the test
  petId = faker.number.int();
  categoryId = faker.number.int();
  categoryName = faker.animal.type();
  petName = faker.person.firstName();
  photoUrl = [faker.image.url()];
  tagId = faker.number.int();
  tagName = faker.animal.dog();

  const createPetJson = PetJsonBuilder.buildCreatePetJson(
    petId,
    categoryId,
    categoryName,
    petName,
    photoUrl,
    tagId,
    tagName
  );

  //sending the request and saving it to response constant
  const response = await PetApi.createPet(createPetJson);
});

test.describe.parallel("API testing", () => {
  test("Get all the pets having the status PENDING or AVAILABLE in the Pet Store", async () => {
    const searchParams = new URLSearchParams();
    searchParams.set("status", "available");
    searchParams.append("status", "pending");

    //Sending the get request and storing the response to response constant
    const response = await PetApi.findPetByStatus(searchParams);

    //Asserting the response status to be 200
    await expect(response.status()).toBe(200);

    const responseBody: CreatePetResponse[] = await response.json();
    //iterating over the response body
    await responseBody.forEach((element) => {
      //validating if the status of the response is either "PENDING" OR "AVAILABLE"
      expect(
        element.status,
        "Expecting the status of each pet retrieved to be either PENDING or AVAILABLE"
      ).toMatch(/(\bpending\b|\bavailable\b)/gi);
    });
  });

  test("Delete a created Pet", async ({ request }) => {
    //sending the request and saving it to response constant
    const response = await PetApi.deletePet(petId);

    //Asserting the response status to be 200
    expect(
      response.status(),
      "Expecting the status of the rquest to be 200"
    ).toBe(200);
    const responseBody: CreatePetResponse = await response.json();
  });

  test("Delete a Pet that doesn't exist", async () => {
    //sending the request to delete the pet created in BeforeEach block
    const response = await PetApi.deletePet(petId);

    //Asserting the pet was deleted
    expect(
      response.status(),
      "Expecting the status of the rquest to be 200"
    ).toBe(200);

    //sending the request to delete the already deleted pet in the previous request
    const newResponse = await PetApi.deletePet(petId);

    //Asserting the response status to be 200
    expect(
      newResponse.status(),
      "Expecting the status of the rquest to be 200"
    ).toBe(404);
  });

  test("Upload Image of an already existing pet", async () => {
    //Sending the request to upload photo
    const response = await PetApi.uploadPictureForPet(
      petId,
      "resources/dog.png"
    );

    expect(
      response.status(),
      "Expecting the status of the rquest to be 200"
    ).toBe(200);

    const responseBody: CreatePetResponse = await response.json();
    expect(responseBody).toHaveProperty("type");
    expect(responseBody).toHaveProperty("message");
  });
});
