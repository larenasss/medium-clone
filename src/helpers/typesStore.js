export function createTypesFromModuleName(moduleName = '', objTypes = {}) {
  let result = {};
  for (const key in objTypes) {
    result[key] = `${moduleName}/${objTypes[key]}`;
  }

  return result;
}