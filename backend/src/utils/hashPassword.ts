import bcrypt from "bcryptjs";

const saltCount = 10;

const generateHashPassword = (password: string) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const hash = await bcrypt.hash(password, saltCount);
        resolve(hash);
      } catch (error) {
        reject(error);
      }
    })();
  });
};

const comparePassword = (password: string, hash: string) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const isCompared = await bcrypt.compare(password, hash);
        resolve(isCompared);
      } catch (error) {
        reject(error);
      }
    })();
  });
};

export { generateHashPassword, comparePassword };
