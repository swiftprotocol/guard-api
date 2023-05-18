import { Secp256k1HdWallet } from '@cosmjs/amino'
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { SigningStargateClient } from '@swiftprotocol/stargate'
import { juno } from 'juno-network'

export async function getCosmWasmClient(rpc: string) {
  if (!rpc) throw new Error('No RPC provided to connect CosmWasmClient.')
  return await CosmWasmClient.connect(rpc)
}

export async function getSigningStargateClient(rpc: string, wallet: Secp256k1HdWallet) {
  if (!rpc) throw new Error('No RPC provided to connect SigningStargateClient.')
  if (!wallet) throw new Error('No wallet provided to connect SigningStargateClient.')
  return await SigningStargateClient.connectWithSigner(rpc, wallet)
}

export async function getJunoClient(rpc: string) {
  if (!rpc) throw new Error('No RPC provided to connect JunoClient.')
  return await juno.ClientFactory.createRPCQueryClient({
    rpcEndpoint: rpc,
  })
}

export async function getWallet() {
  const wallet = await Secp256k1HdWallet.fromMnemonic(process.env.MNEMONIC!, { prefix: 'juno' })
  const [account] = await wallet.getAccounts()

  return { wallet, account }
}
