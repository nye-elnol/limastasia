let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {

  document.documentElement.style.setProperty('--main-color', mainColors);

    document.querySelectorAll(".colors-list li").forEach(element => {

      element.classList.remove("active");

      if (element.dataset.color === mainColors) {
        
        element.classList.add("active");
      }
    });

}

// Random Background option
let bckOpt = true;

// We gonna set a variable to control the background interval
let bckIntv;

let bckLclItm = localStorage.getItem("background_option");

if (bckLclItm !== null) {
  
  if (bckLclItm === 'true') {

    bckOpt = true;

  } else {

    bckOpt = false;

  }
  
  document.querySelectorAll(".rnd-or-cstm-bck span").forEach(element => {

    element.classList.remove("active");

  });

  if (bckLclItm === 'true') {

    document.querySelector(".rnd-or-cstm-bck .yes").classList.add("active"); 

  } else {

    document.querySelector(".rnd-or-cstm-bck .no").classList.add("active");

  }

}

// Toggle Spin
document.querySelector(".toggle-settings .fa-cog").onclick =  function () {

  this.classList.toggle("fa-spin");

  document.querySelector(".settings-box").classList.toggle("open");

}

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach(li => {

  li.addEventListener("click", (e) => {

    document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

    localStorage.setItem("color_option", e.target.dataset.color);

    hanActive(e);

  });

});

// Switch background options
const rndBckOpt = document.querySelectorAll(".rnd-or-cstm-bck span");

rndBckOpt.forEach(span => {

  span.addEventListener("click", (e) => {

    hanActive(e);

    if (e.target.dataset.bck === 'yes') {

      bckOpt = true;

      rndImgs();

      localStorage.setItem("background_option", true);

    } else {

      bckOpt = false;

      clearInterval(bckIntv);

      localStorage.setItem("background_option", false);

    }

  });

});

// Select Landing page element
let landPage = document.querySelector(".landing-page");

let imgArray = ["ftfour.jpg", "fttwel.jpg", "ftfvtn.jpg", "fttwfv.jpg"];

function rndImgs() {

  if(bckOpt === true) {
    
    bckIntv = setInterval( () => {

      let randNum = Math.floor(Math.random() * imgArray.length);

      // Change background image Url
      landPage.style.backgroundImage = 'url("images/' + imgArray[randNum] + '")';

      }, 3000 );
  
    }

}

rndImgs();

// Products Selector
let ourGoods = document.querySelector(".products");

window.onscroll = function () {

  let skOfTop = ourGoods.offsetTop;

  let skOutHei = ourGoods.offsetHeight;

  let winHei = this.innerHeight;

  let winScrTop = this.pageYOffset;

  if (winScrTop > (skOfTop + skOutHei - winHei)) {


    let allGoods = document.querySelectorAll(".product-box .product-progress span");

    allGoods.forEach(skill => {

      skill.style.width = skill.dataset.progress;

    });

  }

};

// Create pop up with the image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

  img.addEventListener('click', (e) => {

    let ovrl = document.createElement("div");

    ovrl.className = 'ppp-overlay';

    document.body.appendChild(ovrl);

    let pppBox = document.createElement("div");

    pppBox.className = 'ppp-box';

    if (img.alt !== null) {

      let imgHdg = document.createElement("h3");

      let imgTxt = document.createTextNode(img.alt);

      imgHdg.appendChild(imgTxt);
      
      pppBox.appendChild(imgHdg);

    }

    // Create the image of popup
    let pppImage = document.createElement("img");

    pppImage.src = img.src;

    pppBox.appendChild(pppImage);

    document.body.appendChild(pppBox);

    // Create the close span (The X sign) 
    let closeButton = document.createElement("span");

    let closeButtonTxt = document.createTextNode("X");

    closeButton.appendChild(closeButtonTxt);

    closeButton.className = 'close-button';

    pppBox.appendChild(closeButton);

  });

});

// Closing popup
document.addEventListener("click", function (e) {

  if (e.target.className == 'close-button') {

    e.target.parentNode.remove();

    document.querySelector(".ppp-overlay").remove();

  }

});


const allBull = document.querySelectorAll(".nav-bullets .bullet");



const allLinxx = document.querySelectorAll(".links a");

// Lets create a function for links in header
function scrToTar(elements) {

  elements.forEach(element => {

    element.addEventListener("click", (e) => {

      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({

        behavior: 'smooth'

      });

    });

  });

}

scrToTar(allBull);
scrToTar(allLinxx);

//Handling active status 
function hanActive(evt) {

    evt.target.parentElement.querySelectorAll(".active").forEach(element => {

      element.classList.remove("active");

    });

    evt.target.classList.add("active");

}

// Reset Button
document.querySelector(".reset-option").onclick = function () {

  localStorage.removeItem("color_option");

  localStorage.removeItem("background_option");

  window.location.reload();

};


// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {

  e.stopPropagation();

  this.classList.toggle("menu-active");

  tLinks.classList.toggle("open");

};

// Click anywhere to hide 
document.addEventListener("click", (e) => {

  if (e.target !== toggleBtn && e.target !== tLinks) {

    // Check if menu is open
    if (tLinks.classList.contains("open")) {

      toggleBtn.classList.toggle("menu-active");


      tLinks.classList.toggle("open");

    }

  }

});

// Stop Propagation on menu
tLinks.onclick = function (e) {

  e.stopPropagation();

}
