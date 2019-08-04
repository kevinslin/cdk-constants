# CDK Constants

This repository contains constants that make it easier to work with the [aws-cdk](https://github.com/aws/aws-cdk)

## Quickstart

Install or update from npm
```
# install
npm i cdk-constants

# upgrade
npm i -g cdk-constants@latest
```

## Usage

```typescript
import {SERVICE_PRINCIPLE, MANAGED_POLICIES} from 'cdk-constants'

const lambdaRole = new Role(this, "lambdaDomainChecker", {
    assumedBy: new ServicePrincipal(SERVICE_PRINCIPLE.LAMBDA),
    managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(MANAGED_POLICIES.AWS_LAMBDA_BASIC_EXECUTION_ROLE)
    ],
})

```

## Properties

### [SERVICE_PRINCIPLE](./src/principles.ts)
- contains list of all services principles

### [MANAGED_POLICIES](./src/policies.ts)
- contains enum of all managed aws policies
