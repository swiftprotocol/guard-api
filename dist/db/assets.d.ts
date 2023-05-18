export interface Asset {
    id: string;
    name: string;
    symbol: string;
    chain_id: string;
    rpc: string;
    api?: string;
    channel?: string;
    juno_channel?: string;
    juno_denom?: string;
    denom: string;
    decimals: number;
    logoURI: string;
}
declare const _default: Asset[];
export default _default;
