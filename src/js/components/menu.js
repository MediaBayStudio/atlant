let hdrNavServicesListItem = q('[href="#services"]').parentElement,
  setPositionForServicesListItem = function() {
    let pos = 'static';

    if (matchesMedia('(min-width:1023.98px)')) {
      pos = 'static';
    } else {
      pos = 'relative';
    }

    hdrNavServicesListItem.style.position = pos;

  };

window.addEventListener('resize', setPositionForServicesListItem);
setPositionForServicesListItem();


menu = new MobileMenu('.menu', {
  openButton: '.hdr__burger',
  closeButtons: '.hdr__burger',
  overlay: '.overlay',
  toRight: true,
  fixHeader: '.hdr'
});

let menuNav = q('.menu__nav', menu);

menuNav.addEventListener('click', function() {
  let target = event.target,
    targetParent = target.parentElement;

  if (target.classList.contains('nav__link') && targetParent.classList.contains('contains-submenu')) {
    let targetHeightElement,
      borderCoeff = 0;

    if (target.classList.contains('active')) {
      targetHeightElement = target;
      borderCoeff = 2;
      target.classList.remove('active');
    } else {
      targetHeightElement = targetParent;
      target.classList.add('active');
    }

    targetParent.style.maxHeight = targetHeightElement.scrollHeight + borderCoeff + 'px';
  }

});