var social = [];

if (window.editMode) {
  document.getElementById('title').addEventListener(
    'click',
    function () {
      window.parent.postMessage(
        {
          type: 'title',
          value: 'edit',
        },
        '*'
      );
    },
    false
  );
  document.getElementById('subtitle').addEventListener(
    'click',
    function () {
      window.parent.postMessage(
        {
          type: 'subtitle',
          value: 'edit',
        },
        '*'
      );
    },
    false
  );
  document.getElementById('show-social').addEventListener(
    'click',
    function () {
      window.parent.postMessage(
        {
          type: 'social',
          value: 'edit',
        },
        '*'
      );
    },
    false
  );
  document.getElementById('logo-wrapper').addEventListener(
    'click',
    function () {
      window.parent.postMessage(
        {
          type: 'logo',
          value: 'edit',
        },
        '*'
      );
    },
    false
  );
}

var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
var eventer = window[eventMethod];
var messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';
eventer(
  messageEvent,
  function (e) {
    if (e.data && e.data.type === 'logo' && document.getElementById('logo-wrapper')) {
      var wrapper = document.getElementById('logo-wrapper');
      wrapper.setAttribute('style', 'background-image: url(' + e.data.value + ');');
    } else if (e.data && e.data.type === 'cover' && document.getElementById('cover-wrapper')) {
      var _wrapper = document.getElementById('cover-wrapper');

      _wrapper.setAttribute('style', 'background-image: url(' + e.data.url + ');');
    } else if (e.data && e.data.type === 'title' && document.getElementById('title')) {
      var _wrapper2 = document.getElementById('title');

      _wrapper2.innerHTML = e.data.value;
    } else if (e.data && e.data.type === 'subTitle' && document.getElementById('subtitle')) {
      var _wrapper3 = document.getElementById('subtitle');

      _wrapper3.innerHTML = e.data.value;
    } else if (e.data && e.data.type === 'social') {
      social = e.data.value;
      showSocial();
    } else if (e.data && e.data.type === 'background') {
      var backgroundNode = document.getElementsByClassName('background')[0];
      var background = e.data.value;

      if (background.backgroundType === 'color') {
        backgroundNode.setAttribute('style', 'background-color: ' + background.color + '; background-image: initial;');
      } else if (background.backgroundType === 'image') {
        backgroundNode.setAttribute(
          'style',
          'background-image: url(' + background.url + '); background-size: cover; background-repeat: no-repeat;'
        );
      } else if (background.backgroundType === 'gradient') {
        backgroundNode.setAttribute(
          'style',
          'background-image: linear-gradient(' +
            background.gradientStart +
            ', ' +
            background.gradientEnd +
            '); background-size: cover; background-repeat: no-repeat;'
        );
      } else if (background.backgroundType === 'video') {
        var videoBg = document.getElementById('video-bg');
        videoBg.setAttribute('style', 'dispay: block;');
      }
    } else if (e.data && e.data.type === 'titleColor' && document.getElementById('title')) {
      var title = document.getElementById('title');
      title.setAttribute('style', 'color: ' + e.data.value + '!important;');
      var subtitle = document.getElementById('subtitle');
      var iconsFab = document.getElementsByClassName('fab');
      var iconsFas = document.getElementsByClassName('fas');
      var iconsFa = document.getElementsByClassName('fa');

      for (var k = 0; k < iconsFa.length; k++) {
        iconsFa[k].style.color = e.data.value;
      }

      for (var j = 0; j < iconsFas.length; j++) {
        iconsFas[j].style.color = e.data.value;
      }

      for (var i = 0; i < iconsFab.length; i++) {
        iconsFab[i].style.color = e.data.value;
      }

      subtitle.setAttribute('style', 'color: ' + e.data.value + '!important; filter: grayscale(65%)!important;');
    } else if (e.data && e.data.type === 'theme') {
      if (window.form && window.form.config) {
        window.form.config.color = e.data.value;
        window.reInit();
      }
    } else if (e.data && e.data.type === 'avatar') {
      if (window.form && window.form.config) {
        window.form.config.avatar = e.data.value;
        window.reInit();
      }
    }
    if (e.data && e.data.type === 'chat-bot-thankyou') {
      var body = document.getElementsByTagName('body');
      var fullpage = document.getElementsByClassName('fullpage');
      var chatbox = document.getElementsByClassName('chatbox');
      var root = document.getElementById('root');
      body[0].style.overflow = 'hidden';
      fullpage[0].style.position = 'inherit';
      chatbox[0].style.display = 'initial';
      root.style.position = 'inherit';
    }
    if (e.data && e.data.type === 'chat-bot-restart') {
      var body = document.getElementsByTagName('body');
      var fullpage = document.getElementsByClassName('fullpage');
      var chatbox = document.getElementsByClassName('chatbox');
      var root = document.getElementById('root');
      body[0].style.overflow = 'auto';
      fullpage[0].style.position = 'relative';
      chatbox[0].style.display = 'block';
      root.style.position = 'relative';
    }
    // console.log(e);
  },
  false
); // In embed initialise widget to body

var body = document.getElementsByTagName('body')[0];

if (window.self !== window.top) {
  var url = document.location.href;

  if (
    (url.indexOf('builder/preview') === -1 &&
      url.indexOf('builder/design') === -1 &&
      url.indexOf('linkspreview.collect.chat') === -1 &&
      url.indexOf('reach.at') === -1 &&
      url.indexOf('linksstaging.collect.chat') === -1) ||
    url.indexOf('collect.chat/embed.html') !== -1
  ) {
    while (body.hasChildNodes()) {
      body.removeChild(body.firstChild);
    }
    body.id = 'root';
  }
}

