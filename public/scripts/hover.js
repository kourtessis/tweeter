$(document).ready(function() {
  $('tweet-spot').on('hover', hoverFunc);
});

const hoverFunc = function(e) {
  const hovered = $(this)
  this.addClass('.shadow-box')
}

