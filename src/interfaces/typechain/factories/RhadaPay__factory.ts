/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { RhadaPay, RhadaPayInterface } from "../RhadaPay";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "applicant",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "jobID",
        type: "uint256",
      },
    ],
    name: "ApplicantApplied",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "applicant",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "jobID",
        type: "uint256",
      },
    ],
    name: "ApplicantChosen",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "jobID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "applicant",
        type: "address",
      },
    ],
    name: "ApplicantSigned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "jobID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    name: "CreatorSigned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "DownpaymentChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "applicant",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "jobID",
        type: "uint256",
      },
    ],
    name: "FinalSign",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "jobID",
        type: "uint256",
      },
    ],
    name: "JobCompleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "downPayment",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "incrementPay",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timeBeforeStakeRemoved",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "jobID",
        type: "uint256",
      },
    ],
    name: "JobCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "jobID",
        type: "uint256",
      },
    ],
    name: "StakeRemoved",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "jobID",
        type: "uint256",
      },
    ],
    name: "applyForJob",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "chosenApplicant",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "jobID",
        type: "uint256",
      },
    ],
    name: "chooseApplicant",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newDownPayment",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "jobID",
        type: "uint256",
      },
    ],
    name: "configureJobDownPayment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newIncrement",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "jobID",
        type: "uint256",
      },
    ],
    name: "configureJobIncrementPay",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newTimeBeforeCanRemove",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "jobID",
        type: "uint256",
      },
    ],
    name: "configureJobTimeBeforeStakeRemoved",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_downPayment",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_incrementPay",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_timeBeforeStakeRemoved",
        type: "uint256",
      },
    ],
    name: "createJob",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "jobID",
        type: "uint256",
      },
    ],
    name: "finalSign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "jobID",
        type: "uint256",
      },
    ],
    name: "initApplicantSign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "jobID",
        type: "uint256",
      },
    ],
    name: "initCreatorSign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "jobID",
        type: "uint256",
      },
    ],
    name: "removeStake",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "jobID",
        type: "uint256",
      },
    ],
    name: "stakeEther",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "jobID",
        type: "uint256",
      },
    ],
    name: "submitWork",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class RhadaPay__factory {
  static readonly abi = _abi;
  static createInterface(): RhadaPayInterface {
    return new utils.Interface(_abi) as RhadaPayInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RhadaPay {
    return new Contract(address, _abi, signerOrProvider) as RhadaPay;
  }
}