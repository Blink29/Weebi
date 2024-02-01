import { useParams } from "react-router-dom";
import "./stream.scss";
import { useEffect, useState } from "react";

const StreamingPage = ({ animeList }) => {
  const { animeTitleEp } = useParams();
  const [currentAnime, setCurrentAnime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [epsiodeNumber, setEpisodeNumber] = useState(1);
  const [iframe, setIframe] = useState(null);

  useEffect(() => {
    const get_currentAnime = async () => {
      const response = await animeList.find(
        (anime) =>
          anime.episode_player_links[anime.episode_player_links.length - 1]
            .episode_num === animeTitleEp
      );
      setCurrentAnime(response);
    };

    get_currentAnime();
  }, [animeList, animeTitleEp]);

  useEffect(() => {
    if (currentAnime) {
      setIframe(
        currentAnime.episode_player_links[
          currentAnime.episode_player_links.length - 1
        ].iframe_link
      );
      setIsLoading(false);
    }
  }, [currentAnime]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleChangeEpisode = (e) => {
    const new_iframe = currentAnime.episode_player_links.find((episode) => (episode.episode_num.split("-").pop() == e)).iframe_link
    setIframe(new_iframe);
  };

  return (
    <div className="streaming-page">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="ep-list">
            {currentAnime.episode_player_links.map((episode) => (
              <div
                onClick={() => handleChangeEpisode(episode.episode_num.split("-").pop())}
                key={episode.episode_num}
              >{`Episode ${episode.episode_num.split("-").pop()}`}</div>
            ))}
          </div>
          <div className="streaming-screen">
            <iframe
              title={`Episode 1`}
              src={iframe}
              width="100%"
              height="100%"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default StreamingPage;
