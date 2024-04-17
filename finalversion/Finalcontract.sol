// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CombinedModelValidationAndNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct ModelResult {
        uint256 accuracy;
        uint256 recall;
        uint256 f1Score;
        string metadata;
        string description;
        uint256 version;
    }

    uint256 public accuracyThreshold = 80;
    uint256 public recallThreshold = 80;
    uint256 public f1ScoreThreshold = 80;

    mapping(uint256 => ModelResult) public modelResults;

    constructor() ERC721("ModelResult", "MDR") {}

    event ModelValidatedAndMinted(address recipient, uint256 tokenId);

    function mintAndValidateModel(
        address recipient,
        uint256 accuracy,
        uint256 recall,
        uint256 f1Score,
        string memory metadata,
        string memory description
    ) public returns (uint256) {
        require(accuracy >= accuracyThreshold, "Accuracy does not meet the threshold");
        require(recall >= recallThreshold, "Recall does not meet the threshold");
        require(f1Score >= f1ScoreThreshold, "F1 Score does not meet the threshold");

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);

        modelResults[newItemId] = ModelResult(accuracy, recall, f1Score, metadata, description, 1);

        emit ModelValidatedAndMinted(recipient, newItemId);

        return newItemId;
    }

    function updateModel(
        uint256 tokenId,
        uint256 accuracy,
        uint256 recall,
        uint256 f1Score,
        string memory metadata,
        string memory description
    ) public {
        require(ownerOf(tokenId) == msg.sender, "You must own the token to update it");

        ModelResult storage currentResult = modelResults[tokenId];
        require(accuracy > currentResult.accuracy, "New accuracy must be higher");
        require(recall > currentResult.recall, "New recall must be higher");
        require(f1Score > currentResult.f1Score, "New F1 Score must be higher");

        currentResult.accuracy = accuracy;
        currentResult.recall = recall;
        currentResult.f1Score = f1Score;
        currentResult.metadata = metadata;
        currentResult.description = description;
        currentResult.version += 1;
    }

    function getModelResult(uint256 tokenId) public view returns (ModelResult memory) {
    require(ownerOf(tokenId) != address(0), "Model result does not exist");
    return modelResults[tokenId];
    }
}