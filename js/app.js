let watchAdCount = parseInt(localStorage.getItem('adsCount') || 0);
let earnBalance = parseFloat(localStorage.getItem('balanceCount') || 0);
let monetagSdkLoaded = false;

//Initialize balance and ads count value 
document.getElementById('adsCount').innerText = watchAdCount;
document.getElementById('balanceCount').innerText = earnBalance;

document.getElementById('watchAdBtn').disabled = true;

// Check SDK
function checkSdk() {
  if (typeof window.show_9828804 === 'function') {
    monetagSdkLoaded = true;
    document.getElementById('watchAdBtn').disabled = false;
    console.log('Monetag SDK loaded successfully');
  } else setTimeout(checkSdk, 500);
}

document.addEventListener('DOMContentLoaded', checkSdk);

document.getElementById('watchAdBtn').addEventListener('click', ()=>{
  if (!monetagSdkLoaded) {alert('Ad service not loaded'); return;}
  show_9828804().then(() => {
    watchedAdsCount++;
    earnBalance += 2;
    document.getElementById('adsCount').innerText = watchAdCount;
    document.getElementById('balanceCount').innerText = earnBalance;
    localStorage.setItem('adsCount', watchedAdsCount);
    localStorage.setItem('balanceCount', earnBalance);
  }).catch(error => {alert('Ad failed'); console.error(error)});
});

