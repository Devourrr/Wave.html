import { 
    WaveGroup
} from "./wavegroup.js";

class App{
    
    constructor(){
        // 캔버스 생성
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.wavegroup = new WaveGroup(); //wave 생성 → update, wavegroup로 변경

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize(); //resize 이벤트 걸어주기
        //animation 시작함수 사용
        requestAnimationFrame(this.animate.bind(this));
    }

    //update → wavegroup으로 변경
    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        // 캔버스를 더블 사이즈로 지정(레티나 디스플레이에서도 잘 보일 수 있게)
        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2,2);

        this.wavegroup.resize(this.stageWidth, this.stageHeight);

    }

    animate(t) {
        //캔버스 클리어를 animate()에 추가
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.wavegroup.draw(this.ctx);

        requestAnimationFrame(this.animate.bind(this));
    }
}
//window load가 되면 App을 생성
window.onload = () => {
    new App();
};