import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleProjectDrop } from '../../actions/dropActions';
import DropSlotsWrapper from '../DropSlotsWrapper/DropSlotsWrapper';
import ProjectItem from '../ProjectItem/ProjectItem';
import EmptyProjectSlot from '../EmptyProjectSlot/EmptyProjectSlot';
import Menu from '../Menu/Menu';
import HeaderLine from '../Decorative/HeaderLine';

import './Projects.scss';

const Projects = ({ projects, handleProjectDrop }) => (
  <div className="projects-wrapper">
    <Menu />

    <div className="projects-header">
      <div className="bar-wrapper">
        <HeaderLine />
        <div className="section-header-main-text">Projects</div>
        <div className="section-header-sub-text">Summary</div>
      </div>
    </div>

    <div className="active-projects-wrapper">
      <DropSlotsWrapper
        dropSlots={projects}
        onItemDrop={handleProjectDrop}
        element={<ProjectItem />}
        emptyStateElem={<EmptyProjectSlot />}
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
