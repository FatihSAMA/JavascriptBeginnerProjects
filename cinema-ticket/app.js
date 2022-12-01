const container = document.querySelector('.container');
const countSpan = document.getElementById('count');
const amountSpan = document.getElementById('amount');
const select = document.getElementById('movie');


showPrice();


container.addEventListener('click', function(e){
    
    if(e.target.classList.contains('seat') && !e.target.classList.contains("reserved")){
        //varsa siler yolsa ekler
        e.target.classList.toggle("selected");


        showPrice();
        
    }
});

function showPrice(){
    let selectedSeatCount = container.querySelectorAll('.seat.selected').length;
    
    countSpan.innerText = selectedSeatCount;
    amountSpan.innerText = select.value * selectedSeatCount;

    
}

//film opsiyonu değiştiğinde güncel fiyatları gösterir
select.addEventListener('change', function(e){
    showPrice();
});


