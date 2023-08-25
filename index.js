/*smooth scrolling
attach loco scroll CSS
attach LocomotiveScroll min js
some code from loco gitup for js
//gsap
attach gsap
//scrilltrigger*/
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});


function firstPageAnim(){
    var tl = gsap.timeline();


    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1,
        ease: Expo.easeInOut,
    })
        .to(".boundingelem", {
            y:0,
            ease: Expo.easeInOut,
            duration: 1,
            ease: Expo.easeInOut,
            delay:-1,
            stagger:.2

            
        })
        .from("#herofooter", {
            y: '-10',
            opacity: 0,
            duration: 1,
            delay:-1,
            ease: Expo.easeInOut,
        })

         
}
var timeout;

//jab mouse ho toh hum log skew kar paye aur max skew and min. skew define kar paaye
function circleskewPoint(){
    //mouse jo hai vo chapta hoo raha hai mtlb aagye jaa raha tih +++ value or peeche aaraha hai --- value mtlb kyy humko be to ech ka difference chaiye    //but the point is  agr user ne jada differdence le liya toh kyy toh humko kyy krana hogaa ek range set krni hogi.. i.e(.8-1.2) beech me kyy hai 1
    //define the dafault scale value
    var xscale=1;
    var yscale=1;

    var xprev =0;
    var yprev=0;
    window.addEventListener("mousemove",function(dets){
        clearTimeout(timeout);
         //console.log(xdiff,ydiff); dekh rahe the
       //clamp ek gsap ka function hai jo humko value ko within specific range kr deta hai humko jo krna hai .8 se 1.2 tk
       xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX-xprev);
       yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY -yprev);

       //var xdiff= dets.clientX-xprev;//difference jo phele nai value  or nahi value
      // var ydiff= dets.clientY -yprev;

       xprev=dets.clientX;
       yprev=dets.clientY;
       
       circleMouseFollower(xscale, yscale);
       timeout=setTimeout(function(){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px)  scale(1,1)`;

       },100);
      




    });
}

function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove",function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px)  scale(${xscale}, ${yscale})`;
    });
    
  
}
circleMouseFollower();
circleskewPoint();

firstPageAnim();
/* teeno elment ko select karo, jo ki elem class  ke hai common class hai teeno mein hum un teeno pr mousemove laggye jab mousemove ho toh ye ppata karo ki mouse kaha par hi,jiska mtlb hAI ki x and y position pata karo, ab mouse ki x y position ke badle us image ko show karo and us image ko move karo, move karte waqt rotate karo, and jaise jaise mouse tez chale waise waise rotation bhi tez hojaye... yeahi hai pura code ka function jo humko krne hai*/
document.querySelectorAll(".elem").forEach(function(elem){
    var rotate=0;
    var diffi=0;
    elem.addEventListener("mouseleave",function(details){
        var diff=details.clientY-elem.getBoundingClientRect().top;
        diffi=details.clientX-rotate;
        rotate=details.clientX
        
    
       
       
       
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            
           
        
            
          });
        });


elem.addEventListener("mousemove",function(details){
    var diff=details.clientY-elem.getBoundingClientRect().top;
    diffi=details.clientX-rotate;
    rotate=details.clientX
    

   
   
   
    gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: details.clientX,
        rotate: gsap.utils.clamp(-20,20,diffi*0.5),
        
      });
    });

});


