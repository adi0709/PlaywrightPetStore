# **PlaywrightPetStore**

This repo contains automation tests for the Pet Store API using Playwright

## **#Requirments**

- Node js -> v.16 or above
- Running Allure reports on the server requires the installation of Java version 8+.
- VS Code

## **#Setting Up**

- Download the repo to your local system.

```
git clone https://github.com/adi0709/PlaywrightPetStore.git
```

- Make sure to update all the dependencies `npm install`

- Install Java from https://www.java.com/en/download/help/download_options.html

- Add Java to environment paths https://www.java.com/en/download/help/path.html

- Verify java was installed

```java
java -version
```

## **#Executing tests and Viewing reports**

- Execute the tests by running the following commands

```javascript
npm run test
```

- To execute the tests and display the allure report automatically of the execution. (Requires Java as mentioned above)

```javascript
npm run test:allure-report
```
