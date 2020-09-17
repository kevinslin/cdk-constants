import * as _ from "lodash";

/**
 * Normalize service name
 */
export function normalizeServiceName(
  name: string,
  opts?: { snakeCase?: boolean; stripPrefix?: boolean; useBlacklist?: boolean }
): string {
  const blacklist = ["S_3", "EC_2", "IO_T", "V_2", "F_S", "AP_I"];
  opts = _.defaults(opts, {
    snakeCase: true,
    stripPrefix: false,
    useBlacklist: true
  });
  let normName = name;

  if (opts.stripPrefix) {
    normName = _.trim(normName.replace(/^(AWS|AMAZON)/i, ""));
    // TODO
  }

  if (opts.snakeCase) {
    let modKey = _.snakeCase(name).toUpperCase();
    opts.useBlacklist &&
      blacklist.forEach(ent => {
        if (modKey.indexOf(ent) >= 0) {
          modKey = modKey.replace(ent, ent.replace("_", ""));
        }
      });
    normName = modKey;
  }
  return normName;
}
