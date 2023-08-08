// SPDX-License-Identifier: CC0-1.0
pragma solidity 0.8.21;

import "forge-std/Test.sol";
import "../src/GnarsHD.sol";
import {Strings} from "openzeppelin-contracts/contracts/utils/Strings.sol";

/* solhint-disable func-name-mixedcase */
contract GnarsHDTest is Test {
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);

    GnarsHD public gnarsHD;

    address public constant GAMI = 0x387a161C6b25aA854100aBaED39274e51aaffffd;
    address public constant GNARS_TREASURY = 0xa1B74d2280966A89AC7e0F3A8bc5f0867C776d98;
    string public constant RENDERER_BASE = "https://api.zora.co/renderer/stack-images";
    string public constant IPFS_FOLDER = "ipfs://bafybeibrkwka7r7kjofvladlkswp4zzkabn3nhmkedklbtylnjughw2m6e";
    string public constant CONTRACT_URI = "ipfs://bafkreiel3mappuzldb6rofkdwxt5ewpt43nrhl3yx4ulppny753s6banna";
    uint48 public constant AMOUNT_BACKGROUNDS = 12;
    uint48 public constant AMOUNT_BODIES = 30;
    uint48 public constant AMOUNT_ACCESSORIES = 153;
    uint48 public constant AMOUNT_HEADS = 235;
    uint48 public constant AMOUNT_NOGGLES = 68;

    function setUp() public {
        vm.createSelectFork(vm.envString("MAINNET_RPC_URL"), 17820619);

        gnarsHD = new GnarsHD(
            0x558BFFF0D583416f7C4e380625c7865821b8E95C, //Gnars V2 Token
            RENDERER_BASE,
            GnarsHD.Artwork({
                ipfsFolder: IPFS_FOLDER,
                amountBackgrounds: AMOUNT_BACKGROUNDS,
                amountBodies: AMOUNT_BODIES,
                amountAccessories: AMOUNT_ACCESSORIES,
                amountHeads: AMOUNT_HEADS,
                amountNoggles: AMOUNT_NOGGLES
            }),
            CONTRACT_URI,
            GNARS_TREASURY
        );
    }

    function test_name() public {
        assertEq(gnarsHD.name(), "Gnars HD");
    }

    function test_contractURI_initialValue() public {
        assertEq(gnarsHD.contractURI(), CONTRACT_URI);
    }

    function test_rendererBaseUri_initialValue() public {
        assertEq(gnarsHD.rendererBaseUri(), RENDERER_BASE);
    }

    function test_artwork_initialValue() public {
        (
            string memory ipfsFolder,
            uint48 amountBackgrounds,
            uint48 amountBodies,
            uint48 amountAccessories,
            uint48 amountHeads,
            uint48 amountNoggles
        ) = gnarsHD.artwork();
        assertEq(ipfsFolder, IPFS_FOLDER);
        assertEq(amountBackgrounds, AMOUNT_BACKGROUNDS);
        assertEq(amountBodies, AMOUNT_BODIES);
        assertEq(amountAccessories, AMOUNT_ACCESSORIES);
        assertEq(amountHeads, AMOUNT_HEADS);
        assertEq(amountNoggles, AMOUNT_NOGGLES);
    }

    function test_tokenByIndex_passThroughToGnarsV2() public {
        assertEq(gnarsHD.tokenByIndex(0), 627);
    }

    function test_ownerOf_returnsRespectiveGnarsV2TokenOwner() public {
        assertEq(gnarsHD.ownerOf(3895), GAMI);
    }

    function test_balanceOf_returnsRespectiveGnarsV2Balance() public {
        assertEq(gnarsHD.balanceOf(GAMI), 230);
    }

    function test_tokenOfOwnerByIndex_passThroughToGnarsV2() public {
        assertEq(gnarsHD.tokenOfOwnerByIndex(GAMI, 5), 2864);
    }

    function test_totalSupply_passThroughToGnarsV2() public {
        assertEq(gnarsHD.totalSupply(), 3816);
    }

    function test_setArtwork_worksAsIntended() public {
        hoax(GNARS_TREASURY);
        gnarsHD.setArtwork(
            GnarsHD.Artwork({
                ipfsFolder: "ipfs://test",
                amountBackgrounds: 1,
                amountBodies: 2,
                amountAccessories: 3,
                amountHeads: 4,
                amountNoggles: 5
            })
        );
        (
            string memory ipfsFolder,
            uint48 amountBackgrounds,
            uint48 amountBodies,
            uint48 amountAccessories,
            uint48 amountHeads,
            uint48 amountNoggles
        ) = gnarsHD.artwork();
        assertEq(ipfsFolder, "ipfs://test");
        assertEq(amountBackgrounds, 1);
        assertEq(amountBodies, 2);
        assertEq(amountAccessories, 3);
        assertEq(amountHeads, 4);
        assertEq(amountNoggles, 5);
    }

    function test_setArtwork_revertsWhenCallerIsNotOwner() public {
        vm.expectRevert("UNAUTHORIZED");
        gnarsHD.setArtwork(
            GnarsHD.Artwork({
                ipfsFolder: "ipfs://test",
                amountBackgrounds: 1,
                amountBodies: 2,
                amountAccessories: 3,
                amountHeads: 4,
                amountNoggles: 5
            })
        );
    }

    function test_setContractUri_worksAsIntended() public {
        hoax(GNARS_TREASURY);
        gnarsHD.setContractUri("ipfs://new");
        assertEq(gnarsHD.contractURI(), "ipfs://new");
    }

    function test_setContractUri_revertsWhenCallerIsNotOwner() public {
        vm.expectRevert("UNAUTHORIZED");
        gnarsHD.setContractUri("ipfs://new");
    }

    function test_setRendererBaseUri_worksAsIntended() public {
        hoax(GNARS_TREASURY);
        gnarsHD.setRendererBaseUri("https://renderer.wtf");
        assertEq(gnarsHD.rendererBaseUri(), "https://renderer.wtf");
    }

    function test_setRendererBaseUri_revertsWhenCallerIsNotOwner() public {
        vm.expectRevert("UNAUTHORIZED");
        gnarsHD.setRendererBaseUri("ipfs://new");
    }

    function test_getBackgroundQueryParam_returnsExpectedImagePath() public {
        assertEq(gnarsHD.getBackgroundQueryParam(11), string.concat("&images=", IPFS_FOLDER, "/BACKGROUND/11.PNG"));
    }

    function test_getBackgroundQueryParam_returnsFallbackImagePathWhenPartIsNotFound() public {
        assertEq(
            gnarsHD.getBackgroundQueryParam(12), string.concat("&images=", IPFS_FOLDER, "/BACKGROUND/FALLBACK.PNG")
        );
    }

    function test_getPartQueryParam() public {
        assertEq(
            gnarsHD.getPartQueryParam("BODY", 29, AMOUNT_BODIES),
            "&images=ipfs://bafybeibrkwka7r7kjofvladlkswp4zzkabn3nhmkedklbtylnjughw2m6e/BODY/29.PNG"
        );
        assertEq(
            gnarsHD.getPartQueryParam("ACESSORY", 152, AMOUNT_ACCESSORIES),
            "&images=ipfs://bafybeibrkwka7r7kjofvladlkswp4zzkabn3nhmkedklbtylnjughw2m6e/ACESSORY/152.PNG"
        );
        assertEq(
            gnarsHD.getPartQueryParam("HEADS", 234, AMOUNT_HEADS),
            "&images=ipfs://bafybeibrkwka7r7kjofvladlkswp4zzkabn3nhmkedklbtylnjughw2m6e/HEADS/234.PNG"
        );
        assertEq(
            gnarsHD.getPartQueryParam("NOGGLES", 67, AMOUNT_NOGGLES),
            "&images=ipfs://bafybeibrkwka7r7kjofvladlkswp4zzkabn3nhmkedklbtylnjughw2m6e/NOGGLES/67.PNG"
        );
    }

    function test_getInexistentPartQueryParam() public {
        assertEq(
            gnarsHD.getPartQueryParam("BODY", 30, AMOUNT_BODIES),
            "&images=ipfs://bafybeibrkwka7r7kjofvladlkswp4zzkabn3nhmkedklbtylnjughw2m6e/BODY/FALLBACK.PNG"
        );
        assertEq(
            gnarsHD.getPartQueryParam("ACESSORY", 153, AMOUNT_ACCESSORIES),
            "&images=ipfs://bafybeibrkwka7r7kjofvladlkswp4zzkabn3nhmkedklbtylnjughw2m6e/ACESSORY/FALLBACK.PNG"
        );
        assertEq(
            gnarsHD.getPartQueryParam("HEADS", 235, AMOUNT_HEADS),
            "&images=ipfs://bafybeibrkwka7r7kjofvladlkswp4zzkabn3nhmkedklbtylnjughw2m6e/HEADS/FALLBACK.PNG"
        );
        assertEq(
            gnarsHD.getPartQueryParam("NOGGLES", 68, AMOUNT_NOGGLES),
            "&images=ipfs://bafybeibrkwka7r7kjofvladlkswp4zzkabn3nhmkedklbtylnjughw2m6e/NOGGLES/FALLBACK.PNG"
        );
    }

    function test_getPartTrait() public {
        IGnarDecorator decorator = IGnarDecorator(IGnarDescriptorV2(gnarsHD.gnarsV2().descriptor()).decorator());

        assertEq(
            gnarsHD.getPartTrait("Background", 7, decorator.backgrounds), '{"trait_type":"Background","value":"Mold"}'
        );
        assertEq(gnarsHD.getPartTrait("BODY", 11, decorator.bodies), '{"trait_type":"BODY","value":"Grayscale 7"}');
        assertEq(gnarsHD.getPartTrait("ACESSORY", 46, decorator.accessories), '{"trait_type":"ACESSORY","value":"Cow"}');
        assertEq(gnarsHD.getPartTrait("HEADS", 164, decorator.heads), '{"trait_type":"HEADS","value":"Porkbao"}');
        assertEq(
            gnarsHD.getPartTrait("NOGGLES", 63, decorator.glasses), '{"trait_type":"NOGGLES","value":"Standard Yellow"}'
        );
    }

    function test_getInexistentPartTrait() public {
        IGnarDecorator decorator = IGnarDecorator(IGnarDescriptorV2(gnarsHD.gnarsV2().descriptor()).decorator());

        assertEq(
            gnarsHD.getPartTrait("Background", 666, decorator.backgrounds),
            '{"trait_type":"Background","value":"Unknown"}'
        );
        assertEq(gnarsHD.getPartTrait("BODY", 666, decorator.bodies), '{"trait_type":"BODY","value":"Unknown"}');
        assertEq(
            gnarsHD.getPartTrait("ACESSORY", 666, decorator.accessories), '{"trait_type":"ACESSORY","value":"Unknown"}'
        );
        assertEq(gnarsHD.getPartTrait("HEADS", 666, decorator.heads), '{"trait_type":"HEADS","value":"Unknown"}');
        assertEq(gnarsHD.getPartTrait("NOGGLES", 666, decorator.glasses), '{"trait_type":"NOGGLES","value":"Unknown"}');
    }

    function test_getAttributes() public {
        (string memory resultAttributes, string memory queryString) = gnarsHD.getAttributes(3895);
        assertEq(
            resultAttributes,
            '{"trait_type":"Background","value":"Mold"},{"trait_type":"Body","value":"Grayscale 7"},{"trait_type":"Accessory","value":"Cow"},{"trait_type":"Head","value":"Porkbao"},{"trait_type":"Glasses","value":"Standard Yellow"}'
        );
        assertEq(
            queryString,
            string.concat(
                "?contractAddress=",
                Strings.toHexString(address(gnarsHD)),
                "&tokenId=3895&images=",
                IPFS_FOLDER,
                "/BACKGROUND/7.PNG&images=",
                IPFS_FOLDER,
                "/BODY/11.PNG&images=",
                IPFS_FOLDER,
                "/ACCESSORY/46.PNG&images=",
                IPFS_FOLDER,
                "/HEADS/164.PNG&images=",
                IPFS_FOLDER,
                "/NOGGLES/63.PNG"
            )
        );
    }

    function test_tokenURI() public {
        assertEq(
            gnarsHD.tokenURI(3895),
            "data:application/json;base64,eyJuYW1lIjoiR25hciBIRCAjMzg5NSIsICJkZXNjcmlwdGlvbiI6IkhpZ2ggZGVmaW5pdGlvbiBHbmFyICMzODk1IGNvdW50ZXJwYXJ0IiwgImF0dHJpYnV0ZXMiOiBbeyJ0cmFpdF90eXBlIjoiQmFja2dyb3VuZCIsInZhbHVlIjoiTW9sZCJ9LHsidHJhaXRfdHlwZSI6IkJvZHkiLCJ2YWx1ZSI6IkdyYXlzY2FsZSA3In0seyJ0cmFpdF90eXBlIjoiQWNjZXNzb3J5IiwidmFsdWUiOiJDb3cifSx7InRyYWl0X3R5cGUiOiJIZWFkIiwidmFsdWUiOiJQb3JrYmFvIn0seyJ0cmFpdF90eXBlIjoiR2xhc3NlcyIsInZhbHVlIjoiU3RhbmRhcmQgWWVsbG93In1dLCAiaW1hZ2UiOiAiaHR0cHM6Ly9hcGkuem9yYS5jby9yZW5kZXJlci9zdGFjay1pbWFnZXM/Y29udHJhY3RBZGRyZXNzPTB4NTYxNWRlYjc5OGJiM2U0ZGZhMDEzOWRmYTFiM2Q0MzNjYzIzYjcyZiZ0b2tlbklkPTM4OTUmaW1hZ2VzPWlwZnM6Ly9iYWZ5YmVpYnJrd2thN3I3a2pvZnZsYWRsa3N3cDR6emthYm4zbmhta2Vka2xidHlsbmp1Z2h3Mm02ZS9CQUNLR1JPVU5ELzcuUE5HJmltYWdlcz1pcGZzOi8vYmFmeWJlaWJya3drYTdyN2tqb2Z2bGFkbGtzd3A0enprYWJuM25obWtlZGtsYnR5bG5qdWdodzJtNmUvQk9EWS8xMS5QTkcmaW1hZ2VzPWlwZnM6Ly9iYWZ5YmVpYnJrd2thN3I3a2pvZnZsYWRsa3N3cDR6emthYm4zbmhta2Vka2xidHlsbmp1Z2h3Mm02ZS9BQ0NFU1NPUlkvNDYuUE5HJmltYWdlcz1pcGZzOi8vYmFmeWJlaWJya3drYTdyN2tqb2Z2bGFkbGtzd3A0enprYWJuM25obWtlZGtsYnR5bG5qdWdodzJtNmUvSEVBRFMvMTY0LlBORyZpbWFnZXM9aXBmczovL2JhZnliZWlicmt3a2E3cjdram9mdmxhZGxrc3dwNHp6a2FibjNuaG1rZWRrbGJ0eWxuanVnaHcybTZlL05PR0dMRVMvNjMuUE5HIn0="
        );
    }

    function test_assertOwnership_multipleTokens() public {
        vm.expectEmit(true, true, true, true);
        emit Transfer(address(0), GAMI, 3895);
        vm.expectEmit(true, true, true, true);
        emit Transfer(address(0), GAMI, 2864);

        uint256[] memory tokenIds = new uint256[](2);
        tokenIds[0] = 3895;
        tokenIds[1] = 2864;

        gnarsHD.assertOwnership(tokenIds);
    }
}
