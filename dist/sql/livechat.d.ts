import { ClientType } from '../routes/ws/livechat/types.js';
export declare function getAllLivechatClients(): Promise<ClientType[]>;
export declare function queryIsLivechatClientConnected(pubkey: string): Promise<boolean>;
export declare function addLivechatClient(pubkey: string, username: string): Promise<void>;
export declare function removeLivechatClient(pubkey: string): Promise<void>;
