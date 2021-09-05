/*
    #2
    [0x1000]을 x, [0x1004]를 y라고 하자.
    x*x + x*y -> [0x1008] 를 최소한의 클럭으로 구현하여라

    R1, R2 는 Register이다.
    
    LD [Address] Register: 4clocks
    Register <- Address

    ST [Address] Register: 4clocks
    Register <- [Address]

    ADD RegisterA RegisterB: 1clock
    A+B -> B

    MUL RegisterA RegisterB: 1clock
    A*B -> B
*/
interpret({
    ...basic_instruction,
    ADD(P1, P2) {
        if(arguments.length !== 2)
            throw Error("ADD.operand.length must be 2")

        if(+P2 === +P2)
            throw Error("ADD.operand[1] must be identifier")

        memory[P2] = resolve(P1) + resolve(P2)
    },
    MUL(P1, P2) {
        if(arguments.length !== 2)
            throw Error("MUL.operand.length must be 2")

        if(+P2 === +P2)
            throw Error("MUL.operand[1] must be identifier")

        memory[P2] = resolve(P1) * resolve(P2)
    },
    ST(P1, P2) {
        if(arguments.length !== 2)
            throw Error("ST.operand.length must be 2")

        if(+P1 === +P1 || +P2 === +P2)
            throw Error("each of ST.operand must be identifier")

        memory[P1] = resolve(P2)
    },
    LD(P1, P2) {
        if(arguments.length !== 2)
            throw Error("LD.operand.length must be 2")

        if(+P1 === +P1 || +P2 === +P2)
            throw Error("each of LD.operand must be identifier")

        memory[P2] = resolve(P1)
    },
}, `
SET [0x1000] 13
SET [0x1004] 7

// ---------

LD [0x1000] R1
LD [0x1004] R2

// [0x1008] = R1 * (R1+R2)
ADD R1 R2
MUL R1 R2
ST [0x1008] R2

// ---------

// 260
PRINT [0x1008]
`)
