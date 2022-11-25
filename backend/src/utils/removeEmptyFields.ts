export const removeEmptyFields = (object?: Object) =>
  Object.entries(object || {})
    .filter(([_, value]) => value != null)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
