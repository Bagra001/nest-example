# nest-example

Sample microservice description.

## Table of Contents

- [Features](#features)
- [Development](#development)
- [Service Dependencies](#service-dependencies)
- [Kafka](#kafka)
- [Testing](#testing)
- [API](#api)
- [Links](#links)

## Features
* A
* List
* Of
* Features

## Development

Please use at least **Node.js version 14.5.1** from the software center for running a local instance of the service.

### Environment variables
We use [dotenv](https://www.npmjs.com/package/dotenv) to load environment variables. The `npm run start:dev` script starts using
the `localhost` environment, so just remove .tmpl from the ".localhost.env.tmpl".

### Installation (local bootstrap)

Prepare project (download certifactes for example)
`npm run cert`

You can then install all necessary NPM dependencies using
`npm i`

### Run locally
`npm run dev`

## Service Dependencies

| Service Name |   Reasons    |   Communication Types |
|--------------|--------------|:---------------------:|
| Foobar       | this and that| ~~Kafka~~, ~~REST~~   |

## Kafka

### Consumer
| Event Name | Consumed when? | Processed how?     |
|------------|----------------|--------------------|
| some-event | If this happens| Then we update that|

### Producer
| Event Name | Produced when? |
|------------|----------------|
| some-event | X changed      |
## MongoDB
This service uses a [MongoDB](https://www.mongodb.com/de) and interfaces with the database cluster using
the [mongodb package](https://www.npmjs.com/package/mongodb).

### Collections
| Collection Name | Related Collections     | Description |
|-----------------|-------------------------|-------------|
| col_a           | col_b, col_c            | ...         |
| col_b           | col_a                   | ...         |
| col_c           | col_a                   | ...         |

## Testing
### Run Locally
#### Unit
We use [jest](https://www.npmjs.com/package/jest) for unit testing

`npm run test:unit`
#### Acceptance
We use [Cucumber.js](https://www.npmjs.com/package/@cucumber/cucumber) for acceptance testing

`npm run test:acceptance`
#### Migration
We use [migrate-mongo](https://www.npmjs.com/package/migrate-mongo) for migrations and run the migration scripts
in dev on a local [in-memory MongoDB](https://www.npmjs.com/package/mongodb-memory-server)

`npm run test:migration`

## API (_nice to have_)
* link-to-dev-swagger
* link-to-test-swagger
* link-to-lt-swagger
* link-to-prod-swagger

## Links
* Confluence
* Jenkins
* Deployment repository
* [Service Manager - conversion](https://app-service-manager-prod.prod.interhyp-cloud.de/manage?namespace=conversion&drawer=open)
* ArgoCD dev/test/lt/prod
* Grafana Dashboards
* APM
* SonarQube