var clicked = false;
var done = false;
var message = "I am message";
var score = 1;

$(function() {
    $(window).load(function() {
        start_bot();
    });

    $('#chatbot-form-btn').click(function(e) {
        //e.preventDefault();
        message = $('#textInput').val();
        $('#textInput').val('');

        // print the user message
        $(".media-list").append('<li class="conversation-part conversation-part--animation conversation-part--answer"><div class="answer text-ltr"><div class="bubble no-border theme-background"><div class="bubble-label">' + message + '</div></div></div></li>');
        $(".fixed-height").stop().animate({ scrollTop: $(".fixed-height")[0].scrollHeight}, 1000);
        clicked = true;
    });

    $('#refresh-button').click(function(e) {
        e.preventDefault();
        $('#chatbox-container').find('.media-list').html('');
        start_bot();
    });

    $('#textInput').keypress(function (e) {
      if (e.which == 13) {
          e.preventDefault();
          $('#chatbot-form-btn').trigger("click");
      }
    });
});

async function print_response(answer) {
    if ($('.media-list li:last-child').attr("id") == "waiting") {
        $('.media-list li:last-child').remove();
    }
    $(".media-list").append('<li class="conversation-part conversation-part--question"><div class="avatar-wrapper same-row"><div class="avatar"></div></div><div class="same-row question-part text-ltr"><div class="bubble no-border" style="display: table; direction: unset;"><div class="bubble-label"><div>'  + answer + '</div></div></div></div></li>');
    $(".fixed-height").stop().animate({ scrollTop: $(".fixed-height")[0].scrollHeight}, 1000);
}

async function waiting_response() {
    if ($('.media-list li:last-child').attr("id") != "waiting") {
        $(".media-list").append('<li class="conversation-part conversation-part--animation conversation-part--question" id="waiting"><div class="avatar-wrapper same-row"><div class="avatar"></div></div><div class="same-row question-part"><div class="bubble no-border bubble-loader-wrapper"><div class="bubble-loader"></div><div class="bubble-loader"></div><div class="bubble-loader"></div></div></div></li>');
        $(".fixed-height").stop().animate({ scrollTop: $(".fixed-height")[0].scrollHeight}, 1000);
    }
}

async function check_clicked() {
    console.log("Waiting!");
    if(!clicked){
        console.log("Entering timeout");
        await sleep(2000).then(() => {
            return check_clicked();
        });
    }
    else
    {
        console.log("Button clicked");
        clicked = false;
        console.log(message);
        return message;
    }
}

// sleep time expects milliseconds
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// replacement of input function
async function bot_response_input(text) {
    await waiting_response();
    await print_response(text);
    let temp = await check_clicked();
    console.log("checked clicked");
    return message;
}

async function check_done() {
    console.log("Waiting ajax!");
    if(!done){
        console.log("Entering ajax timeout");
        await sleep(100).then(() => {
            return check_done();
        });
    }
    else
    {
        console.log("ajax done");
        done = false;
        console.log(score);
        return score;
    }
}

async function predict_response(text) {
    await waiting_response();
    console.log("ajax entered");
    $.ajax({
        type: "POST",
        url: "/ask",
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(text),
        success: function(response) {
            console.log(response);
            score = response.answer;
            done = true;
        },
        error: function(error) {
            console.log(error);
            done = true;
        }
    });
    let val = await check_done();
    console.log("ajax request");
    return score;
}
