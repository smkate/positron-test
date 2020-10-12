"use strict";

let tab = function () {
  let tabNav = document.querySelectorAll(".services__list-titles-btn"),
    tabContent = document.querySelectorAll(".services__list-items"),
    tabName;

  for (let tab of tabNav) {
    tab.addEventListener("click", selectTabNav);
  }

  function selectTabNav() {
    for (let tab of tabNav) {
      tab.classList.remove("active");
    }
    this.classList.toggle("active");
    tabName = this.getAttribute("data-name");
    selectTabContent(tabName);
  }

  function selectTabContent(tabName) {
    for (let i = 0; i < tabContent.length; i++) {
      if (tabName == i) {
        tabContent[i].classList.add("active");
      } else {
        tabContent[i].classList.remove("active");
      }
    }
  }
};

tab();

const workItem = document.querySelectorAll(".work-steps__list-item");
const workBox = document.querySelector(".work-steps");

workBox.addEventListener('scroll', function(){
  console.log(workBox.scrollY);
  // for (let work of workItem) {
  //   work[1].style.opacity = "1";
  //   work[2].style.opacity = "1";
  // }
  // workItem.setAttribute('startOffset', window.scrollY * 0.8);
});

// let myPath = document.getElementById("line");
// let length = myPath.getTotalLength();
// console.log(length);
