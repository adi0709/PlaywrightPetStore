# Playwright Testing with Allure Reports

This project contains automated tests using Playwright, integrated with Allure for test reporting. The tests are executed within a Docker container, and Allure reports are generated after each test run, which can be viewed in a browser.

## Project Structure

- **Dockerfile**: Docker configuration for running the tests and generating reports.
- **package.json**: Node.js package dependencies and scripts to run the tests and generate reports.
- **tests/**: Directory containing Playwright test files.
- **allure-results/**: Directory where Allure results are stored after the tests.
- **allure-report/**: Directory where Allure generates the final report.

## Prerequisites

Ensure you have the following installed on your local machine:

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/) (only if you want to run tests locally, without Docker)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/adi0709/PlaywrightPetStore.git
cd <repository-directory>
```

### 2. Build the Docker Image

To build the Docker image using the provided `Dockerfile`, run the following command:

```bash
docker build -t playwright-allure-tests .
```

This command creates a Docker image named `playwright-allure-tests`, which will be used to run the tests.

### 3. Run the Tests in Docker

After building the Docker image, you can run the tests by executing:

```bash
docker run --rm -p 5252:5252 -v $(pwd)/allure-report:/app/allure-report playwright-allure-tests
```

This command does the following:

- Executes the tests inside the Docker container.
- Generates an Allure report after test execution.
- Maps the local port 5252 to the port 5252 in the container, allowing you to view the Allure report in your browser.
- Mounts the allure-report directory on your local machine to the /app/allure-report directory in the container, enabling you to access the generated reports from the host.

### 4. View the Allure Report

Once the tests have completed, the Allure report server will be started inside the Docker container. You can access the report by visiting:

```bash
http://localhost:5252
```

### 5. Stopping the Server

To stop the Docker container, press `CTRL+C` in your terminal.

- Make sure to update all the dependencies

## Running Tests Locally

If you want to run the tests on your local machine (without Docker):

1. Install dependencies:

```bash
npm install
```

2. Install Java from https://www.java.com/en/download/help/download_options.html
3. Add Java to environment paths https://www.java.com/en/download/help/path.html
4. Verify java was installed

```bash
java -version
```

5. Run the tests and generate Allure reports:

```bash
npm run test:allure
```

6. The report will automatically open in your default browser.

## NPM Scripts

- `npm run test:allure`: Runs Playwright tests, generates Allure results, and opens the Allure report in a browser.
- `npm run test:html-report`: Runs Playwright tests, generates default playwright results. To view the results open playwright-report folder and access `index.html` file.

## Troubleshooting

### 1. Allure Reports are Empty

- Ensure that the allure-results directory inside the container is not empty after test execution.
- Verify that the Playwright configuration (playwright.config.ts) is properly set up to generate Allure results. It should include the following reporter:

```
reporter: [['allure-playwright']],
```

### 2. Can't Access Allure Report at localhost:5252

- Ensure you are correctly mapping the port using `-p 5252:5252` in the `docker run` command.
- Check the `package.json` script to make sure Allure is being served on the correct port (`5252`).
- Make sure no other service is already running on port (`5252`)

#### On Linux / macOS:

You can use the following command to check if the port is occupied:

```bash
lsof -i :5252
```

If any process is using port 5252, stop it:

```bash
kill -9 <PID>
```

#### On Windows:

Run the following in Command Prompt:

```bash
netstat -ano | findstr :5252
```

Then, use Task Manager or taskkill to kill the process using the port:

```bash
taskkill /PID <PID> /F
```

#### Try a Different Port:

If the port is already in use and you cannot stop the process using it, try changing to a different port (e.g., 5253):

```bash
npx playwright test --reporter=allure-playwright && npx allure generate ./allure-results --clean -o ./allure-report && npx allure open --port 5253 ./allure-report
```

### Resources

- [Playwright Documentation](https://playwright.dev/)
- [Allure Report Documentation](https://allurereport.org/docs/playwright/)
- [Docker Documentation](https://docs.docker.com/)
