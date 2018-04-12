pragma solidity ^0.4.20;

import "./StateVerifier.sol";

contract StateCalculator {

    StateVerifier public stateVerifier;

    function StateCalculator(address stateVerifierAddress) public {
        stateVerifier = StateVerifier(stateVerifierAddress);
    }

    function calculate(uint[20] memory stateInput, uint[] memory moves) public view returns (uint[20])
    {
        uint[20] memory state = stateInput;
        state[17] = state[18];

        uint move;
        uint end;
        uint funds;
        uint fundsPerBlock;
        uint experience;
        uint devLeft;
        uint i;
        uint card;
        uint location;
        uint move32;

        assembly {
            // point at first element of moves array
            move := add(moves, 0x20)
            // calculate end of array
            end := add(move, mload(moves))

            // extract funds (first 48 bits of state[0])
            funds := div(
                and(mload(state), 0xFFFFFFFFFFFF0000000000000000000000000000000000000000000000000000),
                                  0x0000000000010000000000000000000000000000000000000000000000000000)

            // extract fundsPerBlock (next 16 bits of state[0])
            fundsPerBlock := div(
                and(mload(state), 0x000000000000FFFF000000000000000000000000000000000000000000000000),
                                  0x0000000000000001000000000000000000000000000000000000000000000000)

            // extract experience (next 32 bits of state[0])
            experience := div(
                and(mload(state), 0x0000000000000000FFFFFFFF0000000000000000000000000000000000000000),
                                  0x0000000000000000000000010000000000000000000000000000000000000000)

            // extract devLeft (next 20 bits of state[0])
            devLeft := div(
                and(mload(state), 0x000000000000000000000000FFFFF00000000000000000000000000000000000),
                                  0x0000000000000000000000000000100000000000000000000000000000000000)

            // set i to 4 since first 32 bits of moves array represent block number
            i := 4

            // blockNumber validation
            if or(
                gt(
                    and(mload(move),  0xFFFFFFFF00000000000000000000000000000000000000000000000000000000),
                    mul(number,       0x0000000100000000000000000000000000000000000000000000000000000000)),
                lt(
                    and(mload(move),        0xFFFFFFFF00000000000000000000000000000000000000000000000000000000),
                    mul(sub(number, 50000), 0x0000000100000000000000000000000000000000000000000000000000000000)))
            {
               return(state, 0x400)
            }

            mstore(state,
                   add(and(mload(state), 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFFFFFFFFFFFFF),
                   div(and(mload(move),  0xFFFFFFFF00000000000000000000000000000000000000000000000000000000),
                                         0x0000000000000000000000000000000000100000000000000000000000000000)))

            for
                { }
                lt(move, end)
                { move := add(move, 0x20) }
            {
                for
                    { }
                    and(
                        lt(
                            and(mload(move), mul(exp(2, mul(sub(28, i), 8)), 0x00000000000000000000000000000000000000000000000000000000FFFFFFFF)),
                                             mul(exp(2, mul(sub(28, i), 8)), 0x00000000000000000000000000000000000000000000000000000000FFFFFFFF)),
                        lt(i, 32)
                    )
                    { i := add(i, 4) }
                {
                    // take next 32 bits from move
                    move32 := div(
                        and(mload(move), mul(exp(2, mul(sub(0x1C, i), 8)), 0xFFFFFFFF)),
                                             exp(2, mul(sub(0x1C, i), 8)))

                    let blockDifference := sub(
                        add(
                            div(
                                and(mload(state), 0x00000000000000000000000000000FFFFFFFF000000000000000000000000000),
                                                  0x0000000000000000000000000000000000001000000000000000000000000000),
                            and(move32, 0x000000000000000000000000000000000000000000000000000000000000FFFF)),
                        div(
                            and(mload(state), 0x00000000000000000000000000000FFFFFFFF000000000000000000000000000),
                                              0x0000000000000000000000000000000000001000000000000000000000000000))

                    if gt(
                        add(
                            div(
                                and(mload(state), 0x00000000000000000000000000000FFFFFFFF000000000000000000000000000),
                                                  0x0000000000000000000000000000000000001000000000000000000000000000),
                            blockDifference),
                        number)
                    {
                        return(state, 0x400)
                    }

                    // funds += fundsPerBlock * blockDifference
                    funds := add(
                        funds,
                        mul(blockDifference, fundsPerBlock)
                    )

                    //recalculate project time
                    for { let i:= 0 }
                        lt(i, 10)
                        { i := add(i, 1) }
                    {
                        if gt(and(mload(add(state, 0x20)), mul(exp(2, mul(i, 24)), 0xFC0000)), 0) {
                            if iszero(lt(and(mload(add(state, 0x20)), mul(exp(2, mul(i, 24)), 0xFFFF)),
                                                     mul(blockDifference, exp(2, mul(i, 24))))) {
                                mstore(
                                    add(state, 0x20),
                                    sub(
                                        mload(add(state, 0x20)),
                                        mul(blockDifference, exp(2, mul(i, 24)))))
                            }

                            if lt(and(mload(add(state, 0x20)), mul(exp(2, mul(i, 24)), 0xFFFF)),
                                          mul(blockDifference, exp(2, mul(i, 24)))) {
                                mstore(
                                    add(state, 0x20),
                                    and(
                                        mload(add(state, 0x20)),
                                        not(mul(exp(2, mul(i, 24)), 0xFFFF))))
                            }
                        }
                    }

                    // let location

                    // // get location
                    // // 0x7FF0000 = mul(exp(2, 16), sub(exp(2, 11), 1))
                    // // 0x10000 = exp(2, 16)
                    // // 0x90 = 144
                    switch div(div(and(move32, 0x7FF0000), 0x10000), 0x90)
                    case 0 {
                        location := div(
                            and(mload(add(state, 0x40)), 0x7FFFFFFFFFFFFFFFFFFFFC000000000000000000000000000000000000000000),
                                                         0x0000000000000000000004000000000000000000000000000000000000000000)
                    }
                    case 1 {
                        location := div(
                            and(mload(add(state, 0x40)), 0x0000000000000000000003FFFFFFFFFFFFFFFFFFFFE000000000000000000000),
                                                         0x0000000000000000000000000000000000000000002000000000000000000000)
                    }
                    case 2 {
                        location := and(mload(add(state, 0x40)), 0x0000000000000000000000000000000000000000001FFFFFFFFFFFFFFFFFFFFF)
                    }
                    case 3 {
                        location := div(
                            and(mload(add(state, 0x60)), 0x7FFFFFFFFFFFFFFFFFFFFC000000000000000000000000000000000000000000),
                                                         0x0000000000000000000004000000000000000000000000000000000000000000)
                    }
                    case 4 {
                        location := div(
                            and(mload(add(state, 0x60)), 0x0000000000000000000003FFFFFFFFFFFFFFFFFFFFE000000000000000000000),
                                                         0x0000000000000000000000000000000000000000002000000000000000000000)
                    }
                    default {
                        location := and(mload(add(state, 0x60)), 0x0000000000000000000000000000000000000000001FFFFFFFFFFFFFFFFFFFFF)
                    }

                    // let card

                    if gt(and(move32, 0x40000000), 0) {
                        // check if project
                        if gt(
                            and(move32, 0x3FF0000),
                                         0x35F0000)
                        {
                            card := sub(
                                div(
                                    and(move32, 0x3FF0000),
                                                 0x0010000),
                                0x2D0
                            )
                        }

                        //else
                        if lt(
                            and(move32, 0x3FF0000),
                                         0x3600000)
                        {
                            card := mod(
                                div(
                                    and(move32, 0x3FF0000),
                                                 0x10000),
                                0x90
                            )
                        }
                    }

                    // TODO check 63 limit and 0 limit
                    if iszero(and(move32, 0x40000000)) {
                        card := div(
                            and(
                                mload(
                                    add(
                                        state,
                                        add(0x80,
                                            mul(div(
                                                    and(move32, 0x3FF0000),
                                                                0x0100000
                                                ), 0x20)
                                        )
                                    )
                                ),
                                mul(
                                    exp(2,
                                        mul(16,
                                            sub(15,
                                                mod(
                                                    div(
                                                        and(move32, 0x3FF0000),
                                                                    0x0010000
                                                    ), 0x10
                                                )
                                            )
                                        )
                                    ), 0xFFFF
                                )
                            ),
                            exp(2,
                                mul(16,
                                    sub(15,
                                        mod(
                                            div(
                                                and(move32, 0x3FF0000),
                                                            0x0010000
                                            ), 0x10
                                        )
                                    )
                                )
                            )
                        )

                        if or(and(gt(mod(card, 0x40), 62), gt(and(move32, 0x80000000), 0)),
                              and(lt(mod(card, 0x40), 1), iszero(and(move32, 0x80000000)))) {
                            return(state, 0x400)
                        }
                    }

                    // generated code begin
					if lt(card, 36) {
						if and(iszero(and(location, 0x7FE00000000000000000)), eq(0, gt(and(move32, 0x80000000), 0))) {
							location := 0
							card := add(card, 0x400)
						}

						if and(iszero(location), eq(1, gt(and(move32, 0x80000000), 0))) {
							switch card
							case 0 {
								if not(lt(funds, 100)) {
									funds := sub(funds, 100)
									card := add(card, 0x400)
									location := add(add(add(location, 0x300000000000000000000), 0x2800000000000000), 0x8000)
								}
							}
							case 6 {
								if not(lt(funds, 500)) {
									funds := sub(funds, 500)
									card := add(card, 0x400)
									location := add(add(add(location, 0x600000000000000000000), 0x3C00000000000000), 0x0)
								}
							}
							case 12 {
								if and(not(lt(experience, 16)), not(lt(funds, 2000))) {
									funds := sub(funds, 2000)
									card := add(card, 0x400)
									location := add(add(add(location, 0x900000000000000000000), 0x5000000000000000), 0x30000)
								}
							}
							case 18 {
								if and(not(lt(experience, 64)), not(lt(funds, 10000))) {
									funds := sub(funds, 10000)
									card := add(card, 0x400)
									location := add(add(add(location, 0xC00000000000000000000), 0x7800000000000000), 0x60000)
								}
							}
							case 24 {
								if and(not(lt(experience, 1024)), not(lt(funds, 200000))) {
									funds := sub(funds, 200000)
									card := add(card, 0x400)
									location := add(add(add(location, 0xF00000000000000000000), 0xA000000000000000), 0xC0000)
								}
							}
							case 30 {
								if and(not(lt(experience, 262144)), not(lt(funds, 1000000))) {
									funds := sub(funds, 1000000)
									card := add(card, 0x400)
									location := add(add(add(location, 0x1200000000000000000000), 0xC800000000000000), 0x180000)
								}
							}
						}
					}

					if and(gt(card, 35), lt(card, 54)) {
						if eq(0, gt(and(move32, 0x80000000), 0)) {
							switch card
							case 36 {
								if not(lt(and(location, 0xFFC00000000000), 0x800000000000)) {
									location := sub(sub(add(location, 0x500000000000000), 0x800000000000), 0x200000000000000000)
									card := add(card, 0x400)
								}
							}
							case 42 {
								if not(lt(and(location, 0x3FF000000000), 0x6000000000)) {
									location := sub(sub(add(location, 0xF00000000000000), 0x6000000000), 0x200000000000000000)
									card := add(card, 0x400)
								}
							}
							case 48 {
								if not(lt(and(location, 0xFFC000000), 0x18000000)) {
									location := sub(sub(add(location, 0x1900000000000000), 0x18000000), 0x200000000000000000)
									card := add(card, 0x400)
								}
							}
						}

						if eq(1, gt(and(move32, 0x80000000), 0)) {
							switch card
							case 36 {
								if and(not(lt(funds, 10)), not(lt(and(location, 0x1FFF00000000000000), 0x500000000000000))) {
									funds := sub(funds, 10)
									card := add(card, 0x400)
									location := add(add(sub(location, 0x500000000000000), 0x800000000000), 0x200000000000000000)
								}
							}
							case 42 {
								if and(not(lt(funds, 1200)), not(lt(and(location, 0x1FFF00000000000000), 0xF00000000000000))) {
									funds := sub(funds, 1200)
									card := add(card, 0x400)
									location := add(add(sub(location, 0xF00000000000000), 0x6000000000), 0x200000000000000000)
								}
							}
							case 48 {
								if and(not(lt(funds, 4800)), not(lt(and(location, 0x1FFF00000000000000), 0x1900000000000000))) {
									funds := sub(funds, 4800)
									card := add(card, 0x400)
									location := add(add(sub(location, 0x1900000000000000), 0x18000000), 0x200000000000000000)
								}
							}
						}
					}

					if and(gt(card, 53), lt(card, 72)) {
						if eq(0, gt(and(move32, 0x80000000), 0)) {
							switch card
							case 54 {
								if and(iszero(and(location, 0x2)), not(lt(fundsPerBlock, 1))) {
									fundsPerBlock := sub(fundsPerBlock, 1)
									if gt(and(location, 0x2), 0) {fundsPerBlock := add(fundsPerBlock, mul(1, 10))}
									location := sub(add(add(location, 0x2000), 0x400000000000), 0x200000000000000000)
									card := add(card, 0x400)
								}
							}
							case 60 {
								if and(iszero(and(location, 0x2)), not(lt(fundsPerBlock, 5))) {
									fundsPerBlock := sub(fundsPerBlock, 5)
									if gt(and(location, 0x2), 0) {fundsPerBlock := add(fundsPerBlock, mul(4, 10))}
									location := sub(add(add(location, 0x8000), mul(1, exp(2, add(36, mul(10, gt(and(move32, 0x20000000), 0)))))), 0x200000000000000000)
									card := add(card, 0x400)
								}
							}
							case 66 {
								if and(iszero(and(location, 0x2)), not(lt(fundsPerBlock, 20))) {
									fundsPerBlock := sub(fundsPerBlock, 20)
									if gt(and(location, 0x2), 0) {fundsPerBlock := add(fundsPerBlock, mul(16, 10))}
									location := sub(add(add(location, 0x20000), 0x4000000), 0x200000000000000000)
									card := add(card, 0x400)
								}
							}
						}

						if eq(1, gt(and(move32, 0x80000000), 0)) {
							switch card
							case 54 {
								if and(or(gt(fundsPerBlock, mul(1, 10)), iszero(and(location, 0x2))), and(iszero(and(location, 0x2)), and(not(lt(funds, 40)), and(not(lt(and(location, 0x3FFE000), 0x2000)), not(lt(and(location, 0xFFC00000000000), 0x400000000000)))))) {
									if gt(and(location, 0x2), 0) {fundsPerBlock := sub(fundsPerBlock, mul(1, 10))}
									fundsPerBlock := add(fundsPerBlock, 1)
									funds := sub(funds, 40)
									card := add(card, 0x400)
									location := add(sub(sub(location, 0x400000000000), 0x2000), 0x200000000000000000)
								}
							}
							case 60 {
								if and(or(gt(fundsPerBlock, mul(4, 10)), iszero(and(location, 0x2))), and(iszero(and(location, 0x2)), and(not(lt(funds, 120)), and(not(lt(and(location, 0x3FFE000), 0x8000)), not(lt(and(location, mul(exp(2, add(36, mul(10, gt(and(move32, 0x20000000), 0)))), sub(exp(2, add(10, mul(2, gt(and(move32, 0x20000000), 0)))), 1))), mul(1, exp(2, add(36, mul(10, gt(and(move32, exp(2, 29)), 0))))))))))) {
									if gt(and(location, 0x2), 0) {fundsPerBlock := sub(fundsPerBlock, mul(4, 10))}
									fundsPerBlock := add(fundsPerBlock, 5)
									funds := sub(funds, 120)
									card := add(card, 0x400)
									location := add(sub(sub(location, mul(1, exp(2, add(36, mul(10, gt(and(move32, 0x20000000), 0)))))), 0x8000), 0x200000000000000000)
								}
							}
							case 66 {
								if and(or(gt(fundsPerBlock, mul(16, 10)), iszero(and(location, 0x2))), and(iszero(and(location, 0x2)), and(not(lt(funds, 6000)), and(not(lt(and(location, 0x3FFE000), 0x20000)), not(lt(and(location, 0xFFC000000), 0x4000000)))))) {
									if gt(and(location, 0x2), 0) {fundsPerBlock := sub(fundsPerBlock, mul(16, 10))}
									fundsPerBlock := add(fundsPerBlock, 20)
									funds := sub(funds, 6000)
									card := add(card, 0x400)
									location := add(sub(sub(location, 0x4000000), 0x20000), 0x200000000000000000)
								}
							}
						}
					}

					if and(gt(card, 71), lt(card, 114)) {
						if eq(0, gt(and(move32, 0x80000000), 0)) {
							let dev := div(and(location, 0x1FFC), 0x4)
							switch card
							case 72 {
								if and(iszero(and(location, 0x1)), and(not(lt(and(location, 0x1FFC), mul(1, 0x4))), and(not(lt(devLeft, add(1, mul(and(location, 0x1), sub(dev, div(mul(sub(sub(sub(dev, 1), add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 1), 11), 10)))))), iszero(and(location, 1))))) {
									card := add(card, 0x400)
									devLeft := sub(devLeft, add(1, mul(and(location, 0x1), sub(dev, div(mul(sub(sub(sub(dev, 1), add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 1), 11), 10)))))
									location := sub(sub(add(location, mul(15, 0x1000000000000)), mul(add(1, mul(and(location, 0x1), sub(dev, div(mul(sub(sub(sub(dev, 1), add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 1), 11), 10)))), 0x4)), 0x200000000000000000)
								}
							}
							case 78 {
								if and(iszero(and(location, 0x1)), and(not(lt(and(location, 0x1FFC), mul(4, 0x4))), and(not(lt(devLeft, add(4, mul(and(location, 0x1), sub(dev, div(mul(sub(sub(sub(dev, 4), add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 4), 11), 10)))))), iszero(and(location, 1))))) {
									card := add(card, 0x400)
									devLeft := sub(devLeft, add(4, mul(and(location, 0x1), sub(dev, div(mul(sub(sub(sub(dev, 4), add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 4), 11), 10)))))
									location := sub(sub(add(location, mul(100, 0x1000000000000)), mul(add(4, mul(and(location, 0x1), sub(dev, div(mul(sub(sub(sub(dev, 4), add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 4), 11), 10)))), 0x4)), 0x200000000000000000)
								}
							}
							case 84 {
								if and(iszero(and(location, 0x1)), and(not(lt(and(location, 0x1FFC), mul(10, 0x4))), and(not(lt(devLeft, add(10, mul(and(location, 0x1), sub(dev, div(mul(sub(sub(sub(dev, 10), add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 10), 11), 10)))))), iszero(and(location, 1))))) {
									card := add(card, 0x400)
									devLeft := sub(devLeft, add(10, mul(and(location, 0x1), sub(dev, div(mul(sub(sub(sub(dev, 10), add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 10), 11), 10)))))
									location := sub(sub(add(location, mul(500, 0x1000000000000)), mul(add(10, mul(and(location, 0x1), sub(dev, div(mul(sub(sub(sub(dev, 10), add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 10), 11), 10)))), 0x4)), 0x200000000000000000)
								}
							}
							case 90 {
								if and(iszero(and(location, 0x1)), and(not(lt(and(location, 0x1FFC), mul(22, 0x4))), and(not(lt(devLeft, add(22, mul(and(location, 0x1), sub(dev, div(mul(sub(sub(sub(dev, 22), add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 22), 11), 10)))))), iszero(and(location, 1))))) {
									card := add(card, 0x400)
									devLeft := sub(devLeft, add(22, mul(and(location, 0x1), sub(dev, div(mul(sub(sub(sub(dev, 22), add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 22), 11), 10)))))
									location := sub(sub(add(location, mul(3000, 0x1000000000000)), mul(add(22, mul(and(location, 0x1), sub(dev, div(mul(sub(sub(sub(dev, 22), add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 22), 11), 10)))), 0x4)), 0x200000000000000000)
								}
							}
							case 96 {
								if and(iszero(and(location, 0x1)), and(not(lt(and(location, 0x1FFC), mul(46, 0x4))), and(not(lt(devLeft, add(46, mul(and(location, 0x1), sub(dev, div(mul(sub(sub(sub(dev, 46), add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 46), 11), 10)))))), iszero(and(location, 1))))) {
									card := add(card, 0x400)
									devLeft := sub(devLeft, add(46, mul(and(location, 0x1), sub(dev, div(mul(sub(sub(sub(dev, 46), add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 46), 11), 10)))))
									location := sub(sub(add(location, mul(10000, 0x1000000000000)), mul(add(46, mul(and(location, 0x1), sub(dev, div(mul(sub(sub(sub(dev, 46), add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 46), 11), 10)))), 0x4)), 0x200000000000000000)
								}
							}
							case 102 {
								if and(iszero(and(location, 0x1)), and(not(lt(and(location, 0x1FFC), mul(76, 0x4))), and(not(lt(devLeft, add(76, mul(and(location, 0x1), sub(dev, div(mul(sub(sub(sub(dev, 76), add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 76), 11), 10)))))), iszero(and(location, 1))))) {
									card := add(card, 0x400)
									devLeft := sub(devLeft, add(76, mul(and(location, 0x1), sub(dev, div(mul(sub(sub(sub(dev, 76), add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 76), 11), 10)))))
									location := sub(sub(add(location, mul(40000, 0x1000000000000)), mul(add(76, mul(and(location, 0x1), sub(dev, div(mul(sub(sub(sub(dev, 76), add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 76), 11), 10)))), 0x4)), 0x200000000000000000)
								}
							}
							case 108 {
								if and(iszero(and(location, 0x1)), and(not(lt(and(location, 0x1FFC), mul(4, 0x4))), and(not(lt(devLeft, add(4, mul(and(location, 0x1), sub(dev, div(mul(sub(sub(sub(dev, 4), add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 4), 11), 10)))))), and(iszero(and(location, 1)), not(lt(fundsPerBlock, 10)))))) {
									card := add(card, 0x400)
									devLeft := sub(devLeft, add(4, mul(and(location, 0x1), sub(dev, div(mul(sub(sub(sub(dev, 4), add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 4), 11), 10)))))
									location := sub(sub(add(location, mul(1000, 0x1000000000000)), mul(add(4, mul(and(location, 0x1), sub(dev, div(mul(sub(sub(sub(dev, 4), add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 4), 11), 10)))), 0x4)), 0x200000000000000000)
									fundsPerBlock := sub(fundsPerBlock, 10)
								}
							}
						}

						if eq(1, gt(and(move32, 0x80000000), 0)) {
							let dev := div(and(location, 0x1FFC), 0x4)
							switch card
							case 72 {
								if and(iszero(and(location, 0x1)), and(not(lt(funds, 15)), and(not(lt(and(location, 0x1FFF00000000000000), 0x14000)), iszero(and(location, 1))))) {
									card := add(card, 0x400)
									funds := sub(funds, 15)
									location := add(add(sub(location, mul(10, 0x100000000000000)), mul(add(1, mul(and(location, 0x1), sub(div(mul(add(sub(dev, add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 1), 11), 10), dev))), 0x4)), 0x200000000000000000)
									devLeft := add(devLeft, add(1, mul(and(location, 0x1), sub(div(mul(add(sub(dev, add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 1), 11), 10), dev))))
								}
							}
							case 78 {
								if and(iszero(and(location, 0x1)), and(not(lt(funds, 100)), and(not(lt(and(location, 0x1FFF00000000000000), 0x14000)), iszero(and(location, 1))))) {
									card := add(card, 0x400)
									funds := sub(funds, 100)
									location := add(add(sub(location, mul(10, 0x100000000000000)), mul(add(4, mul(and(location, 0x1), sub(div(mul(add(sub(dev, add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 4), 11), 10), dev))), 0x4)), 0x200000000000000000)
									devLeft := add(devLeft, add(4, mul(and(location, 0x1), sub(div(mul(add(sub(dev, add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 4), 11), 10), dev))))
								}
							}
							case 84 {
								if and(iszero(and(location, 0x1)), and(not(lt(funds, 500)), and(not(lt(and(location, 0x1FFF00000000000000), 0x28000)), iszero(and(location, 1))))) {
									card := add(card, 0x400)
									funds := sub(funds, 500)
									location := add(add(sub(location, mul(20, 0x100000000000000)), mul(add(10, mul(and(location, 0x1), sub(div(mul(add(sub(dev, add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 10), 11), 10), dev))), 0x4)), 0x200000000000000000)
									devLeft := add(devLeft, add(10, mul(and(location, 0x1), sub(div(mul(add(sub(dev, add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 10), 11), 10), dev))))
								}
							}
							case 90 {
								if and(iszero(and(location, 0x1)), and(not(lt(funds, 3000)), and(not(lt(and(location, 0x1FFF00000000000000), 0x28000)), iszero(and(location, 1))))) {
									card := add(card, 0x400)
									funds := sub(funds, 3000)
									location := add(add(sub(location, mul(20, 0x100000000000000)), mul(add(22, mul(and(location, 0x1), sub(div(mul(add(sub(dev, add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 22), 11), 10), dev))), 0x4)), 0x200000000000000000)
									devLeft := add(devLeft, add(22, mul(and(location, 0x1), sub(div(mul(add(sub(dev, add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 22), 11), 10), dev))))
								}
							}
							case 96 {
								if and(iszero(and(location, 0x1)), and(not(lt(funds, 10000)), and(not(lt(and(location, 0x1FFF00000000000000), 0x50000)), iszero(and(location, 1))))) {
									card := add(card, 0x400)
									funds := sub(funds, 10000)
									location := add(add(sub(location, mul(40, 0x100000000000000)), mul(add(46, mul(and(location, 0x1), sub(div(mul(add(sub(dev, add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 46), 11), 10), dev))), 0x4)), 0x200000000000000000)
									devLeft := add(devLeft, add(46, mul(and(location, 0x1), sub(div(mul(add(sub(dev, add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 46), 11), 10), dev))))
								}
							}
							case 102 {
								if and(iszero(and(location, 0x1)), and(not(lt(funds, 40000)), and(not(lt(and(location, 0x1FFF00000000000000), 0x50000)), iszero(and(location, 1))))) {
									card := add(card, 0x400)
									funds := sub(funds, 40000)
									location := add(add(sub(location, mul(40, 0x100000000000000)), mul(add(76, mul(and(location, 0x1), sub(div(mul(add(sub(dev, add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 76), 11), 10), dev))), 0x4)), 0x200000000000000000)
									devLeft := add(devLeft, add(76, mul(and(location, 0x1), sub(div(mul(add(sub(dev, add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 76), 11), 10), dev))))
								}
							}
							case 108 {
								if and(iszero(and(location, 0x1)), and(not(lt(funds, 1000)), and(not(lt(and(location, 0x1FFF00000000000000), 0x28000)), iszero(and(location, 1))))) {
									card := add(card, 0x400)
									funds := sub(funds, 1000)
									location := add(add(sub(location, mul(20, 0x100000000000000)), mul(add(4, mul(and(location, 0x1), sub(div(mul(add(sub(dev, add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 4), 11), 10), dev))), 0x4)), 0x200000000000000000)
									devLeft := add(devLeft, add(4, mul(and(location, 0x1), sub(div(mul(add(sub(dev, add(div(mul(dev, 10), 11), gt(mod(mul(dev, 10), 11), 0))), 4), 11), 10), dev))))
									fundsPerBlock := add(fundsPerBlock, 10)
								}
							}
						}
					}

					if and(gt(card, 113), lt(card, 132)) {
						if eq(0, gt(and(move32, 0x80000000), 0)) {
							switch card
							case 114 {
								if and(not(lt(and(location, 0x3FFE000), 0x30000)), and(gt(fundsPerBlock, mul(24, 10)),  gt(and(location, 0x2), 0))) {
									if gt(and(location, 0x2), 0) {fundsPerBlock := add(fundsPerBlock, mul(24, 10))}
									card := add(card, 0x400)
									location := sub(sub(add(location, 0x1E000000000000), 0x30000), 0x200000000000000000)
									if gt(and(location, 0x2), 0) {fundsPerBlock := sub(fundsPerBlock, mul(24, 10))}
								}
							}
							case 120 {
								if and(not(lt(and(location, 0x3FFE000), 0x60000)), and(gt(fundsPerBlock, mul(48, 10)),  gt(and(location, 0x2), 0))) {
									if gt(and(location, 0x2), 0) {fundsPerBlock := add(fundsPerBlock, mul(48, 10))}
									card := add(card, 0x400)
									location := sub(sub(add(location, 0x1E000000000000), 0x60000), 0x200000000000000000)
									if gt(and(location, 0x2), 0) {fundsPerBlock := sub(fundsPerBlock, mul(48, 10))}
								}
							}
							case 126 {
								if and(not(lt(and(location, 0x3FFE000), 0x180000)), and(gt(fundsPerBlock, mul(192, 10)),  gt(and(location, 0x2), 0))) {
									if gt(and(location, 0x2), 0) {fundsPerBlock := add(fundsPerBlock, mul(192, 10))}
									card := add(card, 0x400)
									location := sub(sub(add(location, 0x3C000000000000), 0x180000), 0x200000000000000000)
									if gt(and(location, 0x2), 0) {fundsPerBlock := sub(fundsPerBlock, mul(192, 10))}
								}
							}
						}

						if eq(1, gt(and(move32, 0x80000000), 0)) {
							switch card
							case 114 {
								if and(not(lt(funds, 500)), not(lt(and(location, 0x1FFF00000000000000), 0x1E00000000000000))) {
									card := add(card, 0x400)
									funds := sub(funds, 500)
									location := add(add(sub(location, 0x1E00000000000000), 0x30000), 0x200000000000000000)
								}
							}
							case 120 {
								if and(not(lt(funds, 3000)), not(lt(and(location, 0x1FFF00000000000000), 0x1E00000000000000))) {
									card := add(card, 0x400)
									funds := sub(funds, 3000)
									location := add(add(sub(location, 0x1E00000000000000), 0x60000), 0x200000000000000000)
								}
							}
							case 126 {
								if and(not(lt(funds, 10000)), not(lt(and(location, 0x1FFF00000000000000), 0x3C00000000000000))) {
									card := add(card, 0x400)
									funds := sub(funds, 10000)
									location := add(add(sub(location, 0x3C00000000000000), 0x180000), 0x200000000000000000)
								}
							}
						}
					}

					if and(gt(card, 131), lt(card, 138)) {
						if eq(0, gt(and(move32, 0x80000000), 0)) {
							switch card
							case 132 {
								if and(gt(and(location, 0x2), 0), not(lt(fundsPerBlock, mul(1, div(and(location, 0x1FFF), 0x2000))))) {
									card := add(card, 0x400)
									fundsPerBlock := sub(fundsPerBlock, mul(1, div(and(location, 0x1FFF), 0x2000)))
									location := sub(sub(location, 0x2), 0x200000000000000000)
								}
							}
						}

						if and(not(lt(experience, 1024)), eq(1, gt(and(move32, 0x80000000), 0))) {
							switch card
							case 132 {
								if and(not(lt(funds, 1000)), iszero(and(location, 0x2))) {
									card := add(card, 0x400)
									funds := sub(funds, 1000)
									fundsPerBlock := add(fundsPerBlock, mul(1, div(and(location, 0x1FFF), 0x2000)))
									location := add(add(location, 0x2), 0x200000000000000000)
								}
							}
						}
					}

					if and(gt(card, 137), lt(card, 144)) {
						if eq(0, gt(and(move32, 0x80000000), 0)) {
							switch card
							case 138 {
								if and(gt(and(location, 0x1), 0), and(not(lt(fundsPerBlock, 10)), not(lt(devLeft, add(div(mul(div(and(location, 0x1FFC), 0x4), 10), 11), gt(mod(mul(div(and(location, 0x1FFC), 0x4), 10), 11), 0)))))) {
									card := add(card, 0x400)
									fundsPerBlock := sub(fundsPerBlock, 10)
									devLeft := sub(devLeft, add(div(mul(div(and(location, 0x1FFC), 0x4), 10), 11), gt(mod(mul(div(and(location, 0x1FFC), 0x4), 10), 11), 0)))
									location := sub(sub(sub(location, 0x1), mul(add(div(mul(div(and(location, 0x1FFC), 0x4), 10), 11), gt(mod(mul(div(and(location, 0x1FFC), 0x4), 10), 11), 0)), 0x4)), 0x200000000000000000)
								}
							}
						}

						if eq(1, gt(and(move32, 0x80000000), 0)) {
							switch card
							case 138 {
								if and(not(lt(funds, 1000)), iszero(and(location, 0x1))) {
									card := add(card, 0x400)
									funds := sub(funds, 1000)
									fundsPerBlock := add(fundsPerBlock, 10)
									devLeft := add(devLeft, div(mul(div(and(location, 0x1FFC), 0x4), 11), 10))
									location := add(add(add(location, 0x1), mul(div(mul(div(and(location, 0x1FFC), 0x4), 11), 10), 0x4)), 0x200000000000000000)
								}
							}
						}
					}

					if and(gt(card, 143), lt(card, 180)) {
						if eq(0, gt(and(move32, 0x80000000), 0)) {
							switch card
							case 144 {
								if eq(and(mload(add(state, 0x20)), mul(exp(2, mul(sub(9, mod(div(and(move32, 0x3C000000), 0x4000000), 10)), 24)), 0xFFFFFF)), mul(mul(sub(card, 0x8A), 0x40000), exp(2, mul(sub(9, mod(div(and(move32, 0x3C000000), 0x4000000), 10)), 24)))) {
									card := add(card, 0x400)
									funds := add(funds, 50)
									experience := add(experience, 4)
									mstore(add(state, 0x20), and(mload(add(state, 0x20)), not(mul(exp(2, mul(sub(9, mod(div(and(move32, 0x3C000000), 0x4000000), 10)), 24)), 0xFFFFFF))))
								}
							}
							case 150 {
								if eq(and(mload(add(state, 0x20)), mul(exp(2, mul(sub(9, mod(div(and(move32, 0x3C000000), 0x4000000), 10)), 24)), 0xFFFFFF)), mul(mul(sub(card, 0x8A), 0x40000), exp(2, mul(sub(9, mod(div(and(move32, 0x3C000000), 0x4000000), 10)), 24)))) {
									card := add(card, 0x400)
									funds := add(funds, 3500)
									experience := add(experience, 32)
									mstore(add(state, 0x20), and(mload(add(state, 0x20)), not(mul(exp(2, mul(sub(9, mod(div(and(move32, 0x3C000000), 0x4000000), 10)), 24)), 0xFFFFFF))))
								}
							}
							case 156 {
								if eq(and(mload(add(state, 0x20)), mul(exp(2, mul(sub(9, mod(div(and(move32, 0x3C000000), 0x4000000), 10)), 24)), 0xFFFFFF)), mul(mul(sub(card, 0x8A), 0x40000), exp(2, mul(sub(9, mod(div(and(move32, 0x3C000000), 0x4000000), 10)), 24)))) {
									card := add(card, 0x400)
									funds := add(funds, 8000)
									experience := add(experience, 512)
									mstore(add(state, 0x20), and(mload(add(state, 0x20)), not(mul(exp(2, mul(sub(9, mod(div(and(move32, 0x3C000000), 0x4000000), 10)), 24)), 0xFFFFFF))))
								}
							}
							case 162 {
								if eq(and(mload(add(state, 0x20)), mul(exp(2, mul(sub(9, mod(div(and(move32, 0x3C000000), 0x4000000), 10)), 24)), 0xFFFFFF)), mul(mul(sub(card, 0x8A), 0x40000), exp(2, mul(sub(9, mod(div(and(move32, 0x3C000000), 0x4000000), 10)), 24)))) {
									card := add(card, 0x400)
									funds := add(funds, 64000)
									experience := add(experience, 4000)
									mstore(add(state, 0x20), and(mload(add(state, 0x20)), not(mul(exp(2, mul(sub(9, mod(div(and(move32, 0x3C000000), 0x4000000), 10)), 24)), 0xFFFFFF))))
								}
							}
							case 168 {
								if eq(and(mload(add(state, 0x20)), mul(exp(2, mul(sub(9, mod(div(and(move32, 0x3C000000), 0x4000000), 10)), 24)), 0xFFFFFF)), mul(mul(sub(card, 0x8A), 0x40000), exp(2, mul(sub(9, mod(div(and(move32, 0x3C000000), 0x4000000), 10)), 24)))) {
									card := add(card, 0x400)
									funds := add(funds, 512000)
									experience := add(experience, 32000)
									mstore(add(state, 0x20), and(mload(add(state, 0x20)), not(mul(exp(2, mul(sub(9, mod(div(and(move32, 0x3C000000), 0x4000000), 10)), 24)), 0xFFFFFF))))
								}
							}
							case 174 {
								if eq(and(mload(add(state, 0x20)), mul(exp(2, mul(sub(9, mod(div(and(move32, 0x3C000000), 0x4000000), 10)), 24)), 0xFFFFFF)), mul(mul(sub(card, 0x8A), 0x40000), exp(2, mul(sub(9, mod(div(and(move32, 0x3C000000), 0x4000000), 10)), 24)))) {
									card := add(card, 0x400)
									experience := add(experience, 500000)
									mstore(add(state, 0x20), and(mload(add(state, 0x20)), not(mul(exp(2, mul(sub(9, mod(div(and(move32, 0x3C000000), 0x4000000), 10)), 24)), 0xFFFFFF))))
								}
							}
						}

						if eq(1, gt(and(move32, 0x80000000), 0)) {
							switch card
							case 144 {
								if and(not(lt(devLeft, 1)), iszero(and(mload(add(state, 0x20)), mul(exp(2, mul(sub(9, mod(div(and(move32, 0x3C000000), 0x4000000), 10)), 24)), 0xFFFFFF)))) {
									card := add(card, 0x400)
									devLeft := sub(devLeft, 1)
									mstore(add(state, 0x20), add(mload(add(state, 0x20)), mul(add(mul(sub(card, 0x48A), 0x40000), 50), exp(2, mul(sub(9, mod(div(and(move32, 0x3C000000), 0x4000000), 10)), 24)))))
								}
							}
							case 150 {
								if and(not(lt(funds, 2000)), and(not(lt(devLeft, 8)), iszero(and(mload(add(state, 0x20)), mul(exp(2, mul(sub(9, mod(div(and(move32, 0x3C000000), 0x4000000), 10)), 24)), 0xFFFFFF))))) {
									funds := sub(funds, 2000)
									card := add(card, 0x400)
									devLeft := sub(devLeft, 8)
									mstore(add(state, 0x20), add(mload(add(state, 0x20)), mul(add(mul(sub(card, 0x48A), 0x40000), 150), exp(2, mul(sub(9, mod(div(and(move32, 0x3C000000), 0x4000000), 10)), 24)))))
								}
							}
							case 156 {
								if and(not(lt(funds, 4000)), and(not(lt(devLeft, 32)), iszero(and(mload(add(state, 0x20)), mul(exp(2, mul(sub(9, mod(div(and(move32, 0x3C000000), 0x4000000), 10)), 24)), 0xFFFFFF))))) {
									funds := sub(funds, 4000)
									card := add(card, 0x400)
									devLeft := sub(devLeft, 32)
									mstore(add(state, 0x20), add(mload(add(state, 0x20)), mul(add(mul(sub(card, 0x48A), 0x40000), 420), exp(2, mul(sub(9, mod(div(and(move32, 0x3C000000), 0x4000000), 10)), 24)))))
								}
							}
							case 162 {
								if and(not(lt(funds, 16000)), and(not(lt(devLeft, 56)), iszero(and(mload(add(state, 0x20)), mul(exp(2, mul(sub(9, mod(div(and(move32, 0x3C000000), 0x4000000), 10)), 24)), 0xFFFFFF))))) {
									funds := sub(funds, 16000)
									card := add(card, 0x400)
									devLeft := sub(devLeft, 56)
									mstore(add(state, 0x20), add(mload(add(state, 0x20)), mul(add(mul(sub(card, 0x48A), 0x40000), 2500), exp(2, mul(sub(9, mod(div(and(move32, 0x3C000000), 0x4000000), 10)), 24)))))
								}
							}
							case 168 {
								if and(not(lt(funds, 64000)), and(not(lt(devLeft, 120)), iszero(and(mload(add(state, 0x20)), mul(exp(2, mul(sub(9, mod(div(and(move32, 0x3C000000), 0x4000000), 10)), 24)), 0xFFFFFF))))) {
									funds := sub(funds, 64000)
									card := add(card, 0x400)
									devLeft := sub(devLeft, 120)
									mstore(add(state, 0x20), add(mload(add(state, 0x20)), mul(add(mul(sub(card, 0x48A), 0x40000), 10000), exp(2, mul(sub(9, mod(div(and(move32, 0x3C000000), 0x4000000), 10)), 24)))))
								}
							}
							case 174 {
								if and(not(lt(funds, 100000)), and(not(lt(devLeft, 240)), iszero(and(mload(add(state, 0x20)), mul(exp(2, mul(sub(9, mod(div(and(move32, 0x3C000000), 0x4000000), 10)), 24)), 0xFFFFFF))))) {
									funds := sub(funds, 100000)
									card := add(card, 0x400)
									devLeft := sub(devLeft, 240)
									mstore(add(state, 0x20), add(mload(add(state, 0x20)), mul(add(mul(sub(card, 0x48A), 0x40000), 30000), exp(2, mul(sub(9, mod(div(and(move32, 0x3C000000), 0x4000000), 10)), 24)))))
								}
							}
						}
					}

                    // generated code end


                    // // update location
                    switch div(div(and(move32, 0x7FF0000), 0x10000), 0x90)
                    case 0 {
                        mstore(
                            add(state, 0x40),
                            add(
                                and(mload(add(state, 0x40)), 0x0000000000000000000003FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF),
                                mul(location, 0x0000000000000000000004000000000000000000000000000000000000000000)
                            )
                        )
                    }
                    case 1 {
                        mstore(
                            add(state, 0x40),
                            add(
                                and(mload(add(state, 0x40)), 0x7FFFFFFFFFFFFFFFFFFFFC000000000000000000001FFFFFFFFFFFFFFFFFFFFF),
                                mul(location, 0x0000000000000000000000000000000000000000002000000000000000000000)
                            )
                        )
                    }
                    case 2 {
                        mstore(
                            add(state, 0x40),
                            add(
                                and(mload(add(state, 0x40)), 0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE000000000000000000000),
                                location
                            )
                        )
                    }
                    case 3 {
                        mstore(
                            add(state, 0x60),
                            add(
                                and(mload(add(state, 0x60)), 0x0000000000000000000003FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF),
                                mul(location, 0x0000000000000000000004000000000000000000000000000000000000000000)
                            )
                        )
                    }
                    case 4 {
                        mstore(
                            add(state, 0x60),
                            add(
                                and(mload(add(state, 0x60)), 0x7FFFFFFFFFFFFFFFFFFFFC000000000000000000001FFFFFFFFFFFFFFFFFFFFF),
                                mul(location, 0x0000000000000000000000000000000000000000002000000000000000000000)
                            )
                        )
                    }
                    default {
                        mstore(
                            add(state, 0x60),
                            add(
                                and(mload(add(state, 0x60)), 0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE000000000000000000000),
                                location
                            )
                        )
                    }

                    if gt(and(card, 0x400), 0) {
                        mstore(
                            state,
                            add(mload(state), mul(and(move32, 0xFFFF), 0x0000000000000000000000000000000000001000000000000000000000000000))
                        )

                        if gt(and(move32, 0x80000000), 0) {
                            if iszero(and(mload(add(state, 0x260)), exp(2, div(sub(card, 0x400), 3)))) {
                                mstore(add(state, 0x260), add(mload(add(state, 0x260)), exp(2, div(sub(card, 0x400), 3))))
                            }

                            mstore(add(state, 0x240), add(mload(add(state, 0x240)), exp(2, sub(card, 0x400))))

                            if gt(and(mload(add(state, 0x240)), mul(exp(2, sub(card, 0x400)), 0x3F)),
                                  and(mload(add(state, 0x220)), mul(exp(2, sub(card, 0x400)), 0x3F))) {
                                mstore(add(state, 0x220), add(and(mload(add(state, 0x220)), not(mul(exp(2, sub(card, 0x400)), 0x3F))),
                                                              and(mload(add(state, 0x240)),     mul(exp(2, sub(card, 0x400)), 0x3F))))
                            }
                        }

                        if iszero(and(move32, 0x80000000)) {
                            if iszero(and(mload(add(state, 0x260)), exp(2, add(div(sub(card, 0x400), 3), 1)))) {
                                mstore(add(state, 0x260), add(mload(add(state, 0x260)), exp(2, add(div(sub(card, 0x400), 3), 1))))
                            }

                            if gt(and(mload(add(state, 0x240)), mul(exp(2, sub(card, 0x400)), 0x3F)), 0) {
                                mstore(add(state, 0x240), sub(mload(add(state, 0x240)), exp(2, sub(card, 0x400))))
                            }
                        }
                    }

                    if and(
                        gt(and(card, 0x400), 0),
                        or(and(gt(card, 1054), lt(card, 1168)),
                        or(and(gt(card, 1198), lt(card, 1312)),
                        or(and(gt(card, 1342), lt(card, 1456)),
                        or(and(gt(card, 1486), lt(card, 1600)),
                        or(and(gt(card, 1630), lt(card, 1744)),
                           and(gt(card, 1774), lt(card, 1888)))))))
                    ) {

                        // write move to state
                        // 0x40000000 = mul(2, 31)
                        if gt(and(move32, 0x40000000), 0) {
                            mstore(
                                add(
                                    state,
                                    mul(0x20,
                                        add(4,
                                            div(
                                                and(mload(add(state, 0x20)), 0x0000000000000000000000000000000000000F00000000000000000000000000),
                                                                             0x0000000000000000000000000000000000000100000000000000000000000000
                                            )
                                        )
                                    )
                                ),
                                add(
                                    mload(
                                        add(
                                            state,
                                            mul(0x20,
                                                add(4,
                                                    div(
                                                        and(mload(state), 0x0000000000000000000000000000000000000F00000000000000000000000000),
                                                                          0x0000000000000000000000000000000000000100000000000000000000000000
                                                    )
                                                )
                                            )
                                        )
                                    ),
                                    mul(
                                        add(mul(sub(card, 0x400), 0x40), 1),
                                        exp(2,
                                            mul(
                                                sub(15,
                                                    div(
                                                        and(mload(state), 0x00000000000000000000000000000000000000F0000000000000000000000000),
                                                                          0x0000000000000000000000000000000000000010000000000000000000000000
                                                    )
                                                ), 0x10
                                            )
                                        )
                                    )
                                )
                            )

                            mstore(
                                state,
                                add(mload(state), 0x0000000000000000000000000000000000000010000000000000000000000000)
                            )
                        }

                        if iszero(and(move32, 0x40000000)) {
                            mstore(
                                add(
                                    state,
                                    add(0x80,
                                        mul(div(
                                                and(move32, 0x3FF0000),
                                                            0x0100000
                                            ), 0x20)
                                    )
                                ),
                                add(
                                    mload(
                                        add(
                                            state,
                                            add(0x80,
                                                mul(div(
                                                        and(move32, 0x3FF0000),
                                                                    0x0100000
                                                    ), 0x20)
                                            )
                                        )
                                    ),
                                    sub(
                                        exp(2,
                                            mul(16,
                                                sub(15,
                                                    mod(
                                                        div(
                                                            and(move32, 0x3FF0000),
                                                                        0x0010000
                                                        ), 0x10
                                                    )
                                                )
                                            )
                                        ),
                                        mul(2, iszero(and(move32, 0x80000000)))
                                    )
                                )
                            )
                        }
                    }
                }

                i := 0
            }

            mstore(
                state,
                add(
                    add(
                        add(
                            add(
                                and(
                                    mload(state), 0x0000000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
                                ),
                                mul(funds,                   0x10000000000000000000000000000000000000000000000000000)
                            ),
                            mul(fundsPerBlock,                   0x1000000000000000000000000000000000000000000000000)
                        ),
                        mul(experience,                                  0x10000000000000000000000000000000000000000)
                    ),
                    mul(devLeft,                                              0x100000000000000000000000000000000000)
                )
            )
        }

        if (!stateVerifier.verifyState(state, msg.sender)) {
            state[0] = 61706420899545226580811344702872351035336628129638000133536743424;
            for (i = 0; i < 20; i++) {
                state[i] = 0;
            }

            return state;
        }

        state[17] = 0;
        state[19] = 0;

        return state;
    }
}
