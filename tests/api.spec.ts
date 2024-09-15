import { test, expect } from "@playwright/test";
import { DATA } from "../constants/constant";
import { CreatePetResponse } from "./Api/types";
import PetApi from "./Api/pet.api";

test.describe.parallel("API testing", () => {
  const searchParams = new URLSearchParams();
  searchParams.set("status", "available");
  searchParams.append("status", "pending");

  test("Get all the pets having the status PENDING or AVAILABLE in the Pet Store", async ({
    request,
  }) => {
    //Sending the get request and storing the response to response constant
    const response = await PetApi.findPetByStatus(request, searchParams);

    //Asserting the response status to be 200
    expect(response.status()).toBe(200);
    const responseBody = await response.json();

    console.log(responseBody.length);
    //iterating over the response body
    responseBody.forEach((element) => {
      //validating if the status of the response is either "PENDING" OR "AVAILABLE"
      expect(element.status).toMatch(/(\bpending\b|\bavailable\b)/gi);
    });
  });

  test("Add a new pet to the Pet Store", async ({ request }) => {
    //sending the response and saving it to response constant
    const response = await PetApi.createPet(request, DATA.postRequestData);

    //Asserting the response status to be 200
    expect(response.status()).toBe(200);
    const responseBody: CreatePetResponse = await response.json();

    //Storing the petId created to env variabel incase it needs to be used later on
    process.env.petId = String(responseBody.id);

    //Adding assertions to the response body
    expect(responseBody.id).toBeTruthy;
    expect(responseBody.category).toStrictEqual(DATA.postRequestData.category);
    expect(responseBody.name).toBe(DATA.postRequestData.name);
    expect(responseBody.photoUrls).toStrictEqual(
      DATA.postRequestData.photoUrls
    );
    expect(responseBody.tags).toStrictEqual(DATA.postRequestData.tags);
    expect(responseBody.status).toBe(DATA.postRequestData.status);
  });
});
