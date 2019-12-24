import * as _ from 'lodash'

/**
 * Normalize service name to snake case uppercase
 */
export function normalizeServiceName(name: string): string {
  const blacklist = ['S_3', 'EC_2', 'IO_T', 'V_2', 'F_S', 'AP_I']
  let modKey = _.snakeCase(name).toUpperCase()
  blacklist.forEach( ent => {
    if (modKey.indexOf(ent) >= 0) {
      modKey = modKey.replace(ent, ent.replace('_', ''))
    }
  })
  return modKey
}
