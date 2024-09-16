import { test, expect } from "@playwright/test";
import { CreatePetResponse } from "../support/api/PetApiTypes";
import PetApi from "../support/api/PetApi";
import PetJsonBuilder from "../support/data/pet-json-builder";
import { Faker, faker } from "@faker-js/faker";

let petId;
let categoryId;
let categoryName;
let petName;
let photoUrl;
let tagId;
let tagName;

test.beforeAll(async ({ request }) => {
  //Creating all the varaibles so that we have new value for each pet
  petId = faker.number.int();
  categoryId = faker.number.int();
  categoryName = faker.animal.type();
  petName = faker.person.firstName();
  photoUrl = [faker.image.url()];
  tagId = faker.number.int();
  tagName = faker.animal.dog();

  //Creating a pet before each request to make sure we have atleast one pet in the store
  const response = await PetApi.createPet(
    request,
    PetJsonBuilder.buildCreatePetJson(
      petId,
      categoryId,
      categoryName,
      petName,
      photoUrl,
      tagId,
      tagName
    )
  );
  //Asserting the response status to be 200
  expect(
    response.status(),
    "Expecting the status of the rquest to be 200"
  ).toBe(200);
  const responseBody: CreatePetResponse = await response.json();
});

test.describe.parallel("API testing", () => {
  test("Get all the pets having the status PENDING or AVAILABLE in the Pet Store", async ({
    request,
  }) => {
    const searchParams = new URLSearchParams();
    searchParams.set("status", "available");
    searchParams.append("status", "pending");
    //Sending the get request and storing the response to response constant
    const response = await PetApi.findPetByStatus(request, searchParams);

    //Asserting the response status to be 200
    expect(
      response.status(),
      "Expecting the status of the rquest to be 200"
    ).toBe(200);
    const responseBody = await response.json();

    console.log(responseBody.length);
    //iterating over the response body
    responseBody.forEach((element) => {
      //validating if the status of the response is either "PENDING" OR "AVAILABLE"
      expect(
        element.status,
        "Expecting the status of each pet retrieved to be either PENDING or AVAILABLE"
      ).toMatch(/(\bpending\b|\bavailable\b)/gi);
    });
  });

  test("Add a new pet to the Pet Store", async ({ request }) => {
    //creating new data for the test
    petId = faker.number.int();
    categoryId = faker.number.int();
    categoryName = faker.animal.type();
    petName = faker.person.firstName();
    photoUrl = [faker.image.url()];
    tagId = faker.number.int();
    tagName = faker.animal.dog();

    //sending the request and saving it to response constant
    const response = await PetApi.createPet(
      request,
      PetJsonBuilder.buildCreatePetJson(
        petId,
        categoryId,
        categoryName,
        petName,
        photoUrl,
        tagId,
        tagName
      )
    );

    //Asserting the response status to be 200
    expect(
      response.status(),
      "Expecting the status of the rquest to be 200"
    ).toBe(200);

    const responseBody: CreatePetResponse = await response.json();

    //Adding assertions to the response body
    expect(
      responseBody,
      "Expect the Respose object of the created pet to have the same values as provided in the request"
    ).toStrictEqual(
      PetJsonBuilder.buildCreatePetJson(
        petId,
        categoryId,
        categoryName,
        petName,
        photoUrl,
        tagId,
        tagName
      )
    );
  });

  test("Delete a created Pet", async ({ request }) => {
    //sending the request and saving it to response constant
    const response = await PetApi.deletePet(request, petId);

    //Asserting the response status to be 200
    expect(
      response.status(),
      "Expecting the status of the rquest to be 200"
    ).toBe(200);
    const responseBody: CreatePetResponse = await response.json();
  });

  test("Delete a Pet that doesn't exist", async ({ request }) => {
    //sending the request and saving it to response constant
    const response = await PetApi.deletePet(request, 123121);

    //Asserting the response status to be 200
    expect(
      response.status(),
      "Expecting the status of the rquest to be 200"
    ).toBe(404);
  });

  test("Upload Image of an already existing pet", async ({ request }) => {
    const response = await PetApi.uploadPictureForPet(request, petId, {
      file: "lib/dog.png",
      additionalMetadata: "dog-picture",
    });

    expect(
      response.status(),
      "Expecting the status of the rquest to be 200"
    ).toBe(200);

    const responseBody: CreatePetResponse = await response.json();
    expect(responseBody).toHaveProperty("type");
    expect(responseBody).toHaveProperty("message");
  });
});
