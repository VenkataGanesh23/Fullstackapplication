export interface Status {
  code: number;
  message: string;
}

export const responseStatus = (code: number, message: string): Status => {
  return { code, message };
};

export const tokenization = async (tokentoEncrypt: string): Promise<string> => {
  try {
    const encodedString = Buffer.from(tokentoEncrypt).toString("base64");
    return encodedString;
  } catch (error) {
    console.error("Error in tokenization:", error);
    throw new Error("Failed to tokenize data");
  }
};

export const numericTokenization = async (
  tokentoEncrypt: number
): Promise<string> => {
  try {
    const number = tokentoEncrypt;
    console.log(number, "[number]");
    const numberString = number.toString();
    console.log(numberString, "[numberString]");
    const encodedString = Buffer.from(numberString, "utf-8").toString("base64");
    console.log(encodedString, "[encodedString]");
    return encodedString;
  } catch (error) {
    console.error("Error in tokenization:", error);
    throw new Error("Failed to tokenize data");
  }
};

export const detokenization = async (tokenToDecrypt: any): Promise<string> => {
  try {
    const decodedString = Buffer.from(tokenToDecrypt, "base64").toString(
      "utf-8"
    );

    console.log(decodedString, "[decodedString]");
    return decodedString;
  } catch (error) {
    console.error("Error in detokenization:", error);
    throw new Error("Failed to detokenize data");
  }
};

export const numericDetokenization = async (
  tokenToDecrypt: any
): Promise<number> => {
  try {
    console.log(tokenToDecrypt, "[tokenToDecrypt]");
    const encodedString = tokenToDecrypt;

    const decodedString = Buffer.from(encodedString, "base64").toString(
      "utf-8"
    );

    // Convert the string back to a number
    console.log(decodedString, "[decodedstring]");
    const decodedNumber = parseInt(decodedString, 10);

    console.log(decodedNumber, "decodedNumber");

    return decodedNumber;
  } catch (error) {
    console.error("Error in detokenization:", error);
    throw new Error("Failed to detokenize data");
  }
};
