// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

function ValidateEmail(email) {
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

$(document).ready(function(){

  $('#newsletter-signup-btn').click(function(){
    var email = $('#newsletter-email').val();
    if (!ValidateEmail(email)) {
      toastr.error("You have entered an invalid email address!", 'Newsletter');
      return;
    }
    $.ajax({
      type: 'POST',
      url: 'http://api.xenblocks.com:3002/newsletter',
      data: {
        email: email
      },
      success: function(data, status, xhr) {
        toastr.success("Thank you, you have signed up to the newsletter.", 'Newsletter')
        $('#newsletter-email').val('');
      },
      error: function(xhr, status, error) {
        toastr.error("There was an error singin up to the newsletter.", 'Newsletter')
        $('#newsletter-email').focus();
      }
    });
  });

  $('#member-signup-btn').click(function(){
    var name =          $('#member-name').val();
    var email =         $('#member-email').val();
    var expertise =     $('#member-expertise').val();

    var mining =        $('#member-mining').is(':checked');
    var community =     $('#member-community').is(':checked');
    var documentation = $('#member-documentation').is(':checked');
    var design =        $('#member-design').is(':checked');

    var marketing =     $('#member-marketing').is(':checked');
    var forum =         $('#member-forum').is(':checked');
    var telegram =      $('#member-telegram').is(':checked');
    var social =        $('#member-social').is(':checked');

    var blogs =         $('#member-blogs').is(':checked');
    var webdev =        $('#member-webdev').is(':checked');
    var walletdev =     $('#member-walletdev').is(':checked');
    var blockchaindev = $('#member-blockchaindev').is(':checked');

    var partnerships =  $('#member-partnerships').is(':checked');
    var advisor =       $('#member-advisor').is(':checked');
    var investor =      $('#member-investor').is(':checked');
    var other =         $('#member-other').is(':checked');

    var tellusmore =    $('#member-tellusmore').val();
    var recaptcha =     $('#g-recaptcha-response').val();

    if (!name || !expertise) {
      toastr.error('Please complete the required fields.');
      return;
    }

    if (!recaptcha) {
      toastr.error('Please check recaptcha.');
      return;
    }

    if (!ValidateEmail(email)) {
      toastr.error('Please enter a valid email address.');
      return;
    }

    $.ajax({
      type: 'POST',
      url: 'http://api.xenblocks.com:3002/members',
      data: {
        name: name,
        email: email,
        expertise: expertise,
        mining: mining,
        community: community,
        documentation: documentation,
        design: design,
        marketing: marketing,
        forum: forum,
        telegram: telegram,
        social: social,
        blogs: blogs,
        webdev: webdev,
        walletdev: walletdev,
        blockchaindev: blockchaindev,
        partnerships: partnerships,
        advisor: advisor,
        investor: investor,
        other: other,
        tellusmore: tellusmore,
        'g-recaptcha-response': recaptcha,
      },
      success: function(data, status, xhr) {
        $('#member-alert').show();
        $('#member-alert').removeClass('hidden');
        $('#join-form').hide();
      },
      error: function(xhr, status, error) {
        toastr.error("There was an error processing the request.");
        $('#newsletter-email').focus();
      }
    });

  });

});