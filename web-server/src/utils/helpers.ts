const encodeBase64Url = (
  str: string,
  option: BufferEncoding = "base64url"
): string => {
  let txt: string;
  txt = Buffer.from(`${str}`).toString(option);
  return txt;
};

const decodeBase64Url = (
  str: string,
  option: BufferEncoding = "base64url"
): string => {
  return Buffer.from(`${str}`, option).toString("ascii");
};
/**
 * Function to generate a consistent 6-digit number
 * */
function generateSixDigitNumber(): number {
  return Math.floor(100000 + Math.random() * 900000);
}
export { encodeBase64Url, decodeBase64Url, generateSixDigitNumber };
