;(function() {
  let faqBlock = id('faqs');

  if (faqBlock) {
    let faqBlocks = faqBlock.children,
      initDropdown = function() {
        let childs = faqBlocks[0].children;

        hideText(1);
        faqBlocks[0].style.maxHeight = childs[0].scrollHeight + childs[1].scrollHeight + 'px';
        faqBlocks[0].classList.add('active');

        faqBlock.addEventListener('click', dropdownText);
        window.addEventListener('resize', initDropdown);
      },

      dropdownText = function(element) {
        if (element instanceof Event) {
          let eventTarget = element.target;

          if (eventTarget.tagName === 'BUTTON') {
            element = eventTarget;
          } else {
            return;
          }

        } else {
          element = element || faqBlocks[0]; // если элемент не передали, то открываем первый
        }

        let minHeight = element.scrollHeight,
          parent = element.parentElement,
          answer = element.nextElementSibling,
          answerHeight = answer.scrollHeight;

        if (parent.classList.contains('active')) {
          if (faqBlocks.length > 1) {
            parent.style.maxHeight = minHeight + 'px';
            parent.classList.remove('active');
          }
        } else {
          hideText(0);

          parent.classList.add('active');
          parent.style.maxHeight = minHeight + answerHeight + 'px';
        }
      },
      
      hideText = function(start) {
        for (let i = start; i < faqBlocks.length; i++) {
          faqBlocks[i].classList.remove('active');
          faqBlocks[i].style.maxHeight = faqBlocks[i].children[0].scrollHeight + 'px';
        }
      };


    window.addEventListener('load', initDropdown);

  }

})();