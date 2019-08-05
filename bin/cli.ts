#!/usr/bin/env node

import yargs from 'yargs'
import fs from 'fs-extra'
import _ from 'lodash'
import execa from 'execa'
import pino from 'pino'

const L = pino()
const SOURCES = ['managed_policies']

function enumFromJson({jsonObj, key}: {
  jsonObj: any,
  key: string
}) {
  let out = `export enum ${key} {\n`
  _.each(jsonObj, (v, k) => {
    out += `    ${k} = "${v}",\n`
  })
  out += '}'
  return out
}

async function fetchConstants({target}: {
  target: string
}) {
  L.info({ctx: 'fetchConstants/enter', target});
  if (target === 'managed_policies') {
    let cmd = `python data/all_aws_managed_policies/show_all_aws_managed_policies.py > data/all_aws_managed_policies/all_aws_managed_policies.json`
    let out = await execa.command(cmd)
    L.info({ctx: "fetchConstants/exit"})
  }
}

async function updateConstants({target}: {
  target: string
}) {
  if (target === 'managed_policies') {
    let data = fs.readJsonSync('./data/all_aws_managed_policies/all_aws_managed_policies.json')
    let results: any = {}
    let blacklist = ['S_3', 'EC_2', 'IO_T']
    L.info({ctx: "updateConstants/startConverting"})
    _.keys(data).forEach( (key: string) => {
      let modKey = _.snakeCase(key).toUpperCase()
      blacklist.forEach( ent => {
        if (modKey.indexOf(ent) >= 0) {
          modKey = modKey.replace(ent, ent.replace('_', ''))
        }
      })
      let {Arn} = data[key]
      /**
       * ARN will look like the following:
       *    arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
       * we want to find `aws:policy` and take the name of everything after
       */

      let idx = Arn.indexOf("aws:policy") + 11
      results[modKey] = Arn.slice(idx)
    })
    L.info({ctx: "updateConstants/stopConverting"})
    let payload = enumFromJson({jsonObj: results, key: 'MANAGED_POLICIES'})
    fs.writeFileSync('./src/policies.ts', payload)
    L.info({ctx: "updateConstants/exit"})
  }
}

  yargs
  .option('stage', {
    alias: 's'
  })
  .command(['fetch'], 'fetch constants data', {
    targets: {
      description: "constants",
      choices: SOURCES,
      array: true,
    }
  }, (argv: any) => {
    L.info({argv});
    let {targets} = argv
    _.reduce(targets, async (prior: any, target: string) => {
      await prior
      return fetchConstants({target})
    }, Promise.resolve())
  })
  .command(['update'], 'update constants', {
    targets: {
      description: "constants",
      choices: SOURCES,
      array: true,
    }
  }, async (argv: any) => {
    let {targets} = argv
    const resp = _.map(targets, (target: string) => {
      return updateConstants({target})
    })
    await Promise.all(resp)
    L.info({ctx: "update/exit"})
  })
  .demandCommand()
  .help()
  .wrap(72)
  .argv
