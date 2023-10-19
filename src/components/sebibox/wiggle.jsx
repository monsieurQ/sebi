
import { animated, useSpring } from 'react-spring';
import React, { ReactNode } from 'react';

// interface Props {
//   rotation?:number
//   timing?:number
//   children:ReactNode
// }

export const Wiggle = ({ rotation = 0, translate=0, timing = 150, children }) => {
    const [isBooped, setIsBooped] = React.useState(false);

    const style = useSpring({
        display: 'inline-block',
        backfaceVisibility: 'hidden',
        transform: isBooped
          ? `rotate(${rotation}deg)`
          : `rotate(0deg)`,
        // translate: isBooped
        //   ? `-${translate}px`
        //   : "0px",
        config: {
          tension: 300,
          friction: 10,
        },
      });

    React.useEffect(() => {
      if (!isBooped) {
        return;
      }

      const timeoutId = window.setTimeout(() => {
        setIsBooped(false);
      }, timing);

      return () => {
        window.clearTimeout(timeoutId);
      }

    }, [isBooped, timing]);

    const trigger = () => {
      setIsBooped(true);
    };

    return (
      <animated.span onMouseEnter={trigger} style={style}>
        {children}
      </animated.span>
    );
  };
  