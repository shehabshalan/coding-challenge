const durationFormat = (duration) => {
  var m = Math.floor((duration % 3600) / 60)
    .toString()
    .padStart(2, "0");
  var s = Math.floor(duration % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

export default durationFormat;
