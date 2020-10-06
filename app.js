'use strict';

//storing all the stuff from Photo constructor
let keyWords = [];

// Drop down menu selector
let $selectEl = $('select');
// Grabbing the id photo-template from HTML section. We will append here.

// let $photoTemplate = $('#photo-template'); // no longer needed with new mustache template - I think... tbd
let $photoContainer = $('#photo-container');
let $photoContainerTwo = $('#photo-container-two');

// Constructor to build our instances from .ajax
function Photo(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// page one

let pageOneObjects = [];
// push the construtor object to an outside array. clear the html then rerender after the object has been sorted.

// Calling all our data from page-1.json
$.ajax('./data/page-1.json').then((data) => {
  data.forEach((photoInfo) => {
    let photoObject = new Photo(
      photoInfo.image_url,
      photoInfo.title,
      photoInfo.description,
      photoInfo.keyword,
      photoInfo.horns
    );
    pageOneObjects.push(photoObject);

    let $template = $('#template').html();
    // Populate with data
    let rendered = Mustache.render($template, photoObject);
    $photoContainer.append(rendered);
    //render(photoObject);

    //This will fill up the keyWords let global variable
    if (keyWords.indexOf(photoObject.keyword) === -1) {
      keyWords.push(photoObject.keyword);
      $selectEl.append($('<option class="One"></option>').text(photoObject.keyword));
    }
  }); // loop ends

  // We made sorting work (thanks Brandon)
  $('#sorting').on('change', function (event) {

    // for horn sorting
    if (event.target.value === 'horn-sort') {
      pageOneObjects.sort((a, b) => a.horns - b.horns);
      //console.log('horn sort worked!');
      $('#photo-container').empty();

      pageOneObjects.forEach((index) => {
        let $template = $('#template').html();
        // Populate with data
        let rendered = Mustache.render($template, index);
        $photoContainer.append(rendered);
      });
    }

    // for name sorting
    if (event.target.value === 'name-sort') {
      pageOneObjects.sort(compare);
      //console.log(pageOneObjects);
      $('#photo-container').empty();

      pageOneObjects.forEach((index) => {
        let $template = $('#template').html();
        // Populate with data
        let rendered = Mustache.render($template, index);
        $photoContainer.append(rendered);
      });
    }
  });

  // for the dropdown menu options
  $('select').on('change', function (event) {
    let selected = event.target.value;
    let takeAway = $('.photo');
    takeAway.hide();
    keyWords.forEach((index) => {
      if (selected === index) {
        let $bringBack = $(`.${index}`);
        $bringBack.show();
      }
      if (selected === 'default') {
        takeAway.show();
      }
    });
  });
});

// used to sort by keywords
function compare(a, b) {
  let newA = a.keyword.toUpperCase();
  let newB = b.keyword.toUpperCase();

  let comparison = 0;
  if (newA > newB) {
    comparison = 1;
  }
  else if (newA < newB) {
    comparison = -1;
  }
  return comparison;
}

////////////////////////////////////////////////////////////////////////////////////////////////
// page 2
let pageTwoObjects = [];

$.ajax('./data/page-2.json').then((data) => {
  data.forEach((photoInfo) => {
    let photoObjectTwo = new Photo(
      photoInfo.image_url,
      photoInfo.title,
      photoInfo.description,
      photoInfo.keyword,
      photoInfo.horns
    );
    pageTwoObjects.push(photoObjectTwo);

    let $template = $('#template').html();
    // Populate with data
    let rendered = Mustache.render($template, photoObjectTwo);
    $photoContainerTwo.append(rendered);


    //This will fill up the keyWords let global variable
    if (keyWords.indexOf(photoObjectTwo.keyword) === -1) {
      keyWords.push(photoObjectTwo.keyword);
      $selectEl.append($('<option class="Two"></option>').text(photoObjectTwo.keyword));
    }
    $photoContainerTwo.hide();
    $('.Two').hide();
  }); // loop ends

  // We made sorting work (thanks Brandon)
  $('#sorting').on('change', function (event) {

    // for horn sorting
    if (event.target.value === 'horn-sort') {
      pageTwoObjects.sort((a, b) => a.horns - b.horns);
      //console.log('name or horn sort worked!');
      $('#photo-container-two').empty();

      pageTwoObjects.forEach((index) => {
        let $template = $('#template').html();
        // Populate with data
        let rendered = Mustache.render($template, index);
        $photoContainerTwo.append(rendered);
      });
    }

    // for name sorting
    if (event.target.value === 'name-sort') {
      pageTwoObjects.sort(compare);
      //console.log(pageOneObjects);
      $('#photo-container-two').empty();

      pageTwoObjects.forEach((index) => {
        let $template = $('#template').html();
        // Populate with data
        let rendered = Mustache.render($template, index);
        $photoContainerTwo.append(rendered);
      });
    }

  });
});

$('#second-page').on('click', function () {
  $('#photo-container').hide();
  $('.One').hide();
  $photoContainerTwo.show();
  $('.Two').show();
});
