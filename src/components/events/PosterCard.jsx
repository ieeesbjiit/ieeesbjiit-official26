import { useState } from "react";

import {
  FaRegHeart,
  FaHeart,
  FaRegComment,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";

import { FiSend } from "react-icons/fi";

import ieeeLogo from "../../assets/ieee_logo.jpeg";

const PosterCard = ({ event, center = false }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div
      className={`instagram-post ${
        center ? "center-post" : "side-post"
      }`}
    >

      {/* HEADER */}

      <div className="frame-header">

        <div className="profile">

          <img
            src={ieeeLogo}
            alt="IEEE SB JIIT"
            className="profile-pic"
          />

          <div className="profile-info">
            <h4>IEEE SB JIIT</h4>

            <span>
              @ieeesbjiit
            </span>
          </div>

        </div>

        <span className="menu">
          •••
        </span>

      </div>


      {/* POSTER AREA */}

     <div
        className="poster-window"
        onClick={() => {
          if (event.instagramLink) {
            window.open(
              event.instagramLink,
              "_blank",
              "noopener,noreferrer"
            );
          }
        }}
      >

          {center ? (

            /* CENTER → DIRECT POSTER */

            <img
              src={event.image}
              alt={event.title}
              className="event-poster center-direct-poster"
            />

          ) : (

            /* LEFT + RIGHT → HOVER */

            <>
              <div className="event-preview-content">

                <span className="preview-label">
                  IEEE EVENT
                </span>

                <h2>
                  {event.title}
                </h2>

                <p>
                  {event.description}
                </p>

                <span className="hover-text">
                  HOVER TO EXPLORE
                </span>

              </div>

              <img
                src={event.image}
                alt={event.title}
                className="hover-poster"
              />
            </>

          )}

        </div>

      {/* FOOTER */}

      <div className="frame-footer">

        <div className="footer-icons">

          {liked ? (

            <FaHeart
              className="liked-icon"
              onClick={() => setLiked(false)}
            />

          ) : (

            <FaRegHeart
              onClick={() => setLiked(true)}
            />

          )}

          <FaRegComment />

          <FiSend />

        </div>


        {saved ? (

          <FaBookmark
            onClick={() => setSaved(false)}
          />

        ) : (

          <FaRegBookmark
            onClick={() => setSaved(true)}
          />

        )}

      </div>


      {/* CAPTION */}

      <div className="post-caption">

        <strong>
          {event.title}
        </strong>

        <span>
          {event.description}
        </span>

      </div>

    </div>
  );
};

export default PosterCard;