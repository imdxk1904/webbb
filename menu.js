function toggleDrawer() {
    document.body.classList.toggle('drawer-open');
}
const navLinks = document.querySelectorAll('body > nav a');
const sections = document.querySelectorAll('section[id]');
 
// Click: đổi màu ngay
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});
 
const sectionParentMap = {
    'ga': 'com',
    'burger': 'com',
    'mi-y': 'mi-y',
    'pizza': 'mi-y',
    'hotdog': 'mi-y'
};

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    // Nếu section hiện tại là con thì dùng id cha
    if (sectionParentMap[current]) {
        current = sectionParentMap[current];
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});
function setupSearch() {
    const inputs = document.querySelectorAll('.navbar-search input, .drawer-search input');

    inputs.forEach(input => {
        input.addEventListener('input', function () {
            const keyword = this.value.trim().toLowerCase();
            inputs.forEach(i => { if (i !== this) i.value = this.value; });

            const sections = document.querySelectorAll('section');

            sections.forEach(section => {
                const cards = section.querySelectorAll('.product-card');
                let hasVisible = false;

                cards.forEach(card => {
                    const text = card.innerText.toLowerCase();
                    if (!keyword || text.includes(keyword)) {
                        card.style.display = '';
                        hasVisible = true;
                    } else {
                        card.style.display = 'none';
                    }
                });
                section.style.display = hasVisible || !keyword ? '' : 'none';
            });
            const allHidden = [...document.querySelectorAll('section')].every(s => s.style.display === 'none');

            let noResult = document.getElementById('no-result');
            if (!noResult) {
                noResult = document.createElement('p');
                noResult.id = 'no-result';
                noResult.textContent = 'Không tìm thấy món ăn phù hợp.';
                noResult.style.cssText = 'text-align:center; color:#aaa; font-size:18px; margin:60px auto;';
                document.querySelector('footer').insertAdjacentElement('beforebegin', noResult);
            }

            noResult.style.display = allHidden ? 'block' : 'none';
        });
    });
}

setupSearch();