if (
  document.referrer.indexOf('preview/embed.html') !== -1 ||
  document.referrer.indexOf('preview/embed-2.html') !== -1
) {
  while (body.hasChildNodes()) {
    body.removeChild(body.firstChild);
  }
  body.id = 'root';
}

body.classList.add('body-loaded'); // Load widget

window.collectEmbedded = true;
var widget = document.createElement('script');
/*widget.src = form.widget;
document.body.appendChild(widget);
document.addEventListener('DOMContentLoaded', function () {
  social = window.form.links.social.length
    ? window.form.links.social
    : [
        {
          type: '',
          url: '',
        },
      ];
  showSocial();
});

function showSocial() {
  var socialList = document.getElementById('show-social');
  if (socialList) {
    socialList.innerHTML = '';
    var allLinksValid = false;

    for (var i = 0; i < social.length; i++) {
      if (social[i].url.length) {
        allLinksValid = true;
      }
    }

    if (allLinksValid) {
      var ul = document.createElement('ul');
      while (socialList && socialList.firstChild) {
        socialList.removeChild(socialList.firstChild);
      }

      for (var i = 0; i < social.length; i++) {
        var li = document.createElement('li');

        if (social[i].url) {
          li.className = 'social-element';

          if (social[i].type === 'envelope') {
            li.innerHTML =
              '<button onClick="openLink(' + i + ')"><i class="fa fa-' + social[i].type + '"></i></button>';
          } else if (social[i].type === 'phone' || social[i].type === 'link') {
            li.innerHTML =
              '<button onClick="openLink(' + i + ')"><i class="fas fa-' + social[i].type + '"></i></button>';
          } else if (social[i].type === 'reach.at') {
            li.innerHTML =
              '<button onClick="openLink(' +
              i +
              ')"><img src="https://meta.collect.chat/reachat/20/' +
              window.form.links.titleColor.substr(1) +
              '"></button>';
          } else {
            li.innerHTML =
              '<button onClick="openLink(' + i + ')"><i class="fab fa-' + social[i].type + '"></i></button>';
          }

          ul.appendChild(li);
        }
      }

      socialList.appendChild(ul);
    }
  }
}

function openLink(index) {
  var link = social[index];
  var linkUrl = link.url;

  switch (link.type) {
    case 'facebook-messenger':
      linkUrl = 'https://m.me/' + link.url;
      break;
    case 'whatsapp':
      if (MobileCheck()) {
        linkUrl = 'https://api.whatsapp.com/send?phone=' + link.url.replace(/\+/g, '');
      } else {
        linkUrl = 'https://web.whatsapp.com/send?phone=' + link.url.replace(/\+/g, '');
      }

      break;

    case 'snapchat':
      linkUrl = 'https://snapchat.com/add/' + link.url;
      break;

    case 'telegram':
      linkUrl = 'https://telegram.me/' + link.url;
      break;

    case 'slack':
      linkUrl = 'https://' + link.url + '.slack.com/';
      break;

    case 'twitter':
      linkUrl = 'https://twitter.com/' + link.url;
      break;

    case 'envelope':
      linkUrl = 'mailto:' + link.url;
      break;

    case 'phone':
      linkUrl = 'tel:' + link.url;
      break;

    case 'skype':
      linkUrl = 'skype:' + link.url;
      break;

    case 'twitter-follow':
      linkUrl = 'https://twitter.com/' + link.url;
      break;

    case 'facebook':
      linkUrl = 'https://www.facebook.com/' + link.url;
      break;

    case 'tiktok':
      linkUrl = 'https://www.tiktok.com/' + link.url;
      break;
    case 'instagram':
      linkUrl = 'https://www.instagram.com/' + link.url;
      break;

    case 'medium':
      linkUrl = 'https://medium.com/@' + link.url;
      break;
    case 'reach.at':
      linkUrl = 'https://reach.at/' + link.url;
      break;
    case 'vk':
      linkUrl = 'https://vk.com/' + link.url;
      break;

    case 'producthunt':
    case 'youtube':
    case 'github':
    case 'stackoverflow':
    case 'kickstarter':
    case 'indiegogo':
    case 'dribbble':
    case 'behance':
    case 'pinterest':
    case 'deviantart':
    case 'quora':
    case 'soundcloud':
    case 'spotify':
    case 'twitch':
      break;

    default:
  }

  if(link.url.indexOf('https:')!==-1 || link.url.indexOf('http:')!==-1) {
    linkUrl = link.url;
  }

  if (linkUrl !== '') {
    if (
      link.type !== 'link' &&
      linkUrl.indexOf('http://') === -1 &&
      linkUrl.indexOf('https://') === -1 &&
      linkUrl.indexOf('mailto:') === -1 &&
      linkUrl.indexOf('tel:') === -1 &&
      linkUrl.indexOf('skype:') === -1
    ) {
      linkUrl = 'http://' + linkUrl;
    }

    if (!!link.sameTab && link.sameTab === true) {
      // Open in same tab
      if (window.top && window.top.location) {
        // Iframe parent
        window.top.location.href = linkUrl;
      } else {
        window.location.href = linkUrl;
      }
    } else {
      // Open in new tab
      window.open(linkUrl);
    }
  }
}

function MobileCheck() {
  var check = false;

  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);

  return check;
}

if (
  window.form &&
  window.form.links &&
  window.form.links.background &&
  window.form.links.background.backgroundType === 'video'
) {
  var videoBg = document.getElementById('video-bg');
  if (videoBg) {
    videoBg.setAttribute('style', 'dispay: block;');
  }
}*/