import { isSecp256k1Pubkey, makeSignDoc, rawSecp256k1PubkeyToRawAddress, serializeSignDoc, } from '@cosmjs/amino';
import { Secp256k1, Secp256k1Signature, sha256 } from '@cosmjs/crypto';
import { fromBase64, fromBech32, fromHex } from '@cosmjs/encoding';
import { arrayContentEquals } from '@cosmjs/utils';
import { Crypto } from '@peculiar/webcrypto';
import { isMsgSignData } from '@swiftprotocol/stargate/build/signingstargateclient.js';
export function hexPubKeyToAddress(pubkey) {
    const rawSecp256k1Pubkey = fromHex(pubkey);
    const rawAddress = rawSecp256k1PubkeyToRawAddress(rawSecp256k1Pubkey);
    const hexAddress = Buffer.from(rawAddress).toString('hex');
    return hexAddress;
}
export async function verifySignature(publicKeyHex, signatureHex, message) {
    const crypto = new Crypto();
    const publicKeyBuffer = Buffer.from(publicKeyHex, 'hex');
    const signatureBuffer = Buffer.from(signatureHex, 'hex');
    const publicKey = await crypto.subtle.importKey('spki', publicKeyBuffer, {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-256',
    }, false, ['verify']);
    const encoder = new TextEncoder();
    const messageBuffer = encoder.encode(message);
    const isValid = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', publicKey, signatureBuffer, messageBuffer);
    return isValid;
}
export async function experimentalAdr36Verify(signed) {
    if (signed.memo !== '')
        throw new Error('Memo must be empty.');
    if (signed.fee.gas !== '0')
        throw new Error('Fee gas must 0.');
    if (signed.fee.amount.length !== 0)
        throw new Error('Fee amount must be an empty array.');
    const accountNumber = 0;
    const sequence = 0;
    const chainId = '';
    // Check `msg` array
    const signedMessages = signed.msg;
    if (!signedMessages.every(isMsgSignData)) {
        throw new Error(`Found message that is not the expected type.`);
    }
    if (signedMessages.length === 0) {
        throw new Error('No message found. Without messages we cannot determine the signer address.');
    }
    // TODO: restrict number of messages?
    const signatures = signed.signatures;
    if (signatures.length !== 1)
        throw new Error('Must have exactly one signature to be supported.');
    const signature = signatures[0];
    if (!isSecp256k1Pubkey(signature.pub_key)) {
        throw new Error('Only secp256k1 signatures are supported.');
    }
    const signBytes = serializeSignDoc(makeSignDoc(signed.msg, signed.fee, chainId, signed.memo, accountNumber, sequence));
    const prehashed = sha256(signBytes);
    const secpSignature = Secp256k1Signature.fromFixedLength(fromBase64(signature.signature));
    const rawSecp256k1Pubkey = fromBase64(signature.pub_key.value);
    const rawSignerAddress = rawSecp256k1PubkeyToRawAddress(rawSecp256k1Pubkey);
    if (signedMessages.some((msg) => !arrayContentEquals(fromBech32(msg.value.signer).data, rawSignerAddress))) {
        throw new Error('Found mismatch between signer in message and public key.');
    }
    const ok = await Secp256k1.verifySignature(secpSignature, Buffer.from(prehashed), rawSecp256k1Pubkey);
    return ok;
}
//# sourceMappingURL=helpers.js.map