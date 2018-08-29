import serialise from 'serialijse';

import LocationCardSlot from './LocationCardSlot';
import ProjectCardSlot from './ProjectCardSlot';

serialise.declarePersistable(LocationCardSlot);
serialise.declarePersistable(ProjectCardSlot);
