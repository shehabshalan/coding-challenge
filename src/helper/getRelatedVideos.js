const getRelatedVideos = (allVideos, currentVideo) => {
  const relatedVideos = allVideos.filter((v) => {
    return v.category === currentVideo.category && v.id !== currentVideo.id;
  });
  if (relatedVideos.length > 3) {
    const shuffled = relatedVideos.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }
  return relatedVideos;
};

export default getRelatedVideos;
