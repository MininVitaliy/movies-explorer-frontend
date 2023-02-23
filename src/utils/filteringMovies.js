export default function filteringMovies (movies, name, additionalFilter) {
    let nameGood = name.toLowerCase();
    let filteredName = movies.filter(function (movie) {
      let info = movie.nameRU.toLowerCase();
      if (info.indexOf(nameGood) > -1) {
        return movie
      }
    });
    return filteredName.filter(function (movie) {
      if (additionalFilter) {
        return movie.duration < 40
      } else {
        return movie.duration > 40
      }
    });
}