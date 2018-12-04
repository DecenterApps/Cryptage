import serialise from 'serialijse';

import Container from './Container';
import Location from './Location';
import Project from './Project';
import Miner from './Miner';

serialise.declarePersistable(Container);
serialise.declarePersistable(Location);
serialise.declarePersistable(Project);
serialise.declarePersistable(Miner);
