const getUnsplashURL = (id: string, width: number = 480): string =>
  `https://images.unsplash.com/${id}?w=${width}&q=80&auto=format&fit=crop`;

export { getUnsplashURL };
