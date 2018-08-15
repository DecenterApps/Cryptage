import ConfirmRemoveModal from './ConfirmRemoveModal/ConfirmRemoveModal';
import NewLevelModal from './NewLevelModal/NewLevelModal';
import RevealBoosterCardsModal from './RevealBoosterCardsModal/RevealBoosterCardsModal';
import NoRestartProjectModal from './NoRestartProjectModal/NoRestartProjectModal';
import ErrorModal from './ErrorModal/ErrorModal';
import MenuModal from './MenuModal/MenuModal';
import MetamaskModal from './MetamaskModal/MetamaskModal';

// Register modal types here
export const CONFIRM_REMOVE_MODAL = 'confirm_remove_modal';
export const NEW_LEVEL_MODAL = 'new_level_modal';
export const REVEAL_BOOSTER_CARDS_MODAL = 'reveal_booster_cards_modal';
export const NO_RESTART_PROJECT_MODAL = 'no_restart_project_modal';
export const ERROR_MODAL = 'error_modal';
export const MENU_MODAL = 'menu_modal';
export const METAMASK_MODAL = 'metamask_modal';

export default {
  [CONFIRM_REMOVE_MODAL]: ConfirmRemoveModal,
  [NEW_LEVEL_MODAL]: NewLevelModal,
  [REVEAL_BOOSTER_CARDS_MODAL]: RevealBoosterCardsModal,
  [NO_RESTART_PROJECT_MODAL]: NoRestartProjectModal,
  [ERROR_MODAL]: ErrorModal,
  [MENU_MODAL]: MenuModal,
  [METAMASK_MODAL]: MetamaskModal,
};
