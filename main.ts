const btnShowHideVendors = document.querySelector(".btn_show_hide_vendors");
const btnReject = document.querySelector(".btn_reject");
const popup = document.getElementById("popup");
const body = document.getElementById("body");

window.onload = function() {
  checkCookie();
};

const fetchItems = async () => {
  const data = await fetch("https://vendorlist.consensu.org/vendorlist.json");

  const items = await data.json();
  const vendors = items.vendors;

  const vendorList = vendors
    .map(item => {
      return `<li class="li"><input class ="input_vendor_li" type="checkbox" checked></input> ${item.name}<a href="${item.policyUrl}">View Privacy Notice</a>  </li>`;
    })
    .join("");

  const ul = document.querySelector(".vendor_list_ul");

  // add li into ul list
  if (ul !== null) {
    ul.innerHTML = vendorList;
  }

  // get vendor list
  const inputVendorList: NodeListOf<HTMLInputElement> = document.querySelectorAll(
    ".input_vendor_li"
  );

  //checking the quantities vendors checked and disabling acceptance if the number is 0

  function checkChecked() {
    for (let i = 0; i < inputVendorList.length; i++) {
      if (!inputVendorList[i].checked) {
        if (btnAccept !== null) {
          btnAccept.disabled = true;
        }
      }
    }
  }
  checkChecked();

  // setCookie

  function setCookie(name: string, exdays: number) {
    var d = new Date();
    var vendorsObject: number[] = [];

    inputVendorList.forEach((element, index: number) => {
      if (element.checked == true) {
        vendorsObject.push(index);
      }
    });

    var jsonString = JSON.stringify(vendorsObject);
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie =
      name + "=" + jsonString + ";" + expires + ";path=/;secure";
  }

  // click Accept Button
  const btnAccept: HTMLInputElement | null = document.querySelector(
    ".btn_accept"
  );

  if (btnAccept !== null) {
    btnAccept.addEventListener("click", function() {
      setCookie("GDPRconsent", 1);
      if (popup !== null && body !== null) {
        popup.style.display = "none";
        body.style.overflow = "visible";
      }
    });
  }
};

// click Show Hide Vendors Button
if (btnShowHideVendors !== null) {
  btnShowHideVendors.addEventListener("click", function() {
    const vendorsList: HTMLElement | null = document.querySelector(
      ".vendors_list"
    );

    if (vendorsList !== null) {
      if (vendorsList.style.display == "none") {
        vendorsList.style.display = "block";
        btnShowHideVendors.textContent = "Hide Vendors";
      } else {
        vendorsList.style.display = "none";
        btnShowHideVendors.textContent = "Show Vendors";
      }
    }
  });
}

// click Reject Button

if (btnReject !== null) {
  btnReject.addEventListener("click", function() {
    if (popup !== null && body !== null) {
      popup.style.display = "none";
      body.style.overflow = "visible";
    }
  });
}

//check cookie and display/undisplay popup window

function checkCookie() {
  if (popup !== null && body !== null) {
    if (document.cookie.indexOf("GDPRconsent") < 0) {
      popup.style.display = "block";
      body.style.overflow = "hidden";
      fetchItems();
    } else {
      popup.style.display = "none";
    }
  }
}
