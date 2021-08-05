/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface RhadaPayInterface extends ethers.utils.Interface {
  functions: {
    "applyForJob(uint256)": FunctionFragment;
    "chooseApplicant(address,uint256)": FunctionFragment;
    "configureJobDownPayment(uint256,uint256)": FunctionFragment;
    "configureJobIncrementPay(uint256,uint256)": FunctionFragment;
    "configureJobTimeBeforeStakeRemoved(uint256,uint256)": FunctionFragment;
    "createJob(uint256,uint256,uint256)": FunctionFragment;
    "finalSign(uint256)": FunctionFragment;
    "initApplicantSign(uint256)": FunctionFragment;
    "initCreatorSign(uint256)": FunctionFragment;
    "removeStake(uint256)": FunctionFragment;
    "stakeEther(uint256)": FunctionFragment;
    "submitWork(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "applyForJob",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "chooseApplicant",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "configureJobDownPayment",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "configureJobIncrementPay",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "configureJobTimeBeforeStakeRemoved",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createJob",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "finalSign",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "initApplicantSign",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "initCreatorSign",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "removeStake",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "stakeEther",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "submitWork",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "applyForJob",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "chooseApplicant",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "configureJobDownPayment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "configureJobIncrementPay",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "configureJobTimeBeforeStakeRemoved",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "createJob", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "finalSign", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "initApplicantSign",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "initCreatorSign",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeStake",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "stakeEther", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "submitWork", data: BytesLike): Result;

  events: {
    "ApplicantApplied(address,uint256)": EventFragment;
    "ApplicantChosen(address,uint256)": EventFragment;
    "ApplicantSigned(uint256,address)": EventFragment;
    "CreatorSigned(uint256,address)": EventFragment;
    "DownpaymentChanged()": EventFragment;
    "FinalSign(address,address,uint256)": EventFragment;
    "JobCompleted(uint256)": EventFragment;
    "JobCreated(address,uint256,uint256,uint256,uint256)": EventFragment;
    "StakeRemoved(address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ApplicantApplied"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ApplicantChosen"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ApplicantSigned"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CreatorSigned"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DownpaymentChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FinalSign"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "JobCompleted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "JobCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "StakeRemoved"): EventFragment;
}

