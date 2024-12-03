document.addEventListener("DOMContentLoaded", (event) => {
    let flash = document.querySelector(".flash");
    if(flash !== null){
        flash.addEventListener("click", function(){
            flash.classList.remove("ani-fadein");
            flash.classList.add("ani-fadeout");
            setTimeout(() => {
                flash.remove();
            }, 800);
        })
    }
  });