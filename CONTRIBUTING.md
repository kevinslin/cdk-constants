# Contributing to CDK Constants

First of all, a great big thanks for wanting to contribute.

This document goes over the process of setting up your environment and submitting contributions.

## Getting Started

Download repo and make sure you can install dependencies.

```
git clone git@github.com:kevinslin/cdk-constants.git
cd cdk-constants
yarn

# or if you use npm
npm install


# build dependencies
yarn build

```

## Updating an existing repository

cdk-constants is split between modules where properties are generated vs properties that are manually added. Properties that are automatically generated have the following header
```typescript
// NOTE: THIS IS MACHINE GENERATED. CHANGES WILL BE OVERWRITTEN!
```

Machine genrated files:
- policies.ts

Not Machine generated:
- principals.ts

### Machine Generated files
- for generated files, you can use `npm run fetch {source}` and `npm run update {source}` to refresh the documentation
- to see available sources, run `node lib/bin/cli.js fetch help`
- note that running the scripts might require additional dependencies to be installed in different languages (eg. `npm run update managed_policies` requires python and boto3
    - if you want to convert this to nodejs, contributions would be most welcome :)

### Not Machine Generated
- changes here can be manually added