export class RhadaPay extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: RhadaPayInterface;

  functions: {
    applyForJob(
      jobID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    chooseApplicant(
      chosenApplicant: string,
      jobID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    configureJobDownPayment(
      newDownPayment: BigNumberish,
      jobID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    configureJobIncrementPay(
      newIncrement: BigNumberish,
      jobID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    configureJobTimeBeforeStakeRemoved(
      newTimeBeforeCanRemove: BigNumberish,
      jobID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createJob(
      _downPayment: BigNumberish,
      _incrementPay: BigNumberish,
      _timeBeforeStakeRemoved: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    finalSign(
      jobID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    initApplicantSign(
      jobID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    initCreatorSign(
      jobID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeStake(
      jobID: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    stakeEther(
      jobID: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    submitWork(
      jobID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  applyForJob(
    jobID: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  chooseApplicant(
    chosenApplicant: string,
    jobID: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  configureJobDownPayment(
    newDownPayment: BigNumberish,
    jobID: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  configureJobIncrementPay(
    newIncrement: BigNumberish,
    jobID: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  configureJobTimeBeforeStakeRemoved(
    newTimeBeforeCanRemove: BigNumberish,
    jobID: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createJob(
    _downPayment: BigNumberish,
    _incrementPay: BigNumberish,
    _timeBeforeStakeRemoved: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  finalSign(
    jobID: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  initApplicantSign(
    jobID: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  initCreatorSign(
    jobID: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeStake(
    jobID: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  stakeEther(
    jobID: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  submitWork(
    jobID: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    applyForJob(jobID: BigNumberish, overrides?: CallOverrides): Promise<void>;

    chooseApplicant(
      chosenApplicant: string,
      jobID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    configureJobDownPayment(
      newDownPayment: BigNumberish,
      jobID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    configureJobIncrementPay(
      newIncrement: BigNumberish,
      jobID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    configureJobTimeBeforeStakeRemoved(
      newTimeBeforeCanRemove: BigNumberish,
      jobID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    createJob(
      _downPayment: BigNumberish,
      _incrementPay: BigNumberish,
      _timeBeforeStakeRemoved: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    finalSign(jobID: BigNumberish, overrides?: CallOverrides): Promise<void>;

    initApplicantSign(
      jobID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    initCreatorSign(
      jobID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    removeStake(jobID: BigNumberish, overrides?: CallOverrides): Promise<void>;

    stakeEther(jobID: BigNumberish, overrides?: CallOverrides): Promise<void>;

    submitWork(jobID: BigNumberish, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    ApplicantApplied(
      applicant?: null,
      jobID?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { applicant: string; jobID: BigNumber }
    >;

    ApplicantChosen(
      applicant?: null,
      jobID?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { applicant: string; jobID: BigNumber }
    >;

    ApplicantSigned(
      jobID?: null,
      applicant?: null
    ): TypedEventFilter<
      [BigNumber, string],
      { jobID: BigNumber; applicant: string }
    >;

    CreatorSigned(
      jobID?: null,
      creator?: null
    ): TypedEventFilter<
      [BigNumber, string],
      { jobID: BigNumber; creator: string }
    >;

    DownpaymentChanged(): TypedEventFilter<[], {}>;

    FinalSign(
      creator?: null,
      applicant?: null,
      jobID?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { creator: string; applicant: string; jobID: BigNumber }
    >;

    JobCompleted(
      jobID?: null
    ): TypedEventFilter<[BigNumber], { jobID: BigNumber }>;

    JobCreated(
      creator?: null,
      downPayment?: null,
      incrementPay?: null,
      timeBeforeStakeRemoved?: null,
      jobID?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber, BigNumber, BigNumber],
      {
        creator: string;
        downPayment: BigNumber;
        incrementPay: BigNumber;
        timeBeforeStakeRemoved: BigNumber;
        jobID: BigNumber;
      }
    >;

    StakeRemoved(
      creator?: null,
      amount?: null,
      jobID?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { creator: string; amount: BigNumber; jobID: BigNumber }
    >;
  };

  estimateGas: {
    applyForJob(
      jobID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    chooseApplicant(
      chosenApplicant: string,
      jobID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    configureJobDownPayment(
      newDownPayment: BigNumberish,
      jobID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    configureJobIncrementPay(
      newIncrement: BigNumberish,
      jobID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    configureJobTimeBeforeStakeRemoved(
      newTimeBeforeCanRemove: BigNumberish,
      jobID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createJob(
      _downPayment: BigNumberish,
      _incrementPay: BigNumberish,
      _timeBeforeStakeRemoved: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    finalSign(
      jobID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    initApplicantSign(
      jobID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    initCreatorSign(
      jobID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeStake(
      jobID: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    stakeEther(
      jobID: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    submitWork(
      jobID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    applyForJob(
      jobID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    chooseApplicant(
      chosenApplicant: string,
      jobID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    configureJobDownPayment(
      newDownPayment: BigNumberish,
      jobID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    configureJobIncrementPay(
      newIncrement: BigNumberish,
      jobID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    configureJobTimeBeforeStakeRemoved(
      newTimeBeforeCanRemove: BigNumberish,
      jobID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createJob(
      _downPayment: BigNumberish,
      _incrementPay: BigNumberish,
      _timeBeforeStakeRemoved: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    finalSign(
      jobID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    initApplicantSign(
      jobID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    initCreatorSign(
      jobID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeStake(
      jobID: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    stakeEther(
      jobID: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    submitWork(
      jobID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}