export interface Processo {
    NPU: string;
    movimentos?: number;
    totalDuration: number;
    totalMovimentos: number;
}

export interface ProcessoStats {
    avgCaseDuration: number;
    avgMovimentoDuration: number;
    avgMovimentosPerCase: number;
    casesCount: number;
    movimentosCount: number;
}
