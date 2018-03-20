import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleProjectDrop } from '../../actions/gameplayActions';
import DropSlotsWrapper from '../DropSlotsWrapper/DropSlotsWrapper';
import ProjectItem from '../ProjectItem/ProjectItem';

import './Projects.scss';

const Projects = ({ projects, handleProjectDrop }) => (
  <div className="projects-wrapper">
    Projects
    <div className="active-projects-wrapper">
      <DropSlotsWrapper
        dropSlots={projects}
        onItemDrop={handleProjectDrop}
        element={<ProjectItem />}
        mainClass="projects-slots-wrapper"
      />
    </div>
  </div>
);

Projects.propTypes = {
  projects: PropTypes.array.isRequired,
  handleProjectDrop: PropTypes.func.isRequired,
};

const mapStateToProps = ({ gameplay }) => ({
  projects: gameplay.projects,
  activeLocationIndex: gameplay.activeLocationIndex,
});

const mapDispatchToProp = {
  handleProjectDrop,
};

export default connect(mapStateToProps, mapDispatchToProp)(Projects);
