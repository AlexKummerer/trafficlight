import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import { Box, Button, Container } from "@mui/material";
import classNames from "classnames";
import { log } from "console";

export enum TrafficState {
  RED,
  YELLOWRED,
  YELLOW,
  GREEN,
}

export const mainTrafficStates: any = {
  red: {
    duration: 1000,
    next: "yellowRed",
    color: TrafficState.RED,
  },
  yellowRed: {
    duration: 9000,
    next: "green",
    color: TrafficState.YELLOWRED,
  },
  green: {
    duration: 2000,
    next: "yellow",
    color: TrafficState.GREEN,
  },
  yellow: {
    duration: 20000,
    next: "red",
    color: TrafficState.YELLOW,
  },
};

export const sideTrafficStates: any = {
  red: {
    duration: 1000,
    next: "yellowRed",
    color: TrafficState.RED,
  },
  yellowRed: {
    duration: 24000,
    next: "green",
    color: TrafficState.YELLOWRED,
  },
  green: {
    duration: 2000,
    next: "yellow",
    color: TrafficState.GREEN,
  },
  yellow: {
    duration: 5000,
    next: "red",
    color: TrafficState.YELLOW,
  },
};

export const pedestrationTrafficStates: any = {
  red: {
    duration: null,
    next: "green",
    color: TrafficState.RED,
  },
  green: {
    duration: 3000,
    next: "red",
    color: TrafficState.GREEN,
  },
};

