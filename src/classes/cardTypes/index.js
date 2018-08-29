import serialise from 'serialijse';

import Container from './Container';
import Location from './Location';
import Project from './Project';

serialise.declarePersistable(Container);
serialise.declarePersistable(Location);
serialise.declarePersistable(Project);
