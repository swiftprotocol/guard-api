interface RetrieveAppReturnType {
    id: string;
    name: string;
    pubkey: string;
}
export declare function retrieveAppById(id: string): Promise<RetrieveAppReturnType | undefined>;
export declare function retrieveAppByName(name: string): Promise<RetrieveAppReturnType | undefined>;
export declare function retrieveAppByPubkey(pubkey: string): Promise<RetrieveAppReturnType | undefined>;
export {};
