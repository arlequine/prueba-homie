import React, { useRef, useState, useEffect } from "react";

export default function Carousel({ children, focus = 0, leftPadding = 0, component = "div" }) {
  // definimos nuestros estados
  const [x, setX] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  // creamos refs para guardar valores que necesitamos guardar entre renders
  // pero que no se usan en la UI (no son estado)
  const $carousel = useRef(null);
  const sizes = useRef(null);
  const currentFocus = useRef(focus);

  useEffect(() => {
    // cada vez que cambio focus vamos a llamar a la función move
    move(focus - currentFocus.current);
    // y guardamos el nuevo foco
    currentFocus.current = focus;
  }, [focus]);

  function calculateSizes() {
    // obtenemos la lista de elementos del DOM de los children
    const children = $carousel.current.children;
    // obtenemos el width del elemento que representa nuestro carrusel
    const pageWidth = $carousel.current.clientWidth;

    const { elements } = Array.from(children) // convertimos a un array
      .map((child) => child.getBoundingClientRect()) // obtenemos su posición en x/y y su tamaño en width/heigh
      .map(({ x, width }) => ({
        start: x, // guardamos x como start
        width, // guardamos el width
        end: x + width, // calculamos donde termina el elemento sumando x y width
      }))
      .reduce(
        (result, { end, start, width }) => {
          // calculamos la paǵina (abajo vamos a ver la explicación)
          const page = Math.ceil((end + result.rest + leftPadding) / pageWidth);

          // devolvemos el resto de la página, la última página calculada y la lista de elementos con su página
          return {
            lastPage: result.lastPage !== page ? page : result.lastPage,
            elements: result.elements.concat({ width, start, end, page }),
            rest:
              result.lastPage !== page
                ? pageWidth * result.lastPage - start
                : result.rest,
          };
        },
        { rest: 0, lastPage: 1, elements: [] } // empezamos el reduce con resto 0, página 1 y sin elementos
      );

    // devolvemos la lista de elementos
    return elements;
  }

  function move(direction = 0) {
    // obtenemos los tamaños de todos los elementos la primera vez
    // o los traemos de los que ya calculamos en this.sizes.
    sizes.current = sizes.current || calculateSizes();
    // obtenemos la página a la que pertenece el nuevo elemento
    const { page } = sizes.current[focus];
    // si la página no cambió no hacemos nada
    if (currentPage === page) return;
    // obtenemos el punto de inicio del primer elemento de la página
    const { start } = sizes.current.find((element) => element.page === page);
    // actualizamos el estado
    setCurrentPage(page);
    setX(start - leftPadding < 0 ? 0 : start - leftPadding);
  }

  // armamos nuestro objeto con los estilos que vamos a aplicar para mover el carrusel
  const style = {
    transition: "transform 200ms linear", // agregamos una transición de 200ms linear a la propiedad transform
    transform: `translateX(-${x}px)`, // aplicamos un translateX en base a un valor del state llamado x
  };

  const Component = component;
  return (
    <Component
      ref={$carousel}
      children={children}
      style={style} // nuestro componente custom debe soportar un prop `style` para aplicar estilos inline */}
    />
  );
}
