interface RetrieveAuthorizationsReturnType {
    pubkey: string;
    authorizations: string;
}
interface RetrieveSubscriptionReturnType {
    pubkey: string;
    app: string;
    subscription: string;
}
interface RetrieveClientReturnType {
    pubkey: string;
    app: string;
    socket: string;
}
export declare function retrieveAuthorizations(pubkey: string): Promise<RetrieveAuthorizationsReturnType | undefined>;
export declare function storeAuthorizations(pubkey: string, authorizations: string): Promise<void>;
export declare function retrieveSubscription(pubkey: string, app: string): Promise<RetrieveSubscriptionReturnType | undefined>;
export declare function storeSubscription(pubkey: string, app: string, subscription: string): Promise<void>;
export declare function retrieveClient(pubkey: string, app: string): Promise<RetrieveClientReturnType | undefined>;
export declare function addClient(pubkey: string, app: string, socket: string): Promise<void>;
export declare function removeClient(pubkey: string, app: string): Promise<void>;
export {};
