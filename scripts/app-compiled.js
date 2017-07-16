'use strict';

$(function () {
  // wikipedia api variables
  var apiRandom = 'https://en.wikipedia.org/w/api.php?format=json&action=query&list=random&rnredirect=true';
  var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
  var callback = '&callback=JSON_CALLBACK';
  var article = 'https://en.wikipedia.org/?curid=';

  // dom element variables;
  var randomArticle = document.getElementById('random-article');
  var inPart = document.querySelector('.initial-part');
  var $container = $('#container');
  var footer = document.querySelector('.footer');

  // if ($(document).height() <= $(window).height()) {
  //   footer.classList.add = "navbar-fixed-bottom";
  // } else if($(document).height() > $(window).height()){
  //   $(".footer").classList.remove = 'navbar-fixed-bottom';
  // }

  // to get data for random article on page's load
  $.ajax({
    url: apiRandom + callback,
    data: {
      format: 'json'
    },
    dataType: 'jsonp'
  }).done(function (data) {
    //console.log(data);
    //let elRandom = document.getElementById('random-article');
    //console.log(data.query.random[0].id);
    randomArticle.href = article + data.query.random[0].id;
  });

  $('#info').on('keydown', function (event) {
    // console.log(event.keyCode, event.type);
    var title = $('#info').val();

    if (event.type === 'keydown' && event.keyCode == 13) {
      $.ajax({
        url: api + title + callback,
        data: {
          format: 'json'
        },
        dataType: 'jsonp'
      }).done(function (data) {
        console.log(data.query);
        if (data.query === undefined && title !== '') {
          inPart.style.paddingTop = 20 + '%';
          $container.html('<div class="text-center text">The page "<b>' + title + '</b>" does not exist. You can ask for it to be created</div>');
        } else if (title === '') {
          inPart.style.paddingTop = 20 + '%';
          $container.html('<div class="text-center text">Please, enter your query.</div>');
        } else {
          inPart.style.paddingTop = 0;
          console.log(data);
          var page = data.query.pages;
          $container.html('');
          for (var prop in page) {

            if (page.hasOwnProperty(prop)) {
              console.log(page[prop].title);

              var link = document.createElement('a');
              var paragraph = document.createElement('p');
              var elDiv = document.createElement('div');

              link.innerHTML = '<h3>' + page[prop].title + '</h3>';
              paragraph.textContent = page[prop].extract;
              link.setAttribute('href', article + page[prop].pageid);
              link.setAttribute('target', '_blank');
              elDiv.id = 'wrapper';
              elDiv.classList = 'col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2';
              link.appendChild(paragraph);
              elDiv.append(link);
              $container.append(elDiv);
            }
          }
        }
      });
      return false;
    }
  });

  $('#random-article').on('click', function () {
    $.ajax({
      url: apiRandom + callback,
      data: {
        format: 'json'
      },
      dataType: 'jsonp'
    }).done(function (data) {
      //console.log(data);
      //console.log(data.query.random[0].id);
      randomArticle.href = article + data.query.random[0].id;
    });
  });
});

//# sourceMappingURL=app-compiled.js.map