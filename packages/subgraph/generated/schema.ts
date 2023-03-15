// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class OgTransferEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save OgTransferEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type OgTransferEvent must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("OgTransferEvent", id.toString(), this);
    }
  }

  static load(id: string): OgTransferEvent | null {
    return changetype<OgTransferEvent | null>(store.get("OgTransferEvent", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get gnar(): string {
    let value = this.get("gnar");
    return value!.toString();
  }

  set gnar(value: string) {
    this.set("gnar", Value.fromString(value));
  }

  get previousHolder(): Bytes {
    let value = this.get("previousHolder");
    return value!.toBytes();
  }

  set previousHolder(value: Bytes) {
    this.set("previousHolder", Value.fromBytes(value));
  }

  get newHolder(): Bytes {
    let value = this.get("newHolder");
    return value!.toBytes();
  }

  set newHolder(value: Bytes) {
    this.set("newHolder", Value.fromBytes(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value!.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    return value!.toBigInt();
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }
}

export class OgGnar extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save OgGnar entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type OgGnar must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("OgGnar", id.toString(), this);
    }
  }

  static load(id: string): OgGnar | null {
    return changetype<OgGnar | null>(store.get("OgGnar", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get background(): BigInt {
    let value = this.get("background");
    return value!.toBigInt();
  }

  set background(value: BigInt) {
    this.set("background", Value.fromBigInt(value));
  }

  get body(): BigInt {
    let value = this.get("body");
    return value!.toBigInt();
  }

  set body(value: BigInt) {
    this.set("body", Value.fromBigInt(value));
  }

  get accessory(): BigInt {
    let value = this.get("accessory");
    return value!.toBigInt();
  }

  set accessory(value: BigInt) {
    this.set("accessory", Value.fromBigInt(value));
  }

  get head(): BigInt {
    let value = this.get("head");
    return value!.toBigInt();
  }

  set head(value: BigInt) {
    this.set("head", Value.fromBigInt(value));
  }

  get glasses(): BigInt {
    let value = this.get("glasses");
    return value!.toBigInt();
  }

  set glasses(value: BigInt) {
    this.set("glasses", Value.fromBigInt(value));
  }

  get owner(): Bytes {
    let value = this.get("owner");
    return value!.toBytes();
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }

  get wasClaimed(): boolean {
    let value = this.get("wasClaimed");
    return value!.toBoolean();
  }

  set wasClaimed(value: boolean) {
    this.set("wasClaimed", Value.fromBoolean(value));
  }
}

export class OgBid extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save OgBid entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type OgBid must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("OgBid", id.toString(), this);
    }
  }

  static load(id: string): OgBid | null {
    return changetype<OgBid | null>(store.get("OgBid", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get gnar(): string {
    let value = this.get("gnar");
    return value!.toString();
  }

  set gnar(value: string) {
    this.set("gnar", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get bidder(): Bytes {
    let value = this.get("bidder");
    return value!.toBytes();
  }

  set bidder(value: Bytes) {
    this.set("bidder", Value.fromBytes(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value!.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get txIndex(): BigInt {
    let value = this.get("txIndex");
    return value!.toBigInt();
  }

  set txIndex(value: BigInt) {
    this.set("txIndex", Value.fromBigInt(value));
  }

  get auction(): string {
    let value = this.get("auction");
    return value!.toString();
  }

  set auction(value: string) {
    this.set("auction", Value.fromString(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    return value!.toBigInt();
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }
}

export class OgAuction extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save OgAuction entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type OgAuction must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("OgAuction", id.toString(), this);
    }
  }

  static load(id: string): OgAuction | null {
    return changetype<OgAuction | null>(store.get("OgAuction", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get gnar(): string {
    let value = this.get("gnar");
    return value!.toString();
  }

  set gnar(value: string) {
    this.set("gnar", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get startBlock(): BigInt {
    let value = this.get("startBlock");
    return value!.toBigInt();
  }

  set startBlock(value: BigInt) {
    this.set("startBlock", Value.fromBigInt(value));
  }

  get endBlock(): BigInt {
    let value = this.get("endBlock");
    return value!.toBigInt();
  }

  set endBlock(value: BigInt) {
    this.set("endBlock", Value.fromBigInt(value));
  }

  get bidder(): Bytes {
    let value = this.get("bidder");
    return value!.toBytes();
  }

  set bidder(value: Bytes) {
    this.set("bidder", Value.fromBytes(value));
  }

  get settled(): boolean {
    let value = this.get("settled");
    return value!.toBoolean();
  }

  set settled(value: boolean) {
    this.set("settled", Value.fromBoolean(value));
  }

  get bids(): Array<string> {
    let value = this.get("bids");
    return value!.toStringArray();
  }

  set bids(value: Array<string>) {
    this.set("bids", Value.fromStringArray(value));
  }
}

export class DelegationEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save DelegationEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type DelegationEvent must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("DelegationEvent", id.toString(), this);
    }
  }

  static load(id: string): DelegationEvent | null {
    return changetype<DelegationEvent | null>(store.get("DelegationEvent", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get gnar(): string {
    let value = this.get("gnar");
    return value!.toString();
  }

  set gnar(value: string) {
    this.set("gnar", Value.fromString(value));
  }

  get previousDelegate(): string {
    let value = this.get("previousDelegate");
    return value!.toString();
  }

  set previousDelegate(value: string) {
    this.set("previousDelegate", Value.fromString(value));
  }

  get newDelegate(): string {
    let value = this.get("newDelegate");
    return value!.toString();
  }

  set newDelegate(value: string) {
    this.set("newDelegate", Value.fromString(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value!.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    return value!.toBigInt();
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }
}

export class TransferEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TransferEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TransferEvent must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("TransferEvent", id.toString(), this);
    }
  }

  static load(id: string): TransferEvent | null {
    return changetype<TransferEvent | null>(store.get("TransferEvent", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get gnar(): string {
    let value = this.get("gnar");
    return value!.toString();
  }

  set gnar(value: string) {
    this.set("gnar", Value.fromString(value));
  }

  get previousHolder(): string {
    let value = this.get("previousHolder");
    return value!.toString();
  }

  set previousHolder(value: string) {
    this.set("previousHolder", Value.fromString(value));
  }

  get newHolder(): string {
    let value = this.get("newHolder");
    return value!.toString();
  }

  set newHolder(value: string) {
    this.set("newHolder", Value.fromString(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value!.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    return value!.toBigInt();
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }
}

export class Seed extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Seed entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Seed must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Seed", id.toString(), this);
    }
  }

  static load(id: string): Seed | null {
    return changetype<Seed | null>(store.get("Seed", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get background(): BigInt {
    let value = this.get("background");
    return value!.toBigInt();
  }

  set background(value: BigInt) {
    this.set("background", Value.fromBigInt(value));
  }

  get body(): BigInt {
    let value = this.get("body");
    return value!.toBigInt();
  }

  set body(value: BigInt) {
    this.set("body", Value.fromBigInt(value));
  }

  get accessory(): BigInt {
    let value = this.get("accessory");
    return value!.toBigInt();
  }

  set accessory(value: BigInt) {
    this.set("accessory", Value.fromBigInt(value));
  }

  get head(): BigInt {
    let value = this.get("head");
    return value!.toBigInt();
  }

  set head(value: BigInt) {
    this.set("head", Value.fromBigInt(value));
  }

  get glasses(): BigInt {
    let value = this.get("glasses");
    return value!.toBigInt();
  }

  set glasses(value: BigInt) {
    this.set("glasses", Value.fromBigInt(value));
  }
}

export class Gnar extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Gnar entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Gnar must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Gnar", id.toString(), this);
    }
  }

  static load(id: string): Gnar | null {
    return changetype<Gnar | null>(store.get("Gnar", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get creationTimestamp(): BigInt {
    let value = this.get("creationTimestamp");
    return value!.toBigInt();
  }

  set creationTimestamp(value: BigInt) {
    this.set("creationTimestamp", Value.fromBigInt(value));
  }

  get seed(): string | null {
    let value = this.get("seed");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set seed(value: string | null) {
    if (!value) {
      this.unset("seed");
    } else {
      this.set("seed", Value.fromString(<string>value));
    }
  }

  get owner(): string {
    let value = this.get("owner");
    return value!.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }

  get votes(): Array<string> {
    let value = this.get("votes");
    return value!.toStringArray();
  }

  set votes(value: Array<string>) {
    this.set("votes", Value.fromStringArray(value));
  }

  get auction(): string | null {
    let value = this.get("auction");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set auction(value: string | null) {
    if (!value) {
      this.unset("auction");
    } else {
      this.set("auction", Value.fromString(<string>value));
    }
  }
}

export class Bid extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Bid entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Bid must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Bid", id.toString(), this);
    }
  }

  static load(id: string): Bid | null {
    return changetype<Bid | null>(store.get("Bid", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get gnar(): string {
    let value = this.get("gnar");
    return value!.toString();
  }

  set gnar(value: string) {
    this.set("gnar", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get bidder(): string | null {
    let value = this.get("bidder");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set bidder(value: string | null) {
    if (!value) {
      this.unset("bidder");
    } else {
      this.set("bidder", Value.fromString(<string>value));
    }
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value!.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get txIndex(): BigInt {
    let value = this.get("txIndex");
    return value!.toBigInt();
  }

  set txIndex(value: BigInt) {
    this.set("txIndex", Value.fromBigInt(value));
  }

  get auction(): string {
    let value = this.get("auction");
    return value!.toString();
  }

  set auction(value: string) {
    this.set("auction", Value.fromString(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    return value!.toBigInt();
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }
}

export class Auction extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Auction entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Auction must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Auction", id.toString(), this);
    }
  }

  static load(id: string): Auction | null {
    return changetype<Auction | null>(store.get("Auction", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get gnar(): string {
    let value = this.get("gnar");
    return value!.toString();
  }

  set gnar(value: string) {
    this.set("gnar", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get startTime(): BigInt {
    let value = this.get("startTime");
    return value!.toBigInt();
  }

  set startTime(value: BigInt) {
    this.set("startTime", Value.fromBigInt(value));
  }

  get endTime(): BigInt {
    let value = this.get("endTime");
    return value!.toBigInt();
  }

  set endTime(value: BigInt) {
    this.set("endTime", Value.fromBigInt(value));
  }

  get bidder(): string | null {
    let value = this.get("bidder");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set bidder(value: string | null) {
    if (!value) {
      this.unset("bidder");
    } else {
      this.set("bidder", Value.fromString(<string>value));
    }
  }

  get settled(): boolean {
    let value = this.get("settled");
    return value!.toBoolean();
  }

  set settled(value: boolean) {
    this.set("settled", Value.fromBoolean(value));
  }

  get bids(): Array<string> {
    let value = this.get("bids");
    return value!.toStringArray();
  }

  set bids(value: Array<string>) {
    this.set("bids", Value.fromStringArray(value));
  }
}

export class Account extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Account entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Account must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Account", id.toString(), this);
    }
  }

  static load(id: string): Account | null {
    return changetype<Account | null>(store.get("Account", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get delegate(): string | null {
    let value = this.get("delegate");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set delegate(value: string | null) {
    if (!value) {
      this.unset("delegate");
    } else {
      this.set("delegate", Value.fromString(<string>value));
    }
  }

  get tokenBalanceRaw(): BigInt {
    let value = this.get("tokenBalanceRaw");
    return value!.toBigInt();
  }

  set tokenBalanceRaw(value: BigInt) {
    this.set("tokenBalanceRaw", Value.fromBigInt(value));
  }

  get tokenBalance(): BigInt {
    let value = this.get("tokenBalance");
    return value!.toBigInt();
  }

  set tokenBalance(value: BigInt) {
    this.set("tokenBalance", Value.fromBigInt(value));
  }

  get totalTokensHeldRaw(): BigInt {
    let value = this.get("totalTokensHeldRaw");
    return value!.toBigInt();
  }

  set totalTokensHeldRaw(value: BigInt) {
    this.set("totalTokensHeldRaw", Value.fromBigInt(value));
  }

  get totalTokensHeld(): BigInt {
    let value = this.get("totalTokensHeld");
    return value!.toBigInt();
  }

  set totalTokensHeld(value: BigInt) {
    this.set("totalTokensHeld", Value.fromBigInt(value));
  }

  get gnars(): Array<string> {
    let value = this.get("gnars");
    return value!.toStringArray();
  }

  set gnars(value: Array<string>) {
    this.set("gnars", Value.fromStringArray(value));
  }
}

export class Delegate extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Delegate entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Delegate must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Delegate", id.toString(), this);
    }
  }

  static load(id: string): Delegate | null {
    return changetype<Delegate | null>(store.get("Delegate", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get delegatedVotesRaw(): BigInt {
    let value = this.get("delegatedVotesRaw");
    return value!.toBigInt();
  }

  set delegatedVotesRaw(value: BigInt) {
    this.set("delegatedVotesRaw", Value.fromBigInt(value));
  }

  get delegatedVotes(): BigInt {
    let value = this.get("delegatedVotes");
    return value!.toBigInt();
  }

  set delegatedVotes(value: BigInt) {
    this.set("delegatedVotes", Value.fromBigInt(value));
  }

  get tokenHoldersRepresentedAmount(): i32 {
    let value = this.get("tokenHoldersRepresentedAmount");
    return value!.toI32();
  }

  set tokenHoldersRepresentedAmount(value: i32) {
    this.set("tokenHoldersRepresentedAmount", Value.fromI32(value));
  }

  get tokenHoldersRepresented(): Array<string> {
    let value = this.get("tokenHoldersRepresented");
    return value!.toStringArray();
  }

  set tokenHoldersRepresented(value: Array<string>) {
    this.set("tokenHoldersRepresented", Value.fromStringArray(value));
  }

  get gnarsRepresented(): Array<string> {
    let value = this.get("gnarsRepresented");
    return value!.toStringArray();
  }

  set gnarsRepresented(value: Array<string>) {
    this.set("gnarsRepresented", Value.fromStringArray(value));
  }

  get votes(): Array<string> {
    let value = this.get("votes");
    return value!.toStringArray();
  }

  set votes(value: Array<string>) {
    this.set("votes", Value.fromStringArray(value));
  }

  get proposals(): Array<string> {
    let value = this.get("proposals");
    return value!.toStringArray();
  }

  set proposals(value: Array<string>) {
    this.set("proposals", Value.fromStringArray(value));
  }
}

export class Proposal extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Proposal entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Proposal must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Proposal", id.toString(), this);
    }
  }

  static load(id: string): Proposal | null {
    return changetype<Proposal | null>(store.get("Proposal", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get proposer(): string {
    let value = this.get("proposer");
    return value!.toString();
  }

  set proposer(value: string) {
    this.set("proposer", Value.fromString(value));
  }

  get targets(): Array<Bytes> | null {
    let value = this.get("targets");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytesArray();
    }
  }

  set targets(value: Array<Bytes> | null) {
    if (!value) {
      this.unset("targets");
    } else {
      this.set("targets", Value.fromBytesArray(<Array<Bytes>>value));
    }
  }

  get values(): Array<BigInt> | null {
    let value = this.get("values");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigIntArray();
    }
  }

  set values(value: Array<BigInt> | null) {
    if (!value) {
      this.unset("values");
    } else {
      this.set("values", Value.fromBigIntArray(<Array<BigInt>>value));
    }
  }

  get signatures(): Array<string> | null {
    let value = this.get("signatures");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set signatures(value: Array<string> | null) {
    if (!value) {
      this.unset("signatures");
    } else {
      this.set("signatures", Value.fromStringArray(<Array<string>>value));
    }
  }

  get calldatas(): Array<Bytes> | null {
    let value = this.get("calldatas");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytesArray();
    }
  }

  set calldatas(value: Array<Bytes> | null) {
    if (!value) {
      this.unset("calldatas");
    } else {
      this.set("calldatas", Value.fromBytesArray(<Array<Bytes>>value));
    }
  }

  get createdTimestamp(): BigInt {
    let value = this.get("createdTimestamp");
    return value!.toBigInt();
  }

  set createdTimestamp(value: BigInt) {
    this.set("createdTimestamp", Value.fromBigInt(value));
  }

  get createdBlock(): BigInt {
    let value = this.get("createdBlock");
    return value!.toBigInt();
  }

  set createdBlock(value: BigInt) {
    this.set("createdBlock", Value.fromBigInt(value));
  }

  get createdTransactionHash(): Bytes {
    let value = this.get("createdTransactionHash");
    return value!.toBytes();
  }

  set createdTransactionHash(value: Bytes) {
    this.set("createdTransactionHash", Value.fromBytes(value));
  }

  get startBlock(): BigInt {
    let value = this.get("startBlock");
    return value!.toBigInt();
  }

  set startBlock(value: BigInt) {
    this.set("startBlock", Value.fromBigInt(value));
  }

  get endBlock(): BigInt {
    let value = this.get("endBlock");
    return value!.toBigInt();
  }

  set endBlock(value: BigInt) {
    this.set("endBlock", Value.fromBigInt(value));
  }

  get proposalThreshold(): BigInt {
    let value = this.get("proposalThreshold");
    return value!.toBigInt();
  }

  set proposalThreshold(value: BigInt) {
    this.set("proposalThreshold", Value.fromBigInt(value));
  }

  get quorumVotes(): BigInt {
    let value = this.get("quorumVotes");
    return value!.toBigInt();
  }

  set quorumVotes(value: BigInt) {
    this.set("quorumVotes", Value.fromBigInt(value));
  }

  get forVotes(): BigInt {
    let value = this.get("forVotes");
    return value!.toBigInt();
  }

  set forVotes(value: BigInt) {
    this.set("forVotes", Value.fromBigInt(value));
  }

  get againstVotes(): BigInt {
    let value = this.get("againstVotes");
    return value!.toBigInt();
  }

  set againstVotes(value: BigInt) {
    this.set("againstVotes", Value.fromBigInt(value));
  }

  get abstainVotes(): BigInt {
    let value = this.get("abstainVotes");
    return value!.toBigInt();
  }

  set abstainVotes(value: BigInt) {
    this.set("abstainVotes", Value.fromBigInt(value));
  }

  get title(): string {
    let value = this.get("title");
    return value!.toString();
  }

  set title(value: string) {
    this.set("title", Value.fromString(value));
  }

  get description(): string {
    let value = this.get("description");
    return value!.toString();
  }

  set description(value: string) {
    this.set("description", Value.fromString(value));
  }

  get status(): string {
    let value = this.get("status");
    return value!.toString();
  }

  set status(value: string) {
    this.set("status", Value.fromString(value));
  }

  get executionETA(): BigInt | null {
    let value = this.get("executionETA");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set executionETA(value: BigInt | null) {
    if (!value) {
      this.unset("executionETA");
    } else {
      this.set("executionETA", Value.fromBigInt(<BigInt>value));
    }
  }

  get votes(): Array<string> {
    let value = this.get("votes");
    return value!.toStringArray();
  }

  set votes(value: Array<string>) {
    this.set("votes", Value.fromStringArray(value));
  }

  get totalSupply(): BigInt {
    let value = this.get("totalSupply");
    return value!.toBigInt();
  }

  set totalSupply(value: BigInt) {
    this.set("totalSupply", Value.fromBigInt(value));
  }

  get minQuorumVotesBPS(): i32 {
    let value = this.get("minQuorumVotesBPS");
    return value!.toI32();
  }

  set minQuorumVotesBPS(value: i32) {
    this.set("minQuorumVotesBPS", Value.fromI32(value));
  }

  get maxQuorumVotesBPS(): i32 {
    let value = this.get("maxQuorumVotesBPS");
    return value!.toI32();
  }

  set maxQuorumVotesBPS(value: i32) {
    this.set("maxQuorumVotesBPS", Value.fromI32(value));
  }

  get quorumCoefficient(): BigInt {
    let value = this.get("quorumCoefficient");
    return value!.toBigInt();
  }

  set quorumCoefficient(value: BigInt) {
    this.set("quorumCoefficient", Value.fromBigInt(value));
  }
}

export class Vote extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Vote entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Vote must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Vote", id.toString(), this);
    }
  }

  static load(id: string): Vote | null {
    return changetype<Vote | null>(store.get("Vote", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get support(): boolean {
    let value = this.get("support");
    return value!.toBoolean();
  }

  set support(value: boolean) {
    this.set("support", Value.fromBoolean(value));
  }

  get supportDetailed(): i32 {
    let value = this.get("supportDetailed");
    return value!.toI32();
  }

  set supportDetailed(value: i32) {
    this.set("supportDetailed", Value.fromI32(value));
  }

  get votesRaw(): BigInt {
    let value = this.get("votesRaw");
    return value!.toBigInt();
  }

  set votesRaw(value: BigInt) {
    this.set("votesRaw", Value.fromBigInt(value));
  }

  get votes(): BigInt {
    let value = this.get("votes");
    return value!.toBigInt();
  }

  set votes(value: BigInt) {
    this.set("votes", Value.fromBigInt(value));
  }

  get reason(): string | null {
    let value = this.get("reason");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set reason(value: string | null) {
    if (!value) {
      this.unset("reason");
    } else {
      this.set("reason", Value.fromString(<string>value));
    }
  }

  get voter(): string {
    let value = this.get("voter");
    return value!.toString();
  }

  set voter(value: string) {
    this.set("voter", Value.fromString(value));
  }

  get gnars(): Array<string> | null {
    let value = this.get("gnars");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set gnars(value: Array<string> | null) {
    if (!value) {
      this.unset("gnars");
    } else {
      this.set("gnars", Value.fromStringArray(<Array<string>>value));
    }
  }

  get proposal(): string {
    let value = this.get("proposal");
    return value!.toString();
  }

  set proposal(value: string) {
    this.set("proposal", Value.fromString(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value!.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }
}

export class Governance extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Governance entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Governance must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Governance", id.toString(), this);
    }
  }

  static load(id: string): Governance | null {
    return changetype<Governance | null>(store.get("Governance", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get proposals(): BigInt {
    let value = this.get("proposals");
    return value!.toBigInt();
  }

  set proposals(value: BigInt) {
    this.set("proposals", Value.fromBigInt(value));
  }

  get currentTokenHolders(): BigInt {
    let value = this.get("currentTokenHolders");
    return value!.toBigInt();
  }

  set currentTokenHolders(value: BigInt) {
    this.set("currentTokenHolders", Value.fromBigInt(value));
  }

  get currentDelegates(): BigInt {
    let value = this.get("currentDelegates");
    return value!.toBigInt();
  }

  set currentDelegates(value: BigInt) {
    this.set("currentDelegates", Value.fromBigInt(value));
  }

  get totalTokenHolders(): BigInt {
    let value = this.get("totalTokenHolders");
    return value!.toBigInt();
  }

  set totalTokenHolders(value: BigInt) {
    this.set("totalTokenHolders", Value.fromBigInt(value));
  }

  get totalDelegates(): BigInt {
    let value = this.get("totalDelegates");
    return value!.toBigInt();
  }

  set totalDelegates(value: BigInt) {
    this.set("totalDelegates", Value.fromBigInt(value));
  }

  get delegatedVotesRaw(): BigInt {
    let value = this.get("delegatedVotesRaw");
    return value!.toBigInt();
  }

  set delegatedVotesRaw(value: BigInt) {
    this.set("delegatedVotesRaw", Value.fromBigInt(value));
  }

  get delegatedVotes(): BigInt {
    let value = this.get("delegatedVotes");
    return value!.toBigInt();
  }

  set delegatedVotes(value: BigInt) {
    this.set("delegatedVotes", Value.fromBigInt(value));
  }

  get proposalsQueued(): BigInt {
    let value = this.get("proposalsQueued");
    return value!.toBigInt();
  }

  set proposalsQueued(value: BigInt) {
    this.set("proposalsQueued", Value.fromBigInt(value));
  }
}

export class DynamicQuorumParams extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save DynamicQuorumParams entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type DynamicQuorumParams must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("DynamicQuorumParams", id.toString(), this);
    }
  }

  static load(id: string): DynamicQuorumParams | null {
    return changetype<DynamicQuorumParams | null>(
      store.get("DynamicQuorumParams", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get minQuorumVotesBPS(): i32 {
    let value = this.get("minQuorumVotesBPS");
    return value!.toI32();
  }

  set minQuorumVotesBPS(value: i32) {
    this.set("minQuorumVotesBPS", Value.fromI32(value));
  }

  get maxQuorumVotesBPS(): i32 {
    let value = this.get("maxQuorumVotesBPS");
    return value!.toI32();
  }

  set maxQuorumVotesBPS(value: i32) {
    this.set("maxQuorumVotesBPS", Value.fromI32(value));
  }

  get quorumCoefficient(): BigInt {
    let value = this.get("quorumCoefficient");
    return value!.toBigInt();
  }

  set quorumCoefficient(value: BigInt) {
    this.set("quorumCoefficient", Value.fromBigInt(value));
  }

  get dynamicQuorumStartBlock(): BigInt | null {
    let value = this.get("dynamicQuorumStartBlock");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set dynamicQuorumStartBlock(value: BigInt | null) {
    if (!value) {
      this.unset("dynamicQuorumStartBlock");
    } else {
      this.set("dynamicQuorumStartBlock", Value.fromBigInt(<BigInt>value));
    }
  }
}
