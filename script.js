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

const authBtn = document.getElementById('authBtn');
const authModal = document.getElementById('authModal');
const authModalClose = document.getElementById('authModalClose');
const authModalBody = document.getElementById('authModalBody');

const ANIMAL_KEY = 'animalia_favorites';
const LANG_KEY = 'animalia_lang';
const AUTH_USERS_KEY = 'wildpedia_users';
const AUTH_SESSION_KEY = 'wildpedia_session';

let currentLang = 'es';

const i18n = {
    es: {
        'page.title': 'Wildpedia - Enciclopedia de Animales',
        'nav.inicio': 'Inicio', 'nav.mamiferos': 'Mamíferos', 'nav.aves': 'Aves',
        'nav.reptiles': 'Reptiles', 'nav.acuaticos': 'Acuáticos', 'nav.favoritos': 'Favoritos',
        'hero.title': 'Descubre el Reino Animal',
        'hero.desc': 'Explora la fascinante diversidad de especies que habitan nuestro planeta. Desde los majestuosos mamíferos hasta los coloridos habitantes del océano.',
        'search.placeholder': 'Buscar animal por nombre…', 'search.empty': 'No se encontraron animales con ese nombre.',
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
        'footer.contact': 'Contacto',
        'footer.copyright': '© 2026 Wildpedia. Hecho con ❤️ por @adlopp para los amantes de la naturaleza.',
        'toast.added': '❤️ Añadido a favoritos',
        'toast.removed': '💔 Eliminado de favoritos',
        'modal.habitat': 'Hábitat', 'modal.dieta': 'Dieta', 'modal.vida': 'Esperanza de vida',
        'wiki.label': 'Dato curioso de Wikipedia',
        'wiki.placeholder': 'Haz clic para obtener un dato curioso aleatorio sobre animales.',
        'wiki.btn': '🎲 Nuevo dato',
        'wiki.loading': 'Buscando en Wikipedia…',
        'wiki.error': 'No se encontró un dato de animal. ¡Intenta de nuevo!',
        'auth.login.title': 'Iniciar Sesión', 'auth.register.title': 'Crear Cuenta',
        'auth.username': 'Usuario', 'auth.email': 'Correo electrónico', 'auth.password': 'Contraseña', 'auth.confirm': 'Confirmar contraseña',
        'auth.login_btn': 'Entrar', 'auth.register_btn': 'Registrarse',
        'auth.no_account': '¿No tienes cuenta?', 'auth.has_account': '¿Ya tienes cuenta?',
        'auth.register_link': 'Regístrate', 'auth.login_link': 'Inicia sesión',
        'auth.error_exists': 'El usuario ya existe', 'auth.error_credentials': 'Usuario o contraseña incorrectos',
        'auth.error_passwords': 'Las contraseñas no coinciden',         'auth.error_empty': 'Completa todos los campos',
        'auth.error_minlength': 'Usuario y contraseña deben tener al menos 4 caracteres',
        'auth.error_username_chars': 'El usuario solo puede contener letras sin tildes, números y guión bajo',
        'auth.logout_btn': 'Cerrar sesión', 'auth.delete_btn': 'Eliminar cuenta',
        'auth.delete_confirm': 'Escribe tu contraseña para eliminar la cuenta.',
        'auth.deleted': 'Cuenta eliminada',
        'auth.cancel': 'Cancelar',
        'toast.login_required': 'Inicia sesión para guardar favoritos',
        'modal.wiki': 'Leer en Wikipedia',
        'load_more': 'Cargar más',
        'load_more_loading': 'Cargando…',
        'animal.elefante.name': 'Elefante', 'animal.elefante.desc': 'El animal terrestre más grande, conocido por su inteligencia y memoria.', 'animal.elefante.habitat': 'Sabanas y bosques', 'animal.elefante.dieta': 'Herbívoro', 'animal.elefante.vida': '60-70 años',
        'animal.perro.name': 'Perro', 'animal.perro.desc': 'El mejor amigo del hombre, domesticado hace más de 15,000 años.', 'animal.perro.habitat': 'Doméstico', 'animal.perro.dieta': 'Omnívoro', 'animal.perro.vida': '10-15 años',
        'animal.gato.name': 'Gato', 'animal.gato.desc': 'Felino doméstico ágil y curioso, venerado en culturas antiguas.', 'animal.gato.habitat': 'Doméstico', 'animal.gato.dieta': 'Carnívoro', 'animal.gato.vida': '12-18 años',
        'animal.caballo.name': 'Caballo', 'animal.caballo.desc': 'Mamífero herbívoro domesticado que ha acompañado al ser humano por milenios.', 'animal.caballo.habitat': 'Praderas y llanuras', 'animal.caballo.dieta': 'Herbívoro', 'animal.caballo.vida': '25-30 años',
        'animal.oso_polar.name': 'Oso Polar', 'animal.oso_polar.desc': 'El carnívoro terrestre más grande, perfectamente adaptado al hielo ártico.', 'animal.oso_polar.habitat': 'Ártico', 'animal.oso_polar.dieta': 'Carnívoro', 'animal.oso_polar.vida': '25-30 años',
        'animal.jirafa.name': 'Jirafa', 'animal.jirafa.desc': 'El animal más alto del mundo, con un cuello que puede alcanzar los 2 metros.', 'animal.jirafa.habitat': 'Sabanas africanas', 'animal.jirafa.dieta': 'Herbívoro', 'animal.jirafa.vida': '20-25 años',
        'animal.canguro.name': 'Canguro', 'animal.canguro.desc': 'Marsupial australiano que se desplaza dando grandes saltos.', 'animal.canguro.habitat': 'Australia', 'animal.canguro.dieta': 'Herbívoro', 'animal.canguro.vida': '6-8 años',
        'animal.chimpance.name': 'Chimpancé', 'animal.chimpance.desc': 'El primate más cercano al ser humano, con el que comparte el 98% del ADN.', 'animal.chimpance.habitat': 'Selvas africanas', 'animal.chimpance.dieta': 'Omnívoro', 'animal.chimpance.vida': '40-50 años',
        'animal.zorro.name': 'Zorro', 'animal.zorro.desc': 'Cánido astuto y adaptable, presente en casi todos los continentes.', 'animal.zorro.habitat': 'Bosques y tundra', 'animal.zorro.dieta': 'Carnívoro', 'animal.zorro.vida': '3-6 años',
        'animal.ciervo.name': 'Ciervo', 'animal.ciervo.desc': 'Mamífero elegante con astas ramificadas que se renuevan cada año.', 'animal.ciervo.habitat': 'Bosques templados', 'animal.ciervo.dieta': 'Herbívoro', 'animal.ciervo.vida': '10-20 años',
        'animal.gorrion.name': 'Gorrión', 'animal.gorrion.desc': 'Pequeña ave urbana que se ha adaptado perfectamente a la vida en ciudades.', 'animal.gorrion.habitat': 'Zonas urbanas y rurales', 'animal.gorrion.dieta': 'Omnívoro', 'animal.gorrion.vida': '3-5 años',
        'animal.pinguino.name': 'Pingüino', 'animal.pinguino.desc': 'Ave no voladora perfectamente adaptada a la vida marina en el hemisferio sur.', 'animal.pinguino.habitat': 'Antártida y costas frías', 'animal.pinguino.dieta': 'Carnívoro', 'animal.pinguino.vida': '15-20 años',
        'animal.loro.name': 'Loro', 'animal.loro.desc': 'Ave tropical conocida por su capacidad de imitar sonidos y su plumaje colorido.', 'animal.loro.habitat': 'Selvas tropicales', 'animal.loro.dieta': 'Frugívoro', 'animal.loro.vida': '30-50 años',
        'animal.paloma.name': 'Paloma', 'animal.paloma.desc': 'Ave domesticada desde la antigüedad, símbolo de paz y mensajera.', 'animal.paloma.habitat': 'Ciudades y campos', 'animal.paloma.dieta': 'Granívoro', 'animal.paloma.vida': '3-5 años',
        'animal.pavo_real.name': 'Pavo Real', 'animal.pavo_real.desc': 'Famoso por su espectacular plumaje con ocelos irisados.', 'animal.pavo_real.habitat': 'Bosques del sur de Asia', 'animal.pavo_real.dieta': 'Omnívoro', 'animal.pavo_real.vida': '15-20 años',
        'animal.ciguena.name': 'Cigüeña', 'animal.ciguena.desc': 'Ave migratoria de largas patas asociada a la llegada de la primavera.', 'animal.ciguena.habitat': 'Humedales y campos', 'animal.ciguena.dieta': 'Carnívoro', 'animal.ciguena.vida': '20-30 años',
        'animal.cuervo.name': 'Cuervo', 'animal.cuervo.desc': 'Una de las aves más inteligentes, capaz de usar herramientas y resolver problemas.', 'animal.cuervo.habitat': 'Bosques y montañas', 'animal.cuervo.dieta': 'Omnívoro', 'animal.cuervo.vida': '10-15 años',
        'animal.avestruz.name': 'Avestruz', 'animal.avestruz.desc': 'El ave más grande del mundo, corre a gran velocidad pero no puede volar.', 'animal.avestruz.habitat': 'Sabanas africanas', 'animal.avestruz.dieta': 'Herbívoro', 'animal.avestruz.vida': '30-40 años',
        'animal.iguana.name': 'Iguana', 'animal.iguana.desc': 'Lagarto herbívoro de gran tamaño con una distintiva cresta dorsal.', 'animal.iguana.habitat': 'Selvas tropicales', 'animal.iguana.dieta': 'Herbívoro', 'animal.iguana.vida': '15-20 años',
        'animal.serpiente_cascabel.name': 'Serpiente de Cascabel', 'animal.serpiente_cascabel.desc': 'Víbora venenosa con un sonajero en la cola que usa como advertencia.', 'animal.serpiente_cascabel.habitat': 'Desiertos y matorrales', 'animal.serpiente_cascabel.dieta': 'Carnívoro', 'animal.serpiente_cascabel.vida': '10-20 años',
        'animal.lagartija.name': 'Lagartija', 'animal.lagartija.desc': 'Pequeño reptil ágil y veloz que habita en muros y jardines.', 'animal.lagartija.habitat': 'Roquedales y jardines', 'animal.lagartija.dieta': 'Insectívoro', 'animal.lagartija.vida': '3-5 años',
        'animal.dragon_komodo.name': 'Dragón de Komodo', 'animal.dragon_komodo.desc': 'El lagarto más grande del mundo, depredador letal de las islas indonesias.', 'animal.dragon_komodo.habitat': 'Islas de Indonesia', 'animal.dragon_komodo.dieta': 'Carnívoro', 'animal.dragon_komodo.vida': '30-50 años',
        'animal.caiman.name': 'Caimán', 'animal.caiman.desc': 'Reptil emparentado con el cocodrilo, presente en ríos y pantanos americanos.', 'animal.caiman.habitat': 'Ríos y pantanos', 'animal.caiman.dieta': 'Carnívoro', 'animal.caiman.vida': '30-40 años',
        'animal.gecko.name': 'Gecko', 'animal.gecko.desc': 'Pequeño lagarto con almohadillas adhesivas que trepa por cualquier superficie.', 'animal.gecko.habitat': 'Selvas y zonas rocosas', 'animal.gecko.dieta': 'Insectívoro', 'animal.gecko.vida': '5-10 años',
        'animal.boa.name': 'Boa Constrictora', 'animal.boa.desc': 'Serpiente no venenosa que mata por constricción, apretando a sus presas.', 'animal.boa.habitat': 'Selvas tropicales', 'animal.boa.dieta': 'Carnívoro', 'animal.boa.vida': '20-30 años',
        'animal.monstruo_gila.name': 'Monstruo de Gila', 'animal.monstruo_gila.desc': 'Un lagarto venenoso de llamativos colores naranja y negro.', 'animal.monstruo_gila.habitat': 'Desiertos de Norteamérica', 'animal.monstruo_gila.dieta': 'Carnívoro', 'animal.monstruo_gila.vida': '20-30 años',
        'animal.falsa_coral.name': 'Falsa Coral', 'animal.falsa_coral.desc': 'Serpiente inofensiva que imita los colores de la coral venenosa.', 'animal.falsa_coral.habitat': 'Selvas tropicales', 'animal.falsa_coral.dieta': 'Carnívoro', 'animal.falsa_coral.vida': '10-15 años',
        'animal.ballena_azul.name': 'Ballena Azul', 'animal.ballena_azul.desc': 'El animal más grande que jamás haya existido en la Tierra.', 'animal.ballena_azul.habitat': 'Océanos abiertos', 'animal.ballena_azul.dieta': 'Carnívoro', 'animal.ballena_azul.vida': '80-90 años',
        'animal.orca.name': 'Orca', 'animal.orca.desc': 'Depredador marino inteligente que caza en grupo como los lobos.', 'animal.orca.habitat': 'Océanos de todo el mundo', 'animal.orca.dieta': 'Carnívoro', 'animal.orca.vida': '50-80 años',
        'animal.caballito_mar.name': 'Caballito de Mar', 'animal.caballito_mar.desc': 'Pez marino único donde el macho incuba los huevos en una bolsa.', 'animal.caballito_mar.habitat': 'Arrecifes de coral', 'animal.caballito_mar.dieta': 'Carnívoro', 'animal.caballito_mar.vida': '1-5 años',
        'animal.mantarraya.name': 'Mantarraya', 'animal.mantarraya.desc': 'Raya gigante que puede alcanzar 7 metros de envergadura.', 'animal.mantarraya.habitat': 'Océanos tropicales', 'animal.mantarraya.dieta': 'Carnívoro', 'animal.mantarraya.vida': '20-30 años',
        'animal.calamar_gigante.name': 'Calamar Gigante', 'animal.calamar_gigante.desc': 'Molusco de las profundidades, fuente de leyendas sobre monstruos marinos.', 'animal.calamar_gigante.habitat': 'Océanos profundos', 'animal.calamar_gigante.dieta': 'Carnívoro', 'animal.calamar_gigante.vida': '3-5 años',
        'animal.estrella_mar.name': 'Estrella de Mar', 'animal.estrella_mar.desc': 'Equinodermo con cinco brazos capaz de regenerar extremidades perdidas.', 'animal.estrella_mar.habitat': 'Fondos marinos', 'animal.estrella_mar.dieta': 'Carnívoro', 'animal.estrella_mar.vida': '5-35 años',
        'animal.cangrejo.name': 'Cangrejo', 'animal.cangrejo.desc': 'Crustáceo con caparazón duro que camina de lado y vive en costas y mares.', 'animal.cangrejo.habitat': 'Costas y fondos marinos', 'animal.cangrejo.dieta': 'Omnívoro', 'animal.cangrejo.vida': '3-10 años',
    },
    en: {
        'page.title': 'Wildpedia - Animal Encyclopedia',
        'nav.inicio': 'Home', 'nav.mamiferos': 'Mammals', 'nav.aves': 'Birds',
        'nav.reptiles': 'Reptiles', 'nav.acuaticos': 'Aquatic', 'nav.favoritos': 'Favorites',
        'hero.title': 'Discover the Animal Kingdom',
        'hero.desc': 'Explore the fascinating diversity of species that inhabit our planet. From majestic mammals to the colorful inhabitants of the ocean.',
        'search.placeholder': 'Search animal by name…', 'search.empty': 'No animals found with that name.',
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
        'footer.contact': 'Contact',
        'footer.copyright': '© 2026 Wildpedia. Made with ❤️ by @adlopp for nature lovers.',
        'toast.added': '❤️ Added to favorites',
        'toast.removed': '💔 Removed from favorites',
        'modal.habitat': 'Habitat', 'modal.dieta': 'Diet', 'modal.vida': 'Lifespan',
        'wiki.label': 'Wikipedia random fact',
        'wiki.placeholder': 'Click to get a random fun fact about animals.',
        'wiki.btn': '🎲 New fact',
        'wiki.loading': 'Searching Wikipedia…',
        'wiki.error': "Couldn't find an animal fact. Try again!",
        'auth.login.title': 'Log In', 'auth.register.title': 'Sign Up',
        'auth.username': 'Username', 'auth.email': 'Email', 'auth.password': 'Password', 'auth.confirm': 'Confirm Password',
        'auth.login_btn': 'Log In', 'auth.register_btn': 'Sign Up',
        'auth.no_account': "Don't have an account?", 'auth.has_account': 'Already have an account?',
        'auth.register_link': 'Sign Up', 'auth.login_link': 'Log In',
        'auth.error_exists': 'User already exists', 'auth.error_credentials': 'Invalid username or password',
        'auth.error_passwords': 'Passwords do not match',         'auth.error_empty': 'Fill in all fields',
        'auth.error_minlength': 'Username and password must be at least 4 characters',
        'auth.error_username_chars': 'Username can only contain letters (no accents), numbers and underscores',
        'auth.logout_btn': 'Log out', 'auth.delete_btn': 'Delete account',
        'auth.delete_confirm': 'Enter your password to delete the account.',
        'auth.deleted': 'Account deleted',
        'auth.cancel': 'Cancel',
        'toast.login_required': 'Log in to save favorites',
        'modal.wiki': 'Read on Wikipedia',
        'load_more': 'Load more',
        'load_more_loading': 'Loading…',
        'animal.elefante.name': 'Elephant', 'animal.elefante.desc': 'The largest land animal, known for its intelligence and memory.', 'animal.elefante.habitat': 'Savannas and forests', 'animal.elefante.dieta': 'Herbivore', 'animal.elefante.vida': '60-70 years',
        'animal.perro.name': 'Dog', 'animal.perro.desc': "Man's best friend, domesticated over 15,000 years ago.", 'animal.perro.habitat': 'Domestic', 'animal.perro.dieta': 'Omnivore', 'animal.perro.vida': '10-15 years',
        'animal.gato.name': 'Cat', 'animal.gato.desc': 'Agile and curious domestic feline, revered in ancient cultures.', 'animal.gato.habitat': 'Domestic', 'animal.gato.dieta': 'Carnivore', 'animal.gato.vida': '12-18 years',
        'animal.caballo.name': 'Horse', 'animal.caballo.desc': 'Domesticated herbivore that has accompanied humans for millennia.', 'animal.caballo.habitat': 'Grasslands and plains', 'animal.caballo.dieta': 'Herbivore', 'animal.caballo.vida': '25-30 years',
        'animal.oso_polar.name': 'Polar Bear', 'animal.oso_polar.desc': 'The largest land carnivore, perfectly adapted to Arctic ice.', 'animal.oso_polar.habitat': 'Arctic', 'animal.oso_polar.dieta': 'Carnivore', 'animal.oso_polar.vida': '25-30 years',
        'animal.jirafa.name': 'Giraffe', 'animal.jirafa.desc': 'The tallest animal in the world, with a neck reaching 2 meters.', 'animal.jirafa.habitat': 'African savannas', 'animal.jirafa.dieta': 'Herbivore', 'animal.jirafa.vida': '20-25 years',
        'animal.canguro.name': 'Kangaroo', 'animal.canguro.desc': 'Australian marsupial that moves by hopping great distances.', 'animal.canguro.habitat': 'Australia', 'animal.canguro.dieta': 'Herbivore', 'animal.canguro.vida': '6-8 years',
        'animal.chimpance.name': 'Chimpanzee', 'animal.chimpance.desc': 'The closest primate to humans, sharing 98% of DNA.', 'animal.chimpance.habitat': 'African jungles', 'animal.chimpance.dieta': 'Omnivore', 'animal.chimpance.vida': '40-50 years',
        'animal.zorro.name': 'Fox', 'animal.zorro.desc': 'Clever and adaptable canine present on almost every continent.', 'animal.zorro.habitat': 'Forests and tundra', 'animal.zorro.dieta': 'Carnivore', 'animal.zorro.vida': '3-6 years',
        'animal.ciervo.name': 'Deer', 'animal.ciervo.desc': 'Elegant mammal with branching antlers that regrow each year.', 'animal.ciervo.habitat': 'Temperate forests', 'animal.ciervo.dieta': 'Herbivore', 'animal.ciervo.vida': '10-20 years',
        'animal.gorrion.name': 'Sparrow', 'animal.gorrion.desc': 'Small urban bird perfectly adapted to city life.', 'animal.gorrion.habitat': 'Urban and rural areas', 'animal.gorrion.dieta': 'Omnivore', 'animal.gorrion.vida': '3-5 years',
        'animal.pinguino.name': 'Penguin', 'animal.pinguino.desc': 'Flightless bird perfectly adapted to marine life in the southern hemisphere.', 'animal.pinguino.habitat': 'Antarctica and cold coasts', 'animal.pinguino.dieta': 'Carnivore', 'animal.pinguino.vida': '15-20 years',
        'animal.loro.name': 'Parrot', 'animal.loro.desc': 'Tropical bird known for mimicking sounds and colorful plumage.', 'animal.loro.habitat': 'Tropical rainforests', 'animal.loro.dieta': 'Frugivore', 'animal.loro.vida': '30-50 years',
        'animal.paloma.name': 'Pigeon', 'animal.paloma.desc': 'Domesticated bird since ancient times, symbol of peace and messenger.', 'animal.paloma.habitat': 'Cities and fields', 'animal.paloma.dieta': 'Granivore', 'animal.paloma.vida': '3-5 years',
        'animal.pavo_real.name': 'Peacock', 'animal.pavo_real.desc': 'Famous for its spectacular iridescent plumage with eye-spots.', 'animal.pavo_real.habitat': 'South Asian forests', 'animal.pavo_real.dieta': 'Omnivore', 'animal.pavo_real.vida': '15-20 years',
        'animal.ciguena.name': 'Stork', 'animal.ciguena.desc': 'Long-legged migratory bird associated with the arrival of spring.', 'animal.ciguena.habitat': 'Wetlands and fields', 'animal.ciguena.dieta': 'Carnivore', 'animal.ciguena.vida': '20-30 years',
        'animal.cuervo.name': 'Raven', 'animal.cuervo.desc': 'One of the most intelligent birds, capable of using tools.', 'animal.cuervo.habitat': 'Forests and mountains', 'animal.cuervo.dieta': 'Omnivore', 'animal.cuervo.vida': '10-15 years',
        'animal.avestruz.name': 'Ostrich', 'animal.avestruz.desc': 'The largest bird in the world, runs fast but cannot fly.', 'animal.avestruz.habitat': 'African savannas', 'animal.avestruz.dieta': 'Herbivore', 'animal.avestruz.vida': '30-40 years',
        'animal.iguana.name': 'Iguana', 'animal.iguana.desc': 'Large herbivorous lizard with a distinctive dorsal crest.', 'animal.iguana.habitat': 'Tropical rainforests', 'animal.iguana.dieta': 'Herbivore', 'animal.iguana.vida': '15-20 years',
        'animal.serpiente_cascabel.name': 'Rattlesnake', 'animal.serpiente_cascabel.desc': 'Venomous viper with a rattle on its tail used as a warning.', 'animal.serpiente_cascabel.habitat': 'Deserts and scrublands', 'animal.serpiente_cascabel.dieta': 'Carnivore', 'animal.serpiente_cascabel.vida': '10-20 years',
        'animal.lagartija.name': 'Lizard', 'animal.lagartija.desc': 'Small agile reptile that inhabits walls and gardens.', 'animal.lagartija.habitat': 'Rocky areas and gardens', 'animal.lagartija.dieta': 'Insectivore', 'animal.lagartija.vida': '3-5 years',
        'animal.dragon_komodo.name': 'Komodo Dragon', 'animal.dragon_komodo.desc': 'The largest lizard in the world, a lethal predator from Indonesian islands.', 'animal.dragon_komodo.habitat': 'Indonesian islands', 'animal.dragon_komodo.dieta': 'Carnivore', 'animal.dragon_komodo.vida': '30-50 years',
        'animal.caiman.name': 'Caiman', 'animal.caiman.desc': 'Reptile related to crocodiles, found in American rivers and swamps.', 'animal.caiman.habitat': 'Rivers and swamps', 'animal.caiman.dieta': 'Carnivore', 'animal.caiman.vida': '30-40 years',
        'animal.gecko.name': 'Gecko', 'animal.gecko.desc': 'Small lizard with adhesive pads that climbs any surface.', 'animal.gecko.habitat': 'Jungles and rocky areas', 'animal.gecko.dieta': 'Insectivore', 'animal.gecko.vida': '5-10 years',
        'animal.boa.name': 'Boa Constrictor', 'animal.boa.desc': 'Non-venomous snake that kills by constriction, squeezing its prey.', 'animal.boa.habitat': 'Tropical rainforests', 'animal.boa.dieta': 'Carnivore', 'animal.boa.vida': '20-30 years',
        'animal.monstruo_gila.name': 'Gila Monster', 'animal.monstruo_gila.desc': 'A venomous lizard with striking orange and black colors.', 'animal.monstruo_gila.habitat': 'North American deserts', 'animal.monstruo_gila.dieta': 'Carnivore', 'animal.monstruo_gila.vida': '20-30 years',
        'animal.falsa_coral.name': 'False Coral Snake', 'animal.falsa_coral.desc': 'Harmless snake that mimics the colors of the venomous coral snake.', 'animal.falsa_coral.habitat': 'Tropical rainforests', 'animal.falsa_coral.dieta': 'Carnivore', 'animal.falsa_coral.vida': '10-15 years',
        'animal.ballena_azul.name': 'Blue Whale', 'animal.ballena_azul.desc': 'The largest animal that has ever existed on Earth.', 'animal.ballena_azul.habitat': 'Open oceans', 'animal.ballena_azul.dieta': 'Carnivore', 'animal.ballena_azul.vida': '80-90 years',
        'animal.orca.name': 'Orca', 'animal.orca.desc': 'Intelligent marine predator that hunts in groups like wolves.', 'animal.orca.habitat': 'Oceans worldwide', 'animal.orca.dieta': 'Carnivore', 'animal.orca.vida': '50-80 years',
        'animal.caballito_mar.name': 'Seahorse', 'animal.caballito_mar.desc': 'Unique marine fish where the male incubates eggs in a pouch.', 'animal.caballito_mar.habitat': 'Coral reefs', 'animal.caballito_mar.dieta': 'Carnivore', 'animal.caballito_mar.vida': '1-5 years',
        'animal.mantarraya.name': 'Manta Ray', 'animal.mantarraya.desc': 'Giant ray that can reach 7 meters in wingspan.', 'animal.mantarraya.habitat': 'Tropical oceans', 'animal.mantarraya.dieta': 'Carnivore', 'animal.mantarraya.vida': '20-30 years',
        'animal.calamar_gigante.name': 'Giant Squid', 'animal.calamar_gigante.desc': 'Deep-sea mollusk, source of legends about sea monsters.', 'animal.calamar_gigante.habitat': 'Deep oceans', 'animal.calamar_gigante.dieta': 'Carnivore', 'animal.calamar_gigante.vida': '3-5 years',
        'animal.estrella_mar.name': 'Starfish', 'animal.estrella_mar.desc': 'Echinoderm with five arms capable of regenerating lost limbs.', 'animal.estrella_mar.habitat': 'Sea floors', 'animal.estrella_mar.dieta': 'Carnivore', 'animal.estrella_mar.vida': '5-35 years',
        'animal.cangrejo.name': 'Crab', 'animal.cangrejo.desc': 'Crustacean with a hard shell that walks sideways on coasts and seas.', 'animal.cangrejo.habitat': 'Coasts and sea floors', 'animal.cangrejo.dieta': 'Omnivore', 'animal.cangrejo.vida': '3-10 years',
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
    delfin: { img: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?w=600&h=400&fit=crop', habitat_key: 'animal.delfin.habitat', dieta_key: 'animal.delfin.dieta', vida_key: 'animal.delfin.vida', wiki: 'Delphinus' },
    oso: { img: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=600&h=400&fit=crop', habitat_key: 'animal.oso.habitat', dieta_key: 'animal.oso.dieta', vida_key: 'animal.oso.vida', wiki: 'Ursus_arctos' },
    murcielago: { img: 'https://images.unsplash.com/photo-1552726516-8e582c6ec1f7?w=600&h=400&fit=crop', habitat_key: 'animal.murcielago.habitat', dieta_key: 'animal.murcielago.dieta', vida_key: 'animal.murcielago.vida', wiki: 'Chiroptera' },
    aguila: { img: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=600&h=400&fit=crop', habitat_key: 'animal.aguila.habitat', dieta_key: 'animal.aguila.dieta', vida_key: 'animal.aguila.vida', wiki: 'Aquila_chrysaetos' },
    colibri: { img: 'https://images.unsplash.com/photo-1550358864-518f202c02ba?w=600&h=400&fit=crop', habitat_key: 'animal.colibri.habitat', dieta_key: 'animal.colibri.dieta', vida_key: 'animal.colibri.vida', wiki: 'Trochilidae' },
    buho: { img: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&h=400&fit=crop', habitat_key: 'animal.buho.habitat', dieta_key: 'animal.buho.dieta', vida_key: 'animal.buho.vida', wiki: 'Bubo_bubo' },
    flamenco: { img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop', habitat_key: 'animal.flamenco.habitat', dieta_key: 'animal.flamenco.dieta', vida_key: 'animal.flamenco.vida', wiki: 'Phoenicopterus' },
    cocodrilo: { img: 'https://images.unsplash.com/photo-1774590552091-47215947e629?w=600&h=400&fit=crop', habitat_key: 'animal.cocodrilo.habitat', dieta_key: 'animal.cocodrilo.dieta', vida_key: 'animal.cocodrilo.vida', wiki: 'Crocodylidae' },
    camaleon: { img: '', habitat_key: 'animal.camaleon.habitat', dieta_key: 'animal.camaleon.dieta', vida_key: 'animal.camaleon.vida', wiki: 'Chamaeleonidae' },
    serpiente: { img: 'https://images.unsplash.com/photo-1531386151447-fd76ad50012f?w=600&h=400&fit=crop', habitat_key: 'animal.serpiente.habitat', dieta_key: 'animal.serpiente.dieta', vida_key: 'animal.serpiente.vida', wiki: 'Ophiophagus_hannah' },
    tortuga: { img: '', habitat_key: 'animal.tortuga.habitat', dieta_key: 'animal.tortuga.dieta', vida_key: 'animal.tortuga.vida', wiki: 'Chelonioidea' },
    tiburon: { img: 'https://images.unsplash.com/photo-1560275619-4cc5fa59d3ae?w=600&h=400&fit=crop', habitat_key: 'animal.tiburon.habitat', dieta_key: 'animal.tiburon.dieta', vida_key: 'animal.tiburon.vida', wiki: 'Great_white_shark' },
    medusa: { img: '', habitat_key: 'animal.medusa.habitat', dieta_key: 'animal.medusa.dieta', vida_key: 'animal.medusa.vida', wiki: 'Medusozoa' },
    pezPayaso: { img: '', habitat_key: 'animal.pezPayaso.habitat', dieta_key: 'animal.pezPayaso.dieta', vida_key: 'animal.pezPayaso.vida', wiki: 'Amphiprioninae' },
    pulpo: { img: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=600&h=400&fit=crop', habitat_key: 'animal.pulpo.habitat', dieta_key: 'animal.pulpo.dieta', vida_key: 'animal.pulpo.vida', wiki: 'Octopus' },
    elefante: { img: '', habitat_key: 'animal.elefante.habitat', dieta_key: 'animal.elefante.dieta', vida_key: 'animal.elefante.vida', wiki: 'Elephantidae' },
    perro: { img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Huskiesatrest.jpg/330px-Huskiesatrest.jpg', habitat_key: 'animal.perro.habitat', dieta_key: 'animal.perro.dieta', vida_key: 'animal.perro.vida', wiki: 'Canis_lupus_familiaris' },
    gato: { img: '', habitat_key: 'animal.gato.habitat', dieta_key: 'animal.gato.dieta', vida_key: 'animal.gato.vida', wiki: 'Felis_silvestris_catus' },
    caballo: { img: '', habitat_key: 'animal.caballo.habitat', dieta_key: 'animal.caballo.dieta', vida_key: 'animal.caballo.vida', wiki: 'Equus_ferus_caballus' },
    oso_polar: { img: '', habitat_key: 'animal.oso_polar.habitat', dieta_key: 'animal.oso_polar.dieta', vida_key: 'animal.oso_polar.vida', wiki: 'Ursus_maritimus' },
    jirafa: { img: '', habitat_key: 'animal.jirafa.habitat', dieta_key: 'animal.jirafa.dieta', vida_key: 'animal.jirafa.vida', wiki: 'Giraffa' },
    canguro: { img: '', habitat_key: 'animal.canguro.habitat', dieta_key: 'animal.canguro.dieta', vida_key: 'animal.canguro.vida', wiki: 'Macropus' },
    chimpance: { img: '', habitat_key: 'animal.chimpance.habitat', dieta_key: 'animal.chimpance.dieta', vida_key: 'animal.chimpance.vida', wiki: 'Pan_troglodytes' },
    zorro: { img: '', habitat_key: 'animal.zorro.habitat', dieta_key: 'animal.zorro.dieta', vida_key: 'animal.zorro.vida', wiki: 'Vulpes_vulpes' },
    ciervo: { img: '', habitat_key: 'animal.ciervo.habitat', dieta_key: 'animal.ciervo.dieta', vida_key: 'animal.ciervo.vida', wiki: 'Cervidae' },
    gorrion: { img: '', habitat_key: 'animal.gorrion.habitat', dieta_key: 'animal.gorrion.dieta', vida_key: 'animal.gorrion.vida', wiki: 'Passer_domesticus' },
    pinguino: { img: '', habitat_key: 'animal.pinguino.habitat', dieta_key: 'animal.pinguino.dieta', vida_key: 'animal.pinguino.vida', wiki: 'Spheniscidae' },
    loro: { img: '', habitat_key: 'animal.loro.habitat', dieta_key: 'animal.loro.dieta', vida_key: 'animal.loro.vida', wiki: 'Psittacidae' },
    paloma: { img: '', habitat_key: 'animal.paloma.habitat', dieta_key: 'animal.paloma.dieta', vida_key: 'animal.paloma.vida', wiki: 'Columbidae' },
    pavo_real: { img: '', habitat_key: 'animal.pavo_real.habitat', dieta_key: 'animal.pavo_real.dieta', vida_key: 'animal.pavo_real.vida', wiki: 'Pavo_cristatus' },
    ciguena: { img: '', habitat_key: 'animal.ciguena.habitat', dieta_key: 'animal.ciguena.dieta', vida_key: 'animal.ciguena.vida', wiki: 'Ciconia_ciconia' },
    cuervo: { img: '', habitat_key: 'animal.cuervo.habitat', dieta_key: 'animal.cuervo.dieta', vida_key: 'animal.cuervo.vida', wiki: 'Corvus_corax' },
    avestruz: { img: '', habitat_key: 'animal.avestruz.habitat', dieta_key: 'animal.avestruz.dieta', vida_key: 'animal.avestruz.vida', wiki: 'Struthio_camelus' },
    iguana: { img: '', habitat_key: 'animal.iguana.habitat', dieta_key: 'animal.iguana.dieta', vida_key: 'animal.iguana.vida', wiki: 'Iguana_iguana' },
    serpiente_cascabel: { img: '', habitat_key: 'animal.serpiente_cascabel.habitat', dieta_key: 'animal.serpiente_cascabel.dieta', vida_key: 'animal.serpiente_cascabel.vida', wiki: 'Crotalus' },
    lagartija: { img: '', habitat_key: 'animal.lagartija.habitat', dieta_key: 'animal.lagartija.dieta', vida_key: 'animal.lagartija.vida', wiki: 'Lacertidae' },
    dragon_komodo: { img: '', habitat_key: 'animal.dragon_komodo.habitat', dieta_key: 'animal.dragon_komodo.dieta', vida_key: 'animal.dragon_komodo.vida', wiki: 'Varanus_komodoensis' },
    caiman: { img: '', habitat_key: 'animal.caiman.habitat', dieta_key: 'animal.caiman.dieta', vida_key: 'animal.caiman.vida', wiki: 'Caiman' },
    gecko: { img: '', habitat_key: 'animal.gecko.habitat', dieta_key: 'animal.gecko.dieta', vida_key: 'animal.gecko.vida', wiki: 'Gekkota' },
    boa: { img: '', habitat_key: 'animal.boa.habitat', dieta_key: 'animal.boa.dieta', vida_key: 'animal.boa.vida', wiki: 'Boidae' },
    monstruo_gila: { img: '', habitat_key: 'animal.monstruo_gila.habitat', dieta_key: 'animal.monstruo_gila.dieta', vida_key: 'animal.monstruo_gila.vida', wiki: 'Heloderma_suspectum' },
    falsa_coral: { img: '', habitat_key: 'animal.falsa_coral.habitat', dieta_key: 'animal.falsa_coral.dieta', vida_key: 'animal.falsa_coral.vida', wiki: 'Lampropeltis' },
    ballena_azul: { img: '', habitat_key: 'animal.ballena_azul.habitat', dieta_key: 'animal.ballena_azul.dieta', vida_key: 'animal.ballena_azul.vida', wiki: 'Balaenoptera_musculus' },
    orca: { img: '', habitat_key: 'animal.orca.habitat', dieta_key: 'animal.orca.dieta', vida_key: 'animal.orca.vida', wiki: 'Orcinus_orca' },
    caballito_mar: { img: '', habitat_key: 'animal.caballito_mar.habitat', dieta_key: 'animal.caballito_mar.dieta', vida_key: 'animal.caballito_mar.vida', wiki: 'Hippocampus' },
    mantarraya: { img: '', habitat_key: 'animal.mantarraya.habitat', dieta_key: 'animal.mantarraya.dieta', vida_key: 'animal.mantarraya.vida', wiki: 'Manta_birostris' },
    calamar_gigante: { img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Giant_squid_Ranheim.jpg/330px-Giant_squid_Ranheim.jpg', habitat_key: 'animal.calamar_gigante.habitat', dieta_key: 'animal.calamar_gigante.dieta', vida_key: 'animal.calamar_gigante.vida', wiki: 'Architeuthis' },
    estrella_mar: { img: '', habitat_key: 'animal.estrella_mar.habitat', dieta_key: 'animal.estrella_mar.dieta', vida_key: 'animal.estrella_mar.vida', wiki: 'Asteroidea' },
    cangrejo: { img: '', habitat_key: 'animal.cangrejo.habitat', dieta_key: 'animal.cangrejo.dieta', vida_key: 'animal.cangrejo.vida', wiki: 'Brachyura' }
};

const animalCategories = {
    leon: 'mamiferos', delfin: 'acuaticos', oso: 'mamiferos', murcielago: 'mamiferos',
    aguila: 'aves', colibri: 'aves', buho: 'aves', flamenco: 'aves',
    cocodrilo: 'reptiles', camaleon: 'reptiles', serpiente: 'reptiles', tortuga: 'reptiles',
    tiburon: 'acuaticos', medusa: 'acuaticos', pezPayaso: 'acuaticos', pulpo: 'acuaticos',
    elefante: 'mamiferos', perro: 'mamiferos', gato: 'mamiferos', caballo: 'mamiferos',
    oso_polar: 'mamiferos', jirafa: 'mamiferos', canguro: 'mamiferos', chimpance: 'mamiferos',
    zorro: 'mamiferos', ciervo: 'mamiferos',
    gorrion: 'aves', pinguino: 'aves', loro: 'aves', paloma: 'aves',
    pavo_real: 'aves', ciguena: 'aves', cuervo: 'aves', avestruz: 'aves',
    iguana: 'reptiles', serpiente_cascabel: 'reptiles', lagartija: 'reptiles',
    dragon_komodo: 'reptiles', caiman: 'reptiles', gecko: 'reptiles', boa: 'reptiles',
    monstruo_gila: 'reptiles', falsa_coral: 'reptiles',
    ballena_azul: 'acuaticos', orca: 'acuaticos', caballito_mar: 'acuaticos',
    mantarraya: 'acuaticos', calamar_gigante: 'acuaticos', estrella_mar: 'acuaticos', cangrejo: 'acuaticos'
};

const CATEGORY_ORDER = {
    mamiferos: ['leon', 'elefante', 'perro', 'gato', 'caballo', 'oso_polar', 'jirafa', 'canguro', 'murcielago', 'chimpance', 'zorro', 'ciervo'],
    aves: ['aguila', 'gorrion', 'pinguino', 'flamenco', 'loro', 'buho', 'paloma', 'pavo_real', 'colibri', 'ciguena', 'cuervo', 'avestruz'],
    reptiles: ['cocodrilo', 'tortuga', 'iguana', 'serpiente_cascabel', 'camaleon', 'lagartija', 'dragon_komodo', 'caiman', 'gecko', 'boa', 'monstruo_gila', 'falsa_coral'],
    acuaticos: ['delfin', 'tiburon', 'ballena_azul', 'pulpo', 'orca', 'pezPayaso', 'medusa', 'caballito_mar', 'mantarraya', 'calamar_gigante', 'estrella_mar', 'cangrejo']
};

function getFavorites() {
    try { return JSON.parse(localStorage.getItem(ANIMAL_KEY)) || []; }
    catch { return []; }
}

function saveFavorites(favs) {
    localStorage.setItem(ANIMAL_KEY, JSON.stringify(favs));
}

function toggleFavorite(key) {
    if (!isLoggedIn()) {
        showToast(t('toast.login_required'));
        return;
    }
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
        const fav = isLoggedIn() && isFavorite(key);
        btn.classList.toggle('active', fav);
        btn.textContent = fav ? '♥' : '♡';
    });
}

function renderFavorites() {
    favoritesGrid.innerHTML = '';
    if (!isLoggedIn()) {
        emptyFavs.style.display = 'block';
        emptyFavs.querySelector('p').textContent = t('toast.login_required');
        return;
    }
    if (getFavorites().length === 0) {
        emptyFavs.style.display = 'block';
        emptyFavs.querySelector('p').textContent = t('section.favoritos.empty');
        return;
    }
    emptyFavs.style.display = 'none';
    const favs = getFavorites();
    favs.forEach(key => {
        const existing = document.querySelector(`.animal-card[data-animal="${key}"]`);
        if (existing) {
            const clone = existing.cloneNode(true);
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
        } else {
            const card = buildCardElement(key);
            if (card) favoritesGrid.appendChild(card);
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
    const detailsHtml = data.habitat_key ? `
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
        </div>` : '';
    modalBody.innerHTML = `
        <div class="modal-img-wrapper" style="background:linear-gradient(135deg,${randomGradient()});border-radius:12px;margin-bottom:24px;max-height:300px;overflow:hidden">
            ${data.img ? `<img src="${data.img}" alt="${name}" loading="lazy" style="width:100%;display:block;max-height:300px;object-fit:cover">` : `<div style="height:300px"></div>`}
        </div>
        <h2>${name}</h2>
        <p class="scientific">${scientific}</p>
        <p class="description">${desc}</p>
        ${detailsHtml}
        <a class="modal-wiki-link" href="https://${langPath}.wikipedia.org/wiki/${data.wiki}" target="_blank" rel="noopener">${t('modal.wiki')} 📖</a>
    `;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function randomGradient() {
    const colors = [
        '#f97316,#dc2626', '#06b6d4,#3b82f6', '#92400e,#78350f', '#1e293b,#0f172a',
        '#92400e,#a16207', '#059669,#10b981', '#451a03,#292524', '#f43f5e,#e11d48',
        '#166534,#14532d', '#65a30d,#4d7c0f', '#1e293b,#334155', '#15803d,#166534',
        '#1e3a5f,#0c4a6e', '#a21caf,#86198f', '#ea580c,#c2410c', '#c2410c,#9a3412'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

async function fetchWikiImage(key) {
    const data = animals[key];
    if (!data || !data.wiki) return;
    try {
        const res = await fetch(`https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(data.wiki)}`);
        if (!res.ok) return;
        const d = await res.json();
        if (d.thumbnail?.source) {
            data.img = d.thumbnail.source;
            const img = document.querySelector(`.animal-card[data-animal="${key}"] .card-image img`);
            if (img) {
                img.style.display = '';
                img.src = data.img;
            }
        }
    } catch {}
}

function buildCardElement(key) {
    const data = animals[key];
    if (!data) return null;

    const nameKey = 'animal.' + key + '.name';
    const name = t(nameKey);
    const scientific = data.wiki.replace(/_/g, ' ');
    const descKey = 'animal.' + key + '.desc';
    const desc = t(descKey);

    const card = document.createElement('article');
    card.className = 'animal-card';
    card.dataset.animal = key;
    const imgHtml = data.img
        ? `<img src="${data.img.replace('w=600&h=400', 'w=400&h=300')}" alt="${name}" loading="lazy">`
        : `<img src="" alt="${name}" loading="lazy" style="display:none">`;
    card.innerHTML = `
        <button class="fav-btn" data-animal="${key}" aria-label="Añadir a favoritos">♡</button>
        <div class="card-image" style="background:linear-gradient(135deg,${randomGradient()})">
            ${imgHtml}
        </div>
        <div class="card-body">
            <h3>${name}</h3>
            <p class="scientific">${scientific}</p>
            <p>${desc}</p>
        </div>`;

    card.addEventListener('click', e => {
        if (e.target.closest('.fav-btn')) return;
        openModal(key);
    });
    const btn = card.querySelector('.fav-btn');
    btn.addEventListener('click', e => {
        e.stopPropagation();
        toggleFavorite(key);
    });

    if (isFavorite(key)) {
        btn.classList.add('active');
        btn.textContent = '♥';
    }

    if (!data.img) fetchWikiImage(key);

    return card;
}

function createAnimalCard(key, category) {
    const track = document.querySelector(`section[data-category="${category}"] .carousel-track`);
    if (!track) return;

    const card = buildCardElement(key);
    if (!card) return;

    track.appendChild(card);

    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    requestAnimationFrame(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
}

function showCategoryCards(category) {
    const list = CATEGORY_ORDER[category];
    if (!list) return;
    const track = document.querySelector(`section[data-category="${category}"] .carousel-track`);
    if (!track) return;
    track.innerHTML = '';
    list.forEach(key => createAnimalCard(key, category));
}

function initCategories() {
    document.querySelectorAll('.category-section[data-category]').forEach(section => {
        const category = section.dataset.category;
        if (category === 'favorites') return;

        const grid = section.querySelector('.card-grid');
        if (!grid || grid.closest('.carousel')) return;

        grid.classList.add('carousel-track');

        const carousel = document.createElement('div');
        carousel.className = 'carousel';
        grid.parentNode.insertBefore(carousel, grid);
        carousel.appendChild(grid);

        const prev = document.createElement('button');
        prev.className = 'carousel-btn prev';
        prev.textContent = '◀';
        const next = document.createElement('button');
        next.className = 'carousel-btn next';
        next.textContent = '▶';
        carousel.appendChild(prev);
        carousel.appendChild(next);

        const scroll = (dir) => {
            const card = grid.querySelector('.animal-card');
            if (!card) return;
            const gap = parseInt(getComputedStyle(grid).gap) || 24;
            const step = card.offsetWidth + gap;
            grid.scrollBy({ left: dir * step, behavior: 'smooth' });
        };

        prev.addEventListener('click', () => scroll(-1));
        next.addEventListener('click', () => scroll(1));

        showCategoryCards(category);
    });
    renderFavorites();
    updateFavButtons();
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem(LANG_KEY) || 'es';
    setLang(savedLang);

    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    }

    initCategories();
    updateAuthUI();
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
const searchSuggestions = document.getElementById('searchSuggestions');

searchInput.addEventListener('input', () => {
    const term = searchInput.value.toLowerCase().trim();

    document.querySelectorAll('.animal-card.highlighted').forEach(c => c.classList.remove('highlighted'));

    document.querySelectorAll('.animal-card').forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const sci = card.querySelector('.scientific').textContent.toLowerCase();
        const text = name + ' ' + sci;
        card.classList.toggle('hidden', term && !text.includes(term));
    });
    applyFilter();

    const searchEmpty = document.getElementById('searchEmpty');
    const visible = document.querySelectorAll('.animal-card:not(.hidden)');
    searchEmpty.style.display = term && visible.length === 0 ? 'block' : 'none';

    if (!term) {
        searchSuggestions.classList.remove('active');
        return;
    }

    const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const nterm = normalize(term);

    const matches = [];
    document.querySelectorAll('.animal-card:not(.hidden)').forEach(card => {
        const name = card.querySelector('h3').textContent;
        const sci = card.querySelector('.scientific').textContent;
        const nname = normalize(name);
        const nsci = normalize(sci);
        let score = 0;
        if (nname.startsWith(nterm)) score = 4;
        else if (nsci.startsWith(nterm)) score = 3;
        else if (nname.includes(nterm)) score = 2;
        else if (nsci.includes(nterm)) score = 1;
        if (score) matches.push({ key: card.dataset.animal, name, sci, score });
    });

    matches.sort((a, b) => b.score - a.score);

    if (matches.length === 0 || matches.length > 12) {
        searchSuggestions.classList.remove('active');
        return;
    }

    searchSuggestions.innerHTML = matches.map(m =>
        `<li data-animal="${m.key}">${m.name} <span>${m.sci}</span></li>`
    ).join('');
    searchSuggestions.classList.add('active');
});

searchSuggestions.addEventListener('click', e => {
    const li = e.target.closest('li');
    if (!li) return;
    const key = li.dataset.animal;
    const card = document.querySelector(`.animal-card[data-animal="${key}"]`);
    if (!card) return;
    searchInput.value = card.querySelector('h3').textContent;
    searchSuggestions.classList.remove('active');

    const term = searchInput.value.toLowerCase().trim();
    document.querySelectorAll('.animal-card').forEach(c => {
        const n = c.querySelector('h3').textContent.toLowerCase();
        const s = c.querySelector('.scientific').textContent.toLowerCase();
        c.classList.toggle('hidden', !n.includes(term) && !s.includes(term));
    });
    applyFilter();

    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.classList.add('highlighted');
});

document.addEventListener('click', e => {
    if (!e.target.closest('.search-container')) {
        searchSuggestions.classList.remove('active');
    }
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
            const sci = card.querySelector('.scientific').textContent.toLowerCase();
            const matchesSearch = !term || (name + ' ' + sci).includes(term);
            if (filter === 'all') {
                card.classList.toggle('hidden', !matchesSearch);
                if (!card.classList.contains('hidden')) show = true;
            } else if (filter === 'favorites') {
                const isFav = isFavorite(key);
                card.classList.toggle('hidden', !isFav);
                if (!card.classList.contains('hidden')) show = true;
            } else {
                const matchesCat = animalCategories[key] === filter;
                card.classList.toggle('hidden', !(matchesCat && matchesSearch));
                if (!card.classList.contains('hidden')) show = true;
            }
        });
        section.classList.toggle('hidden', filter === 'favorites' || !show);
    });

    const favSection = document.getElementById('favorites-section');
    if (favSection) favSection.classList.toggle('hidden', filter !== 'favorites');
}

// Random animal
randomBtn.addEventListener('click', () => {
    const keys = Object.keys(animals);
    openModal(keys[Math.floor(Math.random() * keys.length)]);
});

// Auth
authBtn.addEventListener('click', () => {
    if (isLoggedIn()) {
        showProfileForm();
    } else {
        showAuthForm();
    }
});

authModalClose.addEventListener('click', () => {
    authModal.classList.remove('active');
    document.body.style.overflow = '';
});

authModalBody.addEventListener('click', e => {
    const toggle = e.target.closest('.password-toggle');
    if (toggle) {
        const input = toggle.parentElement.querySelector('input');
        const isPass = input.type === 'password';
        input.type = isPass ? 'text' : 'password';
        toggle.textContent = isPass ? '🙈' : '👁';
    }
});

authModal.addEventListener('click', e => {
    if (e.target === authModal) {
        authModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && authModal.classList.contains('active')) {
        authModal.classList.remove('active');
        document.body.style.overflow = '';
    }
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
const ANIMAL_KEYS = Object.keys(animals);

wikiFactBtn.addEventListener('click', fetchWikiFact);

async function fetchWikiFact() {
    wikiFactBtn.disabled = true;
    wikiFactBody.innerHTML = `<div class="wiki-fact-spinner"></div>`;

    const key = ANIMAL_KEYS[Math.floor(Math.random() * ANIMAL_KEYS.length)];
    const animalData = animals[key];
    const langPath = currentLang === 'en' ? 'en' : 'es';

    try {
        const res = await fetch(`https://${langPath}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(animalData.wiki)}`);
        if (!res.ok) throw new Error('Fetch failed');
        const data = await res.json();

        wikiFactBody.innerHTML = `
            <div class="wiki-fact-content">
                <h3>${data.title}</h3>
                <p>${data.extract || t('wiki.error')}</p>
                <a href="https://${langPath}.wikipedia.org/wiki/${encodeURIComponent(data.title)}" target="_blank" rel="noopener">${t('modal.wiki')} 📖</a>
            </div>
        `;
    } catch {
        wikiFactBody.innerHTML = `<p class="wiki-fact-error">${t('wiki.error')}</p>`;
    }

    wikiFactBtn.disabled = false;
}

// Auth
function getUsers() {
    try { return JSON.parse(localStorage.getItem(AUTH_USERS_KEY)) || []; }
    catch { return []; }
}

function saveUsers(users) {
    localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
}

function getSession() {
    return localStorage.getItem(AUTH_SESSION_KEY);
}

function setSession(username) {
    if (username) localStorage.setItem(AUTH_SESSION_KEY, username);
    else localStorage.removeItem(AUTH_SESSION_KEY);
}

function isLoggedIn() {
    return !!getSession();
}

function register(username, email, password) {
    const users = getUsers();
    if (users.find(u => u.username === username)) return { ok: false, error: t('auth.error_exists') };
    if (!username || !email || !password) return { ok: false, error: t('auth.error_empty') };
    if (username.length < 4 || password.length < 4) return { ok: false, error: t('auth.error_minlength') };
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return { ok: false, error: t('auth.error_username_chars') };
    users.push({ username, email, password });
    saveUsers(users);
    return { ok: true };
}

function login(username, password) {
    if (!username || !password) return { ok: false, error: t('auth.error_empty') };
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return { ok: false, error: t('auth.error_credentials') };
    setSession(username);
    return { ok: true };
}

function logout() {
    setSession(null);
    updateAuthUI();
    updateFavButtons();
    renderFavorites();
    showToast('👋 ' + t('auth.logout_btn'));
}

function updateAuthUI() {
    const session = getSession();
    if (session) {
        authBtn.textContent = '👤 ' + session;
        authBtn.classList.add('logged-in');
        authBtn.title = session;
    } else {
        authBtn.textContent = '👤';
        authBtn.classList.remove('logged-in');
        authBtn.title = t('auth.login.title');
    }
}

function showProfileForm() {
    const session = getSession();

    function showDeleteConfirm() {
        authModalBody.innerHTML = `
            <div class="auth-form" style="text-align:center">
                <h2>🔐 ${t('auth.delete_btn')}</h2>
                <p style="color:var(--text-secondary);margin-bottom:24px">${t('auth.delete_confirm')}</p>
                <div class="form-group">
                    <input type="password" id="deletePass" placeholder="${t('auth.password')}" required>
                </div>
                <button class="auth-submit" id="deleteConfirm" style="background:#dc2626">${t('auth.delete_btn')}</button>
                <button class="auth-link" id="deleteCancel" style="margin-top:12px;display:block;width:100%">${t('auth.cancel')}</button>
            </div>
        `;

        document.getElementById('deleteConfirm').addEventListener('click', () => {
            const pass = document.getElementById('deletePass').value;
            const users = getUsers();
            const user = users.find(u => u.username === session);
            if (!user || user.password !== pass) {
                document.getElementById('deletePass').focus();
                document.getElementById('deletePass').style.outline = '2px solid #dc2626';
                return;
            }
            saveUsers(users.filter(u => u.username !== session));
            logout();
            authModal.classList.remove('active');
            document.body.style.overflow = '';
            showToast('🗑️ ' + t('auth.deleted'));
        });

        document.getElementById('deleteCancel').addEventListener('click', showProfileForm);

        document.getElementById('deletePass').addEventListener('keydown', e => {
            if (e.key === 'Enter') document.getElementById('deleteConfirm').click();
        });

        setTimeout(() => document.getElementById('deletePass').focus(), 100);
    }

    authModalBody.innerHTML = `
        <div class="auth-form" style="text-align:center">
            <h2>👤 ${session}</h2>
            <p style="color:var(--text-secondary);margin-bottom:24px">${t('section.favoritos.empty')}</p>
            <button class="auth-submit" id="profileLogout" style="margin-bottom:12px">${t('auth.logout_btn')}</button>
            <button class="auth-submit" id="profileDelete" style="background:#dc2626">${t('auth.delete_btn')}</button>
        </div>
    `;
    authModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    document.getElementById('profileLogout').addEventListener('click', () => {
        authModal.classList.remove('active');
        document.body.style.overflow = '';
        logout();
    });

    document.getElementById('profileDelete').addEventListener('click', showDeleteConfirm);
}

function showAuthForm() {
    authModalBody.innerHTML = `
        <div class="auth-form">
            <h2>${t('auth.login.title')}</h2>
            <div id="authError"></div>
            <form id="authForm">
                <div class="form-group">
                    <label for="authUser">${t('auth.username')}</label>
                    <input type="text" id="authUser" placeholder="${t('auth.username')}" required>
                </div>
                <div class="form-group">
                    <label for="authPass">${t('auth.password')}</label>
                    <div class="password-wrapper">
                        <input type="password" id="authPass" placeholder="${t('auth.password')}" required>
                        <button type="button" class="password-toggle" aria-label="Mostrar contraseña">👁</button>
                    </div>
                </div>
                <button type="submit" class="auth-submit">${t('auth.login_btn')}</button>
            </form>
            <div class="auth-toggle">
                ${t('auth.no_account')} <a id="authToggleLink">${t('auth.register_link')}</a>
            </div>
        </div>
    `;
    authModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    document.getElementById('authForm').addEventListener('submit', e => {
        e.preventDefault();
        const user = document.getElementById('authUser').value.trim();
        const pass = document.getElementById('authPass').value;
        const result = login(user, pass);
        if (result.ok) {
            authModal.classList.remove('active');
            document.body.style.overflow = '';
            updateAuthUI();
            updateFavButtons();
            renderFavorites();
            showToast('👋 ' + t('auth.login_btn') + ', ' + user + '!');
        } else {
            document.getElementById('authError').innerHTML = `<div class="auth-error">${result.error}</div>`;
        }
    });

    document.getElementById('authToggleLink').addEventListener('click', showRegisterForm);
}

function showRegisterForm() {
    authModalBody.innerHTML = `
        <div class="auth-form">
            <h2>${t('auth.register.title')}</h2>
            <div id="authError"></div>
            <form id="authForm">
                <div class="form-group">
                    <label for="authUser">${t('auth.username')}</label>
                    <input type="text" id="authUser" placeholder="${t('auth.username')}" required>
                </div>
                <div class="form-group">
                    <label for="authEmail">${t('auth.email')}</label>
                    <input type="email" id="authEmail" placeholder="${t('auth.email')}" required>
                </div>
                <div class="form-group">
                    <label for="authPass">${t('auth.password')}</label>
                    <div class="password-wrapper">
                        <input type="password" id="authPass" placeholder="${t('auth.password')}" required>
                        <button type="button" class="password-toggle" aria-label="Mostrar contraseña">👁</button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="authConfirm">${t('auth.confirm')}</label>
                    <div class="password-wrapper">
                        <input type="password" id="authConfirm" placeholder="${t('auth.confirm')}" required>
                        <button type="button" class="password-toggle" aria-label="Mostrar contraseña">👁</button>
                    </div>
                </div>
                <button type="submit" class="auth-submit">${t('auth.register_btn')}</button>
            </form>
            <div class="auth-toggle">
                ${t('auth.has_account')} <a id="authToggleLink">${t('auth.login_link')}</a>
            </div>
        </div>
    `;
    authModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    document.getElementById('authForm').addEventListener('submit', e => {
        e.preventDefault();
        const user = document.getElementById('authUser').value.trim();
        const email = document.getElementById('authEmail').value.trim();
        const pass = document.getElementById('authPass').value;
        const confirm = document.getElementById('authConfirm').value;
        if (pass !== confirm) {
            document.getElementById('authError').innerHTML = `<div class="auth-error">${t('auth.error_passwords')}</div>`;
            return;
        }
        const result = register(user, email, pass);
        if (result.ok) {
            login(user, pass);
            authModal.classList.remove('active');
            document.body.style.overflow = '';
            updateAuthUI();
            updateFavButtons();
            renderFavorites();
            showToast('🎉 ' + t('auth.register_btn') + ', ' + user + '!');
        } else {
            document.getElementById('authError').innerHTML = `<div class="auth-error">${result.error}</div>`;
        }
    });

    document.getElementById('authToggleLink').addEventListener('click', showAuthForm);
}
