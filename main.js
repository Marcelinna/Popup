
const ul = document.querySelector(".vendor_list_ul");
const btnShowHideVendors = document.querySelector(".btn_show_hide_vendors")
const vendorsList = document.querySelector(".vendors_list")
const btnAccept = document.querySelector(".btn_accept")
const btnReject = document.querySelector(".btn_reject")
const popup = document.getElementById("popup")
const body = document.getElementById("body")


window.onload = function(){
    checkCookie();
}

const fetchItems = async()=>{
    const data = await fetch("https://vendorlist.consensu.org/vendorlist.json")


    const items = await data.json();
    const vendors = items.vendors


    const ven = vendors.map(item=>{
        return`<li class="li"><button class ="btn_vendor_li" type="button"><i class="fas fa-check"></i></button> ${item.name}<a href="${item.policyUrl}">View Privacy Notice</a>  </li>`
    }).join('')
    
    ul.innerHTML=ven;  

    //Toggle btn 
    const btn = document.querySelectorAll(".btn_vendor_li");
    
    btn.forEach(element => element.addEventListener("click", function(){
    
    if(element.style.backgroundColor == "rgb(255, 255, 255)"){
        element.style.backgroundColor ="rgb(43, 130, 243)";
    }
    else{

        element.style.backgroundColor ="rgb(255, 255, 255)";
    }
    //element.classList.toggle('complete');
    }))

}


btnShowHideVendors.addEventListener("click", function(){
   
    if(vendorsList.style.display == "none"){
    vendorsList.style.display = "block";
    btnShowHideVendors.textContent="Hide Vendors"
    }
    else{
    vendorsList.style.display = "none";
    btnShowHideVendors.textContent="Show Vendors"
    }
})

btnAccept.addEventListener("click",function(){
    setCookie("popup","Consent", 1);
    popup.style.display="none";
    body.style.overflow = "visible";

})

btnReject.addEventListener("click",function(){
    popup.style.display="none";
    body.style.overflow = "visible";
})


// function setCookie(nazwa, wartosc, dni){
//         var data = new Data();
//         data.setTime(data.getTime()+(dni * 24 * 60 * 60 * 1000));
//         var expires ="expires="+data.toGMTString();

//     document.cookie = nazwa + "=" + wartosc + expires + ";path=/";
// }

function setCookie(name, value, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
      }

 function checkCookie(){
     if(document.cookie.indexOf("popup")<0){
        popup.style.display="block";
        body.style.overflow = "hidden";
         fetchItems();
     }else{
        popup.style.display="none";
     }
    
 }


