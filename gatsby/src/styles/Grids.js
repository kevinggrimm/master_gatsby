import styled from 'styled-components';

export const HomePageGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(2, minmax(auto, 1fr));
`;

export const ItemsGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr;
`;

// Single grid item for home page
// height: auto will shape the image to the desired ratio
// font-size: 0 is intended for images with ghost space

// Linear gradient: start at grey, then at 40px go to white, then after 80px go back to grey
// Now we want to animate it
// need to write the shine animation (can put in own file if reusing)
// ANIMATION: Move where the background is positioned to (-40px)
// The -40px will put the shine off of the screen
export const ItemStyles = styled.div`
  text-align: center;
  position: relative;
  img {
    height: auto;
    font-size: 0;
  }
  p {
    transform: rotate(-2deg) translateY(-150%);
    position: absolute;
    width: 100%;
    left: 0;
  }
  .mark {
    display: inline;
  }
  @keyframes shine {
    from {
      background-position: 200%;
    }
    to {
      background-position: -40px;
    }
  }
  img.loading {
    --shine: white;
    --background: var(--grey);
    background-image: linear-gradient(
      90deg,
      var(--background) 0px,
      var(--shine) -40px,
      var(--background) 80px
    );
    background-size: 500px;
    animation: shine 1s infinite linear;
  }
`;
