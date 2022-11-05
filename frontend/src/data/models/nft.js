export class Nft {
  //mb add image to show in modal, other fields?
  constructor(contractAddress, tokenId, title, tokenType, floorPrice) {
    this.contractAddress = contractAddress;
    this.tokenId = tokenId;
    this.title = title;
    this.tokenType = tokenType;
    this.floorPrice = floorPrice;
  }
}
