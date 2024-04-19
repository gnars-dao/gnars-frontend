import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GnarsDAO
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const gnarsDaoAbi = [
  { type: 'error', inputs: [], name: 'AdminOnly' },
  { type: 'error', inputs: [], name: 'CantCancelExecutedProposal' },
  { type: 'error', inputs: [], name: 'CantVetoExecutedProposal' },
  { type: 'error', inputs: [], name: 'InvalidMaxQuorumVotesBPS' },
  { type: 'error', inputs: [], name: 'InvalidMinQuorumVotesBPS' },
  { type: 'error', inputs: [], name: 'MinQuorumBPSGreaterThanMaxQuorumBPS' },
  { type: 'error', inputs: [], name: 'PendingVetoerOnly' },
  { type: 'error', inputs: [], name: 'UnsafeUint16Cast' },
  { type: 'error', inputs: [], name: 'VetoerBurned' },
  { type: 'error', inputs: [], name: 'VetoerOnly' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'oldMaxQuorumVotesBPS', internalType: 'uint16', type: 'uint16', indexed: false },
      { name: 'newMaxQuorumVotesBPS', internalType: 'uint16', type: 'uint16', indexed: false },
    ],
    name: 'MaxQuorumVotesBPSSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'oldMinQuorumVotesBPS', internalType: 'uint16', type: 'uint16', indexed: false },
      { name: 'newMinQuorumVotesBPS', internalType: 'uint16', type: 'uint16', indexed: false },
    ],
    name: 'MinQuorumVotesBPSSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'oldAdmin', internalType: 'address', type: 'address', indexed: false },
      { name: 'newAdmin', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'NewAdmin',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'oldImplementation', internalType: 'address', type: 'address', indexed: false },
      { name: 'newImplementation', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'NewImplementation',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'oldPendingAdmin', internalType: 'address', type: 'address', indexed: false },
      { name: 'newPendingAdmin', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'NewPendingAdmin',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'oldPendingVetoer', internalType: 'address', type: 'address', indexed: false },
      { name: 'newPendingVetoer', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'NewPendingVetoer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'oldVetoer', internalType: 'address', type: 'address', indexed: false },
      { name: 'newVetoer', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'NewVetoer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'ProposalCanceled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'proposer', internalType: 'address', type: 'address', indexed: false },
      { name: 'targets', internalType: 'address[]', type: 'address[]', indexed: false },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
      { name: 'signatures', internalType: 'string[]', type: 'string[]', indexed: false },
      { name: 'calldatas', internalType: 'bytes[]', type: 'bytes[]', indexed: false },
      { name: 'startBlock', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'endBlock', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'description', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'ProposalCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'proposer', internalType: 'address', type: 'address', indexed: false },
      { name: 'targets', internalType: 'address[]', type: 'address[]', indexed: false },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
      { name: 'signatures', internalType: 'string[]', type: 'string[]', indexed: false },
      { name: 'calldatas', internalType: 'bytes[]', type: 'bytes[]', indexed: false },
      { name: 'startBlock', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'endBlock', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'proposalThreshold', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'quorumVotes', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'description', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'ProposalCreatedWithRequirements',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'ProposalExecuted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'eta', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'ProposalQueued',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'oldProposalThresholdBPS', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'newProposalThresholdBPS', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'ProposalThresholdBPSSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'ProposalVetoed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'oldQuorumCoefficient', internalType: 'uint32', type: 'uint32', indexed: false },
      { name: 'newQuorumCoefficient', internalType: 'uint32', type: 'uint32', indexed: false },
    ],
    name: 'QuorumCoefficientSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'oldQuorumVotesBPS', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'newQuorumVotesBPS', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'QuorumVotesBPSSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'voter', internalType: 'address', type: 'address', indexed: true },
      { name: 'refundAmount', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'refundSent', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'RefundableVote',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'voter', internalType: 'address', type: 'address', indexed: true },
      { name: 'proposalId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'support', internalType: 'uint8', type: 'uint8', indexed: false },
      { name: 'votes', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'reason', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'VoteCast',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'oldVotingDelay', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'newVotingDelay', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'VotingDelaySet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'oldVotingPeriod', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'newVotingPeriod', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'VotingPeriodSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'sent', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'Withdraw',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'BALLOT_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DOMAIN_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_PROPOSAL_THRESHOLD_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_QUORUM_VOTES_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_QUORUM_VOTES_BPS_UPPER_BOUND',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_REFUND_BASE_FEE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_REFUND_GAS_USED',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_REFUND_PRIORITY_FEE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_VOTING_DELAY',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_VOTING_PERIOD',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MIN_PROPOSAL_THRESHOLD_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MIN_QUORUM_VOTES_BPS_LOWER_BOUND',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MIN_QUORUM_VOTES_BPS_UPPER_BOUND',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MIN_VOTING_DELAY',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MIN_VOTING_PERIOD',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'REFUND_BASE_GAS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: '_acceptAdmin',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: '_acceptVetoer',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: '_burnVetoPower',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'newMinQuorumVotesBPS', internalType: 'uint16', type: 'uint16' },
      { name: 'newMaxQuorumVotesBPS', internalType: 'uint16', type: 'uint16' },
      { name: 'newQuorumCoefficient', internalType: 'uint32', type: 'uint32' },
    ],
    name: '_setDynamicQuorumParams',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newMaxQuorumVotesBPS', internalType: 'uint16', type: 'uint16' }],
    name: '_setMaxQuorumVotesBPS',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newMinQuorumVotesBPS', internalType: 'uint16', type: 'uint16' }],
    name: '_setMinQuorumVotesBPS',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newPendingAdmin', internalType: 'address', type: 'address' }],
    name: '_setPendingAdmin',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newPendingVetoer', internalType: 'address', type: 'address' }],
    name: '_setPendingVetoer',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newProposalThresholdBPS', internalType: 'uint256', type: 'uint256' }],
    name: '_setProposalThresholdBPS',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newQuorumCoefficient', internalType: 'uint32', type: 'uint32' }],
    name: '_setQuorumCoefficient',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newVotingDelay', internalType: 'uint256', type: 'uint256' }],
    name: '_setVotingDelay',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newVotingPeriod', internalType: 'uint256', type: 'uint256' }],
    name: '_setVotingPeriod',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: '_withdraw',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bool', type: 'bool' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'admin',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'proposalId', internalType: 'uint256', type: 'uint256' }],
    name: 'cancel',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'proposalId', internalType: 'uint256', type: 'uint256' },
      { name: 'support', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'castRefundableVote',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'proposalId', internalType: 'uint256', type: 'uint256' },
      { name: 'support', internalType: 'uint8', type: 'uint8' },
      { name: 'reason', internalType: 'string', type: 'string' },
    ],
    name: 'castRefundableVoteWithReason',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'proposalId', internalType: 'uint256', type: 'uint256' },
      { name: 'support', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'castVote',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'proposalId', internalType: 'uint256', type: 'uint256' },
      { name: 'support', internalType: 'uint8', type: 'uint8' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'castVoteBySig',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'proposalId', internalType: 'uint256', type: 'uint256' },
      { name: 'support', internalType: 'uint8', type: 'uint8' },
      { name: 'reason', internalType: 'string', type: 'string' },
    ],
    name: 'castVoteWithReason',
    outputs: [],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: 'againstVotes', internalType: 'uint256', type: 'uint256' },
      { name: 'totalSupply', internalType: 'uint256', type: 'uint256' },
      {
        name: 'params',
        internalType: 'struct GnarsDAOStorageV2.DynamicQuorumParams',
        type: 'tuple',
        components: [
          { name: 'minQuorumVotesBPS', internalType: 'uint16', type: 'uint16' },
          { name: 'maxQuorumVotesBPS', internalType: 'uint16', type: 'uint16' },
          { name: 'quorumCoefficient', internalType: 'uint32', type: 'uint32' },
        ],
      },
    ],
    name: 'dynamicQuorumVotes',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'proposalId', internalType: 'uint256', type: 'uint256' }],
    name: 'execute',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'proposalId', internalType: 'uint256', type: 'uint256' }],
    name: 'getActions',
    outputs: [
      { name: 'targets', internalType: 'address[]', type: 'address[]' },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'signatures', internalType: 'string[]', type: 'string[]' },
      { name: 'calldatas', internalType: 'bytes[]', type: 'bytes[]' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'blockNumber_', internalType: 'uint256', type: 'uint256' }],
    name: 'getDynamicQuorumParamsAt',
    outputs: [
      {
        name: '',
        internalType: 'struct GnarsDAOStorageV2.DynamicQuorumParams',
        type: 'tuple',
        components: [
          { name: 'minQuorumVotesBPS', internalType: 'uint16', type: 'uint16' },
          { name: 'maxQuorumVotesBPS', internalType: 'uint16', type: 'uint16' },
          { name: 'quorumCoefficient', internalType: 'uint32', type: 'uint32' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'proposalId', internalType: 'uint256', type: 'uint256' },
      { name: 'voter', internalType: 'address', type: 'address' },
    ],
    name: 'getReceipt',
    outputs: [
      {
        name: '',
        internalType: 'struct GnarsDAOStorageV1Adjusted.Receipt',
        type: 'tuple',
        components: [
          { name: 'hasVoted', internalType: 'bool', type: 'bool' },
          { name: 'support', internalType: 'uint8', type: 'uint8' },
          { name: 'votes', internalType: 'uint96', type: 'uint96' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'gnars',
    outputs: [{ name: '', internalType: 'contract GnarsTokenLike', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'implementation',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'timelock_', internalType: 'address', type: 'address' },
      { name: 'gnars_', internalType: 'address', type: 'address' },
      { name: 'vetoer_', internalType: 'address', type: 'address' },
      { name: 'votingPeriod_', internalType: 'uint256', type: 'uint256' },
      { name: 'votingDelay_', internalType: 'uint256', type: 'uint256' },
      { name: 'proposalThresholdBPS_', internalType: 'uint256', type: 'uint256' },
      {
        name: 'dynamicQuorumParams_',
        internalType: 'struct GnarsDAOStorageV2.DynamicQuorumParams',
        type: 'tuple',
        components: [
          { name: 'minQuorumVotesBPS', internalType: 'uint16', type: 'uint16' },
          { name: 'maxQuorumVotesBPS', internalType: 'uint16', type: 'uint16' },
          { name: 'quorumCoefficient', internalType: 'uint32', type: 'uint32' },
        ],
      },
    ],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'latestProposalIds',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'maxQuorumVotes',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'minQuorumVotes',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'pendingAdmin',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'pendingVetoer',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proposalCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proposalMaxOperations',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proposalThreshold',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proposalThresholdBPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'proposalId', internalType: 'uint256', type: 'uint256' }],
    name: 'proposals',
    outputs: [
      {
        name: '',
        internalType: 'struct GnarsDAOStorageV2.ProposalCondensed',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          { name: 'proposalThreshold', internalType: 'uint256', type: 'uint256' },
          { name: 'quorumVotes', internalType: 'uint256', type: 'uint256' },
          { name: 'eta', internalType: 'uint256', type: 'uint256' },
          { name: 'startBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'endBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'forVotes', internalType: 'uint256', type: 'uint256' },
          { name: 'againstVotes', internalType: 'uint256', type: 'uint256' },
          { name: 'abstainVotes', internalType: 'uint256', type: 'uint256' },
          { name: 'canceled', internalType: 'bool', type: 'bool' },
          { name: 'vetoed', internalType: 'bool', type: 'bool' },
          { name: 'executed', internalType: 'bool', type: 'bool' },
          { name: 'totalSupply', internalType: 'uint256', type: 'uint256' },
          { name: 'creationBlock', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'targets', internalType: 'address[]', type: 'address[]' },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'signatures', internalType: 'string[]', type: 'string[]' },
      { name: 'calldatas', internalType: 'bytes[]', type: 'bytes[]' },
      { name: 'description', internalType: 'string', type: 'string' },
    ],
    name: 'propose',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'proposalId', internalType: 'uint256', type: 'uint256' }],
    name: 'queue',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'quorumParamsCheckpoints',
    outputs: [
      { name: 'fromBlock', internalType: 'uint32', type: 'uint32' },
      {
        name: 'params',
        internalType: 'struct GnarsDAOStorageV2.DynamicQuorumParams',
        type: 'tuple',
        components: [
          { name: 'minQuorumVotesBPS', internalType: 'uint16', type: 'uint16' },
          { name: 'maxQuorumVotesBPS', internalType: 'uint16', type: 'uint16' },
          { name: 'quorumCoefficient', internalType: 'uint32', type: 'uint32' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'proposalId', internalType: 'uint256', type: 'uint256' }],
    name: 'quorumVotes',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'quorumVotesBPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'proposalId', internalType: 'uint256', type: 'uint256' }],
    name: 'state',
    outputs: [
      { name: '', internalType: 'enum GnarsDAOStorageV1Adjusted.ProposalState', type: 'uint8' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'timelock',
    outputs: [{ name: '', internalType: 'contract IGnarsDAOExecutor', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'proposalId', internalType: 'uint256', type: 'uint256' }],
    name: 'veto',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'vetoer',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'votingDelay',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'votingPeriod',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const gnarsDaoAddress = {
  1: '0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3',
} as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const gnarsDaoConfig = { address: gnarsDaoAddress, abi: gnarsDaoAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GnarsHD
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const gnarsHdAbi = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_gnarsV2Address', internalType: 'address', type: 'address' },
      { name: '_rendererBaseUri', internalType: 'string', type: 'string' },
      {
        name: '_artwork',
        internalType: 'struct GnarsHD.Artwork',
        type: 'tuple',
        components: [
          { name: 'ipfsFolder', internalType: 'string', type: 'string' },
          { name: 'amountBackgrounds', internalType: 'uint48', type: 'uint48' },
          { name: 'amountBodies', internalType: 'uint48', type: 'uint48' },
          { name: 'amountAccessories', internalType: 'uint48', type: 'uint48' },
          { name: 'amountHeads', internalType: 'uint48', type: 'uint48' },
          { name: 'amountNoggles', internalType: 'uint48', type: 'uint48' },
        ],
      },
      { name: '_contractURI', internalType: 'string', type: 'string' },
      { name: '_owner', internalType: 'address', type: 'address' },
    ],
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'TokenDoesNotExist',
  },
  { type: 'error', inputs: [], name: 'Untransferable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_from', internalType: 'address', type: 'address', indexed: true },
      { name: '_to', internalType: 'address', type: 'address', indexed: true },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'artwork',
    outputs: [
      { name: 'ipfsFolder', internalType: 'string', type: 'string' },
      { name: 'amountBackgrounds', internalType: 'uint48', type: 'uint48' },
      { name: 'amountBodies', internalType: 'uint48', type: 'uint48' },
      { name: 'amountAccessories', internalType: 'uint48', type: 'uint48' },
      { name: 'amountHeads', internalType: 'uint48', type: 'uint48' },
      { name: 'amountNoggles', internalType: 'uint48', type: 'uint48' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' }],
    name: 'assertOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'contractURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getAttributes',
    outputs: [
      { name: 'resultAttributes', internalType: 'string', type: 'string' },
      { name: 'queryString', internalType: 'string', type: 'string' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'backgroundIndex', internalType: 'uint48', type: 'uint48' }],
    name: 'getBackgroundQueryParam',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'folder', internalType: 'string', type: 'string' },
      { name: 'partIndex', internalType: 'uint48', type: 'uint48' },
      { name: 'amountOfPart', internalType: 'uint48', type: 'uint48' },
    ],
    name: 'getPartQueryParam',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'traitType', internalType: 'string', type: 'string' },
      { name: 'partIndex', internalType: 'uint48', type: 'uint48' },
      {
        name: 'getPartDescription',
        internalType: 'function (uint256) view external returns (string)',
        type: 'function',
      },
    ],
    name: 'getPartTrait',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'gnarsV2',
    outputs: [{ name: '', internalType: 'contract ISkateContractV2', type: 'address' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'isTransferable',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'rendererBaseUri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_artwork',
        internalType: 'struct GnarsHD.Artwork',
        type: 'tuple',
        components: [
          { name: 'ipfsFolder', internalType: 'string', type: 'string' },
          { name: 'amountBackgrounds', internalType: 'uint48', type: 'uint48' },
          { name: 'amountBodies', internalType: 'uint48', type: 'uint48' },
          { name: 'amountAccessories', internalType: 'uint48', type: 'uint48' },
          { name: 'amountHeads', internalType: 'uint48', type: 'uint48' },
          { name: 'amountNoggles', internalType: 'uint48', type: 'uint48' },
        ],
      },
    ],
    name: 'setArtwork',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_contractURI', internalType: 'string', type: 'string' }],
    name: 'setContractUri',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_rendererBaseUri', internalType: 'string', type: 'string' }],
    name: 'setRendererBaseUri',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_index', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
] as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const gnarsHdAddress = {
  1: '0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0',
} as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const gnarsHdConfig = { address: gnarsHdAddress, abi: gnarsHdAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GnarsOG
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const gnarsOgAbi = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_skate', internalType: 'address', type: 'address' },
      { name: '_dao', internalType: 'address', type: 'address' },
      { name: '_descriptor', internalType: 'address', type: 'address' },
      { name: '_seeder', internalType: 'address', type: 'address' },
      { name: '_reservePrice', internalType: 'uint256', type: 'uint256' },
      { name: '_minBidIncrementPercentage', internalType: 'uint8', type: 'uint8' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'gnarId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'sender', internalType: 'address', type: 'address', indexed: false },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'AuctionBid',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'gnarId', internalType: 'uint256', type: 'uint256', indexed: true }],
    name: 'AuctionCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'gnarId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'winner', internalType: 'address', type: 'address', indexed: false },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'AuctionSettled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'percent', internalType: 'uint8', type: 'uint8', indexed: false }],
    name: 'MinBidIncrementPercentageUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'price', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'ReservePriceUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'auction',
    outputs: [
      { name: 'gnarId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'startBlock', internalType: 'uint256', type: 'uint256' },
      { name: 'endBlock', internalType: 'uint256', type: 'uint256' },
      { name: 'bidder', internalType: 'address payable', type: 'address' },
      { name: 'skatePercent', internalType: 'uint8', type: 'uint8' },
      { name: 'daoPercent', internalType: 'uint8', type: 'uint8' },
      { name: 'settled', internalType: 'bool', type: 'bool' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'auctionPeriodBlocks',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'auctionStart',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'gnarId', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'gnarId', internalType: 'uint256', type: 'uint256' },
      { name: '_skatePercent', internalType: 'uint8', type: 'uint8' },
      { name: '_daoPercent', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'createBid',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'currentGnarId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'dao',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'descriptor',
    outputs: [{ name: '', internalType: 'contract IGnarDescriptor', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'minBidIncrementPercentage',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'pause', outputs: [] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'remainBlocks',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'reservePrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'seeder',
    outputs: [{ name: '', internalType: 'contract IGnarSeeder', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'seeds',
    outputs: [
      { name: 'background', internalType: 'uint48', type: 'uint48' },
      { name: 'body', internalType: 'uint48', type: 'uint48' },
      { name: 'accessory', internalType: 'uint48', type: 'uint48' },
      { name: 'head', internalType: 'uint48', type: 'uint48' },
      { name: 'glasses', internalType: 'uint48', type: 'uint48' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_auctionPeriodBlocks', internalType: 'uint16', type: 'uint16' }],
    name: 'setAuctionPeriodBlocks',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_descriptor', internalType: 'address', type: 'address' }],
    name: 'setDescriptor',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_minBidIncrementPercentage', internalType: 'uint8', type: 'uint8' }],
    name: 'setMinBidIncrementPercentage',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_reservePrice', internalType: 'uint256', type: 'uint256' }],
    name: 'setReservePrice',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_seeder', internalType: 'address', type: 'address' }],
    name: 'setSeeder',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_skate', internalType: 'address', type: 'address' },
      { name: '_dao', internalType: 'address', type: 'address' },
    ],
    name: 'setSkateDaoAddresses',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'settleCurrentAndCreateNewAuction',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'skate',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'unpause', outputs: [] },
] as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const gnarsOgAddress = {
  1: '0x494715B2a3C75DaDd24929835B658a1c19bd4552',
} as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const gnarsOgConfig = { address: gnarsOgAddress, abi: gnarsOgAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GnarsV2AuctionHouse
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const gnarsV2AuctionHouseAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousAdmin', internalType: 'address', type: 'address', indexed: false },
      { name: 'newAdmin', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'AdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'gnarId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'sender', internalType: 'address', type: 'address', indexed: false },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'AuctionBid',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'gnarId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'startTimestamp', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'endTimestamp', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'AuctionCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'gnarId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'endTime', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'AuctionExtended',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'minBidIncrementPercentage',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AuctionMinBidIncrementPercentageUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'reservePrice', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'AuctionReservePriceUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'gnarId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'winner', internalType: 'address', type: 'address', indexed: false },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'AuctionSettled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'timeBuffer', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'AuctionTimeBufferUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'beacon', internalType: 'address', type: 'address', indexed: true }],
    name: 'BeaconUpgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'ogGnarId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'OGGnarClaimed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'account', internalType: 'address', type: 'address', indexed: false }],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'skate', internalType: 'address', type: 'address', indexed: false },
      { name: 'dao', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'SkateDaoAddressesUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'account', internalType: 'address', type: 'address', indexed: false }],
    name: 'Unpaused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address', indexed: true }],
    name: 'Upgraded',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'SKATE_OG_ADDRESS',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'auction',
    outputs: [
      { name: 'gnarId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'startTimestamp', internalType: 'uint256', type: 'uint256' },
      { name: 'endTimestamp', internalType: 'uint256', type: 'uint256' },
      { name: 'bidder', internalType: 'address payable', type: 'address' },
      { name: 'skatePercent', internalType: 'uint8', type: 'uint8' },
      { name: 'daoPercent', internalType: 'uint8', type: 'uint8' },
      { name: 'settled', internalType: 'bool', type: 'bool' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'auctionCounter',
    outputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'baseAuctionTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'ogGnarIds', internalType: 'uint256[]', type: 'uint256[]' }],
    name: 'claimGnars',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'gnarId', internalType: 'uint256', type: 'uint256' },
      { name: 'skatePercent', internalType: 'uint8', type: 'uint8' },
      { name: 'daoPercent', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'createBid',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'dao',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'gnars',
    outputs: [{ name: '', internalType: 'contract ISkateContractV2', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'gnarsClaimedFor',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_skate', internalType: 'address', type: 'address' },
      { name: '_dao', internalType: 'address', type: 'address' },
      { name: '_gnars', internalType: 'contract ISkateContractV2', type: 'address' },
      { name: '_weth', internalType: 'address', type: 'address' },
      { name: '_reservePrice', internalType: 'uint256', type: 'uint256' },
      { name: '_minBidIncrementPercentage', internalType: 'uint8', type: 'uint8' },
      { name: '_baseAuctionTime', internalType: 'uint256', type: 'uint256' },
      { name: '_timeDoublingCount', internalType: 'uint256', type: 'uint256' },
      { name: '_timeBuffer', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'minBidIncrementPercentage',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'pause', outputs: [] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'remainingTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'reservePrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_minBidIncrementPercentage', internalType: 'uint8', type: 'uint8' }],
    name: 'setMinBidIncrementPercentage',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_reservePrice', internalType: 'uint256', type: 'uint256' }],
    name: 'setReservePrice',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_skate', internalType: 'address', type: 'address' },
      { name: '_dao', internalType: 'address', type: 'address' },
    ],
    name: 'setSkateDaoAddresses',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_timeBuffer', internalType: 'uint256', type: 'uint256' }],
    name: 'setTimeBuffer',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'settleAuction',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'settleCurrentAndCreateNewAuction',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'skate',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'timeBuffer',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'timeDoublingCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'unpause', outputs: [] },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newImplementation', internalType: 'address', type: 'address' }],
    name: 'upgradeTo',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'weth',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
] as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const gnarsV2AuctionHouseAddress = {
  1: '0xC28e0d3c00296dD8c5C3F2E9707361920f92a209',
} as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const gnarsV2AuctionHouseConfig = {
  address: gnarsV2AuctionHouseAddress,
  abi: gnarsV2AuctionHouseAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GnarsV2Token
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const gnarsV2TokenAbi = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_noundersDAO', internalType: 'address', type: 'address' },
      { name: '_minter', internalType: 'address', type: 'address' },
      { name: '_descriptor', internalType: 'contract IGnarDescriptorV2', type: 'address' },
      { name: '_seeder', internalType: 'contract IGnarSeederV2', type: 'address' },
      { name: '_proxyRegistry', internalType: 'contract IProxyRegistry', type: 'address' },
      { name: '_initialGnarId', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'delegator', internalType: 'address', type: 'address', indexed: true },
      { name: 'fromDelegate', internalType: 'address', type: 'address', indexed: true },
      { name: 'toDelegate', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'DelegateChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'delegate', internalType: 'address', type: 'address', indexed: true },
      { name: 'previousBalance', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'newBalance', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'DelegateVotesChanged',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'DescriptorLocked' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'descriptor',
        internalType: 'contract IGnarDescriptorV2',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DescriptorUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true }],
    name: 'GnarBurned',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'seed',
        internalType: 'struct IGnarSeederV2.Seed',
        type: 'tuple',
        components: [
          { name: 'background', internalType: 'uint48', type: 'uint48' },
          { name: 'body', internalType: 'uint48', type: 'uint48' },
          { name: 'accessory', internalType: 'uint48', type: 'uint48' },
          { name: 'head', internalType: 'uint48', type: 'uint48' },
          { name: 'glasses', internalType: 'uint48', type: 'uint48' },
        ],
        indexed: false,
      },
    ],
    name: 'GnarCreated',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'MinterLocked' },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'minter', internalType: 'address', type: 'address', indexed: false }],
    name: 'MinterUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'SeederLocked' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'seeder', internalType: 'contract IGnarSeederV2', type: 'address', indexed: false },
    ],
    name: 'SeederUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DELEGATION_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DOMAIN_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'gnarId', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint32', type: 'uint32' },
    ],
    name: 'checkpoints',
    outputs: [
      { name: 'fromBlock', internalType: 'uint32', type: 'uint32' },
      { name: 'votes', internalType: 'uint96', type: 'uint96' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'customDescription',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'delegatee', internalType: 'address', type: 'address' }],
    name: 'delegate',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'delegatee', internalType: 'address', type: 'address' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'expiry', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'delegateBySig',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'delegator', internalType: 'address', type: 'address' }],
    name: 'delegates',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'descriptor',
    outputs: [{ name: '', internalType: 'contract IGnarDescriptorV2', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'getCurrentVotes',
    outputs: [{ name: '', internalType: 'uint96', type: 'uint96' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getPriorVotes',
    outputs: [{ name: '', internalType: 'uint96', type: 'uint96' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'initialGnarId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'isDescriptorLocked',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'isMinterLocked',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'isSeederLocked',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'lockDescriptor',
    outputs: [],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'lockMinter', outputs: [] },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'lockSeeder', outputs: [] },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'mint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'minter',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'noundersDAO',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'numCheckpoints',
    outputs: [{ name: '', internalType: 'uint32', type: 'uint32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proxyRegistry',
    outputs: [{ name: '', internalType: 'contract IProxyRegistry', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'seeder',
    outputs: [{ name: '', internalType: 'contract IGnarSeederV2', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'seeds',
    outputs: [
      { name: 'background', internalType: 'uint48', type: 'uint48' },
      { name: 'body', internalType: 'uint48', type: 'uint48' },
      { name: 'accessory', internalType: 'uint48', type: 'uint48' },
      { name: 'head', internalType: 'uint48', type: 'uint48' },
      { name: 'glasses', internalType: 'uint48', type: 'uint48' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_description', internalType: 'string', type: 'string' },
    ],
    name: 'setCustomDescription',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_descriptor', internalType: 'contract IGnarDescriptorV2', type: 'address' }],
    name: 'setDescriptor',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_minter', internalType: 'address', type: 'address' }],
    name: 'setMinter',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_seeder', internalType: 'contract IGnarSeederV2', type: 'address' }],
    name: 'setSeeder',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'viewDescription',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'delegator', internalType: 'address', type: 'address' }],
    name: 'votesToDelegate',
    outputs: [{ name: '', internalType: 'uint96', type: 'uint96' }],
  },
] as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const gnarsV2TokenAddress = {
  1: '0x558BFFF0D583416f7C4e380625c7865821b8E95C',
} as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const gnarsV2TokenConfig = { address: gnarsV2TokenAddress, abi: gnarsV2TokenAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NNSENSReverseResolver
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x849F92178950f6254db5D16D1ba265E70521aC1B)
 */
export const nnsensReverseResolverAbi = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_nns', internalType: 'address', type: 'address' },
      { name: '_ens', internalType: 'address', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ens',
    outputs: [{ name: '', internalType: 'contract ENS', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'nns',
    outputs: [{ name: '', internalType: 'contract ENS', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'resolve',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
] as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x849F92178950f6254db5D16D1ba265E70521aC1B)
 */
export const nnsensReverseResolverAddress = {
  1: '0x849F92178950f6254db5D16D1ba265E70521aC1B',
} as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x849F92178950f6254db5D16D1ba265E70521aC1B)
 */
export const nnsensReverseResolverConfig = {
  address: nnsensReverseResolverAddress,
  abi: nnsensReverseResolverAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDao = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"BALLOT_TYPEHASH"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoBallotTypehash = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'BALLOT_TYPEHASH',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"DOMAIN_TYPEHASH"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoDomainTypehash = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'DOMAIN_TYPEHASH',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"MAX_PROPOSAL_THRESHOLD_BPS"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoMaxProposalThresholdBps = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'MAX_PROPOSAL_THRESHOLD_BPS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"MAX_QUORUM_VOTES_BPS"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoMaxQuorumVotesBps = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'MAX_QUORUM_VOTES_BPS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"MAX_QUORUM_VOTES_BPS_UPPER_BOUND"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoMaxQuorumVotesBpsUpperBound = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'MAX_QUORUM_VOTES_BPS_UPPER_BOUND',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"MAX_REFUND_BASE_FEE"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoMaxRefundBaseFee = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'MAX_REFUND_BASE_FEE',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"MAX_REFUND_GAS_USED"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoMaxRefundGasUsed = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'MAX_REFUND_GAS_USED',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"MAX_REFUND_PRIORITY_FEE"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoMaxRefundPriorityFee = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'MAX_REFUND_PRIORITY_FEE',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"MAX_VOTING_DELAY"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoMaxVotingDelay = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'MAX_VOTING_DELAY',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"MAX_VOTING_PERIOD"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoMaxVotingPeriod = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'MAX_VOTING_PERIOD',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"MIN_PROPOSAL_THRESHOLD_BPS"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoMinProposalThresholdBps = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'MIN_PROPOSAL_THRESHOLD_BPS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"MIN_QUORUM_VOTES_BPS_LOWER_BOUND"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoMinQuorumVotesBpsLowerBound = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'MIN_QUORUM_VOTES_BPS_LOWER_BOUND',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"MIN_QUORUM_VOTES_BPS_UPPER_BOUND"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoMinQuorumVotesBpsUpperBound = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'MIN_QUORUM_VOTES_BPS_UPPER_BOUND',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"MIN_VOTING_DELAY"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoMinVotingDelay = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'MIN_VOTING_DELAY',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"MIN_VOTING_PERIOD"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoMinVotingPeriod = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'MIN_VOTING_PERIOD',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"REFUND_BASE_GAS"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoRefundBaseGas = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'REFUND_BASE_GAS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"admin"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoAdmin = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'admin',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"dynamicQuorumVotes"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoDynamicQuorumVotes = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'dynamicQuorumVotes',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"getActions"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoGetActions = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'getActions',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"getDynamicQuorumParamsAt"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoGetDynamicQuorumParamsAt = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'getDynamicQuorumParamsAt',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"getReceipt"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoGetReceipt = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'getReceipt',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"gnars"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoGnars = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'gnars',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"implementation"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoImplementation = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'implementation',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"latestProposalIds"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoLatestProposalIds = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'latestProposalIds',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"maxQuorumVotes"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoMaxQuorumVotes = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'maxQuorumVotes',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"minQuorumVotes"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoMinQuorumVotes = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'minQuorumVotes',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoName = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"pendingAdmin"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoPendingAdmin = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'pendingAdmin',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"pendingVetoer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoPendingVetoer = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'pendingVetoer',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"proposalCount"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoProposalCount = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'proposalCount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"proposalMaxOperations"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoProposalMaxOperations = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'proposalMaxOperations',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"proposalThreshold"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoProposalThreshold = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'proposalThreshold',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"proposalThresholdBPS"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoProposalThresholdBps = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'proposalThresholdBPS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"proposals"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoProposals = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'proposals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"quorumParamsCheckpoints"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoQuorumParamsCheckpoints = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'quorumParamsCheckpoints',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"quorumVotes"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoQuorumVotes = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'quorumVotes',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"quorumVotesBPS"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoQuorumVotesBps = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'quorumVotesBPS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"state"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoState = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'state',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"timelock"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoTimelock = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'timelock',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"vetoer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoVetoer = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'vetoer',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"votingDelay"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoVotingDelay = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'votingDelay',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"votingPeriod"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useReadGnarsDaoVotingPeriod = /*#__PURE__*/ createUseReadContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'votingPeriod',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsDaoAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWriteGnarsDao = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"_acceptAdmin"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWriteGnarsDaoAcceptAdmin = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: '_acceptAdmin',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"_acceptVetoer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWriteGnarsDaoAcceptVetoer = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: '_acceptVetoer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"_burnVetoPower"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWriteGnarsDaoBurnVetoPower = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: '_burnVetoPower',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"_setDynamicQuorumParams"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWriteGnarsDaoSetDynamicQuorumParams = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: '_setDynamicQuorumParams',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"_setMaxQuorumVotesBPS"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWriteGnarsDaoSetMaxQuorumVotesBps = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: '_setMaxQuorumVotesBPS',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"_setMinQuorumVotesBPS"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWriteGnarsDaoSetMinQuorumVotesBps = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: '_setMinQuorumVotesBPS',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"_setPendingAdmin"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWriteGnarsDaoSetPendingAdmin = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: '_setPendingAdmin',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"_setPendingVetoer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWriteGnarsDaoSetPendingVetoer = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: '_setPendingVetoer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"_setProposalThresholdBPS"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWriteGnarsDaoSetProposalThresholdBps = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: '_setProposalThresholdBPS',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"_setQuorumCoefficient"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWriteGnarsDaoSetQuorumCoefficient = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: '_setQuorumCoefficient',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"_setVotingDelay"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWriteGnarsDaoSetVotingDelay = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: '_setVotingDelay',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"_setVotingPeriod"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWriteGnarsDaoSetVotingPeriod = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: '_setVotingPeriod',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"_withdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWriteGnarsDaoWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: '_withdraw',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"cancel"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWriteGnarsDaoCancel = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'cancel',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"castRefundableVote"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWriteGnarsDaoCastRefundableVote = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'castRefundableVote',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"castRefundableVoteWithReason"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWriteGnarsDaoCastRefundableVoteWithReason = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'castRefundableVoteWithReason',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"castVote"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWriteGnarsDaoCastVote = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'castVote',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"castVoteBySig"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWriteGnarsDaoCastVoteBySig = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'castVoteBySig',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"castVoteWithReason"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWriteGnarsDaoCastVoteWithReason = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'castVoteWithReason',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"execute"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWriteGnarsDaoExecute = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'execute',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"initialize"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWriteGnarsDaoInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'initialize',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"propose"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWriteGnarsDaoPropose = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'propose',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"queue"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWriteGnarsDaoQueue = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'queue',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"veto"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWriteGnarsDaoVeto = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'veto',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsDaoAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useSimulateGnarsDao = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"_acceptAdmin"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useSimulateGnarsDaoAcceptAdmin = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: '_acceptAdmin',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"_acceptVetoer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useSimulateGnarsDaoAcceptVetoer = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: '_acceptVetoer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"_burnVetoPower"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useSimulateGnarsDaoBurnVetoPower = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: '_burnVetoPower',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"_setDynamicQuorumParams"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useSimulateGnarsDaoSetDynamicQuorumParams = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: '_setDynamicQuorumParams',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"_setMaxQuorumVotesBPS"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useSimulateGnarsDaoSetMaxQuorumVotesBps = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: '_setMaxQuorumVotesBPS',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"_setMinQuorumVotesBPS"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useSimulateGnarsDaoSetMinQuorumVotesBps = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: '_setMinQuorumVotesBPS',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"_setPendingAdmin"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useSimulateGnarsDaoSetPendingAdmin = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: '_setPendingAdmin',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"_setPendingVetoer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useSimulateGnarsDaoSetPendingVetoer = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: '_setPendingVetoer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"_setProposalThresholdBPS"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useSimulateGnarsDaoSetProposalThresholdBps = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: '_setProposalThresholdBPS',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"_setQuorumCoefficient"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useSimulateGnarsDaoSetQuorumCoefficient = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: '_setQuorumCoefficient',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"_setVotingDelay"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useSimulateGnarsDaoSetVotingDelay = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: '_setVotingDelay',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"_setVotingPeriod"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useSimulateGnarsDaoSetVotingPeriod = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: '_setVotingPeriod',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"_withdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useSimulateGnarsDaoWithdraw = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: '_withdraw',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"cancel"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useSimulateGnarsDaoCancel = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'cancel',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"castRefundableVote"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useSimulateGnarsDaoCastRefundableVote = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'castRefundableVote',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"castRefundableVoteWithReason"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useSimulateGnarsDaoCastRefundableVoteWithReason =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gnarsDaoAbi,
    address: gnarsDaoAddress,
    functionName: 'castRefundableVoteWithReason',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"castVote"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useSimulateGnarsDaoCastVote = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'castVote',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"castVoteBySig"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useSimulateGnarsDaoCastVoteBySig = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'castVoteBySig',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"castVoteWithReason"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useSimulateGnarsDaoCastVoteWithReason = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'castVoteWithReason',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"execute"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useSimulateGnarsDaoExecute = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'execute',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"initialize"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useSimulateGnarsDaoInitialize = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'initialize',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"propose"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useSimulateGnarsDaoPropose = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'propose',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"queue"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useSimulateGnarsDaoQueue = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'queue',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsDaoAbi}__ and `functionName` set to `"veto"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useSimulateGnarsDaoVeto = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  functionName: 'veto',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsDaoAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWatchGnarsDaoEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsDaoAbi}__ and `eventName` set to `"MaxQuorumVotesBPSSet"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWatchGnarsDaoMaxQuorumVotesBpsSetEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  eventName: 'MaxQuorumVotesBPSSet',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsDaoAbi}__ and `eventName` set to `"MinQuorumVotesBPSSet"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWatchGnarsDaoMinQuorumVotesBpsSetEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  eventName: 'MinQuorumVotesBPSSet',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsDaoAbi}__ and `eventName` set to `"NewAdmin"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWatchGnarsDaoNewAdminEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  eventName: 'NewAdmin',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsDaoAbi}__ and `eventName` set to `"NewImplementation"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWatchGnarsDaoNewImplementationEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  eventName: 'NewImplementation',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsDaoAbi}__ and `eventName` set to `"NewPendingAdmin"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWatchGnarsDaoNewPendingAdminEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  eventName: 'NewPendingAdmin',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsDaoAbi}__ and `eventName` set to `"NewPendingVetoer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWatchGnarsDaoNewPendingVetoerEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  eventName: 'NewPendingVetoer',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsDaoAbi}__ and `eventName` set to `"NewVetoer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWatchGnarsDaoNewVetoerEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  eventName: 'NewVetoer',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsDaoAbi}__ and `eventName` set to `"ProposalCanceled"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWatchGnarsDaoProposalCanceledEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  eventName: 'ProposalCanceled',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsDaoAbi}__ and `eventName` set to `"ProposalCreated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWatchGnarsDaoProposalCreatedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  eventName: 'ProposalCreated',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsDaoAbi}__ and `eventName` set to `"ProposalCreatedWithRequirements"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWatchGnarsDaoProposalCreatedWithRequirementsEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gnarsDaoAbi,
    address: gnarsDaoAddress,
    eventName: 'ProposalCreatedWithRequirements',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsDaoAbi}__ and `eventName` set to `"ProposalExecuted"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWatchGnarsDaoProposalExecutedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  eventName: 'ProposalExecuted',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsDaoAbi}__ and `eventName` set to `"ProposalQueued"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWatchGnarsDaoProposalQueuedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  eventName: 'ProposalQueued',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsDaoAbi}__ and `eventName` set to `"ProposalThresholdBPSSet"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWatchGnarsDaoProposalThresholdBpsSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gnarsDaoAbi,
    address: gnarsDaoAddress,
    eventName: 'ProposalThresholdBPSSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsDaoAbi}__ and `eventName` set to `"ProposalVetoed"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWatchGnarsDaoProposalVetoedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  eventName: 'ProposalVetoed',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsDaoAbi}__ and `eventName` set to `"QuorumCoefficientSet"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWatchGnarsDaoQuorumCoefficientSetEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  eventName: 'QuorumCoefficientSet',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsDaoAbi}__ and `eventName` set to `"QuorumVotesBPSSet"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWatchGnarsDaoQuorumVotesBpsSetEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  eventName: 'QuorumVotesBPSSet',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsDaoAbi}__ and `eventName` set to `"RefundableVote"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWatchGnarsDaoRefundableVoteEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  eventName: 'RefundableVote',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsDaoAbi}__ and `eventName` set to `"VoteCast"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWatchGnarsDaoVoteCastEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  eventName: 'VoteCast',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsDaoAbi}__ and `eventName` set to `"VotingDelaySet"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWatchGnarsDaoVotingDelaySetEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  eventName: 'VotingDelaySet',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsDaoAbi}__ and `eventName` set to `"VotingPeriodSet"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWatchGnarsDaoVotingPeriodSetEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  eventName: 'VotingPeriodSet',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsDaoAbi}__ and `eventName` set to `"Withdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3)
 */
export const useWatchGnarsDaoWithdrawEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsDaoAbi,
  address: gnarsDaoAddress,
  eventName: 'Withdraw',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsHdAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useReadGnarsHd = /*#__PURE__*/ createUseReadContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useReadGnarsHdApprove = /*#__PURE__*/ createUseReadContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"artwork"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useReadGnarsHdArtwork = /*#__PURE__*/ createUseReadContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'artwork',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useReadGnarsHdBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"contractURI"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useReadGnarsHdContractUri = /*#__PURE__*/ createUseReadContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'contractURI',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"getAttributes"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useReadGnarsHdGetAttributes = /*#__PURE__*/ createUseReadContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'getAttributes',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"getBackgroundQueryParam"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useReadGnarsHdGetBackgroundQueryParam = /*#__PURE__*/ createUseReadContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'getBackgroundQueryParam',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"getPartQueryParam"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useReadGnarsHdGetPartQueryParam = /*#__PURE__*/ createUseReadContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'getPartQueryParam',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"getPartTrait"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useReadGnarsHdGetPartTrait = /*#__PURE__*/ createUseReadContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'getPartTrait',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"gnarsV2"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useReadGnarsHdGnarsV2 = /*#__PURE__*/ createUseReadContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'gnarsV2',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"isTransferable"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useReadGnarsHdIsTransferable = /*#__PURE__*/ createUseReadContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'isTransferable',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useReadGnarsHdName = /*#__PURE__*/ createUseReadContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useReadGnarsHdOwner = /*#__PURE__*/ createUseReadContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"ownerOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useReadGnarsHdOwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"rendererBaseUri"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useReadGnarsHdRendererBaseUri = /*#__PURE__*/ createUseReadContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'rendererBaseUri',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useReadGnarsHdSafeTransferFrom = /*#__PURE__*/ createUseReadContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useReadGnarsHdSetApprovalForAll = /*#__PURE__*/ createUseReadContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useReadGnarsHdSupportsInterface = /*#__PURE__*/ createUseReadContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"symbol"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useReadGnarsHdSymbol = /*#__PURE__*/ createUseReadContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"tokenByIndex"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useReadGnarsHdTokenByIndex = /*#__PURE__*/ createUseReadContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'tokenByIndex',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"tokenOfOwnerByIndex"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useReadGnarsHdTokenOfOwnerByIndex = /*#__PURE__*/ createUseReadContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'tokenOfOwnerByIndex',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"tokenURI"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useReadGnarsHdTokenUri = /*#__PURE__*/ createUseReadContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useReadGnarsHdTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useReadGnarsHdTransferFrom = /*#__PURE__*/ createUseReadContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsHdAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useWriteGnarsHd = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"assertOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useWriteGnarsHdAssertOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'assertOwnership',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"setArtwork"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useWriteGnarsHdSetArtwork = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'setArtwork',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"setContractUri"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useWriteGnarsHdSetContractUri = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'setContractUri',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"setRendererBaseUri"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useWriteGnarsHdSetRendererBaseUri = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'setRendererBaseUri',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useWriteGnarsHdTransferOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsHdAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useSimulateGnarsHd = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"assertOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useSimulateGnarsHdAssertOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'assertOwnership',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"setArtwork"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useSimulateGnarsHdSetArtwork = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'setArtwork',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"setContractUri"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useSimulateGnarsHdSetContractUri = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'setContractUri',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"setRendererBaseUri"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useSimulateGnarsHdSetRendererBaseUri = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'setRendererBaseUri',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsHdAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useSimulateGnarsHdTransferOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsHdAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useWatchGnarsHdEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsHdAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useWatchGnarsHdOwnershipTransferredEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  eventName: 'OwnershipTransferred',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsHdAbi}__ and `eventName` set to `"Transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0)
 */
export const useWatchGnarsHdTransferEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsHdAbi,
  address: gnarsHdAddress,
  eventName: 'Transfer',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsOgAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useReadGnarsOg = /*#__PURE__*/ createUseReadContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"auction"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useReadGnarsOgAuction = /*#__PURE__*/ createUseReadContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'auction',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"auctionPeriodBlocks"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useReadGnarsOgAuctionPeriodBlocks = /*#__PURE__*/ createUseReadContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'auctionPeriodBlocks',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useReadGnarsOgBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"currentGnarId"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useReadGnarsOgCurrentGnarId = /*#__PURE__*/ createUseReadContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'currentGnarId',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"dao"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useReadGnarsOgDao = /*#__PURE__*/ createUseReadContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'dao',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"descriptor"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useReadGnarsOgDescriptor = /*#__PURE__*/ createUseReadContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'descriptor',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"getApproved"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useReadGnarsOgGetApproved = /*#__PURE__*/ createUseReadContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useReadGnarsOgIsApprovedForAll = /*#__PURE__*/ createUseReadContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"minBidIncrementPercentage"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useReadGnarsOgMinBidIncrementPercentage = /*#__PURE__*/ createUseReadContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'minBidIncrementPercentage',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useReadGnarsOgName = /*#__PURE__*/ createUseReadContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useReadGnarsOgOwner = /*#__PURE__*/ createUseReadContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"ownerOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useReadGnarsOgOwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"paused"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useReadGnarsOgPaused = /*#__PURE__*/ createUseReadContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'paused',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"remainBlocks"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useReadGnarsOgRemainBlocks = /*#__PURE__*/ createUseReadContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'remainBlocks',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"reservePrice"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useReadGnarsOgReservePrice = /*#__PURE__*/ createUseReadContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'reservePrice',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"seeder"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useReadGnarsOgSeeder = /*#__PURE__*/ createUseReadContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'seeder',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"seeds"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useReadGnarsOgSeeds = /*#__PURE__*/ createUseReadContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'seeds',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"skate"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useReadGnarsOgSkate = /*#__PURE__*/ createUseReadContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'skate',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useReadGnarsOgSupportsInterface = /*#__PURE__*/ createUseReadContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"symbol"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useReadGnarsOgSymbol = /*#__PURE__*/ createUseReadContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"tokenByIndex"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useReadGnarsOgTokenByIndex = /*#__PURE__*/ createUseReadContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'tokenByIndex',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"tokenOfOwnerByIndex"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useReadGnarsOgTokenOfOwnerByIndex = /*#__PURE__*/ createUseReadContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'tokenOfOwnerByIndex',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"tokenURI"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useReadGnarsOgTokenUri = /*#__PURE__*/ createUseReadContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useReadGnarsOgTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsOgAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useWriteGnarsOg = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useWriteGnarsOgApprove = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"auctionStart"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useWriteGnarsOgAuctionStart = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'auctionStart',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"burn"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useWriteGnarsOgBurn = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"createBid"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useWriteGnarsOgCreateBid = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'createBid',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"pause"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useWriteGnarsOgPause = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useWriteGnarsOgRenounceOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useWriteGnarsOgSafeTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useWriteGnarsOgSetApprovalForAll = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"setAuctionPeriodBlocks"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useWriteGnarsOgSetAuctionPeriodBlocks = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'setAuctionPeriodBlocks',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"setDescriptor"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useWriteGnarsOgSetDescriptor = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'setDescriptor',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"setMinBidIncrementPercentage"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useWriteGnarsOgSetMinBidIncrementPercentage = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'setMinBidIncrementPercentage',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"setReservePrice"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useWriteGnarsOgSetReservePrice = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'setReservePrice',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"setSeeder"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useWriteGnarsOgSetSeeder = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'setSeeder',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"setSkateDaoAddresses"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useWriteGnarsOgSetSkateDaoAddresses = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'setSkateDaoAddresses',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"settleCurrentAndCreateNewAuction"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useWriteGnarsOgSettleCurrentAndCreateNewAuction = /*#__PURE__*/ createUseWriteContract(
  { abi: gnarsOgAbi, address: gnarsOgAddress, functionName: 'settleCurrentAndCreateNewAuction' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useWriteGnarsOgTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useWriteGnarsOgTransferOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"unpause"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useWriteGnarsOgUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'unpause',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsOgAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useSimulateGnarsOg = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useSimulateGnarsOgApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"auctionStart"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useSimulateGnarsOgAuctionStart = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'auctionStart',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"burn"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useSimulateGnarsOgBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"createBid"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useSimulateGnarsOgCreateBid = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'createBid',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"pause"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useSimulateGnarsOgPause = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useSimulateGnarsOgRenounceOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useSimulateGnarsOgSafeTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useSimulateGnarsOgSetApprovalForAll = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"setAuctionPeriodBlocks"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useSimulateGnarsOgSetAuctionPeriodBlocks = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'setAuctionPeriodBlocks',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"setDescriptor"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useSimulateGnarsOgSetDescriptor = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'setDescriptor',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"setMinBidIncrementPercentage"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useSimulateGnarsOgSetMinBidIncrementPercentage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gnarsOgAbi,
    address: gnarsOgAddress,
    functionName: 'setMinBidIncrementPercentage',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"setReservePrice"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useSimulateGnarsOgSetReservePrice = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'setReservePrice',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"setSeeder"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useSimulateGnarsOgSetSeeder = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'setSeeder',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"setSkateDaoAddresses"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useSimulateGnarsOgSetSkateDaoAddresses = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'setSkateDaoAddresses',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"settleCurrentAndCreateNewAuction"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useSimulateGnarsOgSettleCurrentAndCreateNewAuction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gnarsOgAbi,
    address: gnarsOgAddress,
    functionName: 'settleCurrentAndCreateNewAuction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useSimulateGnarsOgTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useSimulateGnarsOgTransferOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsOgAbi}__ and `functionName` set to `"unpause"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useSimulateGnarsOgUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  functionName: 'unpause',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsOgAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useWatchGnarsOgEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsOgAbi}__ and `eventName` set to `"Approval"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useWatchGnarsOgApprovalEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  eventName: 'Approval',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsOgAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useWatchGnarsOgApprovalForAllEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  eventName: 'ApprovalForAll',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsOgAbi}__ and `eventName` set to `"AuctionBid"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useWatchGnarsOgAuctionBidEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  eventName: 'AuctionBid',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsOgAbi}__ and `eventName` set to `"AuctionCreated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useWatchGnarsOgAuctionCreatedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  eventName: 'AuctionCreated',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsOgAbi}__ and `eventName` set to `"AuctionSettled"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useWatchGnarsOgAuctionSettledEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  eventName: 'AuctionSettled',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsOgAbi}__ and `eventName` set to `"MinBidIncrementPercentageUpdated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useWatchGnarsOgMinBidIncrementPercentageUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gnarsOgAbi,
    address: gnarsOgAddress,
    eventName: 'MinBidIncrementPercentageUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsOgAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useWatchGnarsOgOwnershipTransferredEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  eventName: 'OwnershipTransferred',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsOgAbi}__ and `eventName` set to `"ReservePriceUpdated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useWatchGnarsOgReservePriceUpdatedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  eventName: 'ReservePriceUpdated',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsOgAbi}__ and `eventName` set to `"Transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552)
 */
export const useWatchGnarsOgTransferEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsOgAbi,
  address: gnarsOgAddress,
  eventName: 'Transfer',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useReadGnarsV2AuctionHouse = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"SKATE_OG_ADDRESS"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useReadGnarsV2AuctionHouseSkateOgAddress = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'SKATE_OG_ADDRESS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"auction"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useReadGnarsV2AuctionHouseAuction = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'auction',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"auctionCounter"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useReadGnarsV2AuctionHouseAuctionCounter = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'auctionCounter',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"baseAuctionTime"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useReadGnarsV2AuctionHouseBaseAuctionTime = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'baseAuctionTime',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"dao"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useReadGnarsV2AuctionHouseDao = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'dao',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"gnars"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useReadGnarsV2AuctionHouseGnars = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'gnars',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"gnarsClaimedFor"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useReadGnarsV2AuctionHouseGnarsClaimedFor = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'gnarsClaimedFor',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"minBidIncrementPercentage"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useReadGnarsV2AuctionHouseMinBidIncrementPercentage =
  /*#__PURE__*/ createUseReadContract({
    abi: gnarsV2AuctionHouseAbi,
    address: gnarsV2AuctionHouseAddress,
    functionName: 'minBidIncrementPercentage',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useReadGnarsV2AuctionHouseOwner = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"paused"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useReadGnarsV2AuctionHousePaused = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'paused',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"remainingTime"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useReadGnarsV2AuctionHouseRemainingTime = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'remainingTime',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"reservePrice"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useReadGnarsV2AuctionHouseReservePrice = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'reservePrice',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"skate"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useReadGnarsV2AuctionHouseSkate = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'skate',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"timeBuffer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useReadGnarsV2AuctionHouseTimeBuffer = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'timeBuffer',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"timeDoublingCount"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useReadGnarsV2AuctionHouseTimeDoublingCount = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'timeDoublingCount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"weth"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useReadGnarsV2AuctionHouseWeth = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'weth',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWriteGnarsV2AuctionHouse = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"claimGnars"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWriteGnarsV2AuctionHouseClaimGnars = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'claimGnars',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"createBid"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWriteGnarsV2AuctionHouseCreateBid = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'createBid',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"initialize"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWriteGnarsV2AuctionHouseInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'initialize',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"pause"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWriteGnarsV2AuctionHousePause = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWriteGnarsV2AuctionHouseRenounceOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"setMinBidIncrementPercentage"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWriteGnarsV2AuctionHouseSetMinBidIncrementPercentage =
  /*#__PURE__*/ createUseWriteContract({
    abi: gnarsV2AuctionHouseAbi,
    address: gnarsV2AuctionHouseAddress,
    functionName: 'setMinBidIncrementPercentage',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"setReservePrice"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWriteGnarsV2AuctionHouseSetReservePrice = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'setReservePrice',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"setSkateDaoAddresses"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWriteGnarsV2AuctionHouseSetSkateDaoAddresses = /*#__PURE__*/ createUseWriteContract(
  {
    abi: gnarsV2AuctionHouseAbi,
    address: gnarsV2AuctionHouseAddress,
    functionName: 'setSkateDaoAddresses',
  },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"setTimeBuffer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWriteGnarsV2AuctionHouseSetTimeBuffer = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'setTimeBuffer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"settleAuction"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWriteGnarsV2AuctionHouseSettleAuction = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'settleAuction',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"settleCurrentAndCreateNewAuction"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWriteGnarsV2AuctionHouseSettleCurrentAndCreateNewAuction =
  /*#__PURE__*/ createUseWriteContract({
    abi: gnarsV2AuctionHouseAbi,
    address: gnarsV2AuctionHouseAddress,
    functionName: 'settleCurrentAndCreateNewAuction',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWriteGnarsV2AuctionHouseTransferOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"unpause"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWriteGnarsV2AuctionHouseUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'unpause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"upgradeTo"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWriteGnarsV2AuctionHouseUpgradeTo = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'upgradeTo',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWriteGnarsV2AuctionHouseUpgradeToAndCall = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'upgradeToAndCall',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useSimulateGnarsV2AuctionHouse = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"claimGnars"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useSimulateGnarsV2AuctionHouseClaimGnars = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'claimGnars',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"createBid"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useSimulateGnarsV2AuctionHouseCreateBid = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'createBid',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"initialize"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useSimulateGnarsV2AuctionHouseInitialize = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'initialize',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"pause"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useSimulateGnarsV2AuctionHousePause = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useSimulateGnarsV2AuctionHouseRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gnarsV2AuctionHouseAbi,
    address: gnarsV2AuctionHouseAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"setMinBidIncrementPercentage"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useSimulateGnarsV2AuctionHouseSetMinBidIncrementPercentage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gnarsV2AuctionHouseAbi,
    address: gnarsV2AuctionHouseAddress,
    functionName: 'setMinBidIncrementPercentage',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"setReservePrice"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useSimulateGnarsV2AuctionHouseSetReservePrice =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gnarsV2AuctionHouseAbi,
    address: gnarsV2AuctionHouseAddress,
    functionName: 'setReservePrice',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"setSkateDaoAddresses"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useSimulateGnarsV2AuctionHouseSetSkateDaoAddresses =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gnarsV2AuctionHouseAbi,
    address: gnarsV2AuctionHouseAddress,
    functionName: 'setSkateDaoAddresses',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"setTimeBuffer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useSimulateGnarsV2AuctionHouseSetTimeBuffer = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'setTimeBuffer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"settleAuction"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useSimulateGnarsV2AuctionHouseSettleAuction = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'settleAuction',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"settleCurrentAndCreateNewAuction"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useSimulateGnarsV2AuctionHouseSettleCurrentAndCreateNewAuction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gnarsV2AuctionHouseAbi,
    address: gnarsV2AuctionHouseAddress,
    functionName: 'settleCurrentAndCreateNewAuction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useSimulateGnarsV2AuctionHouseTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gnarsV2AuctionHouseAbi,
    address: gnarsV2AuctionHouseAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"unpause"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useSimulateGnarsV2AuctionHouseUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'unpause',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"upgradeTo"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useSimulateGnarsV2AuctionHouseUpgradeTo = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  functionName: 'upgradeTo',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useSimulateGnarsV2AuctionHouseUpgradeToAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gnarsV2AuctionHouseAbi,
    address: gnarsV2AuctionHouseAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWatchGnarsV2AuctionHouseEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `eventName` set to `"AdminChanged"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWatchGnarsV2AuctionHouseAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gnarsV2AuctionHouseAbi,
    address: gnarsV2AuctionHouseAddress,
    eventName: 'AdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `eventName` set to `"AuctionBid"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWatchGnarsV2AuctionHouseAuctionBidEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: gnarsV2AuctionHouseAbi, address: gnarsV2AuctionHouseAddress, eventName: 'AuctionBid' },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `eventName` set to `"AuctionCreated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWatchGnarsV2AuctionHouseAuctionCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gnarsV2AuctionHouseAbi,
    address: gnarsV2AuctionHouseAddress,
    eventName: 'AuctionCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `eventName` set to `"AuctionExtended"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWatchGnarsV2AuctionHouseAuctionExtendedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gnarsV2AuctionHouseAbi,
    address: gnarsV2AuctionHouseAddress,
    eventName: 'AuctionExtended',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `eventName` set to `"AuctionMinBidIncrementPercentageUpdated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWatchGnarsV2AuctionHouseAuctionMinBidIncrementPercentageUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gnarsV2AuctionHouseAbi,
    address: gnarsV2AuctionHouseAddress,
    eventName: 'AuctionMinBidIncrementPercentageUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `eventName` set to `"AuctionReservePriceUpdated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWatchGnarsV2AuctionHouseAuctionReservePriceUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gnarsV2AuctionHouseAbi,
    address: gnarsV2AuctionHouseAddress,
    eventName: 'AuctionReservePriceUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `eventName` set to `"AuctionSettled"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWatchGnarsV2AuctionHouseAuctionSettledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gnarsV2AuctionHouseAbi,
    address: gnarsV2AuctionHouseAddress,
    eventName: 'AuctionSettled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `eventName` set to `"AuctionTimeBufferUpdated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWatchGnarsV2AuctionHouseAuctionTimeBufferUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gnarsV2AuctionHouseAbi,
    address: gnarsV2AuctionHouseAddress,
    eventName: 'AuctionTimeBufferUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `eventName` set to `"BeaconUpgraded"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWatchGnarsV2AuctionHouseBeaconUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gnarsV2AuctionHouseAbi,
    address: gnarsV2AuctionHouseAddress,
    eventName: 'BeaconUpgraded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `eventName` set to `"OGGnarClaimed"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWatchGnarsV2AuctionHouseOgGnarClaimedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gnarsV2AuctionHouseAbi,
    address: gnarsV2AuctionHouseAddress,
    eventName: 'OGGnarClaimed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWatchGnarsV2AuctionHouseOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gnarsV2AuctionHouseAbi,
    address: gnarsV2AuctionHouseAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `eventName` set to `"Paused"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWatchGnarsV2AuctionHousePausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  eventName: 'Paused',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `eventName` set to `"SkateDaoAddressesUpdated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWatchGnarsV2AuctionHouseSkateDaoAddressesUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gnarsV2AuctionHouseAbi,
    address: gnarsV2AuctionHouseAddress,
    eventName: 'SkateDaoAddressesUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `eventName` set to `"Unpaused"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWatchGnarsV2AuctionHouseUnpausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  eventName: 'Unpaused',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2AuctionHouseAbi}__ and `eventName` set to `"Upgraded"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209)
 */
export const useWatchGnarsV2AuctionHouseUpgradedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsV2AuctionHouseAbi,
  address: gnarsV2AuctionHouseAddress,
  eventName: 'Upgraded',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2Token = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"DELEGATION_TYPEHASH"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenDelegationTypehash = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'DELEGATION_TYPEHASH',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"DOMAIN_TYPEHASH"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenDomainTypehash = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'DOMAIN_TYPEHASH',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"checkpoints"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenCheckpoints = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'checkpoints',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"customDescription"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenCustomDescription = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'customDescription',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"decimals"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenDecimals = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"delegates"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenDelegates = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'delegates',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"descriptor"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenDescriptor = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'descriptor',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"getApproved"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenGetApproved = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"getCurrentVotes"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenGetCurrentVotes = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'getCurrentVotes',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"getPriorVotes"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenGetPriorVotes = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'getPriorVotes',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"initialGnarId"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenInitialGnarId = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'initialGnarId',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenIsApprovedForAll = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"isDescriptorLocked"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenIsDescriptorLocked = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'isDescriptorLocked',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"isMinterLocked"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenIsMinterLocked = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'isMinterLocked',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"isSeederLocked"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenIsSeederLocked = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'isSeederLocked',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"minter"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenMinter = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'minter',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenName = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"nonces"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenNonces = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'nonces',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"noundersDAO"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenNoundersDao = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'noundersDAO',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"numCheckpoints"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenNumCheckpoints = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'numCheckpoints',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenOwner = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"ownerOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenOwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"proxyRegistry"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenProxyRegistry = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'proxyRegistry',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"seeder"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenSeeder = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'seeder',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"seeds"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenSeeds = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'seeds',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenSupportsInterface = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"symbol"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenSymbol = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"tokenByIndex"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenTokenByIndex = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'tokenByIndex',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"tokenOfOwnerByIndex"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenTokenOfOwnerByIndex = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'tokenOfOwnerByIndex',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"tokenURI"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenTokenUri = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"viewDescription"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenViewDescription = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'viewDescription',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"votesToDelegate"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useReadGnarsV2TokenVotesToDelegate = /*#__PURE__*/ createUseReadContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'votesToDelegate',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWriteGnarsV2Token = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWriteGnarsV2TokenApprove = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"burn"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWriteGnarsV2TokenBurn = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"delegate"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWriteGnarsV2TokenDelegate = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'delegate',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"delegateBySig"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWriteGnarsV2TokenDelegateBySig = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'delegateBySig',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"lockDescriptor"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWriteGnarsV2TokenLockDescriptor = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'lockDescriptor',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"lockMinter"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWriteGnarsV2TokenLockMinter = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'lockMinter',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"lockSeeder"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWriteGnarsV2TokenLockSeeder = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'lockSeeder',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWriteGnarsV2TokenMint = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWriteGnarsV2TokenRenounceOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWriteGnarsV2TokenSafeTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWriteGnarsV2TokenSetApprovalForAll = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"setCustomDescription"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWriteGnarsV2TokenSetCustomDescription = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'setCustomDescription',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"setDescriptor"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWriteGnarsV2TokenSetDescriptor = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'setDescriptor',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"setMinter"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWriteGnarsV2TokenSetMinter = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'setMinter',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"setSeeder"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWriteGnarsV2TokenSetSeeder = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'setSeeder',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWriteGnarsV2TokenTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWriteGnarsV2TokenTransferOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useSimulateGnarsV2Token = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useSimulateGnarsV2TokenApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"burn"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useSimulateGnarsV2TokenBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"delegate"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useSimulateGnarsV2TokenDelegate = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'delegate',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"delegateBySig"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useSimulateGnarsV2TokenDelegateBySig = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'delegateBySig',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"lockDescriptor"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useSimulateGnarsV2TokenLockDescriptor = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'lockDescriptor',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"lockMinter"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useSimulateGnarsV2TokenLockMinter = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'lockMinter',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"lockSeeder"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useSimulateGnarsV2TokenLockSeeder = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'lockSeeder',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useSimulateGnarsV2TokenMint = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useSimulateGnarsV2TokenRenounceOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useSimulateGnarsV2TokenSafeTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useSimulateGnarsV2TokenSetApprovalForAll = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"setCustomDescription"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useSimulateGnarsV2TokenSetCustomDescription = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'setCustomDescription',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"setDescriptor"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useSimulateGnarsV2TokenSetDescriptor = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'setDescriptor',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"setMinter"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useSimulateGnarsV2TokenSetMinter = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'setMinter',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"setSeeder"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useSimulateGnarsV2TokenSetSeeder = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'setSeeder',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useSimulateGnarsV2TokenTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useSimulateGnarsV2TokenTransferOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2TokenAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWatchGnarsV2TokenEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `eventName` set to `"Approval"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWatchGnarsV2TokenApprovalEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  eventName: 'Approval',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWatchGnarsV2TokenApprovalForAllEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  eventName: 'ApprovalForAll',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `eventName` set to `"DelegateChanged"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWatchGnarsV2TokenDelegateChangedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  eventName: 'DelegateChanged',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `eventName` set to `"DelegateVotesChanged"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWatchGnarsV2TokenDelegateVotesChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gnarsV2TokenAbi,
    address: gnarsV2TokenAddress,
    eventName: 'DelegateVotesChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `eventName` set to `"DescriptorLocked"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWatchGnarsV2TokenDescriptorLockedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  eventName: 'DescriptorLocked',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `eventName` set to `"DescriptorUpdated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWatchGnarsV2TokenDescriptorUpdatedEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: gnarsV2TokenAbi, address: gnarsV2TokenAddress, eventName: 'DescriptorUpdated' },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `eventName` set to `"GnarBurned"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWatchGnarsV2TokenGnarBurnedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  eventName: 'GnarBurned',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `eventName` set to `"GnarCreated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWatchGnarsV2TokenGnarCreatedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  eventName: 'GnarCreated',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `eventName` set to `"MinterLocked"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWatchGnarsV2TokenMinterLockedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  eventName: 'MinterLocked',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `eventName` set to `"MinterUpdated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWatchGnarsV2TokenMinterUpdatedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  eventName: 'MinterUpdated',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWatchGnarsV2TokenOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gnarsV2TokenAbi,
    address: gnarsV2TokenAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `eventName` set to `"SeederLocked"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWatchGnarsV2TokenSeederLockedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  eventName: 'SeederLocked',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `eventName` set to `"SeederUpdated"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWatchGnarsV2TokenSeederUpdatedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  eventName: 'SeederUpdated',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gnarsV2TokenAbi}__ and `eventName` set to `"Transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C)
 */
export const useWatchGnarsV2TokenTransferEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gnarsV2TokenAbi,
  address: gnarsV2TokenAddress,
  eventName: 'Transfer',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nnsensReverseResolverAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x849F92178950f6254db5D16D1ba265E70521aC1B)
 */
export const useReadNnsensReverseResolver = /*#__PURE__*/ createUseReadContract({
  abi: nnsensReverseResolverAbi,
  address: nnsensReverseResolverAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nnsensReverseResolverAbi}__ and `functionName` set to `"ens"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x849F92178950f6254db5D16D1ba265E70521aC1B)
 */
export const useReadNnsensReverseResolverEns = /*#__PURE__*/ createUseReadContract({
  abi: nnsensReverseResolverAbi,
  address: nnsensReverseResolverAddress,
  functionName: 'ens',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nnsensReverseResolverAbi}__ and `functionName` set to `"nns"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x849F92178950f6254db5D16D1ba265E70521aC1B)
 */
export const useReadNnsensReverseResolverNns = /*#__PURE__*/ createUseReadContract({
  abi: nnsensReverseResolverAbi,
  address: nnsensReverseResolverAddress,
  functionName: 'nns',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nnsensReverseResolverAbi}__ and `functionName` set to `"resolve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x849F92178950f6254db5D16D1ba265E70521aC1B)
 */
export const useReadNnsensReverseResolverResolve = /*#__PURE__*/ createUseReadContract({
  abi: nnsensReverseResolverAbi,
  address: nnsensReverseResolverAddress,
  functionName: 'resolve',
})
