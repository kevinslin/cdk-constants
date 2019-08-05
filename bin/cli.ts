#!/usr/bin/env node

import yargs from 'yargs'
import fs from 'fs-extra'
import _ from 'lodash'

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

function fetchConstants({target}: {
  target: string
}) {
  if (target === 'managed_policies') {
    let cmd = `python data/all_aws_managed_policies/show_all_aws_managed_policies.py > data/all_aws_managed_policies/all_aws_managed_policies.json`
    execa.command(cmd)
  }
}

function updateConstants({target}: {
  target: string
}) {
  if (target === 'managed_policies') {
    let data = fs.readJsonSync('./data/all_aws_managed_policies/all_aws_managed_policies.json')
    let results: any = {}
    let blacklist = ['S_3', 'EC_2', 'IO_T']
    _.keys(data).forEach( (key: string) => {
      let modKey = _.snakeCase(key).toUpperCase()
      blacklist.forEach( ent => {
        if (modKey.indexOf(ent) >= 0) {
          modKey = modKey.replace(ent, ent.replace('_', ''))
        }
      })
      results[modKey] = key
    })
    let payload = enumFromJson({jsonObj: results, key: 'MANAGED_POLICIES'})
    fs.writeFileSync('./src/policies.ts', payload)
  }
}

  yargs
  .option('stage', {
    alias: 's'
  })
  .command(['fetch'], 'fetch constants data', {
    source: {
      description: "fetch data",
      choices: SOURCES,
    }
  }, (argv: any) => {
    console.log({argv});
    //require('../src/commands/hello').execute(argv)
  })
  .command(['update'], 'update constants', {
    targets: {
      description: "update constants",
      choices: SOURCES,
      array: true,
    }
  }, (argv: any) => {
    let {targets} = argv
    targets.forEach( (target: string) => {
      updateConstants({target})
    })
  })
  .demandCommand()
  .help()
  .wrap(72)
  .argv
