const themeToggle = document.getElementById('themeToggle');
const langToggle = document.getElementById('langToggle');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');
const modal = document.getElementById('animalModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const searchInput = document.getElementById('searchInput');
const filterPills = document.querySelectorAll('.filter-pill');
const randomBtn = document.getElementById('randomBtn');
const toast = document.getElementById('toast');
const favoritesGrid = document.getElementById('favoritesGrid');
const emptyFavs = document.getElementById('emptyFavs');

const ANIMAL_KEY = 'animalia_favorites';
const LANG_KEY = 'animalia_lang';

let currentLang = 'es';

const i18n = {
    es: {
        'page.title': 'Wildpedia - Enciclopedia de Animales',
        'nav.inicio': 'Inicio', 'nav.mamiferos': 'Mamíferos', 'nav.aves': 'Aves',
        'nav.reptiles': 'Reptiles', 'nav.acuaticos': 'Acuáticos', 'nav.favoritos': 'Favoritos',
        'hero.title': 'Descubre el Reino Animal',
        'hero.desc': 'Explora la fascinante diversidad de especies que habitan nuestro planeta. Desde los majestuosos mamíferos hasta los coloridos habitantes del océano.',
        'search.placeholder': 'Buscar animal por nombre…',
        'stat.species': 'Especies conocidas', 'stat.years': 'Millones de años',
        'stat.classes': 'Clases principales', 'stat.water': '% del planeta agua',
        'filter.all': 'Todos', 'filter.mamiferos': '🐘 Mamíferos', 'filter.aves': '🦅 Aves',
        'filter.reptiles': '🦎 Reptiles', 'filter.acuaticos': '🐟 Acuáticos', 'filter.favoritos': '❤️ Favoritos',
        'section.mamiferos.title': '🐘 Mamíferos',
        'section.mamiferos.desc': 'Animales vertebrados que se caracterizan por tener glándulas mamarias, pelo en el cuerpo y ser de sangre caliente.',
        'section.aves.title': '🦅 Aves',
        'section.aves.desc': 'Animales vertebrados con plumas, alas y pico, que ponen huevos y normalmente pueden volar.',
        'section.reptiles.title': '🦎 Reptiles',
        'section.reptiles.desc': 'Animales vertebrados de sangre fría, cubiertos de escamas, que respiran por pulmones y se arrastran.',
        'section.acuaticos.title': '🐟 Acuáticos',
        'section.acuaticos.desc': 'Criaturas fascinantes que habitan en los océanos, ríos y lagos de todo el mundo.',
        'section.favoritos.title': '❤️ Tus Favoritos',
        'section.favoritos.desc': 'Los animales que has marcado como favoritos. Haz clic en el corazón de cualquier tarjeta para guardarlos aquí.',
        'section.favoritos.empty': 'No tienes favoritos aún. Explora y marca los que más te gusten.',
        'detail.habitat': 'Hábitat:', 'detail.dieta': 'Dieta:', 'detail.vida': 'Esperanza de vida:',
        'animal.leon.name': 'León',
        'animal.leon.desc': 'Conocido como el "rey de la selva", es un felino majestuoso que vive en las sabanas africanas.',
        'animal.leon.habitat': 'Sabana africana', 'animal.leon.dieta': 'Carnívoro', 'animal.leon.vida': '10-14 años',
        'animal.delfin.name': 'Delfín',
        'animal.delfin.desc': 'Mamífero marino altamente inteligente, conocido por su comportamiento social y acrobático.',
        'animal.delfin.habitat': 'Océanos', 'animal.delfin.dieta': 'Carnívoro', 'animal.delfin.vida': '20-30 años',
        'animal.oso.name': 'Oso Pardo',
        'animal.oso.desc': 'Gran mamífero omnívoro que habita en bosques y montañas del hemisferio norte.',
        'animal.oso.habitat': 'Bosques y montañas', 'animal.oso.dieta': 'Omnívoro', 'animal.oso.vida': '20-30 años',
        'animal.murcielago.name': 'Murciélago',
        'animal.murcielago.desc': 'El único mamífero capaz de volar activamente, utiliza la ecolocalización para navegar.',
        'animal.murcielago.habitat': 'Cuevas, bosques', 'animal.murcielago.dieta': 'Insectívoro/Frugívoro', 'animal.murcielago.vida': '5-30 años',
        'animal.aguila.name': 'Águila Real',
        'animal.aguila.desc': 'Una de las aves rapaces más grandes y poderosas, símbolo de fuerza y libertad.',
        'animal.aguila.habitat': 'Montañas', 'animal.aguila.dieta': 'Carnívoro', 'animal.aguila.vida': '20-30 años',
        'animal.colibri.name': 'Colibrí',
        'animal.colibri.desc': 'El ave más pequeña del mundo, capaz de volar hacia atrás y de batir sus alas hasta 80 veces por segundo.',
        'animal.colibri.habitat': 'Américas', 'animal.colibri.dieta': 'Nectarívoro', 'animal.colibri.vida': '3-5 años',
        'animal.buho.name': 'Búho Real',
        'animal.buho.desc': 'Ave rapaz nocturna con una visión y audición excepcionales, símbolo de sabiduría.',
        'animal.buho.habitat': 'Bosques', 'animal.buho.dieta': 'Carnívoro', 'animal.buho.vida': '10-20 años',
        'animal.flamenco.name': 'Flamenco',
        'animal.flamenco.desc': 'Conocido por su característico color rosa obtenido de su dieta, y por su elegante porte.',
        'animal.flamenco.habitat': 'Humedales', 'animal.flamenco.dieta': 'Omnívoro', 'animal.flamenco.vida': '20-30 años',
        'animal.cocodrilo.name': 'Cocodrilo',
        'animal.cocodrilo.desc': 'Uno de los reptiles más grandes y antiguos, con más de 200 millones de años de existencia.',
        'animal.cocodrilo.habitat': 'Ríos tropicales', 'animal.cocodrilo.dieta': 'Carnívoro', 'animal.cocodrilo.vida': '50-70 años',
        'animal.camaleon.name': 'Camaleón',
        'animal.camaleon.desc': 'Maestro del camuflaje, capaz de cambiar de color para comunicarse y adaptarse al entorno.',
        'animal.camaleon.habitat': 'Selvas tropicales', 'animal.camaleon.dieta': 'Insectívoro', 'animal.camaleon.vida': '5-10 años',
        'animal.serpiente.name': 'Cobra Real',
        'animal.serpiente.desc': 'La serpiente venenosa más larga del mundo, venerada y temida en muchas culturas.',
        'animal.serpiente.habitat': 'Selvas asiáticas', 'animal.serpiente.dieta': 'Carnívoro', 'animal.serpiente.vida': '20-30 años',
        'animal.tortuga.name': 'Tortuga Marina',
        'animal.tortuga.desc': 'Viajera incansable de los océanos, algunas especies migran miles de kilómetros cada año.',
        'animal.tortuga.habitat': 'Océanos tropicales', 'animal.tortuga.dieta': 'Omnívoro', 'animal.tortuga.vida': '50-100 años',
        'animal.tiburon.name': 'Tiburón Blanco',
        'animal.tiburon.desc': 'El depredador marino más grande y temido, pero fundamental para el equilibrio oceánico.',
        'animal.tiburon.habitat': 'Océanos', 'animal.tiburon.dieta': 'Carnívoro', 'animal.tiburon.vida': '30-70 años',
        'animal.medusa.name': 'Medusa',
        'animal.medusa.desc': 'Una de las criaturas más antiguas del planeta, con un cuerpo gelatinoso y tentáculos urticantes.',
        'animal.medusa.habitat': 'Océanos', 'animal.medusa.dieta': 'Carnívoro', 'animal.medusa.vida': 'Meses-años',
        'animal.pezPayaso.name': 'Pez Payaso',
        'animal.pezPayaso.desc': 'Famoso por su simbiosis con las anémonas y su llamativo color naranja con rayas blancas.',
        'animal.pezPayaso.habitat': 'Arrecifes de coral', 'animal.pezPayaso.dieta': 'Omnívoro', 'animal.pezPayaso.vida': '6-10 años',
        'animal.pulpo.name': 'Pulpo',
        'animal.pulpo.desc': 'Uno de los invertebrados más inteligentes, con capacidad de camuflaje y resolución de problemas.',
        'animal.pulpo.habitat': 'Océanos', 'animal.pulpo.dieta': 'Carnívoro', 'animal.pulpo.vida': '1-5 años',
        'curiosity.title': '📚 Curiosidades del Reino Animal',
        'curiosity.1.title': 'Inteligencia Animal',
        'curiosity.1.desc': 'Los pulpos tienen 9 cerebros: uno central y uno en cada brazo, permitiendo que cada tentáculo actúe de forma semi-independiente.',
        'curiosity.2.title': 'Velocidad Increíble',
        'curiosity.2.desc': 'El guepardo puede alcanzar los 120 km/h en solo 3 segundos, más rápido que la mayoría de los autos deportivos.',
        'curiosity.3.title': 'El Animal Más Grande',
        'curiosity.3.desc': 'La ballena azul es el animal más grande que jamás haya existido, superando incluso a los dinosaurios más grandes.',
        'curiosity.4.title': 'Inmortalidad Biológica',
        'curiosity.4.desc': 'La medusa Turritopsis dohrnii es considerada "biológicamente inmortal" al poder revertir su ciclo de vida.',
        'footer.desc': 'Explorando la diversidad de la vida en la Tierra.',
        'footer.categories': 'Categorías',
        'footer.copyright': '© 2026 Wildpedia. Hecho con ❤️ para los amantes de la naturaleza.',
        'toast.added': '❤️ Añadido a favoritos',
        'toast.removed': '💔 Eliminado de favoritos',
        'modal.habitat': 'Hábitat', 'modal.dieta': 'Dieta', 'modal.vida': 'Esperanza de vida',
        'wiki.label': 'Dato curioso de Wikipedia',
        'wiki.placeholder': 'Haz clic para obtener un dato curioso aleatorio sobre animales.',
        'wiki.btn': '🎲 Nuevo dato',
        'wiki.loading': 'Buscando en Wikipedia…',
        'wiki.error': 'No se encontró un dato de animal. ¡Intenta de nuevo!',
        'modal.wiki': 'Leer en Wikipedia',
    },
    en: {
        'page.title': 'Wildpedia - Animal Encyclopedia',
        'nav.inicio': 'Home', 'nav.mamiferos': 'Mammals', 'nav.aves': 'Birds',
        'nav.reptiles': 'Reptiles', 'nav.acuaticos': 'Aquatic', 'nav.favoritos': 'Favorites',
        'hero.title': 'Discover the Animal Kingdom',
        'hero.desc': 'Explore the fascinating diversity of species that inhabit our planet. From majestic mammals to the colorful inhabitants of the ocean.',
        'search.placeholder': 'Search animal by name…',
        'stat.species': 'Known species', 'stat.years': 'Million years',
        'stat.classes': 'Main classes', 'stat.water': '% of planet water',
        'filter.all': 'All', 'filter.mamiferos': '🐘 Mammals', 'filter.aves': '🦅 Birds',
        'filter.reptiles': '🦎 Reptiles', 'filter.acuaticos': '🐟 Aquatic', 'filter.favoritos': '❤️ Favorites',
        'section.mamiferos.title': '🐘 Mammals',
        'section.mamiferos.desc': 'Vertebrate animals characterized by having mammary glands, body hair, and being warm-blooded.',
        'section.aves.title': '🦅 Birds',
        'section.aves.desc': 'Vertebrate animals with feathers, wings, and a beak that lay eggs and can usually fly.',
        'section.reptiles.title': '🦎 Reptiles',
        'section.reptiles.desc': 'Cold-blooded vertebrate animals covered in scales that breathe through lungs and crawl.',
        'section.acuaticos.title': '🐟 Aquatic',
        'section.acuaticos.desc': 'Fascinating creatures that inhabit the oceans, rivers, and lakes around the world.',
        'section.favoritos.title': '❤️ Your Favorites',
        'section.favoritos.desc': 'Animals you have marked as favorites. Click the heart on any card to save them here.',
        'section.favoritos.empty': "You don't have any favorites yet. Explore and mark the ones you like most.",
        'detail.habitat': 'Habitat:', 'detail.dieta': 'Diet:', 'detail.vida': 'Lifespan:',
        'animal.leon.name': 'Lion',
        'animal.leon.desc': 'Known as the "king of the jungle", it is a majestic feline that lives in the African savannas.',
        'animal.leon.habitat': 'African savanna', 'animal.leon.dieta': 'Carnivore', 'animal.leon.vida': '10-14 years',
        'animal.delfin.name': 'Dolphin',
        'animal.delfin.desc': 'Highly intelligent marine mammal, known for its social and acrobatic behavior.',
        'animal.delfin.habitat': 'Oceans', 'animal.delfin.dieta': 'Carnivore', 'animal.delfin.vida': '20-30 years',
        'animal.oso.name': 'Brown Bear',
        'animal.oso.desc': 'Large omnivorous mammal that inhabits forests and mountains of the northern hemisphere.',
        'animal.oso.habitat': 'Forests and mountains', 'animal.oso.dieta': 'Omnivore', 'animal.oso.vida': '20-30 years',
        'animal.murcielago.name': 'Bat',
        'animal.murcielago.desc': 'The only mammal capable of active flight, it uses echolocation to navigate.',
        'animal.murcielago.habitat': 'Caves, forests', 'animal.murcielago.dieta': 'Insectivore/Frugivore', 'animal.murcielago.vida': '5-30 years',
        'animal.aguila.name': 'Golden Eagle',
        'animal.aguila.desc': 'One of the largest and most powerful birds of prey, a symbol of strength and freedom.',
        'animal.aguila.habitat': 'Mountains', 'animal.aguila.dieta': 'Carnivore', 'animal.aguila.vida': '20-30 years',
        'animal.colibri.name': 'Hummingbird',
        'animal.colibri.desc': 'The smallest bird in the world, capable of flying backwards and beating its wings up to 80 times per second.',
        'animal.colibri.habitat': 'Americas', 'animal.colibri.dieta': 'Nectarivore', 'animal.colibri.vida': '3-5 years',
        'animal.buho.name': 'Eagle Owl',
        'animal.buho.desc': 'Nocturnal bird of prey with exceptional vision and hearing, a symbol of wisdom.',
        'animal.buho.habitat': 'Forests', 'animal.buho.dieta': 'Carnivore', 'animal.buho.vida': '10-20 years',
        'animal.flamenco.name': 'Flamingo',
        'animal.flamenco.desc': 'Known for its characteristic pink color obtained from its diet, and its elegant posture.',
        'animal.flamenco.habitat': 'Wetlands', 'animal.flamenco.dieta': 'Omnivore', 'animal.flamenco.vida': '20-30 years',
        'animal.cocodrilo.name': 'Crocodile',
        'animal.cocodrilo.desc': 'One of the largest and oldest reptiles, with over 200 million years of existence.',
        'animal.cocodrilo.habitat': 'Tropical rivers', 'animal.cocodrilo.dieta': 'Carnivore', 'animal.cocodrilo.vida': '50-70 years',
        'animal.camaleon.name': 'Chameleon',
        'animal.camaleon.desc': 'Master of camouflage, capable of changing color to communicate and adapt to its environment.',
        'animal.camaleon.habitat': 'Tropical rainforests', 'animal.camaleon.dieta': 'Insectivore', 'animal.camaleon.vida': '5-10 years',
        'animal.serpiente.name': 'King Cobra',
        'animal.serpiente.desc': 'The longest venomous snake in the world, revered and feared in many cultures.',
        'animal.serpiente.habitat': 'Asian jungles', 'animal.serpiente.dieta': 'Carnivore', 'animal.serpiente.vida': '20-30 years',
        'animal.tortuga.name': 'Sea Turtle',
        'animal.tortuga.desc': 'Tireless traveler of the oceans, some species migrate thousands of kilometers each year.',
        'animal.tortuga.habitat': 'Tropical oceans', 'animal.tortuga.dieta': 'Omnivore', 'animal.tortuga.vida': '50-100 years',
        'animal.tiburon.name': 'Great White Shark',
        'animal.tiburon.desc': 'The largest and most feared marine predator, but essential for ocean balance.',
        'animal.tiburon.habitat': 'Oceans', 'animal.tiburon.dieta': 'Carnivore', 'animal.tiburon.vida': '30-70 years',
        'animal.medusa.name': 'Jellyfish',
        'animal.medusa.desc': 'One of the oldest creatures on the planet, with a gelatinous body and stinging tentacles.',
        'animal.medusa.habitat': 'Oceans', 'animal.medusa.dieta': 'Carnivore', 'animal.medusa.vida': 'Months-years',
        'animal.pezPayaso.name': 'Clownfish',
        'animal.pezPayaso.desc': 'Famous for its symbiosis with anemones and its striking orange color with white stripes.',
        'animal.pezPayaso.habitat': 'Coral reefs', 'animal.pezPayaso.dieta': 'Omnivore', 'animal.pezPayaso.vida': '6-10 years',
        'animal.pulpo.name': 'Octopus',
        'animal.pulpo.desc': 'One of the most intelligent invertebrates, with camouflage abilities and problem-solving skills.',
        'animal.pulpo.habitat': 'Oceans', 'animal.pulpo.dieta': 'Carnivore', 'animal.pulpo.vida': '1-5 years',
        'curiosity.title': '📚 Animal Kingdom Facts',
        'curiosity.1.title': 'Animal Intelligence',
        'curiosity.1.desc': 'Octopuses have 9 brains: one central and one in each arm, allowing each tentacle to act semi-independently.',
        'curiosity.2.title': 'Incredible Speed',
        'curiosity.2.desc': 'The cheetah can reach 75 mph in just 3 seconds, faster than most sports cars.',
        'curiosity.3.title': 'The Largest Animal',
        'curiosity.3.desc': 'The blue whale is the largest animal that has ever existed, surpassing even the largest dinosaurs.',
        'curiosity.4.title': 'Biological Immortality',
        'curiosity.4.desc': 'The Turritopsis dohrnii jellyfish is considered "biologically immortal" as it can reverse its life cycle.',
        'footer.desc': 'Exploring the diversity of life on Earth.',
        'footer.categories': 'Categories',
        'footer.copyright': '© 2026 Wildpedia. Made with ❤️ for nature lovers.',
        'toast.added': '❤️ Added to favorites',
        'toast.removed': '💔 Removed from favorites',
        'modal.habitat': 'Habitat', 'modal.dieta': 'Diet', 'modal.vida': 'Lifespan',
        'wiki.label': 'Wikipedia random fact',
        'wiki.placeholder': 'Click to get a random fun fact about animals.',
        'wiki.btn': '🎲 New fact',
        'wiki.loading': 'Searching Wikipedia…',
        'wiki.error': "Couldn't find an animal fact. Try again!",
        'modal.wiki': 'Read on Wikipedia',
    }
};

function t(key) {
    return i18n[currentLang]?.[key] || i18n['es']?.[key] || key;
}

function setLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang === 'en' ? 'en' : 'es';
    langToggle.textContent = lang === 'en' ? '🇪🇸' : '🇬🇧';

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const val = t(key);
        if (el.tagName === 'INPUT') {
            el.placeholder = val;
        } else {
            el.textContent = val;
        }
    });

    searchInput.placeholder = t('search.placeholder');
    localStorage.setItem(LANG_KEY, lang);
}

