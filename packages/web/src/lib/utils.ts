function decodePath(path: string) {
  const keys: string[] = [];


  path = path.replace(/:(\w+)/g, (_, key) => {
    keys.push(key);
    return "([^\\/]+)";
  });

  const source = `^(${path})`;

  const regex = new RegExp(source, "i");
  return { regex, keys };
}


interface StringIndexedObject {
  [index: string]: any
}

export function matchRoute(path: string, location: string, exact: boolean) {
  const { regex, keys } = decodePath(path);
  const match = location.match(regex);

  if (!match) return null;

  if (exact && match[0] !== match.input) return null;

  const params = match.slice(2);

  return keys.reduce((collection: StringIndexedObject, param, index) => {
    collection[param] = params[index];
    return collection;
  }, {}) as StringIndexedObject;
}