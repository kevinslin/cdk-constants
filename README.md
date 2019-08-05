# CDK Constants

This repository contains constants that make it easier to work with the [aws-cdk](https://github.com/aws/aws-cdk)

## Why?

Add type checking to areas where CDK currently expects a string. Also serves as useful documentation if you just want a list of AWS constants.

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

## Credits

`cdk-constants` wouldn't be possible without modules from the following authors

- [Jared Short](https://gist.github.com/shortjared): initial [gist](https://gist.github.com/shortjared/4c1e3fe52bdfa47522cfe5b41e5d6f22) of all service principles
- [Gene Wood](https://gist.github.com/gene1wood): [gist](https://gist.github.com/gene1wood/55b358748be3c314f956) to pull all aws managed policies
- [Rachel Evans](https://github.com/rvedotrc): [code](https://github.com/rvedotrc/aws-iam-reference) to pull aws iam permissions, copyright Rachel Evans, licensed under the [Apache 2.0 license](https://www.apache.org/licenses/LICENSE-2.0)

## Contributions

All contributors are welcome. As you are reading this, AWS has probably released a new services.  Please see [CONTRIBUTING](CONTRIBUTING.md) for information on how to setup a development environment and submit code.

## License

cdk-constants is distributed under the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).

See [LICENSE](./LICENSE) and [NOTICE](./NOTICE) for more information.
