import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import classNames               from 'classnames/bind';

const cx = classNames.bind(styles);

const LoaderComponent = ( props ) => {
    const { small, big, row, full } = props;
    return (
        <div className={cx({
            [styles.row]: row,
            [styles.full]: full,
        })}>
            <svg
                className={cx(styles.loader, {
                    [styles.big]: big,
                    [styles.small]: small,
                })}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
            >
                <circle cx="85" cy="50" r={styles.radius} fill={`${styles.color1}`}>
                    <animate attributeName="cx" values="85;50" keyTimes="0;1" dur={styles.time} repeatCount="indefinite" />
                    <animate attributeName="cy" values="50;85" keyTimes="0;1" dur={styles.time} repeatCount="indefinite" />
                    <animate attributeName="fill" values={`${styles.color1};${styles.color2}`} keyTimes="0;1" dur={styles.time}
                             repeatCount="indefinite" />
                </circle>
                <circle cx="50" cy="85" r={styles.radius} fill={`${styles.color2}`}>
                    <animate attributeName="cx" values="50;15" keyTimes="0;1" dur={styles.time} repeatCount="indefinite" />
                    <animate attributeName="cy" values="85;50" keyTimes="0;1" dur={styles.time} repeatCount="indefinite" />
                    <animate attributeName="fill" values={`${styles.color2};${styles.color3}`} keyTimes="0;1" dur={styles.time}
                             repeatCount="indefinite" />
                </circle>
                <circle cx="15" cy="50" r={styles.radius} fill={`${styles.color3}`}>
                    <animate attributeName="cx" values="15;50" keyTimes="0;1" dur={styles.time} repeatCount="indefinite" />
                    <animate attributeName="cy" values="50;15" keyTimes="0;1" dur={styles.time} repeatCount="indefinite" />
                    <animate attributeName="fill" values={`${styles.color3};${styles.color4}`} keyTimes="0;1" dur={styles.time}
                             repeatCount="indefinite" />
                </circle>
                <circle cx="50" cy="15" r={styles.radius} fill={`${styles.color4}`}>
                    <animate attributeName="cx" values="50;85" keyTimes="0;1" dur={styles.time} repeatCount="indefinite" />
                    <animate attributeName="cy" values="15;50" keyTimes="0;1" dur={styles.time} repeatCount="indefinite" />
                    <animate attributeName="fill" values={`${styles.color4};${styles.color1}`} keyTimes="0;1" dur={styles.time}
                             repeatCount="indefinite" />
                </circle>
            </svg>
        </div>
    );
};

LoaderComponent.propTypes = {
    small: PropTypes.bool,
    big: PropTypes.bool,
    row: PropTypes.bool,
    full: PropTypes.bool,
};

export default LoaderComponent;
