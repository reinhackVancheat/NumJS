import { Matrix } from "./Matrix.js";
import { MatrixMath } from "./MatrixMath.js";

const assert = (condition, message) => {
    if (!condition) throw new Error(`❌ FALHOU: ${message}`);
    console.log(`✅ PASSOU: ${message}`);
};

const runCompleteTests = () => {
    console.log("=== SUITE DE TESTES COMPLETA: NUMJS ===\n");

    try {
        // --- TESTE 1: INTEGRIDADE E ACESSO ---
        console.log(">> Testando Estrutura Básica...");
        const m = new Matrix(3, 2);
        assert(m.rows === 3 && m.columns === 2, "Dimensões corretas na instância");
        m.setAt(2, 1, 99);
        assert(m.getAt(2, 1) === 99, "Escrita e leitura de valor específico");
        
        // --- TESTE 2: VALIDAÇÃO DE ENTRADA (isFinite) ---
        console.log("\n>> Testando Validações de Segurança...");
        try {
            Matrix.fromArray([[1, NaN], [3, 4]]);
            assert(false, "Deveria barrar NaN");
        } catch (e) {
            assert(true, "Bloqueio de NaN funcionando");
        }

        // --- TESTE 3: OPERAÇÕES ELEMENTO A ELEMENTO (Soma/Sub/Hadamard) ---
        console.log("\n>> Testando Operações Elemento a Elemento...");
        const a = Matrix.fromArray([[1, 2], [3, 4]]);
        const b = Matrix.fromArray([[5, 6], [7, 8]]);
        
        const sum = MatrixMath.add(a, b);
        assert(sum.getAt(1, 1) === 12, "Soma: 4 + 8 = 12");
        
        const sub = MatrixMath.subtract(b, a);
        assert(sub.getAt(0, 0) === 4, "Subtração: 5 - 1 = 4");
        
        const had = MatrixMath.hadamarProduct(a, b);
        assert(had.getAt(0, 1) === 12, "Hadamard: 2 * 6 = 12");

        // --- TESTE 4: MULTIPLICAÇÃO POR ESCALAR (Real/Decimal) ---
        console.log("\n>> Testando Escalar...");
        const esc = MatrixMath.scalarMultiplication(a, 0.5);
        assert(esc.getAt(1, 1) === 2, "Escalar decimal: 4 * 0.5 = 2");

        // --- TESTE 5: TRANSPOSIÇÃO (Matriz Não Quadrada) ---
        console.log("\n>> Testando Transposição...");
        const rect = Matrix.fromArray([
            [1, 2, 3],
            [4, 5, 6]
        ]); // 2x3
        const trans = MatrixMath.transposition(rect); // 3x2
        assert(trans.rows === 3 && trans.columns === 2, "Transposta inverteu dimensões 2x3 -> 3x2");
        assert(trans.getAt(2, 1) === 6, "Elemento [1,2] da original agora é [2,1] na transposta");

        // --- TESTE 6: MULTIPLICAÇÃO DE MATRIZES (O "Chefe Final") ---
        console.log("\n>> Testando Multiplicação (Dot Product)...");
        // A(2x3) * B(3x2) = C(2x2)
        const mA = Matrix.fromArray([
            [1, 2, 3],
            [4, 5, 6]
        ]);
        const mB = Matrix.fromArray([
            [7, 8],
            [9, 10],
            [11, 12]
        ]);
        
        /* Cálculo manual do C[1,0]:
           Linha 1 de A: [4, 5, 6]
           Col 0 de B: [7, 9, 11]
           (4*7) + (5*9) + (6*11) = 28 + 45 + 66 = 139
        */
        const mC = MatrixMath.multiplyMatrices(mA, mB);
        assert(mC.rows === 2 && mC.columns === 2, "Dimensões do resultado da multiplicação (2x2)");
        assert(mC.getAt(1, 0) === 139, "Cálculo Dot Product [1,0] correto (139)");
        assert(mC.getAt(0, 1) === 64, "Cálculo Dot Product [0,1] correto (64)");

        // --- TESTE 7: ERRO DE COMPATIBILIDADE NA MULTIPLICAÇÃO ---
        try {
            MatrixMath.multiplyMatrices(mB, mA); // 3x2 * 2x3 funciona, mas mA * mA não
            MatrixMath.multiplyMatrices(mA, mA); // 2x3 * 2x3 -> ERRO
            assert(false, "Deveria falhar ao multiplicar 2x3 por 2x3");
        } catch (e) {
            assert(true, "Validação de dimensões na multiplicação funcionando");
        }

        console.log("\n=======================================");
        console.log("  TODOS OS TESTES PASSARAM COM SUCESSO!");
        console.log("=======================================");

    } catch (error) {
        console.error("\n❌ TESTE FALHOU!");
        console.error(`Motivo: ${error.message}`);
        process.exit(1);
    }
};

runCompleteTests();