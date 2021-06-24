import {
    Wave
} from "./wave.js";

export class WaveGroup {
    // 여러 개의 웨이브 생성
    constructor() {
        this.totalWaves = 3;
        this.totalPoints = 6;

        this.color = ['rgba(255,0,0,0.4)', 'rgba(255,255,0,0.4)','rgba(0,255,255,0.4)'];
        // 각각 다른 3가지 파란색 (opacity =0.4 투명도)['rgba(255,199,235,0.4)', 'rgba(0,146,199,0.4)','rgba(0,87,158,0.4)']
        // 

        this.waves = [];

        for (let i = 0; i < this.totalPoints; i++) {
            const wave = new Wave(
            i,
            this.totalPoints,
            this.color[i], // 1개의 웨이브만 테스트
            );
            this.waves[i] = wave;
        }
    }
    //WaveGroup에도 resize, draw 각각 호출되면
    // WaveGroup에도 안에 있는 total Wave만큼의 함수를 실행
    resize(stageWidth, stageHeight) {
        for(let i = 0; i < this.totalPoints; i++) {
            const wave = this.waves[i];
            wave.resize(stageWidth, stageHeight);
        }
    }

    draw(ctx) {
        for(let i = 0; i < this.totalPoints; i++) {
            const wave = this.waves[i];
            wave.resize(stageWidth, stageHeight);
        }
    }
}
