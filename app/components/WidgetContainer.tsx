import classNames from 'classnames';
import styles from './WidgetContainer.module.scss';

import { PropsWithChildren, ReactElement } from 'react';

interface Props extends PropsWithChildren {
  label: string;
  useGrid?: boolean;
}

const WidgetContainer = ({ children, label, useGrid = false }: Props): ReactElement => (
  <div>
    <div className={styles.widgetLabel}>{label}</div>
    <div className={classNames(styles.container, {
      [styles.wrap!]: useGrid
    })}>
      {children}
    </div>
  </div>
)

export default WidgetContainer;
