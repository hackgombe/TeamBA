export function formatToNaira(amount) {
  // Check if the provided amount is a number
  if (typeof amount !== "number") {
    return "Invalid input. Please provide a valid number.";
  }

  // Use the toLocaleString method to format the number as currency
  const formattedAmount = amount.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
  });

  return formattedAmount;
}
