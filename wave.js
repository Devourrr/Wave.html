import { 
    Point
 } from "./point.js";

export class Wave{
    constructor(index, totalPoints, color){
        //point가 동시에 움직이면 웨이브가 아닌 하나의 선처럼 보일 수 있기 때문에
        //고유 인덱스 번호를 넘겨줘서 약간 차이를 두고 움직이도록 Y위치(위아래)가 다른 Point 웨이브 생성
        this.index = index;
        this.totalPoints = totalPoints;
        //wave에 totalPoints를 넘겨줘서 몇 개의 포인트를 생성할 것인지 각 Wave마다 정의
        this.color = color;
        this.points = [];

    }

    resize(stageWidth, stageHeight){
        //그리고자 하는 애니메이션의 좌표값 가져오기(중요)
        //스테이지 넓이와 높이 설정, 애니메이션의 크기 파악
        this.stageWidth = stageWidth;
        this.stageHeight =  stageHeight;

        //화면 중간에 그리기(스테이지 넓이/2, 높이/2)
        this.centerX = stageWidth /2; 
        this.centerY = stageHeight /2;
        //포인트 간격 = 스테이지 넓이에서 totalPoints 나눈 값
        this.pointGap = this.stageWidth / (this.totalPoints - 1);

        this.init();
    }
    //rezie이벤트 일어난 후 centerX, centerY정해진 다음
    //init()로 Point 생성
    init() {
        this.point = [];
        // 정해진 간격에 맞춰서 포인트 화면에 그려주기
        for (let i = 0; i < this.totalPoints; i++) {
            const point = new Point(
                this.index + i,
                this.pointGap * i,
                this.centerY,
            );
            this.points[i] = point;
        }
    }
    //생성된 포인트에선 centerX, centerY값을 넘겨받아서
    //각각 포인트가 화면 중앙 기준으로 그려줄 수 있도록 draw()정의
    draw(ctx){
        ctx.beginPath(); //실행
        //point update되었으면 draw도 update(wave의 color값으로 정의)
        ctx.fillStyle = this.color;

        let prevX = this.points[0].x;
        let prevY = this.points[0].y; // 처음 point와 마지막 point는 움직이지 않음

        ctx.moveTo(prevX, prevY);
        // 가운데 point만 위아래로 움직여서 웨이브 움직임 만들기
        for(let i = 0; i<this.totalPoints; i++) { //point의 index값을 확인하고
            if(i< this.totalPoints - 1){ //index가 0이거나 total -1 과 같으면(마지막 index이면) update실행x
                this.points[i].update(); //그 외 index일 경우에만 update실행
            }
        

            const cx = (prevX + this.points[i].x) / 2;
            const cy = (prevY + this.points[i].y) / 2;

            //point 연결, 선으로 연결해서 어떻게 움직이는지 확인 후, 곡선으로 변경해서 웨이브가 움직이는 걸 확인
            //직선lintTo, 곡선
            ctx.quadraticCurveTo(prevX, prevY, cx, cy);

            prevX = this.points[i].x;
            prevY = this.points[i].y;
            
        }
        //현재 point의 x,y좌표를 그대로 적어주는 것이 아니라
        //이전 point를 현재 point를 반으로 나눈 값(중앙값)을 곡선의 중간값으로 잡아줘서 부드로운 곡선이 될 수 있도록 만들어줌
        ctx.lineTo(prevX, prevY);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight);
        ctx.fill();
        ctx.closePath(); // update 완료

        

        

        // this.point.update(); //웨이브 그리기 전에 움직임이 어떻게 진행되는지 
        // ctx.arc(this.point.x, this.point.y, 30, 0, 2 * Math.PI);
        // //업데이트 된 Point의 x, y 가지고 와서 테스트
        // ctx.fill();

    }
}