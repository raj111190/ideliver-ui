/**
 * This is a cross slice reducer. It is meant to be used only when
 * we need to access different state slices.
 * Reducers here will access the entire state
 * @param state the entire state
 * @param action the action that happened
 * @return {*}
 */
import reduceReducers from 'reduce-reducers';
import formCrossSliceReducer from './ui/form/formCrossSiteReducer';

const crossSliceReducer = reduceReducers(formCrossSliceReducer);

export default crossSliceReducer;
