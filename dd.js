document.addEventListener('DOMContentLoaded', (event) => {

  var dragSrcEl = null,
      id = 1;

  function handleDragStart(e) {
    this.style.opacity = '0.4';

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';

    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('over');
  }

  function handleDragLeave(e) {
    this.classList.remove('over');
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }

    if (dragSrcEl != this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }

    return false;
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';

    items.forEach(function (item) {
      item.classList.remove('over');
    });
  }


  let items = document.querySelectorAll('.container .box'),
      elements = document.querySelectorAll(".elements .box"),
      info = document.querySelector('.info');

  elements.forEach(function(item) {
    item.addEventListener('dblclick', (e) => {
      let container = document.querySelector('.container');
      const clone = item.cloneNode(true);
      clone.dataset.id = id;
      clone.addEventListener('dragstart', handleDragStart, false);
      clone.addEventListener('dragenter', handleDragEnter, false);
      clone.addEventListener('dragover', handleDragOver, false);
      clone.addEventListener('dragleave', handleDragLeave, false);
      clone.addEventListener('drop', handleDrop, false);
      clone.addEventListener('dragend', handleDragEnd, false);
      clone.addEventListener('dblclick', (e) => {
        clone.remove();
      });
      clone.addEventListener('click', (e) => {
        document.getElementById('info_text').value = clone.querySelector('.label').innerHTML;
        document.getElementById('info_id').value = clone.dataset.id;
        info.style.display = "block";
      });
      container.appendChild(clone);
      id++;
    });
  });

  info_save.addEventListener('click', (e) => {
    let el_id = document.getElementById('info_id').value;
    document.querySelector("[data-id='"+el_id+"'] .label").innerHTML = document.getElementById('info_text').value;
    info.style.display = "none";
    return false;
  });

  document.getElementById('make_hmtl').addEventListener('click', (e) => {
    document.getElementById('html_body').value = document.querySelector('.container_body').innerHTML;
  });


});
