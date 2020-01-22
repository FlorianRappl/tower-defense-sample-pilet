import './style.scss';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { PiletApi } from 'sample-piral';

const TowerDefense = React.lazy(() => import('./TowerDefense'));

export function setup(app: PiletApi) {
  const path = '/tower-defense';

  app.registerMenu(() => <Link to={path}>Tower Defense</Link>);

  app.registerTile(
    () => (
      <Link to={path} className="tower-defense-tile">
        Tower Defense
      </Link>
    ),
    {
      initialColumns: 2,
      initialRows: 2,
    },
  );

  app.registerPage(path, TowerDefense);
}
