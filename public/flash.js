document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    let flash = document.querySelector(".flash");
    if(flash !== null){
        flash.addEventListener("click", function(){
            flash.classList.remove("ani-fadein");
            flash.classList.add("ani-fadeout");
            setTimeout(() => {
                flash.remove();
            }, 1000);
        })
    }
  });