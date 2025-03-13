'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let activState = { ...state };

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      Object.assign(activState, obj.extraData);
      stateHistory.push({ ...activState });
    }

    if (obj.type === 'clear') {
      activState = {};
      stateHistory.push({ ...activState });
    }

    if (obj.type === 'removeProperties') {
      for (const key of obj.keysToRemove) {
        delete activState[key];
      }

      stateHistory.push({ ...activState });
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
