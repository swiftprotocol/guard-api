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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWallet = exports.getJunoClient = exports.getSigningStargateClient = exports.getCosmWasmClient = void 0;
const amino_1 = require("@cosmjs/amino");
const cosmwasm_stargate_1 = require("@cosmjs/cosmwasm-stargate");
const stargate_1 = require("@swiftprotocol/stargate");
const juno_network_1 = require("juno-network");
function getCosmWasmClient(rpc) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!rpc)
            throw new Error('No RPC provided to connect CosmWasmClient.');
        return yield cosmwasm_stargate_1.CosmWasmClient.connect(rpc);
    });
}
exports.getCosmWasmClient = getCosmWasmClient;
function getSigningStargateClient(rpc, wallet) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!rpc)
            throw new Error('No RPC provided to connect SigningStargateClient.');
        if (!wallet)
            throw new Error('No wallet provided to connect SigningStargateClient.');
        return yield stargate_1.SigningStargateClient.connectWithSigner(rpc, wallet);
    });
}
exports.getSigningStargateClient = getSigningStargateClient;
function getJunoClient(rpc) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!rpc)
            throw new Error('No RPC provided to connect JunoClient.');
        return yield juno_network_1.juno.ClientFactory.createRPCQueryClient({
            rpcEndpoint: rpc,
        });
    });
}
exports.getJunoClient = getJunoClient;
function getWallet() {
    return __awaiter(this, void 0, void 0, function* () {
        const wallet = yield amino_1.Secp256k1HdWallet.fromMnemonic(process.env.MNEMONIC, { prefix: 'juno' });
        const [account] = yield wallet.getAccounts();
        return { wallet, account };
    });
}
exports.getWallet = getWallet;
//# sourceMappingURL=cosmos.js.map