const animals = {
    leon: { img: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=600&h=400&fit=crop', habitat_key: 'animal.leon.habitat', dieta_key: 'animal.leon.dieta', vida_key: 'animal.leon.vida', wiki: 'Panthera_leo' },
    delfin: { img: 'https://images.unsplash.com/photo-1570488344392-d00cc0fea93c?w=600&h=400&fit=crop', habitat_key: 'animal.delfin.habitat', dieta_key: 'animal.delfin.dieta', vida_key: 'animal.delfin.vida', wiki: 'Delphinus' },
    oso: { img: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=600&h=400&fit=crop', habitat_key: 'animal.oso.habitat', dieta_key: 'animal.oso.dieta', vida_key: 'animal.oso.vida', wiki: 'Ursus_arctos' },
    murcielago: { img: 'https://images.unsplash.com/photo-1520637488054-89a7e2462f29?w=600&h=400&fit=crop', habitat_key: 'animal.murcielago.habitat', dieta_key: 'animal.murcielago.dieta', vida_key: 'animal.murcielago.vida', wiki: 'Chiroptera' },
    aguila: { img: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=600&h=400&fit=crop', habitat_key: 'animal.aguila.habitat', dieta_key: 'animal.aguila.dieta', vida_key: 'animal.aguila.vida', wiki: 'Aquila_chrysaetos' },
    colibri: { img: 'https://images.unsplash.com/photo-1550358864-518f202c02ba?w=600&h=400&fit=crop', habitat_key: 'animal.colibri.habitat', dieta_key: 'animal.colibri.dieta', vida_key: 'animal.colibri.vida', wiki: 'Trochilidae' },
    buho: { img: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&h=400&fit=crop', habitat_key: 'animal.buho.habitat', dieta_key: 'animal.buho.dieta', vida_key: 'animal.buho.vida', wiki: 'Bubo_bubo' },
    flamenco: { img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop', habitat_key: 'animal.flamenco.habitat', dieta_key: 'animal.flamenco.dieta', vida_key: 'animal.flamenco.vida', wiki: 'Phoenicopterus' },
    cocodrilo: { img: 'https://images.unsplash.com/photo-1606159068539-7f4b0e1ab8e1?w=600&h=400&fit=crop', habitat_key: 'animal.cocodrilo.habitat', dieta_key: 'animal.cocodrilo.dieta', vida_key: 'animal.cocodrilo.vida', wiki: 'Crocodylidae' },
    camaleon: { img: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=600&h=400&fit=crop', habitat_key: 'animal.camaleon.habitat', dieta_key: 'animal.camaleon.dieta', vida_key: 'animal.camaleon.vida', wiki: 'Chamaeleonidae' },
    serpiente: { img: 'https://images.unsplash.com/photo-1531386151447-fd76ad50012f?w=600&h=400&fit=crop', habitat_key: 'animal.serpiente.habitat', dieta_key: 'animal.serpiente.dieta', vida_key: 'animal.serpiente.vida', wiki: 'Ophiophagus_hannah' },
    tortuga: { img: 'https://images.unsplash.com/photo-1590868309235-c002c4e9d168?w=600&h=400&fit=crop', habitat_key: 'animal.tortuga.habitat', dieta_key: 'animal.tortuga.dieta', vida_key: 'animal.tortuga.vida', wiki: 'Sea_turtle' },
    tiburon: { img: 'https://images.unsplash.com/photo-1560275619-4cc5fa59d3ae?w=600&h=400&fit=crop', habitat_key: 'animal.tiburon.habitat', dieta_key: 'animal.tiburon.dieta', vida_key: 'animal.tiburon.vida', wiki: 'Great_white_shark' },
    medusa: { img: 'https://images.unsplash.com/photo-1558635852-a457aa3b6b2f?w=600&h=400&fit=crop', habitat_key: 'animal.medusa.habitat', dieta_key: 'animal.medusa.dieta', vida_key: 'animal.medusa.vida', wiki: 'Jellyfish' },
    pezPayaso: { img: 'https://images.unsplash.com/photo-1559482574-7cc9e6dbf268?w=600&h=400&fit=crop', habitat_key: 'animal.pezPayaso.habitat', dieta_key: 'animal.pezPayaso.dieta', vida_key: 'animal.pezPayaso.vida', wiki: 'Clownfish' },
    pulpo: { img: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=600&h=400&fit=crop', habitat_key: 'animal.pulpo.habitat', dieta_key: 'animal.pulpo.dieta', vida_key: 'animal.pulpo.vida', wiki: 'Octopus' }
};

const animalCategories = {
    leon: 'mamiferos', delfin: 'mamiferos', oso: 'mamiferos', murcielago: 'mamiferos',
    aguila: 'aves', colibri: 'aves', buho: 'aves', flamenco: 'aves',
    cocodrilo: 'reptiles', camaleon: 'reptiles', serpiente: 'reptiles', tortuga: 'reptiles',
    tiburon: 'acuaticos', medusa: 'acuaticos', pezPayaso: 'acuaticos', pulpo: 'acuaticos'
};

function getFavorites() {
    try { return JSON.parse(localStorage.getItem(ANIMAL_KEY)) || []; }
    catch { return []; }
}

function saveFavorites(favs) {
    localStorage.setItem(ANIMAL_KEY, JSON.stringify(favs));
}

function toggleFavorite(key) {
    const favs = getFavorites();
    const idx = favs.indexOf(key);
    if (idx === -1) {
        favs.push(key);
        showToast(t('toast.added'));
    } else {
        favs.splice(idx, 1);
        showToast(t('toast.removed'));
    }
    saveFavorites(favs);
    updateFavButtons();
    renderFavorites();
    return favs;
}

function isFavorite(key) {
    return getFavorites().includes(key);
}

function updateFavButtons() {
    document.querySelectorAll('.fav-btn').forEach(btn => {
        const key = btn.dataset.animal;
        btn.classList.toggle('active', isFavorite(key));
        btn.textContent = isFavorite(key) ? '♥' : '♡';
    });
}

function renderFavorites() {
    const favs = getFavorites();
    favoritesGrid.innerHTML = '';
    if (favs.length === 0) {
        emptyFavs.style.display = 'block';
        return;
    }
    emptyFavs.style.display = 'none';
    favs.forEach(key => {
        const card = document.querySelector(`.animal-card[data-animal="${key}"]`);
        if (card) {
            const clone = card.cloneNode(true);
            clone.addEventListener('click', e => {
                if (e.target.closest('.fav-btn')) return;
                openModal(clone.dataset.animal);
            });
            const btn = clone.querySelector('.fav-btn');
            if (btn) {
                btn.addEventListener('click', e => {
                    e.stopPropagation();
                    toggleFavorite(key);
                });
            }
            favoritesGrid.appendChild(clone);
        }
    });
}

function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('visible');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => toast.classList.remove('visible'), 2000);
}

function openModal(key) {
    const data = animals[key];
    if (!data) return;
    const card = document.querySelector(`.animal-card[data-animal="${key}"]`);
    if (!card) return;
    const name = card.querySelector('h3').textContent;
    const scientific = card.querySelector('.scientific').textContent;
    const desc = card.querySelector('.card-body > p').textContent;

    const langPath = currentLang === 'en' ? 'en' : 'es';
    modalBody.innerHTML = `
        <div class="modal-img-wrapper" style="background:var(--bg-secondary);border-radius:12px;margin-bottom:24px;max-height:300px;overflow:hidden">
            <img src="${data.img}" alt="${name}" loading="lazy" style="width:100%;display:block;max-height:300px;object-fit:cover">
        </div>
        <h2>${name}</h2>
        <p class="scientific">${scientific}</p>
        <p class="description">${desc}</p>
        <div class="details">
            <div class="detail-item">
                <strong>${t('modal.habitat')}</strong>
                <span>${t(data.habitat_key)}</span>
            </div>
            <div class="detail-item">
                <strong>${t('modal.dieta')}</strong>
                <span>${t(data.dieta_key)}</span>
            </div>
            <div class="detail-item">
                <strong>${t('modal.vida')}</strong>
                <span>${t(data.vida_key)}</span>
            </div>
        </div>
        <a class="modal-wiki-link" href="https://${langPath}.wikipedia.org/wiki/${data.wiki}" target="_blank" rel="noopener">${t('modal.wiki')} 📖</a>
    `;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    const gradients = [
        '#f97316,#dc2626', '#06b6d4,#3b82f6', '#92400e,#78350f', '#1e293b,#0f172a',
        '#92400e,#a16207', '#059669,#10b981', '#451a03,#292524', '#f43f5e,#e11d48',
        '#166534,#14532d', '#65a30d,#4d7c0f', '#1e293b,#334155', '#15803d,#166534',
        '#1e3a5f,#0c4a6e', '#a21caf,#86198f', '#ea580c,#c2410c', '#c2410c,#9a3412'
    ];
    document.querySelectorAll('.card-image').forEach((el, i) => {
        el.style.background = `linear-gradient(135deg,${gradients[i]})`;
    });

    const savedLang = localStorage.getItem(LANG_KEY) || 'es';
    setLang(savedLang);

    updateFavButtons();
    renderFavorites();

    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    }
});

document.addEventListener('error', e => {
    if (e.target.tagName === 'IMG') e.target.style.display = 'none';
}, true);

// Language toggle
langToggle.addEventListener('click', () => {
    setLang(currentLang === 'es' ? 'en' : 'es');
});

// Theme
themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    themeToggle.textContent = isDark ? '🌙' : '☀️';
});

// Mobile menu
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
});

