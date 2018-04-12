import ConfirmRemoveModal from './ConfirmRemoveModal/ConfirmRemoveModal';
import NewLevelModal from './NewLevelModal/NewLevelModal';
import RevealBoosterCardsModal from './RevealBoosterCardsModal/RevealBoosterCardsModal';

// Register modal types here
export const CONFIRM_REMOVE_MODAL = 'confirm_remove_modal';
export const NEW_LEVEL_MODAL = 'new_level_modal';
export const REVEAL_BOOSTER_CARDS_MODAL = 'reveal_booster_cards_modal';

export default {
  [CONFIRM_REMOVE_MODAL]: ConfirmRemoveModal,
  [NEW_LEVEL_MODAL]: NewLevelModal,
  [REVEAL_BOOSTER_CARDS_MODAL]: RevealBoosterCardsModal,
};
