"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveData = void 0;
const ethereumjs_wallet_1 = require("ethereumjs-wallet");
const eth_crypto_1 = __importDefault(require("eth-crypto"));
function retrieveData(address, key) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield globalThis.sql.query(`SELECT value FROM key_value WHERE key = '${key}+${address}'`);
        const { value } = data.rows[0];
        const mnemonic = process.env.MNEMONIC;
        const seed = yield require('bip39').mnemonicToSeed(mnemonic);
        // m/44'/60'/0'/0 is the derivation path for the first Ethereum address
        const hdwallet = ethereumjs_wallet_1.hdkey.fromMasterSeed(seed).derivePath("m/44'/60'/0'/0");
        const wallet = hdwallet.getWallet();
        const encryptedObject = eth_crypto_1.default.cipher.parse(value);
        const decrypted = yield eth_crypto_1.default.decryptWithPrivateKey(wallet.getPrivateKey().toString('hex'), encryptedObject);
        return decrypted;
    });
}
exports.retrieveData = retrieveData;
//# sourceMappingURL=data.js.map