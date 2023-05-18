import { Secp256k1HdWallet } from '@cosmjs/amino';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { SigningStargateClient } from '@swiftprotocol/stargate';
export declare function getCosmWasmClient(rpc: string): Promise<CosmWasmClient>;
export declare function getSigningStargateClient(rpc: string, wallet: Secp256k1HdWallet): Promise<SigningStargateClient>;
export declare function getJunoClient(rpc: string): Promise<{
    cosmos: {
        authz: {
            v1beta1: {
                grants(request: import("juno-network/types/codegen/cosmos/authz/v1beta1/query").QueryGrantsRequest): Promise<import("juno-network/types/codegen/cosmos/authz/v1beta1/query").QueryGrantsResponse>;
                granterGrants(request: import("juno-network/types/codegen/cosmos/authz/v1beta1/query").QueryGranterGrantsRequest): Promise<import("juno-network/types/codegen/cosmos/authz/v1beta1/query").QueryGranterGrantsResponse>;
                granteeGrants(request: import("juno-network/types/codegen/cosmos/authz/v1beta1/query").QueryGranteeGrantsRequest): Promise<import("juno-network/types/codegen/cosmos/authz/v1beta1/query").QueryGranteeGrantsResponse>;
            };
        };
        bank: {
            v1beta1: {
                balance(request: import("juno-network/types/codegen/cosmos/bank/v1beta1/query").QueryBalanceRequest): Promise<import("juno-network/types/codegen/cosmos/bank/v1beta1/query").QueryBalanceResponse>;
                allBalances(request: import("juno-network/types/codegen/cosmos/bank/v1beta1/query").QueryAllBalancesRequest): Promise<import("juno-network/types/codegen/cosmos/bank/v1beta1/query").QueryAllBalancesResponse>;
                spendableBalances(request: import("juno-network/types/codegen/cosmos/bank/v1beta1/query").QuerySpendableBalancesRequest): Promise<import("juno-network/types/codegen/cosmos/bank/v1beta1/query").QuerySpendableBalancesResponse>;
                totalSupply(request?: import("juno-network/types/codegen/cosmos/bank/v1beta1/query").QueryTotalSupplyRequest | undefined): Promise<import("juno-network/types/codegen/cosmos/bank/v1beta1/query").QueryTotalSupplyResponse>;
                supplyOf(request: import("juno-network/types/codegen/cosmos/bank/v1beta1/query").QuerySupplyOfRequest): Promise<import("juno-network/types/codegen/cosmos/bank/v1beta1/query").QuerySupplyOfResponse>;
                params(request?: import("juno-network/types/codegen/cosmos/bank/v1beta1/query").QueryParamsRequest | undefined): Promise<import("juno-network/types/codegen/cosmos/bank/v1beta1/query").QueryParamsResponse>;
                denomMetadata(request: import("juno-network/types/codegen/cosmos/bank/v1beta1/query").QueryDenomMetadataRequest): Promise<import("juno-network/types/codegen/cosmos/bank/v1beta1/query").QueryDenomMetadataResponse>;
                denomsMetadata(request?: import("juno-network/types/codegen/cosmos/bank/v1beta1/query").QueryDenomsMetadataRequest | undefined): Promise<import("juno-network/types/codegen/cosmos/bank/v1beta1/query").QueryDenomsMetadataResponse>;
                denomOwners(request: import("juno-network/types/codegen/cosmos/bank/v1beta1/query").QueryDenomOwnersRequest): Promise<import("juno-network/types/codegen/cosmos/bank/v1beta1/query").QueryDenomOwnersResponse>;
            };
        };
        distribution: {
            v1beta1: {
                params(request?: import("juno-network/types/codegen/cosmos/distribution/v1beta1/query").QueryParamsRequest | undefined): Promise<import("juno-network/types/codegen/cosmos/distribution/v1beta1/query").QueryParamsResponse>;
                validatorOutstandingRewards(request: import("juno-network/types/codegen/cosmos/distribution/v1beta1/query").QueryValidatorOutstandingRewardsRequest): Promise<import("juno-network/types/codegen/cosmos/distribution/v1beta1/query").QueryValidatorOutstandingRewardsResponse>;
                validatorCommission(request: import("juno-network/types/codegen/cosmos/distribution/v1beta1/query").QueryValidatorCommissionRequest): Promise<import("juno-network/types/codegen/cosmos/distribution/v1beta1/query").QueryValidatorCommissionResponse>;
                validatorSlashes(request: import("juno-network/types/codegen/cosmos/distribution/v1beta1/query").QueryValidatorSlashesRequest): Promise<import("juno-network/types/codegen/cosmos/distribution/v1beta1/query").QueryValidatorSlashesResponse>;
                delegationRewards(request: import("juno-network/types/codegen/cosmos/distribution/v1beta1/query").QueryDelegationRewardsRequest): Promise<import("juno-network/types/codegen/cosmos/distribution/v1beta1/query").QueryDelegationRewardsResponse>;
                delegationTotalRewards(request: import("juno-network/types/codegen/cosmos/distribution/v1beta1/query").QueryDelegationTotalRewardsRequest): Promise<import("juno-network/types/codegen/cosmos/distribution/v1beta1/query").QueryDelegationTotalRewardsResponse>;
                delegatorValidators(request: import("juno-network/types/codegen/cosmos/distribution/v1beta1/query").QueryDelegatorValidatorsRequest): Promise<import("juno-network/types/codegen/cosmos/distribution/v1beta1/query").QueryDelegatorValidatorsResponse>;
                delegatorWithdrawAddress(request: import("juno-network/types/codegen/cosmos/distribution/v1beta1/query").QueryDelegatorWithdrawAddressRequest): Promise<import("juno-network/types/codegen/cosmos/distribution/v1beta1/query").QueryDelegatorWithdrawAddressResponse>;
                communityPool(request?: import("juno-network/types/codegen/cosmos/distribution/v1beta1/query").QueryCommunityPoolRequest | undefined): Promise<import("juno-network/types/codegen/cosmos/distribution/v1beta1/query").QueryCommunityPoolResponse>;
            };
        };
        gov: {
            v1: {
                proposal(request: import("juno-network/types/codegen/cosmos/gov/v1/query").QueryProposalRequest): Promise<import("juno-network/types/codegen/cosmos/gov/v1/query").QueryProposalResponse>;
                proposals(request: import("juno-network/types/codegen/cosmos/gov/v1/query").QueryProposalsRequest): Promise<import("juno-network/types/codegen/cosmos/gov/v1/query").QueryProposalsResponse>;
                vote(request: import("juno-network/types/codegen/cosmos/gov/v1/query").QueryVoteRequest): Promise<import("juno-network/types/codegen/cosmos/gov/v1/query").QueryVoteResponse>;
                votes(request: import("juno-network/types/codegen/cosmos/gov/v1/query").QueryVotesRequest): Promise<import("juno-network/types/codegen/cosmos/gov/v1/query").QueryVotesResponse>;
                params(request: import("juno-network/types/codegen/cosmos/gov/v1/query").QueryParamsRequest): Promise<import("juno-network/types/codegen/cosmos/gov/v1/query").QueryParamsResponse>;
                deposit(request: import("juno-network/types/codegen/cosmos/gov/v1/query").QueryDepositRequest): Promise<import("juno-network/types/codegen/cosmos/gov/v1/query").QueryDepositResponse>;
                deposits(request: import("juno-network/types/codegen/cosmos/gov/v1/query").QueryDepositsRequest): Promise<import("juno-network/types/codegen/cosmos/gov/v1/query").QueryDepositsResponse>;
                tallyResult(request: import("juno-network/types/codegen/cosmos/gov/v1/query").QueryTallyResultRequest): Promise<import("juno-network/types/codegen/cosmos/gov/v1/query").QueryTallyResultResponse>;
            };
            v1beta1: {
                proposal(request: import("juno-network/types/codegen/cosmos/gov/v1beta1/query").QueryProposalRequest): Promise<import("juno-network/types/codegen/cosmos/gov/v1beta1/query").QueryProposalResponse>;
                proposals(request: import("juno-network/types/codegen/cosmos/gov/v1beta1/query").QueryProposalsRequest): Promise<import("juno-network/types/codegen/cosmos/gov/v1beta1/query").QueryProposalsResponse>;
                vote(request: import("juno-network/types/codegen/cosmos/gov/v1beta1/query").QueryVoteRequest): Promise<import("juno-network/types/codegen/cosmos/gov/v1beta1/query").QueryVoteResponse>;
                votes(request: import("juno-network/types/codegen/cosmos/gov/v1beta1/query").QueryVotesRequest): Promise<import("juno-network/types/codegen/cosmos/gov/v1beta1/query").QueryVotesResponse>;
                params(request: import("juno-network/types/codegen/cosmos/gov/v1beta1/query").QueryParamsRequest): Promise<import("juno-network/types/codegen/cosmos/gov/v1beta1/query").QueryParamsResponse>;
                deposit(request: import("juno-network/types/codegen/cosmos/gov/v1beta1/query").QueryDepositRequest): Promise<import("juno-network/types/codegen/cosmos/gov/v1beta1/query").QueryDepositResponse>;
                deposits(request: import("juno-network/types/codegen/cosmos/gov/v1beta1/query").QueryDepositsRequest): Promise<import("juno-network/types/codegen/cosmos/gov/v1beta1/query").QueryDepositsResponse>;
                tallyResult(request: import("juno-network/types/codegen/cosmos/gov/v1beta1/query").QueryTallyResultRequest): Promise<import("juno-network/types/codegen/cosmos/gov/v1beta1/query").QueryTallyResultResponse>;
            };
        };
        staking: {
            v1beta1: {
                validators(request: import("juno-network/types/codegen/cosmos/staking/v1beta1/query").QueryValidatorsRequest): Promise<import("juno-network/types/codegen/cosmos/staking/v1beta1/query").QueryValidatorsResponse>;
                validator(request: import("juno-network/types/codegen/cosmos/staking/v1beta1/query").QueryValidatorRequest): Promise<import("juno-network/types/codegen/cosmos/staking/v1beta1/query").QueryValidatorResponse>;
                validatorDelegations(request: import("juno-network/types/codegen/cosmos/staking/v1beta1/query").QueryValidatorDelegationsRequest): Promise<import("juno-network/types/codegen/cosmos/staking/v1beta1/query").QueryValidatorDelegationsResponse>;
                validatorUnbondingDelegations(request: import("juno-network/types/codegen/cosmos/staking/v1beta1/query").QueryValidatorUnbondingDelegationsRequest): Promise<import("juno-network/types/codegen/cosmos/staking/v1beta1/query").QueryValidatorUnbondingDelegationsResponse>;
                delegation(request: import("juno-network/types/codegen/cosmos/staking/v1beta1/query").QueryDelegationRequest): Promise<import("juno-network/types/codegen/cosmos/staking/v1beta1/query").QueryDelegationResponse>;
                unbondingDelegation(request: import("juno-network/types/codegen/cosmos/staking/v1beta1/query").QueryUnbondingDelegationRequest): Promise<import("juno-network/types/codegen/cosmos/staking/v1beta1/query").QueryUnbondingDelegationResponse>;
                delegatorDelegations(request: import("juno-network/types/codegen/cosmos/staking/v1beta1/query").QueryDelegatorDelegationsRequest): Promise<import("juno-network/types/codegen/cosmos/staking/v1beta1/query").QueryDelegatorDelegationsResponse>;
                delegatorUnbondingDelegations(request: import("juno-network/types/codegen/cosmos/staking/v1beta1/query").QueryDelegatorUnbondingDelegationsRequest): Promise<import("juno-network/types/codegen/cosmos/staking/v1beta1/query").QueryDelegatorUnbondingDelegationsResponse>;
                redelegations(request: import("juno-network/types/codegen/cosmos/staking/v1beta1/query").QueryRedelegationsRequest): Promise<import("juno-network/types/codegen/cosmos/staking/v1beta1/query").QueryRedelegationsResponse>;
                delegatorValidators(request: import("juno-network/types/codegen/cosmos/staking/v1beta1/query").QueryDelegatorValidatorsRequest): Promise<import("juno-network/types/codegen/cosmos/staking/v1beta1/query").QueryDelegatorValidatorsResponse>;
                delegatorValidator(request: import("juno-network/types/codegen/cosmos/staking/v1beta1/query").QueryDelegatorValidatorRequest): Promise<import("juno-network/types/codegen/cosmos/staking/v1beta1/query").QueryDelegatorValidatorResponse>;
                historicalInfo(request: import("juno-network/types/codegen/cosmos/staking/v1beta1/query").QueryHistoricalInfoRequest): Promise<import("juno-network/types/codegen/cosmos/staking/v1beta1/query").QueryHistoricalInfoResponse>;
                pool(request?: import("juno-network/types/codegen/cosmos/staking/v1beta1/query").QueryPoolRequest | undefined): Promise<import("juno-network/types/codegen/cosmos/staking/v1beta1/query").QueryPoolResponse>;
                params(request?: import("juno-network/types/codegen/cosmos/staking/v1beta1/query").QueryParamsRequest | undefined): Promise<import("juno-network/types/codegen/cosmos/staking/v1beta1/query").QueryParamsResponse>;
            };
        };
        tx: {
            v1beta1: {
                simulate(request: import("juno-network/types/codegen/cosmos/tx/v1beta1/service").SimulateRequest): Promise<import("juno-network/types/codegen/cosmos/tx/v1beta1/service").SimulateResponse>;
                getTx(request: import("juno-network/types/codegen/cosmos/tx/v1beta1/service").GetTxRequest): Promise<import("juno-network/types/codegen/cosmos/tx/v1beta1/service").GetTxResponse>;
                broadcastTx(request: import("juno-network/types/codegen/cosmos/tx/v1beta1/service").BroadcastTxRequest): Promise<import("juno-network/types/codegen/cosmos/tx/v1beta1/service").BroadcastTxResponse>;
                getTxsEvent(request: import("juno-network/types/codegen/cosmos/tx/v1beta1/service").GetTxsEventRequest): Promise<import("juno-network/types/codegen/cosmos/tx/v1beta1/service").GetTxsEventResponse>;
                getBlockWithTxs(request: import("juno-network/types/codegen/cosmos/tx/v1beta1/service").GetBlockWithTxsRequest): Promise<import("juno-network/types/codegen/cosmos/tx/v1beta1/service").GetBlockWithTxsResponse>;
            };
        };
        upgrade: {
            v1beta1: {
                currentPlan(request?: import("juno-network/types/codegen/cosmos/upgrade/v1beta1/query").QueryCurrentPlanRequest | undefined): Promise<import("juno-network/types/codegen/cosmos/upgrade/v1beta1/query").QueryCurrentPlanResponse>;
                appliedPlan(request: import("juno-network/types/codegen/cosmos/upgrade/v1beta1/query").QueryAppliedPlanRequest): Promise<import("juno-network/types/codegen/cosmos/upgrade/v1beta1/query").QueryAppliedPlanResponse>;
                upgradedConsensusState(request: import("juno-network/types/codegen/cosmos/upgrade/v1beta1/query").QueryUpgradedConsensusStateRequest): Promise<import("juno-network/types/codegen/cosmos/upgrade/v1beta1/query").QueryUpgradedConsensusStateResponse>;
                moduleVersions(request: import("juno-network/types/codegen/cosmos/upgrade/v1beta1/query").QueryModuleVersionsRequest): Promise<import("juno-network/types/codegen/cosmos/upgrade/v1beta1/query").QueryModuleVersionsResponse>;
                authority(request?: import("juno-network/types/codegen/cosmos/upgrade/v1beta1/query").QueryAuthorityRequest | undefined): Promise<import("juno-network/types/codegen/cosmos/upgrade/v1beta1/query").QueryAuthorityResponse>;
            };
        };
    };
    juno: {
        feeshare: {
            v1: {
                feeShares(request?: import("juno-network/types/codegen/juno/feeshare/v1/query").QueryFeeSharesRequest | undefined): Promise<import("juno-network/types/codegen/juno/feeshare/v1/query").QueryFeeSharesResponse>;
                feeShare(request: import("juno-network/types/codegen/juno/feeshare/v1/query").QueryFeeShareRequest): Promise<import("juno-network/types/codegen/juno/feeshare/v1/query").QueryFeeShareResponse>;
                params(request?: import("juno-network/types/codegen/juno/feeshare/v1/query").QueryParamsRequest | undefined): Promise<import("juno-network/types/codegen/juno/feeshare/v1/query").QueryParamsResponse>;
                deployerFeeShares(request: import("juno-network/types/codegen/juno/feeshare/v1/query").QueryDeployerFeeSharesRequest): Promise<import("juno-network/types/codegen/juno/feeshare/v1/query").QueryDeployerFeeSharesResponse>;
                withdrawerFeeShares(request: import("juno-network/types/codegen/juno/feeshare/v1/query").QueryWithdrawerFeeSharesRequest): Promise<import("juno-network/types/codegen/juno/feeshare/v1/query").QueryWithdrawerFeeSharesResponse>;
            };
        };
        mint: {
            params(request?: import("juno-network/types/codegen/juno/mint/query").QueryParamsRequest | undefined): Promise<import("juno-network/types/codegen/juno/mint/query").QueryParamsResponse>;
            inflation(request?: import("juno-network/types/codegen/juno/mint/query").QueryInflationRequest | undefined): Promise<import("juno-network/types/codegen/juno/mint/query").QueryInflationResponse>;
            annualProvisions(request?: import("juno-network/types/codegen/juno/mint/query").QueryAnnualProvisionsRequest | undefined): Promise<import("juno-network/types/codegen/juno/mint/query").QueryAnnualProvisionsResponse>;
        };
    };
}>;
export declare function getWallet(): Promise<{
    wallet: Secp256k1HdWallet;
    account: import("@cosmjs/amino").AccountData;
}>;
