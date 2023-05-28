import { hdkey } from 'ethereumjs-wallet'
import EthCrypto from 'eth-crypto'

export async function retrieveData(address: string, key: string): Promise<string> {
  const client = await globalThis.sql.connect()

  const data = await client.query(`SELECT value FROM key_value WHERE key = '${key}+${address}'`).catch((err) => {
    console.error(err)
    throw Error(err.stack)
  })

  if (data.rowCount < 1) {
    throw Error('Key does not exist')
  }

  const { value } = data.rows[0]

  client.release()

  const mnemonic = process.env.MNEMONIC!
  const seed = await require('bip39').mnemonicToSeed(mnemonic)

  // m/44'/60'/0'/0 is the derivation path for the first Ethereum address
  const hdwallet = hdkey.fromMasterSeed(seed).derivePath("m/44'/60'/0'/0")
  const wallet = hdwallet.getWallet()

  const encryptedObject = EthCrypto.cipher.parse(value)
  const decrypted = await EthCrypto.decryptWithPrivateKey(wallet.getPrivateKey().toString('hex'), encryptedObject)
  return decrypted
}
