/*
    #1
    A*A + 2*A*B + B*B -> C 를 구현하여라
    
    ADD P1 P2 P3
    P1 + P2 -> P3

    MUL P1 P2 P3
    P1 * P2 -> P3
*/
interpret({
    ...basic_instruction,
    ADD(P1, P2, P3) {
        if(arguments.length !== 3)
            throw Error("ADD.operand.length must be 3")

        if(+P3 === +P3)
            throw Error("ADD.operand[2] must be identifier")

        memory[P3] = resolve(P1) + resolve(P2)
    },
    MUL(P1, P2, P3) {
        if(arguments.length !== 3)
            throw Error("MUL.operand.length must be 3")

        if(+P3 === +P3)
            throw Error("MUL.operand[2] must be identifier")

        memory[P3] = resolve(P1) * resolve(P2)
    }
}, `
SET A 13
SET B 7

// ---------

// C = (A+B)**2
ADD A B A
MUL A A C

// ---------

// 400
PRINT C
`)