const App = () => {
  const [mainCurrentColor, setMainCurrentColor] = useState(TrafficState.GREEN);
  const [nextMainState, setNextMainState] = useState("green");
  const [sideCurrentColor, setSideCurrentColor] = useState(TrafficState.RED);
  const [nextSideState, setNextSideState] = useState("red");
  const [pedestrationCurrentColor, setPedestrationCurrentColor] = useState(
    TrafficState.RED
  );
  const [nextPedestrationState, setNextPedestrationState] = useState("red");

  const [trafficDuration, setTrafficDuration] = useState<number | null>(null);

  useEffect(() => {
    const { duration, next, color } = mainTrafficStates[nextMainState];

    const timerId = setTimeout(
      () => {
        setMainCurrentColor(color);
        setNextMainState(next);
        setTrafficDuration(null);
      },
      trafficDuration ? trafficDuration : duration
    );

    return () => {
      clearTimeout(timerId);
    };
  }, [nextMainState, trafficDuration]);

  useEffect(() => {
    const { duration, next, color } = sideTrafficStates[nextSideState];
    // console.log(duration, color, next)
    const timerId = setTimeout(
      () => {
        setSideCurrentColor(color);
        setNextSideState(next);
        setTrafficDuration(null);
      },
      trafficDuration ? trafficDuration : duration
    );

    return () => {
      clearTimeout(timerId);
    };
  }, [nextSideState, trafficDuration]);

  useEffect(() => {
    const { duration, next, color } =
      pedestrationTrafficStates[nextPedestrationState];
    if (color === TrafficState.GREEN) {
      const timerId = setTimeout(() => {
        setPedestrationCurrentColor(color);
        setNextPedestrationState(next);
      }, duration);

      return () => {
        clearTimeout(timerId);
      };
    } else {
      setPedestrationCurrentColor(color);
    }
  }, [nextPedestrationState]);

  const handleSideStreet = () => {
    if (sideCurrentColor === TrafficState.RED) {
      setTrafficDuration(1000);
      setMainCurrentColor(TrafficState.YELLOW);
      setNextMainState("yellow");
      setSideCurrentColor(TrafficState.YELLOWRED);
      setNextSideState("yellowRed");
    }
  };

  const handlePedestration = () => {
    if (pedestrationCurrentColor === TrafficState.RED) {
      if (mainCurrentColor === TrafficState.GREEN) {
        setTrafficDuration(1000);
        setMainCurrentColor(TrafficState.YELLOW);
        setNextMainState("yellow");

        setTimeout(() => {
          setPedestrationCurrentColor(TrafficState.GREEN);
          setNextPedestrationState("green");
        }, 3000);
      }
    }
  };

  return (
    <>
      <Container className={styles.container}>
        <div className={styles.road}>
          <div className={styles["main-stopline--bottom"]}>
            <div
              className={classNames(
                styles["main-traffic-light"],
                styles["traffic-light-bottom"]
              )}
            >
              <div
                className={classNames(styles.bulb, styles.red, {
                  [styles.active]:
                    mainCurrentColor === TrafficState.RED ||
                    mainCurrentColor === TrafficState.YELLOWRED,
                })}
              />
              <div
                className={classNames(styles.bulb, styles.yellow, {
                  [styles.active]:
                    mainCurrentColor === TrafficState.YELLOW ||
                    mainCurrentColor === TrafficState.YELLOWRED,
                })}
              />
              <div
                className={classNames(styles.bulb, styles.green, {
                  [styles.active]: mainCurrentColor === TrafficState.GREEN,
                })}
              />
            </div>
          </div>
          <div className={styles["main-pedestrian"]}>
            <Button
              onClick={handlePedestration}
              className={styles["pedestrian-button"]}
            >
              {" "}
              Fußgängerüberweg{" "}
            </Button>

            <div
              className={classNames(
                styles["pedestrian-traffic-light"],
                styles["pedestrian-traffic-light-top"]
              )}
            >
              <div
                className={classNames(styles.bulb, styles.red, {
                  [styles.active]:
                    pedestrationCurrentColor === TrafficState.RED,
                })}
              />
              <div
                className={classNames(styles.bulb, styles.green, {
                  [styles.active]:
                    pedestrationCurrentColor === TrafficState.GREEN,
                })}
              />
            </div>

            <div
              className={classNames(
                styles["pedestrian-traffic-light"],
                styles["pedestrian-traffic-light-bottom"]
              )}
            >
              <div
                className={classNames(styles.bulb, styles.red, {
                  [styles.active]:
                    pedestrationCurrentColor === TrafficState.RED,
                })}
              />
              <div
                className={classNames(styles.bulb, styles.green, {
                  [styles.active]:
                    pedestrationCurrentColor === TrafficState.GREEN,
                })}
              />
            </div>
          </div>

          <div className={styles["main-stopline--top"]}>
            <div
              className={classNames(
                styles["main-traffic-light"],
                styles["traffic-light-top"]
              )}
            >
              <div
                className={classNames(styles.bulb, styles.red, {
                  [styles.active]:
                    mainCurrentColor === TrafficState.RED ||
                    mainCurrentColor === TrafficState.YELLOWRED,
                })}
              />
              <div
                className={classNames(styles.bulb, styles.yellow, {
                  [styles.active]:
                    mainCurrentColor === TrafficState.YELLOW ||
                    mainCurrentColor === TrafficState.YELLOWRED,
                })}
              />
              <div
                className={classNames(styles.bulb, styles.green, {
                  [styles.active]: mainCurrentColor === TrafficState.GREEN,
                })}
              />
            </div>
          </div>
        </div>
        <div className={styles.sideRoad}>
          <div className={styles["side-stopline"]}>
            <Button onClick={handleSideStreet}> Anfordern </Button>
            <div className={styles["side-traffic-light"]}>
              <div
                className={classNames(styles.bulb, styles.red, {
                  [styles.active]:
                    sideCurrentColor === TrafficState.RED ||
                    sideCurrentColor === TrafficState.YELLOWRED,
                })}
              />
              <div
                className={classNames(styles.bulb, styles.yellow, {
                  [styles.active]:
                    sideCurrentColor === TrafficState.YELLOW ||
                    sideCurrentColor === TrafficState.YELLOWRED,
                })}
              />
              <div
                className={classNames(styles.bulb, styles.green, {
                  [styles.active]: sideCurrentColor === TrafficState.GREEN,
                })}
              />
            </div>
          </div>
        </div>
      </Container>

      {"Main Traffic Light"}
      <Box className={styles.TrafficLight}>
        <div
          className={classNames(styles.bulb, styles.red, {
            [styles.active]:
              mainCurrentColor === TrafficState.RED ||
              mainCurrentColor === TrafficState.YELLOWRED,
          })}
        />
        <div
          className={classNames(styles.bulb, styles.yellow, {
            [styles.active]:
              mainCurrentColor === TrafficState.YELLOW ||
              mainCurrentColor === TrafficState.YELLOWRED,
          })}
        />
        <div
          className={classNames(styles.bulb, styles.green, {
            [styles.active]: mainCurrentColor === TrafficState.GREEN,
          })}
        />
      </Box>
      {"Side Traffic Light"}
      <Box className={styles.TrafficLight}>
        <div
          className={classNames(styles.bulb, styles.red, {
            [styles.active]:
              sideCurrentColor === TrafficState.RED ||
              sideCurrentColor === TrafficState.YELLOWRED,
          })}
        />
        <div
          className={classNames(styles.bulb, styles.yellow, {
            [styles.active]:
              sideCurrentColor === TrafficState.YELLOW ||
              sideCurrentColor === TrafficState.YELLOWRED,
          })}
        />
        <div
          className={classNames(styles.bulb, styles.green, {
            [styles.active]: sideCurrentColor === TrafficState.GREEN,
          })}
        />
      </Box>
    </>
  );
};

export default App;
