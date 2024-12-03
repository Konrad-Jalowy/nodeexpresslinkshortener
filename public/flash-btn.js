document.addEventListener("DOMContentLoaded", (event) => {
    let copy_btn = document.querySelector("#copy-btn");
    let flash_link = document.querySelector("#flash-link");

    if(copy_btn !== null){
        copy_btn.addEventListener("click", function(e){
            e.stopPropagation();
            navigator.clipboard.writeText(flash_link.textContent).then(
                () => {
                    copy_btn.textContent = "COPIED!";
                    copy_btn.setAttribute('disabled', true);
                },
                () => {
                  console.error("Cannot copy!");
                },
              );
            

            console.log(flash_link.textContent);
        });
    }
  });