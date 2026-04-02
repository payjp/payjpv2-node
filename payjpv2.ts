import os from "node:os";
import {
  createConfig,
  createClient as createHeyClient,
  type Client,
} from "./client/client";

const BINDINGS_VERSION = '1.0.10';
const DEFAULT_BASE_URL = "https://api.pay.jp";

export interface ClientConfig {
  apiKey: string;
  baseUrl?: string;
}

export function createClient(config: ClientConfig): Client {
  const langVersion = process.version;
  const unameParts = [os.platform(), os.release(), os.arch()];
  const uname = unameParts.join(" ");

  const ua = {
    bindings_version: BINDINGS_VERSION,
    lang: "node",
    lang_version: langVersion,
    publisher: "payjp",
    uname: uname,
  };

  return createHeyClient(
    createConfig({
      baseUrl: config.baseUrl || DEFAULT_BASE_URL,
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": `payjp/payjpv2 NodeBindings/${BINDINGS_VERSION}`,
        "X-Payjp-Client-User-Agent": JSON.stringify(ua),
      },
    })
  );
}

export type { Client };
