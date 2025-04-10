import { useSelector } from 'react-redux';
import { getAlerts } from '../../service/slices/alerts.slice';
import { Alert } from '.';

export const AlertList = () => {
  const alerts = useSelector(getAlerts);

  return (
    <div>
      {alerts
        .filter((alert) => alert.isVisible)
        .map((alert) => (
          <Alert
            key={alert.id}
            id={alert.id}
            header={alert.header}
            text={alert.text}
            type={alert.type}
            time={alert.time}
          />
        ))}
    </div>
  );
};
