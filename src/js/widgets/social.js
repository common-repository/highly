const socialElements = [
  {
    name: "FACEBOOK",
    html:
      '<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC "-//W3C//DTD SVG 1.1//EN"  "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg height="100%" class="highly-facebook" style="fill:#1877f2; ill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" viewBox="0 0 512 512" width="100%" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M512,256c0,-141.385 -114.615,-256 -256,-256c-141.385,0 -256,114.615 -256,256c0,127.777 93.616,233.685 216,252.89l0,-178.89l-65,0l0,-74l65,0l0,-56.4c0,-64.16 38.219,-99.6 96.695,-99.6c28.009,0 57.305,5 57.305,5l0,63l-32.281,0c-31.801,0 -41.719,19.733 -41.719,39.978l0,48.022l71,0l-11.35,74l-59.65,0l0,178.89c122.385,-19.205 216,-125.113 216,-252.89Z" style="fill-rule:nonzero;"/><path d="M355.65,330l11.35,-74l-71,0l0,-48.022c0,-20.245 9.917,-39.978 41.719,-39.978l32.281,0l0,-63c0,0 -29.297,-5 -57.305,-5c-58.476,0 -96.695,35.44 -96.695,99.6l0,56.4l-65,0l0,74l65,0l0,178.89c13.033,2.045 26.392,3.11 40,3.11c13.608,0 26.966,-1.065 40,-3.11l0,-178.89l59.65,0Z" style="fill:#fff;fill-rule:nonzero;"/></g></svg><span class="highly-tooltiptext">Share On Facebook</span>',
    classname: "icon-highly",
    action: (tooltip) => openShareWindow("FACEBOOK", tooltip),
  },

  {
    name: "TWITTER",
    html:
      '<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC "-//W3C//DTD SVG 1.1//EN"  "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg height="100%" class="highly-twitter" style="fill:#1da1f2; fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" viewBox="0 0 512 512" width="100%" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink"><g><circle cx="256" cy="256" id="Dark_Blue" r="256"/><path d="M209.152,391.04c113.536,0 175.616,-94.08 175.616,-175.616c0,-2.688 0,-5.376 -0.128,-7.936c12.032,-8.704 22.528,-19.584 30.848,-32c-11.008,4.864 -22.912,8.192 -35.456,9.728c12.8,-7.68 22.528,-19.712 27.136,-34.176c-11.904,7.04 -25.088,12.16 -39.168,14.976c-11.264,-12.032 -27.264,-19.456 -45.056,-19.456c-34.048,0 -61.696,27.648 -61.696,61.696c0,4.864 0.512,9.6 1.664,14.08c-51.328,-2.56 -96.768,-27.136 -127.232,-64.512c-5.248,9.088 -8.32,19.712 -8.32,30.976c0,21.376 10.88,40.32 27.52,51.328c-10.112,-0.256 -19.584,-3.072 -27.904,-7.68l0,0.768c0,29.952 21.248,54.784 49.536,60.544c-5.12,1.408 -10.624,2.176 -16.256,2.176c-3.968,0 -7.808,-0.384 -11.648,-1.152c7.808,24.576 30.592,42.368 57.6,42.88c-21.12,16.512 -47.744,26.368 -76.672,26.368c-4.992,0 -9.856,-0.256 -14.72,-0.896c27.008,17.664 59.52,27.904 94.336,27.904" id="Logo__x2014__FIXED" style="fill:#fff;fill-rule:nonzero;"/></g></svg><span class="highly-tooltiptext">Share On Twitter</span>',
    classname: "icon-highly",
    action: (tooltip) => openShareWindow("TWITTER", tooltip),
  },

  {
    name: "LINKEDIN",
    html:
      '<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC "-//W3C//DTD SVG 1.1//EN"  "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg height="100%" class="highly-linkedin" style="fill:#2867b2; fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" viewBox="0 0 512 512" width="100%" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="g5891"><path d="M512,64c0,-35.323 -28.677,-64 -64,-64l-384,0c-35.323,0 -64,28.677 -64,64l0,384c0,35.323 28.677,64 64,64l384,0c35.323,0 64,-28.677 64,-64l0,-384Z" id="background"/><g id="shapes"><rect height="257.962" id="rect11" style="fill:#fff;" width="85.76" x="61.053" y="178.667"/><path d="M104.512,54.28c-29.341,0 -48.512,19.29 -48.512,44.573c0,24.752 18.588,44.574 47.377,44.574l0.554,0c29.903,0 48.516,-19.822 48.516,-44.574c-0.555,-25.283 -18.611,-44.573 -47.935,-44.573Z" id="path13-0" style="fill:#fff;fill-rule:nonzero;"/><path d="M357.278,172.601c-45.49,0 -65.866,25.017 -77.276,42.589l0,-36.523l-85.738,0c1.137,24.197 0,257.961 0,257.961l85.737,0l0,-144.064c0,-7.711 0.554,-15.42 2.827,-20.931c6.188,-15.4 20.305,-31.352 43.993,-31.352c31.012,0 43.436,23.664 43.436,58.327l0,138.02l85.741,0l0,-147.93c0,-79.237 -42.305,-116.097 -98.72,-116.097Z" id="path15" style="fill:#fff;fill-rule:nonzero;"/></g></g></svg><span class="highly-tooltiptext">Share On Linkedin</span>',
    classname: "icon-highly last-icon",
    action: (tooltip) => openShareWindow("LINKEDIN", tooltip),
  },
];

function openShareWindow(socialType, tooltip) {
  let text = '" ' + tooltip.getAttribute("data-text") + '"';
  let url = window.location.href;

  if (!text) {
    return;
  }

  let openLink = null;

  switch (socialType) {
    case "FACEBOOK":
      openLink =
        "https://www.facebook.com/share.php?u=" + url + "&quote=" + text;
      break;
    case "TWITTER":
      openLink =
        "https://twitter.com/intent/tweet?text=" + text + "&url=" + url;
      break;
    case "LINKEDIN":
      openLink =
        "https://www.linkedin.com/shareArticle?mini=true&url=" +
        url +
        "&title=&summary=" +
        text;
      break;
    case "PINTEREST":
      openLink =
        "https://pinterest.com/pin/create/button/?url=" +
        url +
        "&description=" +
        text;
      break;
    case "EMAIL":
      openLink = "mailto:info@example.com?&subject=&body=" + url + "%20" + text;
      break;
    default:
      openLink = null;
      break;
  }

  window.open(openLink, "", "width=600,height=600");
}

export default socialElements;
