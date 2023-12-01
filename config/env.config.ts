// Env handling:
import {config as dotenvConfig} from "dotenv";
import {HardhatNetworkAccountsUserConfig, HardhatNetworkAccountUserConfig} from "hardhat/types";
import {resolve} from "path";
import {EnvConfig} from "./types";

dotenvConfig({path: resolve(__dirname, "../.env")});

const DEPLOYER_KEY = extractString("DEPLOYER_KEY");
const PROXY_ADMIN_KEY = extractString("PROXY_ADMIN_KEY");
const ETHERSCAN_API_KEY = extractString("ETHERSCAN_API_KEY");
const GOERLI_RPC_URL = extractString("GOERLI_RPC_URL");
const MAINNET_RPC_URL = extractString("MAINNET_RPC_URL");
const MUMBAI_RPC_URL = extractString("MUMBAI_RPC_URL");
const POLYGON_RPC_URL = extractString("POLYGON_RPC_URL");
const POLYSCAN_API_KEY = extractString("POLYSCAN_API_KEY");

function extractString(name: string): string {
  const envVar = process.env[name];
  if (!envVar) {
    throw new Error(`Please add the ${name} key to your .env file`);
  }
  return envVar;
}

export function getHardhatAccounts(accountList: string[]): HardhatNetworkAccountsUserConfig {
  const hardhatAccounts: HardhatNetworkAccountUserConfig[] = accountList.map((element) => ({
    privateKey: element,
    balance: "1000000000000000000000",
  }));
  return hardhatAccounts;
}

export const envConfig: EnvConfig = {
  ETHERSCAN_API_KEY,
  GOERLI_RPC_URL,
  MAINNET_RPC_URL,
  MUMBAI_RPC_URL,
  POLYGON_RPC_URL,
  POLYSCAN_API_KEY,
  ACCOUNTS: [DEPLOYER_KEY, PROXY_ADMIN_KEY],
};
