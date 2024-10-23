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

test.describe("API testing to create a new Pet", () => {
  test("Add a new pet to the Pet Store", async () => {
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

    //Asserting the response status to be 200
    expect(response.status()).toBe(200);

    //Converting the response to json
    const responseBody: CreatePetResponse = await response.json();

    //Adding assertions to the response body
    expect(
      responseBody,
      "Expect the Respose object of the created pet to have the same values as provided in the request"
    ).toStrictEqual(createPetJson);
  });
});
