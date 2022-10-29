
let lottoNumList = [];
let onNumList = [];
const Colors = ["#f06292","#9575cd","#64b5f6","#4dd0e1", "#81c784"];
const lottoResult = document.getElementById("lottoResult");
let paperWrap = document.querySelector(".paperWrap");
const autoBtn = document.getElementById("autoBtn");
const resultBtn = document.getElementById("resultBtn");
const resetBtn = document.getElementById("resetBtn");
const print = document.getElementById("print");
let td = paperWrap.getElementsByTagName('td');

let selCount = 0;


//번호 자동생성 버튼
autoBtn.addEventListener("click", function(){
  while(onNumList.length < 6){
    let ranNum = Math.floor(Math.random()*45) + 1;
    if(onNumList.includes(ranNum) === false){
      onNumList.push(ranNum);
      td[ranNum-1].classList.replace('off', 'on');
      selCount++;
    }
  }
  console.log(onNumList);
});

//시작하기
  let table = document.createElement("table");
  paperWrap.appendChild(table);
  let n = 1;
  for(let i = 0; i < 7; i++){
    let tr = document.createElement("tr");
    table.appendChild(tr);
    for(let j = 0; j < 7; j++){
      let td = document.createElement("td");
      td.classList.add("off");

      tr.appendChild(td);
      td.textContent = n;
      td.addEventListener("click",function(){
        if(td.className === 'on'){
          td.classList.replace('on', 'off');
          let index = onNumList.indexOf(td.innerHTML);
          onNumList.splice(index, 1);
          selCount--;   
        } else if(td.className === "off"){
          if(selCount === 6){
            alert("6개 이상 선택 할 수 없습니다");
            return;
          }
          td.classList.replace('off', 'on');
          onNumList.push(Number(td.innerHTML));
          selCount++;
        }
      });
      
      n++;
      if(n > 45){
        break;
      }
    }
  }

//로또번호 vue
function circleNum(ranNum){
  let index = lottoNumList.length;
  setTimeout(function(){
      let circleN = document.createElement("div");
      if(index != 7){
          circleN.classList.add("circle");
       } else {
          circleN.classList.add("bonus");
       }

       let color;
       if(ranNum < 10){
           color = Colors[2];
       } else if(ranNum >= 10 && ranNum < 20){
           color = Colors[4];
       } else if(ranNum >= 20 && ranNum < 30){
           color = Colors[0];
       } else if(ranNum >= 30 && ranNum < 40){
           color = Colors[1];
       } else if(ranNum >= 40 && ranNum <= 45){
           color = Colors[3];
       }

      circleN.style.backgroundColor = color;
      circleN.textContent = ranNum;
      lottoResult.appendChild(circleN);

  },index * 300);
}

//당첨확인
resultBtn.addEventListener("click", function(){
  print.innerHTML = "";
  let count = 0;
  let bonus = 0;
  if(selCount < 6){
    alert("6개의 숫자를 선택하거나 자동에 체크 해주세요");
    return false;
  }
  while(lottoNumList.length < 8){
    let ranNum = Math.floor(Math.random()*45) + 1;
    if(lottoNumList.includes(ranNum) === false){
      if(lottoNumList.length === 6){
        ranNum = "+";
      }
      lottoNumList.push(ranNum);
      circleNum(ranNum)
    }
  }

  console.log("당첨번호 : " + lottoNumList);
  console.log("나의번호 : " + onNumList);
  
  for(let i = 0; i < onNumList.length; i++){
    if(lottoNumList.includes(onNumList[i]) === true){
      if(lottoNumList[lottoNumList.length-1] === onNumList[i]){ // 보너스번호와 같은지 체크
        bonus++;
      } else {
        count++;
      }
      td[onNumList[i]-1].classList.replace('on', 'red');
    }
  }

  //결과출력
  let m;
  if(count === 6){
    m = "축하합니다!! 1등당첨 십억";
  } else if(count === 5 && bonus === 1) {
    m = "축하합니다!! 2등당첨 오천만원";
  } else if(count === 5  || count === 4 && bonus === 1){
    m = "축하합니다!! 3등당첨 백만원";
  } else if(count === 4 || count === 3 && bonus === 1){
    m = "축하합니다!! 4등당첨 오만원";
  } else if(count === 3 || count === 2 && bonus === 1){
    m = "축하합니다!! 5등당첨 오천원";
  } else {
    m = "꽝.. 다음기회에!";
  }
  let r = document.createElement("div");
  r.classList.add("r");
  r.textContent=m;
  print.appendChild(r);
  console.log(count);

});

//다시하기
resetBtn.addEventListener("click",function(){
  lottoNumList = [];
  onNumList = [];
  selCount = 0;
  lottoResult.innerHTML = "";
  print.innerHTML = "";
  // 선택 초기화
  let td = paperWrap.getElementsByTagName('td');
  for(let i = 0; i < td.length; i++){
    td[i].classList.replace('on', 'off'); //('변경전이름', '변경후이름')
    td[i].classList.replace('red', 'off'); //('변경전이름', '변경후이름')
  }
});
