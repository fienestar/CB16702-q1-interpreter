const memory = {}
const basic_instruction = {
    SET(P1, P2) {
        if(arguments.length !== 2)
            throw Error("SET.operand.length must be 2")
        if(+P1 === +P1)
            throw Error("SET.operand[0] must be identifier")
        memory[P1] = resolve(P2)
    },
    PRINT(P1) {
        if(arguments.length !== 1)
            throw Error("PRINT.operand.length must be 1")
        this.push(resolve(P1))
    },
    '//': function COMMENT() {

    },
    '': function BLANK() {
        if(arguments.length !== 0)
            throw Error("line cannot start with space")
    }
}

function resolve(str) {
    if(+str === +str)
        return +str
    else{
        if(memory[str] === undefined)
            throw Error("Unknown Identifier: " + str)
        return memory[str]
    }
}

function interpret(isa, code)
{
    let stdout = []
    code.split('\n')
      .map(line => line.split(' '))
      .forEach(([opcode, ...operand]) => {
          const operator = isa[opcode]
          if(operator === undefined)
              throw Error("Unknown Opcode: " + opcode);

          operator.apply(stdout, operand)
      })
    
    return stdout.join('\n')
}
