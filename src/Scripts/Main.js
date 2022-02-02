var botoesModal = document.querySelectorAll('.modal-open')


botoesModal.forEach(function(btn){
    btn.onclick = function(){
        var modal = btn.getAttribute('data-modal');

        document.getElementById(modal).style.display = 'block'
    }
})


var botoesFechar = document.querySelectorAll('.Modal-close');

botoesFechar.forEach(function(btn){
    btn.onclick = function(){
     btn.closest('.Modal').style.display = "none"
    }
})

window.onclick = function(e){
    if(e.target.classList.contains('Modal')){
        e.target.style.display = 'none';
    }
};

