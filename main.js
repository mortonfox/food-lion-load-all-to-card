// jshint esversion: 8

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runSelect(event) {
  event.preventDefault();

  // Scroll to the bottom a few times to try to get all coupons to show up.
  for (let i = 0; i < 5; ++i) {
    window.scrollTo(0, document.body.scrollHeight);
    await sleep(1000);
  }

  // Click on every "load to card" button.
  var load2crd = document.getElementsByClassName('fl-coupon-load');
  console.log(load2crd.length + ' coupons found');
  var clicked = 0;

  // Iterate in reverse because clicking on a button mutates the coupon list.
  for (var btn of Array.from(load2crd).reverse()) {
    btn.scrollIntoView();
    btn.click();
    clicked++;
    await sleep(1000);
  }
  console.log(clicked + ' coupons clicked');
}

function insertButton(btn) {
  function waitForSite() {
    var targetelem = document.getElementById('site-content-wrap');
    if (targetelem !== null) {
      clearInterval(waitForSiteTimer);
      targetelem.insertBefore(btn, targetelem.childNodes[0]);
    }
  }

  // Wait for site to finish loading before inserting button.
  var waitForSiteTimer = setInterval(waitForSite, 100);
}

function init() {
  // Make a new button for our action.
  var newbutton = document.createElement('button');
  newbutton.name = 'load_all_to_card';
  newbutton.id = 'load_all_to_card';
  newbutton.style.cssText = 'background-color: #fff; color: #E82A24; font-weight: 700; border: solid #E82A24; padding: 6px 10px; cursor: pointer; margin: 5px';

  newbutton.addEventListener('mouseenter',
    () => {
      newbutton.style.color = '#fff';
      newbutton.style.backgroundColor = '#E82A24';
    }
  );

  newbutton.addEventListener('mouseleave',
    () => {
      newbutton.style.color = '#E82A24';
      newbutton.style.backgroundColor = '#fff';
    }
  );

  newbutton.appendChild(document.createTextNode('Load All To Card'));
  newbutton.addEventListener('click', runSelect);

  insertButton(newbutton);
}

init();

// -- The End --
