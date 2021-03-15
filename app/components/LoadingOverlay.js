import React from 'react';
import styles from './LoadingOverlay.module.css';

type Props = {
  loading?: boolean,
  children: ReactElement[]
};

export default function LoadingOverlay({ loading, children }: Props): ReactElement {
  return (
    <div className={styles.container}>
      {loading && <div className={styles.overlay} />}
      {children}
    </div>
  );
}

LoadingOverlay.defaultProps = {
  loading: false
};
