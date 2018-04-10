pragma solidity ^0.4.20;

import "./DecenterCards.sol";

contract StateVerifier {

    DecenterCards decenterCards;

    function StateVerifier(address decenterCardsAddress) public {
        decenterCards = DecenterCards(decenterCardsAddress);
    }

    function verify(uint[20] state, address _user) public view returns(bool) {
        for (uint i = 0; i < 30; i++) {
            if ((state[19] & ((uint(2) ** (2 * i)) * 3)) ==
                             ((uint(2) ** (2 * i)) * 3))
            {
                uint count = 0;
                uint metadataId = i;

                assembly {
                    if and(gt(metadataId, 0x6), lt(metadataId, 0x18)) {
                        metadataId := mul(6, metadataId)

                        for
                            { let i:= 0 }
                            lt(i, 0xF0)
                            { i := add(i, 0x18) }
                        {
                            if eq(
                                div(
                                    and(
                                        mload(add(state, 0x20)),
                                        mul(exp(2, sub(216, i)), 0xFC0000)),
                                    exp(2, sub(216, i))),
                                sub(metadataId, 0x8A)) {

                                count := add(count, 1)
                            }
                        }
                    }

                    if gt(metadataId, 0x17) {
                        metadataId := add(mul(sub(metadataId, 0x18), 0x6), 0x366)

                        for
                            { let i:= 0 }
                            lt(i, 0x1000)
                            { i := add(i, 16) }
                        {
                            if eq(
                                mod(
                                    div(
                                        and(
                                            mload(add(state, add(0x80, mul(0x20, div(i, 0x10))))),
                                            mul(exp(2, sub(240, mod(i, 0x10))), 0xFFC0)),
                                        exp(2, sub(240, mod(i, 0x10)))),
                                    0x6),
                                mul(metadataId, mul(exp(2, sub(240, mod(i, 0x10))), 0x3F))) {
                                count := add(count,
                                    div(
                                        and(
                                            mload(add(state, add(0x80, mul(0x20, div(i, 0x10))))),
                                            mul(exp(2, sub(240, mod(i, 0x10))), 0x003F)),
                                        exp(2, sub(240, mod(i, 0x10)))))
                            }
                        }
                    }

                    if lt(metadataId, 0x7) {
                        metadataId := add(mul(6, metadataId), 6)
                        if eq(and(mload(add(state, 0x40)), 0x7E00000000000000000000000000000000000000000000000000000000000000),
                                         mul(add(metadataId, 6), 0x0200000000000000000000000000000000000000000000000000000000000000)) {
                            count := add(count, 0x1)
                        }

                        if eq(and(mload(add(state, 0x40)), 0x0000000000000000000003F00000000000000000000000000000000000000000),
                                         mul(add(metadataId, 6), 0x0000000000000000000000100000000000000000000000000000000000000000)) {
                            count := add(count, 0x1)
                        }

                        if eq(and(mload(add(state, 0x40)), 0x0000000000000000000000000000000000000000001F80000000000000000000),
                                         mul(add(metadataId, 6), 0x0000000000000000000000000000000000000000000080000000000000000000)) {
                            count := add(count, 0x1)
                        }

                        if eq(and(mload(add(state, 0x60)), 0x7E00000000000000000000000000000000000000000000000000000000000000),
                                         mul(add(metadataId, 6), 0x0200000000000000000000000000000000000000000000000000000000000000)) {
                            count := add(count, 0x1)
                        }

                        if eq(and(mload(add(state, 0x60)), 0x0000000000000000000003F00000000000000000000000000000000000000000),
                                         mul(add(metadataId, 6), 0x0000000000000000000000100000000000000000000000000000000000000000)) {
                            count := add(count, 0x1)
                        }

                        if eq(and(mload(add(state, 0x60)), 0x0000000000000000000000000000000000000000001F80000000000000000000),
                                         mul(add(metadataId, 6), 0x0000000000000000000000000000000000000000000080000000000000000000)) {
                            count := add(count, 0x1)
                        }
                    }
                }
            }
        }

        return verifyState(state, _user);
    }

    function verifyState(uint[20] state, address _user) public view returns(bool) {
        for (uint i = 0; i < 30; i++) {
            if ((state[19] & ((uint(2) ** (2 * i)) * 0x3)) ==
                             ((uint(2) ** (2 * i)) * 0x3)) {
                uint count = (state[17] & ((uint(2) ** (6 * i)) * 0x3F))
                                         / (uint(2) ** (6 * i));

                if ((i == 0) || (i == 6) || (i == 9) || (i == 12) || (i == 24)) {
                    count--;
                }

                if (count > decenterCards.numberOfCardsWithType(_user, i)){
                    return false;
                }
            }
        }

        return true;
    }

}
