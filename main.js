
const btnShowHideVendors = document.querySelector(".btn_show_hide_vendors")
const btnReject = document.querySelector(".btn_reject")
const popup = document.getElementById("popup")

window.onload = function(){
    checkCookie();
}

const fetchItems = async()=>{
    const data = await fetch("https://vendorlist.consensu.org/vendorlist.json")

    const items = await data.json();
    const vendors = items.vendors
    
    const ven = vendors.map(item=>{
        return`<li class="li"><input class ="input_vendor_li" type="checkbox" checked></input> ${item.name}<a href="${item.policyUrl}">View Privacy Notice</a>  </li>`
    }).join('')

    const ul = document.querySelector(".vendor_list_ul");
    
    ul.innerHTML=ven;  

    const inputVendorList = document.querySelectorAll(".input_vendor_li");

    //Checking the quantities vendors checked and disabling acceptance if the number is 0

    function checkChecked() {
        for(let i=0; i<inputVendorList.length; i++) {
            if(!(inputVendorList[i].checked)){
              btnAccept.disabled = true
            }
        }
    }
    checkChecked()
    
// setCookie

    function setCookie(name, exdays,) {
        var d = new Date();
        var vendorsObject = [];
        
        inputVendorList.forEach((element, index) =>{
           
            if (element.checked==true){
                vendorsObject.push(index)
                
            }  
         })
       
        var jsonString = JSON.stringify(vendorsObject);
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = name + "=" + jsonString + ";" + expires + ";path=/;secure";
      }

// click Accept Button 
     const btnAccept = document.querySelector(".btn_accept")

      btnAccept.addEventListener("click",function(){
        setCookie("popup", 1);
        popup.style.display="none";
        body.style.overflow = "visible";
    
    })

}

// click Show Hide Vendors
btnShowHideVendors.addEventListener("click", function(){

    const vendorsList = document.querySelector(".vendors_list")
   
    if(vendorsList.style.display == "none"){
    vendorsList.style.display = "block";
    btnShowHideVendors.textContent="Hide Vendors"
    }
    else{
    vendorsList.style.display = "none";
    btnShowHideVendors.textContent="Show Vendors"
    }
})

// click Reject Button

btnReject.addEventListener("click",function(){
    const body = document.getElementById("body")

    popup.style.display="none";
    body.style.overflow = "visible";
})

//check cookie and display/undisplay popup window

 function checkCookie(){
     if(document.cookie.indexOf("popup")<0){
        popup.style.display="block";
        body.style.overflow = "hidden";
         fetchItems();
     }else{
        popup.style.display="none";
     }  
 }


