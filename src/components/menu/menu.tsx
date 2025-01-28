import { UiChecks } from 'react-bootstrap-icons';
import styles from './menu.module.css';
import { NavLink } from 'react-router-dom';
import { ButtonAddUI } from '../ui/projectUI/projectUI';

export const UserMenu = () => (
  <div className={styles.containerMenu}>
    <ul className={styles.ul}>
      <li>
        <ButtonAddUI />
      </li>
      <NavLink
        to='/projects'
        className={({ isActive }) =>
          `${styles.active} ${isActive ? styles.link_active : ''}`
        }
      >
        <li className={styles.logo}>
          <div className={styles.projectPunckt}>
            <UiChecks size={16} />
            <p>Проекты</p>
          </div>
        </li>
      </NavLink>
    </ul>
  </div>
);
