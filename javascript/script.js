let $fruits = $('.fruit');
let $blanks = $('.blank td');
let count = 0;
let correct = new Audio('./audio/correct.wav');
let uncorrect = new Audio('./audio/uncorrect.wav');
let endingbox = document.querySelector('.end');
let btnReplay = endingbox.querySelector('button');

console.log(btnReplay);
// 과일 랜덤 위치
$fruits.each(function(){
  let positionX = Math.floor(Math.random() * 550 + 850);
  let positionY = Math.floor(Math.random() * 400 + 170);
  
  $(this).css({'left' : positionX, 'top' : positionY});
});

//과일 드래그
$fruits.draggable({
  //드래그 끝났을 시
  stop:function(){
    let $id = $(this).index();
    let $fruitLeft = $(this).offset().left;
    let $fruitTop = $(this).offset().top;
    let $fruitWidth = $(this).width() / 2;
    let $fruitHeight = $(this).height() / 2;

    let $blankbox = $blanks.eq($id);
    let targetWidth = $blankbox.width();
    let targetHeight = $blankbox.height();
    let targetLeft = $blankbox.offset().left;
    let targetTop = $blankbox.offset().top;
    
    let minLeft, minTop, maxLeft, maxTop;
    minLeft = targetLeft - $fruitWidth;
    maxLeft = targetLeft + targetWidth - $fruitWidth;
    minTop = targetTop - $fruitHeight;
    maxTop = targetTop + targetHeight - $fruitHeight;

    //칸 안에 드랍
    if( $fruitLeft > minLeft && $fruitLeft < maxLeft && $fruitTop > minTop && $fruitTop < maxTop){
      count++;
      $(this).draggable('destroy');
      $(this).css({cursor:'auto', left: targetLeft + $fruitWidth - 6, top: targetTop + $fruitHeight - 9});
      correct.play();
      console.log(count);

        if(count == $fruits.length){
          endingbox.classList.add('on');
        }
      
    }else{//칸 외에 드랍
      uncorrect.play();
      $(this).css({left: Math.floor(Math.random() * 550+850), top: Math.floor(Math.random() * 500 + 50) })
      
    }

  }
});

//다시하기 버튼
$(btnReplay).click(()=>{
  location.reload();
})