// Card clicks
document.querySelectorAll('.animal-card').forEach(card => {
    card.addEventListener('click', e => {
        if (e.target.closest('.fav-btn')) return;
        openModal(card.dataset.animal);
    });
});

// Favorites buttons
document.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', e => {
        e.stopPropagation();
        toggleFavorite(btn.dataset.animal);
    });
});

// Modal
modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

modal.addEventListener('click', e => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Search
searchInput.addEventListener('input', () => {
    const term = searchInput.value.toLowerCase().trim();
    document.querySelectorAll('.animal-card').forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        card.classList.toggle('hidden', term && !name.includes(term));
    });
    applyFilter();
});

// Filter pills
filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        applyFilter();
        const filter = pill.dataset.filter;
        if (filter !== 'all' && filter !== 'favorites') {
            const section = document.querySelector(`[data-category="${filter}"]`);
            if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

function applyFilter() {
    const active = document.querySelector('.filter-pill.active');
    const filter = active ? active.dataset.filter : 'all';
    const term = searchInput.value.toLowerCase().trim();

    document.querySelectorAll('.category-section[data-category]').forEach(section => {
        let show = false;
        section.querySelectorAll('.animal-card').forEach(card => {
            const key = card.dataset.animal;
            const name = card.querySelector('h3').textContent.toLowerCase();
            const matchesSearch = !term || name.includes(term);
            if (filter === 'all') {
                card.classList.toggle('hidden', !matchesSearch);
                if (!card.classList.contains('hidden')) show = true;
            } else if (filter === 'favorites') {
                card.classList.add('hidden');
            } else {
                const matchesCat = animalCategories[key] === filter;
                card.classList.toggle('hidden', !(matchesCat && matchesSearch));
                if (!card.classList.contains('hidden')) show = true;
            }
        });
        section.classList.toggle('hidden', filter !== 'favorites' && !show);
    });

    const favSection = document.getElementById('favorites-section');
    if (favSection) favSection.classList.toggle('hidden', filter !== 'favorites');
}

// Random animal
randomBtn.addEventListener('click', () => {
    const keys = Object.keys(animals);
    openModal(keys[Math.floor(Math.random() * keys.length)]);
});

// Counter animation
function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const step = Math.max(1, Math.floor(target / 60));
    let current = 0;
    const increment = () => {
        current += step;
        if (current >= target) {
            el.textContent = target.toLocaleString();
            return;
        }
        el.textContent = current.toLocaleString() + '+';
        requestAnimationFrame(increment);
    };
    increment();
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

const appearObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            appearObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.animal-card, .curiosity-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    appearObserver.observe(el);
});

