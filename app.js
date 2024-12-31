document.documentElement.style.visibility = 'hidden';

window.addEventListener('load', () => {
    document.documentElement.style.visibility = '';
    document.querySelector('.main').classList.add('show');
});