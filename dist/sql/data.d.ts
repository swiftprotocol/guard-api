interface RetrieveDataReturnType {
    owner: string;
    key: string;
    symmkeys: string;
    ciphertext: string;
}
export declare function retrieveData(owner: string, key: string): Promise<RetrieveDataReturnType | undefined>;
export declare function storeData(owner: string, key: string, symmkeys: string, ciphertext: string): Promise<void>;
export declare function removeAllDataForOwner(owner: string): Promise<void>;
export {};
