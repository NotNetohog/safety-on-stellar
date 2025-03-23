import {
  Networks,
  Operation,
  TransactionBuilder,
  Keypair,
  Horizon,
  BadRequestError,
} from "@stellar/stellar-sdk";
import { BlockchainData } from "./types";
import { decodeData, parseJsonField } from "./utils";

// Initialize Stellar server (testnet for development)
const server = new Horizon.Server("https://horizon-testnet.stellar.org");

// Create a new Stellar account
export async function createStellarAccount() {
  try {
    // Generate a new keypair
    const keypair = Keypair.random();

    // Fund the account using Friendbot (testnet only)
    await fetch(
      `https://friendbot.stellar.org?addr=${encodeURIComponent(keypair.publicKey())}`,
    );

    return {
      publicKey: keypair.publicKey(),
      secretKey: keypair.secret(),
    };
  } catch (error) {
    console.error("Error creating Stellar account:", error);
    throw error;
  }
}

// Store medical data in a Stellar account's data entries
export async function storeMedicalData(
  secretKey: string,
  medicalData: BlockchainData,
) {
  try {
    const sourceKeypair = Keypair.fromSecret(secretKey);
    const sourcePublicKey = sourceKeypair.publicKey();

    console.log(sourcePublicKey);

    // Get account details
    const account = await server.loadAccount(sourcePublicKey);

    // Get suggested fee
    const feeStats = await server.feeStats();

    // Create a transaction to store the data
    const transaction = new TransactionBuilder(account, {
      fee: feeStats.max_fee.mode,
      networkPassphrase: Networks.TESTNET,
    });

    // Add operations for each data category
    if (medicalData.bloodType) {
      const value = medicalData.bloodType;
      validateDataSize("bloodType", value);
      transaction.addOperation(
        Operation.manageData({
          name: "blood_type",
          value: value,
        }),
      );
    }

    if (medicalData.identification) {
      const value = medicalData.identification;
      validateDataSize("identification", value);
      transaction.addOperation(
        Operation.manageData({
          name: "identification",
          value: value,
        }),
      );
    }

    if (medicalData.allergies) {
      const value = JSON.stringify(medicalData.allergies);
      validateDataSize("allergies", value);
      transaction.addOperation(
        Operation.manageData({
          name: "allergies",
          value: value,
        }),
      );
    }

    if (medicalData.medications) {
      const value = JSON.stringify(medicalData.medications);
      validateDataSize("medications", value);
      transaction.addOperation(
        Operation.manageData({
          name: "medications",
          value: value,
        }),
      );
    }

    if (medicalData.conditions) {
      const value = JSON.stringify(medicalData.conditions);
      validateDataSize("conditions", value);
      transaction.addOperation(
        Operation.manageData({
          name: "conditions",
          value: value,
        }),
      );
    }

    if (medicalData.emergencyContact) {
      const value = JSON.stringify(medicalData.emergencyContact);
      validateDataSize("emergencyContact", value);
      transaction.addOperation(
        Operation.manageData({
          name: "emergencyContact",
          value: value,
        }),
      );
    }

    // Build, sign and submit
    const builtTx = transaction.setTimeout(30).build();
    builtTx.sign(sourceKeypair);
    return await server.submitTransaction(builtTx);
  } catch (error) {
    console.error("Error storing medical data:", error);
    throw error;
  }
}

/**
 * Retrieve and return custom medical data from an account's data entries.
 *
 * @param publicKey - Public Stellar address to query for medical data
 * @returns A Promise resolving to a BlockchainData object containing medical info.
 * @throws An error if the account cannot be loaded or if data decoding/parsing fails.
 */
export async function retrieveMedicalData(
  publicKey: string,
): Promise<BlockchainData | null> {
  try {
    let account;

    try {
      // Load the account details from Horizon
      account = await server.loadAccount(publicKey);
    } catch (error) {
      throw new AccountLoadError(publicKey, error as Error);
    }

    // Horizon returns data entries in  `data_attr` as an object:
    const accountData = account.data_attr;

    // Decode data entries.
    const bloodType = decodeData(accountData["blood_type"]);

    // If bloodType is not present it means account do not have any medical data
    if (!bloodType) return null;

    const identification = decodeData(accountData["identification"]);

    // For fields that were stored as JSON strings, decode and parse them.
    const allergies = parseJsonField("allergies", accountData["allergies"]);
    const medications = parseJsonField(
      "medications",
      accountData["medications"],
    );
    const conditions = parseJsonField("conditions", accountData["conditions"]);
    const emergencyContact = parseJsonField(
      "emergencyContact",
      accountData["emergencyContact"],
    );

    // Return an object corresponding to the BlockchainData type.
    return {
      bloodType,
      identification,
      allergies,
      medications,
      conditions,
      emergencyContact,
    };
  } catch (error) {
    if (error instanceof MedicalDataError) {
      throw error;
    } else {
      throw new MedicalDataError(
        "Failed to retrieve medical data",
        error as Error,
      );
    }
  }
}

export class MedicalDataError extends Error {
  constructor(
    message: string,
    public cause?: Error,
  ) {
    super(message);
    this.name = "MedicalDataError";
  }
}

export class AccountLoadError extends MedicalDataError {
  constructor(publicKey: string, cause?: Error) {
    super(`Failed to load account data for key: ${publicKey}`, cause);
    this.name = "AccountLoadError";
  }
}

export class DataParsingError extends MedicalDataError {
  constructor(field: string, cause?: Error) {
    super(`Failed to parse ${field} data from blockchain`, cause);
    this.name = "DataParsingError";
  }
}

// Stellar's manageData operations have a 64-byte limit for values
const validateDataSize = (name: string, value: string): boolean => {
  if (Buffer.from(value).length > 64) {
    throw new MedicalDataError(
      `Data entry '${name}' exceeds the limit. Consider shorten your entries`,
    );
  }
  return true;
};
