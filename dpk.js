const crypto = require("crypto");

const digest = (data) => crypto.createHash("sha3-512").update(data).digest("hex")

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (!event) return TRIVIAL_PARTITION_KEY;
  
  const stringifiedData = typeof event.partitionKey !== "string" ? 
    JSON.stringify(event.partitionKey || event) : event.partitionKey;
  
  const partitionKey = !event.partitionKey ? 
    digest(stringifiedData) : stringifiedData;

  if (partitionKey.length > MAX_PARTITION_KEY_LENGTH) return digest(partitionKey);
  return partitionKey;
};
