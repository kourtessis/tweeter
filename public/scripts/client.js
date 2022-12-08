/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
$(document).ready(function() {

  const $form = $('#tweet-form');
  loadTweets();
  $form.on('submit', tweetSubmitted);

});

const tweetSubmitted = (event) => {
  event.preventDefault();
  const result = $('#tweet-form').serialize();
  if(!$('#tweet-text').val()) {
    return alert('Invalid Submission')
  }
  if($('#tweet-text').val().length > 140 ) {
    return alert('Message exceeds limit')
  }

  $.post('/tweets', result, () => {
    loadTweets();
  });
  $('#tweet-text').val('');
  $('.counter').text(140);
};

const loadTweets = () => {
  $.get('/tweets', (tweets) => {
    renderTweets(tweets);
  });
};


const createTweetElement = function(tweetObj) {
  const name = tweetObj.user.name;
  const avatar = tweetObj.user.avatars;
  const handle = tweetObj.user.handle;
  const text = tweetObj.content.text;
  const date = timeago.format(tweetObj.created_at);

  const $tweet = `<article>
  <header>
    <div>
      <img src="${avatar}">
     <span>${name}</span>
    </div>
    <div>
      <i><strong>${handle}</strong></i>
    </div>
  </header>
  <p>${text}</p>
  <footer>
    <hr>
    <div>
      <i>${date}</i>
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
        <i class="likes">1</i>
      </div>
    </div>
  </footer>
</article>`
  return $tweet;
};

const renderTweets = function(tweets) {
  $('#tweet-container').empty();

  for (const tweet of tweets) {
    const element = createTweetElement(tweet);
    $('#tweet-container').prepend(element);
  }
};
