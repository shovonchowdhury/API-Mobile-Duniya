const loadphone= async (searchPhone='13',isShowAll)=>{

    const res= await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`);

    const data= await res.json();

    const phones=data.data;
    displayPhones(phones,isShowAll);

}

const displayPhones= (phones,isShowAll) =>{

    const cardContainer=document.getElementById('card-container');
    cardContainer.textContent='';

    const showAllButton=document.getElementById('show-all-button');
    const numberOfPhones=phones.length;

    console.log(phones);

    if(numberOfPhones>9 && !isShowAll)
        {
            showAllButton.classList.remove('hidden');
        }
    else
        {
            showAllButton.classList.add('hidden');
        }

    
    if(!isShowAll){
        phones=phones.slice(0,9);
    }
    

    phones.forEach(phone => {
        

        const phoneCard=document.createElement('div');
        phoneCard.classList=`card p-4 bg-base-100 shadow-xl pt-6`;
        phoneCard.innerHTML=`
        
        <figure><img src=${phone.image} alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>There are many variations of passages of available, but the majority have suffered</p>
          <div class="card-actions justify-center">
            <button onclick="showDetailsButton('${phone.slug}');" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;

        cardContainer.appendChild(phoneCard);

    });

    toggoleLoadinSpinner(false);

}

const searchButton=(isShowAll) =>{
   
    toggoleLoadinSpinner(true);
    const searchField=document.getElementById('search-field');
    const searchPhone=searchField.value;
    loadphone(searchPhone,isShowAll);

    // searchField.value='';
}


const toggoleLoadinSpinner=(isLoading) =>{

    const lodingSpinner=document.getElementById('loading-spinner');
    if(isLoading)
        {
            lodingSpinner.classList.remove('hidden');
        }
    else
        {
            lodingSpinner.classList.add('hidden');
        }


}

const showAllButtonhandler=()=>{
    searchButton(true);
}

const showDetailsButton=async(phoneID)=>{

    const res=await fetch(`https://openapi.programming-hero.com/api/phone/${phoneID}`);
    const data=await res.json();

    const phone=data.data; 
    showPhoneDetails(phone);
    
    
}

const showPhoneDetails=(phone)=>{

    console.log(phone);

    showDetailsModal.showModal();

    const showPhoneDetailsInfoDes=document.getElementById('show-phone-details-info-description');

    showPhoneDetailsInfoDes.classList.add('space-y-5');

    showPhoneDetailsInfoDes.innerHTML=`
        <img src="${phone.image}" alt="" class=" mx-auto">
        <h3 class="font-bold text-lg text-center" id="show-phone-details-info-heading">${phone.name}</h3>
        <div>
            <p><b>Storage:</b>${phone?.mainFeatures?.storage}</p>
            <p><b>Display Size:</b>${phone?.mainFeatures?.displaySize}</p>
            <p><b>CHipset:</b>${phone?.mainFeatures?.chipSet}</p>
            <p><b>Memory:</b>${phone?.mainFeatures?.memory}</p>
            <p><b>Memory:</b>${phone?.mainFeatures?.memory}</p>
            <p><b>Slug:</b>${phone?.slug}</p>
            <p><b>Release Date:</b>${phone.releaseDate}</p>
            <p><b>GPS:</b>${phone?.others?.GPS || 'No GPS Available'}</p>

        </div>
    `


}
loadphone();