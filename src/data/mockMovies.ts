export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path?: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  genre_ids?: number[];
}

export const mockMoviesData: { results: Movie[] } = {
  results: [
    {
      id: 278,
      title: "The Shawshank Redemption",
      overview:
        "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden.",
      poster_path:
        "https://image.tmdb.org/t/p/w500/9cqNxxWXNDZVIGhimEBV0xO1HIn.jpg",
      backdrop_path:
        "https://image.tmdb.org/t/p/w500/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
      release_date: "1994-09-23",
      vote_average: 8.7,
      popularity: 139.117,
      genre_ids: [18, 80],
    },
    {
      id: 238,
      title: "The Godfather",
      overview:
        "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
      poster_path:
        "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      backdrop_path:
        "https://image.tmdb.org/t/p/w500/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
      release_date: "1972-03-14",
      vote_average: 8.7,
      popularity: 138.834,
      genre_ids: [18, 80],
    },
    {
      id: 240,
      title: "The Godfather Part II",
      overview:
        "In the continuing saga of the Corleone crime family, a young Vito Corleone grows up in Sicily and in 1910s New York.",
      poster_path:
        "https://image.tmdb.org/t/p/w500/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg",
      backdrop_path:
        "https://image.tmdb.org/t/p/w500/kGzFbGhp99zva6oZOUW5SqO8hEe.jpg",
      release_date: "1974-12-20",
      vote_average: 8.6,
      popularity: 81.332,
      genre_ids: [18, 80],
    },
    {
      id: 424,
      title: "Schindler's List",
      overview:
        "The true story of how businessman Oskar Schindler saved over a thousand Jewish lives from the Nazis while they worked as slaves in his factory during World War II.",
      poster_path:
        "https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
      backdrop_path:
        "https://image.tmdb.org/t/p/w500/zb6fM1CX41D9rF9hdgclu0peUmy.jpg",
      release_date: "1993-12-15",
      vote_average: 8.5,
      popularity: 84.887,
      genre_ids: [18, 36, 10752],
    },
    {
      id: 155,
      title: "The Dark Knight",
      overview:
        "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
      poster_path:
        "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      backdrop_path:
        "https://image.tmdb.org/t/p/w500/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
      release_date: "2008-07-16",
      vote_average: 8.5,
      popularity: 121.284,
      genre_ids: [18, 28, 80, 53],
    },
    {
      id: 122,
      title: "The Lord of the Rings: The Return of the King",
      overview:
        "Aragorn is revealed as the heir to the ancient kings as he, Gandalf and the other members of the broken fellowship struggle to save Gondor from Sauron's forces. Meanwhile, Frodo and Sam take the ring closer to the heart of Mordor, the dark lord's realm.",
      poster_path:
        "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5OUpcDPz.jpg",
      backdrop_path:
        "https://image.tmdb.org/t/p/w500/lXhgNSYwEUZfqpXf060u5C50H8c.jpg",
      release_date: "2003-12-01",
      vote_average: 8.5,
      popularity: 133.256,
      genre_ids: [12, 14, 28],
    },
  ],
};
