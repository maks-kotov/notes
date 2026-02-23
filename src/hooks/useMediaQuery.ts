import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  // query - это условие, например '(max-width: 700px)'
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Создаём медиа-запрос
    const media = window.matchMedia(query);

    // Устанавливаем начальное значение
    setMatches(media.matches);

    // Функция, которая будет вызываться при изменении размера экрана
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Подписываемся на изменения
    media.addEventListener("change", listener);

    // Отписываемся при размонтировании компонента
    return () => media.removeEventListener("change", listener);
  }, [query]); // Перезапускаем эффект, если изменился query

  return matches; // true или false
}