// Wikipedia random fact
const wikiFactBtn = document.getElementById('wikiFactBtn');
const wikiFactBody = document.getElementById('wikiFactBody');
const ANIMAL_KEYWORDS = ['animal', 'especie', 'mamífero', 'ave', 'reptil', 'pez', 'insecto',
                         'felino', 'canino', 'depredador', 'herbívoro', 'carnívoro',
                         'animal', 'species', 'mammal', 'bird', 'reptile', 'fish', 'insect'];

wikiFactBtn.addEventListener('click', fetchWikiFact);

async function fetchWikiFact() {
    wikiFactBtn.disabled = true;
    wikiFactBody.innerHTML = `<div class="wiki-fact-spinner"></div>`;

    const langPath = currentLang === 'en' ? 'en' : 'es';
    const api = `https://${langPath}.wikipedia.org/api/rest_v1/page/random/summary`;

    for (let attempt = 0; attempt < 5; attempt++) {
        try {
            const res = await fetch(api);
            if (!res.ok) throw new Error('Fetch failed');
            const data = await res.json();
            const extract = (data.extract || '').toLowerCase();
            const isAnimal = ANIMAL_KEYWORDS.some(kw => extract.includes(kw));
            if (!isAnimal && attempt < 4) continue;

            wikiFactBody.innerHTML = `
                <div class="wiki-fact-content">
                    <h3>${data.title}</h3>
                    <p>${data.extract || t('wiki.error')}</p>
                    <a href="https://${langPath}.wikipedia.org/wiki/${encodeURIComponent(data.title)}" target="_blank" rel="noopener">${t('modal.wiki')} 📖</a>
                </div>
            `;
            wikiFactBtn.disabled = false;
            return;
        } catch {
            if (attempt === 4) {
                wikiFactBody.innerHTML = `<p class="wiki-fact-error">${t('wiki.error')}</p>`;
                wikiFactBtn.disabled = false;
            }
        }
    }
}
