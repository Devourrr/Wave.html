export class Point {
    constructor(x,y){
        this.x = x; // 일정 간격 좌표생성
        this.y = y;
        this.fixedY = y;
        this.speed = 0.1; //y값을 위아래로 이동, 좌표 이어그린 line 생성
        this.cur = index; //point update → point에 index값 넘겨줘서 현재 point가 몇 번째 point인지 정의
        this.max = Math.random() * 100 + 150; //얼만큼 움직이는지 난수 생성
    }

    update() {
        this.cur += this.speed; //현재값 speed만큼 증가
        this.y = this.fixedY + (Math.sin(this.cur) * this.max);
        //sin함수로 아래위 움직임 기능
    }
}