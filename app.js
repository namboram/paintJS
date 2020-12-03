const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
//canvas사이즈 정해줘야함.(pixel을 다룰수 있는 element로서 만드는 거라서)
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//기본 배경색 설정
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;




let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;   
    if(!painting){ //클릭 안했을 때 
        ctx.beginPath(); //선의 시작점
        ctx.moveTo(x,y); //옮기기
    }else{ //클릭했을때 
        //현재 sub-path의 마지막 점을 특정 좌표와 직선으로 연결한다.
        ctx.lineTo(x,y);
        ctx.stroke();   //획 긋기
    }
}

//색 바꾸기
function handelColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;
}

function handelRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handelModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
        
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event){
    event.preventDefault(); //우클릭 방지

}

function handleSaveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "Paint🎨";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup" , stopPainting);
    canvas.addEventListener("mouseleave" , stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu" , handleCM);
}


//배열로 가져오기
Array.from(colors).forEach(color => 
    color.addEventListener("click", handelColorClick)
);

if(range){
    range.addEventListener("input", handelRangeChange)
}

if(mode){
    mode.addEventListener("click", handelModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click" , handleSaveClick);
}