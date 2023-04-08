import { combineReducers } from 'redux';
import modal from 'modules/modal';
import milestoneBlock from './milestoneBlock';
import projectSetting from './projectSetting';

const rootReducer = combineReducers({
  modal,
  milestoneBlock,
  projectSetting,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;