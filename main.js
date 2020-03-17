"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var btnShowHideVendors = document.querySelector(".btn_show_hide_vendors");
var btnReject = document.querySelector(".btn_reject");
var popup = document.getElementById("popup");
var body = document.getElementById("body");
window.onload = function () {
    checkCookie();
};
var fetchItems = function () { return __awaiter(void 0, void 0, void 0, function () {
    //Checking the quantities vendors checked and disabling acceptance if the number is 0
    function checkChecked() {
        for (var i = 0; i < inputVendorList.length; i++) {
            if (!(inputVendorList[i].checked)) {
                if (btnAccept !== null) {
                    btnAccept.disabled = true;
                }
            }
        }
    }
    // setCookie
    function setCookie(name, exdays) {
        var d = new Date();
        var vendorsObject = [];
        inputVendorList.forEach(function (element, index) {
            if (element.checked == true) {
                vendorsObject.push(index);
            }
        });
        var jsonString = JSON.stringify(vendorsObject);
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + jsonString + ";" + expires + ";path=/;secure";
    }
    var data, items, vendors, vendorList, ul, inputVendorList, btnAccept;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("https://vendorlist.consensu.org/vendorlist.json")];
            case 1:
                data = _a.sent();
                return [4 /*yield*/, data.json()];
            case 2:
                items = _a.sent();
                vendors = items.vendors;
                vendorList = vendors.map(function (item) {
                    return "<li class=\"li\"><input class =\"input_vendor_li\" type=\"checkbox\" checked></input> " + item.name + "<a href=\"" + item.policyUrl + "\">View Privacy Notice</a>  </li>";
                }).join('');
                ul = document.querySelector(".vendor_list_ul");
                // Add li into ul list
                if (ul !== null) {
                    ul.innerHTML = vendorList;
                }
                inputVendorList = document.querySelectorAll(".input_vendor_li");
                checkChecked();
                btnAccept = document.querySelector(".btn_accept");
                if (btnAccept !== null) {
                    btnAccept.addEventListener("click", function () {
                        setCookie("GDPRconsent", 1);
                        if (popup !== null && body !== null) {
                            popup.style.display = "none";
                            body.style.overflow = "visible";
                        }
                    });
                }
                return [2 /*return*/];
        }
    });
}); };
// click Show Hide Vendors
if (btnShowHideVendors !== null) {
    btnShowHideVendors.addEventListener("click", function () {
        var vendorsList = document.querySelector(".vendors_list");
        if (vendorsList !== null) {
            if (vendorsList.style.display == "none") {
                vendorsList.style.display = "block";
                btnShowHideVendors.textContent = "Hide Vendors";
            }
            else {
                vendorsList.style.display = "none";
                btnShowHideVendors.textContent = "Show Vendors";
            }
        }
    });
}
// click Reject Button
if (btnReject !== null) {
    btnReject.addEventListener("click", function () {
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
        }
        else {
            popup.style.display = "none";
        }
    }
}
