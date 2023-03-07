import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
    try {
      const salt = await bcrypt.genSalt(12);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (err) {
      throw err;
    }
  };

  export const comparePassword = async (password, hashedPassword) => {
    try {
      const match = await bcrypt.compare(password, hashedPassword);
      return match;
    } catch (err) {
      throw err;
    }
  };
  