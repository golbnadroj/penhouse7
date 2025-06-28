document.addEventListener('DOMContentLoaded', () => {
    const tabs = [
        { button: document.getElementById('tab-proprietaire'), form: document.getElementById('form-proprietaire') },
        { button: document.getElementById('tab-voyageur'), form: document.getElementById('form-voyageur') },
        { button: document.getElementById('tab-partenaire'), form: document.getElementById('form-partenaire') },
    ];

    tabs.forEach(tab => {
        if (tab.button) {
            tab.button.addEventListener('click', () => {
                tabs.forEach(item => {
                    item.button.classList.remove('border-or-gold', 'text-or-gold');
                    item.button.classList.add('border-transparent', 'text-gray-500', 'hover:text-gray-700', 'hover:border-gray-300');
                    if (item.form) item.form.classList.add('hidden');
                });

                tab.button.classList.add('border-or-gold', 'text-or-gold');
                tab.button.classList.remove('border-transparent', 'text-gray-500', 'hover:text-gray-700', 'hover:border-gray-300');
                if (tab.form) tab.form.classList.remove('hidden');
            });
        }
    });
});
