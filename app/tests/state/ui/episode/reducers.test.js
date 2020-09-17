import { fromJS } from 'immutable';
import episodesReducer, {
  defaultState,
} from '../../../../js/state/ui/episode/reducers';
import {
  fetchEpisodesAction,
  fetchEpisodesFailAction,
  fetchEpisodesSuccessAction,
} from '../../../../js/state/ui/episode/actions';

describe('episodes reducers', () => {
  it('should have an initial state', () => {
    const newState = episodesReducer(undefined, {});
    expect(newState).toEqual(fromJS(defaultState));
  });

  it('should set state to fetching', () => {
    let newState = episodesReducer(
      fromJS(defaultState),
      fetchEpisodesAction('test', '123')
    );
    let updatedState = fromJS(defaultState).setIn(['fetching'], true);
    expect(newState).toEqual(updatedState);

    newState = episodesReducer(
      fromJS(defaultState),
      fetchEpisodesSuccessAction([])
    );
    updatedState = fromJS(defaultState).setIn(['fetching'], false);
    expect(newState).toEqual(updatedState);

    newState = episodesReducer(
      fromJS(defaultState),
      fetchEpisodesFailAction('fetch failed')
    );
    updatedState = fromJS(defaultState).setIn(['fetching'], false);
    expect(newState).toEqual(updatedState);
  });

  it('should set current episode', () => {
    let newState = episodesReducer(
      fromJS(defaultState),
      fetchEpisodesSuccessAction([])
    );
    let updatedState = fromJS(defaultState).setIn(
      ['currentEpisode'],
      undefined
    );
    expect(newState).toEqual(updatedState);

    newState = episodesReducer(
      fromJS(defaultState),
      fetchEpisodesSuccessAction(['123', '456'])
    );
    updatedState = fromJS(defaultState).setIn(['currentEpisode'], '456');
    expect(newState).toEqual(updatedState);
  });
});
