import { Condition } from "./types";

export const evalCondition = (cond: Condition, val: string): boolean => {
  if (cond.is === "==") {
    return val === cond.to;
  } else if (cond.is === "!=") {
    return val != cond.to;
  } else if (cond.is === "includes") {
    if (val.match("^\\[.*\\]$")?.length ?? -1 > 0) {
      return (JSON.parse(val) as string[]).includes(cond.to);
    } else {
      console.error('"includes" evaluated against non-array value', val);
    }
  } else if (cond.is === "excludes") {
    if (val.match("^\\[.*\\]$")?.length ?? -1 > 0) {
      return !(JSON.parse(val) as string[]).includes(cond.to);
    } else {
      console.error('"excludes" evaluated against non-array value', val);
    }
  }
  return false;
};
