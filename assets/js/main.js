/* =========================================================
   DECONOVA S&D
   JAVASCRIPT WEB CORPORATIVA
   ========================================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       MENÚ MÓVIL
       ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");


    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                mainNav.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        });


        const navLinks =
            mainNav.querySelectorAll("a");


        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       AÑO DEL FOOTER
       ===================================================== */

    const currentYear =
        document.getElementById("currentYear");


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =========================================================
   FORMULARIO DE CONTACTO
   ========================================================= */

    const contactForm =
        document.getElementById("contactForm");

    const formMessage =
        document.getElementById("formMessage");

    const submitButton =
        document.getElementById("submitButton");

    const submitText =
        document.getElementById("submitText");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async (event) => {

                /*
                * Evitamos que el navegador recargue
                * la página.
                */

                event.preventDefault();


                /*
                * Evitamos múltiples envíos
                * mientras se procesa la solicitud.
                */

                if (submitButton) {

                    submitButton.disabled = true;

                }


                if (submitText) {

                    submitText.textContent =
                        "Enviando...";

                }


                if (formMessage) {

                    formMessage.textContent = "";

                    formMessage.classList.remove(
                        "success",
                        "error"
                    );

                }


                /*
                * FormData obtiene automáticamente
                * todos los campos del formulario.
                */

                const formData =
                    new FormData(contactForm);


                try {

                    /*
                    * Enviamos los datos al servicio
                    * configurado en el atributo action
                    * del formulario.
                    */

                    const response =
                        await fetch(
                            contactForm.action,
                            {
                                method: "POST",

                                body: formData,

                                headers: {
                                    "Accept":
                                        "application/json"
                                }
                            }
                        );


                    /*
                    * Si el servidor responde correctamente.
                    */

                    if (response.ok) {

                        if (formMessage) {

                            formMessage.textContent =
                                "¡Gracias por escribirnos! Hemos recibido tu mensaje y pronto nos pondremos en contacto contigo.";

                            formMessage.classList.add(
                                "success"
                            );

                        }


                        /*
                        * Limpiamos el formulario
                        * después de enviarlo.
                        */

                        contactForm.reset();


                    } else {

                        throw new Error(
                            "No fue posible enviar el formulario."
                        );

                    }


                } catch (error) {

                    console.error(
                        "Error al enviar formulario:",
                        error
                    );


                    if (formMessage) {

                        formMessage.textContent =
                            "No pudimos enviar tu mensaje. Por favor intenta nuevamente o contáctanos directamente por WhatsApp.";

                        formMessage.classList.add(
                            "error"
                        );

                    }

                } finally {

                    /*
                    * Volvemos a habilitar el botón.
                    */

                    if (submitButton) {

                        submitButton.disabled = false;

                    }


                    if (submitText) {

                        submitText.textContent =
                            "Enviar mensaje";

                    }

                }

            }
        );

    }

    /* =====================================================
       SLIDER DE PRODUCTOS
       ===================================================== */

    const slider =
        document.getElementById("productsSlider");

    const previousButton =
        document.getElementById("prevProduct");

    const nextButton =
        document.getElementById("nextProduct");


    if (
        slider &&
        previousButton &&
        nextButton
    ) {

        /* Botón anterior */

        previousButton.addEventListener(
            "click",
            () => {

                slider.scrollBy({
                    left: -390,
                    behavior: "smooth"
                });

            }
        );


        /* Botón siguiente */

        nextButton.addEventListener(
            "click",
            () => {

                slider.scrollBy({
                    left: 390,
                    behavior: "smooth"
                });

            }
        );


        /* =================================================
           ARRASTRAR SLIDER CON MOUSE
           ================================================= */

        let isDragging = false;

        let startX = 0;

        let scrollLeft = 0;


        slider.addEventListener(
            "mousedown",
            (event) => {

                isDragging = true;

                slider.classList.add("dragging");

                startX =
                    event.pageX -
                    slider.offsetLeft;

                scrollLeft =
                    slider.scrollLeft;

            }
        );


        slider.addEventListener(
            "mouseleave",
            () => {

                isDragging = false;

                slider.classList.remove(
                    "dragging"
                );

            }
        );


        slider.addEventListener(
            "mouseup",
            () => {

                isDragging = false;

                slider.classList.remove(
                    "dragging"
                );

            }
        );


        slider.addEventListener(
            "mousemove",
            (event) => {

                if (!isDragging) {
                    return;
                }

                event.preventDefault();


                const x =
                    event.pageX -
                    slider.offsetLeft;


                const walk =
                    (x - startX) * 1.5;


                slider.scrollLeft =
                    scrollLeft - walk;

            }
        );

    }


    /* =====================================================
       NAVEGACIÓN ACTIVA
       ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navigationLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    if (sections.length > 0) {

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                navigationLinks
                                    .forEach((link) => {

                                        link.classList.remove(
                                            "active"
                                        );

                                    });


                                const activeLink =
                                    document.querySelector(
                                        `.nav-link[href="#${entry.target.id}"]`
                                    );


                                if (activeLink) {

                                    activeLink.classList.add(
                                        "active"
                                    );

                                }

                            }

                        }
                    );

                },
                {
                    threshold: 0.3
                }
            );


        sections.forEach((section) => {

            observer.observe(section);

        });

    }


    /* =====================================================
       GALERÍA / MODAL DE PRODUCTOS
       ===================================================== */

    const productModal =
        document.getElementById("productModal");

    const modalClose =
        document.getElementById("modalClose");

    const modalOverlay =
        document.querySelector(
            ".product-modal-overlay"
        );

    const modalTitle =
        document.getElementById(
            "modalProductTitle"
        );

    const modalNumber =
        document.getElementById(
            "modalProductNumber"
        );

    const modalDescription =
        document.getElementById(
            "modalProductDescription"
        );

    const modalGallery =
        document.getElementById(
            "modalGallery"
        );


    /*
       Todas las tarjetas que pueden abrir
       una galería.
    */

    const productCards =
        document.querySelectorAll(
            ".product-card[data-product]"
        );


    /*
       Información de cada categoría.

       Las rutas de las imágenes coinciden
       con la estructura de carpetas que
       creaste en VS Code.
    */

    const productData = {

        cocinas: {

            number: "01",

            title: "Cocinas",

            description:
                "Diseños personalizados que combinan funcionalidad, estética y aprovechamiento del espacio.",

            folder:
                "assets/images/productos/cocinas/",

            imageCount: 3

        },


        closets: {

            number: "02",

            title: "Closets",

            description:
                "Soluciones de almacenamiento diseñadas para adaptarse a las dimensiones y necesidades de cada espacio.",

            folder:
                "assets/images/productos/closets/",

            imageCount: 4

        },


        escritorios: {

            number: "03",

            title: "Escritorios",

            description:
                "Espacios de trabajo diseñados para combinar comodidad, organización y estética.",

            folder:
                "assets/images/productos/escritorios/",

            imageCount: 1

        },


        tocadores: {

            number: "04",

            title: "Tocadores",

            description:
                "Soluciones a medida que integran espejo, almacenamiento e iluminación en un espacio elegante y funcional.",

            folder:
                "assets/images/productos/tocadores/",

            imageCount: 1

        },

        PVCWPC: {

            number: "04",

            title: "Instalación de PVC/WPC",

            description:
                "Recubrimientos resistentes y de bajo mantenimiento, pensados para renovar tus espacios con estética, durabilidad y practicidad.",

            folder:
                "assets/images/productos/PVC-WPC/",

            imageCount: 4

        }

    };


    /*
       Variable donde guardamos la posición
       exacta del slider antes de abrir
       el modal.
    */

    let savedSliderPosition = 0;


    /*
       Abrir modal
    */

    function openProductModal(productKey) {

        const product =
            productData[productKey];


        if (!product || !productModal) {
            return;
        }


        /*
           Guardamos la posición actual del slider.

           Ejemplo:

           scrollLeft = 720

           Cuando cerremos el modal,
           volveremos exactamente a 720.
        */

        if (slider) {

            savedSliderPosition =
                slider.scrollLeft;

        }


        /* Actualizar información */

        modalNumber.textContent =
            product.number;

        modalTitle.textContent =
            product.title;

        modalDescription.textContent =
            product.description;


        /*
           Limpiar la galería anterior.
        */

        modalGallery.innerHTML = "";


        /*
           Crear las imágenes correspondientes
           a la categoría seleccionada.
        */

        for (
            let i = 1;
            i <= product.imageCount;
            i++
        ) {

            const galleryItem =
                document.createElement("div");


            galleryItem.className =
                "modal-gallery-item";


            const image =
                document.createElement("img");


            image.src =
                `${product.folder}${i}.jpeg`;


            image.alt =
                `${product.title} DECONOVA - proyecto ${i}`;


            image.loading =
                i === 1
                    ? "eager"
                    : "lazy";


            /*
               Si la imagen todavía no existe,
               mostramos un placeholder.
            */

            image.addEventListener(
                "error",
                () => {

                    image.style.display =
                        "none";


                    const placeholder =
                        document.createElement("div");


                    placeholder.className =
                        "modal-image-placeholder";


                    placeholder.textContent =
                        `${product.title} · Imagen ${i}`;


                    galleryItem.appendChild(
                        placeholder
                    );

                }
            );


            galleryItem.appendChild(
                image
            );


            modalGallery.appendChild(
                galleryItem
            );

        }


        /*
           Mostrar modal.
        */

        productModal.classList.add(
            "open"
        );


        productModal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "modal-open"
        );


        /*
           Llevar el foco al botón X.
           Esto mejora la accesibilidad
           especialmente con teclado.
        */

        if (modalClose) {

            setTimeout(() => {

                modalClose.focus();

            }, 50);

        }

    }


    /*
       Cerrar modal
    */

    function closeProductModal() {

        if (!productModal) {
            return;
        }


        productModal.classList.remove(
            "open"
        );


        productModal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "modal-open"
        );


        /*
           MUY IMPORTANTE:

           Restauramos exactamente la posición
           horizontal que tenía el slider.

           No usamos scrollTo inmediatamente
           porque la animación del cierre podría
           interferir.

           requestAnimationFrame espera a que el
           navegador termine de actualizar la vista.
        */

        if (slider) {

            requestAnimationFrame(() => {

                slider.scrollLeft =
                    savedSliderPosition;

            });

        }

    }


    /*
       Click en las tarjetas
    */

    productCards.forEach((card) => {

        card.addEventListener(
            "click",
            (event) => {

                /*
                   Si el usuario está seleccionando
                   texto dentro de la tarjeta no
                   necesitamos abrir la galería.
                */

                const productKey =
                    card.dataset.product;


                openProductModal(
                    productKey
                );

            }
        );


        /*
           También permitimos abrir el modal
           utilizando Enter o barra espaciadora.
        */

        card.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();


                    const productKey =
                        card.dataset.product;


                    openProductModal(
                        productKey
                    );

                }

            }
        );

    });


    /*
       Botón X
    */

    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeProductModal
        );

    }


    /*
       También cerramos haciendo click
       sobre el fondo oscuro.
    */

    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            closeProductModal
        );

    }


    /*
       Tecla ESC para cerrar.
    */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                productModal &&
                productModal.classList.contains("open")
            ) {

                closeProductModal();

            }

        }
    );

});